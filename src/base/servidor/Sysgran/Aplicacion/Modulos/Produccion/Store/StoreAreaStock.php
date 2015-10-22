<?
/**************************************************************************************************
 * Archivo: StoreAreaStockphp
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

class StoreAreaStock extends StoreCustom {
	function StoreAreaStock ($paginado = false) {
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
			$where .= " AND UPPER (a.cCodigo) " . $fcod->GetValorQuery ();
		}
		
		if ($fdesc->EsActivo ()) {
			$where .= " AND UPPER (a.cDescripcion) " . $fdesc->GetValorQuery ();
		}
		
		if ($fplanta->EsActivo ()) {
			$where .= " AND a.iPlantaId = " . $fplanta->GetValor ();
		}

		$query  = "SELECT a.*, p.cNombre AS nom_planta
					FROM AreaStock a
					JOIN Planta p ON p.iPlantaId = a.iPlantaId
					WHERE 
						a.bActivo = " . DB::ToBoolean (true) . "
						$where";
		
		return $query;
	}
	
	function CargarItem ($rs) {
		$ret['id'] = $rs->Fields ('iAreaStockId');
		$ret['codigo'] = $rs->Fields ('cCodigo');
		$ret['nombrePlanta'] = $rs->Fields ('nom_planta');
		$ret['descripcion'] = $rs->Fields ('cDescripcion');
		
		return $ret;
	}
}