<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: ListadoController.php
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
require_once ('Sysgran/Core/Listados/ListadoController.php');
require_once ('Sysgran/Aplicacion/Modulos/Produccion/Store/StoreProducto.php');

$controller = new ListadoController ();
$controller->SetListadoDefault (new StoreProducto (true));
$controller->Ejecutar ();
?>