<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: UnidadDeMedida.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Unidad de Medida
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");

class UnidadDeMedida extends EntidadBase {
	public $id;
	public $codigo;
	public $descripcionCorta;

	public function UnidadDeMedida ($id = null) {
		$this->MapaCampos['descripcionCorta'] = 'cDescripcionCorta';
		$this->id = $id;
	}
	
	//---------- Funciones publicas estaticas de la clase ----------	

	public static function GetUnidadDeMedidaPorCodigo ($codigo) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT iUnidadDeMedidaId FROM UnidadDeMedida WHERE cCodigo = '" . strtoupper ($codigo) . "'");

		$ret = null;
		if (!$rs->Eof ()) {
			$ret = new UnidadDeMedida ($rs->Fields ("iUnidadDeMedidaId"));
			$ret->Leer ();
		}
		$rs->Close ();
		
		return $ret;
	}

	public static function GetUnidadDeMedida ($id) {
		if ($id != null) {
			$ret = new UnidadDeMedida ($id);

			$ret_val = $ret->Leer ();
			if ($ret_val != null) {
				return null;

			} else {
				return $ret;
			}
		
		} else {
			return null;
		}
	}
	
	//---------- Funciones del CRUD ----------
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM UnidadDeMedida WHERE iUnidadDeMedidaId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->codigo = $rs->Fields ("cCodigo");
			$this->descripcionCorta = $rs->Fields ("cDescripcionCorta");
			$rs->Close ();
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	

	//
	// Tiene muchas referencias, asi que directamente la deshabilitamos siempre.
	//
	public function Borrar () {
		global $conn;
	
		try {
			$conn->Execute ("UPDATE UnidadDeMedida SET bActivo = " . DB::ToBoolean (false) . " WHERE iUnidadDeMedidaId = $this->id");

			return null;
					
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Crear () {
		global $conn;
		
		try {
			if (!$this->ChequearCodigoRepetido ('UnidadDeMedida', $this->codigo)) {
				return new RetValue ('El codigo ingresado ya esta siendo utilizado por otro registro');
			}
		
			$conn->Execute ("INSERT INTO UnidadDeMedida (iUnidadDeMedidaId
				,cCodigo
				,cDescripcionCorta
				,bActivo
			) VALUES (
				nextval ('seq_unidad_de_medida_id')
				,'" . strtoupper ($this->codigo) . "'
				,'$this->descripcionCorta'
				," . DB::ToBoolean (true) . "
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_unidad_de_medida_id');
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
			$conn->Execute ("UPDATE UnidadDeMedida SET $asig WHERE iUnidadDeMedidaId = $this->id");			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
