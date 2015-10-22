<?
/**************************************************************************************************
 * Archivo: FormularioController.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ('template.php');
require_once ('Sysgran/Core/Red/JSonRouterBase.php');
require_once ('Sysgran/Core/Red/Encoder.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/MovimientoStock.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/DetMovimientoStock.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/TipoMovimientoStock.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/UbicacionAlmacen.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/DetalleUbicacionAlmacen.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/UnidadDeMedida.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/Contenedor.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/Producto.php');
require_once ("Sysgran/Aplicacion/Entidades/Core/Core.php");

class FormularioController extends JSonRouterBase {
	public function Crear ($detalles, $tipoMovimientoStockId, $almacenOrigenId, $almacenDestinoId, $loteDeFabricacionId, $ordenDeTrabajoId, $ordenDeCompraId, $pedidoDeVentaId, $comentarios, $loteDeCompras) {
		global $conn;
				
		$e = new MovimientoStock ();
		$e->tipoMovimientoStockId = $tipoMovimientoStockId;
		$e->almacenOrigenId = $almacenOrigenId;
		$e->almacenDestinoId = $almacenDestinoId;
		$e->loteDeFabricacionId = $loteDeFabricacionId;
		$e->ordenDeTrabajoId = $ordenDeTrabajoId;
		$e->ordenDeCompraId = $ordenDeCompraId;
		$e->pedidoDeVentaId = $pedidoDeVentaId;
		$e->comentarios = $comentarios;
		$e->loteDeCompras = $loteDeCompras;
		
		$conn->BeginTransaction ();
		
		$this->AgregarDetalles ($e, $detalles);
		$ret_val = $e->Crear ();
		
		if ($ret_val == null) {
			$conn->Commit ();
			return Encoder::EncodeResponseOk ();
			
		} else {
			$conn->Rollback ();
			return Encoder::EncodeResponseError ($ret_val->GetMessage ());
		}
	}
	
	public function GenerarNuevoContenedor () {
		$c = new Contenedor ();
		$ret_val = $c->Crear ();
		
		if ($ret_val != null) {
			return Encoder::EncodeResponseError ($ret_val);
		}
		
		return Encoder::EncodeResponseOk ($c);
	}
	
	private function AgregarDetalles ($mov, $detalles) {
		foreach ($detalles as $item) {
			$dorig = new DetMovimientoStock ();
			$ddest = new DetMovimientoStock ();
		
			if ($item->tipoOrigen != 'N') {
				$dorig->productoId 					= $item->productoId;
				$dorig->unidadDeMedidaId 			= $item->unidadDeMedidaId;
				$dorig->contenedorId 				= $item->contenedorOrigenId;
				$dorig->detalleUbicacionAlmacenId 	= $item->detalleUbicacionOrigenId;
				$dorig->ubicacionAlmacenId 			= $item->ubicacionAlmacenOrigenId;
				$dorig->almacenId 					= $mov->almacenOrigenId;
				$dorig->cantidadEntra				= 0;
				$dorig->cantidadSale 				= $item->cantidad;
				$mov->AgregarDetalle ($dorig);
			}
			
			if ($item->tipoDestino != 'N') {
				// Si el detalle destino es igual a cero, lo creamos.
				if ($item->detalleUbicacionDestinoId == 0) {
					$det = new DetalleUbicacionAlmacen ();
					$det->almacenId = $mov->almacenDestinoId;
					$det->ubicacionAlmacenId = $item->ubicacionAlmacenDestinoId;
					$det->cantidad = 0;
					$det->Crear ();
				
					$ddest->detalleUbicacionAlmacenId = $det->id;	// Tomamos el ID del nuevo detalle.
					
				} else {
					$ddest->detalleUbicacionAlmacenId = $item->detalleUbicacionDestinoId;
				}
			
				$ddest->productoId 					= $item->productoId;
				$ddest->unidadDeMedidaId 			= $item->unidadDeMedidaId;
				$ddest->contenedorId 				= $item->contenedorDestinoId;
				$ddest->ubicacionAlmacenId 			= $item->ubicacionAlmacenDestinoId;
				$ddest->almacenId 					= $mov->almacenDestinoId;
				$ddest->cantidadEntra 				= $item->cantidad;
				$ddest->cantidadSale 				= 0;
				$mov->AgregarDetalle ($ddest);
			}
		}
	}
	
	public function BuscarTipoMovPorCodigo ($codigo) {
		try {
			$codigo = Validador::CodigoAlfanumerico ($codigo);
			$ret = TipoMovimientoStock::GetTipoMovimientoPorCodigo ($codigo);

			if ($ret == null) {
				return Encoder::EncodeResponseError ('Codigo Inexistente');				

			} else {
				$ret->almOrig = $ret->GetAlmacenesOrigen ();
				$ret->almDest = $ret->GetAlmacenesDestino ();
				
				return Encoder::Encode (Array ($ret));	
			}
			
		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ($ex);
		}
	}	
	
	public function BuscarTipoMovPorId ($codigo) {
		$ret = new TipoMovimientoStock ($codigo);
		$ret_val = $ret->Leer ();
		
		if ($ret_val != null) {
			return Encoder::EncodeResponseError ('Codigo Inexistente');				
			
		} else {
			$ret->almOrig = $ret->GetAlmacenesOrigen ();
			$ret->almDest = $ret->GetAlmacenesDestino ();
	
			return Encoder::Encode (Array ($ret));	
		}
	}		
	
	//
	// Busca un producto por codigo y lo devuelve.
	//
	public function BuscarProductoPorCodigo ($codigo) {
		try {
			$codigo = Validador::CodigoAlfanumerico ($codigo);
			$ret = Producto::GetProductoPorCodigo ($codigo);

			if ($ret == null) {
				return Encoder::EncodeResponseError ('Codigo Inexistente');				

			} else {
				$ret->unidadDeMedida = UnidadDeMedida::GetUnidadDeMedida ($ret->unidadDeMedidaStockId);
				
				return Encoder::Encode (Array ($ret));	
			}
			
		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ($ex);
		}
	}	
	
	//
	// Busca un producto por id y lo devuelve.
	//
	public function BuscarProductoPorId ($codigo) {
		$ret = new Producto ($codigo);
		$ret_val = $ret->Leer ();
		
		if ($ret_val != null) {
			return Encoder::EncodeResponseError ('Codigo Inexistente');				
			
		} else {
			$ret->unidadDeMedida = UnidadDeMedida::GetUnidadDeMedida ($ret->unidadDeMedidaStockId);
			
			return Encoder::Encode (Array ($ret));	
		}
	}	

	//
	// Busca una ubicacion por su codigo.
	//
	public function BuscarUbicacionDetallePorCodigo ($codigo, $productoId = null, $almacenId = null) {
		try {
			$codigo = Validador::CodigoAlfanumerico ($codigo);
			$ret = UbicacionAlmacen::GetUbicacionAlmacenPorCodigo ($codigo);
			if ($ret == null) {
				return Encoder::EncodeResponseError ('Codigo Inexistente');				
			}
			
			if ($productoId != null) {
				if (!$ret->TieneProducto ($productoId)) {
					return Encoder::EncodeResponseError ('La ubicacion indicada no contiene al producto seleccionado');
				}
			}
			
			if ($almacenId != null) {
				if ($ret->almacenId != $almacenId) {
					return Encoder::EncodeResponseError ('La ubicacion indicada no pertenece al almacen seleccionado');
				}
			}

			$ret->zona = $ret->GetZona ();
			$ret->area = $ret->GetArea ();
			$ret->EsDetalle = false;
			
			return Encoder::Encode (Array ($ret));	
			
		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ($ex);
		}
	}
	
	//
	// Trae el detalle al seleccionarlo en el listado de ubicaciones origen.
	//
	public function BuscarUbicacionDetallePorId ($codigo) {
		$ret = new DetalleUbicacionAlmacen ($codigo);
		$ret_val = $ret->Leer ();
		
		if ($ret_val != null) {
			return Encoder::EncodeResponseError ('Codigo Inexistente');				
			
		} else {
			$ret->ubicacion 		= UbicacionAlmacen::GetUbicacion ($ret->ubicacionAlmacenId);
			$ret->ubicacion->zona 	= $ret->ubicacion->GetZona ();
			$ret->ubicacion->area 	= $ret->ubicacion->GetArea ();
			$ret->producto 			= Producto::GetProducto ($ret->productoId);
			$ret->unidadDeMedida 	= UnidadDeMedida::GetUnidadDeMedida ($ret->producto->unidadDeMedidaStockId);
			$ret->contenedor		= Contenedor::GetContenedor ($ret->contenedorId);
			$ret->esDetalle = true;
			
			return Encoder::Encode (Array ($ret));	
		}
	}
	
	//
	// Recibe un codigo de contenedor y producto. Valida que exista y que contenga el producto indicado (si el producto es != null)
	// Si existe devuelve toda su informacion relacionada.
	//
	public function GetInfoContenedor ($codigo, $productoId = null) {
		$ret = Contenedor::BuscarContenedorPorCodigo ($codigo);
		
		if ($ret != null) {
			$ret->detalleUbicacion = $ret->GetDetalleUbicacion ();
			
			if ($ret->detalleUbicacion != null) {
				$ret->ubicacion	= UbicacionAlmacen::GetUbicacion ($ret->detalleUbicacion->ubicacionAlmacenId);
				$ret->ubicacion->zona = $ret->ubicacion->GetZona ();
				$ret->ubicacion->area = $ret->ubicacion->GetArea ();
				$ret->detalleUbicacion->producto = Producto::GetProducto ($ret->detalleUbicacion->productoId);
				$ret->detalleUbicacion->unidadDeMedida = UnidadDeMedida::GetUnidadDeMedida ($ret->detalleUbicacion->producto->unidadDeMedidaStockId);
			}
		}
		
		return Encoder::EncodeResponseOk ($ret);
	}
	
	//
	// Recibe el Id del detalle del movimiento de Stock y levanta todo el movimiento(cabecera y detalle) en formato solo lectura.
	//
	public function Leer ($id) {
		$e = new MovimientoStock ($id);
		$ret_val = $e->LeerFormatoTexto ();
		
		if ($ret_val == null) {
			return Encoder::Encode ($e);
			
		} else {
			return Encoder::EncodeResponseError ($ret_val->GetMessage ());				
		}
	}
	
	public function GetDatosIniciales () {
		$f = Core::GetFechaYHoraActual ();
		
		$ret['fechaYHora'] = $f['fecha'] . ' ' . $f['hora'] . ':' . $f['minutos'];
		$ret['nombreUsuario'] = Core::GetUsuarioSesion ()->loginName;

		return Encoder::EncodeResponseOk ($ret);
	}
	
	public function ChequearUM ($productoId, $um, $det, $cant) {
		$prod = Producto::GetProducto ($productoId);
		
		$cnt = $prod->ConvertirCantidad ($cant, $um, $prod->unidadDeMedidaStockId);
		
		// La UM no se puede convertir a la UM de stock
		if ($cnt == null) {
			$ret['resultado_txt'] = 'La unidad de medida seleccionada no puede ser convertida a la UM de stock';
			$ret['resultado'] = false;
		
		} else {
			$ret['resultado_txt'] = '';
			$ret['resultado'] = true;
		
			// Si det != 0 chequeamos la cantidad que hay en el origen.
			if ($det != 0) {
				$det = DetalleUbicacionAlmacen::GetDetalleUbicacion ($det);
				if ($det->cantidad < $cnt) {
					$ret['resultado_txt'] = 'La cantidad indicada supera la existente en la ubicacion origen';
					$ret['resultado'] = false;
				}
			}
		}
		
		return Encoder::EncodeResponseOk ($ret);
	}
	
	public function AnularMovimientoStock ($movimientoStockId) {
		return Encoder::EncodeResponseOk ($ret);
	}
	
	public function AnularDetalleMovimientoStock ($movimientoStockId, $detMovimientoStockId) {
		$det = new DetMovimientoStock ($detMovimientoStockId);
		$ret_val = $det->Anular ();
		
		if ($ret_val != null) {
			return Encoder::EncodeResponseError ($ret_val->GetMessage ());				
		
		} else {
			return Encoder::EncodeResponseOk ($ret);
		}
	}
}

$ws = new FormularioController ();
$ws->Ejecutar ();
?>
