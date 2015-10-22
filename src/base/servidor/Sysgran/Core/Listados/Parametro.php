<?
/***************************************************************************************************
 * Archivo: Parametro.php																		
 * ------------------------------------------------------------------------------------------------ 
 * Autor: Marcelino Morales																			
 * Version: 1.0																						
 * Descripcion: Clase base para los filtros de los listados simples.
 *																									
 ***************************************************************************************************/
 
const ParamFiltro 				= 1;
const ParamBusqueda				= 2;
const ParamExclusion			= 3;
const ParamPaginado				= 4;
const ParamBusquedaConSelector	= 5;

class Parametro {
	var $Nombre;		// Nombre que identifica al parametro.
	var $Campo;			// Campo de la tabla asociado.
	var $Valor;			// Valor asignado.
	var $Tipo;			// Tipo de Parametro.
	var $Activo;		// Indica si ha sido seteado el valor.
	
	function Parametro ($nombre, $campo) {
		$this->Nombre 	= $nombre;
		$this->Campo	= $campo;
		$this->Valor	= null;
		$this->Activo	= false;
	}
	
	function GetTextoQuery () {
		throw new Exception ('Metodo virtual');
	}
	
	//
	// Setea el valor del parametro indicado. Un componente de esta clase puede escuchar mas de un parametro 
	//
	function SetValor ($nombre, $valor) {
		$this->Valor = $valor;
		$this->Activo = true;
	}
	
	// 
	// Indica si el nombre de parametro pasado esta asociado al componente. Es decir, si hay que
	// recibir el valor de ese parametro o no.
	//
	function PerteneceParametro ($nombre) {
		return $this->Nombre == $nombre;
	}
}
?>