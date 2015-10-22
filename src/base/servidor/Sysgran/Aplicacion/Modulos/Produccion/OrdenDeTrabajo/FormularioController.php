<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
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
require_once ('Sysgran/Core/Php/GeneradorExcel.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/OrdenDeTrabajo.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/Producto.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/FormulaDeProduccion.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/HojaDeRuta.php');
require_once ('Store/StoreDetalleFormula.php');
require_once ('Store/StoreDetalleHojaDeRuta.php');
require_once ('Store/StoreDetalleOperacion.php');
require_once ('Store/StoreDetalleOperacionMaquina.php');
require_once ('Store/StoreInfoFabricacion.php');
require_once ('Sysgran/Aplicacion/Modulos/Produccion/Store/StoreOrdenDeTrabajo.php');

class FormularioController extends JSonRouterBase {
	public function GenerarListadoPdf () {
		$g = new GeneradorListadoPdf ();
		$this->ConfigurarListadoImpresion ($g);
		$g->Ejecutar ();
	}
	
	public function GenerarListadoExcel () {
		$g = new GeneradorListadoExcel ();
		$this->ConfigurarListadoImpresion ($g);
		
		return $g->Ejecutar ();
	}
	
	private function ConfigurarListadoImpresion ($lst) {
		$lst->Store = new StoreOrdenDeTrabajo ();
		$lst->NombreArchivo = 'listado';
		$lst->Titulo = 'LISTADO ORDENES DE TRABAJO';
		$lst->Columnas = array ('Codigo' => 'codigo', 
								'Centro de Trabajo' => 'codigoCentroDeTrabajo',
								'Producto' => 'codigoProducto',
								'Cantidad' => 'cantidad',
								'UM' => 'codigoUnidadDeMedida',
								'Estado' => 'nombreEstado',
								'Creada' => 'fechaCreacion');
		$lst->AnchoColumnas = array (50, 100, 100, 100, 100, 100, 100);
	}	
	
	public function Crear ($loteDeFabricacionId
							, $productoId 
							, $formulaDeProduccionId
							, $hojaDeRutaId
							, $unidadDeMedidaId
							, $pedidoDeVentaId
							, $ordenDeTrabajoPadreId
							, $cantidad
							, $fechaDeProduccionProgramada
							, $comentarios
							, $ordenDeTrabajoPadreId
							, $operacionesHojaDeRuta
							, $detFormulaDeProduccionOT) {
		global $conn;
				
		$e = new OrdenDeTrabajo ();
		$e->loteDeFabricacionId 		= $loteDeFabricacionId;
		$e->productoId 					= $productoId;
		$e->formulaDeProduccionId 		= $formulaDeProduccionId;
		$e->hojaDeRutaId				= $hojaDeRutaId;
		$e->unidadDeMedidaId 			= $unidadDeMedidaId;
		$e->pedidoDeVentaId 			= $pedidoDeVentaId;
		$e->ordenDeTrabajoPadre 		= $ordenDeTrabajoPadre;
		$e->cantidad 					= $cantidad;
		$e->fechaDeProduccionProgramada = $fechaDeProduccionProgramada;
		$e->comentarios 				= $comentarios;
		$e->ordenDeTrabajoPadreId		= $ordenDeTrabajoPadreId;
		
		// Solo tomamos los datos que vienen en la hoja de ruta, por que los de la 
		// formula no se modifican en este ABM.
		$e->SetOperacionesHojaDeRuta ($operacionesHojaDeRuta);
		
		$conn->BeginTransaction ();
		$ret_val = $e->Crear ();
		
		if ($ret_val == null) {
			$conn->Commit ();
			return Encoder::EncodeResponseOk ();
			
		} else {
			$conn->Rollback ();
			return Encoder::EncodeResponseError ($ret_val->GetMessage ());
		}
	}
	
	//
	// Busca una OT por codigo y lo devuelve.
	//
	public function BuscarPorCodigo ($codigo) {
		try {
			$codigo = Validador::NumeroEntero ($codigo);
		
			return $this->BuscarPorId ($codigo);
			
		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ($ex);
		}
	}	
	
	//
	// Busca una OT por id y lo devuelve.
	//
	public function BuscarPorId ($codigo) {
		$ret = new OrdenDeTrabajo ($codigo);
		$ret_val = $ret->Leer ();
		
		if ($ret_val != null) {
			return Encoder::EncodeResponseError ('Codigo Inexistente');				
			
		} else {
			$ret->producto = $ret->GetProducto ();
			
			return Encoder::Encode (Array ($ret));	
		}
	}	
	
	public function Leer ($id) {
		$e = new OrdenDeTrabajo ($id);
		
		$ret_val = $e->Leer ();
		
		if ($ret_val == null) {
			$e->producto 					= $e->GetProducto ();
			$e->producto->centroDeTrabajo 	= $e->producto->GetCentroDeTrabajo ();
			$e->unidadDeMedida 				= $e->GetUnidadDeMedida ();
			$e->formula						= $e->GetFormulaDeProduccion ();
			
			return Encoder::Encode ($e);
			
		} else {
			return Encoder::EncodeResponseError ($ret_val->GetMessage ());				
		}
	}
	
	public function Actualizar ($params) {
		global $conn;
				
		if (isset ($params["id"])) {
			$id = $params["id"];
			
			$e = new OrdenDeTrabajo ($id);
			$ret_val = $e->Leer ();
					
			if ($ret_val == null) {
				unset ($params["id"]);
					
				$conn->BeginTransaction ();					
				$ret_val = $e->Actualizar ($params);
				
				if ($ret_val == null) {
					$conn->Commit ();
					return Encoder::EncodeResponseOk ();
				
				} else {
					$conn->Rollback ();
					return Encoder::EncodeResponseError ($ret_val->GetMessage ());
				}
			
			} else {
				return Encoder::EncodeResponseError ($ret_val->GetMessage ());
			}
			
		} else {
			return Encoder::EncodeResponseError (ERR_JSR_PARAMETROS_DINAMICOS_INVALIDOS);
		}
	}
	
	public function Borrar ($id) {
		global $conn;
					
		$e = new OrdenDeTrabajo ($id);
		$ret_val = $e->Leer ();
		
		if ($ret_val == null) {
			$conn->BeginTransaction ();
			$ret_val = $e->Borrar ();
			
			if ($ret_val == null) {
				$conn->Commit ();
				return Encoder::EncodeResponseOk ();
			
			} else {
				$conn->Rollback ();
				return Encoder::EncodeResponseError ($ret_val->GetMessage ()); 
			}
			
		} else {
			$conn->Rollback ();
			return Encoder::EncodeResponseError ($ret_val->GetMessage ());
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
				// Agregamos la informacion que vamos a necesitar si leemos por codigo
				$ret->centroDeTrabajo 			= $ret->GetCentroDeTrabajo ();
				$ret->unidadDeMedidaFabricacion	= $ret->GetUMFabricacion ();

				$tipo_prod = new TipoDeProducto ($ret->tipoDeProductoId);
				$tipo_prod->Leer ();
				$ret->esProductoDeFabricacion = $tipo_prod->EsProductoDeFabricacion ();

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
			// Agregamos las cosas que vamos a necesitar si leemos por id
			$ret->centroDeTrabajo 			= $ret->GetCentroDeTrabajo ();
			$ret->unidadDeMedidaFabricacion	= $ret->GetUMFabricacion ();

			$tipo_prod = new TipoDeProducto ($ret->tipoDeProductoId);
			$tipo_prod->Leer ();
			$ret->esProductoDeFabricacion = $tipo_prod->EsProductoDeFabricacion ();
			
			return Encoder::Encode (Array ($ret));	
		}
	}	
	
	//
	// Realiza el calculo de formula de produccion estandar en base a los parametros recibidos.
	// Este metodo alimenta el listado detalle de formulas en el abm de OTs
	//
	public function LeerDetalleFormulaPorId ($formulaId, $cantidad, $unidadDeMedidaId, $productoId) {
		$prod = new Producto ($productoId);
		
		$ret_val = $prod->Leer ();
		
		// Si el producto no existe -> Error.
		if ($ret_val != null) {
			return Encoder::EncodeResponseError ($ret_val->GetMessage ()); 
		
		} else {
			// Intentamos calcular la cantidad de producto en la UM de fabricacion. Si no se puede -> Error
			$cnt = $prod->CalcularCantidadFabricacion ($cantidad, $unidadDeMedidaId);
			if ($cnt == null) {
				return Encoder::EncodeResponseError ('La Unidad de Medida seleccionada no esta habilitada para ser usada en este producto'); 
			
			} else {
				// Pasamos la cantidad ya calculada.
				$f = new FormulaDeProduccion ($formulaId);
				$ret = $f->GetListaDeMateriales ($cnt);

				return Encoder::EncodeResponseOk ($ret);	
			}
		}
	}	

	//
	// Realiza el calculo de Hoja de Ruta estandar en base a los parametros recibidos.
	// Este metodo alimenta el listado detalle de hojas de ruta en el ABM de OTs.
	//
	public function LeerDetalleHojaDeRutaPorId ($cantidad, $unidadDeMedidaId, $productoId, $ordenDeTrabajoId = null) {
		$prod = new Producto ($productoId);
		
		// Si el producto no existe -> Error.
		$ret_val = $prod->Leer ();
		if ($ret_val != null) {
			return Encoder::EncodeResponseError ($ret_val->GetMessage ()); 
		}

		// Intentamos calcular la cantidad de producto en la UM de fabricacion. Si no se puede -> Error
		$cnt = $prod->CalcularCantidadFabricacion ($cantidad, $unidadDeMedidaId);
		if ($cnt == null) {
			return Encoder::EncodeResponseError ('La Unidad de Medida seleccionada no esta habilitada para ser usada en este producto'); 
		}

		// Pasamos la cantidad ya calculada.
		//$st = new StoreDetalleHojaDeRuta ($prod, $prod->hojaDeRutaId, $cnt, $ordenDeTrabajoId);
		$st = new StoreDetalleHojaDeRuta ($prod, 12, $cnt, $ordenDeTrabajoId);

		return Encoder::EncodeResponseOk ($st->Ejecutar ());	
	}
	
	//
	// Devuelve un array con los datos de cada maquina para una operacion dada. 
	//
	public function GetStoreMaquinaPorOperacion ($ordenDeTrabajoId, $operacionId, $productoId, $cantidad, $unidadDeMedidaId) {
		// Si el producto no existe -> Error.
		$prod = new Producto ($productoId);
		$ret_val = $prod->Leer ();
		
		if ($ret_val != null) {
			return Encoder::EncodeResponseError ($ret_val->GetMessage ()); 
		}

		// Intentamos calcular la cantidad de producto en la UM de fabricacion. Si no se puede -> Error
		$cnt = $prod->CalcularCantidadFabricacion ($cantidad, $unidadDeMedidaId);
		if ($cnt == null) {
			return Encoder::EncodeResponseError ('La Unidad de Medida seleccionada no esta habilitada para ser usada en este producto'); 
		}
		
		// Si recibimos el id de la ot la leemos, sino pasamos null al store.
		if ($ordenDeTrabajoId != null) {
			$ot = new OrdenDeTrabajo ($ordenDeTrabajoId);		
			$ret_val = $ot->Leer ();

			if ($ret_val != null) {
				return Encoder::EncodeResponseError ($ret_val->GetMessage ()); 		
			}
		
		} else {
			$ot = null;
		}
		
		// Pasamos la cantidad ya calculada.
		$st = new StoreDetalleOperacion ($ot, $prod, $cnt, $operacionId);
		
		return Encoder::EncodeResponseOk ($st->Ejecutar ());	
	}
	
	public function GetDetalleListadoHojaDeRutaPorTiempo ($ordenDeTrabajoId, $productoId, $unidadDeMedidaId, $cantidad) {
		$prod = new Producto ($productoId);
		
		$ret_val = $prod->Leer ();
		
		// Si el producto no existe -> Error.
		if ($ret_val != null) {
			return Encoder::EncodeResponseError ($ret_val->GetMessage ()); 
		}
		
		// Intentamos calcular la cantidad de producto en la UM de fabricacion. Si no se puede -> Error
		$cnt = $prod->CalcularCantidadFabricacion ($cantidad, $unidadDeMedidaId);
		if ($cnt == null) {
			return Encoder::EncodeResponseError ('La Unidad de Medida seleccionada no esta habilitada para ser usada en este producto'); 
		} 

		$st = new StoreDetalleOperacionMaquina ($ordenDeTrabajoId, $prod, $cnt);

		return Encoder::EncodeResponseOk ($st->Ejecutar ());	
	}
	
	//
	// Crea una OT hija de otra con los datos pasados por parametros.
	//
	
	public function CrearOTHija ($otPadreId, $productoId, $cantidad, $unidadDeMedidaId) {
		$prod = new Producto ($productoId);

		$ret_val = $prod->Leer ();
		if ($ret_val != null) {
			return Encoder::EncodeResponseError ($ret_val->GetMessage ()); 
		} 
		
		if (!$prod->GetTipoDeProducto ()->EsProductoDeFabricacion ()) {
			return Encoder::EncodeResponseError ('El producto seleccionado no es un producto de Fabricacion'); 
		}
		
		if (!$prod->EsUnidadDeFabricacionValida ($unidadDeMedidaId)) {
			return Encoder::EncodeResponseError ('La unidad de medida utilizada no es valida para fabricacion'); 
		}
			
		$ot = new OrdenDeTrabajo ();

		$ret_val = $ot->CrearOTDeProducto ($prod, $cantidad, $unidadDeMedidaId);
		if ($ret_val != null) {
			return Encoder::EncodeResponseError ($ret_val->GetMessage ()); 
		} 
			
		$ot->AsociarConOTPadre ($otPadreId);
			
		return Encoder::EncodeResponseOk ($ot->id);	
	}
	
	public function GetEstadoOrdenDeTrabajo ($ordenDeTrabajoId) {
		// hardcodeamos la um
		$st = new StoreInfoFabricacion ($ordenDeTrabajoId, 0, 0, 0);

		return Encoder::EncodeResponseOk ($st->Ejecutar ());
	}
	
	public function CambiarDeEstadoOT ($ordenDeTrabajoId, $estadoId, $fechaProgramada) {
		$ot = new OrdenDeTrabajo ($ordenDeTrabajoId);
		
		$ret_val = $ot->CambiarDeEstado ($estadoId, $fechaProgramada);
		if ($ret_val != null) {
			return Encoder::EncodeResponseError ($ret_val->GetMessage ()); 
			
		} else {
			return Encoder::EncodeResponseOk ();	
		}
	}
}

$ws = new FormularioController ();
$ws->Ejecutar ();
?>
