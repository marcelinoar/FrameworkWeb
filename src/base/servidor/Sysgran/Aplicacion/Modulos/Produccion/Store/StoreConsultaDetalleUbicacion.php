<?
/**************************************************************************************************
 * Archivo: StoreConsultaDetalleUbicacion.php
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
require_once ('Sysgran/Core/Php/StoreCustom.php');

class StoreConsultaDetalleUbicacion extends StoreCustom {
	function StoreConsultaDetalleUbicacion ($paginado = false) {
		parent::__construct ($paginado); 

		$this->AgregarFiltro (new FiltroNumerico ('ubicacion', 'ubic'));
		$this->AgregarFiltro (new FiltroNumerico ('producto', 'prod'));
		$this->AgregarFiltro (new FiltroNumerico ('almacen', 'alm'));
	}

	function ArmarQuery () {
		$fubic	= $this->GetFiltro ('ubicacion');
		$fprod	= $this->GetFiltro ('producto');
		$falm	= $this->GetFiltro ('almacen');
		
		$where = '';
		if ($fubic->EsActivo ()) {
			$where .= " AND d.iUbicacionAlmacenId = " . $fubic->GetValor ();
		}
		
		if ($fprod->EsActivo ()) {
			$where .= " AND p.iProductoId = " . $fprod->GetValor ();
		}

		if ($falm->EsActivo ()) {
			$where .= " AND u.iAlmacenId = " . $falm->GetValor ();
		}

		$query = "SELECT d.iDetalleUbicacionAlmacenId, d.iNroDeDetalle, d.fCantidad, um.cCodigo AS cod_um, p.cCodigo AS cod_producto, d.iNroDeDetalle
					FROM DetalleUbicacionAlmacen d
					JOIN UbicacionAlmacen u ON u.iUbicacionAlmacenId = d.iUbicacionAlmacenId
					JOIN Producto p ON p.iProductoId = d.iProductoId
					JOIN UnidadDeMedida um ON um.iUnidadDeMedidaId = p.iUnidadDeMedidaStockId
					WHERE
						u.bActivo = " . DB::ToBoolean (true) . " AND
						d.fCantidad > 0
						$where
					ORDER BY u.cCodigo, d.iDetalleubicacionAlmacenId ASC";
					
		return $query;		
	}
	
	function CargarItem ($rs) {
		$ret['id'] 							= $rs->Fields ('iDetalleUbicacionAlmacenId');
		$ret['nroDeDetalle']				= $rs->Fields ('iNroDeDetalle');
		$ret['codigoProducto'] 				= $rs->Fields ('cod_producto');
		$ret['cantidad'] 					= $rs->Fields ('fCantidad');
		$ret['codigoUnidadDeMedida'] 		= $rs->Fields ('cod_um');

		return $ret;
	}
}