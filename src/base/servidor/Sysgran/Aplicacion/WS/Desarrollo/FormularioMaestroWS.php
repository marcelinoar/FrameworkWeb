<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: FormularioMaestroWS.php
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
require_once ('Sysgran/Aplicacion/Entidades/Desarrollo/FormularioMaestro.php');

class FormularioMaestroWS extends JSonRouterBase {
	public function Crear ($moduloId, $nombreEntidadPermisos, $tipoFormularioId, $nombreEntidad, $prefijoXtype, $nombreSecuencia, $descripcion, $camposFormulario, $camposListado, $detalles) {
		global $conn;
		
		$e = new FormularioMaestro ();
		$e->moduloId 				= $moduloId;
		$e->tipoFormularioId 		= $tipoFormularioId;
		$e->nombreEntidad 			= $nombreEntidad;
		$e->prefijoXtype 			= $prefijoXtype;
		$e->nombreSecuencia 		= $nombreSecuencia;
		$e->descripcion 			= $descripcion;
		$e->nombreEntidadPermisos	= $nombreEntidadPermisos;
		
		$e->SetCamposFormulario ($camposFormulario);
		$e->SetCamposListado ($camposListado);
		$e->SetDetalles ($detalles);
		
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
		$e = new FormularioMaestro ($id);
		
		try {
			$e->Leer ();
			return Encoder::Encode ($e);
			
		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ($ex);				
		}
	}
	
	public function Actualizar ($params) {
		if (isset ($params["id"])) {
			$id = $params["id"];
			
			try {
				$e = new FormularioMaestro ($id);
				$e->Borrar ();
				
				//unset ($params["id"]);
				$e->moduloId 			= $params['moduloId'];
				$e->tipoFormularioId 	= $params['tipoFormularioId'];
				$e->nombreEntidad 		= $params['nombreEntidad'];
				$e->nombreEntidadPermisos = $params['nombreEntidadPermisos'];
				$e->prefijoXtype 		= $params['prefijoXtype'];
				$e->nombreSecuencia 	= $params['nombreSecuencia'];
				$e->descripcion 		= $params['descripcion'];

				$e->SetCamposFormulario ($params['camposFormulario']);
				$e->SetCamposListado ($params['camposListado']);
				$e->SetDetalles ($params['detalles']);
				$e->Crear ();
				
				return Encoder::EncodeResponseOk ();

			} catch (Exception $ex) {
				return Encoder::EncodeResponseError ($ex);
			}
			
		} else {
			return Encoder::EncodeResponseError (ERR_JSR_PARAMETROS_DINAMICOS_INVALIDOS);
		}
	}
	
	public function Borrar ($id) {
		global $conn;
		
		$e = new FormularioMaestro ($id);
		
		try {
			$conn->BeginTransaction ();	
			$e->Borrar ();
			$conn->Commit ();
			
			return Encoder::EncodeResponseOk ();
			
		} catch (Exception $ex) {
			$conn->Rollback ();
			return Encoder::EncodeResponseError ($ex);
		}
	}
}

$ws = new FormularioMaestroWS ();
$ws->Ejecutar ();
?>
