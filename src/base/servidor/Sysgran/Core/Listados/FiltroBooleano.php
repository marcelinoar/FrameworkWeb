<?
/***************************************************************************************************
 * Archivo: FiltroBooleano.php																		
 * ------------------------------------------------------------------------------------------------ 
 * Autor: Marcelino Morales																			
 * Version: 1.0																						
 * Descripcion: Maneja un filtro de valores booleanos. Se usa para los campos con checkbox
 *																									
 ***************************************************************************************************/

require_once ('Filtro.php');

class FiltroBooleano extends Filtro {
	private $NombreCampoValor;
	private $Valor;
	
	public function FiltroBooleano ($nombre, $nom_valor) {
		parent::__construct ($nombre); 
		
		$this->NombreCampoValor	= $nom_valor;
		$this->Valor			= 0;
	}
	
	public function SetValor ($val) {
		$this->Valor = $val;
		$this->Activo = true;
	}
	
	public function GetValor () {
		return DB::ToBoolean ($this->Valor);
	}
	
	public function EvaluarParametros ($GET) {
		if (isset ($GET[$this->NombreCampoValor])) {
			$this->Activo = true;
			
			$this->Valor = $GET[$this->NombreCampoValor];
		}
		
		return $this->Activo;
	}
}

?>