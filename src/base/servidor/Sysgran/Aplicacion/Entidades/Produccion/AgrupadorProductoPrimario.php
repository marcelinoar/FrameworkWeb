<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: AgrupadorProductoPrimario.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Agrupador primario
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");

class AgrupadorProductoPrimario extends EntidadBase {
	public $id;
	public $nombre;

	public function AgrupadorProductoPrimario ($id = null) {
		$this->MapaCampos['nombre'] = 'cNombre';
		$this->id = $id;
	}
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM AgrupadorProductoPrimario WHERE iAgrupadorProductoPrimarioId = $this->id");
									
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
									FROM AgrupadorProductoPrimario a
									LEFT OUTER JOIN Producto p ON p.iAgrupadorProductoPrimarioId = a.iAgrupadorProductoPrimarioId
									WHERE
										a.iAgrupadorProductoPrimarioId = $this->id");
			
			if ($rs->Fields ("cnt") == 0) {
				$conn->Execute ("DELETE FROM AgrupadorProductoPrimario WHERE iAgrupadorProductoPrimarioId = $this->id");			
			
			} else {
				$conn->Execute ("UPDATE AgrupadorProductoPrimario SET bActivo = " . DB::ToBoolean (false) . " WHERE iAgrupadorProductoPrimarioId = $this->id");
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
			$conn->Execute ("INSERT INTO AgrupadorProductoPrimario (iAgrupadorProductoPrimarioId
				,cNombre
				,bActivo
			) VALUES (
				nextval ('seq_agr_prod1_id')
				,'$this->nombre'
				," . DB::ToBoolean (true) . "
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_agr_prod1_id');
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
			$conn->Execute ("UPDATE AgrupadorProductoPrimario SET $asig WHERE iAgrupadorProductoPrimarioId = $this->id");			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
