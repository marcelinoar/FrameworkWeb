<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: Pais.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Paises
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");

class Pais extends EntidadBase {
	public $id;
	public $nombreAbreviado;
	public $nombreOficial;

	public function Pais ($id = null) {
		$this->MapaCampos['nombreAbreviado'] = 'cNombreAbreviado';
		$this->MapaCampos['nombreOficial'] = 'cNombreOficial';
		$this->id = $id;
	}
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM Pais WHERE iPaisId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->nombreAbreviado = $rs->Fields ("cNombreAbreviado");
			$this->nombreOficial = $rs->Fields ("cNombreOficial");
			$rs->Close ();
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Borrar () {
		global $conn;
		
		try {
			$conn->Execute ("DELETE FROM Pais WHERE iPaisId = $this->id");
			
			return null;
					
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Crear () {
		global $conn;
		
		try {
			$conn->Execute ("INSERT INTO Pais (iPaisId
				,cNombreAbreviado
				,cNombreOficial
			) VALUES (
				nextval ('seq_pais_id')
				,'$this->nombreAbreviado'
				,'$this->nombreOficial'
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_pais_id');
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
			$conn->Execute ("UPDATE Pais SET $asig WHERE iPaisId = $this->id");			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
