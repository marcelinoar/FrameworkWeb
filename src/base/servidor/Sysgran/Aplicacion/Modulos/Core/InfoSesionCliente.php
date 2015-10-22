<?
/**************************************************************************************************
 * Archivo: PerfilDeAcceso.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 **************************************************************************************************/

require_once ('template.php');
require_once ('Sysgran/Core/Red/JSonRouterBase.php');
require_once ('Sysgran/Core/Red/Encoder.php');
require_once ("Sysgran/Aplicacion/Entidades/Sistema/Usuario.php");

//
// Esta clase es la que hace de interfaz y define el formato de la informacion que se
// envia al cliente sobre el perfil de usuario y permisos.
//

class InfoSesionCliente {
	public $fecha;						// Fecha para ser mostrada en la barra principal.
	public $loginName;					// LoginName del usuario.
	public $empresa;					// Nombre de la emrpesa.
	public $permisos = array ();		// Array con los permisos de cada modulo.
	public $id;
	
	//
	// Armamos el objeto con la informacion que tomamos de la sesion.
	//
	public function InfoSesionCliente () {
		$sesion = Sesion::GetSesion ();
		$usuario = new Usuario ($sesion->usuarioId);
		$usuario->Leer ();

		$this->id			= 1;
		$this->fecha 		= date("d/m/Y");
		$this->loginName	= $usuario->loginName;
		$this->empresa		= 'Plasticos del Comahue';
		
		foreach ($sesion->permisos as $item) {
			$this->permisos[] = $item->Clonar ();
		}
	}
}

class FormularioController extends JSonRouterBase {
	public function Leer () {
		return Encoder::Encode (new InfoSesionCliente ());
	}
}

$ws = new FormularioController ();
$ws->Ejecutar ();
?>
