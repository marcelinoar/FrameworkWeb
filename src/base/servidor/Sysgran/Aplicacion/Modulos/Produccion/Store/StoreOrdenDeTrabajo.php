<?
/**************************************************************************************************
 * Archivo: StoreOrdenDeTrabajophp
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
require_once ('Sysgran/Core/Listados/FiltroRangoNumerico.php');
require_once ('Sysgran/Core/Php/StoreCustom.php');

class StoreOrdenDeTrabajo extends StoreCustom {
	function StoreOrdenDeTrabajo ($paginado = false) {
		parent::__construct ($paginado); 

		// Filtros sobre la tabla producto
		$this->AgregarFiltro (new FiltroNumerico ('estado', 'estado'));			
		$this->AgregarFiltro (new FiltroTexto ('comentario', 'tcomentario', 'comentario'));	
		$this->AgregarFiltro (new FiltroRangoNumerico ('cantidad', 'cant_desde', 'cant_hasta'));	
		$this->AgregarFiltro (new FiltroNumerico ('centroDeTrabajo', 'centroTrabajo'));
		$this->AgregarFiltro (new FiltroNumerico ('producto', 'producto'));
		$this->AgregarFiltro (new FiltroNumerico ('codigo', 'codigo'));
		$this->AgregarFiltro (new FiltroNumerico ('unidadDeMedida', 'um'));
		$this->AgregarFiltro (new FiltroNumerico ('lote', 'lote'));
	}

	function ArmarQuery () {
		$festado	= $this->GetFiltro ('estado');
		$fcom		= $this->GetFiltro ('comentario');
		$fct		= $this->GetFiltro ('centroDeTrabajo');
		$fprod		= $this->GetFiltro ('producto');
		$fcodigo	= $this->GetFiltro ('codigo');
		$fcant		= $this->GetFiltro ('cantidad');
		$fum		= $this->GetFiltro ('unidadDeMedida');
		$flot		= $this->GetFiltro ('lote');
		
		if ($festado->EsActivo ()) {
			$where .= " AND ot.iEstadoOTId = " . $festado->GetValor ();
		}
		
		if ($fcom->EsActivo ()) {
			$where .= " AND UPPER (ot.cComentarios) " . $fcom->GetValorQuery ();
		}
		
		if ($fct->EsActivo ()) {
			$where .= " AND pf.iCentroDeTrabajoId = " . $fct->GetValor ();
		}
		
		if ($fprod->EsActivo ()) {
			$where .= " AND p.iProductoId = " . $fprod->GetValor ();
		}

		if ($fcodigo->EsActivo ()) {
			$where .= " AND ot.iOrdenDeTrabajoId = " . $fcodigo->GetValor ();
		}
		
		if ($flot->EsActivo ()) {
			// Si viene 0 filtramos por las que no tienen lote.
			if ($flot->GetValor () == 0) {
				$where .= " AND ot.iLoteDeFabricacionId IS null ";
			
			} else {
				$where .= " AND ot.iLoteDeFabricacionId = " . $flot->GetValor ();
			}
		}

		if ($fum->EsActivo ()) {
			$where .= " AND ot.iUnidadDeMedidaId = " . $fum->GetValor ();
		}

		if ($fcant->EsActivo ()) {
			$where .= " AND ot.fCantidad " . $fcant->GetValorQuery ();
		}		

		$query = "SELECT ot.iOrdenDeTrabajoId, TO_CHAR(ot.dFechaDeCreacion, 'DD/MM/YYYY') AS fecha_creacion, ot.fCantidad, um.cCodigo AS cod_um, p.cCodigo AS cod_prod, ct.cCodigo AS cod_ct, p.cDescripcionCorta, e.cNombre AS nom_estado
				FROM ProductoFabricacion pf, CentroDeTrabajo ct, OrdenDeTrabajo ot
				JOIN UnidadDeMedida um ON um.iUnidadDeMedidaId = ot.iUnidadDeMedidaId
				JOIN Producto p ON p.iProductoId = ot.iProductoId
				JOIN EstadoOT e ON e.iEstadoOTId = ot.iEstadoOTId
				WHERE
					ct.iCentroDeTrabajoId = pf.iCentroDeTrabajoId AND
					pf.iProductoId = ot.iProductoId AND
					ot.bActivo = " . DB::ToBoolean (true) . "
					$where
				ORDER BY ot.iOrdenDeTrabajoId DESC";
		
		return $query;		
	}
	
	function CargarItem ($rs) {
		$ret['id'] 						= $rs->Fields ('iOrdenDeTrabajoId');
		$ret['codigo'] 					= $rs->Fields ("iOrdenDeTrabajoId");
		$ret['codigoCentroDeTrabajo'] 	= $rs->Fields ("cod_ct");
		$ret['codigoProducto'] 			= $rs->Fields ("cod_prod");
		$ret['descripcionProducto'] 	= $rs->Fields ("cDescripcionCorta");
		$ret['cantidad'] 				= DB::FromFloat ($rs->Fields ("fCantidad"));
		$ret['codigoUnidadDeMedida'] 	= $rs->Fields ("cod_um");
		$ret['nombreEstado'] 			= $rs->Fields ("nom_estado");
		$ret['fechaCreacion'] 			= $rs->Fields ("fecha_creacion");

		return $ret;
	}
}