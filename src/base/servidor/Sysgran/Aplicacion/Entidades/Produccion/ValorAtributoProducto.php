<?
/**************************************************************************************************
 * Archivo: ValorAtributoProducto.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Representa la asignacion de un valor a un atributo del producto. Es una clase con
 * 				doble clave, no tiene campo Id.
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");
require_once ("UnidadDeMedida.php");
require_once ("AtributoProducto.php");

class ValorAtributoProducto extends EntidadBase {
	public $productoId;
	public $atributoProductoId;
	public $valor;
	public $nombre;				// Solo para visualizacion
	public $unidadDeMedidaId;	// Solo para visualizacion.
	
	public function ValorAtributoProducto ($productoId = null, $atributoProductoId = null) {
		$this->productoId 			= $productoId;
		$this->atributoProductoId	= $atributoProductoId;
	}
	
	/**
	 *
	 * Indica si un objeto comparte las mismas claves que this
	 *
	 * @param	$obj Objeto a chequear
	 *
	 * @return	Devuelve true si las claves son iguales, false de lo contrario
	 */
	public function EsEquivalente ($obj) {
		return ($this->productoId == $obj->productoId && $this->atributoProductoId == $obj->atributoProductoId);
	}
	
	//---------- Funciones publicas estaticas de la clase ----------
	
	public static function GetValoresDeProducto ($productoId) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT cValor, fValor, iUnidadDeMedidaId, ap.iAtributoProductoId, ap.cNombre, ap.iUnidadDeMedidaId
								FROM ValorAtributoProducto vap, AtributoProducto ap 
								WHERE 
									vap.iAtributoProductoId = ap.iAtributoProductoId AND
									vap.iProductoId = $productoId");
									
		$ret = array ();
		while (!$rs->Eof ()) {
			$item = new ValorAtributoProducto ($productoId, $rs->Fields ("iAtributoProductoId"));
			
			if ($rs->Fields ("iUnidadDeMedidaId") == null) { // Es string
				$item->valor = $rs->Fields ("cValor");
				
			} else {
				$item->valor = DB::FromFloat ($rs->Fields ("fValor"));
			}
			
			$item->nombre = $rs->Fields ('cNombre');
			$item->unidadDeMedidaId	= $rs->Fields ("iUnidadDeMedidaId");
			
			$ret[] = $item;
			$rs->Next ();
		}
		$rs->Close ();
		
		return $ret;
	}
	//---------- Metodos del CRUD ----------
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM vap.cValor, vap.fValor
									FROM ValorAtributoProducto vap
									WHERE 
										vap.iAtributoProductoId = $this->atributoProductoId AND
										vap.iProductoId			= $this->productoId");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}
			
			$f_valor = DB::FromFloat ($rs->Fields ("fValor"));
			$c_valor = $rs->Fields ("cValor");
			
			if ($f_valor == null) {
				$this->valor = $c_valor;
			
			} else {
				$this->valor = $f_valor;
			}
			$item->nombre = $rs->Fields ('cNombre');
			$item->unidadDeMedidaId	= $rs->Fields ("iUnidadDeMedidaId");
			
			$rs->Close ();
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Borrar () {
		global $conn;
		
		try {
			$conn->Execute ("DELETE FROM ValorAtributoProducto WHERE iAtributoProductoId = $this->atributoProductoId AND iProductoId = $this->productoId");
			
			return null;
					
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Crear () {
		global $conn;
		
		try {
			if ($this->EsString ()) {
				$f_valor = 'null';
				$c_valor = "'" . $this->valor . "'";
			
			} else {
				$f_valor = DB::ToFloat ($this->valor);
				$c_valor = 'null';
			}
		
			$conn->Execute ("INSERT INTO ValorAtributoProducto (iAtributoProductoId
				,iProductoId
				,fValor
				,cValor
			) VALUES (
				$this->atributoProductoId
				,$this->productoId
				,$f_valor
				,$c_valor
			)");
		
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Actualizar ($campos = null) {
		global $conn;
		
		try {
			if ($this->EsString ()) {
				$conn->Execute ("UPDATE ValorAtributoProducto SET cValor = '$this->valor' WHERE iAtributoProductoId = $this->atributoProductoId AND iProductoId = $this->productoId");			
				
			} else {
				$conn->Execute ("UPDATE ValorAtributoProducto SET fValor = " . DB::ToFloat ($this->valor) . " WHERE iAtributoProductoId = $this->atributoProductoId AND iProductoId = $this->productoId");			
			}

			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
	
	//---------- Metodos Privados ----------
	
	/**
	 *
	 * Indica si el tipo de atributo es string o no.
	 *
	 * @return	Devuelve true o false
	 */
	private function EsString () {
		$atributo = new AtributoProducto ($this->atributoProductoId);
		$atributo->Leer ();

		return $atributo->EsString ();
	}
}
?>
