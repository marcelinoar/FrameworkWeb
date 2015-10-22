<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: ModuloWS.php
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
require_once ('Sysgran/Aplicacion/Entidades/Desarrollo/Modulo.php');

class ModuloWS extends JSonRouterBase {
	public function Crear ($nombre, $rutaArchivos, $ruta) {
		$e = new Modulo ();
		$e->nombre = $nombre;
		$e->rutaArchivos = $rutaArchivos;
		$e->ruta = $ruta;
		
		try {
			$e->Crear ();
			return Encoder::EncodeResponseOk ();
			
		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ($ex);
		}
	}
	
	public function Leer ($id) {
		$e = new Modulo ($id);
		
		try {
			$e->Leer ();
			return Encoder::Encode ($e);
			
		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ($ex);				
		}
	}
	
	public function BuscarPorCodigo ($codigo) {
		$e = new Modulo ($codigo);

		try {
			$e->Leer ();
			return Encoder::Encode (Array ($e));
			
		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ($ex);				
		}
	}

	public function Actualizar ($params) {
		if (isset ($params["id"])) {
			$id = $params["id"];
			
			$e = new Modulo ($id);
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
		$e = new Modulo ($id);
		
		try {
			$e->Borrar ();
			return Encoder::EncodeResponseOk ();
			
		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ($ex);
		}
	}
}

$ws = new ModuloWS ();
$ws->Ejecutar ();
?>
