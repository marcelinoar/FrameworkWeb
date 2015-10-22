<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: StorePais.php
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

class StorePais extends StoreBase {
	function StorePais ($paginado = false) {
		parent::__construct ($paginado); 

		$this->AgregarParametro (new ParametroFiltro ("fcodigo", "iPaisId"));
		$this->AgregarParametro (new ParametroBusqueda ("bnoff", "cNombreOficial"));
		$this->AgregarParametro (new ParametroBusqueda ("bnabb", "cNombreAbreviado"));

		$this->Query = "SELECT iPaisId, cNombreAbreviado, cNombreOficial FROM Pais ORDER BY cNombreOficial ASC";
	}
	
	function CargarItem ($rs) {
		$ret['id'] 					= $rs->Fields ('iPaisId');
		$ret['codigo'] 				= $rs->Fields ("iPaisId");
		$ret['paisId'] 				= $rs->Fields ('iPaisId');
		$ret['nombreOficial'] 		= $rs->Fields ("cNombreOficial");
		$ret['nombreAbreviado'] 	= $rs->Fields ("cNombreAbreviado");

		return $ret;
	}
}