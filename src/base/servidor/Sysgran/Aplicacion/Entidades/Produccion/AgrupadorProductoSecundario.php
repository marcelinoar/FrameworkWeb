<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: AgrupadorProductoSecundario.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Nivel de agrupacion 2
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");

class AgrupadorProductoSecundario extends EntidadBase {
	public $id;
	public $nombre;

	public function AgrupadorProductoSecundario ($id = null) {
		$this->MapaCampos['nombre'] = 'cNombre';
		$this->id = $id;
	}
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM AgrupadorProductoSecundario WHERE iAgrupadorProductoSecundarioId = $this->id");
									
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
									FROM AgrupadorProductoSecundario a
									LEFT OUTER JOIN Producto p ON p.iAgrupadorProductoSecundarioId = a.iAgrupadorProductoSecundarioId
									WHERE
										a.iAgrupadorProductoSecundarioId = $this->id");
			
			if ($rs->Fields ("cnt") == 0) {
				$conn->Execute ("DELETE FROM AgrupadorProductoSecundario WHERE iAgrupadorProductoSecundarioId = $this->id");			
			
			} else {
				$conn->Execute ("UPDATE AgrupadorProductoSecundario SET bActivo = " . DB::ToBoolean (false) . " WHERE iAgrupadorProductoSecundarioId = $this->id");
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
			$conn->Execute ("INSERT INTO AgrupadorProductoSecundario (iAgrupadorProductoSecundarioId
				,cNombre
				,bActivo
			) VALUES (
				nextval('seq_agr_prod2_id')
				,'$this->nombre'
				," . DB::ToBoolean (true) . "
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_agr_prod2_id');
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
			$conn->Execute ("UPDATE AgrupadorProductoSecundario SET $asig WHERE iAgrupadorProductoSecundarioId = $this->id");			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
