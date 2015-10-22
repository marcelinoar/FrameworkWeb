<?
/***************************************************************************************************
 * 																									
 * Archivo: EntidadBase.php																		
 * ------------------------------------------------------------------------------------------------ 
 *																									
 * Autor: Marcelino Morales																			
 * 																									
 * Version: 1.0																						
 *
 * Descripcion: Maneja la capa de abstraccion que se relaciona con la DB.
 *																									
 ***************************************************************************************************/
require_once ("Sysgran/Core/Red/Encoder.php");

const ENTIDAD_INEXISTENTE = 1000;

class EntidadBase {
	protected $MapaCampos;	// Array que mapea las propiedades del objeto con los nombres de campos en la tabla.
	protected $codigo;
	
	//
	// Actua ante un error en la capa de persistencia.
	//
	protected function Error ($msg, $codigo) {
		throw new Exception ("Error($codigo): $msg");		
	}
	
	//
	// Recibe null o un array['nombre_parametro'] = valor con los nombres de las propiedades del objeto a actualizar.
	// Actualiza solo los que estan registrados en $this->MapaCampos.
	//
	protected function ActualizarPropiedades ($params) {
		foreach ($params as $clave => $valor) {
			if (isset ($this->MapaCampos[$clave])) {
				$this->$clave = $valor;
			}
		}
	}
	
	// 
	// Hay que hacer pasar todos los campos nulleables por este filtro. En este caso es para los campos integer, ya que
	// los float se cargan con commillas.
	//
	protected function SetNulleableIdValue ($valor) {
		if ($valor == null) {
			return 'null';
		
		} else {
			return $valor;
		}
	}
	
	//
	// Devuelve un string del tipo:
	// 	"<nombre_campo1> = <valor1>, <nombre_campo2> = <valor2>, ... " 
	// Con los campos a actualizar
	// Parametros:
	// 		Recibe $params que contiene un array con los parametros modificados o null en caso de actualizar todos.
	//
	protected function GetInfoCamposActualizar ($params) {
		if ($params != null) {
			$source = $params;
			
		} else{
			$source = $this->MapaCampos;
		}
		
		$orig = array ();

		foreach ($source as $clave => $valor) {
			if (isset ($this->MapaCampos[$clave])) {
				$item = $this->MapaCampos[$clave] . " = ";

				$letra_notacion = substr ($this->MapaCampos[$clave], 0, 1);
				if ($letra_notacion == 'b') { 				// Booleano
					$item .= DB::ToBoolean ($this->$clave);
				
				} else if ($letra_notacion == 'f') { 		// Punto flotante
					$item .= DB::ToFloat ($this->$clave);
					
				} else if ($letra_notacion == 'i') { 		// Numerico Entero
					$item .= $this->$clave;
					
				} else {									// string
					$item .= "'" . $this->$clave . "'";
				}

/*	

				} else if (is_numeric ($this->$clave)) {
					$item .= $this->$clave;

				} else {
					$item .= "'" . $this->$clave . "'";
				}
*/
				$orig[] = $item;
			}
		}	
		
		$ret = '';		
		if (count ($orig) >= 1) {
			$ret = $orig[0] . " ";
		}
		
		for ($i = 1; $i < count ($orig); $i++) {
			$ret .= ", " . $orig[$i];
		}
		
		return $ret;
	}
	
	//
	// Devuelve un array con tres arrays que contienen los elementos
	// crear, borrados y actualizados. Los arrays actualizar y borrar son de entidades, el de crear es de parametros.
	//
	// Recibe:
	// $mios: Objetos que derivan de EntidadBase.
	// $params: Objetos que son un array de parametros.
	//
	private function GetDifCampos ($mios, $params) {
		$crear 		= array ();
		$actualizar	= array ();
		$borrar		= array ();
		
		// Nuevos.		
		foreach ($params as $item) {
			if (!$this->CheckPertenenciaObj ($mios, $item->id)) {
				$crear[] = $item;
			}
		}
		
		// Actualizar.
		foreach ($mios as $item) {
			if ($this->CheckPertenenciaPar ($params, $item->id)) {
				$actualizar[] = $item;
			}
		}
		
		// Borrar.
		foreach ($mios as $item) {
			if (!$this->CheckPertenenciaPar ($params, $item->id)) {
				$borrar[] = $item;
			}
		}

		return array ('crear' => $crear, 'borrar' => $borrar, 'actualizar' => $actualizar);
	}
	
	//
	// Devuelve true si un objeto perteneciente al array tiene el id pasado por parametro
	// 
	// Parametros:
	// $arr: Array de objetos Entidades.
	// $id: Id numerico.
	//
	private function CheckPertenenciaObj ($arr, $id) {
		$ret = false;
		foreach ($arr as $e) {
			$ret = $ret || ($e->id == $id);
		}
		
		return $ret;
	}

	//
	// Devuelve true si un objeto del array tiene el id pasado por parametro
	// 
	// Parametros:
	// $arr: Array de objetos del tipo Parametros
	// $id: id numerico.
	//
	private function CheckPertenenciaPar ($arr, $id) {
		$ret = false;
		foreach ($arr as $e) {
			$ret = $ret || ($e->id == $id);
		}
		
		return $ret;
	}
	
	/*
	 * Devuelve el indice que ocupa el elemento que tiene el id indicado dentro del array.
	 * Parametros:
	 * $array	:	Array donde realizar la busqueda
	 * $id		: Id del elemento a buscar
	 */
	protected function GetIndicePorElementoId ($array, $id) {
		$ret = -1;
		
		for ($i = 0; $i < count ($array) && $ret < 0; $i++) {
			if ($array[$i]->id == $id) {
				$ret = $i;
			}
		}
		
		return $ret;	
	}
	
	/*
	 * Devuelve el elemento dentro del array que tiene el id pasado como parametro.
	 * Parametros:
	 * $array	: Array donde realizar la busqueda
	 * $id		: Id del elemento a buscar
	 */
	protected function GetElementoPorId ($array, $id) {
		$ret = null;
		
		foreach ($array as $item) {
			if ($item->id == $id) {
				$ret = $item;
			}
		}
		
		return $ret;	
	}
	
	/*
	 * Recibe el nombre de la tabla, un valor para Codigo y opcionalmente el nombre
	 * del campo 'codigo' en la tabla. Chequea que no exista otro registro con el mismo codigo, si existe
	 * devuelve false, de lo contrario true.
	 */
	protected function ChequearCodigoRepetido ($tabla, $codigo, $campo_codigo = 'cCodigo') {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT COUNT(*) AS cnt 
								FROM $tabla
								WHERE
									$campo_codigo = '$codigo'");
									
		$ret = ($rs->Fields ("cnt") == 0);
		$rs->Close ();
		
		return $ret;
	}
	
	/*
	 * Este metodo se encarga de realizar las operaciones de creacion, actualizacion y borrado para los elementos
	 * de una entidad relacionada con esta clase.
	 *
	 * Parametros:
	 * 	$campos				: Array de campos recibido por parametro
	 * 	$nombre_relacion	: Nombre del array local que contiene los registros relacionados (Ej: movimientosTito)
	 * 	$clave_foranea		: Nombre del campo que hace de foreign key (Ej: movimientoCajeroId)
	 * 	$clase_relacionada	: Nombre de la clase entidad relacionada (Ej: DetMovCajeroTito)
	 */
	protected function ActualizarCamposRelacionados ($campos, $nombre_relacion, $clave_foranea, $clase_relacionada) {
		global $conn;
	
		$info = $this->GetDifCampos ($this->$nombre_relacion, $campos[$nombre_relacion]);
		
		foreach ($info['crear'] as $item) {
			$obj = new $clase_relacionada ();
			$obj->ActualizarPropiedades ($item);
			$obj->$clave_foranea = $this->id;
	
			$obj->Crear ();
			$this->{$nombre_relacion}[] = $obj;
		}
	
		foreach ($info['actualizar'] as $item) {
			$item->Actualizar ($this->GetElementoPorId ($campos[$nombre_relacion], $item->id));
		}
	
		foreach ($info['borrar'] as $item) {
			$id = $item->id;
			$item->Borrar ();
			
			unset ($this->$nombre_relacion[$this->GetIndicePorElementoId ($this->$nombre_relacion, $id)]);
		}
	}	
	
	/*
	 * Este metodo se encarga de realizar las operaciones de creacion y borrado de las relaciones uno a muchos con otra
	 * clase. 
	 * IMPORTANTE: Esta forma de actualizar las relaciones de una clase no deja la clase bien formada. Los items creados son creados
	 * en la DB pero no actualizados en el objeto, lo mismo ocurre con los borrados.
	 *
	 * Parametros:
	 * 	$campos				: Array de campos recibido por parametro
	 * 	$nombre_relacion	: Nombre del array local que contiene los registros relacionados (Ej: movimientosTito)
	 * 	$clave_foranea		: Nombre del campo que hace de foreign key (Ej: movimientoCajeroId)
	 * 	$clave_local		: Nombre del campo que hace de clave local
	 *  $func_crear			: Nombre del metodo local que se encarga de crear la relacion
	 *  $func_borrar		: Nombre del metodo local que se encarga de borrar la relacion.
	 */
	protected function ActualizarCampoRelacionUnoAMuchos ($campos, $nombre_relacion, $clave_foranea, $clave_local, $func_crear, $func_borrar) {
		$info = $this->GetDifCampos ($this->$nombre_relacion, $campos[$nombre_relacion]);
		
		foreach ($info['crear'] as $item) {
			$this->$func_crear ($this->$clave_local, $item->$clave_foranea);
		}

		foreach ($info['borrar'] as $item) {
			$this->$func_borrar ($this->$clave_local, $item->$clave_foranea);
		}
	}
	
	protected function ActualizarCamposRelacionMxMConValores ($recibidos, $leidos) {
		$info = $this->GetDifEntidadConEquivalencia ($recibidos, $leidos);
		
		foreach ($info['crear'] as $item) {
			$item->Crear ();
		}
		
		foreach ($info['borrar'] as $item) {
			$item->Borrar ();
		}
		
		foreach ($info['actualizar'] as $item) {
			$item->Actualizar ();
		}
	}
	
	// Solo se puede usar con entidades que tengan implementada la funcion EsEquivalente ();
	// Ambos arrays tienen que contener entidades, no objetos de parametros.
	private function GetDifEntidadConEquivalencia ($recibidos, $leidos) {
		$crear 		= array ();
		$actualizar	= array ();
		$borrar		= array ();
		
		foreach ($recibidos as $item) {
			if ($this->CheckExistenciaDeEntidadConEquivalencia ($leidos, $item)) {
				$actualizar[] = $item;
				
			} else {
				$crear[] = $item;			
			}
		}
		
		foreach ($leidos as $item) {
			if (!$this->CheckExistenciaDeEntidadConEquivalencia ($recibidos, $item)) {
				$borrar[] = $item;
			}
		}

		return array ('crear' => $crear, 'borrar' => $borrar, 'actualizar' => $actualizar);		
	}
	
	//
	// Chequea que el objeto pertenezca al array, de lo contrario devuelve false. Usa
	// el metodo EsEquivalente (). Solo maneja entidades.
	//
	private function CheckExistenciaDeEntidadConEquivalencia ($arr, $obj) {
		$ret = false;
		foreach ($arr as $item) {
			$ret = $ret || $obj->EsEquivalente ($item);
		}
		
		return $ret;
	}
}
?>
