<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: TipoAtributoProducto.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM Tipo Atributos de producto
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");

class TipoAtributoProducto extends EntidadBase {
	public $id;
	public $nombre;

	public function TipoAtributoProducto ($id = null) {
		$this->MapaCampos['nombre'] = 'cNombre';
		$this->id = $id;
	}
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM TipoAtributoProducto WHERE iTipoAtributoProductoId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->nombre = $rs->Fields ("cNombre");
			$rs->Close ();
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Borrar () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT COUNT(a.*) AS cnt
									FROM TipoAtributoProducto t
									LEFT OUTER JOIN AtributoProducto a ON a.iTipoAtributoProductoId = t.iTipoAtributoProductoId
									WHERE t.iTipoAtributoProductoId = $this->id");
			
			if ($rs->Fields ("cnt") == 0) {
				$conn->Execute ("DELETE FROM TipoAtributoProducto WHERE iTipoAtributoProductoId = $this->id");
			
			} else {
				$conn->Execute ("UPDATE TipoAtributoProducto SET bActivo = " . DB::ToBoolean (false) . " WHERE iTipoAtributoProductoId = $this->id");
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
			$conn->Execute ("INSERT INTO TipoAtributoProducto (iTipoAtributoProductoId
				,cNombre
				,bActivo
			) VALUES (
				nextval ('seq_tip_atrib_prod_id')
				,'$this->nombre'
				," . DB::ToBoolean (true) . "
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_tip_atrib_prod_id');
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
			$conn->Execute ("UPDATE TipoAtributoProducto SET $asig WHERE iTipoAtributoProductoId = $this->id");			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
