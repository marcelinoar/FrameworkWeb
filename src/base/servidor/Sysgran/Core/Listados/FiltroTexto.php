<?
/***************************************************************************************************
 * Archivo: FiltroTexto.php																		
 * ------------------------------------------------------------------------------------------------ 
 * Autor: Marcelino Morales																			
 * Version: 1.0																						
 * Descripcion: Maneja un filtro para un campo de texto que recibe tambien la indicacion de si el texto
 *				debe estar al comienzo, final, etc del campo buscado.
 *																									
 ***************************************************************************************************/

require_once ('Filtro.php');

class FiltroTexto extends Filtro {
	private $NombreCampoTipo;
	private	$NOmbreCampoValor;
	private $Tipo;
	private $Valor;
	
	public function FiltroTexto ($nombre, $nom_tipo, $nom_valor) {
		parent::__construct ($nombre); 
		
		$this->NombreCampoTipo 	= $nom_tipo;
		$this->NombreCampoValor = $nom_valor;
		$this->Activo			= false;
	}
	
	public function SetValor ($tipo, $valor) {
		$this->Tipo = $tipo;
		$this->Valor = $valor;
		$this->Activo = true;
	} 
	
	public function GetTipo () {
		return $this->Tipo;
	}
	
	public function GetValor () {
		return $this->Valor;
	}

	public function GetValorQuery () {
		if ($this->Tipo == 'emp') {			// Empieza
			return "LIKE ('" . strtoupper ($this->Valor) . "%')";
			
		} else if ($this->Tipo == 'ter') {	// Termina
			return "LIKE ('%" . strtoupper ($this->Valor) . "')";
		
		} else if ($this->Tipo == 'igu') {	// Igual
			return "= '" . strtoupper ($this->Valor) . "'";
			
		} else {							// Contiene
			return "LIKE ('%" . strtoupper ($this->Valor) . "%')";
		}
	}

	public function EvaluarParametros ($GET) {
		if (isset ($GET[$this->NombreCampoTipo]) && isset ($GET[$this->NombreCampoValor])) {
			$this->Activo = true;
			
			$this->Tipo		= $GET[$this->NombreCampoTipo];
			$this->Valor	= $GET[$this->NombreCampoValor];
		}
		
		return $this->Activo;
	}
}
?>