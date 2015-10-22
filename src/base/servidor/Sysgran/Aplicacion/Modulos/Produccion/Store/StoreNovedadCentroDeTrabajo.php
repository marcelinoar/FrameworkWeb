<?
/**************************************************************************************************
 * Archivo: StoreNovedadCentroDeTrabajo.php
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
require_once ('Sysgran/Core/Listados/FiltroTexto.php');
require_once ('Sysgran/Core/Php/StoreCustom.php');

class StoreNovedadCentroDeTrabajo extends StoreCustom {
	function StoreNovedadCentroDeTrabajo ($paginado = false) {
		parent::__construct ($paginado); 

		// Filtros sobre la tabla producto
		$this->AgregarFiltro (new FiltroNumerico ('codigo', 'codigo'));
		$this->AgregarFiltro (new FiltroNumerico ('tipo', 'tipo'));
		$this->AgregarFiltro (new FiltroNumerico ('centroTrabajo', 'ct'));
		$this->AgregarFiltro (new FiltroNumerico ('usuario', 'usu'));
		$this->AgregarFiltro (new FiltroNumerico ('maquina', 'maq'));
		$this->AgregarFiltro (new FiltroRangoFechas ('fechas', 'desde', 'hasta'));	
		$this->AgregarFiltro (new FiltroTexto ('comentarios', 'tcomentario', 'comentario'));	
	}

	function ArmarQuery () {
		$fcod		= $this->GetFiltro ('codigo');
		$ftipo		= $this->GetFiltro ('tipo');
		$fct		= $this->GetFiltro ('centroTrabajo');
		$fusu		= $this->GetFiltro ('usuario');
		$fmaq		= $this->GetFiltro ('maquina');
		$ffechas	= $this->GetFiltro ('fechas');		
		$fcom		= $this->GetFiltro ('comentarios');		
		
		$join = '';
		if ($fcod->EsActivo ()) {
			$where .= " AND n.iNovedadCentroDeTrabajoId = " . $fcod->GetValor ();
		}
		
		if ($ftipo->EsActivo ()) {
			$where .= " AND n.iTipoNovedadCTId = " . $ftipo->GetValor ();
		}

		if ($fct->EsActivo ()) {
			$where .= " AND n.iCentroDeTrabajoId = " . $fct->GetValor ();
		}
		
		if ($fusu->EsActivo ()) {
			$where .= " AND n.iUsuarioId = " . $fusu->GetValor ();
		}

		if ($fmaq->EsActivo ()) {
			$where .= " AND n.iMaquinaId = " . $fmaq->GetValor ();
		}

		if ($ffechas->EsActivo ()) {
			$where .= " AND n.dFechaYHora " . $ffechas->GetValorQuery ();
		}

		if ($fcom->EsActivo ()) {
			$where .= " AND UPPER (n.cComentarios) " . $fcom->GetValorQuery ();
		}		

		$query = "SELECT n.iNovedadCentroDeTrabajoId, t.cNombre AS nom_tipo, TO_CHAR(n.dFechaYHora, 'DD/MM/YYYY HH24:MI:SS') AS fecha, m.cCodigo AS cod_maquina, n.cComentarios, ct.cNombre AS nom_ct
					FROM NovedadCentroDeTrabajo n
					JOIN TipoNovedadCT t ON t.iTipoNovedadCTId = n.iTipoNovedadCTId
					JOIN CentroDeTrabajo ct ON ct.iCentroDeTrabajoId = n.iCentroDeTrabajoId
					LEFT OUTER JOIN Maquina m ON m.iMaquinaId = n.iMaquinaId
					WHERE 
						n.bActivo = " . DB::ToBoolean (true) . " 
						$where
					ORDER BY n.iNovedadCentroDeTrabajoId DESC";
					
		return $query;		
	}
	
	function CargarItem ($rs) {
		$ret['id'] 						= $rs->Fields ('iNovedadCentroDeTrabajoId');
		$ret['nombreCentroDeTrabajo'] 	= $rs->Fields ('nom_ct');
		$ret['nombreTipo'] 				= $rs->Fields ("nom_tipo");
		$ret['fecha'] 					= $rs->Fields ("fecha");
		$ret['codigoMaquina'] 			= $rs->Fields ("cod_maquina");
		$ret['comentario'] 				= $rs->Fields ("cComentarios");

		return $ret;
	}
}
