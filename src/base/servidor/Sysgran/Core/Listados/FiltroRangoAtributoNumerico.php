<?
/***************************************************************************************************
 * Archivo: FiltroRangoAtributoNumerico.php																		
 * ------------------------------------------------------------------------------------------------ 
 * Autor: Marcelino Morales																			
 * Version: 1.0																						
 * Descripcion: Maneja un filtro que permite filtrar por un rango de valores de un atributo de la 
 * 				entidad. Maneja valores de punto flotante para los atributos.
 *																									
 ***************************************************************************************************/

require_once ('Filtro.php');

class FiltroRangoAtributoNumerico extends Filtro {
	private $NombreCampoAtributo;	// Nombre del parametro que contiene el valor que indica el Id de atributo
	private $NombreCampoDesde;		// Nombre del parametro que contiene el valor que indica el valor Desde
	private $NombreCampoHasta;		// Nombre del parametro que contiene el valor que indica el valor Hasta
	
	private $AtributoId;				// Id del atributo seleccionado.
	private $Desde;					// Valor para 'desde' Ambos son float
	private $Hasta;					// Valor para 'hasta'
	
	public function FiltroRangoAtributoNumerico ($nombre, $nom_atrib, $nom_desde, $nom_hasta) {
		parent::__construct ($nombre); 
		
		$this->NombreCampoAtributo 	= $nom_atrib;	// fatrib
		$this->NombreCampoDesde		= $nom_desde;	// fatrib_desde
		$this->NombreCampoHasta		= $nom_hasta;	// fatrib_hasta
		
		$this->AtributoId	= 0;
		$this->Desde		= 0;
		$this->Hasta		= 0;
	}
	
	public function SetValor ($atrib, $desde, $hasta) {
		$this->AtributoId = $atrib;
		$this->Desde = $desde;
		$this->Hasta = $hasta;
		$this->Activo = true;
	}
	
	public function GetAtributoId () {
		return $this->AtributoId;
	}
	
	public function GetDesde () {
		return $this->Desde;
	}
	
	public function GetHasta () {
		return $this->Hasta;
	}
	
	public function GetValorQuery () {
		return " BETWEEN " . DB::ToFloat ($this->GetDesde ()) . " AND " . DB::ToFloat ($this->GetHasta ());
	}
	
	public function EvaluarParametros ($GET) {
		if (isset ($GET[$this->NombreCampoAtributo]) && isset ($GET[$this->NombreCampoDesde]) && isset ($GET[$this->NombreCampoHasta])) {
			$this->Activo = true;
			
			$this->AtributoId 	= $GET[$this->NombreCampoAtributo];
			$this->Desde 		= $GET[$this->NombreCampoDesde];
			$this->Hasta		= $GET[$this->NombreCampoHasta];
		}
		
		return $this->Activo;
	}
}
?>