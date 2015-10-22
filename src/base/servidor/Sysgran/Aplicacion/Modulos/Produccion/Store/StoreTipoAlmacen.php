<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: StoreAlmacenphp
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

class StoreTipoAlmacen extends StoreBase {
	function StoreTipoAlmacen ($paginado = false) {
		parent::__construct($paginado); 

		$this->Query = "SELECT iTipoAlmacenId, cNombre  FROM TipoAlmacen ORDER BY cNombre ASC";
	}
	
	function CargarItem ($rs) {
		$ret['id'] 				= $rs->Fields ('iTipoAlmacenId');
		$ret['tipoAlmacenId'] 	= $rs->Fields ('iTipoAlmacenId');
		$ret['nombre'] 			= $rs->Fields ("cNombre");

		return $ret;
	}
}