<?
/**************************************************************************************************
 * Archivo: StoreTipoMovimientoStockphp
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
require_once ('Sysgran/Core/Listados/FiltroBooleano.php');
require_once ('Sysgran/Core/Listados/FiltroTexto.php');
require_once ('Sysgran/Core/Php/StoreCustom.php');

class StoreTipoMovimientoStock extends StoreCustom {
	function StoreTipoMovimientoStock ($paginado = false) {
		parent::__construct ($paginado); 

		$this->AgregarFiltro (new FiltroTexto ('codigo', 'tcodigo', 'codigo'));	
		$this->AgregarFiltro (new FiltroTexto ('descripcion', 'tdescripcion', 'descripcion'));	
		$this->AgregarFiltro (new FiltroBooleano ('origen_nulo', 'origen_nulo'));
		$this->AgregarFiltro (new FiltroBooleano ('destino_nulo', 'destino_nulo'));
		$this->AgregarFiltro (new FiltroBooleano ('lote_fabricacion', 'lote_fabricacion'));
		$this->AgregarFiltro (new FiltroBooleano ('lote_compras', 'lote_compras'));
		$this->AgregarFiltro (new FiltroBooleano ('orden_de_trabajo', 'ot'));
		$this->AgregarFiltro (new FiltroBooleano ('formula_fabricacion', 'formula_fabricacion'));
		$this->AgregarFiltro (new FiltroBooleano ('pedido_ventas', 'pedido_ventas'));
		$this->AgregarFiltro (new FiltroBooleano ('orden_de_compra', 'oc'));
	}
	
	function ArmarQuery () {
		$fcod		= $this->GetFiltro ('codigo');
		$fdesc		= $this->GetFiltro ('descripcion');
		$orignull	= $this->GetFiltro ('origen_nulo');
		$destnull	= $this->GetFiltro ('destino_nulo');
		$lotefab	= $this->GetFiltro ('lote_fabricacion');
		$lotecomp	= $this->GetFiltro ('lote_compras');
		$ot			= $this->GetFiltro ('orden_de_trabajo');
		$formfab	= $this->GetFiltro ('formula_fabricacion');
		$pvta		= $this->GetFiltro ('pedido_ventas');
		$ocomp		= $this->GetFiltro ('orden_de_compra');

		$where = '';
		if ($fcod->EsActivo ()) {
			$where .= " AND UPPER (cCodigo) " . $fcod->GetValorQuery ();
		}

		if ($fdesc->EsActivo ()) {
			$where .= " AND UPPER (cDescripcionCorta) " . $fdesc->GetValorQuery ();
		}
		
		if ($orignull->EsActivo ()) {
			$where .= " AND bOrigenNull = " . $orignull->GetValor ();
		}

		if ($destnull->EsActivo ()) {
			$where .= " AND bDestinoNull = " . $destnull->GetValor ();
		}

		if ($lotefab->EsActivo ()) {
			$where .= " AND bRequiereLoteFabricacion = " . $lotefab->GetValor ();
		}

		if ($lotecomp->EsActivo ()) {
			$where .= " AND bRequiereLoteCompras = " . $lotecomp->GetValor ();
		}

		if ($ot->EsActivo ()) {
			$where .= " AND bRequiereOT = " . $ot->GetValor ();
		}

		if ($formfab->EsActivo ()) {
			$where .= " AND bRequiereFormulaDeFabricacion = " . $formfab->GetValor ();
		}

		if ($pvta->EsActivo ()) {
			$where .= " AND bRequierePVenta = " . $pvta->GetValor ();
		}

		if ($ocomp->EsActivo ()) {
			$where .= " AND bRequiereOCompra = " . $ocomp->GetValor ();
		}

		$query = "SELECT cCodigo, iTipoMovimientoStockId, cDescripcionCorta 
					FROM TipoMovimientoStock 
					WHERE
						bActivo = " . DB::ToBoolean (true) . "
						$where
					ORDER BY iTipoMovimientoStockId ASC";
					
		return $query;
	}
	
	function CargarItem ($rs) {
		$ret['id'] 					= $rs->Fields ('iTipoMovimientoStockId');
		$ret['codigo'] 				= $rs->Fields ("cCodigo");
		$ret['descripcionCorta'] 	= $rs->Fields ("cDescripcionCorta");

		return $ret;
	}
}