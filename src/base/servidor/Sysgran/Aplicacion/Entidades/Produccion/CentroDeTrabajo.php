<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: CentroDeTrabajo.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Centro de Trabajo
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");
require_once ("Almacen.php");
require_once ("LineaDeProduccion.php");
require_once ("Maquina.php");
require_once ("Operacion.php");
require_once ("AtributoCentroDeTrabajo.php");

class CentroDeTrabajo extends EntidadBase {
	public $id;
	public $nombre;
	public $codigo;
	public $almacenAsociadoId;
	public $plantaId;
	public $generaPallet;
	public $organizaPorLote;
	public $maquinas = array ();	// Array de objetos del tipo Maquina asociados al CT.
	public $atributos = array ();	// Array de objetos del tipo AtributoCentroDeTrabajo.
	public $operaciones = array ();	// Array de objetos del tpo Operacion.

	public function CentroDeTrabajo ($id = null) {
		$this->MapaCampos['nombre'] = 'cNombre';
		$this->MapaCampos['codigo'] = 'cCodigo';
		$this->MapaCampos['plantaId'] = 'iPlantaId';
		$this->MapaCampos['almacenAsociadoId'] = 'iAlmacenAsociadoId';
		$this->MapaCampos['generaPallet'] = 'bGeneraPallet';
		$this->MapaCampos['organizaPorLote'] = 'bOrganizaPorLote';
		$this->id = $id;
	}

	//---------- Funciones para setear los valores de los campos relacionados ----------	
	
	public function SetAtributos ($arr) {
		$this->atributos = array ();
		
		foreach ($arr as $item) {	
			$obj = new AtributoCentroDeTrabajo ();
			$obj->ActualizarPropiedades ($item);
			$this->atributos[] = $obj;
		}
	}	
	
	public function SetOperaciones ($operaciones) {
		$this->operaciones = $operaciones;
	}	

	public function SetMaquinas ($maquinas) {
		$this->maquinas = $maquinas;
	}	

	//---------- Funciones publicas estaticas de la clase ----------
	
	public static function GetCentroDeTrabajoPorCodigo ($codigo) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT iCentroDeTrabajoId FROM CentroDeTrabajo WHERE cCodigo = '$codigo'");

		$ret = null;
		if (!$rs->Eof ()) {
			$ret = new CentroDeTrabajo ($rs->Fields ("iCentroDeTrabajoId"));
			$ret->Leer ();
		}
		$rs->Close ();
		
		return $ret;
	}
	
	public function GetAlmacenAsociado () {
		$ret = null;
		if ($this->almacenAsociadoId != null) {
			$ret = new Almacen ($this->almacenAsociadoId);
			$ret->Leer ();
		}
		
		return $ret;
	}
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM CentroDeTrabajo WHERE iCentroDeTrabajoId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->nombre = $rs->Fields ("cNombre");
			$this->codigo = $rs->Fields ("cCodigo");
			$this->plantaId = $rs->Fields ("iPlantaId");
			$this->almacenAsociadoId = $rs->Fields ("iAlmacenAsociadoId");
			$this->generaPallet = DB::FromBoolean ($rs->Fields ("bGeneraPallet"));
			$this->organizaPorLote = DB::FromBoolean ($rs->Fields ("bOrganizaPorLote"));
			$rs->Close ();
			
			$this->maquinas 	= Maquina::GetMaquinasDeCentroDeTrabajo ($this->id);
			$this->atributos	= AtributoCentroDeTrabajo::GetAtributosCentroDetrabajo ($this->id);
			$this->operaciones	= Operacion::GetOperacionesCentroDeTrabajo ($this->id);
			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	//
	// Chequea existencia en:
	//	- ProductoFabricacion
	//	- Operacion
	// 	- Maquina
	// 	- NovedadCentroDeTrabajo
	//
	// Borra:
	//	- AtributoCentroDeTrabajo
	//
	public function Borrar () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT COUNT(pf.*) + COUNT(op.*) + COUNT(ma.*) + COUNT(nct.*) as cnt
									FROM CentroDeTrabajo ct
									LEFT OUTER JOIN ProductoFabricacion pf ON pf.iCentroDeTrabajoId = ct.iCentroDeTrabajoId
									LEFT OUTER JOIN Operacion op ON op.iCentroDeTrabajoId = ct.iCentroDeTrabajoId
									LEFT OUTER JOIN Maquina ma ON ma.iCentroDeTrabajoId = ct.iCentroDeTrabajoId
									LEFT OUTER JOIN NovedadCentroDeTrabajo nct ON nct.iCentroDeTrabajoId = ct.iCentroDeTrabajoId
									WHERE
										ct.iCentroDeTrabajoId = $this->id");
			
			if ($rs->Fields ("cnt") == 0) {
				$conn->Execute ("DELETE FROM AtributoCentroDeTrabajo WHERE iCentroDeTrabajoId = $this->id");
				$conn->Execute ("DELETE FROM CentroDeTrabajo WHERE iCentroDeTrabajoId = $this->id");							
			
			} else {
				$conn->Execute ("UPDATE CentroDeTrabajo SET bActivo = " . DB::ToBoolean (false) . " WHERE iCentroDeTrabajoId = $this->id");
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
			if (!$this->ChequearCodigoRepetido ('CentroDeTrabajo', $this->codigo)) {
				return new RetValue ('El codigo ingresado ya esta siendo utilizado por otro registro');
			}
		
			$conn->Execute ("INSERT INTO CentroDeTrabajo (iCentroDeTrabajoId
				,cNombre
				,iPlantaId
				,cCodigo
				,iAlmacenAsociadoId
				,bGeneraPallet
				,bOrganizaPorLote
				,bActivo
			) VALUES (
				nextval ('seq_centro_de_trabajo_id')
				,'$this->nombre'
				,$this->plantaId
				,'$this->codigo'
				,$this->almacenAsociadoId
				," . DB::ToBoolean ($this->generaPallet) . "
				," . DB::ToBoolean ($this->organizaPorLote) . "
				," . DB::ToBoolean (true) . "
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_centro_de_trabajo_id');
			
			foreach ($this->maquinas as $item) {
				$this->CrearRelacionMaquina ($this->id, $item->id);
			}
			
			foreach ($this->atributos as $item) {
				$item->centroDeTrabajoId = $this->id;
				$item->Crear ();
			}
			
			foreach ($this->operaciones as $item) {
				$this->CrearRelacionOperacion ($this->id, $item->id);
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
			$conn->Execute ("UPDATE CentroDeTrabajo SET $asig WHERE iCentroDeTrabajoId = $this->id");			
			$this->ActualizarCampoRelacionUnoAMuchos  ($campos, "maquinas", "id", "id", "CrearRelacionMaquina", "BorrarRelacionMaquina");
			$this->ActualizarCampoRelacionUnoAMuchos  ($campos, "operaciones", "id", "id", "CrearRelacionOperacion", "BorrarRelacionOperacion");
			$this->ActualizarCamposRelacionados ($campos, "atributos", "centroDeTrabajoId", "AtributoCentroDeTrabajo"); 		
			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}

	protected function CrearRelacionMaquina ($centroDeTrabajoId, $maquinaId) {
		global $conn;
		
		$conn->Execute ("UPDATE Maquina SET iCentroDeTrabajoId = $centroDeTrabajoId WHERE iMaquinaId = $maquinaId");
	}
	
	protected function BorrarRelacionMaquina ($centroDeTrabajoId, $maquinaId) {
		global $conn;
		
		$conn->Execute ("UPDATE Maquina SET iCentroDeTrabajoId = null WHERE iMaquinaId = $maquinaId");
	}
	
	protected function CrearRelacionOperacion ($centroDeTrabajoId, $operacionId) {
		global $conn;
		
		$conn->Execute ("UPDATE Operacion SET iCentroDeTrabajoId = $centroDeTrabajoId WHERE iOperacionId = $operacionId");
	}
	
	protected function BorrarRelacionOperacion ($centroDeTrabajoId, $operacionId) {
		global $conn;
		
		$conn->Execute ("UPDATE Operacion SET iCentroDeTrabajoId = null WHERE iOperacionId = $operacionId");
	}	
}
?>
