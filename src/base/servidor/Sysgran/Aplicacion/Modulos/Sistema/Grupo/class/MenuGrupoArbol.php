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
class MenuGrupoItem extends ArbolItemBase {
	public $hoja;

	public function MenuGrupoItem ($id, $text, $checked, $raiz, $hoja) {
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
class MenuGrupoArbol extends ArbolBase {
	private $grupo_id;
	
	public function MenuGrupoArbol ($grupo_id = 0) {
		$this->grupo_id = $grupo_id;
	}
	
	protected function QueryCargarInfoModulos () {
		return "SELECT m.iMenuItemId, m.cNombre, m.bRaiz, m.bHoja, mg.iGrupoId AS esta
				FROM MenuItem m
				LEFT OUTER JOIN MenuGrupo mg ON (mg.iMenuItemId = m.iMenuItemId AND mg.iGrupoId = " . $this->grupo_id . ")";
	}
	
	protected function CargarInfoItem ($rs) {
		$id 		= $rs->Fields ("iMenuItemId");
		$text 		= $rs->Fields ("cNombre");
		$raiz		= DB::FromBoolean ($rs->Fields ("bRaiz"));
		$hoja		= DB::FromBoolean ($rs->Fields ("bHoja"));
		$checked	= ($rs->Fields ("esta") != '');
		
		return new MenuGrupoItem ($id, $text, $checked, $raiz, $hoja);
	}
	
	protected function QueryCargarJerarquias () {
		return "SELECT a.iMenuItemPadre AS id_padre, a.iMenuItemHijo AS id_hijo, a.iNumDeOrden
				FROM ArbolMenu a
				ORDER BY id_padre, a.iNumDeOrden";
	}
}
?>