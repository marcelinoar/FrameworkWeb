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
require_once ('Sysgran/Aplicacion/Entidades/Empresa/Empleado.php');

class FormularioController extends JSonRouterBase {
	public function Crear ($nombre, $apellido, $nroLegajo) {
		global $conn;
				
		$e = new Empleado ();
		$e->nombre = $nombre;
		$e->apellido = $apellido;
		$e->nroLegajo = $nroLegajo;
		
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
	
	public function BuscarPorCodigo ($codigo) {
		try {
			Validador::NumeroEntero ($codigo);

			$e = Empleado::GetEmpleadoPorNroLegajo ($codigo);
			if ($e == null) {
				return Encoder::EncodeResponseError ('Codigo Inexistente');				

			} else {
				return Encoder::Encode (Array ($e));			
			}			

		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ($ex);				
		}
	}	
	
	public function BuscarPorId ($codigo) {
		try {
			Validador::NumeroEntero ($codigo);

			$e = new Empleado ($codigo);
			$ret_val = $e->Leer ();
			
			if ($ret_val != null) {
				return Encoder::EncodeResponseError ('Codigo Inexistente');				

			} else {
				return Encoder::Encode (Array ($e));			
			}

		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ($ex);				
		}
	}
	
	public function Leer ($id) {
		$e = new Empleado ($id);
		
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
			
			$e = new Empleado ($id);
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
					
		$e = new Empleado ($id);
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
}

$ws = new FormularioController ();
$ws->Ejecutar ();
?>
