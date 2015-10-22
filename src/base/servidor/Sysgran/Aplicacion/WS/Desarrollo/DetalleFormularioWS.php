<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: DetalleFormularioWS.php
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
require_once ('Sysgran/Aplicacion/Entidades/Desarrollo/DetalleFormulario.php');

class DetalleFormularioWS extends JSonRouterBase {
	public function Crear ($tipoDetalleFormularioId, $nombreEntidad, $prefijoXtype, $rutaEntidad, $claseEntidad, $nombreCampoFormulario, $descripcion, $camposFormulario, $camposListado, $etiqueta) {
		$e = new DetalleFormulario ();
		$e->tipoDetalleFormularioId = $tipoDetalleFormularioId;
		$e->nombreEntidad = $nombreEntidad;
		$e->prefijoXtype = $prefijoXtype;
		$e->rutaEntidad = $rutaEntidad;
		$e->claseEntidad = $claseEntidad;
		$e->nombreCampoFormulario = $nombreCampoFormulario;
		$e->etiqueta= $etiqueta;
		$e->descripcion = $descripcion;
		$e->camposFormulario = $camposFormulario;
		$e->camposListado = $camposListado;
		
		if ($e->Crear ()) {
			return Encoder::EncodeResponseOk ();
			
		} else {
			return Encoder::EncodeResponseError ($ex);
		}
	}
	
	public function Leer ($id) {
		$e = new DetalleFormulario ($id);
		
		try {
			$e->Leer ();
			return Encoder::Encode ($e);
			
		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ($ex);				
		}
	}
	
	public function Actualizar ($params) {
		global $conn;
		
		if (isset ($params["id"])) {
			$id = $params["id"];
			
			try {
				$e = new DetalleFormulario ($id);
				
				$rs = $conn->Retrieve ("SELECT iFormularioMaestroId FROM DetalleFormulario WHERE iDetalleFormularioId = $id");
				$id_maestro = $rs->Fields ("iFormularioMaestroId");
				$rs->Close ();
				
				$e->Borrar ();
				$e->tipoDetalleFormularioId = $params['tipoDetalleFormularioId'];
				$e->nombreEntidad = $params['nombreEntidad'];
				$e->prefijoXtype = $params['prefijoXtype'];
				$e->rutaEntidad = $params['rutaEntidad'];
				$e->claseEntidad = $params['claseEntidad'];
				$e->nombreCampoFormulario = $params['nombreCampoFormulario'];
				$e->etiqueta= $params['etiqueta'];
				$e->descripcion = $params['descripcion'];
				$e->camposFormulario = $params['camposFormulario'];
				$e->camposListado = $params['camposListado'];
				$e->Crear ();
				
				if (is_numeric ($id_maestro)) {
					$conn->Execute ("UPDATE DetalleFormulario SET iFormularioMaestroId = $id_maestro WHERE iDetalleFormularioId = $e->id");
				}
				
				return Encoder::EncodeResponseOk ();

			} catch (Exception $ex) {
				return Encoder::EncodeResponseError ($ex);
			}
			
		} else {
			return Encoder::EncodeResponseError (ERR_JSR_PARAMETROS_DINAMICOS_INVALIDOS);
		}
		
		
		if (isset ($params["id"])) {
			$id = $params["id"];
			
			$e = new DetalleFormulario ($id);
			unset ($params["id"]);
			
			try {
				$e->Actualizar ($params);
				return Encoder::EncodeResponseOk ();

			} catch (Exception $ex) {
				return Encoder::EncodeResponseError ($ex);
			}
			
		} else {
			return Encoder::EncodeResponseError (ERR_JSR_PARAMETROS_DINAMICOS_INVALIDOS);
		}
	}
	
	public function Borrar ($id) {
		$e = new DetalleFormulario ($id);
		
		try {
			$e->Borrar ();
			return Encoder::EncodeResponseOk ();
			
		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ($ex);
		}
	}
}

$ws = new DetalleFormularioWS ();
$ws->Ejecutar ();
?>
