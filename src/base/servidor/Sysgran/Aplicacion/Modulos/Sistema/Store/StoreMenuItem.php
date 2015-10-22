<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: StoreMenuItemphp
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ('template.php');
require_once ('Sysgran/Core/Red/Encoder.php');
require_once ('Sysgran/Core/Listados/ParametroFiltro.php');
require_once ('Sysgran/Core/Listados/ParametroBusqueda.php');
require_once ('Sysgran/Core/Php/StoreBase.php');

class StoreMenuItem extends StoreBase {
	function StoreMenuItem ($paginado = false) {
		parent::__construct($paginado); 

		$this->Query = "SELECT iMenuItemId, cNombre, cXtype, cDescripcion FROM MenuItem ORDER BY cNombre ASC";
	}
	
	function CargarItem ($rs) {
		$ret['id'] = $rs->Fields ('iMenuItemId');
		$ret['menuItemId'] = $rs->Fields ("iMenuItemId");
		$ret['nombre'] = $rs->Fields ("cNombre");

		return $ret;
	}
}