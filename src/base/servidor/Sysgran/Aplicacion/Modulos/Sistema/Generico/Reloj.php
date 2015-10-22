<?
/**************************************************************************************************
 * Archivo: Reloj.php
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

class Reloj extends JSonRouterBase {
	public function GetFechaYHoraActual () {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT TO_CHAR (CURRENT_TIMESTAMP, 'DD-MM-YYYY HH24:MI:SS') AS fecha FROM dual");
		$fecha = $rs->Fields ("fecha");
		$rs->Close ();
		
		$ret['fecha'] 		= substr ($fecha, 0, 10);
		$ret['hora'] 		= substr ($fecha, 11, 20);
		$ret['fechaYHora'] 	= $fecha;

		return Encoder::Encode ($ret);
	}
}

$ws = new Reloj ();
$ws->Ejecutar ();
?>
