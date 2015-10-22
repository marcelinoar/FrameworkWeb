<?
/**************************************************************************************************
 * Archivo: PerfilDeAcceso.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 **************************************************************************************************/

require_once ('template.php');
require_once ('Sysgran/Core/Red/JSonRouterBase.php');
require_once ('Sysgran/Core/Red/Encoder.php');
require_once ("Sysgran/Aplicacion/Entidades/Sistema/Usuario.php");
require_once ("Sysgran/Aplicacion/Entidades/Core/Core.php");


class Controller extends JSonRouterBase {
	public function GetFechaActual () {
		return Encoder::EncodeResponseOk (Core::GetFechaActual ());
	}
	
	public function GetFechaYHoraActual () {
		return Encoder::EncodeResponseOk (Core::GetFechaYHoraActual ());
	}	

}

$ws = new Controller ();
$ws->Ejecutar ();
?>
