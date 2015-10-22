<?
/**************************************************************************************************
 * Archivo: PermisosUsuarioArbol.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 **************************************************************************************************/

require_once ("template.php");
require_once ("Sysgran/Core/Red/Encoder.php");
require_once ("Sysgran/Core/Php/ArbolBase.php");

/*
 * 
 * Representa un item del arbol de permisos del grupo
 */
class PermisoUsuarioItem extends ArbolItemBase {
	public $hoja;

	public function PermisoUsuarioItem ($id, $text, $checked, $raiz, $hoja) {
		parent::__construct($id, $raiz, $text, $checked); 
		
		$this->hoja = $hoja;
	}
}

/*
 * 
 * Genera el arbol de permisos del grupo marcando como checked los items que
 * estan asociasdos al grupo.
 */
class PermisosUsuarioArbol extends ArbolBase {
	private $usuario_id;
	
	public function PermisosUsuarioArbol ($usuario_id = 0) {
		$this->usuario_id = $usuario_id;
	}
	
	protected function QueryCargarInfoModulos () {
		return "SELECT DISTINCT p.iPermisoId, p.cNombre, p.cCodigo, p.bRaiz, p.bHoja, pu.iPermisoId AS esta 
				FROM AccesoGrupo ag, UsuarioGrupo ug, Permiso p
				LEFT OUTER JOIN PermisoUsuario pu ON (pu.iPermisoId = p.iPermisoId AND pu.iUsuarioId = " . $this->usuario_id . ")
				WHERE
					p.iPermisoId = ag.iPermisoId AND
					ag.iGrupoId = ug.iGrupoId AND
					ug.iUsuarioId = $this->usuario_id
				ORDER BY p.iPermisoId";
	}
	
	protected function CargarInfoItem ($rs) {
		$id 		= $rs->Fields ("iPermisoId");
		$text 		= $rs->Fields ("cNombre");
		$raiz		= $rs->Fields ("bRaiz");
		$hoja		= $rs->Fields ("bHoja");
		$checked	= ($rs->Fields ("esta") != '');
		
		return new MenuUsuarioItem ($id, $text, $checked, $raiz, $hoja);
	}
	
	protected function QueryCargarJerarquias () {
		return "SELECT a.iPermisoPadre AS id_padre, a.iPermisoHijo AS id_hijo, a.iNroOrden
				FROM ArbolPermisos a
				ORDER BY id_padre, a.iNroOrden";
	}
}
?>