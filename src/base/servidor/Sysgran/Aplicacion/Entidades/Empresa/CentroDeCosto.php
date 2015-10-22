<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: CentroDeCosto.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: 
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");
	
class CentroDeCosto extends EntidadBase {
	public $id;
	public $codigoSistemaExterno;
	public $descripcion;

	public function CentroDeCosto ($id = null) {
		$this->MapaCampos['codigoSistemaExterno'] = 'cCodigoSistemaExterno';
		$this->MapaCampos['descripcion'] = 'cDescripcion';
		$this->id = $id;
	}
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM CentroDeCosto WHERE iCentroDeCostoId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->codigoSistemaExterno = $rs->Fields ("cCodigoSistemaExterno");
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
			$conn->Execute ("DELETE FROM CentroDeCosto WHERE iCentroDeCostoId = $this->id");
			
			return null;
					
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Crear () {
		global $conn;
		
		try {
			$conn->Execute ("INSERT INTO CentroDeCosto (iCentroDeCostoId
				,cCodigoSistemaExterno
				,cDescripcion
			) VALUES (
			nextval ('seq_centro_de_costo_id')
				,'$this->codigoSistemaExterno'
				,'$this->descripcion'
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_centro_de_costo_id');
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	//
	// Actualiza el registro.
	//
	// Recibe un array["nombre_parametro"] = valor con los parametros a actualizar o null para actualizar todas las propiedades de la clase.
	//
	public function Actualizar ($campos = null) {
		global $conn;

		try {				
			if ($campos != null) {
				$this->ActualizarPropiedades ($campos);
			} 

			$asig = $this->GetInfoCamposActualizar ($campos);
			$conn->Execute ("UPDATE CentroDeCosto SET $asig WHERE iCentroDeCostoId = $this->id");
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
}
?>
