<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: StoreCentroDeCosto.php
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

class StoreCentroDeCosto extends StoreBase {
	function StoreCentroDeCosto ($paginado = false) {
		parent::__construct ($paginado); 

		$this->AgregarParametro (new ParametroFiltro ("fcodigo", "iCentroDeCostoId"));
		$this->AgregarParametro (new ParametroBusqueda ("bcod", "cCodigoSistemaExterno"));
		
		$this->Query = "SELECT iCentroDeCostoId, cCodigoSistemaExterno FROM CentroDeCosto ORDER BY cCodigoSistemaExterno ASC";
	}
	
	function CargarItem ($rs) {
		$ret['id'] = $rs->Fields ('iCentroDeCostoId');
		$ret['centroDeCostoId'] = $rs->Fields ("iCentroDeCostoId");
		$ret['codigoSistemaExterno'] = $rs->Fields ("cCodigoSistemaExterno");

		return $ret;
	}
}
?>
