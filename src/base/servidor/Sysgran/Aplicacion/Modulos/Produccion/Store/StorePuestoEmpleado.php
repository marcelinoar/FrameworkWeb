<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: StorePuestoEmpleadophp
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

class StorePuestoEmpleado extends StoreBase {
	function StorePuestoEmpleado ($paginado = false) {
		parent::__construct($paginado); 

		$this->AgregarParametro (new ParametroFiltro ("fcodigo", "iPuestoEmpleadoId"));
		$this->AgregarParametro (new ParametroBusqueda ("bnom", "cNombre"));
		
		$this->Query = "SELECT iPuestoEmpleadoId, cNombre FROM PuestoEmpleado ORDER BY cNombre ASC";
	}
	
	function CargarItem ($rs) {
		$ret['id'] 					= $rs->Fields ('iPuestoEmpleadoId');
		$ret['puestoEmpleadoId'] 	= $rs->Fields ("iPuestoEmpleadoId");
		$ret['nombre'] 				= $rs->Fields ("cNombre");

		return $ret;
	}
}