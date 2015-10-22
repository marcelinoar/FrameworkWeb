<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: Ciudad.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Ciudades
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");

class Ciudad extends EntidadBase {
	public $id;
	public $paisId;
	public $provinciaId;
	public $nombre;

	public function Ciudad ($id = null) {
		$this->MapaCampos['paisId'] 		= 'iPaisId';
		$this->MapaCampos['provinciaId'] 	= 'iProvinciaId';
		$this->MapaCampos['nombre'] 		= 'cNombre';
		$this->id = $id;
	}
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM Ciudad WHERE iCiudadId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->paisId = $rs->Fields ("iPaisId");
			$this->provinciaId = $rs->Fields ("iProvinciaId");
			$this->nombre		= $rs->Fields ("cNombre");
			$rs->Close ();
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Borrar () {
		global $conn;
		
		try {
			$conn->Execute ("DELETE FROM Ciudad WHERE iCiudadId = $this->id");
			
			return null;
					
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Crear () {
		global $conn;
		
		try {
			$conn->Execute ("INSERT INTO Ciudad (iCiudadId
				,iPaisId
				,iProvinciaId
				,cNombre
			) VALUES (
				nextval ('seq_ciudad_id')
				,$this->paisId
				,$this->provinciaId
				,'$this->nombre'
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_ciudad_id');
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
			$conn->Execute ("UPDATE Ciudad SET $asig WHERE iCiudadId = $this->id");			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
