<?
/**************************************************************************************************
 * Archivo: DetProductoAlmacen.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Representa una conversion de unidades de medida para un producto. Es una clase con
 * 				doble clave, no tiene campo Id.
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

class DetProductoAlmacen extends EntidadBase {
	public $productoId;
	public $almacenId;
	public $stockCritico;	
	public $puntoDePedido;
	
	public function DetProductoAlmacen ($productoId = null, $almacenId = null) {
		$this->productoId 	= $productoId;
		$this->almacenId = $almacenId;
	}
	
	//---------- Funciones publicas estaticas de la clase ----------
	
	//
	// Informacion de stock por almacen de producto.
	//
	public static function GetInfoProducto ($producto_id) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT iProductoId, iAlmacenId, fStockCritico, fPuntoDePedido
								FROM ProductoAlmacen
								WHERE 
									iProductoId = $producto_id");

		$ret = array ();
		while (!$rs->Eof ()) {
			$item = new DetProductoAlmacen ($rs->Fields ('iProductoId'), $rs->Fields ('iAlmacenId'));
			$item->SetPropiedades ($rs);			
			$item->Leer ();
			
			$ret[] = $item;
			$rs->Next ();
		}
		$rs->Close ();
		
		return $ret;
	}

	//---------- Metodos del CRUD ----------
	
	/**
	 *
	 * Indica si un objeto comparte las mismas claves que this
	 *
	 * @param	$obj Objeto a chequear
	 *
	 * @return	Devuelve true si las claves son iguales, false de lo contrario
	 */
	public function EsEquivalente ($obj) {
		return ($this->productoId == $obj->productoId && $this->almacenId == $obj->almacenId);
	}

	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT fStockCritico, fPuntoDePedido
									FROM ProductoAlmacen
									WHERE 
										iProductoId = $this->productoId AND
										iAlmacenId = $this->almacenId");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}
			
			$this->SetPropiedades ($rs);
			
			$rs->Close ();
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	private function SetPropiedades ($rs) {
		$this->stockCritico 	= DB::FromFloat ($rs->Fields ("fStockCritico"));
		$this->puntoDePedido 	= DB::FromFloat ($rs->Fields ("fPuntoDePedido"));
	}
	
	public function Borrar () {
		global $conn;
		
		try {
			$conn->Execute ("DELETE FROM ProductoAlmacen
							WHERE 
								iProductoId = $this->productoId AND 
								iAlmacenId = $this->almacenId");
			
			return null;
					
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Crear () {
		global $conn;
		
		try {
			$conn->Execute ("INSERT INTO ProductoAlmacen (
				iProductoId
				,iAlmacenId
				,fStockCritico
				,fPuntoDePedido
			) VALUES (
				$this->productoId
				,$this->almacenId
				," . DB::ToFloat ($this->stockCritico) . "
				," . DB::ToFloat ($this->puntoDePedido) . "
			)");
		
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Actualizar ($campos = null) {
		global $conn;
		
		try {
			$conn->Execute ("UPDATE ProductoAlmacen
							SET 
								fStockCritico = " . DB::ToFloat ($this->stockCritico) . ",
								fPuntoDePedido = " . DB::ToFloat ($this->puntoDePedido) . "
							WHERE 
								iProductoId = $this->productoId AND 
								iAlmacenId = $this->almacenId");			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
