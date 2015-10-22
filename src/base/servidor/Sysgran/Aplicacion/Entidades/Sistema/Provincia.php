<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: Provincia.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Provincias
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");

class Provincia extends EntidadBase {
	public $id;
	public $paisId;
	public $nombre;
	public $abreviatura;

	public function Provincia ($id = null) {
		$this->MapaCampos['paisId'] = 'iPaisId';
		$this->MapaCampos['nombre'] = 'cNombre';
		$this->MapaCampos['abreviatura'] = 'cAbreviatura';
		$this->id = $id;
	}
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM Provincia WHERE iProvinciaId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->paisId = $rs->Fields ("iPaisId");
			$this->nombre = $rs->Fields ("cNombre");
			$this->abreviatura = $rs->Fields ("cAbreviatura");
			$rs->Close ();
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Borrar () {
		global $conn;
		
		try {
			$conn->Execute ("DELETE FROM Provincia WHERE iProvinciaId = $this->id");
			
			return null;
					
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Crear () {
		global $conn;
		
		try {
			$conn->Execute ("INSERT INTO Provincia (iProvinciaId
				,iPaisId
				,cNombre
				,cAbreviatura
			) VALUES (
				nextval ('seq_provincia_id')
				,$this->paisId
				,'$this->nombre'
				,'$this->abreviatura'
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_provincia_id');
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
			$conn->Execute ("UPDATE Provincia SET $asig WHERE iProvinciaId = $this->id");			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
