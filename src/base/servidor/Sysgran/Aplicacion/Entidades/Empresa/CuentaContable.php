<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: CuentaContable.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Cuenta Contable
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");

class CuentaContable extends EntidadBase {
	public $id;
	public $codigoSistemaExterno;
	public $descripcion;

	public function CuentaContable ($id = null) {
		$this->MapaCampos['codigoSistemaExterno'] = 'cCodigoSistemaExterno';
		$this->MapaCampos['descripcion'] = 'cDescripcion';
		$this->id = $id;
	}
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM CuentaContable WHERE iCuentaContableId = $this->id");
									
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
			$conn->Execute ("DELETE FROM CuentaContable WHERE iCuentaContableId = $this->id");
			
			return null;
					
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Crear () {
		global $conn;
		
		try {
			$conn->Execute ("INSERT INTO CuentaContable (iCuentaContableId
				,cCodigoSistemaExterno
				,cDescripcion
			) VALUES (
			nextval ('seq_cuenta_contable_id')
				,'$this->codigoSistemaExterno'
				,'$this->descripcion'
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_cuenta_contable_id');
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
			$conn->Execute ("UPDATE CuentaContable SET $asig WHERE iCuentaContableId = $this->id");			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
