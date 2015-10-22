<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: LoteDeFabricacion.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Lotes
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");
require_once ('OrdenDeTrabajo.php');
require_once ('CentroDeTrabajo.php');
require_once ('ValeDeFabricacion.php');
require_once ('Producto.php');

class LoteDeFabricacion extends EntidadBase {
	public $id;
	public $productoId;
	public $comentario;
	public $centroDeTrabajoId;
	public $fechaCreacion;
	
	public $ordenesDeTrabajo = array ();
	public $valesDeFabricacion = array ();

	public function LoteDeFabricacion ($id = null) {
		$this->MapaCampos['productoId'] = 'iProductoId';
		$this->MapaCampos['comentario'] = 'cComentario';
		$this->MapaCampos['centroDeTrabajoId'] = 'iCentroDeTrabajoId';
		$this->id = $id;
	}
	
	//---------- Funciones Get ----------
	
	public function GetCentroDeTrabajo () {
		$ct = new CentroDeTrabajo ($this->centroDeTrabajoId);
		$ct->Leer ();
		
		return $ct;
	}
	
	public function GetProducto () {
		$p = new Producto ($this->productoId);
		$p->Leer ();
		
		return $p;
	}
	
	//---------- Funciones para setear los atributos relacionados ----------
	
	public function SetOrdenesDeTrabajo ($ots) {
		$this->ordenesDeTrabajo = $ots;
	}	
	
	//---------- CRUD ----------
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT l.*, TO_CHAR(l.dFechaCreacion, 'DD/MM/YYYY') AS fecha  
									FROM LoteDeFabricacion l
									WHERE 
										l.iLoteDeFabricacionId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->productoId 			= $rs->Fields ("iProductoId");
			$this->comentario			= $rs->Fields ('cComentario');
			$this->centroDeTrabajoId	= $rs->Fields ('iCentroDeTrabajoId');
			$this->fechaCreacion		= $rs->Fields ('fecha');
			$rs->Close ();
			
			$this->ordenesDeTrabajo = OrdenDeTrabajo::GetOrdenesDeTrabajoPorLote ($this->id);
			$this->valesDeFabricacion = ValeDeFabricacion::GetValesDeFabricacionDeLote ($this->id);
		 
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Borrar () {
		global $conn;
		
		try {
			foreach ($this->ordenesDeTrabajo as $item) {
				$item->Borrar ();
			}

			$conn->Execute ("DELETE FROM LoteDeFabricacion WHERE iLoteDeFabricacionId = $this->id");
			
			return null;
					
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Crear () {
		global $conn;
		
		try {
			$conn->Execute ("INSERT INTO LoteDeFabricacion (
				iLoteDeFabricacionId
				,iProductoId
				,iCentroDeTrabajoId
				,cComentario
				,dFechaCreacion
				,bActivo
			) VALUES (
				nextval ('seq_lote_fab_id')
				,$this->productoId
				,$this->centroDeTrabajoId
				,'$this->comentario'
				,CURRENT_TIMESTAMP
				," . DB::ToBoolean (true) . "
			)");
		
			$this->id = $conn->GetSecuenceLastId ("seq_lote_fab_id");
			
			// Ordenes de Trabajo
			foreach ($this->ordenesDeTrabajo as $item) {
				$this->CrearRelacionOT ($this->id, $item->id);
			}

			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	protected function CrearRelacionOT ($loteId, $ordenDeTrabajoId) {
		global $conn;
		
		$conn->Execute ("UPDATE OrdenDeTrabajo SET iLoteDeFabricacionId = $loteId WHERE iOrdenDeTrabajoId = $ordenDeTrabajoId");
	}
	
	protected function BorrarRelacionOT ($loteId, $ordenDeTrabajoId) {
		global $conn;
		
		$conn->Execute ("UPDATE OrdenDeTrabajo SET iLoteDeFabricacionId = null WHERE iOrdenDeTrabajoId = $ordenDeTrabajoId");
	}	
	
	public function Actualizar ($campos = null) {
		global $conn;
		
		try {
			if ($campos != null) {
				$this->ActualizarCampos ($campos);
				$this->ActualizarCampoRelacionUnoAMuchos  ($campos, "ordenesDeTrabajo", "id", "id", "CrearRelacionOT", "BorrarRelacionOT");
			}
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}

	private function ActualizarCampos ($campos) {
		global $conn;
			
		$this->ActualizarPropiedades ($campos);
		$asig = $this->GetInfoCamposActualizar ($campos);
		$conn->Execute ("UPDATE LoteDeFabricacion SET $asig WHERE iLoteDeFabricacionId = $this->id");			
	}
}
?>
