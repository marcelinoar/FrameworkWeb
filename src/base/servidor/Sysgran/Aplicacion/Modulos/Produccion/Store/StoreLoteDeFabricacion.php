<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: StoreLoteDeFabricacionphp
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

class StoreLoteDeFabricacion extends StoreCustom {
	function StoreLoteDeFabricacion ($paginado = false) {
		parent::__construct ($paginado); 

		// Filtros sobre la tabla producto
		$this->AgregarFiltro (new FiltroTexto ('comentarios', 'tcomentarios', 'comentarios'));	
		$this->AgregarFiltro (new FiltroNumerico ('centroDeTrabajo', 'centroTrabajo'));
		$this->AgregarFiltro (new FiltroNumerico ('producto', 'producto'));
		$this->AgregarFiltro (new FiltroNumerico ('ordenDeTrabajo', 'ot'));			
		$this->AgregarFiltro (new FiltroNumerico ('codigo', 'codigo'));
	}

	function ArmarQuery () {
		$fcom		= $this->GetFiltro ('comentarios');
		$fct		= $this->GetFiltro ('centroDeTrabajo');
		$fprod		= $this->GetFiltro ('producto');
		$fcodigo	= $this->GetFiltro ('codigo');
		$fot		= $this->GetFiltro ('ordenDeTrabajo');

		$join = '';
		
		if ($fcom->EsActivo ()) {
			$where .= " AND UPPER (l.cComentario) " . $fcom->GetValorQuery ();
		}
		
		if ($fct->EsActivo ()) {
			$where .= " AND ct.iCentroDeTrabajoId = " . $fct->GetValor ();
		}
		
		if ($fprod->EsActivo ()) {
			$where .= " AND l.iProductoId = " . $fprod->GetValor ();
		}

		if ($fcodigo->EsActivo ()) {
			$where .= " AND l.iLoteDeFabricacionId = " . $fcodigo->GetValor ();
		}
		
		if ($fot->EsActivo ()) {
			$join .= " JOIN OrdenDeTrabajo ot ON ot.iLoteDeFabricacionId = l.iLoteDeFabricacionId ";
			$where .= " AND ot.iOrdenDeTrabajoId = " . $fot->GetValor ();
		}

		$query = "SELECT l.*, TO_CHAR(l.dFechaCreacion, 'DD/MM/YYYY') AS fecha, ct.cNombre
					FROM LoteDeFabricacion l
					$join
					JOIN CentroDeTrabajo ct ON ct.iCentroDeTrabajoId = l.iCentroDeTrabajoId
					WHERE
						l.bActivo = " . DB::ToBoolean (true) . "
						$where
					ORDER BY l.iLoteDeFabricacionId DESC";
					
		return $query;		
	}

	function CargarItem ($rs) {
		$ret['id'] 						= $rs->Fields ('iLoteDeFabricacionId');
		$ret['codigo'] 					= $rs->Fields ('iLoteDeFabricacionId');
		$ret['nombreCentroDeTrabajo'] 	= $rs->Fields ('cNombre');
		$ret['fechaCreacion'] 			= $rs->Fields ('fecha');
		$ret['comentario'] 				= $rs->Fields ('cComentario');

		return $ret;
	}
}