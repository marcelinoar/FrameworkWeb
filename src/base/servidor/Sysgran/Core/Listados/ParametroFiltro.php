<?
/***************************************************************************************************
 * 																									
 * Archivo: Parametrofiltro.php																		
 * ------------------------------------------------------------------------------------------------ 
 *																									
 * Autor: Marcelino Morales																			
 * 																									
 * Version: 1.0																						
 * 																									
 * Descripcion:
 *																									
 ***************************************************************************************************/
 
require_once ("Parametro.php");

class ParametroFiltro extends Parametro {
	function ParametroFiltro ($nombre, $campo) {
		parent::__construct($nombre, $campo); 
		
		$this->Tipo = ParamFiltro;
	}
	
	function GetTextoQuery () {
		if (is_numeric ($this->Valor)) {
			$ret = $this->Campo . ' = ' . $this->Valor;
		
		} else {
			$ret = $this->Campo . " = '" . $this->Valor . "'";
		}
		
		return $ret;
	}
}

?>