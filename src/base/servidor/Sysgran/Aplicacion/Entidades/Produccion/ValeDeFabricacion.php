<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: ValeDeFabricacion.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Tipos de producto
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ('Sysgran/Core/Php/EntidadBase.php');
require_once ('Contenedor.php');
require_once ('LoteDeFabricacion.php');

class ValeDeFabricacion extends EntidadBase {
	public $id;
	public $centroDeTrabajoId;
	public $tipoDeVale;
	public $ordenDeTrabajoId;
	public $empleadoId;
	public $cantidadProducida;
	public $cantidadRechazada;
	public $cantidadRecortes;
	public $unidadDeMedidaCantProducidaId;
	public $unidadDeMedidaCantRechazadaId;
	public $unidadDeMedidaCantRecortesId;
	public $loteDeFabricacionId;
	public $operacionId;
	public $observaciones;
	public $contenedor;

	public function ValeDeFabricacion ($id = null) {
		$this->id = $id;
	}

	//---------- Metodos estaticos ----------
	
	public static function GetValesDeFabricacionDeOT ($id) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT vf.*, TO_CHAR(vf.dFecha, 'DD/MM/YYYY') AS fecha, o.cCodigo AS cod_operacion, c.cCodigo AS cod_contenedor, uprod.cCodigo AS um_prod, urec.cCodigo AS um_rec, uscrap.cCodigo AS um_scrap 
								FROM ValeDeFabricacion vf 
								LEFT OUTER JOIN Operacion o ON o.iOperacionId = vf.iOperacionId
								LEFT OUTER JOIN Contenedor c ON c.iContenedorId = vf.iContenedorId
								LEFT OUTER JOIN UnidadDeMedida uprod ON uprod.iUnidadDeMedidaId = vf.iUnidadDeMedidaProducidaId
								LEFT OUTER JOIN UnidadDeMedida urec ON urec.iUnidadDeMedidaId = vf.iUnidadDeMedidaRecortesId
								LEFT OUTER JOIN UnidadDeMedida uscrap ON uscrap.iUnidadDeMedidaId = vf.iUnidadDeMedidaScrapId
								WHERE 
									vf.iOrdenDeTrabajoId = $id");
		
		$ret = array ();
		while (!$rs->Eof ()) {
			$item = new ValeDeFabricacion ();
			$item->id								= $rs->Fields ('iValeDeFabricacionId');
			$item->operacionId						= $rs->Fields ("iOperacionId");
			$item->centroDeTrabajoId 				= $rs->Fields ('iCentroDeTrabajoId');
			$item->ordenDeTrabajoId					= $rs->Fields ('iOrdenDeTrabajoId');
			$item->loteDeFabricacionId				= $rs->Fields ('iLoteDeFabricacionId');
			$item->empleadoId						= $rs->Fields ('iEmpleadoId');
			$item->cantidadProducida				= DB::FromFloat ($rs->Fields ('fCantidadProducida'));
			$item->cantidadRechazada				= DB::FromFloat ($rs->Fields ('fCantidadScrap'));
			$item->cantidadRecortes					= DB::FromFloat ($rs->Fields ('fCantidadRecortes'));
			$item->unidadDeMedidaCantProducidaId	= $rs->Fields ('iUnidadDeMedidaProducidaId');
			$item->unidadDeMedidaCantRechazadaId	= $rs->Fields ('iUnidadDeMedidaScrapId');
			$item->unidadDeMedidaCantRecortesId		= $rs->Fields ('iUnidadDeMedidaRecortesId');
			$item->observaciones					= $rs->Fields ('cObservaciones');
			$item->fecha							= $rs->Fields ('fecha');
			$item->contenedor						= null;
			$item->codigoOperacion					= $rs->Fields ('cod_operacion');
			$item->codigoContenedor					= $rs->Fields ('cod_contenedor');
			$item->codUMProducida					= $rs->Fields ("um_prod");
			$item->codUMRechazada					= $rs->Fields ("um_scrap");
			$item->codUMRecortes					= $rs->Fields ("um_rec");
			
			$ret[] = $item;

			$rs->Next ();
		}
		
		$rs->Close ();
		
		return $ret;
	}
	
	public static function GetValesDeFabricacionDeLote ($id) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT vf.*, TO_CHAR(vf.dFecha, 'DD/MM/YYYY') AS fecha, o.cCodigo AS cod_operacion, c.cCodigo AS cod_contenedor, uprod.cCodigo AS um_prod, urec.cCodigo AS um_rec, uscrap.cCodigo AS um_scrap 
								FROM ValeDeFabricacion vf 
								LEFT OUTER JOIN Operacion o ON o.iOperacionId = vf.iOperacionId
								LEFT OUTER JOIN Contenedor c ON c.iContenedorId = vf.iContenedorId
								LEFT OUTER JOIN UnidadDeMedida uprod ON uprod.iUnidadDeMedidaId = vf.iUnidadDeMedidaProducidaId
								LEFT OUTER JOIN UnidadDeMedida urec ON urec.iUnidadDeMedidaId = vf.iUnidadDeMedidaRecortesId
								LEFT OUTER JOIN UnidadDeMedida uscrap ON uscrap.iUnidadDeMedidaId = vf.iUnidadDeMedidaScrapId
								WHERE 
									vf.iLoteDeFabricacionId = $id");
		
		$ret = array ();
		while (!$rs->Eof ()) {
			$item = new ValeDeFabricacion ();
			$item->id								= $rs->Fields ('iValeDeFabricacionId');
			$item->operacionId						= $rs->Fields ("iOperacionId");
			$item->centroDeTrabajoId 				= $rs->Fields ('iCentroDeTrabajoId');
			$item->ordenDeTrabajoId					= $rs->Fields ('iOrdenDeTrabajoId');
			$item->loteDeFabricacionId				= $rs->Fields ('iLoteDeFabricacionId');
			$item->empleadoId						= $rs->Fields ('iEmpleadoId');
			$item->cantidadProducida				= DB::FromFloat ($rs->Fields ('fCantidadProducida'));
			$item->cantidadRechazada				= DB::FromFloat ($rs->Fields ('fCantidadScrap'));
			$item->cantidadRecortes					= DB::FromFloat ($rs->Fields ('fCantidadRecortes'));
			$item->unidadDeMedidaCantProducidaId	= $rs->Fields ('iUnidadDeMedidaProducidaId');
			$item->unidadDeMedidaCantRechazadaId	= $rs->Fields ('iUnidadDeMedidaScrapId');
			$item->unidadDeMedidaCantRecortesId		= $rs->Fields ('iUnidadDeMedidaRecortesId');
			$item->observaciones					= $rs->Fields ('cObservaciones');
			$item->fecha							= $rs->Fields ('fecha');
			$item->contenedor						= null;
			$item->codigoOperacion					= $rs->Fields ('cod_operacion');
			$item->codigoContenedor					= $rs->Fields ('cod_contenedor');
			$item->codUMProducida					= $rs->Fields ("um_prod");
			$item->codUMRechazada					= $rs->Fields ("um_scrap");
			$item->codUMRecortes					= $rs->Fields ("um_rec");
			
			$ret[] = $item;

			$rs->Next ();
		}
		
		$rs->Close ();
		
		return $ret;
	}	
	
	//---------- crud ----------
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT vf.*, c.cCodigo AS cod_contenedor, TO_CHAR(vf.dFecha, 'DD/MM/YYYY') AS fecha, u.cLoginName, TO_CHAR(vf.dTimestamp, 'DD/MM/YYYY HH24:MI:SS') AS timestamp
									FROM ValeDeFabricacion vf
									LEFT OUTER JOIN Contenedor c ON c.iContenedorId = vf.iContenedorId
									LEFT OUTER JOIN Usuario u ON u.iUsuarioId = vf.iUsuarioId
									WHERE 
										iValeDeFabricacionId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->centroDeTrabajoId 				= $rs->Fields ('iCentroDeTrabajoId');
			$this->ordenDeTrabajoId					= $rs->Fields ('iOrdenDeTrabajoId');
			$this->empleadoId						= $rs->Fields ('iEmpleadoId');
			$this->loteDeFabricacionId				= $rs->Fields ('iLoteDeFabricacionId');
			$this->cantidadProducida				= DB::FromFloat ($rs->Fields ('fCantidadProducida'));
			$this->cantidadRechazada				= DB::FromFloat ($rs->Fields ('fCantidadScrap'));
			$this->cantidadRecortes					= DB::FromFloat ($rs->Fields ('fCantidadRecortes'));
			$this->operacionId					 	= $rs->Fields ("iOperacionId");
			$this->timestamp						= $rs->Fields ("timestamp");
			$this->loginName						= $rs->Fields ("cLoginName");
			$this->unidadDeMedidaCantProducidaId	= $rs->Fields ('iUnidadDeMedidaProducidaId');
			$this->unidadDeMedidaCantRechazadaId	= $rs->Fields ('iUnidadDeMedidaScrapId');
			$this->unidadDeMedidaCantRecortesId		= $rs->Fields ('iUnidadDeMedidaRecortesId');
			$this->fecha							= $rs->Fields ('fecha');
			$this->observaciones					= $rs->Fields ('cObservaciones');
			$this->codigoContenedor					= $rs->Fields ('cod_contenedor');

			$rs->Close ();
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Borrar () {
	}
	
	public function Crear () {
		global $conn;
		
		try {
			$id_contenedor = null;
			if ($this->contenedor != null) {
				$id_contenedor = $this->contenedor->id;
			}
			
			//
			// Chequeamos que la unidad seleccionada tenga conversion a la unidad de fabricacion.
			//
			
			// Si informa por Orden de trabajo.
			if ($this->ordenDeTrabajoId != 0 && $this->ordenDeTrabajoId != null) {
				$ot = new OrdenDeTrabajo ($this->ordenDeTrabajoId);
				$ot->Leer ();

				$prod = new Producto ($ot->productoId);
				$prod->Leer ();
			
			// Si informa por lote.
			} else {
				$lote = new LoteDeFabricacion ($this->loteDeFabricacionId);
				$lote->Leer ();
				$prod = $lote->GetProducto ();
			}
			
			if ($this->unidadDeMedidaCantProducidaId != null) {
				if ($prod->ConvertirCantidad (Lib::DevolverNumero ($this->cantidadProducida), $this->unidadDeMedidaCantProducidaId, $prod->unidadDeMedidaFabricacionId) == null) {
					return new RetValue ('La UM con la que se indica la cantidad producida no puede convertirse a la UM de Fabricacion');
				}
			}
			
			if ($this->unidadDeMedidaCantRechazadaId != null) {
				// Si el producto es de fabricacion nos fijamos que se pueda convertir a la UM de fabricacion, sino a la UM de stock
				if ($prod->GetTipoDeProducto ()->EsProductoDeFabricacion ()) {
					$um_dest = $prod->unidadDeMedidaFabricacionId;
					$msg_err = 'La UM en la que se indica la Cant. Rechazada no puede convertirse a la UM de Fabricacion';				
					
				} else {
					$um_dest = $prod->unidadDeMedidaStockId;
					$msg_err = 'La UM en la que se indica la Cant. Rechazada no puede convertirse a la UM de Stock';
				}
				
				if ($prod->ConvertirCantidad (Lib::DevolverNumero ($this->cantidadRechazada), $this->unidadDeMedidaCantRechazadaId, $um_dest) == null) {
					return new RetValue ($msg_err);
				}
			}
			
			if ($this->unidadDeMedidaCantRecortesId != null) {
				// Si el producto es de fabricacion nos fijamos que se pueda convertir a la UM de fabricacion, sino a la UM de stock
				if ($prod->GetTipoDeProducto ()->EsProductoDeFabricacion ()) {
					$um_dest = $prod->unidadDeMedidaFabricacionId;
					$msg_err = 'La UM en la que se indica la Cant. de Recortes no puede convertirse a la UM de Fabricacion';				
					
				} else {
					$um_dest = $prod->unidadDeMedidaStockId;
					$msg_err = 'La UM en la que se indica la Cant. de Recortes  no puede convertirse a la UM de Stock';
				}
			
				if ($prod->ConvertirCantidad (Lib::DevolverNumero ($this->cantidadRecortes), $this->unidadDeMedidaCantRecortesId, $um_dest) == null) {
					return new RetValue ($msg_err);
				}
			}
		
			$conn->Execute ("INSERT INTO ValeDeFabricacion (
				  iValeDeFabricacionId
				, iOrdenDeTrabajoId
				, iCentroDeTrabajoId
				, iContenedorId
				, iUnidadDeMedidaProducidaId
				, iUnidadDeMedidaScrapId
				, iUnidadDeMedidaRecortesId
				, iEmpleadoId
				, iOperacionId
				, fCantidadProducida
				, fCantidadScrap
				, fCantidadRecortes
				, dTimestamp
				, dFecha
				, cObservaciones
				, bActivo
				, iUsuarioId
				, iLoteDeFabricacionId
			) VALUES (
				nextval ('seq_valefabricacion_id')
				, " . $this->SetNulleableIdValue ($this->ordenDeTrabajoId) . "
				, $this->centroDeTrabajoId
				, " . $this->SetNulleableIdValue ($id_contenedor) . "
				, " . $this->SetNulleableIdValue ($this->unidadDeMedidaCantProducidaId) . "
				, " . $this->SetNulleableIdValue ($this->unidadDeMedidaCantRechazadaId) . "
				, " . $this->SetNulleableIdValue ($this->unidadDeMedidaCantRecortesId) . "
				, " . $this->SetNulleableIdValue ($this->empleadoId) . "
				, " . $this->SetNulleableIdValue ($this->operacionId) . "
				, " . DB::SetNulleableFloatValue ($this->cantidadProducida) . "
				, " . DB::SetNulleableFloatValue ($this->cantidadRechazada) . "
				, " . DB::SetNulleableFloatValue ($this->cantidadRecortes) . "
				, CURRENT_TIMESTAMP
				, CURRENT_TIMESTAMP
				, '$this->observaciones'
				, true
				, " . Sesion::GetSesion ()->usuarioId . "
				, " . $this->SetNulleableIdValue ($this->loteDeFabricacionId) . "
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_valefabricacion_id');
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
}
?>
