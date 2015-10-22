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

class StoreFormularioMaestro extends StoreBase {
	function StoreFormularioMaestro ($paginado = false) {
		parent::__construct ($paginado); 

		$this->Query = "SELECT m.* FROM FormularioMaestro m";
	}
	
	function CargarItem ($rs) {
		$ret['id'] = $rs->Fields ('iFormularioMaestroId');
		$ret['codigo'] = $rs->Fields ("iFormularioMaestroId");
		$ret['nombreEntidad'] = $rs->Fields ("cNombreEntidad");
		$ret['descripcion'] = $rs->Fields ("cDescripcion");

		return $ret;
	}
}

?>
