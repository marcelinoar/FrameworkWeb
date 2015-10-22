<?
/**************************************************************************************************
 * Archivo: template.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Este archivo se incluye en todas los programas PHP. Incluye las clases necesarias y
 * 				realiza la conexion con la DB y levanta la Sesion de usuario.
 * Modificaciones:
 *	-
 *
 **************************************************************************************************/
 
require_once ("params.php");
require_once ("Sysgran/Core/Php/Lib.php");
require_once ("Sysgran/Core/Php/RetValue.php");
require_once ("Sysgran/Core/Db/Postgresql/PgsqlConnection.php");
require_once ("Sysgran/Core/Php/Sesion.php");

date_default_timezone_set("America/Argentina/Buenos_Aires");

$conn = new PgsqlConnection ($config['db_host'], $config['db_port'], $config['db_name'], $config['db_user'], $config['db_password']);
$conn->Connect ();

?>