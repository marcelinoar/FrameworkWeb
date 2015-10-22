<?
/**************************************************************************************************
 * Archivo: Acceso.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Se encarga de resolver el login de usuario al sistema.
 * Modificaciones:
 *	-
 *
 **************************************************************************************************/
 
class Acceso {
	public static function Login ($usuario, $password) {
		return true;
		
		if ($usuario == '') {
			return true;
		
		} else {
			return false;
		}
	}
}
?>