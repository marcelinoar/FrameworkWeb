<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: StoreCuentaContablephp
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

class StoreCuentaContable extends StoreBase {
	function StoreCuentaContable ($paginado = false) {
		parent::__construct($paginado); 

		$this->AgregarParametro (new ParametroFiltro ("fcodigo", "iCuentaContableId"));
		$this->AgregarParametro (new ParametroBusqueda ("bcod", "cCodigoSistemaExterno"));
		$this->AgregarParametro (new ParametroBusqueda ("bdesc", "cDescripcion"));
		
		$this->Query = "SELECT iCuentaContableId, cCodigoSistemaExterno, cDescripcion FROM CuentaContable ORDER BY cCodigoSistemaExterno ASC";
	}
	
	function CargarItem ($rs) {
		$ret['id'] 						= $rs->Fields ('iCuentaContableId');
		$ret['codigoSistemaExterno'] 	= $rs->Fields ("cCodigoSistemaExterno");
		$ret['descripcion'] 			= $rs->Fields ("cDescripcion");

		return $ret;
	}
}