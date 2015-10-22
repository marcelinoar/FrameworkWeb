<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: ListadoController.php
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

class StoreTipoFormulario extends StoreBase {
	function StoreTipoFormulario ($paginado = false) {
		parent::__construct ($paginado); 

		$this->Query = "SELECT * FROM TipoFormulario";
	}
	
	function CargarItem ($rs) {
		$ret['id'] = $rs->Fields ("iTipoformularioId");
		$ret['descripcion'] = $rs->Fields ("cDescripcion");

		return $ret;
	}
}

?>
