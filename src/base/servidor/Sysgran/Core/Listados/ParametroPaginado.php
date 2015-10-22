<?
/***************************************************************************************************
 * 																									
 * Archivo: ParametroPaginado.php																		
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

class ParametroPaginado extends Parametro {
	function ParametroPaginado($nombre, $campo) {
		parent::__construct($nombre, $campo); 
		
		$this->Tipo = ParamPaginado;
	}
	
	function GetTextoQuery () {
		return $this->Valor;
	}
}

?>