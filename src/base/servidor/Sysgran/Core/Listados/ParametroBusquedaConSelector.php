<?
/***************************************************************************************************
 * 																									
 * Archivo: ParametroBusquedaConSelector.php																		
 * ------------------------------------------------------------------------------------------------ 
 *																									
 * Autor: Marcelino Morales																			
 * 																									
 * Version: 1.0																						
 * 																									
 * Descripcion:
 *																									
 ***************************************************************************************************/
 
require_once ("Sysgran/Core/Red/Validacion.php");
require_once ("Parametro.php");

class ParametroBusquedaConSelector extends Parametro {
	private $NombreSelector;		// Nombre del parametro enviado por extjs que indica si la busqueda se hace al inicio, final, contiene, etc.
	private $ValorSelector;			// Valor del parametro selector.
	
	function ParametroBusquedaConSelector ($nombre_selector, $nombre, $campo) {
		parent::__construct($nombre, $campo); 
		
		$this->Tipo = ParamBusquedaConSelector;
		$this->NombreSelector = $nombre_selector;
	}
	
	//
	// Sobreescribimos esta funcion para escuchar por los dos parametros asociados al componente.
	//
	function PerteneceParametro ($nombre) {
		return ($this->Nombre == $nombre) || ($this->NombreSelector == $nombre);
	}

	//
	// Sobreescribimos este metodo para asignar el valor recibido al parametro correspondiente.
	//
	function SetValor ($nombre, $valor) {
		if ($nombre == $this->Nombre) {
			$this->Valor = $valor;
		
		} else if ($nombre == $this->NombreSelector) {
			$this->ValorSelector = $valor;
		}
		
		$this->Activo = true;
	}

	function GetTextoQuery () {
		if (Validacion::ValidarString ($this->Valor)) {		
			if ($this->ValorSelector == 'emp') {			// Empieza
				return 'UPPER (' . $this->Campo . ") LIKE ('" . strtoupper ($this->Valor) . "%')";

			} else if ($this->ValorSelector == 'ter') {		// Termina
				return 'UPPER (' . $this->Campo . ") LIKE ('%" . strtoupper ($this->Valor) . "')";

			} else if ($this->ValorSelector == 'igu') {		// Igual
				return 'UPPER (' . $this->Campo . ") = '" . strtoupper ($this->Valor) . "'";

			} else {										// Contiene
				return 'UPPER (' . $this->Campo . ") LIKE ('%" . strtoupper ($this->Valor) . "%')";
			}
		
		} else {
			return ' TRUE ';
		}
	}
}
?>