<?
/**************************************************************************************************
 * Archivo: Grupo.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Grupos de usuarios
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");
require_once ("Sysgran/Core/Php/Lib.php");
require_once ("Usuario.php");
require_once ("Empresa.php");
require_once ("MenuItem.php");
require_once ("PermisoEstandarEntidad.php");
require_once ("PermisoCustomEntidad.php");

class Grupo extends EntidadBase {
	public $id;
	public $empresas 			= array ();		// Array de empresas
	public $usuarios 			= array ();		// Array de usuarios
	public $menuItems 			= array ();		// Array de ids. No se carga en la lectura
	public $permisosEstandar	= array ();		// Array de PermisosEstandar
	public $permisosCustom		= array ();		// Array de permisosCustom
	public $nombre;
	public $descripcion;

	public function Grupo ($id = null) {
		$this->MapaCampos['nombre'] = 'cNombre';
		$this->MapaCampos['descripcion'] = 'cDescripcion';
		$this->id = $id;
	}
	
	/**
	 *
	 * Recibe un array con los ids de los items de menu a incluir en el grupo.
	 *
	 * @param	$menu_items: Array con los items de menu a incluir en el grupo
	 */
	
	public function SetMenuItems ($menu_items) {
		$this->menuItems = $menu_items;
	}
	
	public function SetEmpresas ($arr) {
		$this->empresas = array ();
		
		foreach ($arr as $item) {
			$obj = new Empresa ($item->id);
			$obj->ActualizarPropiedades ($item);
			$this->empresas[] = $obj;
		}
	}
	
	public function SetUsuarios ($arr) {
		$this->usuarios = array ();
		
		foreach ($arr as $item) {
			$obj = new Usuario ($item->id);
			$obj->ActualizarPropiedades ($item);
			$this->usuarios[] = $obj;
		}
	}
	
	public function SetPermisosEstandar ($arr) {
		$this->permisosEstandar = array ();
		
		foreach ($arr as $item) {
			$obj = new PermisoEstandarEntidad ();
			$obj->ActualizarPropiedades ($item);
			$this->permisosEstandar[] = $obj;
		}
	}
	
	public function SetPermisosCustom ($arr) {
		$this->permisosCustom = array ();
		
		foreach ($arr as $item) {
			$obj = new PermisoCustomEntidad ();
			$obj->ActualizarPropiedades ($item);
			$this->permisosCustom[] = $obj;
		}
	}
	
	/**
	 *
	 * Para un usuario dado devuelve todos los grupos a los que pertenece. Carga los objetos sin las relaciones.
	 *
	 * @param	$usuarioId: Id del usuario
	 *
	 * @return	Devuelve un array de objetos del tipo Grupo
	 */
	
	static public function GetGruposDeUsuario ($usuarioId) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT g.iGrupoId, g.cNombre, g.cDescripcion 
								FROM Grupo g, UsuarioGrupo ug
								WHERE
									g.iGrupoId = ug.iGrupoId AND
									ug.iUsuarioId = $usuarioId");
		$ret = array ();							
		while (!$rs->Eof ()) {
			$obj = new Grupo ();
			$obj->id			= $rs->Fields ("iGrupoId");
			$obj->grupoId		= $rs->Fields ("iGrupoId");
			$obj->nombre		= $rs->Fields ("cNombre");
			$obj->descripcion	= $rs->Fields ("cDescripcion");
			$ret[] = $obj;	
			
			$rs->Next ();
		}
		
		$rs->Close ();
		
		return $ret;
	}

	/**
	 *
	 * Devuelve todos los grupos relacionados con una empresa dada. Carga los objetos sin las relaciones.
	 *
	 * @param	$emprsaId: Id de la empresa
	 *
	 * @return	Devuelve un array de objetos del tipo Grupo.
	 */
	
	static public function GetGruposDeEmpresa ($empresaId) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT g.iGrupoId, g.cNombre, g.cDescripcion 
								FROM Grupo g, EmpresaGrupo eg
								WHERE
									g.iGrupoId = eg.iGrupoId AND
									eg.iEmpresaId = $empresaId");
		$ret = array ();							
		while (!$rs->Eof ()) {
			$obj = new Grupo ();
			$obj->id			= $rs->Fields ("iGrupoId");
			$obj->grupoId		= $rs->Fields ("iGrupoId");
			$obj->nombre		= $rs->Fields ("cNombre");
			$obj->descripcion	= $rs->Fields ("cDescripcion");
			$ret[] = $obj;	
			
			$rs->Next ();
		}
		
		$rs->Close ();
		
		return $ret;
	}
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM Grupo WHERE iGrupoId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->nombre = $rs->Fields ("cNombre");
			$this->descripcion = $rs->Fields ("cDescripcion");
			$rs->Close ();
			
			$this->empresas 		= Empresa::GetEmpresasDeGrupo ($this->id);
			$this->usuarios 		= Usuario::GetUsuariosDeGrupo ($this->id);
			$this->permisosEstandar	= PermisoEstandarEntidad::GetPermisosDeGrupo ($this->id);
			$this->permisosCustom	= PermisoCustomEntidad::GetPermisosCustomDeGrupo ($this->id);

			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Borrar () {
		global $conn;
		
		try {
			$conn->Execute ("DELETE FROM Grupo WHERE iGrupoId = $this->id");
			$conn->Execute ("DELETE FROM EmpresaGrupo WHERE iGrupoId = $this->id");
			$conn->Execute ("DELETE FROM MenuGrupo WHERE iGrupoId = $this->id");
			$conn->Execute ("DELETE FROM EmpresaGrupo WHERE iGrupoId = $this->id");
			$conn->Execute ("DELETE FROM UsuarioGrupo WHERE iGrupoId = $this->id");
			$conn->Execute ("DELETE FROM AccesoGrupoEstandar WHERE iGrupoId = $this->id");
			return null;
					
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Crear () {
		global $conn;
		
		try {
			$conn->Execute ("INSERT INTO Grupo (iGrupoId
				,cNombre
				,cDescripcion
			) VALUES (
				nextval ('seq_grupo_id')
				,'$this->nombre'
				,'$this->descripcion'
			)");
		
			$this->id = $conn->GetSecuenceLastId ("seq_grupo_id");
		
			foreach ($this->empresas as $item) {
				$this->CrearRelacionEmpresa ($this->id, $item->id);
			}

			foreach ($this->usuarios as $item) {
				$this->CrearRelacionUsuario ($this->id, $item->id);
			}
			
			foreach ($this->menuItems as $id) {
				$conn->Execute ("INSERT INTO MenuGrupo (iGrupoId, iMenuItemId) VALUES ($this->id, $id)");
			}
			
			$this->GuardarPermisosEstandar ();
			$this->GuardarPermisosCustom ();
			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Actualizar ($campos = null) {
		global $conn;
		
		try {
			if ($campos != null) {
				$this->ActualizarCampos ($campos);
				$this->ActualizarCampoRelacionUnoAMuchos  ($campos, "empresas", "empresaId", "id", "CrearRelacionEmpresa", "BorrarRelacionEmpresa");
				$this->ActualizarCampoRelacionUnoAMuchos  ($campos, "usuarios", "usuarioId", "id", "CrearRelacionUsuario", "BorrarRelacionUsuario");
				$this->ActualizarMenuItems ();
				$this->GuardarPermisosEstandar ();
				$this->GuardarPermisosCustom ();
				
			}
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
	
	private function GuardarPermisosEstandar () {
		global $conn;
		
		$conn->Execute ("DELETE FROM AccesoGrupoEstandar WHERE iGrupoId = $this->id");
		foreach ($this->permisosEstandar as $item) {
			$conn->Execute ("INSERT INTO AccesoGrupoEstandar (iGrupoId, iEntidadId, bVerListado, bVerRegistro, bBorrarRegistro, bModificarRegistro, bCrearRegistro) 
							VALUES ($this->id, $item->entidadId, " . DB::ToBoolean ($item->verListado) . ", " . DB::ToBoolean ($item->verRegistro) . ", " . DB::ToBoolean ($item->borrarRegistro) . ", " . DB::ToBoolean ($item->modificarRegistro) . ", " . DB::ToBoolean ($item->crearRegistro) . ")");
		}
	}
	
	private function GuardarPermisosCustom () {
		global $conn;
		
		$conn->Execute ("DELETE FROM AccesoGrupoCustom WHERE iGrupoId = $this->id");
		foreach ($this->permisosCustom as $item) {
			$conn->Execute ("INSERT INTO AccesoGrupoCustom (iGrupoId, iEntidadId, iPermisoCustomId) 
							VALUES ($this->id, $item->entidadId, $item->permisoCustomId)");
		}
	}
	
	protected function CrearRelacionEmpresa ($grupoId, $empresaId) {
		global $conn;
		
		$conn->Execute ("INSERT INTO EmpresaGrupo (iEmpresaId, iGrupoId) VALUES ($empresaId, $grupoId)");
	}
	
	protected function BorrarRelacionEmpresa ($grupoId, $empresaId) {
		global $conn;
		
		$conn->Execute ("DELETE FROM EmpresaGrupo WHERE iEmpresaId = $empresaId AND iGrupoId = $grupoId");
	}

	protected function CrearRelacionUsuario ($grupoId, $usuarioId) {
		global $conn;
		
		$conn->Execute ("INSERT INTO UsuarioGrupo (iGrupoId, iUsuarioId) VALUES ($grupoId, $usuarioId)");
	}
	
	protected function BorrarRelacionUsuario ($grupoId, $usuarioId) {
		global $conn;
		
		$conn->Execute ("DELETE FROM UsuarioGrupo WHERE iUsuarioId = $usuarioId AND iGrupoId = $grupoId");
	}
	
	private function ActualizarCampos ($campos) {
		global $conn;
			
		$this->ActualizarPropiedades ($campos);
		$asig = $this->GetInfoCamposActualizar ($campos);
		$conn->Execute ("UPDATE Grupo SET $asig WHERE iGrupoId = $this->id");			
	}
	
	//
	// Actualiza la tabla MenuGrupo.
	//
	private function ActualizarMenuItems () {
		global $conn;
		
		$conn->Execute ("DELETE FROM MenuGrupo WHERE iGrupoId = $this->id");
		
		foreach ($this->menuItems as $id) {
			$conn->Execute ("INSERT INTO MenuGrupo (iGrupoId, iMenuItemId) VALUES ($this->id, $id)");
		}
	}
}
?>
