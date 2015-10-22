<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: StoreLineaDeProduccion.php
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
require_once ('Sysgran/Core/Listados/FiltroTexto.php');
require_once ('Sysgran/Core/Php/StoreCustom.php');

class StoreLineaDeProduccion extends StoreCustom {
	function StoreLineaDeProduccion ($paginado = false) {
		parent::__construct ($paginado); 

		// Filtros sobre la tabla producto
		$this->AgregarFiltro (new FiltroTexto ('codigo', 'tcodigo', 'codigo'));	
		$this->AgregarFiltro (new FiltroTexto ('descripcion', 'tdesc', 'desc'));	
		
	}

	function ArmarQuery () {
		$fcod	= $this->GetFiltro ('codigo');
		$fdesc	= $this->GetFiltro ('descripcion');

		$join = '';
		if ($fcod->EsActivo ()) {
			$where .= " AND UPPER (cCodigo) " . $fcod->GetValorQuery ();
		}

		if ($fdesc->EsActivo ()) {
			$where .= " AND (UPPER (cDescripcionCorta) " . $fdesc->GetValorQuery () . " OR UPPER (cDescripcionLarga) " . $fdesc->GetValorQuery () . ") ";
		}

		$query = "SELECT iLineaDeProduccionId, cCodigo, cDescripcionCorta 
					FROM LineaDeProduccion 
					WHERE 
						bActivo = " . DB::ToBoolean (true) . " 
						$where
					ORDER BY cCodigo ASC";
					
		return $query;		
	}
	
	function CargarItem ($rs) {
		$ret['id'] 					= $rs->Fields ('iLineaDeProduccionId');
		$ret['lineaDeProduccionId'] = $rs->Fields ("iLineaDeProduccionId");
		$ret['codigo'] 				= $rs->Fields ("cCodigo");
		$ret['descripcionCorta'] 	= $rs->Fields ("cDescripcionCorta");

		return $ret;
	}
}