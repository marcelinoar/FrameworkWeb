<?
/**************************************************************************************************
 * Archivo: RelojWS.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Web Service que proporciona informacion sobre la hora del sistema en el servidor.
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ('template.php');
require_once ('Sysgran/Core/Red/JSonRouterBase.php');
require_once ('Sysgran/Core/Red/Encoder.php');

class ListadoWS extends JSonRouterBase {
	public function GetIdMonedas () {
		$ret['colon']	= 1;
		$ret['dolar']	= 2;
		$ret['euro'] 	= 3;
		
		return Encoder::Encode ($ret);
	}
}

$ws = new ListadoWS ();
$ws->Ejecutar ();
?>
