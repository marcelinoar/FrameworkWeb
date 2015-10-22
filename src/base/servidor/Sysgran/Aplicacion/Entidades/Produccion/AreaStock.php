<?
/**************************************************************************************************
 * Archivo: AreaStock.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: area
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");

class AreaStock extends EntidadBase {
	public $id;
	public $codigo;
	public $descripcion;
	public $plantaId;

	public function AreaStock ($id = null) {
		$this->MapaCampos['codigo'] = 'cCodigo';
		$this->MapaCampos['descripcion'] = 'cDescripcion';
		$this->MapaCampos['plantaId'] = 'iPlantaId';
		$this->id = $id;
	}
	
	//---------- Funciones publicas estaticas de la clase ----------	
	
	public static function GetAreaStockPorCodigo ($codigo) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT iAreaStockId FROM AreaStock WHERE cCodigo = '$codigo'");
		if (!$rs->Eof ()) {
			$ret = new AreaStock ($rs->Fields ("iAreaStockId"));
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
			$rs = $conn->Retrieve ("SELECT * FROM AreaStock WHERE iAreaStockId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->codigo = $rs->Fields ("cCodigo");
			$this->descripcion = $rs->Fields ("cDescripcion");
			$this->plantaId = $rs->Fields ("iPlantaId");
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
									FROM AreaStock a
									LEFT OUTER JOIN UbicacionAlmacen u ON u.iAreaStockId = a.iAreaStockId
									WHERE 
										a.iAreaStockId = $this->id");
										
			if ($rs->Fields ("cnt") == 0) {
				$conn->Execute ("DELETE FROM AreaStock WHERE iAreaStockId = $this->id");
			
			} else {
				$conn->Execute ("UPDATE AreaStock SET bActivo = " . DB::ToBoolean (false) . " WHERE iAreaStockId = $this->id");
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
			$conn->Execute ("INSERT INTO AreaStock (iAreaStockId
				,cCodigo
				,cDescripcion
				,iPlantaId
				,bActivo
			) VALUES (
			nextval ('seq_area_id')
				,'$this->codigo'
				,'$this->descripcion'
				,$this->plantaId
				," . DB::ToBoolean (true) . "
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_area_id');
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
			$conn->Execute ("UPDATE AreaStock SET $asig WHERE iAreaStockId = $this->id");			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
