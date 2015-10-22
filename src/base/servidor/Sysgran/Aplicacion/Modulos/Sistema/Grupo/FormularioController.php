<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: FormularioController.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ('template.php');
require_once ('Sysgran/Core/Red/JSonRouterBase.php');
require_once ('Sysgran/Core/Red/Encoder.php');
require_once ('Sysgran/Aplicacion/Entidades/Sistema/Grupo.php');
require_once ('class/MenuGrupoArbol.php');
require_once ('Sysgran/Aplicacion/Modulos/Sistema/Store/StoreGrillaPermisosEstandarGrupo.php');
require_once ('Sysgran/Aplicacion/Modulos/Sistema/Store/StoreGrillaPermisosCustomGrupo.php');

class FormularioController extends JSonRouterBase {
	public function Crear ($nombre, $descripcion, $empresas, $menuItems, $permisosCustom, $permisosEstandar, $usuarios) {
		global $conn;
				
		$e = new Grupo ();
		$e->nombre = $nombre;
		$e->descripcion = $descripcion;
		
		$e->SetMenuItems ($menuItems);
		$e->SetEmpresas ($empresas);
		$e->SetUsuarios ($usuarios);
		$e->SetPermisosEstandar ($permisosEstandar);
		$e->SetPermisosCustom ($permisosCustom);
		
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
		$e = new Grupo ($id);
		
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
			
			$e = new Grupo ($id);
			$ret_val = $e->Leer ();
			$e->SetMenuItems ($params['menuItems']);
			$e->SetPermisosEstandar ($params['permisosEstandar']);
			$e->SetPermisosCustom ($params['permisosCustom']);
					
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
					
		$e = new Grupo ($id);
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
	
	public function GetInfoFormulario () {
		try {	
			$ret['listadoPermisosEstandar'] = (new StoreGrillaPermisosEstandarGrupo ())->Ejecutar ();
			$ret['listadoPermisosCustom']	= (new StoreGrillaPermisosCustomGrupo ())->Ejecutar ();

		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ($ex);
		}

		return Encoder::EncodeResponseOk ($ret);
	}
	
	//
	// Devuelve el arbol de menu del sistema con los items del grupo marcados.
	//
	public function GetMenuGrupo ($id) {
		if (is_numeric ($id)) {
			$m = new MenuGrupoArbol ($id);
		
		} else {
			$m = new MenuGrupoArbol ();
		}
	
		return Encoder::Encode ($m->GenerarMenu (), 'children');
	}
}

$ws = new FormularioController ();
$ws->Ejecutar ();
?>
