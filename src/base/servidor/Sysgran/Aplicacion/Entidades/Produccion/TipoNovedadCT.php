<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: TipoNovedadCT.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Tipo Novedad por centro de trabajo
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");

class TipoNovedadCT extends EntidadBase {
	public $id;
	public $nombre;

	public function TipoNovedadCT ($id = null) {
		$this->MapaCampos['nombre'] = 'cNombre';
		$this->id = $id;
	}
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM TipoNovedadCT WHERE iTipoNovedadCTId = $this->id");
									
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
			$rs = $conn->Retrieve ("SELECT COUNT(*) AS cnt FROM NovedadCentroDeTrabajo WHERE iTipoNovedadCTId = $this->id");
			if ($rs->Fields ("cnt") == 0) {
				$conn->Execute ("DELETE FROM TipoNovedadCT WHERE iTipoNovedadCTId = $this->id");
			
			} else {
				$conn->Execute ("UPDATE TipoNovedadCT SET bActivo = " . DB::ToBoolean (false) . " WHERE iTipoNovedadCTId = $this->id");
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
			$conn->Execute ("INSERT INTO TipoNovedadCT (iTipoNovedadCTId
				,cNombre
				,bActivo
			) VALUES (
				nextval ('seq_tipo_novedad_ct_id')
				,'$this->nombre'
				, " . DB::ToBoolean (true) . "
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_tipo_novedad_ct_id');
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
			$conn->Execute ("UPDATE TipoNovedadCT SET $asig WHERE iTipoNovedadCTId = $this->id");			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
