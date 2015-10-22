<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
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
require_once ('Sysgran/Core/Listados/FiltroTexto.php');
require_once ('Sysgran/Core/Php/StoreCustom.php');

class StoreMaquina extends StoreCustom {
	function StoreMaquina ($paginado = false) {
		parent::__construct ($paginado); 

		// Filtros sobre la tabla producto
		$this->AgregarFiltro (new FiltroTexto ('codigo', 'tcodigo', 'codigo'));	
		$this->AgregarFiltro (new FiltroTexto ('descripcion', 'tdesc', 'desc'));	
		$this->AgregarFiltro (new FiltroNumerico ('centroTrabajo', 'ct'));
	}

	function ArmarQuery () {
		$fcod		= $this->GetFiltro ('codigo');
		$fdesc		= $this->GetFiltro ('descripcion');
		$fct		= $this->GetFiltro ('centroTrabajo');
		
		$join = '';
		if ($fcod->EsActivo ()) {
			$where .= " AND UPPER (cCodigo) " . $fcod->GetValorQuery ();
		}
		
		if ($fdesc->EsActivo ()) {
			$where .= " AND UPPER (cDescripcion) " . $fdesc->GetValorQuery ();
		}
		
		if ($fct->EsActivo ()) {
			$where .= " AND iCentroDeTrabajoId = " . $fct->GetValor ();
		}

		$query = "SELECT iMaquinaId, cCodigo, cDescripcion 
					FROM Maquina 
					WHERE 
						bActivo = " . DB::ToBoolean (true) . " 
						$where
					ORDER BY cCodigo ASC";
					
		return $query;		
	}
	
	function CargarItem ($rs) {
		$ret['id'] 			= $rs->Fields ('iMaquinaId');
		$ret['maquinaId'] 	= $rs->Fields ('iMaquinaId');
		$ret['codigo'] 		= $rs->Fields ("cCodigo");
		$ret['descripcion'] = $rs->Fields ("cDescripcion");

		return $ret;
	}
}