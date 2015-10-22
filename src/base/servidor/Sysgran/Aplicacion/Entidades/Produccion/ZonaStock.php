<?
/**************************************************************************************************
 * Archivo: ZonaStock.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Zona
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");

class ZonaStock extends EntidadBase {
	public $id;
	public $codigo;
	public $descripcion;
	public $plantaId;

	public function ZonaStock ($id = null) {
		$this->MapaCampos['codigo'] = 'cCodigo';
		$this->MapaCampos['descripcion'] = 'cDescripcion';
		$this->MapaCampos['plantaId'] = 'iPlantaId';
		$this->id = $id;
	}
	
	//---------- Funciones publicas estaticas de la clase ----------	
	
	public static function GetZonaStockPorCodigo ($codigo) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT iZonaStockId FROM ZonaStock WHERE cCodigo = '$codigo'");
		if (!$rs->Eof ()) {
			$ret = new ZonaStock ($rs->Fields ("iZonaStockId"));
			$ret->Leer ();
		
		} else {
			$ret = null;
		}
		
		$rs->Close ();
		
		return $ret;
	}

	//---------- CRUD ----------	
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM ZonaStock WHERE iZonaStockId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->codigo = $rs->Fields ("cCodigo");
			$this->descripcion = $rs->Fields ("cDescripcion");
			$this->plantaId	= $rs->Fields ("iPlantaId");
			
			$rs->Close ();
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Borrar () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT COUNT(u.*) AS cnt
									FROM ZonaStock z
									LEFT OUTER JOIN UbicacionAlmacen u ON u.iZonaStockId = z.iZonaStockId
									WHERE 
										z.iZonaStockId = $this->id");
										
			if ($rs->Fields ("cnt") == 0) {
				$conn->Execute ("DELETE FROM ZonaStock WHERE iZonaStockId = $this->id");
			
			} else {
				$conn->Execute ("UPDATE ZonaStock SET bActivo = " . DB::ToBoolean (false) . " WHERE iZonaStockId = $this->id");
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
			$conn->Execute ("INSERT INTO ZonaStock (
				iZonaStockId
				,iPlantaId
				,cCodigo
				,cDescripcion
				,bActivo
			) VALUES (
				nextval ('seq_zona_id')
				, $this->plantaId
				,'$this->codigo'
				,'$this->descripcion'
				, " . DB::ToBoolean (true) . "
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_zona_id');
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
			$conn->Execute ("UPDATE ZonaStock SET $asig WHERE iZonaStockId = $this->id");			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
