<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: AtributoProducto.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de atributos de productos
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");
require_once ("UnidadDeMedida.php");

class AtributoProducto extends EntidadBase {
	public $id;
	public $nombre;
	public $unidadDeMedidaId;
	public $tipoAtributoProductoId;
	
	public function AtributoProducto ($id = null) {
		$this->MapaCampos['nombre'] = 'cNombre';
		$this->MapaCampos['unidadDeMedidaId'] = 'iUnidadDeMedidaId';
		$this->MapaCampos['tipoAtributoProductoId'] = 'iTipoAtributoProductoId';
		$this->id = $id;
	}
	
	public function GetUnidadDeMedida () {
		$ret = null;
		
		if ($this->unidadDeMedidaId != null) {
			$ret = new UnidadDeMedida ($this->unidadDeMedidaId);
			$ret->Leer ();
		}
		
		return $ret;		
	}
	
	public function EsString () {
		return ($this->unidadDeMedidaId == null);
	}
	
	//---------- Funciones publicas estaticas de la clase ----------
	
	public static function GetAtributoProductoPorCodigo ($codigo) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT iAtributoProductoId FROM AtributoProducto WHERE cCodigo = '$codigo'");
		
		$ret = null;
		if (!$rs->Eof ()) {
			$ret = new AtributoProducto ($rs->Fields ("iAtributoProductoId"));
			$ret->Leer ();
		}
		$rs->Close ();
		
		return $ret;
	}
	
	// -- Metodos del crud	
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM AtributoProducto WHERE iAtributoProductoId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->nombre = $rs->Fields ("cNombre");
			$this->unidadDeMedidaId = $rs->Fields ("iUnidadDeMedidaId");
			$this->tipoAtributoProductoId = $rs->Fields ("iTipoAtributoProductoId");
			
			$rs->Close ();
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Borrar () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT COUNT(vap.*) + COUNT(mpo.*) AS cnt
									FROM AtributoProducto a
									LEFT OUTER JOIN ValorAtributoProducto vap ON vap.iAtributoProductoId = a.iAtributoProductoId
									LEFT OUTER JOIN MedicionDeParametroOT mpo ON mpo.iAtributoProductoId = a.iAtributoProductoId
									WHERE
										a.iAtributoProductoId = $this->id");
			
			if ($rs->Fields ("cnt") == 0) {
				$conn->Execute ("DELETE FROM AtributoProducto WHERE iAtributoProductoId = $this->id");
			
			} else {
				$conn->Execute ("UPDATE AtributoProducto SET bActivo = " . DB::ToBoolean (false) . " WHERE iAtributoProductoId = $this->id");
			}
			
			$rs->Close ();
		
			return null;
					
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Crear () {
		global $conn;
		
		try {
			$conn->Execute ("INSERT INTO AtributoProducto (iAtributoProductoId
				,cNombre
				,iUnidadDeMedidaId
				,iTipoAtributoProductoId
				,bActivo
			) VALUES (
				nextval ('seq_atributo_producto_id')
				,'$this->nombre'
				,$this->unidadDeMedidaId
				,$this->tipoAtributoProductoId
				," . DB::ToBoolean (true) . "
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_atributo_producto_id');
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Actualizar ($campos = null) {
		global $conn;
		
		try {
			if ($campos != null) {
				$this->ActualizarPropiedades ($campos);
			}
	
			$asig = $this->GetInfoCamposActualizar ($campos);
			$conn->Execute ("UPDATE AtributoProducto SET $asig WHERE iAtributoProductoId = $this->id");			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
