<?
/**************************************************************************************************
 * Archivo: StoreProductophp
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
require_once ('Sysgran/Core/Listados/FiltroRangoAtributoNumerico.php');
require_once ('Sysgran/Core/Php/StoreCustom.php');

class StoreProducto extends StoreCustom {
	function StoreProducto ($paginado = false) {
		parent::__construct ($paginado); 

		// Filtros sobre la tabla producto
		$this->AgregarFiltro (new FiltroNumerico ('Tipo', 'tipo_usuario'));			
		$this->AgregarFiltro (new FiltroTexto ('Codigo', 'tcodigo', 'codigo'));	
		$this->AgregarFiltro (new FiltroNumerico ('LineaDeProduccion', 'lineaDeProduccion'));
		$this->AgregarFiltro (new FiltroNumerico ('AgrupadorPrimario', 'agrupadorPrimario'));
		$this->AgregarFiltro (new FiltroNumerico ('AgrupadorSecundario', 'agrupadorSecundario'));
		$this->AgregarFiltro (new FiltroNumerico ('AgrupadorTerciario', 'agrupadorTerciario'));
		$this->AgregarFiltro (new FiltroNumerico ('UMStock', 'umStock'));
		$this->AgregarFiltro (new FiltroRangoAtributoNumerico ('ValorAtributo', 'fatributoId', 'fdesde', 'fhasta'));
		$this->AgregarFiltro (new FiltroTexto ('Descripcion', 'ftbusqueda', 'ftvalor'));
		
		$this->AgregarFiltro (new FiltroNumerico ('TipoSistema', 'tipo_sistema'));
		
		// Filtros de produccion.
		$this->AgregarFiltro (new FiltroNumerico ('AlmacenDestino', 'almDest'));
		$this->AgregarFiltro (new FiltroNumerico ('UMFabricacion', 'umFabricacion'));
		$this->AgregarFiltro (new FiltroNumerico ('CentroDeTrabajo', 'ct'));
		$this->AgregarFiltro (new FiltroNumerico ('HojaDeRuta', 'hdr'));
	}

	function ArmarQuery () {
		$ftipo 		= $this->GetFiltro ('Tipo');
		$fatrib 	= $this->GetFiltro ('ValorAtributo');
		$fdesc 		= $this->GetFiltro ('Descripcion');
		$fcod 		= $this->GetFiltro ('Codigo');
		$flinea 	= $this->GetFiltro ('LineaDeProduccion');
		$fprim 		= $this->GetFiltro ('AgrupadorPrimario');
		$fsec 		= $this->GetFiltro ('AgrupadorSecundario');
		$fter		= $this->GetFiltro ('AgrupadorTerciario');
		$fustock	= $this->GetFiltro ('UMStock');
		$falmdest	= $this->GetFiltro ('AlmacenDestino');
		$fumfab		= $this->GetFiltro ('UMFabricacion');
		$fct		= $this->GetFiltro ('CentroDeTrabajo');
		$fhdr		= $this->GetFiltro ('HojaDeRuta');
		$fts		= $this->GetFiltro ('TipoSistema');

		// Seteamos que solo busque los productos activos. 
		$where = ' WHERE p.bActivo = ' . DB::ToBoolean (true);
		$join = '';
		$wflag = 1;
	
		if ($ftipo->EsActivo ()) {
			$where .= ($wflag++ == 0 ? ' WHERE ' : ' AND ');
			$where .= " p.iTipoDeProductoId = " . $ftipo->GetValor ();
		}
		
		if ($fts->EsActivo ()) {
			$join 	.= " JOIN TipoDeProducto tdp ON p.iTipoDeProductoId = tdp.iTipoDeProductoId ";
			$where .= ($wflag++ == 0 ? ' WHERE ' : ' AND ');
			
			if ($fts->GetValor () == 1) { 		// Fabricacion;
				$where .= " tdp.bEsProductoDeFabricacion = " . DB::ToBoolean (true) . " ";

			} else if ($fts->GetValor () == 2) { // Compras;
				$where .= " tdp.bEsProductoDeCompras = " . DB::ToBoolean (true) . " ";

			} else if ($fts->GetValor () == 3) { // Ventas;
				$where .= " tdp.bEsProductoDeVentas = " . DB::ToBoolean (true) . " ";
			}
		}		

		if ($flinea->EsActivo ()) {
			$where .= ($wflag++ == 0 ? ' WHERE ' : ' AND ');
			$where .= " p.iLineaDeProduccionId = " . $flinea->GetValor ();
		}
		
		if ($fprim->EsActivo ()) {
			$where .= ($wflag++ == 0 ? ' WHERE ' : ' AND ');
			$where .= " p.iAgrupadorProductoPrimarioId = " . $fprim->GetValor ();
		}

		if ($fsec->EsActivo ()) {
			$where .= ($wflag++ == 0 ? ' WHERE ' : ' AND ');
			$where .= " p.iAgrupadorProductoSecundarioId = " . $fsec->GetValor ();
		}

		if ($fter->EsActivo ()) {
			$where .= ($wflag++ == 0 ? ' WHERE ' : ' AND ');
			$where .= " p.iAgrupadorProductoTerciarioId = " . $fter->GetValor ();
		}

		if ($fustock->EsActivo ()) {
			$where .= ($wflag++ == 0 ? ' WHERE ' : ' AND ');
			$where .= " p.iUnidadDeMedidaStockId = " . $fustock->GetValor ();
		}
		
		if ($fdesc->EsActivo ()) {
			$where .= ($wflag++ == 0? ' WHERE ' : ' AND ');
			$where .= " (UPPER (p.cDescripcionCorta) " . $fdesc->GetValorQuery () . " OR UPPER (p.cDescripcionCorta) " . $fdesc->GetValorQuery () . ")";
		}

		if ($fcod->EsActivo ()) {
			$where .= ($wflag++ == 0? ' WHERE ' : ' AND ');
			$where .= " UPPER (p.cCodigo) " . $fcod->GetValorQuery ();
		}
		
		if ($fatrib->EsActivo ()) {
			$where .= ($wflag++ == 0? ' WHERE ' : ' AND ');
			
			$join 	.= " JOIN ValorAtributoProducto vap ON vap.iProductoid = p.iProductoId";
			$where 	.= " vap.iAtributoProductoId = " . $fatrib->GetAtributoId () . "
						 AND vap.fValor " . $fatrib->GetValorQuery ();
		}
		
		if ($falmdest->EsActivo () || $fumfab->EsActivo () || $fct->EsActivo () || $fhdr->EsActivo ()) {
			$join 	.= " JOIN ProductoFabricacion pf ON pf.iProductoid = p.iProductoId";
			
			if ($falmdest->EsActivo ()) {
				$where .= ($wflag++ == 0? ' WHERE ' : ' AND ');
				$where .= " pf.iAlmacenDestinoId = " . $falmdest->GetValorQuery ();
			}

			if ($fumfab->EsActivo ()) {
				$where .= ($wflag++ == 0? ' WHERE ' : ' AND ');
				$where .= " pf.iUnidadDeMedidaId = " . $fumfab->GetValorQuery ();
			}

			if ($fct->EsActivo ()) {
				$where .= ($wflag++ == 0? ' WHERE ' : ' AND ');
				$where .= " pf.iCentroDeTrabajoId = " . $fct->GetValorQuery ();
			}
			
			if ($fhdr->EsActivo ()) {
				$where .= ($wflag++ == 0? ' WHERE ' : ' AND ');
				$where .= " pf.iHojaDeRutaId = " . $fhdr->GetValorQuery ();
			}
		}
		
		$query = "SELECT p.iProductoId, p.cCodigo, p.cDescripcionCorta FROM Producto p $join $where";
		
		return $query;
	}
	
	function CargarItem ($rs) {
		$ret['id'] 					= $rs->Fields ('iProductoId');
		$ret['productoId'] 			= $rs->Fields ('iProductoId');
		$ret['codigo'] 				= $rs->Fields ("cCodigo");
		$ret['descripcionCorta'] 	= $rs->Fields ("cDescripcionCorta");

		return $ret;
	}
}

?>