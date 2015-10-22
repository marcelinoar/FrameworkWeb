<?
/**************************************************************************************************
 * Archivo: StoreHojaDeRuta.php
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
require_once ('Sysgran/Aplicacion/Entidades/Produccion/TipoHojaDeRuta.php');

class StoreHojaDeRuta extends StoreCustom {
	function StoreHojaDeRuta ($paginado = false) {
		parent::__construct ($paginado); 

		// Filtros sobre la tabla producto
		$this->AgregarFiltro (new FiltroTexto ('codigo', 'tcodigo', 'codigo'));	
		$this->AgregarFiltro (new FiltroTexto ('descripcion', 'tdesc', 'desc'));	
		$this->AgregarFiltro (new FiltroNumerico ('operacion', 'oper'));
	}

	function ArmarQuery () {
		$fcod		= $this->GetFiltro ('codigo');
		$fdesc		= $this->GetFiltro ('descripcion');
		$foper		= $this->GetFiltro ('operacion');

		$join = '';
		$groupby = '';
		if ($fcod->EsActivo ()) {
			$where .= " AND UPPER (h.cCodigo) " . $fcod->GetValorQuery ();
		}
		
		if ($fdesc->EsActivo ()) {
			$where .= " AND (UPPER (h.cDescripcionCorta) " . $fdesc->GetValorQuery () . " OR UPPER (h.cDescripcionLarga) " . $fdesc->GetValorQuery () . ")";
		}

		if ($foper->EsActivo ()) {
			$join .= "JOIN DetHojaDeRuta d ON d.iHojaDeRutaId = h.iHojaDeRutaId";
			$groupby = "GROUP BY h.iHojaDeRutaId, h.cCodigo, h.cDescripcionCorta";
			$where .= " AND d.iOperacionId = " . $foper->GetValor ();
		}

		$query = "SELECT h.iHojaDeRutaId, h.cCodigo, h.cDescripcionCorta 
					FROM HojaDeRuta h
					$join
					WHERE 
						h.iTipoHojaDeRutaId = " . TipoHojaDeRuta::HojaDeRutaIngProducto . " AND
						h.bActivo = " . DB::ToBoolean (true) . " 
						$where
					$groupby
					ORDER BY cCodigo ASC";
					
		return $query;		
	}
	
	function CargarItem ($rs) {
		$ret['id']	 				= $rs->Fields ('iHojaDeRutaId');
		$ret['codigo'] 				= $rs->Fields ("cCodigo");
		$ret['descripcionCorta'] 	= $rs->Fields ("cDescripcionCorta");

		return $ret;
	}
}