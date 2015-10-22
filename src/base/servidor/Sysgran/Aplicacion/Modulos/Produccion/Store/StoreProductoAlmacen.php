<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: StoreProductoAlmacen.php
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

class StoreProductoAlmacen extends StoreBase {
	function StoreProductoAlmacen ($paginado = false) {
		parent::__construct($paginado); 

		$this->Query = "SELECT iAlmacenId, cCodigo, cDescripcionCorta FROM Almacen WHERE bActivo = " . DB::ToBoolean (true) . " ORDER BY cCodigo ASC";
	}
	
	function CargarItem ($rs) {
		$ret['almacenId'] 		= $rs->Fields ('iAlmacenId');
		$ret['codigo'] 			= $rs->Fields ('cCodigo');
		$ret['descripcionCorta']= $rs->Fields ('cDescripcionCorta');
		$ret['stockCritico']	= 0;
		$ret['puntoDePedido']	= 0;

		return $ret;
	}
}