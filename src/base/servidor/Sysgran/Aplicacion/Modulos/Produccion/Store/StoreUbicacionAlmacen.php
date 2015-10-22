<?
/**************************************************************************************************
 * Archivo: StoreUbicacionAlmacenphp
 * ------------------------------------------------------------------------------------------------
 * Autor: Marcelino Morales
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 **************************************************************************************************/

require_once ('template.php');
require_once ('Sysgran/Core/Red/Encoder.php');
require_once ('Sysgran/Core/Listados/FiltroNumerico.php');
require_once ('Sysgran/Core/Listados/FiltroTexto.php');
require_once ('Sysgran/Core/Php/StoreCustom.php');

class StoreUbicacionAlmacen extends StoreCustom {
	function StoreUbicacionAlmacen ($paginado = false) {
		parent::__construct ($paginado); 

		// Agregar filtros sobre la tabla
		$this->AgregarFiltro (new FiltroNumerico ('planta', 'planta'));
		$this->AgregarFiltro (new FiltroNumerico ('almacen', 'almacen'));
		$this->AgregarFiltro (new FiltroNumerico ('zona', 'zona'));
		$this->AgregarFiltro (new FiltroNumerico ('area', 'area'));
		$this->AgregarFiltro (new FiltroTexto ('codigo', 'tcodigo', 'codigo'));
		$this->AgregarFiltro (new FiltroTexto ('descripcion', 'tdesc', 'desc'));
	}
	
	function ArmarQuery () {
		// Leer filtros
		$fplanta	= $this->GetFiltro ('planta');
		$falm		= $this->GetFiltro ('almacen');
		$fzona		= $this->GetFiltro ('zona');
		$farea		= $this->GetFiltro ('area');
		$fcod		= $this->GetFiltro ('codigo');
		$fdesc 		= $this->GetFiltro ('descripcion');
		
		$where = '';
		if ($fplanta->EsActivo ()) {
			$where .= " AND a.iPlantaId = " . $fplanta->GetValor ();
		}
		
		if ($falm->EsActivo ()) {
			$where .= " AND a.iAlmacenId = " . $falm->GetValor ();
		}
		
		if ($fzona->EsActivo ()) {
			$where .= " AND  u.iZonaStockId = " . $fzona->GetValor ();
		}
		
		if ($farea->EsActivo ()) {
			$where .= " AND u.iAreaStockId = " . $farea->GetValor ();
		}

		if ($fcod->EsActivo ()) {
			$where .= " AND UPPER (u.cCodigo) " . $fcod->GetValorQuery ();
		}
		
		if ($fdesc->EsActivo ()) {
			$where .= " AND UPPER (u.cDescripcion) " . $fdesc->GetValorQuery ();
		}
		
		$query = "SELECT u.*, p.cNombre AS nom_planta, a.cCodigo AS cod_alm, z.cCodigo AS cod_z, r.cCodigo AS cod_r
					FROM UbicacionAlmacen u
					JOIN Almacen a ON a.iAlmacenId = u.iAlmacenId
					JOIN Planta p ON p.iPlantaId = a.iPlantaId
					JOIN ZonaStock z ON z.iZonaStockId = u.iZonaStockId
					JOIN AreaStock r ON r.iAreaStockId = u.iAreaStockId
					WHERE
						u.bActivo = " . DB::ToBoolean (true) . "
						$where
					";
		return $query;
	}
	
	function CargarItem ($rs) {
		$ret['id'] = $rs->Fields ('iUbicacionAlmacenId');
		$ret['codigo'] = $rs->Fields ("cCodigo");
		$ret['nombrePlanta'] = $rs->Fields ("nom_planta");
		$ret['codigoAlmacen'] = $rs->Fields ("cod_alm");
		$ret['codigoZona'] = $rs->Fields ("cod_z");
		$ret['codigoArea'] = $rs->Fields ("cod_r");
		$ret['descripcion'] = $rs->Fields ("cDescripcion");

		return $ret;
	}
}