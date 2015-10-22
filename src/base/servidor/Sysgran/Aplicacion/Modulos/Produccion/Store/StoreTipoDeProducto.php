<?
/**************************************************************************************************
 * Archivo: StoreTipoDeProducto.php
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
require_once ('Sysgran/Core/Listados/FiltroBooleano.php');
require_once ('Sysgran/Core/Listados/FiltroTexto.php');
require_once ('Sysgran/Core/Php/StoreCustom.php');

class StoreTipoDeProducto extends StoreCustom {
	function StoreTipoDeProducto ($paginado = false) {
		parent::__construct ($paginado); 

		// Filtros sobre la tabla producto
		$this->AgregarFiltro (new FiltroNumerico ('codigo', 'codigo'));
		$this->AgregarFiltro (new FiltroTexto ('nombre', 'tnom', 'nom'));	
		$this->AgregarFiltro (new FiltroNumerico ('esVentas', 'esVentas'));
		$this->AgregarFiltro (new FiltroNumerico ('esFabricacion', 'esFabricacion'));
		$this->AgregarFiltro (new FiltroNumerico ('esCompras', 'esCompras'));
	}

	function ArmarQuery () {
		$fnom		= $this->GetFiltro ('nombre');
		$fcod		= $this->GetFiltro ('codigo');
		$fventas	= $this->GetFiltro ('esVentas');
		$fcomp		= $this->GetFiltro ('esCompras');
		$ffab		= $this->GetFiltro ('esFabricacion');

		$join = '';
		if ($fcod->EsActivo ()) {
			$where .= " AND iTipoDeProductoId = " . $fcod->GetValor ();
		}
		
		if ($fnom->EsActivo ()) {
			$where .= " AND UPPER (cNombre) " . $fnom->GetValorQuery ();
		}

		if ($fventas->EsActivo ()) {
			$where .= " AND bEsProductoDeVentas = " . $fventas->GetValor ();
		}

		if ($fcomp->EsActivo ()) {
			$where .= " AND bEsProductoDeCompras = " . $fcomp->GetValor ();
		}

		if ($ffab->EsActivo ()) {
			$where .= " AND bEsProductoDeFabricacion = " . $ffab->GetValor ();
		}

		$query = "SELECT iTipoDeProductoId, cNombre, bEsProductoDeCompras, bEsProductoDeVentas, bEsProductoDeFabricacion 
					FROM TipoDeProducto
					WHERE
						bActivo = " . DB::ToBoolean (true) . "
						$where
					ORDER BY cNombre ASC";
					
		return $query;		
	}
	
	function CargarItem ($rs) {
		$ret['id'] 						= $rs->Fields ('iTipoDeProductoId');
		$ret['tipoDeProductoId'] 		= $rs->Fields ("iTipoDeProductoId");
		$ret['nombre'] 					= $rs->Fields ("cNombre");
		$ret['esProductoDeCompras'] 	= DB::FromBoolean ($rs->Fields ("bEsProductoDeCompras"));
		$ret['esProductoDeVentas'] 		= DB::FromBoolean ($rs->Fields ("bEsProductoDeVentas"));
		$ret['esProductoDeFabricacion'] = DB::FromBoolean ($rs->Fields ("bEsProductoDeFabricacion"));

		return $ret;
	}
}