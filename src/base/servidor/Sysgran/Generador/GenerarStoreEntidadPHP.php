<?

function GenerarStoreEntidadPHP($m) {
	$ret = "<?\n";
	$ret .= '/**************************************************************************************************' . "\n";
  	$ret .= ' * Archivo: Store' . $m->NombreEntidad.php . "\n";
  	$ret .= ' * ------------------------------------------------------------------------------------------------' . "\n";
  	$ret .= ' * Autor: Marcelino Morales' . "\n";
 	$ret .= ' * Version: 1.0' . "\n";
  	$ret .= ' * Descripcion:' . "\n";
 	$ret .= ' * Modificaciones:' . "\n";
  	$ret .= ' *	-' . "\n";
 	$ret .= ' *' . "\n";
 	$ret .= ' **************************************************************************************************/' . "\n\n";
	$ret .= "require_once ('template.php');
require_once ('Sysgran/Core/Red/Encoder.php');
require_once ('Sysgran/Core/Listados/FiltroNumerico.php');
require_once ('Sysgran/Core/Listados/FiltroTexto.php');
require_once ('Sysgran/Core/Php/StoreCustom.php');

class Store" . $m->NombreEntidad . " extends StoreCustom {
	function Store" . $m->NombreEntidad . " (" . '$paginado' . " = false) {
		parent::__construct (" . '$paginado' . "); 

		// Agregar filtros sobre la tabla
	}
	
	function ArmarQuery () {
		// Leer filtros
		
		" . '$' . "query = \"SELECT m.* FROM " . $m->NombreEntidad . " m\";
		return " . '$' . "query;
	}
	
	function CargarItem (" . '$' . "rs) {
		" . '$ret' . '[\'id\'] = $rs->Fields (\'i' . $m->NombreEntidad . "Id');\n";
		
	for ($i = 0; $i < count ($m->Listado->Campos); $i++) {
		if ($m->Listado->Campos[$i]->EsSubCampo) {
			$ret .= "\t\t" . '$ret[\'' . $m->Listado->Campos[$i]->Nombre . "']['" . $m->Listado->Campos[$i]->NombreSubCampo . "'] = " . '$rs->Fields (' . "''" . ');' . "\n";
		
		} else {
			$ret .= "\t\t" . '$ret[\'' . $m->Listado->Campos[$i]->Nombre . "'] = " . '$rs->Fields ("");' . "\n";
		}
	}

	$ret .= "\n\t\t" . 'return $ret;
	}
}';
	return $ret;
}
?>
