<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: AgrupadorProductoTerciario.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM Nivel 3
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");

class AgrupadorProductoTerciario extends EntidadBase {
	public $id;
	public $nombre;

	public function AgrupadorProductoTerciario ($id = null) {
		$this->MapaCampos['nombre'] = 'cNombre';
		$this->id = $id;
	}
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM AgrupadorProductoTerciario WHERE iAgrupadorProductoTerciarioId = $this->id");
									
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
			$rs = $conn->Retrieve ("SELECT COUNT(p.*) AS cnt
									FROM AgrupadorProductoTerciario a
									LEFT OUTER JOIN Producto p ON p.iAgrupadorProductoTerciarioId = a.iAgrupadorProductoTerciarioId
									WHERE
										a.iAgrupadorProductoTerciarioId = $this->id");
			
			if ($rs->Fields ("cnt") == 0) {
				$conn->Execute ("DELETE FROM AgrupadorProductoTerciario WHERE iAgrupadorProductoTerciarioId = $this->id");			
			
			} else {
				$conn->Execute ("UPDATE AgrupadorProductoTerciario SET bActivo = " . DB::ToBoolean (false) . " WHERE iAgrupadorProductoTerciarioId = $this->id");
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
			$conn->Execute ("INSERT INTO AgrupadorProductoTerciario (iAgrupadorProductoTerciarioId
				,cNombre
				,bActivo
			) VALUES (
				nextval ('seq_agr_prod3_id')
				,'$this->nombre'
				," . DB::ToBoolean (true) . "
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_agr_prod3_id');
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
			$conn->Execute ("UPDATE AgrupadorProductoTerciario SET $asig WHERE iAgrupadorProductoTerciarioId = $this->id");			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
