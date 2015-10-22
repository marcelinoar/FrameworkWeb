<?
/***************************************************************************************************
 * 																									
 * Archivo: ParametroExclusion.php																		
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

class ParametroExclusion extends Parametro {
	var $CampoValor;	
	
	// Agrega una restriccion de este tipo al query
	// 
	// Si $nombre == true entonces $campo != $valor
	//		
	// $nombre: Nombre del parametro 
	// $campo: Nombre del campo al que aplica
	// $valor: Valor de filtro
	//
	function ParametroExclusion ($nombre, $campo, $valor) {
		parent::__construct($nombre, $campo); 
		
		$this->Tipo 		= ParamExclusion;
		$this->CampoValor	= $valor;
	}
	
	function GetTextoQuery () {
		if ($this->Valor) {
			$ret = $this->Campo . ' != ' . $this->CampoValor;
		}
		
		return $ret;
	}
}

?>