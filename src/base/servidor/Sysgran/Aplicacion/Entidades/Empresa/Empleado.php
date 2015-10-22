<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: Empleado.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Empleado
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");

class Empleado extends EntidadBase {
	public $id;
	public $nombre;
	public $apellido;
	public $nroLegajo;

	public function Empleado ($id = null) {
		$this->MapaCampos['nombre'] = 'cNombre';
		$this->MapaCampos['apellido'] = 'cApellido';
		$this->MapaCampos['nroLegajo'] = 'iNroLegajo';
		$this->id = $id;
	}
	
	//---------- metodos estaticos ----------
	
	public static function GetEmpleadoPorNroLegajo ($nroLegajo) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT iEmpleadoId FROM Empleado WHERE iNroLegajo = '$nroLegajo'");
		
		if (!$rs->Eof ()) {
			$e = new Empleado ($rs->Fields ("iEmpleadoId"));
			$e->Leer ();
		
		} else {
			$e = null;
		}
		
		$rs->Close ();
		
		return $e;
	}
	
	//---------- crud ----------
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM Empleado WHERE iEmpleadoId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->nombre = $rs->Fields ("cNombre");
			$this->apellido = $rs->Fields ("cApellido");
			$this->nroLegajo = $rs->Fields ("iNroLegajo");
			$rs->Close ();
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Borrar () {
		global $conn;
		
		try {
			$conn->Execute ("DELETE FROM Empleado WHERE iEmpleadoId = $this->id");
			
			return null;
					
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Crear () {
		global $conn;
		
		try {
			$conn->Execute ("INSERT INTO Empleado (iEmpleadoId
				,cNombre
				,cApellido
				,iNroLegajo
				,bActivo
			) VALUES (
			nextval ('seq_empleado_id')
				,'$this->nombre'
				,'$this->apellido'
				,$this->nroLegajo
				,true
			)");
		
			$this->id = $conn->GetSecuenceLastId (seq_empleado_id);
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
			$conn->Execute ("UPDATE Empleado SET $asig WHERE iEmpleadoId = $this->id");			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
