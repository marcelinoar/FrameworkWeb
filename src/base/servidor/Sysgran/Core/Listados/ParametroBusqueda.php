<?
/***************************************************************************************************
 * 																									
 * Archivo: ParametroBusqueda.php																		
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

class ParametroBusqueda extends Parametro {
	//var $Tipo;
	
	function ParametroBusqueda ($nombre, $campo) {
		parent::__construct($nombre, $campo); 
		
		$this->Tipo = ParamBusqueda;
	}

	function GetTextoQuery () {
		if (Validacion::ValidarString ($this->Valor)) {		
			return 'UPPER (' . $this->Campo . ") LIKE ('%" . strtoupper ($this->Valor) . "%') ";
		
		} else {
			return ' TRUE ';
		}
	}
}
?>