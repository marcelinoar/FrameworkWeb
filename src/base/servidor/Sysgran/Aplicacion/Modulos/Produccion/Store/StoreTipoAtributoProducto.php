<?
/**************************************************************************************************
 * Archivo: StoreTipoAtributoProducto
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

class StoreTipoAtributoProducto extends StoreCustom {
	function StoreTipoAtributoProducto ($paginado = false) {
		parent::__construct ($paginado); 

		// Filtros sobre la tabla producto
		$this->AgregarFiltro (new FiltroTexto ('nombre', 'tnombre', 'nombre'));	
		$this->AgregarFiltro (new FiltroNumerico ('codigo', 'codigo'));
	}

	function ArmarQuery () {
		$fnom		= $this->GetFiltro ('nombre');
		$fcod		= $this->GetFiltro ('codigo');

		$join = '';
		if ($fcod->EsActivo ()) {
			$where .= " AND iTipoAtributoProductoId = " . $fcod->GetValor ();
		}
		
		if ($fnom->EsActivo ()) {
			$where .= " AND UPPER (cNombre) " . $fnom->GetValorQuery ();
		}

		$query = "SELECT iTipoAtributoProductoId, cNombre
					FROM TipoAtributoProducto 
					WHERE 
						bActivo = " . DB::ToBoolean (true) . " 
						$where
					ORDER BY cNombre ASC";
					
		return $query;		
	}
	
	function CargarItem ($rs) {
		$ret['id'] 						= $rs->Fields ('iTipoAtributoProductoId');
		$ret['nombre'] 					= $rs->Fields ("cNombre");

		return $ret;
	}
}