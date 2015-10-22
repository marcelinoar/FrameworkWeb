<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: Planta.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Plantas de produccion
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");

class Planta extends EntidadBase {
	public $id;
	public $nombre;
	public $paisId;
	public $provinciaId;
	public $ciudadId;
	public $direccion;
	public $descripcion;

	public function Planta ($id = null) {
		$this->MapaCampos['nombre'] = 'cNombre';
		$this->MapaCampos['paisId'] = 'iPaisId';
		$this->MapaCampos['provinciaId'] = 'iProvinciaId';
		$this->MapaCampos['ciudadId'] = 'iCiudadId';
		$this->MapaCampos['direccion'] = 'cDireccion';
		$this->MapaCampos['descripcion'] = 'cDescripcion';
		$this->id = $id;
	}
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM Planta WHERE iPlantaId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->nombre = $rs->Fields ("cNombre");
			$this->paisId = $rs->Fields ("iPaisId");
			$this->provinciaId = $rs->Fields ("iProvinciaId");
			$this->ciudadId = $rs->Fields ("iCiudadId");
			$this->direccion = $rs->Fields ("cDireccion");
			$this->descripcion = $rs->Fields ("cDescripcion");
			$rs->Close ();
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Borrar () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT COUNT(a.*) + COUNT(ct.*) AS cnt
									FROM Planta p
									LEFT OUTER JOIN Almacen a ON a.iPlantaId = p.iPlantaId
									LEFT OUTER JOIN CentroDeTrabajo ct ON ct.iPlantaId = p.iPlantaId
									WHERE 
										p.iPlantaId = $this->id");
										
			if ($rs->Fields ("cnt") == 0) {
				$conn->Execute ("DELETE FROM Planta WHERE iPlantaId = $this->id");
			
			} else {
				$conn->Execute ("UPDATE Planta SET bActivo = " . DB::ToBoolean (false) . " WHERE iPlantaId = $this->id");
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
			$conn->Execute ("INSERT INTO Planta (iPlantaId
				,cNombre
				,iPaisId
				,iProvinciaId
				,iCiudadId
				,cDireccion
				,cDescripcion
				,bActivo
			) VALUES (
				nextval ('seq_planta_id')
				,'$this->nombre'
				,$this->paisId
				,$this->provinciaId
				,$this->ciudadId
				,'$this->direccion'
				,'$this->descripcion'
				," . DB::ToBoolean (true) . " 
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_planta_id');
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
			$conn->Execute ("UPDATE Planta SET $asig WHERE iPlantaId = $this->id");			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
