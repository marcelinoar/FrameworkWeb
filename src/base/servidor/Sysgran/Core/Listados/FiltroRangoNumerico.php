<?
/***************************************************************************************************
 * Archivo: FiltroRangoNumerico.php																		
 * ------------------------------------------------------------------------------------------------ 
 * Autor: Marcelino Morales																			
 * Version: 1.0																						
 * Descripcion: Maneja un filtro que permite filtrar por un rango de valores numericos de punto flotante
 *																									
 ***************************************************************************************************/

require_once ('Filtro.php');

class FiltroRangoNumerico extends Filtro {
	private $NombreCampoDesde;		// Nombre del parametro que contiene el valor que indica el valor Desde
	private $NombreCampoHasta;		// Nombre del parametro que contiene el valor que indica el valor Hasta
	
	private $Desde;					// Valor para 'desde' Ambos son float
	private $Hasta;					// Valor para 'hasta'
	
	public function FiltroRangoNumerico ($nombre, $nom_desde, $nom_hasta) {
		parent::__construct ($nombre); 
		
		$this->NombreCampoDesde		= $nom_desde;	// fatrib_desde
		$this->NombreCampoHasta		= $nom_hasta;	// fatrib_hasta
		
		$this->Desde		= 0;
		$this->Hasta		= 0;
	}
	
	public function SetValor ($atrib, $desde, $hasta) {
		$this->Desde = $desde;
		$this->Hasta = $hasta;
		$this->Activo = true;
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
		if (isset ($GET[$this->NombreCampoDesde]) && isset ($GET[$this->NombreCampoHasta])) {
			$this->Activo = true;
			
			$this->Desde 		= $GET[$this->NombreCampoDesde];
			$this->Hasta		= $GET[$this->NombreCampoHasta];
		}
		
		return $this->Activo;
	}
}
?>