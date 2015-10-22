<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: StoreCiudad.php
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

class StoreCiudad extends StoreBase {
	function StoreCiudad ($paginado = false) {
		parent::__construct ($paginado); 

		$this->AgregarParametro (new ParametroFiltro ("fcodigo", "c.iCiudadId"));
		$this->AgregarParametro (new ParametroFiltro ("fprovincia", "c.iProvinciaId"));
		$this->AgregarParametro (new ParametroFiltro ("fpais", "c.iPaisId"));
		$this->AgregarParametro (new ParametroBusqueda ("bnom", "c.cNombre"));

		$this->Query = "SELECT c.iCiudadId, c.cNombre, pr.cNombre AS nom_prov, pa.cNombreOficial
							FROM Ciudad c, Provincia pr, Pais pa
							WHERE
								c.iPaisId = pa.iPaisId AND
								c.iProvinciaId = pr.iProvinciaId
							ORDER BY c.iPaisId, c.iProvinciaId, cNombre ASC";
	}
	
	function CargarItem ($rs) {
		$ret['id'] 						= $rs->Fields ('iCiudadId');
		$ret['ciudadId'] 				= $rs->Fields ('iCiudadId');
		$ret['nombre'] 					= $rs->Fields ("cNombre");
		$ret['pais']['nombreOficial']	= $rs->Fields ("cNombreOficial");
		$ret['provincia']['nombre']		= $rs->Fields ("nom_prov");

		return $ret;
	}
}