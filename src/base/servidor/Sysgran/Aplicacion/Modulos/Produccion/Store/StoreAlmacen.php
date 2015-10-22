<?
/**************************************************************************************************
 * Archivo: StoreAlmacenphp
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ('Sysgran/Core/Listados/FiltroNumerico.php');
require_once ('Sysgran/Core/Listados/FiltroTexto.php');
require_once ('Sysgran/Core/Listados/FiltroRangoAtributoNumerico.php');
require_once ('Sysgran/Core/Listados/FiltroRangoNumerico.php');
require_once ('Sysgran/Core/Php/StoreCustom.php');

class StoreAlmacen extends StoreCustom {
	function StoreAlmacen ($paginado = false) {
		parent::__construct ($paginado); 

		// Filtros sobre la tabla producto
		$this->AgregarFiltro (new FiltroTexto ('codigo', 'tcodigo', 'codigo'));	
		$this->AgregarFiltro (new FiltroTexto ('descripcion', 'tdesc', 'desc'));	
		$this->AgregarFiltro (new FiltroNumerico ('planta', 'planta'));
	}

	function ArmarQuery () {
		$fcod		= $this->GetFiltro ('codigo');
		$fdesc		= $this->GetFiltro ('descripcion');
		$fplanta	= $this->GetFiltro ('planta');

		$join = '';
		
		if ($fcod->EsActivo ()) {
			$where .= " AND UPPER (cCodigo) " . $fcod->GetValorQuery ();
		}

		if ($fdesc->EsActivo ()) {
			$where .= " AND (UPPER(cDescripcionCorta) " . $fdesc->GetValorQuery () . " OR UPPER(cDescripcionLarga) " . $fdesc->GetValorQuery () . ")";
		}
		
		if ($fplanta->EsActivo ()) {
			$where .= " AND iPlantaId = " . $fplanta->GetValor ();
		}

		$query = "SELECT iAlmacenId, cCodigo, cDescripcionCorta 
					FROM Almacen 
					WHERE 
						bActivo = " . DB::ToBoolean (true) . " 
						$where
					ORDER BY cCodigo ASC";
					
		return $query;		
	}
	
	function CargarItem ($rs) {
		$ret['id'] 					= $rs->Fields ('iAlmacenId');
		$ret['codigo'] 				= $rs->Fields ("cCodigo");
		$ret['descripcionCorta'] 	= $rs->Fields ("cDescripcionCorta");

		return $ret;
	}
}