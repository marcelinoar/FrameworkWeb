<?
/**************************************************************************************************
 * Archivo: StoreMaquina.php
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
require_once ('Sysgran/Core/Listados/FiltroRangoFechas.php');
require_once ('Sysgran/Core/Listados/FiltroBooleano.php');
require_once ('Sysgran/Core/Php/StoreCustom.php');

class StoreConsultaUbicacionMovStock extends StoreCustom {
	function StoreConsultaUbicacionMovStock ($paginado = false) {
		parent::__construct ($paginado); 

		$this->AgregarFiltro (new FiltroNumerico ('producto', 'prod'));
		$this->AgregarFiltro (new FiltroNumerico ('area', 'area'));
		$this->AgregarFiltro (new FiltroNumerico ('zona', 'zona'));
		$this->AgregarFiltro (new FiltroNumerico ('almacen', 'alm'));
		$this->AgregarFiltro (new FiltroBooleano ('ubicaciones_vacias', 'uv'));
	}

	function ArmarQuery () {
		$fprod		= $this->GetFiltro ('producto');
		$farea		= $this->GetFiltro ('area');
		$fzona		= $this->GetFiltro ('zona');
		$falm		= $this->GetFiltro ('almacen');
		$fuv		= $this->GetFiltro ('ubicaciones_vacias');
		
		$where = '';
		if ($fprod->EsActivo ()) {
			$where .= " AND d.iProductoId = " . $fprod->GetValor ();
		}

		if ($farea->EsActivo ()) {
			$where .= " AND d.iAreaStockId = " . $farea->GetValor ();
		}

		if ($fzona->EsActivo ()) {
			$where .= " AND d.iZonaStockId = " . $fzona->GetValor ();
		}
		
		if ($falm->EsActivo ()) {
			$where .= " AND d.iAlmacenId= " . $falm->GetValor ();
		}

		$query = "SELECT d.iDetalleUbicacionAlmacenId, u.cCodigo AS cod_ub, d.fCantidad, um.cCodigo AS cod_um
					, p.cCodigo AS cod_producto, d.iNroDeDetalle, a.cCodigo AS cod_area, z.cCodigo AS cod_zona
					FROM DetalleUbicacionAlmacen d
					JOIN UbicacionAlmacen u ON u.iUbicacionAlmacenId = d.iUbicacionAlmacenId AND u.iAlmacenId = d.iAlmacenId
					JOIN Producto p ON p.iProductoId = d.iProductoId
					JOIN UnidadDeMedida um ON um.iUnidadDeMedidaId = p.iUnidadDeMedidaStockId
					JOIN ZonaStock z ON z.iZonaStockId = u.iZonaStockId
					JOIN AreaStock a ON a.iAreaStockId = u.iAreaStockId
					LEFT OUTER JOIN Contenedor c ON c.iContenedorId = d.iContenedorId
					WHERE
						u.bActivo = " . DB::ToBoolean (true) . " AND
						d.fCantidad > 0
						$where
					ORDER BY u.cCodigo, d.iDetalleubicacionAlmacenId ASC";
					
		return $query;		
	}
	
	function CargarItem ($rs) {
		$ret['codigoUbicacion'] 			= $rs->Fields ('cod_ub');
		$ret['id'] 							= $rs->Fields ('iDetalleUbicacionAlmacenId');
		$ret['codigoArea'] 					= $rs->Fields ('cod_area');
		$ret['codigoZona'] 					= $rs->Fields ('cod_zona');
		$ret['codigoProducto'] 				= $rs->Fields ('cod_producto');
		$ret['cantidad'] 					= $rs->Fields ('fCantidad');
		$ret['codigoUnidadDeMedida'] 		= $rs->Fields ('cod_um');
		$ret['codigoContenedor'] 			= $rs->Fields ('cod_cont');
		$ret['detalleUbicacionAlmacenId']	= $rs->Fields ('iNroDeDetalle');

		return $ret;
	}
}