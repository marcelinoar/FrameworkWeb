<?
/**************************************************************************************************
 * Archivo: Validador.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Contiene funciones estaticas utilizadas para validar campos.
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

/**
 *
 * Esta clase solo contiene metodos estaticos utilizados para validar campos de datos.
 * En caso de error todas generan una exepcion, en otro caso devuelven el valor recibido.
 */

class Validador {
	/**
	 *
	 * Valida que el texto pasado por parametro no contenga mas de 254 caracteres
	 * ni caracteres especiales.
	 *
	 * @param	$texto: Texto a comprobar
	 *
	 * @return	Devuelve el texto si es correcto o genera una exepcion de lo contrario.
	 */

	public static function TextoCorto ($texto) {
		if (!Validador::ChequearCaracteresEspeciales ($texto)) {
			throw new Exception ('Campo de texto invalido');
		}
		
		if (strlen ($texto) > 254) {
			throw new Exception ('Campo de texto invalido');
		}
		
		return $texto;
	}
	
	/**
	 *
	 * Valida que el texto pasado por parametro no contenga mas de 400 caracteres
	 * ni caracteres especiales.
	 *
	 * @param	$texto: Texto a comprobar
	 *
	 * @return	Devuelve el texto si es correcto o genera una exepcion de lo contrario.
	 */

	public static function TextoDescripcion ($texto) {
		if (!Validador::ChequearCaracteresEspeciales ($texto)) {
			throw new Exception ('Campo de texto invalido');
		}
		
		if (strlen ($texto) > 400) {
			throw new Exception ('Campo de texto invalido');
		}
		
		return $texto;
	}
	
	/**
	 *
	 * Valida que el parametro recibido corresponda a un numero entero de hasta 10 cifras
	 *
	 * @param	$num	: Numero a chequear
	 * @param	$es_null: Indica si el campo puede ser null
	 *
	 * @return	Devuelve el numero recibido si es correcto o genera una exepcion de lo contrario.
	 */
	
	public static function NumeroEntero ($num, $es_null = false) {
		if ($es_null && $num == null) {
			return null;
		
		} else {
			if (!Validador::CheckRegExp ('^[0-9]{1,10}$', $num)) {
				throw new Exception ('Campo numerico invalido');
			}
		}
		
		return $num;
	}
	
	public static function NumeroPuntoFlotante ($num) {
		return $num;
	}
	
	public static function Email ($email) {
		return $email;
	}
	
	/**
	 *
	 * Valida que el campo recibido contenga solo caracteres validos y no tenga 
	 * espacios.
	 *
	 * @param	$codigo: texto a validar
	 *
	 * @return	Devuelve el texto recibido si es correcto o genera una exepcion de lo contrario.
	 */
	
	public static function CodigoAlfanumerico ($codigo) {
		$codigo = Validador::TextoCorto ($codigo);
		
		if (($ret = strpos ($codigo, ' ')) !== false) {
			throw new Exception ('Campo codigo invalido');
		}
		
		return $codigo;
	}
	
	/**
	 *
	 * Valida que el parametro recibido contenga solo letras mayusculas y minusculas y no tenga
	 * mas de 50 caracteres.
	 *
	 * @param	$login_name: es el texto a chequear
	 *
	 * @return	Devuelve el texto recibido si es correcto o genera una exepcion de lo contrario.
	 */
	
	public static function LoginName ($login_name) {
		if (!Validador::ChequearCaracteresEspeciales ($login_name)) {
			throw new Exception ('Nombre de Usuario Invalido');
		}
		
		if (strlen ($login_name) > 50) {
			throw new Exception ('Nombre de Usuario Invalido');
		}
		
		return $login_name;
	}
	
	public static function Password ($password) {
		return $password;
	}
	
	// ---------------- Metodos Privados ----------------
	
	/**
	 *
	 * Chequea que el string pasado como parametro no contenga caracteres especiales.
	 *
	 * @param	$txt: String a chequear
	 *
	 * @return	Devuelve true en caso de que el string sea correcto.
	 */
	
	private static function ChequearCaracteresEspeciales ($txt) {
		return !Validador::CheckRegExp ("\'|\"", $txt);
	}

	/**
	 *
	 * Chequea si un string concuerda con una Regular Expresion
	 *
	 * @param	$exp		: Regular Expresion
	 * @param	$variable	: Variable a chequear
	 *
	 * @return	devuelve true si concuerda y false de lo contrario
	 */
	
	private static function CheckRegExp ($exp, $variable) {
		return preg_match ('#' . $exp . '#', $variable);
	}
}

?>
