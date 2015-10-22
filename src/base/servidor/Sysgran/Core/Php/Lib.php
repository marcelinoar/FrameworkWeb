<?
/**************************************************************************************************
 * Archivo: Lib.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Libreria de funciones estaticas genericas.
 * Modificaciones:
 *	-
 *
 **************************************************************************************************/

class Lib {
	// Recibe un numero con el formato 99,0000 (la coma es el separador decimal) y 
	// lo transforma en un numero de punto flotante con el que se puede operar.
	public static function DevolverNumero ($num) {
		return floatval (str_replace (',', '.', $num));
	}
}
?>