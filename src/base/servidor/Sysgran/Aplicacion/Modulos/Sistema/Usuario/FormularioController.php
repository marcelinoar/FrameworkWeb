<?
/**************************************************************************************************
 * Archivo: FormularioController.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	- Se agregaron las validaciones
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ('template.php');
require_once ("Sysgran/Core/Php/Validador.php");
require_once ('Sysgran/Core/Red/JSonRouterBase.php');
require_once ('Sysgran/Core/Red/Encoder.php');
require_once ('Sysgran/Aplicacion/Entidades/Sistema/Usuario.php');
require_once ('class/MenuUsuarioArbol.php');
require_once ('class/PermisosUsuarioArbol.php');

class FormularioController extends JSonRouterBase {
	public function Crear ($loginName, $password, $grupos, $email, $empleadoId = null, $comentario) {
		global $conn;
		
		$e = new Usuario ();
		try {
			$e->loginName 		= Validador::LoginName ($loginName);
			$e->password 		= Validador::Password ($password);
			$e->email 			= Validador::Email ($email);
			$e->empleadoId 		= Validador::NumeroEntero ($empleadoId, true);
			$e->comentario 		= Validador::TextoDescripcion ($comentario);
			$e->grupos 			= $grupos;
		
		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ($ex->GetMessage ());
		}
		
		$ret_val = Usuario::ChequearLoginName ($e->loginName);
		if ($ret_val != null) {
			return Encoder::EncodeResponseError ($ret_val);
		}
		
		$conn->BeginTransaction ();
		$ret_val = $e->Crear ();
		
		if ($ret_val == null) {
			$conn->Commit ();
			return Encoder::EncodeResponseOk ();
			
		} else {
			$conn->Rollback ();
			return Encoder::EncodeResponseError ($ret_val->GetMessage ());
		}
	}
	
	public function Leer ($id) {
		try {
			$id = Validador::NumeroEntero ($id);
		
		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ($ex->GetMessage ());
		}
	
		$e = new Usuario ($id);
		
		$ret_val = $e->Leer ();
		
		if ($ret_val == null) {
			return Encoder::Encode ($e);
			
		} else {
			return Encoder::EncodeResponseError ($ret_val->GetMessage ());				
		}
	}
	
	public function Actualizar ($params) {
		global $conn;
				
		if (isset ($params["id"])) {
			$id = $params["id"];
			
			$e = new Usuario ($id);
			$ret_val = $e->Leer ();
					
			if ($ret_val == null) {
				unset ($params["id"]);
					
				$conn->BeginTransaction ();					
				$ret_val = $e->Actualizar ($params);
				
				if ($ret_val == null) {
					$conn->Commit ();
					return Encoder::EncodeResponseOk ();
				
				} else {
					$conn->Rollback ();
					return Encoder::EncodeResponseError ($ret_val->GetMessage ());
				}
			
			} else {
				return Encoder::EncodeResponseError ($ret_val->GetMessage ());
			}
			
		} else {
			return Encoder::EncodeResponseError (ERR_JSR_PARAMETROS_DINAMICOS_INVALIDOS);
		}
	}
	
	public function Borrar ($id) {
		global $conn;

		try {
			$id = Validador::NumeroEntero ($id);
		
		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ($ex->GetMessage ());
		}
					
		$e = new Usuario ($id);
		$ret_val = $e->Leer ();
		
		if ($ret_val == null) {
			$conn->BeginTransaction ();
			$ret_val = $e->Borrar ();
			
			if ($ret_val == null) {
				$conn->Commit ();
				return Encoder::EncodeResponseOk ();
			
			} else {
				$conn->Rollback ();
				return Encoder::EncodeResponseError ($ret_val->GetMessage ()); 
			}
			
		} else {
			$conn->Rollback ();
			return Encoder::EncodeResponseError ($ret_val->GetMessage ());
		}
	}
	
	//
	// Busca un usuario por codigo y lo devuelve.
	//
	public function BuscarPorCodigo ($codigo) {
		try {
			$codigo = Validador::NumeroEntero ($codigo);
		
			return $this->BuscarPorId ($codigo);
			
		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ($ex);
		}
	}	
	
	//
	// Busca un usuario por id y lo devuelve.
	//
	public function BuscarPorId ($codigo) {
		$ret = new Usuario ($codigo);
		$ret_val = $ret->Leer ();
		
		if ($ret_val != null) {
			return Encoder::EncodeResponseError ('Codigo Inexistente');				
			
		} else {
			return Encoder::Encode (Array ($ret));	
		}
	}	
	
	//
	// Devuelve el arbol de menu del usuario
	//
	public function GetMenuUsuario ($id) {
		if (is_numeric ($id)) {
			try {
				$id = Validador::NumeroEntero ($id);

			} catch (Exception $ex) {
				return Encoder::EncodeResponseError ($ex->GetMessage ());
			}
		
			$m = new MenuUsuarioArbol ($id);
		
		} else {
			$m = new MenuUsuarioArbol ();
		}
	
		return Encoder::Encode ($m->GenerarMenu (), 'children');
	}

	//
	// Devuelve el arbol de permisos del usuario
	//
	public function GetPermisosUsuario ($id) {
		if (is_numeric ($id)) {
			try {
				$id = Validador::NumeroEntero ($id);

			} catch (Exception $ex) {
				return Encoder::EncodeResponseError ($ex->GetMessage ());
			}
		
			$m = new PermisosUsuarioArbol ($id);
		
		} else {
			$m = new PermisosUsuarioArbol ();
		}
	
		return Encoder::Encode ($m->GenerarMenu (), 'children');
	}
}

$ws = new FormularioController ();
$ws->Ejecutar ();
?>
