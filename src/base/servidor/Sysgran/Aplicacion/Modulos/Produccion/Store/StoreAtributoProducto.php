<?
/**************************************************************************************************
 * Archivo: StoreAtributoProducto
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

class StoreAtributoProducto extends StoreCustom {
	function StoreAtributoProducto ($paginado = false) {
		parent::__construct ($paginado); 

		// Filtros sobre la tabla producto
		$this->AgregarFiltro (new FiltroTexto ('nombre', 'tnombre', 'nombre'));	
		$this->AgregarFiltro (new FiltroNumerico ('unidad', 'um'));
		$this->AgregarFiltro (new FiltroNumerico ('codigo', 'codigo'));
		$this->AgregarFiltro (new FiltroNumerico ('tipo', 'tipo'));
	}

	function ArmarQuery () {
		$fnom		= $this->GetFiltro ('nombre');
		$funid		= $this->GetFiltro ('unidad');
		$fcod		= $this->GetFiltro ('codigo');
		$ftipo		= $this->GetFiltro ('tipo');

		$join = '';
		if ($fnom->EsActivo ()) {
			$where .= " AND UPPER (a.cNombre) " . $fnom->GetValorQuery ();
		}

		if ($funid->EsActivo ()) {
			$where .= " AND a.iUnidadDeMedidaId = " . $funid->GetValor ();
		}
		
		if ($fcod->EsActivo ()) {
			$where .= " AND a.iAtributoProductoId = " . $fcod->GetValor ();
		}

		if ($ftipo->EsActivo ()) {
			$where .= " AND a.iTipoAtributoProductoId = " . $ftipo->GetValor ();
		}

		$query = "SELECT a.iAtributoProductoId, a.cNombre, a.iUnidadDeMedidaId, u.cDescripcionCorta, u.cCodigo, ta.cNombre AS nombre_tipo
						FROM AtributoProducto a 
						LEFT OUTER JOIN UnidadDeMedida u ON u.iUnidadDeMedidaId = a.iUnidadDeMedidaId
						LEFT OUTER JOIN TipoAtributoProducto ta ON ta.iTipoAtributoProductoId = a.iTipoAtributoProductoId
						WHERE
							a.bActivo = " . DB::ToBoolean (true) . "
							$where
						ORDER BY cNombre ASC";
					
		return $query;		
	}
	
	function CargarItem ($rs) {
		$ret['id'] 									= $rs->Fields ('iAtributoProductoId');
		$ret['codigo'] 								= $rs->Fields ('iAtributoProductoId');
		$ret['nombre'] 								= $rs->Fields ("cNombre");
		$ret['tipoAtributo']['nombre']				= $rs->Fields ("nombre_tipo");
		$ret['nombreTipo']							= $rs->Fields ("nombre_tipo");
		$ret['unidadDeMedida']['unidadDeMedidaId'] 	= $rs->Fields ("iUnidadDeMedidaId");
		$ret['unidadDeMedida']['descripcionCorta'] 	= $rs->Fields ("cDescripcionCorta");
		$ret['unidadDeMedida']['codigo'] 			= $rs->Fields ("cCodigo");
		$ret['codigoUnidadDeMedida'] 				= $rs->Fields ("cCodigo");

		return $ret;
	}
}