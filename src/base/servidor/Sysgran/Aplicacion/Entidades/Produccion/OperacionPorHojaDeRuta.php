<?
/**************************************************************************************************
 * Archivo: OperacionPorHojaDeRuta.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: 
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");

class OperacionPorHojaDeRuta extends EntidadBase {
	public $hojaDeRutaId;
	public $operacionId;
	public $nroDeOrden;
	public $codigo;
	
	public function OperacionPorHojaDeRuta ($hojaDeRutaId = null, $operacionId = null) {
		$this->hojaDeRutaId = $hojaDeRutaId;
		$this->operacionId 	= $operacionId;
	}
	
	//---------- Funciones publicas estaticas de la clase ----------

	public static function GetOperacionesPorHojaDeRuta ($hojaDeRutaId) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT o.*, d.iNroDeOrden
								FROM Operacion o, DetHojaDeRuta d 
								WHERE 
									o.iOperacionId = d.iOperacionId AND
									d.iHojaDeRutaId = $hojaDeRutaId
								ORDER BY iNroDeOrden DESC");
									
		$ret = array ();
		while (!$rs->Eof ()) {
			$obj = new OperacionPorHojaDeRuta ();
			$obj->id 				= $rs->Fields ("iOperacionId");
			$obj->operacionId		= $rs->Fields ("iOperacionId");
			$obj->hojaDeRutaId		= $hojaDeRutaId;
			$obj->codigo			= $rs->Fields ("cCodigo");
			$obj->centroDeTrabajoId = $rs->Fields ("iCentroDeTrabajoId");
			$obj->nombre 			= $rs->Fields ("cNombre");
			$obj->descripcion		= $rs->Fields ("cDescripcion");
			$obj->nroDeOrden		= $rs->Fields ("iNroDeOrden");
			$ret[] = $obj;

			$rs->Next ();
		}
		$rs->Close ();
		
		return $ret;
	}
	
	//---------- Metodos del CRUD ----------
	
	/**
	 *
	 * Indica si un objeto comparte las mismas claves que this
	 *
	 * @param	$obj Objeto a chequear
	 *
	 * @return	Devuelve true si las claves son iguales, false de lo contrario
	 */
	public function EsEquivalente ($obj) {
		return ($this->hojaDeRutaId == $obj->hojaDeRutaId && $this->operacionId == $obj->operacionId);
	}

	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT iNroDeOrden FROM DetHojaDeRuta WHERE iHojaDeRutaId = $this->hojaDeRutaId AND iOperacionId = $this->operacionId");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}
			
			$this->nroDeOrden = $rs->Fields ("iNroDeOrden");
			
			$rs->Close ();
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Borrar () {
		global $conn;
		
		try {
			$conn->Execute ("DELETE FROM DetHojaDeRuta 
							WHERE 
								iOperacionId = $this->operacionId AND 
								iHojaDeRutaId = $this->hojaDeRutaId");
			
			return null;
					
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Crear () {
		global $conn;
		
		try {
			$conn->Execute ("INSERT INTO DetHojaDeRuta (iOperacionId, iHojaDeRutaId, iNroDeOrden) VALUES ($this->operacionId , $this->hojaDeRutaId, $this->nroDeOrden)");
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Actualizar ($campos = null) {
		global $conn;
		
		try {
			$conn->Execute ("UPDATE DetHojaDeRuta SET iNroDeOrden = $this->nroDeOrden WHERE iOperacionId = $this->operacionId AND iHojaDeRutaId = $this->hojaDeRutaId");
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
