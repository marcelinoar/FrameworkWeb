<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: StoreCentroDeTrabajo.php
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

class StoreCentroDeTrabajo extends StoreCustom {
	function StoreCentroDeTrabajo ($paginado = false) {
		parent::__construct ($paginado); 

		// Filtros sobre la tabla producto
		$this->AgregarFiltro (new FiltroTexto ('codigo', 'tcodigo', 'codigo'));	
		$this->AgregarFiltro (new FiltroTexto ('nombre', 'tnombre', 'nombre'));	
		$this->AgregarFiltro (new FiltroNumerico ('planta', 'planta'));
		$this->AgregarFiltro (new FiltroNumerico ('almacen', 'almacen'));
		$this->AgregarFiltro (new FiltroNumerico ('maquina', 'maq'));
		$this->AgregarFiltro (new FiltroNumerico ('operacion', 'oper'));
		$this->AgregarFiltro (new FiltroBooleano ('genContenedor', 'genContenedor'));
		$this->AgregarFiltro (new FiltroBooleano ('trabLote', 'trabLote'));
	}

	function ArmarQuery () {
		$fcod		= $this->GetFiltro ('codigo');
		$fnom		= $this->GetFiltro ('nombre');
		$fplanta	= $this->GetFiltro ('planta');
		$falmac		= $this->GetFiltro ('almacen');
		$fmaq		= $this->GetFiltro ('maquina');
		$foper		= $this->GetFiltro ('operacion');
		$fgcont		= $this->GetFiltro ('genContenedor');
		$flote		= $this->GetFiltro ('trabLote');
		
		$join = '';
		$where = '';
		$groupby = '';
		if ($fcod->EsActivo ()) {
			$where .= " AND UPPER (ct.cCodigo) " . $fcod->GetValorQuery ();
		}
		
		if ($fnom->EsActivo ()) {
			$where .= " AND UPPER (ct.cNombre) " . $fnom->GetValorQuery ();
		}
		
		if ($fplanta->EsActivo ()) {
			$where .= " AND ct.iPlantaId = " . $fplanta->GetValor ();
		}

		if ($falmac->EsActivo ()) {
			$where .= " AND ct.iAlmacenAsociadoId = " . $falmac->GetValor ();
		}

		if ($fmaq->EsActivo ()) {
			$grouby = 'GROUP BY ct.iCentroDeTrabajoId, ct.cCodigo, ct.cNombre ';
			$where .= " AND m.iMaquinaId = " . $fmaq->GetValor ();
			$join .= ' JOIN Maquina m ON m.iCentroDeTrabajoId = ct.iCentroDeTrabajoId';
		}

		if ($foper->EsActivo ()) {
			$grouby = 'GROUP BY ct.iCentroDeTrabajoId, ct.cCodigo, ct.cNombre ';
			$where .= " AND o.iOperacionId = " . $foper->GetValor ();
			$join .= ' JOIN Operacion o ON o.iCentroDeTrabajoId = ct.iCentroDeTrabajoId';
		}

		if ($fgcont->EsActivo ()) {
			$where .= " AND ct.bGeneraPallet = " . $fgcont->GetValor ();
		}

		if ($flote->EsActivo ()) {
			$where .= " AND ct.bOrganizaPorLote = " . $flote->GetValor ();
		}

		$query = "SELECT ct.iCentroDeTrabajoId, ct.cCodigo, ct.cNombre 
					FROM CentroDeTrabajo ct
					$join
					WHERE 
						ct.bActivo = " . DB::ToBoolean (true) . " 
						$where
						$groupby
					ORDER BY ct.cNombre ASC";
					
		return $query;		
	}
	
	function CargarItem ($rs) {
		$ret['id'] 					= $rs->Fields ('iCentroDeTrabajoId');
		$ret['centroDeTrabajoId'] 	= $rs->Fields ('iCentroDeTrabajoId');
		$ret['codigo'] 				= $rs->Fields ("cCodigo");
		$ret['nombre'] 				= $rs->Fields ("cNombre");

		return $ret;
	}
}