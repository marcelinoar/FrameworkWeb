<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: AtributoCentroDeTrabajo.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Centro de Trabajo
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");

class AtributoCentroDeTrabajo extends EntidadBase {
	public $id;
	public $centroDeTrabajoId;
	public $nombre;
	public $valor;
	
	public static function GetAtributosCentroDeTrabajo ($ct_id) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT * FROM AtributoCentroDeTrabajo WHERE iCentroDeTrabajoId = $ct_id");
		
		$ret = array ();
		while (!$rs->Eof ()) {
			$obj = new AtributoCentroDeTrabajo ();
			$obj->id 				= $rs->Fields ("iAtributoCentroDeTrabajoId");
			$obj->centroDeTrabajoId = $rs->Fields ("iCentroDeTrabajoId");
			$obj->nombre 			= $rs->Fields ("cNombre");
			$obj->valor				= $rs->Fields ("cValor");
			$ret[] = $obj;
				
			$rs->Next ();
		}
		
		$rs->Close ();
		
		
		return $ret;
	}	
	
	public function AtributoCentroDeTrabajo ($id = null) {
		$this->MapaCampos['nombre'] = 'cNombre';
		$this->MapaCampos['valor'] 	= 'cValor';
		
		$this->id = $id;
	}	
	
	public function Leer () {
		global $conn;
		
		try {		
			$rs = $conn->Retrieve ("SELECT iCentroDeTrabajoId, iAtributoCentroDeTrabajoId, cValor, cNombre FROM AtributoCentroDeTrabajo WHERE iAtributoCentroDeTrabajoId = $this->id");

			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$obj->centroDeTrabajoId		= $rs->Fields ("iCentroDeTrabajoId");
			$obj->nombre				= $rs->Fields ("cNombre");
			$obj->valor					= $rs->Fields ("cValor");
			$rs->Close ();
			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}			
	}
	
	public function Borrar () {
		global $conn;
		
		try {
			$conn->Execute ("DELETE FROM AtributoCentroDeTrabajo WHERE iAtributoCentroDeTrabajoId = $this->id");
			
			return null;
					
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}			
	}
	
	public function Crear () {
		global $conn;
		
		try {
			$conn->Execute ("INSERT INTO AtributoCentroDeTrabajo (iAtributoCentroDeTrabajoId
				,iCentroDeTrabajoId
				,cNombre
				,cValor
			) VALUES (
				nextval ('seq_atributo_ct_id')
				,$this->centroDeTrabajoId
				,'$this->nombre'
				,'$this->valor'
			)");

			$this->id = $conn->GetSecuenceLastId ('seq_atributo_ct_id');
			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}

	public function Actualizar ($campos = null) {
		global $conn;

		try {		
			if ($campos != null) {
				$this->ActualizarPropiedades ($campos);
			} 

			$asig = $this->GetInfoCamposActualizar ($campos);
			$conn->Execute ("UPDATE AtributoCentroDeTrabajo SET $asig WHERE iAtributoCentroDeTrabajoId = $this->id");
			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
