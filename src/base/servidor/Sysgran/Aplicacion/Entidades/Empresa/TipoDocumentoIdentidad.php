<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: TipoDocumentoIdentidad.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Tipo Documento de Identidad
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");

class TipoDocumentoIdentidad extends EntidadBase {
	public $id;
	public $nombre;

	public function TipoDocumentoIdentidad ($id = null) {
		$this->MapaCampos['nombre'] = 'cNombre';
		$this->id = $id;
	}
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM TipoDocumentoIdentidad WHERE iTipoDocumentoIdentidadId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->nombre = $rs->Fields ("cNombre");
			$rs->Close ();
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Borrar () {
		global $conn;
		
		try {
			$conn->Execute ("DELETE FROM TipoDocumentoIdentidad WHERE iTipoDocumentoIdentidadId = $this->id");
			
			return null;
					
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Crear () {
		global $conn;
		
		try {
			$conn->Execute ("INSERT INTO TipoDocumentoIdentidad (iTipoDocumentoIdentidadId
				,cNombre
			) VALUES (
			nextval ('seq_tipo_doc_identidad_id')
				,'$this->nombre'
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_tipo_doc_identidad_id');
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
			$conn->Execute ("UPDATE TipoDocumentoIdentidad SET $asig WHERE iTipoDocumentoIdentidadId = $this->id");			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
