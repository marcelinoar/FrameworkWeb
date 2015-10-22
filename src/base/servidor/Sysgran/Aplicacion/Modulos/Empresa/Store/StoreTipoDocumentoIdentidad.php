<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: StoreTipoDocumentoIdentidadphp
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

class StoreTipoDocumentoIdentidad extends StoreBase {
	function StoreTipoDocumentoIdentidad ($paginado = false) {
		parent::__construct($paginado); 

		$this->AgregarParametro (new ParametroFiltro ("fcodigo", "iTipoDocumentoIdentidadId"));
		$this->AgregarParametro (new ParametroBusqueda ("bnom", "cNombre"));

		$this->Query = "SELECT iTipoDocumentoIdentidadId, cNombre FROM TipoDocumentoIdentidad ORDER BY cNombre ASC";
	}
	
	function CargarItem ($rs) {
		$ret['id'] 							= $rs->Fields ('iTipoDocumentoIdentidadId');
		$ret['tipoDocumentoIdentidadId'] 	= $rs->Fields ('iTipoDocumentoIdentidadId');
		$ret['nombre'] 						= $rs->Fields ("cNombre");

		return $ret;
	}
}