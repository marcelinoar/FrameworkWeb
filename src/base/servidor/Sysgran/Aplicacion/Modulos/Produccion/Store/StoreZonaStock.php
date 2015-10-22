<?
/**************************************************************************************************
 * Archivo: StoreZonaStockphp
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

class StoreZonaStock extends StoreCustom {
	function StoreZonaStock ($paginado = false) {
		parent::__construct ($paginado); 

		// Agregar filtros sobre la tabla
		$this->AgregarFiltro (new FiltroTexto ('codigo', 'tcodigo', 'codigo'));	
		$this->AgregarFiltro (new FiltroTexto ('descripcion', 'tdesc', 'desc'));	
		$this->AgregarFiltro (new FiltroNumerico ('planta', 'planta'));
	}
	
	function ArmarQuery () {
		// Leer filtros
		$fcod		= $this->GetFiltro ('codigo');
		$fdesc		= $this->GetFiltro ('descripcion');
		$fplanta	= $this->GetFiltro ('planta');

		$join = '';
		$groupby = '';
		if ($fcod->EsActivo ()) {
			$where .= " AND UPPER (z.cCodigo) " . $fcod->GetValorQuery ();
		}
		
		if ($fdesc->EsActivo ()) {
			$where .= " AND UPPER (z.cDescripcion) " . $fdesc->GetValorQuery ();
		}
		
		if ($fplanta->EsActivo ()) {
			$where .= " AND z.iPlantaId = " . $fplanta->GetValor ();
		}

		$query  = "SELECT z.*, p.cNombre AS nom_planta
					FROM ZonaStock z
					JOIN Planta p ON p.iPlantaId = z.iPlantaId
					WHERE 
						z.bActivo = " . DB::ToBoolean (true) . "
						$where";
		return $query;
	}
	
	function CargarItem ($rs) {
		$ret['id'] = $rs->Fields ('iZonaStockId');
		$ret['codigo'] = $rs->Fields ('cCodigo');
		$ret['nombrePlanta'] = $rs->Fields ('nom_planta');
		$ret['descripcion'] = $rs->Fields ('cDescripcion');

		return $ret;
	}
}