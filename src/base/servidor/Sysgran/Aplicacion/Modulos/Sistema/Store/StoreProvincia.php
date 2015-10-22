<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: StoreProvinciaphp
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

class StoreProvincia extends StoreBase {
	function StoreProvincia ($paginado = false) {
		parent::__construct($paginado); 

		$this->AgregarParametro (new ParametroFiltro ("fcodigo", "pr.iProvinciaId"));
		$this->AgregarParametro (new ParametroFiltro ("fpais", "pr.iPaisId"));
		$this->AgregarParametro (new ParametroBusqueda ("bnom", "pr.cNombre"));

		$this->Query = "SELECT p.cNombreAbreviado AS nom_pais, pr.iProvinciaId, pr.cNombre 
							FROM Provincia pr, Pais p 
							WHERE
								pr.iPaisId = p.iPaisId
							ORDER BY nom_pais, pr.cNombre";
	}
	
	function CargarItem ($rs) {
		$ret['id'] 						= $rs->Fields ('iProvinciaId');
		$ret['provinciaId'] 			= $rs->Fields ('iProvinciaId');
		$ret['codigo'] 					= $rs->Fields ("iProvinciaId");
		$ret['pais']['nombreAbreviado'] = $rs->Fields ("nom_pais");
		$ret['nombre'] 					= $rs->Fields ("cNombre");

		return $ret;
	}
}