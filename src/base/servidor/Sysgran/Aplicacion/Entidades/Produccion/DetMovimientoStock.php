<?
/**************************************************************************************************
 * Archivo: DetMovimientoStock.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");
require_once ('Producto.php');
require_once ('Contenedor.php');
require_once ('TipoContenedor.php');

class DetMovimientoStock extends EntidadBase {
	public $id;
	public $movimientoStockId;
	public $productoId;
	public $unidadDeMedidaId;
	public $contenedorId;
	public $detalleUbicacionAlmacenId;
	public $ubicacionAlmacenId;
	public $almacenId;
	public $cantidadEntra;
	public $cantidadSale;
	public $detMovimientoStockAnulacionId;

	//---------- Metodos estaticos ----------
	
	//
	// Devuelve los detalles de un movimiento de stock en formato solo texto.
	//
	
	public static function GetDetallesMovimientoTexto ($id) {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT d.*, p.cCodigo AS cod_prod, um.cCodigo AS cod_um, u.cCodigo AS cod_ubic, c.cCodigo AS cod_cont, du.iNroDeDetalle, p.cDescripcionCorta AS desc_prod
									FROM DetMovimientoStock d
									JOIN Producto p ON p.iProductoId = d.iProductoId
									JOIN UnidadDeMedida um ON um.iUnidadDeMedidaId = d.iUnidadDeMedidaId
									JOIN UbicacionAlmacen u ON (u.iUbicacionAlmacenId = d.iUbicacionAlmacenId AND u.iAlmacenId = d.iAlmacenId)
									JOIN DetalleUbicacionAlmacen du ON du.iDetalleUbicacionAlmacenId = d.iDetalleUbicacionAlmacenId
									LEFT OUTER JOIN Contenedor c ON c.iContenedorId = d.iContenedorId
									WHERE 
										d.iMovimientoStockId = $id");
			
			$ret = array ();
			while (!$rs->Eof ()) {
				$item = new DetMovimientoStock ();
				
				$item->id 							= $rs->Fields ('iDetMovimientoStockId');
				$item->movimientoStockId 			= $rs->Fields ('iMovimientoStockId');
				$item->productoId					= $rs->Fields ('iProductoId');
				$item->unidadDeMedidaId				= $rs->Fields ('iUnidadDeMedidaId');
				$item->contenedorId					= $rs->Fields ('iContenedorId');
				$item->detalleUbicacionAlmacenId	= $rs->Fields ('iDetalleUbicacionAlmacenId');
				$item->ubicacionAlmacenId			= $rs->Fields ('iUbicacionAlmacenId');
				$item->almacenId					= $rs->Fields ('iAlmacenId');
				$item->cantidadEntra				= DB::FromFloat ($rs->Fields ('fCantidadEntra'));
				$item->cantidadSale					= DB::FromFloat ($rs->Fields ('fCantidadSale'));
				$item->detMovimientoStockAnulacionId= $rs->Fields ('iDetMovimientoStockAnulacionId');
				
				// Campos de texto
				$item->codigoProducto				= $rs->Fields ('cod_prod');
				$item->descripcionProducto			= $rs->Fields ('desc_prod');
				$item->codigoUM						= $rs->Fields ('cod_um');
				$item->codigoUbicacion				= $rs->Fields ('cod_ubic');
				$item->codigoContenedor				= $rs->Fields ('cod_cont');
				$item->nroDetalleUbicacion			= $rs->Fields ('iNroDeDetalle');
				
				$ret[] = $item;
				$rs->Next ();
			}
			
			$rs->Close ();
			return $ret;
			
		} catch (Exception $ex) {
			return null;
		}
	}
	
	//---------- Otros metodos publicos ----------
	
	public function Anular () {
		global $conn;
		
		try {
			// Primero chequeamos que el detalle exista
			$rs = $conn->Retrieve ("SELECT COUNT(*) AS cnt FROM DetMovimientoStock WHERE iDetMovimientoStockId = $this->id");
			$ret_val = null;
			if ($rs->Fields ('cnt') == 0) {
				$rs->Close ();
				return new RetValue ('El elemento seleccionado no existe');
			}
			
			$rs->Close ();
			
			// Luego insertamos el movimiento de anulacion.
			$conn->Execute ("INSERT INTO DetMovimientoStock (
				iDetMovimientoStockId
				,iMovimientoStockId
				,iProductoId
				,iUnidadDeMedidaId
				,iContenedorId
				,iDetalleUbicacionAlmacenId
				,iUbicacionAlmacenId
				,iAlmacenId
				,fCantidadEntra
				,fCantidadSale
			) SELECT 
				nextval ('seq_det_mov_stock_id')
				,iMovimientoStockId
				,iProductoId
				,iUnidadDeMedidaId
				,iContenedorId
				,iDetalleUbicacionAlmacenId
				,iUbicacionAlmacenId
				,iAlmacenId
				,fCantidadSale
				,fCantidadEntra
			FROM DetMovimientoStock
			WHERE
				iDetMovimientoStockId = $this->id");

			// Asocio el id de anulacion con el del movimiento.
			$id_anulacion = $conn->GetSecuenceLastId ('seq_det_mov_stock_id');				
			$conn->Execute ("UPDATE DetMovimientoStock SET iDetMovimientoStockAnulacionId = $id_anulacion WHERE iDetMovimientoStockId = $this->id");
			
			
			
			return $ret_val;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}		
	}
	
	//---------- CRUD ----------

	public function DetMovimientoStock ($id = null) {
		$this->id = $id;
	}
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM DetMovimientoStock WHERE iDetMovimientoStockId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$rs->Close ();
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Crear () {
		global $conn;
		
		try {
			// Calcula las cantidades en unidades de Stock del producto
			// transferido.
			$prod = Producto::GetProducto ($this->productoId);
			$cantidad_entra = $prod->ConvertirCantidad (Lib::DevolverNumero ($this->cantidadEntra), $this->unidadDeMedidaId, $prod->unidadDeMedidaStockId);
			$cantidad_sale = $prod->ConvertirCantidad (Lib::DevolverNumero ($this->cantidadSale), $this->unidadDeMedidaId, $prod->unidadDeMedidaStockId);
		
			// Guarda el detalle del movimiento
			$conn->Execute ("INSERT INTO DetMovimientoStock (
				iDetMovimientoStockId
				,iMovimientoStockId
				,iProductoId
				,iUnidadDeMedidaId
				,iContenedorId
				,iDetalleUbicacionAlmacenId
				,iUbicacionAlmacenId
				,iAlmacenId
				,fCantidadEntra
				,fCantidadSale
			) VALUES (
				nextval ('seq_det_mov_stock_id')
				,$this->movimientoStockId
				,$this->productoId
				,$this->unidadDeMedidaId
				," . $this->SetNulleableIdValue ($this->contenedorId) . "
				,$this->detalleUbicacionAlmacenId
				,$this->ubicacionAlmacenId
				,$this->almacenId
				," . DB::ToFloat ($this->cantidadEntra) . "
				," . DB::ToFloat ($this->cantidadSale) . "
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_det_mov_stock_id');
			
			// ---- Actualiza las cantidades en el detalle. ----
			
			//1) Chequeamos si el detalle es nuevo (productoId = 0)
			$rs = $conn->Retrieve ("SELECT iProductoId 
									FROM DetalleUbicacionAlmacen
									WHERE
										iAlmacenid = $this->almacenId AND
										iUbicacionAlmacenId = $this->ubicacionAlmacenId AND
										iDetalleUbicacionAlmacenId = $this->detalleUbicacionAlmacenId");
			
			// El detalle es nuevo, hay que setear todod
			if ($rs->Fields ('iProductoId') == 0) {
				$conn->Execute ("UPDATE DetalleUbicacionAlmacen 
								SET 
									fCantidad = fCantidad - " . DB::ToFloat ($cantidad_sale) . " + " . DB::ToFloat ($cantidad_entra) . ",
									iProductoId = $this->productoId,
									iContenedorId = " . $this->SetNulleableIdValue ($this->contenedorId) . "
								WHERE 
									iAlmacenid = $this->almacenId AND
									iUbicacionAlmacenId = $this->ubicacionAlmacenId AND
									iDetalleUbicacionAlmacenId = $this->detalleUbicacionAlmacenId");
			
			
			// Sino solo recalculamos la cantidad.
			} else {
				$conn->Execute ("UPDATE DetalleUbicacionAlmacen 
								SET 
									fCantidad = fCantidad - " . DB::ToFloat ($cantidad_sale) . " + " . DB::ToFloat ($cantidad_entra) . "
								WHERE 
									iAlmacenid = $this->almacenId AND
									iUbicacionAlmacenId = $this->ubicacionAlmacenId AND
									iDetalleUbicacionAlmacenId = $this->detalleUbicacionAlmacenId");
			}
			
			$rs->Close ();
			
			//---- Fin de Actualizacion de cantiades de ubicacion. ----
			
			//---- Actualizamos la informacion del contenedor. ----
			
			if ($this->contenedorId != null) {
				$c = Contenedor::GetContenedor ($this->contenedorId);
				
				$c->tipoContenedorId = TipoContenedor::Creado;
				$c->almacenId = $this->almacenId;
				$c->ubicacionAlmacenId = $this->ubicacionAlmacenId;
				$c->detalleUbicacionAlmacenId = $this->detalleUbicacionAlmacenId;
				$c->Actualizar ();
			}
			
			//---- Fin de Actualizacion de contenedor. ----
			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
}
?>
