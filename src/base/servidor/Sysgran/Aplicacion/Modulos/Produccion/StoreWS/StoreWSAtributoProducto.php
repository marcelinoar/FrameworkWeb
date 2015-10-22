<?
/**************************************************************************************************
 * Archivo: StoreWSAtributoProducto.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ('template.php');
require_once ('Sysgran/Core/Red/Encoder.php');
require_once ('Sysgran/Core/Listados/ListadoController.php');
require_once ('Sysgran/Core/Listados/ParametroFiltro.php');
require_once ('Sysgran/Core/Listados/ParametroBusqueda.php');
require_once ('Sysgran/Aplicacion/Modulos/Produccion/Store/StoreAtributoProducto.php');

$controller = new ListadoController ();
$controller->SetListadoDefault (new StoreAtributoProducto ());
$controller->Ejecutar ();
?>
