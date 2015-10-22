<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: Almacen.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Almacenes
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");

class Almacen extends EntidadBase {
	public $id;
	public $codigo;
	public $descripcionCorta;
	public $descripcionLarga;
	public $plantaId;

	public function Almacen ($id = null) {
		$this->MapaCampos['codigo'] = 'cCodigo';
		$this->MapaCampos['descripcionCorta'] = 'cDescripcionCorta';
		$this->MapaCampos['descripcionLarga'] = 'cDescripcionLarga';
		$this->MapaCampos['plantaId'] = 'iPlantaId';
		$this->id = $id;
	}
	
	public static function GetAlmacenPorCodigo ($codigo) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT iAlmacenId FROM Almacen WHERE cCodigo = '$codigo'");

		$ret = null;
		if (!$rs->Eof ()) {
			$ret = new Almacen ($rs->Fields ("iAlmacenId"));
			$ret->Leer ();
		}
		$rs->Close ();
		
		return $ret;
	}

	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM Almacen WHERE iAlmacenId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->codigo = $rs->Fields ("cCodigo");
			$this->descripcionCorta = $rs->Fields ("cDescripcionCorta");
			$this->descripcionLarga = $rs->Fields ("cDescripcionLarga");
			$this->plantaId = $rs->Fields ("iPlantaId");
			$rs->Close ();
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}

	//
	// Chequea existencia en:
	// - CentroDeTrabajo
	// - AutorizacionMovimientoStock
	// - ProductoFabricacion
	// - UbicacionAlmacen
	// Borra de:
	// - ProductoAlmacen
	
	public function Borrar () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT COUNT(ct.*) + COUNT(aus1.*) + COUNT(aus2.*) + COUNT(pf.*) + COUNT(ua.*) AS cnt
									FROM Almacen a
									LEFT OUTER JOIN CentroDeTrabajo ct ON ct.iAlmacenAsociadoId = a.iAlmacenId
									LEFT OUTER JOIN AutorizacionMovimientoStock aus1 ON aus1.iAlmacenOrigenId = a.iAlmacenId
									LEFT OUTER JOIN AutorizacionMovimientoStock aus2 ON aus2.iAlmacenDestinoId = a.iAlmacenId
									LEFT OUTER JOIN ProductoFabricacion pf ON pf.iAlmacenDestinoId = a.iAlmacenId
									LEFT OUTER JOIN UbicacionAlmacen ua ON ua.iAlmacenId = a.iAlmacenId
									WHERE
										a.iAlmacenId = $this->id");
			
			if ($rs->Fields ("cnt") == 0) {
				$conn->Execute ("DELETE FROM Almacen WHERE iAlmacenId = $this->id");
				$conn->Execute ("DELETE FROM ProductoAlmacen WHERE iAlmacenId = $this->id");
			
			} else {
				$conn->Execute ("UPDATE Almacen SET bActivo = " . DB::ToBoolean (false) . " WHERE iAlmacenId = $this->id");
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
			if (!$this->ChequearCodigoRepetido ('Almacen', $this->codigo)) {
				return new RetValue ('El codigo ingresado ya esta siendo utilizado por otro registro');
			}
		
			$conn->Execute ("INSERT INTO Almacen (iAlmacenId
				,cCodigo
				,cDescripcionCorta
				,cDescripcionLarga
				,iPlantaId
				,bActivo
			) VALUES (
				nextval ('seq_almacen_id')
				,'$this->codigo'
				,'$this->descripcionCorta'
				,'$this->descripcionLarga'
				,$this->plantaId
				," . DB::ToBoolean (true) . "
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_almacen_id');
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
			$conn->Execute ("UPDATE Almacen SET $asig WHERE iAlmacenId = $this->id");			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
