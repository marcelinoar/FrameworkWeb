<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: StoreReloj.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Devuelve la fecha y hora actual del sistema. La toma de la DB.
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ('template.php');
require_once ('Sysgran/Core/Red/Encoder.php');
require_once ('Sysgran/Core/Listados/ParametroFiltro.php');
require_once ('Sysgran/Core/Listados/ParametroBusqueda.php');
require_once ('Sysgran/Core/Php/StoreBase.php');

class StoreReloj extends StoreBase {
	function StoreReloj () {
		parent::__construct (); 

		$this->Query = "SELECT TO_CHAR (CURRENT_TIMESTAMP, 'DD-MM-YYYY HH24:MI:SS') AS fecha FROM dual";
	}
	
	function CargarItem ($rs) {
		$fecha = $rs->Fields ("fecha");
		
		$ret['fecha'] 		= substr ($fecha, 0, 10);
		$ret['hora'] 		= substr ($fecha, 11, 20);
		$ret['fechaYHora'] 	= $fecha;

		return $ret;
	}
}
?>
