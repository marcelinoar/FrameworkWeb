<?
/**************************************************************************************************
 * Archivo: Sesion.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones: Este archivo contiene la clase Permiso que es la que se usa para autenticacion y 
 * 					para la sesion, en el sistema hay otras clases pero se usan para el ABM. 
 *	-
 *
 **************************************************************************************************/

require_once ('Sysgran/Core/Red/JSonRouterBase.php');
require_once ('Sysgran/Core/Red/Encoder.php');

/**
 * Esta clase maneja los permisos de acceso del usuario logueado en la sesion.
 */
class Permiso {
	public $entidad;			// Nombre-codigo de la entidad compuesto por el nombre del grupo y el nombre de la entidad.
	public $verListado;
	public $verRegistro;
	public $borrar;
	public $crear;
	public $modificar;
	public $permisosCustom;		// Array de codigos de permisos custom asociados a esta entidad.
	
	/**
	 *
	 * Constructor de la clase, crea un objeto Permiso vacio.
	 */
	
	public function Permiso () {
		$this->entidad 			= '';
		$this->verListado 		= false;
		$this->verRegistro		= false;
		$this->borrar			= false;
		$this->crear			= false;
		$this->modificar		= false;
		$this->permisosCustom 	= array ();
	}
	
	/**
	 *
	 * Agrega un codigo de permiso custom a los permisos de la entidad.
	 *
	 * @param	$codigo: Codigo de permiso custom a agregar.
	 */
	
	public function AgregarPermisoCustom ($codigo) {
		$this->permisosCustom[] = $codigo;
	}
	
	/**
	 *
	 * Hace una copia del objeto y la devuelve
	 *
	 * @return	Devuelve una copia del objeto
	 */
	
	public function Clonar () {
		$ret = new Permiso ();
		$ret->entidad 		= $this->entidad;
		$ret->verListado 	= $this->verListado;
		$ret->verRegistro	= $this->verRegistro;
		$ret->borrar		= $this->borrar;
		$ret->crear			= $this->crear;
		$ret->modificar		= $this->modificar;
		
		foreach ($this->permisosCustom as $item) { 
			$ret->permisosCustom[] = $item;
		}
		
		return $ret;
	}
	
	/**
	 *
	 * Indica si la entidad cumple con un codigo de permiso custom determinado.
	 *
	 * @param	$codigo: Codigo de permiso a comparar
	 */
	
	public function CheckPermisoCustom ($codigo) {
		$ret = false;
		foreach ($this->permisosCustom as $item) {
			$ret = $ret || ($item == $codigo);
		}	
		
		return $ret;
	}
}

/** 
 * Esta clase maneja la sesion de usuario. Contiene toda la infromacion sobre
 * el perfil de acceso del usuario logueado. Esta informacion se carga por unica vez
 * al realizarse el login y luego permanece en el objeto sesion de php.
 */
class Sesion {
	public $usuarioId;				// Id del usuario logueado en el sistema o cero.
	public $permisos;				// Array de permisos asociados al usuario.
	
	/**
	 *
	 * Constructor de la clase. Inicializa las propiedades de la misma.
	 *
	 */
	
	public function Sesion () {
		$this->usuarioId = 0;
		$this->permisos	= array ();
	}
	
	/**
	 *
	 * Intenta realizar un Login, en caso de ser correcto devuelve true y actualiza el 
	 * codigo de usuario actual.
	 *
	 * @param	$usr: Login de usuario
	 * @param	$pass: password 
	 *
	 * @return	Devuelve true si el login fue correcto, o false de lo contrario.
	 */
	
	public function Login ($usr, $pass) {
		global $conn;

		$ret = false;		
		$rs = $conn->Retrieve ("SELECT iUsuarioId FROM Usuario WHERE cLoginName = '$usr' AND cPassword = '$pass'");
		if (!$rs->Eof ()) {
			$this->usuarioId = $rs->Fields ("iUsuarioId");
			$this->CargarInfoPermisos ();
			
			$ret = true;
		}
		$rs->Close ();

		return $ret;
	}
	
	/**
	 *
	 * Carga de la base de datos el perfil de acceso del usuario seleccionado.
	 *
	 */
	
	private function CargarInfoPermisos () {
		global $conn;

		$rs = $conn->Retrieve ("SELECT e.iEntidadId, e.iModuloEntidadId, e.cNombre AS nom_entidad, me.cNombre AS nom_grupo, bVerListado, bVerRegistro, bBorrarRegistro, bModificarRegistro, bCrearRegistro 
								FROM UsuarioGrupo ug, AccesoGrupoEstandar age, Entidad e, ModuloEntidad me
								WHERE
								  ug.iUsuarioId = $this->usuarioId AND
								  ug.iGrupoId = age.iGrupoId AND
								  age.iEntidadId = e.iEntidadId AND
								  e.iModuloEntidadId = me.iModuloEntidadId
								ORDER BY e.iModuloEntidadId, e.iEntidadId ASC");
								
		while (!$rs->Eof ()) {
			$item = new Permiso ();
			$item->entidad 		= $rs->Fields ("nom_grupo") . ":" . $rs->Fields ("nom_entidad");
			$item->verListado	= DB::FromBoolean ($rs->Fields ('bVerListado'));
			$item->verRegistro	= DB::FromBoolean ($rs->Fields ('bVerRegistro'));
			$item->borrar		= DB::FromBoolean ($rs->Fields ("bBorrarRegistro"));
			$item->crear		= DB::FromBoolean ($rs->Fields ("bCrearRegistro"));
			$item->modificar	= DB::FromBoolean ($rs->Fields ("bModificarRegistro"));
			$this->permisos[] = $item;
			
			$rs->Next ();
		}
		
		
		$rs->Close ();
		
		$this->CargarInfoPermisosCustom ();
	}
	
	/**
	 *
	 * Este metodo se encarga de cargar los permisos custom asociados a cada entidad
	 *
	 */
	
	private function CargarInfoPermisosCustom () {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT pc.iPermisoCustomId, pc.cCodigo, e.iEntidadId, e.cNombre AS nom_entidad, me.iModuloEntidadId, me.cNombre AS nom_grupo
								FROM UsuarioGrupo ug, PermisoCustom pc, AccesoGrupoCustom ag, Entidad e, ModuloEntidad me
								WHERE
									ug.iUsuarioId = $this->usuarioId AND
									ug.iGrupoId = ag.iGrupoId AND
									ag.iEntidadId = pc.iEntidadId AND
									ag.iPermisoCustomId = pc.iPermisoCustomId AND
									pc.iEntidadId = e.iEntidadId AND
									e.iModuloEntidadId = me.iModuloEntidadId
								ORDER BY me.iModuloEntidadId, e.iEntidadId ASC");
		
		//
		// Por cada permiso custom que devuelve la consulta buscamos en el array de entidades
		// y buscamos la unica entidad a la que le pertenece y se la asociamos.
		//
		while (!$rs->Eof ()) {
			$flag = false;
			for ($i = 0; $i < count ($this->permisos) && !$flag; $i++) {
				$item = $this->permisos[$i];
				$nom_entidad = $rs->Fields ("nom_grupo") . ":" . $rs->Fields ("nom_entidad");
				
				if ($item->entidad == $nom_entidad) {
					$item->AgregarPermisoCustom ($rs->Fields ('cCodigo'));
					$flag = true;
				}
			}
			
			// Si no lo encuentra por que no hay permisos estandar asignados a esa entidad, entonces
			// creamos la entidad y le ponemos el permiso este sin nada mas.
			if (!flag) {
				$item = new Permiso ();
				$item->entidad 		= $rs->Fields ("nom_grupo") . ":" . $rs->Fields ("nom_entidad");
				$item->verListado	= false;
				$item->verRegistro	= false;
				$item->borrar		= false;
				$item->crear		= false;
				$item->modificar	= false;
				$item->AgregarPermisoCustom ($rs->Fields ('cCodigo'));
				$this->permisos[] = $item;
			}
			
			$rs->Next ();
		}
		
		$rs->Close ();
	}
	
	/**
	 *
	 * Desloguea al usuario de la sesion
	 */
	
	public function Logout () {
		$this->usuarioId = 0;
		$this->permisos = array ();
	}
	
	/**
	 *
	 * Indica si hay un usuario logueado o no
	 *
	 * @return	Devuelve true si hay un usuario logueado o false de lo contrario.
	 */
	
	public function EstaLogueado () {
		return ($this->usuarioId != 0);
	}
	
	/**
	 *
	 * Devuelve la informacion de permisos de la entidad solicitada
	 *
	 * @param	$entidad: Nombre-codigo de la entidad solicitada
	 *
	 * @return	Devuelve null o la informacion de permisos relacionada a la entidad
	 */
	
	public function GetPermisos ($entidad) {
		$ret = null;
		
		foreach ($this->permisos as $item) {
			if ($item->entidad == $entidad) {
				$ret = $item;
			}
		}
		
		return $ret;
	}

	/**
	 *
	 * Indica si para una entidad se cuenta con el permiso custom solicitado.
	 *
	 * @param	$entidad: Nombre-Codigo de la entidad
	 * @param	$codigo: Codigo del permiso custom
	 *
	 * @return	Devuelve true si cumple o false de lo contrario.
	 */
	
	public function CheckPermisoCustom ($entidad, $codigo) {
		$ret = false;
		
		$p = $this->GetPermisos ($entidad);
		if ($p != null) {
			$ret = $p->CheckPermisoCustom ($codigo);
		}
		
		return $ret;
	}
	
	/**
	 *
	 * Funcion estatica que devuelve el objeto Sesion que se encuentra dentro de la
	 * clase PHP. Esta debe ser siempre la forma de obtener el objeto de la sesion.
	 *
	 *
	 * @return	Devuelve el objeto de la clase Sesion con la sesion actual del usuario.
	 */
	
	public static function GetSesion () {
		global $_SESSION;
		
		return $_SESSION['sesion'];
	}
}

//
// Llamamos aca a session_start () por que necesita tener creada la clase session antes de llamarse.
//
session_start ();
?>
