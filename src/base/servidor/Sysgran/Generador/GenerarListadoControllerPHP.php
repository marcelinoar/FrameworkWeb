<?

function GenerarListadoControllerPHP ($m) {
	$ret = "<?\n";
	$ret .= '/**************************************************************************************************' . "\n";
  	$ret .= ' * Archivo: ListadoController.php' . "\n";
  	$ret .= ' * ------------------------------------------------------------------------------------------------' . "\n";
 	$ret .= ' * Version: 1.0' . "\n";
  	$ret .= ' * Descripcion:' . "\n";
 	$ret .= ' * Modificaciones:' . "\n";
  	$ret .= ' *	-' . "\n";
 	$ret .= ' *' . "\n";
  	$ret .= ' * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.' . "\n";
 	$ret .= ' **************************************************************************************************/' . "\n\n";
	$ret .= "require_once ('template.php');
require_once ('Sysgran/Core/Red/Encoder.php');
require_once ('Sysgran/Core/Listados/ListadoController.php');
require_once ('Sysgran/Core/Listados/ParametroFiltro.php');
require_once ('Sysgran/Core/Listados/ParametroBusqueda.php');
require_once ('Sysgran/Aplicacion/Modulos/" . $m->Modulo->Nombre . "/Store/Store" . $m->NombreEntidad . ".php');";

$ret .= "\n\n" . '$controller = new ListadoController ();
$controller->SetListadoDefault (new Store' . $m->NombreEntidad .' (true));
$controller->Ejecutar ();
?>';

	return $ret;
}
