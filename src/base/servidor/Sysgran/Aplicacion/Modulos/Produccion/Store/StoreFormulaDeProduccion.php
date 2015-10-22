<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: StoreFormulaDeProduccionphp
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
require_once ('Sysgran/Aplicacion/Entidades/Produccion/TipoFormulaDeProduccion.php');

class StoreFormulaDeProduccion extends StoreCustom {
	function StoreFormulaDeProduccion ($paginado = false) {
		parent::__construct ($paginado); 

		// Filtros sobre la tabla producto
		$this->AgregarFiltro (new FiltroTexto ('codigo', 'tcodigo', 'codigo'));	
		$this->AgregarFiltro (new FiltroTexto ('descripcion', 'tdesc', 'desc'));	
		$this->AgregarFiltro (new FiltroNumerico ('producto', 'producto'));
		$this->AgregarFiltro (new FiltroNumerico ('formula', 'formula'));
	}

	function ArmarQuery () {
		$fcod		= $this->GetFiltro ('codigo');
		$fdesc		= $this->GetFiltro ('descripcion');
		$fprod		= $this->GetFiltro ('producto');
		$fform		= $this->GetFiltro ('formula');

		$join = '';
		$groupby = '';
		if ($fcod->EsActivo ()) {
			$where .= " AND UPPER (f.cCodigo) " . $fcod->GetValorQuery ();
		}
		
		if ($fdesc->EsActivo ()) {
			$where .= " AND (UPPER (f.cDescripcionCorta) " . $fdesc->GetValorQuery () . " OR UPPER (f.cDescripcionLarga) " . $fdesc->GetValorQuery () . ")";
		}

		if ($fprod->EsActivo ()) {
			$join .= " JOIN DetFormulaDeProduccion df ON df.iFormulaDeProduccionId = f.iFormulaDeProduccionId ";
			$groupby = "GROUP BY f.iFormulaDeProduccionid, f.cCodigo, f.cDescripcionCorta ";
			$where .= " AND df.iProductoUsadoId = " . $fprod->GetValor ();
		}
		
		if ($fform->EsActivo ()) {
			$join .= " JOIN DetFormulaDeProduccion df2 ON df2.iFormulaDeProduccionId = f.iFormulaDeProduccionId ";
			$groupby = "GROUP BY f.iFormulaDeProduccionid, f.cCodigo, f.cDescripcionCorta ";
			$where .= " AND df2.iFormulaUsadaId = " . $fform->GetValor ();
		}		

		$query = "SELECT f.iFormulaDeProduccionid, f.cCodigo, f.cDescripcionCorta 
						FROM FormulaDeProduccion f
						$join
						WHERE 
							f.iTipoFormulaDeProduccionId = " . TipoFormulaDeProduccion::FormulaIngProducto . " AND
							f.bActivo = " . DB::ToBoolean (true) . " 
							$where
						$groupby
						ORDER BY cCodigo ASC";
					
		return $query;		
	}

	function CargarItem ($rs) {
		$ret['id'] 					= $rs->Fields ('iFormulaDeProduccionId');
		$ret['codigo'] 				= $rs->Fields ("cCodigo");
		$ret['descripcionCorta'] 	= $rs->Fields ("cDescripcionCorta");

		return $ret;
	}
}