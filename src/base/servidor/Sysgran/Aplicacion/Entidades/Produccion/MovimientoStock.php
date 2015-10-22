<?
/**************************************************************************************************
 * Archivo: MovimientoStock.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: 
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");
require_once ('DetMovimientoStock.php');
require_once ('TipoMovimientoStock.php');
	
class MovimientoStock extends EntidadBase {
	public $id;
	public $tipoMovimientoStockId;
	public $usuarioId;
	public $almacenOrigenId;
	public $almacenDestinoId;
	public $loteDeFabricacionId;
	public $ordenDeTrabajoId;
	public $ordenDeCompraId;
	public $pedidoDeVentaId;
	public $formulaDeProduccionId;
	public $timestamp;
	public $comentarios;
	public $loteDeCompras;
	public $movimientoStockAnulacionId;
	
	public $detalles = array ();	
	
	//---------- Metodos estaticos ----------
	
	//---------- CRUD ----------

	public function MovimientoStock ($id = null) {
		$this->id = $id;
	}
	
	public function AgregarDetalle ($det) {
		$this->detalles[] = $det;
	}
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM MovimientoStock WHERE iMovimientoStockId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->tipoMovimientoStockId		= $rs->Fields ("iTipoMovimientoStockId");
			$this->usuarioId					= $rs->Fields ('iUsuarioId');
			$this->almacenOrigenId 				= $rs->Fields ("iAlmacenOrigenId");
			$this->almacenDestinoId 			= $rs->Fields ("iAlmacenDestinoId");
			$this->loteDeFabricacionId 			= $rs->Fields ("iLoteDeFabricacionId");
			$this->ordenDeTrabajoId 			= $rs->Fields ("iOrdenDeTrabajoId");
			$this->ordenDeCompraId 				= $rs->Fields ("iOrdenDeCompraId");
			$this->pedidoDeVentaId 				= $rs->Fields ("iPedidoDeVentaId");
			$this->formulaDeProduccionId		= $rs->Fields ('iFormulaDeProduccionId');
			$this->timestamp					= $rs->Fields ('dTimestamp');
			$this->comentarios 					= $rs->Fields ("cComentarios");
			$this->loteDeCompras 				= $rs->Fields ("cLoteDeCompras");
			$this->movimientoStockAnulacionId	= $rs->Fields ('iMovimientoStockAnulacionId');
			$rs->Close ();
			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function LeerFormatoTexto () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT ms.*, u.cLoginName, TO_CHAR(ms.dTimestamp, 'DD/MM/YYYY') AS fecha, t.cCodigo AS cod_tipo, t.cDescripcionCorta AS desc_tipo, aorig.cCodigo AS cod_aorig, adest.cCodigo AS cod_adest
									FROM MovimientoStock ms
									JOIN TipoMovimientoStock t ON t.iTipoMovimientoStockId = ms.iTipoMovimientoStockId
									JOIN Usuario u ON u.iUsuarioId = ms.iUsuarioId
									JOIN Almacen aorig ON aorig.iAlmacenId = ms.iAlmacenOrigenId
									JOIN Almacen adest ON adest.iAlmacenId = ms.iAlmacenDestinoId
 									WHERE
										iMovimientoStockId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			// Campos de texto
			$this->usuario				= $rs->Fields ('cLoginName');
			$this->fecha				= $rs->Fields ('fecha');
			$this->codigoTipo			= $rs->Fields ('cod_tipo');
			$this->descripcionTipo		= $rs->Fields ('desc_tipo');
			$this->codigoAlmacenOrigen	= $rs->Fields ('cod_aorig');
			$this->codigoAlmacenDestino = $rs->Fields ('cod_adest');
			
			// Campos de la entidad
			$this->tipoMovimientoStockId		= $rs->Fields ("iTipoMovimientoStockId");
			$this->usuarioId					= $rs->Fields ('iUsuarioId');
			$this->almacenOrigenId 				= $rs->Fields ("iAlmacenOrigenId");
			$this->almacenDestinoId 			= $rs->Fields ("iAlmacenDestinoId");
			$this->loteDeFabricacionId 			= $rs->Fields ("iLoteDeFabricacionId");
			$this->ordenDeTrabajoId 			= $rs->Fields ("iOrdenDeTrabajoId");
			$this->ordenDeCompraId 				= $rs->Fields ("iOrdenDeCompraId");
			$this->pedidoDeVentaId 				= $rs->Fields ("iPedidoDeVentaId");
			$this->formulaDeProduccionId		= $rs->Fields ('iFormulaDeProduccionId');
			$this->timestamp					= $rs->Fields ('dTimestamp');
			$this->comentarios 					= $rs->Fields ("cComentarios");
			$this->loteDeCompras 				= $rs->Fields ("cLoteDeCompras");
			$this->tipoMovimientoStockId		= $rs->Fields ("iTipoMovimientoStockId");
			$this->movimientoStockAnulacionId	= $rs->Fields ('iMovimientoStockAnulacionId');
			
			$rs->Close ();
			
			// Lee los detalles en modo texto
			$this->detalles = DetMovimientoStock::GetDetallesMovimientoTexto ($this->id);
			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Crear () {
		global $conn;
		
		try {
			// Cargo la cabecera del movimiento
			$conn->Execute ("INSERT INTO MovimientoStock (
				 iMovimientoStockId
				,iTipoMovimientoStockId
				,iUsuarioId
				,iAlmacenOrigenId
				,iAlmacenDestinoId
				,iLoteDeFabricacionId
				,iOrdenDeTrabajoId
				,iOrdenDeCompraId
				,iPedidoDeVentaId
				,iFormulaDeProduccionId
				,dTimestamp
				,cComentarios
				,cLoteDeCompras
			) VALUES (
				nextval ('seq_mov_stock_id')
				,$this->tipoMovimientoStockId
				," . Sesion::GetSesion ()->usuarioId . "
				,$this->almacenOrigenId
				,$this->almacenDestinoId
				," . $this->SetNulleableIdValue ($this->loteDeFabricacionId) . "
				," . $this->SetNulleableIdValue ($this->ordenDeTrabajoId) . "
				," . $this->SetNulleableIdValue ($this->ordenDeCompraId) . "
				," . $this->SetNulleableIdValue ($this->pedidoDeVentaId) . "
				," . $this->SetNulleableIdValue ($this->formulaDeProduccionId) . "
				, CURRENT_TIMESTAMP
				,'$this->comentarios'
				,'$this->loteDeCompras'
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_mov_stock_id');
			
			// Cargo los detalles del movimiento
			foreach ($this->detalles as $item) {
				$item->movimientoStockId = $this->id;
				$item->Crear ();
			}
			
			// Hago los ajustes de stock en la ubicacion
			//$tipo = new TipoMovimientoStock ($this->tipoMovimientoStockId);
			//if ($tipo->permiteOrigenNull)
			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
}
?>
