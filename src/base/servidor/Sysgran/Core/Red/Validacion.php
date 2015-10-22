<?
class Validacion {
	//
	// Devuelve la evaluacion de una expresion regular sobre la variable pasada como parametro.
	//
	static function CheckRegExp ($exp, $variable) {
		return preg_match ('#' . $exp . '#', $variable);
	}

	//
	// Valida que la variable pasada como parametro no contenga caracteres de escape.
	// Opcionalmente se valida la longitud del string.
	//
	static function ValidarString ($str, $longitud = -1) {
		$ret = !Validacion::CheckRegExp ("\'|\"", $str);

		if ($longitud > 0) {
			$ret = $ret && (count ($str) < $longitud);
		}

		return $ret;
	}

	//
	// Valida que la variable pasada como parametro sea numerica y tenga entre 1 y 10 digitos.
	//
	static function ValidarNumero ($num) {
		return Validacion::CheckRegExp ('^[0-9]{1,10}$', $num);
	}
}
?>