<?
/**************************************************************************************************
 * Archivo: Operacion.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Centro de Trabajo
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");
require_once ("Maquina.php");

class Operacion extends EntidadBase {
	public $id;
	public $centroDeTrabajoId;
	public $codigo;
	public $nombre;
	public $maquinas = array ();
	public $descripcion;
	
	public function Operacion ($id = null) {
		$this->MapaCampos['maquinaId'] 			= 'iMaquinaId';
		$this->MapaCampos['nombre'] 			= 'cNombre';
		$this->MapaCampos['descripcion'] 		= 'cDescripcion';
		
		$this->id = $id;
	}
	
	//---------- Funciones para setear los valores de los campos relacionados ----------	
	
	public function SetMaquinas ($maquinas) {
		$this->maquinas = $maquinas;
	}	

	//---------- Funciones publicas estaticas de la clase ----------	
	
	public static function GetOperacionesCentroDeTrabajo ($ct_id) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT * FROM Operacion WHERE iCentroDeTrabajoId = $ct_id");
		
		$ret = array ();
		while (!$rs->Eof ()) {
			$obj = new Operacion ();
			$obj->id 				= $rs->Fields ("iOperacionId");
			$obj->codigo			= $rs->Fields ("cCodigo");
			$obj->centroDeTrabajoId = $rs->Fields ("iCentroDeTrabajoId");
			$obj->nombre 			= $rs->Fields ("cNombre");
			$obj->descripcion		= $rs->Fields ("cDescripcion");
			$ret[] = $obj;
				
			$rs->Next ();
		}
		
		$rs->Close ();
		
		
		return $ret;
	}
	
	public static function GetOperacionPorCodigo ($codigo) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT iOperacionId FROM Operacion WHERE cCodigo = '$codigo'");

		$ret = null;
		if (!$rs->Eof ()) {
			$ret = new Operacion ($rs->Fields ("iOperacionId"));
			$ret->Leer ();
		}
		$rs->Close ();
		
		return $ret;	
	}

	//---------- Funciones del CRUD ----------
	
	public function Leer () {
		global $conn;
		
		try {		
			$rs = $conn->Retrieve ("SELECT cCodigo, iCentroDeTrabajoId, cNombre, cDescripcion FROM Operacion WHERE iOperacionId = $this->id");

			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->centroDeTrabajoId	= $rs->Fields ("iCentroDeTrabajoId");
			$this->codigo				= $rs->Fields ("cCodigo");
			$this->nombre				= $rs->Fields ("cNombre");
			$this->descripcion			= $rs->Fields ("cDescripcion");			
			$this->maquinas				= Maquina::GetMaquinasDeOperacion ($this->id);
			$rs->Close ();
			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}			
	}

	//
	// Chequea existencia en:
	// - DetHojaDeRutaProductoMaquina
	// - ValeDeFabricacion
	// - LoteDeFabricacion
	// 
	// Borra de:
	// - MaquinaOperacion 
	public function Borrar () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT COUNT(dhr.*) + COUNT(vf.*) AS cnt
									FROM Operacion o
									LEFT OUTER JOIN DetHojaDeRutaProductoMaquina dhr ON dhr.iOperacionId = o.iOperacionId
									LEFT OUTER JOIN ValeDeFabricacion vf ON vf.iOperacionId = o.iOperacionId
									WHERE 
										o.iOperacionId = $this->id");
										
			if ($rs->Fields ("cnt") == 0) {
				$conn->Execute ("DELETE FROM Operacion WHERE iOperacionId = $this->id");
				$conn->Execute ("DELETE FROM MaquinaOperacion WHERE iOperacionId = $this->id");
			
			} else {
				$conn->Execute ("UPDATE Operacion SET bActivo = " . DB::ToBoolean (false) . " WHERE iOperacionId = $this->id");
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
			if (!$this->ChequearCodigoRepetido ('Operacion', $this->codigo)) {
				return new RetValue ('El codigo ingresado ya esta siendo utilizado por otro registro');
			}
		
			$conn->Execute ("INSERT INTO Operacion (iOperacionId
				,iCentroDeTrabajoId
				,cCodigo
				,cNombre
				,cDescripcion
				,bActivo
			) VALUES (
				nextval ('seq_operacion_id')
				,$this->centroDeTrabajoId
				,'$this->codigo'
				,'$this->nombre'
				,'$this->descripcion'
				," . DB::ToBoolean (true) . "
			)");

			$this->id = $conn->GetSecuenceLastId ('seq_operacion_id');
			
			foreach ($this->maquinas as $item) {
				$this->CrearRelacionMaquina ($this->id, $item->id);
			}
			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	

	protected function CrearRelacionMaquina ($operacionId, $maquinaId) {
		global $conn;
		
		$conn->Execute ("INSERT INTO MaquinaOperacion (iMaquinaId, iOperacionId) VALUES ($maquinaId, $operacionId)");
	}
	
	protected function BorrarRelacionMaquina ($operacionId, $maquinaId) {
		global $conn;
		
		$conn->Execute ("DELETE FROM MaquinaOperacion WHERE iOperacionId = $operacionId AND iMaquinaId = $maquinaId");
	}	

	public function Actualizar ($campos = null) {
		global $conn;

		try {		
			if ($campos != null) {
				$this->ActualizarPropiedades ($campos);
			} 

			$asig = $this->GetInfoCamposActualizar ($campos);
			$conn->Execute ("UPDATE Operacion SET $asig WHERE iOperacionId = $this->id");
			
			$this->ActualizarCampoRelacionUnoAMuchos  ($campos, "maquinas", "id", "id", "CrearRelacionMaquina", "BorrarRelacionMaquina");
			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
