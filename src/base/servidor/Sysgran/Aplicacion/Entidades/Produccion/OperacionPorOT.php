<?
/**************************************************************************************************
 * Archivo: OperacionPorOT.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: 
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");

class OperacionPorOT extends EntidadBase {
	// Estas son las claves
	public $ordenDeTrabajoId;
	public $operacionId;
	public $hojaDeRutaId;	

	// Campos de datos	
	public $codigoOperacion;
	public $descripcionOperacion;
	public $maquinaId;
	public $codigoMaquina;
	public $kgDeMerma;
	public $tiempoEstandar;
	
	public function OperacionPorOT ($ordenDeTrabajoId = null, $operacionId = null, $hojaDeRutaId = null) {
		$this->ordenDeTrabajoId = $ordenDetrabajoId;
		$this->operacionId 	= $operacionId;
		$this->hojaDeRutaId = $hojaDeRutaId;
	}
	
	//---------- Funciones publicas estaticas de la clase ----------
	
	public static function GetDetallesProducto ($productoId) {
		global $conn;
/*		
		$rs = $conn->Retrieve ("SELECT dp.*, o.cCodigo AS codigo_operacion, m.cCodigo AS codigo_maquina
								FROM DetHojaDeRutaProductoMaquina dp
								LEFT OUTER JOIN Operacion o ON dp.iOperacionId = o.iOperacionId
								LEFT OUTER JOIN Maquina m ON m.iMaquinaId = dp.iMaquinaId
								WHERE 
									dp.iProductoId = $productoId");
									
		$ret = array ();
		while (!$rs->Eof ()) {
			$item = new DetHojaDeRutaProductoMaquina ($productoId, $rs->Fields ("iOperacionId"), $rs->Fields ("iHojaDeRutaId"), $rs->Fields ("iMaquinaId"));
			$item->SetPropiedades ($rs);

			$ret[] = $item;
			$rs->Next ();
		}
		$rs->Close ();
		
		return $ret;
*/		
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
		return ($this->ordenDeTrabajoId == $obj->ordenDeTrabajoId 
				&& $this->hojaDeRutaId 	== $obj->hojaDeRutaId 
				&& $this->operacionId 	== $obj->operacionId);
	}

	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}
			
			$this->SetPropiedades ($rs);
			
			$rs->Close ();
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	private function SetPropiedades ($rs) {
		$this->maquinaId = $rs->Fields ("iMaquinaId");
	}

	// No se puede borrar.	
	public function Borrar () {
	}
	
	public function Crear () {
		global $conn;
		
		try {
			$conn->Execute ("INSERT INTO OperacionPorOT (
				iOrdenDeTrabajoId
				,iOperacionId
				,iHojaDeRutaId
				,iMaquinaId
			) VALUES (
				$this->ordenDeTrabajoId
				,$this->operacionId
				,$this->hojaDeRutaId
				,$this->maquinaId
			)");
		
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Actualizar ($campos = null) {
		global $conn;
		
		try {
			$conn->Execute ("UPDATE OperacionPorOT 
							SET 
								iMaquinaId = $this->maquinaId
							WHERE 
								iOrdenDeTrabajoId = $this->ordenDeTrabajoId AND 
								iOperacionId = $this->operacionId AND
								iHojaDeRutaId = $this->hojaDeRutaId");			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
