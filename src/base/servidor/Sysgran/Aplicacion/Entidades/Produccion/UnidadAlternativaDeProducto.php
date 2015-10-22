<?
/**************************************************************************************************
 * Archivo: UnidadAlternativaDeProducto.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Representa una conversion de unidades de medida para un producto. Es una clase con
 * 				doble clave, no tiene campo Id.
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");

class UnidadAlternativaDeProducto extends EntidadBase {
	public $productoId;
	public $unidadDestinoId;
	public $unidadOrigenId;
	public $factorDeConversion;
	
	public function UnidadAlternativaDeProducto ($productoId = null, $unidadOrigenId = null, $unidadDestinoId = null) {
		$this->productoId 			= $productoId;
		$this->unidadOrigenId 		= $unidadOrigenId;
		$this->unidadDestinoId 		= $unidadDestinoId;
	}
	
	//---------- Funciones publicas estaticas de la clase ----------
	
	public static function GerUnidadesAlternativasDeProducto ($productoId) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT iUnidadOrigenId, iUnidadDestinoId, fFactorDeConversion 
								FROM UnidadAlternativaDeProducto
								WHERE 
									iProductoId = $productoId");
									
		$ret = array ();
		while (!$rs->Eof ()) {
			$item = new UnidadAlternativaDeProducto ($productoId, $rs->Fields ("iUnidadOrigenId"), $rs->Fields ("iUnidadDestinoId"));
			$item->factorDeConversion = DB::FromFloat ($rs->Fields ("fFactorDeConversion"));

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
		return ($this->productoId == $obj->productoId && $this->unidadOrigenId== $obj->unidadOrigenId && $this->unidadDestinoId == $obj->unidadDestinoId);
	}
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT fFactorDeConversion FROM UnidadAlternativaDeProducto WHERE iProductoId = $this->productoId");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}
			
			$this->factorDeConversion = DB::FromFloat ($rs->Fields ("fFactorDeConversion"));
			
			$rs->Close ();
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Borrar () {
		global $conn;
		
		try {
			$conn->Execute ("DELETE FROM UnidadAlternativaDeProducto 
							WHERE 
								iUnidadOrigenId = $this->unidadOrigenId AND 
								iUnidadDestinoId = $this->unidadDestinoId AND 
								iProductoId = $this->productoId");
			
			return null;
					
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Crear () {
		global $conn;
		
		try {
			$conn->Execute ("INSERT INTO UnidadAlternativaDeProducto (iUnidadOrigenId
				,iUnidadDestinoId
				,iProductoId
				,fFactorDeConversion
			) VALUES (
				$this->unidadOrigenId
				,$this->unidadDestinoId
				,$this->productoId
				," . DB::ToFloat ($this->factorDeConversion) . "
			)");
		
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Actualizar ($campos = null) {
		global $conn;
		
		try {
			$conn->Execute ("UPDATE UnidadAlternativaDeProducto SET fFactorDeConversion = " . DB::ToFloat ($this->factorDeConversion) . "
							WHERE 
								iUnidadOrigenId = $this->unidadOrigenId AND 
								iUnidadDestinoId = $this->unidadDestinoId AND
								iProductoId = $this->productoId");			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
