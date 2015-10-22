<?
/***************************************************************************************************
 * 																									
 * Archivo: JSonRouterBase.php																		
 * ------------------------------------------------------------------------------------------------ 
 *																									
 * Autor: Marcelino Morales																			
 * 																									
 * Version: 1.0																						
 *
 * Descripcion: Esta clase es abstracta e implementa una interfaz para realizar llamadas a clases 
 *				que la extiendan. Exporta todos los metodos publicos de la clase hija para que puedan 
 *				ser invocados mediante una peticion de tipo GET.
 *
 *				Actualizar () Es un metodo especial que tiene una lista de parametros variables. Se le pasa
 * 				todo lo que se recibe por POST como un array['nombre_campo'] = valor.
 *
 * Parametros:
 * 	f			: <Nombre del metodo> Puede venir por Get o POst
 * <parametros>	: Se pasan los parametros que recibe el metodo por medio de GET o JSon
 *																									
 ***************************************************************************************************/
 
require_once ("Encoder.php");
require_once ("Errores.php"); 
require_once ("Sysgran/Core/Php/Validador.php");

class JSonRouterBase {
	//
	// Busca entre los parametros pasados por GET el parametro 'f' que indica el nombre del metodo a ejecutar.
	// Despues arma un array de parametros juntando los pasados por GET y POST y se los pasa al metodo. 
	// Valida que el metodo reciba esos parametros. 
	//
	// IMPORTANTE: Esta funcion chequea que el usuario este logueado. Si no hay nadie logueado entonces
	// 				devuelve una pagina en blanco.
	//
	public function Ejecutar () {
		if (!Sesion::GetSesion ()->EstaLogueado ()) {
			return;
		}

		$met = $this->GetMetodoAEjecutar ();
		
		if ($met == 'Actualizar') {
			$this->_Actualizar ();
			
		} else if ($met != null) {
			// Si el metodo tiene parametros
			if ($this->TieneParametros ($met)) {
				$params = $this->ArmarArrayDeParametros ($met);

				if ($params != null) {
					$ref_method = new ReflectionMethod (get_class ($this), $met);
					print $ref_method->invokeArgs ($this, $params);
				}
			
			// Si no tiene parametros
			} else {
				$ref_method = new ReflectionMethod (get_class ($this), $met);
				print $ref_method->invoke ($this);
			}

		} else {
			$this->ImprimirInformacionWS ();
		}
	}
	
	//
	// Imprime en pantalla informacion sobre los metodos disponibles
	// en este Web Service.
	//
	private function ImprimirInformacionWS () {
		print "<h1>Estructura del WS</h1>";
		
		$ref_class = new ReflectionClass($this);
		$metodos = $ref_class->getMethods (ReflectionMethod::IS_PUBLIC);

		foreach ($metodos as $m) {
			if ($m->class != 'JSonRouterBase') {
				print "Metodo: <a href='" . "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]" . "?f=" . $m->name . "'>" . $m->name . "</a><br>";
			}
		}
	}
	
	//
	// Busca entre los parametros pasados por GET el parametro 'f' que indica el metodo a ejecutar.
	// Valida que el metodo solicitado exista.
	// Retorno:
	// 		Devuelve el nombre del metodo o null en caso de no encontrarlo o ser invalido.
	//
	private function GetMetodoAEjecutar () {
		$ret = null;
		
		$metodo = '';
		if (isset ($_GET['f'])) {
			$metodo = $_GET['f'];
		
		} else if (isset ($_POST['f'])) {
			$metodo = $_POST['f'];
			unset ($_POST['f']);
		}
		
		if ($metodo != '') {
			$f = $metodo;
			$ref_class = new ReflectionClass (get_class ($this));
			
			$ref_met = $ref_class->getMethods ();
			foreach ($ref_met as $item) {
				$metodos[] = $item->name;
			}

			if (in_array ($f, $metodos)) {
				$ret = $f;
			}
		}
		
		return $ret;
	}
	
	//
	// Actualiza las propiedades de la clase con las propiedades del objeto pasado por parametro.
	//
	private function _Actualizar () {
		$json = file_get_contents('php://input');
		$obj = json_decode($json);
		
		$ret = array ();
		foreach ($obj as $clave => $valor) {
			$ret[$clave] = $valor;
		}
	
		$this->Actualizar ($ret);
	}
	
	//
	// Recibe un string en formato Encode con la informacion de las propiedades de la entidad a actualizar. Actualiza
	// Las propiedades de la clase cuyos nombre concuerdan con los que recibe con parametro.
	//
	public function ActualizarPropiedades ($params) {
		$parametros = Encode::ParseIdArray ($params);
		$ref_class = new ReflectionClass (get_class ($this));

		$ref_prop = $ref_class->getProperties ();
		foreach ($ref_prop as $item) {
			foreach ($parametros as $p) {
				if ($item == $p->Nombre) {
					$this->$item = $p->Valor;
				}
			}
		}
	}
	
	//
	// Devuelve true si el metodo indicado recibe parametros, de lo contrario false.
	//
	private function TieneParametros ($metodo) {
		$rx_func = new ReflectionMethod (get_class ($this), $metodo);
		
		return (count ($rx_func->GetParameters ()) > 0);
	}
	
	//
	// Como por post y get no podemos pasar arrays desde js a php (por algun motivo no funciona) entonces
	// tenemos que pasarlos adentro de un string concatenado con pipes. 
	// Esta funcion toma el string recibido y devuelve un array con los elementos que contiene.
	//
	// Formato: El array-string debe empezar con un pipe de la siguiente forma:
	// |1|2|3|4|5
	//
	public static function ParsearArray ($str) {
		$ret = array ();
		
		// Salteamos el primer pipe
		$str = substr ($str, 1);
		
		$p = strpos ($str, '|');
		while ($p !== false) {
			$ret[] = substr ($str, 0, $p);
			$str = substr ($str, $p + 1);
			$p = strpos ($str, '|');
		}
		
		// Agregamos lo que sobra.
		if ($str != '') {
			$ret[] = $str;
		}
		
		return $ret;
	}
	
	//
	// Arma el array de parametros a pasarle al metodo a ejecutar.
	// Busca en las variables POST y GET. 
	// Si falta un parametro en la llamada termina la ejecucion y devuelve un mensaje json indicando el error.
	// 
	// Retorno:
	// 		El array de parametros o null en caso de error. Los parametros son pasados en el orden
	// 		en el que se reciben en la funcion.
	//
	private function ArmarArrayDeParametros ($metodo) {
		$rx_func = new ReflectionMethod (get_class ($this), $metodo);
		$parray = $rx_func->GetParameters ();

		$json = file_get_contents('php://input');
		$obj = json_decode($json);
		
		$cnt = 0;
		foreach ($parray as $item) {
			$tmp = $cnt;
			
			// Busca en GET
			if (isset ($_GET[$item->name])) {
				$params[] = $_GET[$item->name];
				$cnt++;
				
			// Busca en POST
			} else if (isset ($_POST[$item->name])) {
				$params[] = $_POST[$item->name];
				$cnt++;
			
			// Busca los parametros que vienen en las llamadas JSON (creo que son post igual)
			} else if (property_exists ($obj, $item->name)) {
				$params[] = $obj->{$item->name};
				$cnt++;
			}
			
			// Si falta un parametro genera un error.
			if ($tmp == $cnt) {
				print Encoder::EncodeResponseError ("Llamada a metodo remoto invalida. Falta parametro: '$item->name'");				
				exit ();
			}
		}
		
		$ret = null;
		if (count ($parray) == $cnt) {
			$ret = $params;
		}
		
		return $ret;
	}
}
?>
