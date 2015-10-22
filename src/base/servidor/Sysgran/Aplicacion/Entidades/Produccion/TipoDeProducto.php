<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: TipoDeProducto.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Tipos de producto
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");

class TipoDeProducto extends EntidadBase {
	public $id;
	public $nombre;
	public $esProductoDeCompras;
	public $esProductoDeVentas;
	public $esProductoDeFabricacion;

	public function TipoDeProducto ($id = null) {
		$this->MapaCampos['nombre'] = 'cNombre';
		$this->MapaCampos['esProductoDeCompras'] = 'bEsProductoDeCompras';
		$this->MapaCampos['esProductoDeVentas'] = 'bEsProductoDeVentas';
		$this->MapaCampos['esProductoDeFabricacion'] = 'bEsProductoDeFabricacion';
		$this->id = $id;
	}
	
	public function EsProductoDeCompras () {
		return ($this->esProductoDeCompras);
	}
	
	public function EsProductoDeVentas () {
		return ($this->esProductoDeVentas);
	}
	
	public function EsProductoDeFabricacion () {
		return ($this->esProductoDeFabricacion);
	}
	
	// Cambiamos los 0 y 1 que vienen de la db por booleanos.
	public function SetValoresBooleanos () {
		$this->esProductoDeCompras = ($this->esProductoDeCompras != '0');
		$this->esProductoDeVentas = ($this->esProductoDeVentas != '0');
		$this->esProductoDeFabricacion = ($this->esProductoDeFabricacion != '0');
	}
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM TipoDeProducto WHERE iTipoDeProductoId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->nombre = $rs->Fields ("cNombre");
			$this->esProductoDeCompras = DB::FromBoolean ($rs->Fields ("bEsProductoDeCompras"));
			$this->esProductoDeVentas = DB::FromBoolean ($rs->Fields ("bEsProductoDeVentas"));
			$this->esProductoDeFabricacion = DB::FromBoolean ($rs->Fields ("bEsProductoDeFabricacion"));
			$rs->Close ();
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Borrar () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT COUNT(p.*) AS cnt
									FROM TipoDeProducto t
									LEFT OUTER JOIN Producto p ON p.iTipoDeProductoId = t.iTipoDeProductoId
									WHERE
										t.iTipoDeProductoId = $this->id");
			
			if ($rs->Fields ("cnt") == 0) {
				$conn->Execute ("DELETE FROM TipoDeProducto WHERE iTipoDeProductoId = $this->id");
			
			} else {
				$conn->Execute ("UPDATE TipoDeProducto SET bActivo = " . DB::ToBoolean (false) . " WHERE iTipoDeProductoId = $this->id");
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
			$conn->Execute ("INSERT INTO TipoDeProducto (iTipoDeProductoId
				,cNombre
				,bEsProductoDeCompras
				,bEsProductoDeVentas
				,bEsProductoDeFabricacion
				,bActivo
			) VALUES (
				nextval ('seq_tipo_de_producto_id')
				,'$this->nombre'
				," . DB::ToBoolean ($this->esProductoDeCompras) . "
				," . DB::ToBoolean ($this->esProductoDeVentas) . "
				," . DB::ToBoolean ($this->esProductoDeFabricacion) . "
				," . DB::ToBoolean (true) . "
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_tipo_de_producto_id');
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
			$conn->Execute ("UPDATE TipoDeProducto SET $asig WHERE iTipoDeProductoId = $this->id");			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
