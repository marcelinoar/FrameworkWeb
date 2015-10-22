<?
/**************************************************************************************************
 * Archivo: MenuGrupoArbol.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("template.php");
require_once ("Sysgran/Core/Red/Encoder.php");
require_once ("Sysgran/Core/Php/ArbolBase.php");

/*
 * Clase: MenuGrupoItem
 * 
 * Representa un item del menu de Grupos
 */
class MenuUsuarioItem extends ArbolItemBase {
	public $hoja;

	public function MenuUsuarioItem ($id, $text, $checked, $raiz, $hoja) {
		parent::__construct($id, $raiz, $text, $checked); 
		
		$this->hoja = $hoja;
	}
}

/*
 * Clase: MenuGrupoArbol
 * 
 * Genera el menu entero del sistema marcando como checked los items que
 * estan asociasdos al grupo.
 */
class MenuUsuarioArbol extends ArbolBase {
	private $usuario_id;
	
	public function MenuUsuarioArbol ($usuario_id = 0) {
		$this->usuario_id = $usuario_id;
	}
	
	protected function QueryCargarInfoModulos () {
		return "SELECT DISTINCT m.iMenuItemId, m.cNombre, m.bRaiz, m.bHoja, mu.iUsuarioId AS esta
				FROM MenuGrupo mg, UsuarioGrupo ug, MenuItem m
				LEFT OUTER JOIN MenuUsuario mu ON (mu.iMenuItemId = m.iMenuItemId AND mu.iUsuarioId = $this->usuario_id)
				WHERE 
				  m.iMenuItemId = mg.iMenuItemId AND
				  mg.iGrupoId = ug.iGrupoId AND
				  ug.iUsuarioId = $this->usuario_id
				ORDER BY m.iMenuItemId";
	}
	
	protected function CargarInfoItem ($rs) {
		$id 		= $rs->Fields ("iMenuItemId");
		$text 		= $rs->Fields ("cNombre");
		$raiz		= DB::FromBoolean ($rs->Fields ("bRaiz"));
		$hoja		= DB::FromBoolean ($rs->Fields ("bHoja"));
		$checked	= ($rs->Fields ("esta") != '');
		
		return new MenuUsuarioItem ($id, $text, $checked, $raiz, $hoja);
	}
	
	protected function QueryCargarJerarquias () {
		return "SELECT a.iMenuItemPadre AS id_padre, a.iMenuItemHijo AS id_hijo, a.iNumDeOrden
				FROM ArbolMenu a
				ORDER BY id_padre, a.iNumDeOrden";
	}
}
?>