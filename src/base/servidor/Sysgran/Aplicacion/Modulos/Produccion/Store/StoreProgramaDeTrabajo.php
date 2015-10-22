<?
/**************************************************************************************************
 * Archivo: StoreMaquina.php
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
require_once ('Sysgran/Core/Listados/FiltroRangoFechas.php');
require_once ('Sysgran/Core/Php/StoreCustom.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/EstadoOT.php');

class StoreProgramaDeTrabajo extends StoreCustom {
	function StoreProgramaDeTrabajo ($paginado = false) {
		parent::__construct ($paginado); 

		// Filtros sobre la tabla producto
		$this->AgregarFiltro (new FiltroNumerico ('centroTrabajo', 'ct'));
		$this->AgregarFiltro (new FiltroNumerico ('maquina', 'maq'));
		$this->AgregarFiltro (new FiltroRangoFechas ('fechas', 'desde', 'hasta'));
	}

	function ArmarQuery () {
		$fct		= $this->GetFiltro ('centroTrabajo');
		$fmaq		= $this->GetFiltro ('maquina');
		$ffecha		= $this->GetFiltro ('fechas');
		
		$join = '';
		if ($fct->EsActivo ()) {
			$where .= " AND pf.iCentroDeTrabajoId = " . $fct->GetValor ();
		}

		if ($fmaq->EsActivo ()) {
			$where .= " AND op.iMaquinaId = " . $fmaq->GetValor ();
		}

		if ($ffecha->EsActivo ()) {
			$where .= " AND ot.dFechaDeProduccionProgramada " . $ffecha->GetValorQuery ();

			$query = "SELECT ot.iOrdenDeTrabajoId, p.cCodigo AS cod_prod, p.cDescripcionCorta AS desc_prod, TO_CHAR (ot.dFechaDeProduccionProgramada, 'DD/MM/YYYY') AS fecha, ot.fCantidad, um.cCodigo AS cod_um, m.cCodigo AS cod_maq, ot.iLoteDeFabricacionId
						FROM OrdenDeTrabajo ot
						JOIN HojaDeRuta hdr ON hdr.iHojaDeRutaId = ot.iHojaDeRutaId
						JOIN OperacionPorOt op ON op.iOrdenDeTrabajoId = ot.iOrdenDeTrabajoId AND op.iHojaDeRutaId = hdr.iHojaDeRutaId
						JOIN ProductoFabricacion pf ON pf.iProductoId = ot.iProductoId
						JOIN Producto p ON p.iProductoId = ot.iProductoId
						JOIN UnidadDeMedida um ON um.iUnidadDeMedidaId = ot.iUnidadDeMedidaId
						LEFT OUTER JOIN Maquina m ON m.iMaquinaId = op.iMaquinaId
						WHERE
							ot.bActivo = " . DB::ToBoolean (true) . " AND
							ot.iEstadoOTId = " . EstadoOT::Programada . " 
							$where
						ORDER BY ot.iLoteDeFabricacionId, ot.iOrdenDeTrabajoId DESC";
		} else {
			$query = '';
		}
					
		return $query;		
	}
	
	function CargarItem ($rs) {
		$ret['id'] 					= $rs->Fields ('iOrdenDeTrabajoId');
		$ret['codigoProducto']		= $rs->Fields ('cod_prod');
		$ret['descripcionProducto']	= $rs->Fields ("desc_prod");
		$ret['fechaDeProduccion'] 	= $rs->Fields ("fecha");
		$ret['codigoCliente'] 		= '';
		$ret['cantidad'] 			= DB::FromFloat ($rs->Fields ("fCantidad"));
		$ret['codigoUnidadDeMedida']= $rs->Fields ("cod_um");
		$ret['codigoMaquina'] 		= $rs->Fields ("cod_maq");
		$ret['loteId'] 				= $rs->Fields ("iLoteDeFabricacionId");

		return $ret;
	}
}