<?
/***************************************************************************************************
 * Archivo: Filtro.php																		
 * ------------------------------------------------------------------------------------------------ 
 * Autor: Marcelino Morales																			
 * Version: 1.0																						
 * Descripcion: Clase base de los filtros 
 *																									
 ***************************************************************************************************/
 
class Filtro {
	public $Nombre;					// Nombre del filtro
	protected $Activo;				// Indica si se debe utilizar en el filtro para la consulta actual.
	
	public function Filtro ($nombre) {
		$this->Nombre	= $nombre;
		$this->Activo 	= false;	
	}

	public function EsActivo () {
		return $this->Activo;
	}
	
	public function EvaluarParametros ($GET) {
	}
}

?>