<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: StoreWSCuentaContable.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	- Arregle el query
 *	- Agregue filtros y busqueda
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ('template.php');
require_once ('Sysgran/Core/Red/Encoder.php');
require_once ('Sysgran/Core/Listados/ListadoController.php');
require_once ('Sysgran/Core/Listados/ParametroFiltro.php');
require_once ('Sysgran/Core/Listados/ParametroBusqueda.php');
require_once ('Sysgran/Aplicacion/Modulos/Empresa/Store/StoreCuentaContable.php');

$controller = new ListadoController ();
$controller->SetListadoDefault (new StoreCuentaContable ());
$controller->Ejecutar ();
?>
