<?
/**************************************************************************************************
 * Archivo: StoreProvinciaphp
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Estas clases hacen de interfaz con el control treepanel de Ext que permite mostrar 
 *				un arbol en pantalla. Ambas son clases virtuales que deben ser extendidas para
 *				poder usarse.
 *
 * Modificaciones:
 *	-
 *
 **************************************************************************************************/
 
require_once ("template.php");

/**
 * Esta clase representa un nodo de un arbol. Tiene todas las propiedades necesarias para que el componente de Ext pueda dibujar un arbol
 *
 */
class ArbolItemBase {
	public $id;			// Id del nodo
	public $raiz;		// 1 o 0. Indica si el nodo es raiz
	public $checked;	// Extjs
	public $text;		// Extjs
	public $leaf;		// Extjs
	public $expanded;	// Extjs
	public $loaded;		// Extjs
	public $children;	// Extjs

	/**
	 * Constructor de la clase. Se debe sobrecargar esta funcion para poder agregar
	 * propiedades extra a cada nodo.
	 *
	 * @param	$id 		Id del nodo
	 * @param	$raiz 		Indica si es raiz
	 * @param	$text		Texto que se mostrara en el nodo
	 * @param	$checked	Indica si el nodo debe aparecer chequeado
	 */
	public function ArbolItemBase ($id, $raiz, $text, $checked) {
		$this->id 		= $id;
		$this->raiz		= $raiz;
		$this->text		= $text;
		$this->checked	= $checked;
	}
	
	/**
	 * Actualiza las propiedades de control que es necesario pasar a ext.
	 */
	public function ActualizarInfo () {
		if ($this->hoja) {
			$this->leaf = true;
			$this->expanded = null;
			$this->loaded = null;
			
		} else {
			if (count ($this->children) > 0) {
				$this->expanded = true;
				$this->loaded = null;
			
			} else {
				$this->loaded = true;
				$this->expanded = null;
			}
		}	
	}
}

class ArbolBase {
	public $raices 		= array ();		// Contiene todos los nodos raiz
	public $items 		= array ();		// Contiene todos los nodos que no son raiz
	public $jerarquias 	= array ();		// Contiene la informacion de la tabla ArbolMenu

	/**
	 * Devuelve el query. Abstracta
	 */
	protected function QueryCargarInfoModulos () {
	}
	
	/**
	 * Carga un item. Abstracta
	 */
	protected function CargarInfoItem ($rs) {
	}
	
	/**
	 * setea el query para cargar jerarquias. Abstracta
	 */
	protected function QueryCargarJerarquias () {
	}
	
	private function CargarInfoModulos () {
		global $conn;
		
		$rs = $conn->Retrieve ($this->QueryCargarInfoModulos ());

		while (!$rs->Eof ()) {
			$item = $this->CargarInfoItem ($rs);
			
			if ($item->raiz == 1) {
				$this->raices[] = $item;
			
			} else {
				$this->items[] = $item;
			}
			$rs->Next ();
		}
		
		$rs->Close ();
	}
	
	// 
	// Vuelca el contenido de la tabla de relaciones en un array interno.
	//
	private function CargarJerarquias () {
		global $conn;
		
		$rs = $conn->Retrieve ($this->QueryCargarJerarquias ());
								
		while (!$rs->Eof ()) {
			$padre 	= $rs->Fields ("id_padre");
			$hijo 	= $rs->Fields ("id_hijo");
			
			$this->jerarquias[$padre][] = $hijo;
			$rs->Next ();
		}
		
		$rs->Close ();
	}

	//
	// Tiene complejidad n^2. Recorre todos los nodos y por cada uno agrega los hijos que tiene.
	//
	public function GenerarMenu () {
		$this->CargarInfoModulos ();
		$this->CargarJerarquias ();

		$ret = array ();
		
		//
		// Si no tiene jerarquias cargadas cargo solo los nodos raiz tal cual vienen, osea sin hijos.
		//
		if (count ($this->jerarquias) > 0) {
			foreach ($this->raices as $padre) {
				$flag = false;
				
				foreach ($this->jerarquias[$padre->id] as $hijo) {
					// Solo agregamos el hijo a children si tambien lo tenemos
					// cargado en los items.
					if ($this->EstaItem ($hijo)) {
						if (!$flag) {
							$padre->children = array ();
							$flag = true;
						}

						$padre->children[] = $this->GetHijo ($hijo);
					}
				}		

				$ret[] = $padre;
			}

			foreach ($this->items as $padre) {
				$flag = false;

				if (isset ($this->jerarquias[$padre->id])) {		
					foreach ($this->jerarquias[$padre->id] as $hijo) {
						// Idem al caso anterior. Solo agregamos los items que tenemos cargados.
						if ($this->EstaItem ($hijo)) {
							if (!$flag) {
								$padre->children = array ();
								$flag = true;
							}

							$padre->children[] = $this->GetHijo ($hijo);
						}
					}		
				}
			}
		}
		
		foreach ($this->raices as $item) {
			$item->ActualizarInfo ();
		}
		
		foreach ($this->items as $item) {
			$item->ActualizarInfo ();
		}
		
		return $ret;
	}
	
	private function EstaItem ($id) {
		$ret = false;
		foreach ($this->items as $item) {
			if ($item->id == $id) {
				$ret = true;
				break;
			}
		}
		
		return $ret;
	}

	//
	// Devuelve el objeto nodo a partir de un id.
	//
	private function GetHijo ($id) {
		$ret = null;
		
		foreach ($this->items as $item) {
			if ($item->id == $id) {
				$ret = $item;
			}
		}
		
		return $ret;
	}
}

?>