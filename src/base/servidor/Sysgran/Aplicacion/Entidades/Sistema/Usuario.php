<?
/**************************************************************************************************
 * Archivo: Usuario.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Usuarios
 * Modificaciones:
 *	- 18/2/2015: Adaptado al nuevo modelo de acceso.
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");
require_once ("Grupo.php");

class Usuario extends EntidadBase {
	public $id;
	public $loginName;
	public $password;
	public $grupos = array ();
	public $email;
	public $empleadoId;
	public $comentario;

	public function Usuario ($id = null) {
		$this->MapaCampos['email'] = 'cEmail';
		$this->MapaCampos['empleadoId'] = 'iEmpleadoId';
		$this->MapaCampos['comentario'] = 'cComentario';
		$this->id = $id;
	}
	
	/**
	 *
	 * Chequea la disponibilidad de un loginName. 
	 *
	 * @param	$loginName: LoginName a chequear
	 *
	 * @return	Devuelve null si esta disponible o RetValue en caso contrario.
	 */
	public static function ChequearLoginName ($loginName) {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT COUNT(*) as cnt FROM Usuario WHERE cLoginName = '$loginName'");
			
			if ($rs->Fields ("cnt") == 0) {
				$ret = null;
			
			} else {
				$ret = new RetValue ("El nombre de usuario ya pertenece a un usuario del sistema");
			}
			
			$rs->Close ();
			
			return $ret;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}		
	}
	
	// 
	// Esta devolviendo el grupo sin los usuarios (para no armar un loop infinito). Ver que onda.
	//
	static public function GetUsuariosDeGrupo ($grupoId) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT u.iUsuarioId, u.iEmpleadoId, u.cLoginName, u.cPassword, u.cEmail, u.cComentario 
								FROM Usuario u, UsuarioGrupo ug
								WHERE
									u.iUsuarioId = ug.iUsuarioId AND
									ug.iGrupoId = $grupoId");
		$ret = array ();							
		while (!$rs->Eof ()) {
			$obj = new Grupo ();
			$obj->id			= $rs->Fields ("iUsuarioId");
			$obj->loginName 	= $rs->Fields ("cLoginName");
			$obj->password 		= $rs->Fields ("cPassword");
			$obj->email 		= $rs->Fields ("cEmail");
			$obj->empleadoId 	= $rs->Fields ("iEmpleadoId");
			$obj->comentario 	= $rs->Fields ("cComentario");
			$ret[] = $obj;	
			
			$rs->Next ();
		}
		
		$rs->Close ();
		
		return $ret;
	}	
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM Usuario WHERE iUsuarioId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->loginName = $rs->Fields ("cLoginName");
			$this->email = $rs->Fields ("cEmail");
			$this->empleadoId = $rs->Fields ("iEmpleadoId");
			$this->comentario = $rs->Fields ("cComentario");
			$rs->Close ();
		 
		 	$this->grupos = Grupo::GetGruposDeUsuario ($this->id);
		 
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Borrar () {
		global $conn;
		
		try {
			$conn->Execute ("DELETE FROM Usuario WHERE iUsuarioId = $this->id");
			$conn->Execute ("DELETE FROM UsuarioGrupo WHERE iUsuarioId = $this->id");
			
			return null;
					
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Crear () {
		global $conn;
		
		try {
			$conn->Execute ("INSERT INTO Usuario (iUsuarioId
				,cLoginName
				,cPassword
				,cEmail
				,iEmpleadoId
				,cComentario
				,bActivo
			) VALUES (
				nextval ('seq_usuario_id')
				,'$this->loginName'
				,'$this->password'
				,'$this->email'
				," . ($this->empleadoId == null ? 'NULL' : $this->empleadoId) . "
				,'$this->comentario'
				, " . DB::ToBoolean (true) . "
			)");
		
			$this->id = $conn->GetSecuenceLastId ("seq_usuario_id");
		
			foreach ($this->grupos as $item) {
				$this->CrearRelacionGrupo ($this->id, $item->grupoId);
			}
			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	protected function CrearRelacionGrupo ($usuarioId, $grupoId) {
		global $conn;
		
		$conn->Execute ("INSERT INTO UsuarioGrupo (iGrupoId, iUsuarioId) VALUES ($grupoId, $usuarioId)");
	}
	
	protected function BorrarRelacionGrupo ($usuarioId, $grupoId) {
		global $conn;
		
		$conn->Execute ("DELETE FROM UsuarioGrupo WHERE iUsuarioId = $usuarioId AND iGrupoId = $grupoId");
	}
	
	public function Actualizar ($campos = null) {
		global $conn;
		
		try {
			if ($campos != null) {
				$this->ActualizarCampos ($campos);
				$this->ActualizarCampoRelacionUnoAMuchos  ($campos, "grupos", "grupoId", "id", "CrearRelacionGrupo", "BorrarRelacionGrupo");
			}
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}

	private function ActualizarCampos ($campos) {
		global $conn;
			
		$this->ActualizarPropiedades ($campos);
		$asig = $this->GetInfoCamposActualizar ($campos);
		$conn->Execute ("UPDATE Usuario SET $asig WHERE iUsuarioId = $this->id");
		
		// Si password != '' lo actualizamos
		if (isset ($campos['password']) && $campos['password'] != '') {
			$conn->Execute ("UPDATE Usuario SET cPassword = '" . $campos['password'] . "' WHERE iUsuarioId = $this->id");
		}
	}
}
?>
