<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: TipoActMantMaquina.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Tipo de actividades de mantenimiento de Maquina
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");

class TipoActMantMaquina extends EntidadBase {
	public $id;
	public $nombre;

	public function TipoActMantMaquina ($id = null) {
		$this->MapaCampos['nombre'] = 'cNombre';
		$this->id = $id;
	}
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM TipoActMantMaquina WHERE iTipoActMantMaquinaId = $this->id");
									
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
			$rs = $conn->Retrieve ("SELECT COUNT(*) AS cnt FROM ActMantMaquina WHERE iTipoActMantMaquinaId = $this->id");
			
			if ($rs->Fields ("cnt") == 0) {
				$conn->Execute ("DELETE FROM TipoActMantMaquina WHERE iTipoActMantMaquinaId = $this->id");
				
			} else {
				$conn->Execute ("UPDATE TipoActMantMaquina SET bActiva = false WHERE iTipoActMantMaquinaId = $this->id");
			}
			
			$rs->Close ();
			
			return null;
					
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Crear () {
		global $conn;
		
		try {
			$conn->Execute ("INSERT INTO TipoActMantMaquina (iTipoActMantMaquinaId
				,cNombre
				,bActivo
			) VALUES (
				nextval ('seq_tipo_act_mant_maq_id')
				,'$this->nombre'
				, " . DB::ToBoolean (true) . "
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_tipo_act_mant_maq_id');
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
			$conn->Execute ("UPDATE TipoActMantMaquina SET $asig WHERE iTipoActMantMaquinaId = $this->id");			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
