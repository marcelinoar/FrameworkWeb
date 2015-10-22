<?
/**************************************************************************************************
 * Archivo: StoreMovimientoStockphp
 * ------------------------------------------------------------------------------------------------
 * Autor: Marcelino Morales
 * Version: 1.0
 * Descripcion: Este es el informe de movimientos de Stock del sistema.
 * Modificaciones: 
 *	-
 *
 **************************************************************************************************/

require_once ('template.php');
require_once ('Sysgran/Core/Red/Encoder.php');
require_once ('Sysgran/Core/Listados/FiltroNumerico.php');
require_once ('Sysgran/Core/Listados/FiltroTexto.php');
require_once ('Sysgran/Core/Php/StoreCustom.php');

class StoreMovimientoStock extends StoreCustom {
	function StoreMovimientoStock ($paginado = false) {
		parent::__construct ($paginado); 

		// Agregar filtros sobre la tabla
	}
	
	function ArmarQuery () {
		// Leer filtros
		
		$query="SELECT dmst.iDetMovimientoStockId, mst.iMovimientoStockId, tms.cCodigo, TO_CHAR(mst.dTimestamp, 'DD/MM/YYYY') AS fecha
				, alm.cCodigo AS cod_alm, ubic.cCodigo AS cod_ubic, dmst.fCantidadEntra, dmst.fCantidadSale
				, um.cCodigo AS cod_um, p.cCodigo AS cod_prod, cont.cCodigo AS cod_cont, dmst.iDetMovimientoStockAnulacionId
				FROM DetMovimientoStock dmst
				JOIN MovimientoStock mst ON mst.iMovimientoStockId = dmst.iMovimientoStockId
				JOIN TipoMovimientoStock tms ON tms.iTipoMovimientoStockId = mst.iTipoMovimientoStockId
				JOIN UnidadDeMedida um ON um.iUnidadDeMedidaId = dmst.iUnidadDeMedidaId
				JOIN Producto p ON p.iProductoId = dmst.iProductoId 
				LEFT OUTER JOIN Almacen alm ON alm.iAlmacenId = dmst.iAlmacenId 
				LEFT OUTER JOIN UbicacionAlmacen ubic ON ubic.iAlmacenId = dmst.iAlmacenId AND ubic.iUbicacionAlmacenId = dmst.iUbicacionAlmacenId
				LEFT OUTER JOIN Contenedor cont ON cont.iContenedorId = dmst.iContenedorId";
				
		return $query;
	}
	
	function CargarItem ($rs) {
		$ret['id'] 								= $rs->Fields ('iDetMovimientoStockId');
		$ret['movimientoStockId'] 				= $rs->Fields ('iMovimientoStockId');
		$ret['codigoTipoMovimiento'] 			= $rs->Fields ("cCodigo");
		$ret['fecha'] 							= $rs->Fields ("fecha");
		$ret['codigoAlmacen'] 					= $rs->Fields ("cod_alm");
		$ret['codigoUbicacion'] 				= $rs->Fields ("cod_ubic");
		$ret['cantidadEntra'] 					= DB::FromFloat ($rs->Fields ("fCantidadEntra"));
		$ret['cantidadSale'] 					= DB::FromFloat ($rs->Fields ("fCantidadSale"));
		$ret['codigoUM'] 						= $rs->Fields ("cod_um");
		$ret['codigoProducto'] 					= $rs->Fields ("cod_prod");
		$ret['codigoContenedor'] 				= $rs->Fields ("cod_cont");
		$ret['detMovimientoStockAnulacionId'] 	= $rs->Fields ('iDetMovimientoStockAnulacionId');

		return $ret;
	}
}