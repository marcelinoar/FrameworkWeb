<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: StoreEmpresaphp
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

class StoreEmpresa extends StoreBase {
	function StoreEmpresa ($paginado = false) {
		parent::__construct($paginado); 

		$this->AgregarParametro (new ParametroFiltro ("fcodigo", "iEmpresaId"));
		$this->AgregarParametro (new ParametroBusqueda ("bnom", "cNombre"));
		$this->AgregarParametro (new ParametroBusqueda ("bcuit", "cCuit"));
		
		$this->Query = "SELECT iEmpresaId, cNombre, cCuit FROM Empresa";
	}
	
	function CargarItem ($rs) {
		$ret['id'] 			= $rs->Fields ('iEmpresaId');
		$ret['empresaId'] 	= $rs->Fields ("iEmpresaId");
		$ret['cuit'] 		= $rs->Fields ("cCuit");
		$ret['nombre'] 		= $rs->Fields ("cNombre");

		return $ret;
	}
}