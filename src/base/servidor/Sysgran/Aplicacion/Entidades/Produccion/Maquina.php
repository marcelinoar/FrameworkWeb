<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: Maquina.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Maquinas
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");
require_once ("CentroDeTrabajo.php");
require_once ("AtributoMaquina.php");

class Maquina extends EntidadBase {
	public $id;
	public $centroDeTrabajoId;
	public $codigo;
	public $descripcion;
	public $atributos = array ();

	public function Maquina ($id = null) {
		$this->MapaCampos['centroDeTrabajoId'] = 'iCentroDeTrabajoId';
		$this->MapaCampos['codigo'] = 'cCodigo';
		$this->MapaCampos['descripcion'] = 'cDescripcion';
		$this->id = $id;
	}
	
	//---------- Funciones para setear los valores de los campos relacionados ----------	
	
	public function SetAtributos ($arr) {
		$this->atributos = array ();
		
		foreach ($arr as $item) {	
			$obj = new AtributoMaquina ();
			$obj->ActualizarPropiedades ($item);
			$this->atributos[] = $obj;
		}
	}	

	//---------- Funciones publicas estaticas de la clase ----------	
	
	public static function GetMaquinasDeCentroDeTrabajo ($ct_id) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT * FROM Maquina WHERE iCentroDeTrabajoId = $ct_id");
		$ret = array ();							
		while (!$rs->Eof ()) {
			$obj = new Maquina ();
			$obj->id				= $rs->Fields ("iMaquinaId");
			$obj->centroDeTrabajoId = $rs->Fields ("iCentroDeTrabajoId");
			$obj->codigo 			= $rs->Fields ("cCodigo");
			$obj->descripcion 		= $rs->Fields ("cDescripcion");
			$ret[] = $obj;	
			
			$rs->Next ();
		}
		
		$rs->Close ();
		
		return $ret;	
	}
	
	public static function GetMaquinasDeOperacion ($id) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT * 
								FROM Maquina m, MaquinaOperacion mo
								WHERE 
									m.iMaquinaId = mo.iMaquinaId AND
									mo.iOperacionId = $id");
		$ret = array ();							
		while (!$rs->Eof ()) {
			$obj = new Maquina ();
			$obj->id				= $rs->Fields ("iMaquinaId");
			$obj->centroDeTrabajoId = $rs->Fields ("iCentroDeTrabajoId");
			$obj->codigo 			= $rs->Fields ("cCodigo");
			$obj->descripcion 		= $rs->Fields ("cDescripcion");
			$ret[] = $obj;	
			
			$rs->Next ();
		}
		
		$rs->Close ();
		
		return $ret;	
	}

	public static function GetMaquinaPorCodigo ($codigo) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT iMaquinaId FROM Maquina WHERE cCodigo = '$codigo'");

		$ret = null;
		if (!$rs->Eof ()) {
			$ret = new Maquina($rs->Fields ("iMaquinaId"));
			$ret->Leer ();
		}
		$rs->Close ();
		
		return $ret;
	}

	public function GetCentroDeTrabajo () {
		$ret = null;
		
		if ($this->centroDeTrabajoId != null) {
			$ret = new CentroDeTrabajo ($this->centroDeTrabajoId);
			$ret->Leer ();
		}
		
		return $ret;
	}

	//---------- Funciones del CRUD ----------
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM Maquina WHERE iMaquinaId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->centroDeTrabajoId = $rs->Fields ("iCentroDeTrabajoId");
			$this->codigo 		= $rs->Fields ("cCodigo");
			$this->descripcion 	= $rs->Fields ("cDescripcion");
			$this->atributos	= AtributoMaquina::GetAtributosDeMaquina ($this->id);
			$rs->Close ();
			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	//
	// Chequea existencia en:
	// - NovedadCentroDeTrabajo
	// - DetHojaDeRutaProductoMaquina
	// - MaquinaOperacion
	// - OperacionPorOt
	// - ActMantMaquina
	// Borra:
	// - AtributoMaquina
	
	public function Borrar () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT COUNT(nct.*) + COUNT(dhr.*) + COUNT(mo.*) + COUNT(op.*) + COUNT(am.*) AS cnt
									FROM Maquina m
									LEFT OUTER JOIN NovedadCentroDeTrabajo nct ON nct.iMaquinaId = m.iMaquinaId 
									LEFT OUTER JOIN DetHojaDeRutaProductoMaquina dhr ON dhr.iMaquinaId = m.iMaquinaId
									LEFT OUTER JOIN MaquinaOperacion mo ON mo.iMaquinaId = m.iMaquinaId
									LEFT OUTER JOIN OperacionPorOT op ON op.iMaquinaId = m.iMaquinaId
									LEFT OUTER JOIN ActMantMaquina am ON am.iMaquinaId = m.iMaquinaId
									WHERE
										m.iMaquinaId = $this->id");
			
			if ($rs->Fields ("cnt") == 0) {
				$conn->Execute ("DELETE FROM Maquina WHERE iMaquinaId = $this->id");
				$conn->Execute ("DELETE FROM AtributoMaquina WHERE iMaquinaId = $this->id");
			
			} else {
				$conn->Execute ("UPDATE Maquina SET bActivo = " . DB::ToBoolean (false) . " WHERE iMaquinaId = $this->id");
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
			if (!$this->ChequearCodigoRepetido ('Maquina', $this->codigo)) {
				return new RetValue ('El codigo ingresado ya esta siendo utilizado por otro registro');
			}
		
			$conn->Execute ("INSERT INTO Maquina (iMaquinaId
				,iCentroDeTrabajoId
				,cCodigo
				,cDescripcion
				,bActivo
			) VALUES (
				nextval ('seq_maquina_id')
				,$this->centroDeTrabajoId
				,'$this->codigo'
				,'$this->descripcion'
				," . DB::ToBoolean (true) . "
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_maquina_id');
			
			foreach ($this->atributos as $item) {
				$item->maquinaId = $this->id;
				$item->Crear ();
			}
			
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
			$conn->Execute ("UPDATE Maquina SET $asig WHERE iMaquinaId = $this->id");			
			$this->ActualizarCamposRelacionados ($campos, "atributos", "maquinaId", "AtributoMaquina"); 		
			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
