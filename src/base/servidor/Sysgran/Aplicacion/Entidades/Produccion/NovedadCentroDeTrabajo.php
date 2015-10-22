<?
/**************************************************************************************************
 * Archivo: NovedadCentroDeTrabajo.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ('Sysgran/Core/Php/EntidadBase.php');
require_once ('Sysgran/Aplicacion/Entidades/Sistema/Usuario.php');

class NovedadCentroDeTrabajo extends EntidadBase {
	public $id;
	public $maquinaId;
	public $centroDeTrabajoId;
	public $tipoNovedadCTId;
	public $usuarioId;
	public $timestamp;
	public $comentarios;
	public $fechaYHora;
	public $activo;

	public function NovedadCentroDeTrabajo ($id = null) {
		$this->id = $id;
	}

	//---------- Metodos estaticos ----------
	
	//---------- Metodos Get ----------
	
	public function GetHoras () {
		return substr ($this->fechaYHora, 11, 2);
	}
	
	public function GetFecha () {
		return substr ($this->fechaYHora, 0, 10);
	}
	
	public function GetMinutos () {
		return substr ($this->fechaYHora, 14, 2);
	}
	
	public function GetUsuario () {
		$u = new Usuario ($this->usuarioId);
		$u->Leer ();
		
		return $u;
	}

	//---------- crud ----------
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT n.*, TO_CHAR(n.dTimestamp, 'DD/MM/YYYY HH24:MI:SS') AS timestamp, TO_CHAR(n.dFechaYHora, 'DD/MM/YYYY HH24:MI:SS') AS fecha
									FROM NovedadCentroDeTrabajo n
									WHERE 
										iNovedadCentroDeTrabajoId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->maquinaId 			= $rs->Fields ('iMaquinaId');
			$this->centroDeTrabajoId	= $rs->Fields ('iCentroDeTrabajoId');
			$this->tipoNovedadCTId		= $rs->Fields ('iTipoNovedadCTId');
			$this->usuarioId 			= $rs->Fields ("iUsuarioId");
			$this->timestamp			= $rs->Fields ("timestamp");
			$this->fechaYHora			= $rs->Fields ("fecha");
			$this->comentarios			= $rs->Fields ('cComentarios');

			$rs->Close ();
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Borrar () {
	}
	
	public function Crear () {
		global $conn;
		
		try {
			$conn->Execute ("INSERT INTO NovedadCentroDeTrabajo (
				  iNovedadCentroDeTrabajoId
				, iMaquinaId
				, iCentroDeTrabajoId
				, iTipoNovedadCTId
				, iUsuarioId
				, dTimestamp
				, cComentarios
				, dFechaYHora
				, bActivo

			) VALUES (
				nextval ('seq_novedad_ct_id')
				, " . $this->SetNulleableIdValue ($this->maquinaId) . "
				, $this->centroDeTrabajoId
				, $this->tipoNovedadCTId
				, " . Sesion::GetSesion ()->usuarioId . "
				, CURRENT_TIMESTAMP
				, '$this->comentarios'
				, TO_TIMESTAMP ('$this->fechaYHora', 'DD/MM/YYYY HH24:MI:SS')
				, true
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_novedad_ct_id');
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
}
?>
