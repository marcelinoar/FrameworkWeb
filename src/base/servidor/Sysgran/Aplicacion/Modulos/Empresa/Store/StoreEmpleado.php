<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: StoreEmpleadophp
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

class StoreEmpleado extends StoreBase {
	function StoreEmpleado ($paginado = false) {
		parent::__construct($paginado); 

		$this->AgregarParametro (new ParametroFiltro ("fcodigo", "iEmpleadoId"));
		$this->AgregarParametro (new ParametroFiltro ("flegajo", "iNroLegajo"));
		$this->AgregarParametro (new ParametroBusqueda ("bnom", "cNombre"));
		$this->AgregarParametro (new ParametroBusqueda ("bapp", "cApellido"));

		$this->Query = "SELECT iEmpleadoId, cNombre, cApellido, iNroLegajo FROM Empleado ORDER BY cApellido ASC";
	}
	
	function CargarItem ($rs) {
		$ret['id'] 			= $rs->Fields ('iEmpleadoId');
		$ret['empleadoId'] 	= $rs->Fields ('iEmpleadoId');
		$ret['nombre'] 		= $rs->Fields ("cNombre");
		$ret['apellido'] 	= $rs->Fields ("cApellido");
		$ret['nroLegajo']	= $rs->Fields ("iNroLegajo");

		return $ret;
	}
}