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

class StoreDetalleFormulario extends StoreBase {
	function StoreDetalleFormulario ($paginado = false) {
		parent::__construct ($paginado); 

		$this->Query = "SELECT m.* FROM DetalleFormulario m";
	}
	
	function CargarItem ($rs) {
		$ret['id'] = $rs->Fields ('iDetalleFormularioId');
		$ret['codigo'] = $rs->Fields ("iDetalleFormularioId");
		$ret['nombreEntidad'] = $rs->Fields ("cNombreEntidad");
		$ret['descripcion'] = $rs->Fields ("cDescripcion");

		return $ret;
	}
}

?>
