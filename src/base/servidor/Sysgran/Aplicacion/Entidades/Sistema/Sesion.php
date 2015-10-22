<?
/**************************************************************************************************
 * Archivo: Sesion.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Esta clase contiene toda la información que necesita ser guardada en la sesion del 
 * 				usuario.
 * Modificaciones:
 *
 **************************************************************************************************/
 
require_once ("Usuario.php");
require_once ("Acceso.php");
require_once ("Empresa.php");
 
class Sesion {
	private $Usuario;
	private $Empresa;
	private $Acceso;

	//
	// Crea una nueva sesion de usuario deslogueada.
	//
	public function Sesion () {
		$this->Usuario = null;
		$this->Empresa = null;
		$this->Acceso = new Acceso ();
	}
	
	//
	// Devuelve true o false indicando si el login es correcto.
	//
	public function Login ($loginname, $password) {
		
		return true;
	}
	
	//
	// Devuelve true o false indicando si esta logueado o no.
	//
	public function EstaLogeado () {
		return $this->Usuario != null;
	}
}
?>