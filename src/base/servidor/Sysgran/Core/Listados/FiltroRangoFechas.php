<?
/***************************************************************************************************
 * Archivo: FiltroRangoFechas.php																		
 * ------------------------------------------------------------------------------------------------ 
 * Autor: Marcelino Morales																			
 * Version: 1.0																						
 * Descripcion: Maneja un filtro que permite filtrar por un rango de fechas
 *																									
 ***************************************************************************************************/

require_once ('Filtro.php');

class FiltroRangoFechas extends Filtro {
	private $NombreCampoDesde;		// Nombre del parametro que contiene el valor que indica el valor Desde
	private $NombreCampoHasta;		// Nombre del parametro que contiene el valor que indica el valor Hasta
	
	private $Desde;					// Valor para 'desde' Ambos son float
	private $Hasta;					// Valor para 'hasta'
	
	public function FiltroRangoFechas ($nombre, $nom_desde, $nom_hasta) {
		parent::__construct ($nombre); 
		
		$this->NombreCampoDesde		= $nom_desde;	// fatrib_desde
		$this->NombreCampoHasta		= $nom_hasta;	// fatrib_hasta
		
		$this->Desde		= null;
		$this->Hasta		= null;
	}

	//
	// Se puede pasar null a $desde y $hasta
	//
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
		if ($this->Desde != null && $this->Hasta != null) {
			return " BETWEEN TO_DATE ('$this->Desde', 'DD/MM/YYYY') AND TO_DATE ('$this->Hasta', 'DD/MM/YYYY') ";
			
		} else if ($this->Desde != null) {
			return " >= TO_DATE ('$this->Desde', 'DD/MM/YYYY') ";
			
		} else if ($this->Hasta != null) {
			return " <= TO_DATE ('$this->Hasta', 'DD/MM/YYYY') ";
		}
	}
	
	public function EvaluarParametros ($GET) {
		// Los carga por separado por que puede venir uno solo o los dos.
		if (isset ($GET[$this->NombreCampoDesde])) {
			$this->Desde = $GET[$this->NombreCampoDesde];
			$this->Activo = true;
		}
		
		if (isset ($GET[$this->NombreCampoHasta])) {
			$this->Activo = true;	
			$this->Hasta = $GET[$this->NombreCampoHasta];
		}
		
		return $this->Activo;
	}
}
?>