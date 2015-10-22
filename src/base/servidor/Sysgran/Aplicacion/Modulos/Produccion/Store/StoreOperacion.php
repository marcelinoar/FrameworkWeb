<?
/**************************************************************************************************
 * Archivo: StoreOperacion
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

class StoreOperacion extends StoreCustom {
	function StoreOperacion ($paginado = false) {
		parent::__construct ($paginado); 

		// Filtros sobre la tabla producto
		$this->AgregarFiltro (new FiltroTexto ('codigo', 'tcodigo', 'codigo'));	
		$this->AgregarFiltro (new FiltroTexto ('nombre', 'tnombre', 'nombre'));	
		$this->AgregarFiltro (new FiltroTexto ('descripcion', 'tdesc', 'desc'));	
		$this->AgregarFiltro (new FiltroNumerico ('maquina', 'maquina'));
		$this->AgregarFiltro (new FiltroNumerico ('centroTrabajo', 'ct'));
	}

	function ArmarQuery () {
		$fnom		= $this->GetFiltro ('nombre');
		$fcod		= $this->GetFiltro ('codigo');
		$fdesc		= $this->GetFiltro ('descripcion');
		$fmaq		= $this->GetFiltro ('maquina');
		$fct		= $this->GetFiltro ('centroTrabajo');

		$join = '';
		$groupby = '';
		if ($fcod->EsActivo ()) {
			$where .= " AND UPPER (o.cCodigo) " . $fcod->GetValorQuery ();
		}

		if ($fnom->EsActivo ()) {
			$where .= " AND UPPER (o.cNombre) " . $fnom->GetValorQuery ();
		}

		if ($fdesc->EsActivo ()) {
			$where .= " AND UPPER (o.cDescripcion) " . $fdesc->GetValorQuery ();
		}

		if ($fmaq->EsActivo ()) {
			$groupby = 'GROUP BY o.iOperacionId, o.cNombre, o.cCodigo';
			$where .= " AND m.iMaquinaId = " . $fmaq->GetValor ();
			$join .= ' JOIN MaquinaOperacion m ON m.iOperacionId = o.iOperacionId ';
		}
		
		if ($fct->EsActivo ()) {
			$where .= " AND o.iCentroDeTrabajoId = " . $fct->GetValor ();
		}

		$query = "SELECT o.iOperacionId, o.cNombre, o.cCodigo 
					FROM Operacion o
					$join
					WHERE 
						o.bActivo = " . DB::ToBoolean (true) . " 
						$where
					$groupby
					ORDER BY o.cCodigo ASC";
					
		return $query;		
	}

	function CargarItem ($rs) {
		$ret['id'] 				= $rs->Fields ('iOperacionId');
		$ret['operacionId'] 	= $rs->Fields ("iOperacionId");
		$ret['codigo'] 			= $rs->Fields ("cCodigo");
		$ret['nombre'] 			= $rs->Fields ("cNombre");

		return $ret;
	}
}