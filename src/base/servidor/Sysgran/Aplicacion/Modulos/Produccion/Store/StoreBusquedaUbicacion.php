<?
/**************************************************************************************************
 * Archivo: StoreBusquedaUbicacion.php
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
require_once ('Sysgran/Core/Listados/FiltroNumerico.php');
require_once ('Sysgran/Core/Listados/FiltroTexto.php');
require_once ('Sysgran/Core/Php/StoreCustom.php');

class StoreBusquedaUbicacion extends StoreCustom {
	function StoreBusquedaUbicacion ($paginado = false) {
		parent::__construct ($paginado); 

		// Filtros sobre la tabla producto
	}

	function ArmarQuery () {
		$query = "SELECT d.iDetalleUbicacionAlmacenId, u.cCodigo AS cod_ub, d.fCantidad, um.cCodigo AS cod_um, d.cLoteDeCompras, p.cCodigo AS cod_producto, d.iNroDeDetalle
					FROM DetalleUbicacionAlmacen d
					JOIN UbicacionAlmacen u ON u.iUbicacionAlmacenId = d.iUbicacionAlmacenId
					JOIN UnidadDeMedida um ON um.iUnidadDeMedidaId = d.iUnidadDeMedidaId
					JOIN Producto p ON p.iProductoId = d.iProductoId
					LEFT OUTER JOIN Contenedor c ON c.iContenedorId = d.iContenedorId
					ORDER BY u.cCodigo, d.iDetalleubicacionAlmacenId ASC";
					
		return $query;		
	}

	function CargarItem ($rs) {
		$ret['id'] 							= $rs->Fields ('iDetalleUbicacionAlmacenId');
		$ret['codigoUbicacion'] 			= $rs->Fields ('cod_ub');
		$ret['codigoProducto'] 				= $rs->Fields ('cod_producto');
		$ret['cantidad'] 					= $rs->Fields ('fCantidad');
		$ret['codigoUnidadDeMedida'] 		= $rs->Fields ('cod_um');
		$ret['codigoContenedor'] 			= $rs->Fields ('cod_cont');
		$ret['loteDeCompras'] 				= $rs->Fields ('cLoteDeCompras');
		$ret['detalleUbicacionAlmacenId']	= $rs->Fields ('iNroDeDetalle');

		return $ret;
	}
}