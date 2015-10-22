<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: StoreUnidadDeMedida.php
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

class StoreUnidadDeMedida extends StoreCustom {
	function StoreUnidadDeMedida ($paginado = false) {
		parent::__construct ($paginado); 

		// Filtros sobre la tabla producto
		$this->AgregarFiltro (new FiltroTexto ('codigo', 'tcodigo', 'codigo'));	
		$this->AgregarFiltro (new FiltroTexto ('descripcion', 'tdescripcion', 'descripcion'));	
	}

	function ArmarQuery () {
		$fcod		= $this->GetFiltro ('codigo');
		$fdesc		= $this->GetFiltro ('descripcion');

		$join = '';
		$groupby = '';
		if ($fcod->EsActivo ()) {
			$where .= " AND UPPER (u.cCodigo) " . $fcod->GetValorQuery ();
		}
		
		if ($fdesc->EsActivo ()) {
			$where .= " AND UPPER (u.cDescripcionCorta) " . $fdesc->GetValorQuery ();
		}

		$query = "SELECT u.iUnidadDeMedidaId, u.cDescripcionCorta, u.cCodigo 
						FROM UnidadDeMedida u
						WHERE 
							u.bActivo = " . DB::ToBoolean (true) . " 
							$where
						ORDER BY u.cCodigo ASC";
						
		return $query;		
	}
	
	function CargarItem ($rs) {
		$ret['id'] 					= $rs->Fields ('iUnidadDeMedidaId');
		$ret['unidadDeMedidaId'] 	= $rs->Fields ('iUnidadDeMedidaId');
		$ret['codigo'] 				= $rs->Fields ("cCodigo");
		$ret['descripcionCorta'] 	= $rs->Fields ("cDescripcionCorta");

		return $ret;
	}
}