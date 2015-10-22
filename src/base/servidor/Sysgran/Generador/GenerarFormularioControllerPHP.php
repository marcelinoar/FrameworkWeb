<?
// #### OK ####
// Parametros:
// $m: FormularioMaestro
//
function GenerarFormularioControllerPHP ($m) {
	$ret = "<?\n";
	$ret .= '/**************************************************************************************************' . "\n";
  	$ret .= ' * Archivo: FormularioController.php' . "\n";
  	$ret .= ' * ------------------------------------------------------------------------------------------------' . "\n";
 	$ret .= ' * Version: 1.0' . "\n";
  	$ret .= ' * Descripcion:' . "\n";
 	$ret .= ' * Modificaciones:' . "\n";
  	$ret .= ' *	-' . "\n";
 	$ret .= ' *' . "\n";
  	$ret .= ' * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.' . "\n";
 	$ret .= ' **************************************************************************************************/' . "\n";

	$ret .= "
require_once ('template.php');
require_once ('Sysgran/Core/Red/JSonRouterBase.php');
require_once ('Sysgran/Core/Red/Encoder.php');
require_once ('Sysgran/Aplicacion/Entidades/" . $m->Modulo->Nombre . "/" . $m->NombreEntidad . ".php');

class FormularioController extends JSonRouterBase {
	public function Crear (";
	
	for ($i = 0; $i < count ($m->Campos); $i++) {
		$ret = $ret . '$' . $m->Campos[$i]->Nombre;
		
		if ($i != count ($m->Campos) - 1) {
			$ret .= ", ";
		}
	}

	$ret .= ') {
		global $conn;
				
		$e = new ' . $m->NombreEntidad . " ();\n";
		
	for ($i = 0; $i < count ($m->Campos); $i++) {
		if ($m->Campos[$i]->Tipo != TCAMPO_RELACION) {
			$ret .= "\t\t". '$e->' . $m->Campos[$i]->Nombre . ' = $' . $m->Campos[$i]->Nombre . ";\n";
		}
	}

	$ret .= '		
		// ** Agregar las llamadas a los metodos de la clase que cargan los elementos de cada array detalle.
			
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
		$e = new ' . $m->NombreEntidad . ' ($id);
		
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
			
			$e = new ' . $m->NombreEntidad . ' ($id);
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
					
		$e = new ' . $m->NombreEntidad . ' ($id);
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
$ws->Ejecutar ();' . "\n?>\n";

	return $ret;
}

?>