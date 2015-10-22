<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: StoreEstadoOT.php
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

class StoreEstadoOT extends StoreBase {
	function StoreEstadoOT ($paginado = false) {
		parent::__construct($paginado); 

		$this->Query = "SELECT iEstadoOTId, cNombre FROM EstadoOT ORDER BY cNombre ASC";
	}
	
	function CargarItem ($rs) {
		$ret['id'] 			= $rs->Fields ('iEstadoOTId');
		$ret['estadoOT'] 	= $rs->Fields ("iEstadoOTId");
		$ret['nombre'] 		= $rs->Fields ("cNombre");

		return $ret;
	}
}