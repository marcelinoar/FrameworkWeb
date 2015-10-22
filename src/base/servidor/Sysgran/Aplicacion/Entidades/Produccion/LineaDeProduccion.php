<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: LineaDeProduccion.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Linea de Produccion
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");

class LineaDeProduccion extends EntidadBase {
	public $id;
	public $codigo;
	public $descripcionCorta;
	public $descripcionLarga;

	public function LineaDeProduccion ($id = null) {
		$this->MapaCampos['descripcionCorta'] = 'cDescripcionCorta';
		$this->MapaCampos['descripcionLarga'] = 'cDescripcionLarga';
		$this->id = $id;
	}
	
	//---------- Funciones publicas estaticas de la clase ----------
	
	public static function GetLineaDeProduccionPorCodigo ($codigo) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT iLineaDeProduccionId FROM LineaDeProduccion WHERE cCodigo = '$codigo'");

		$ret = null;
		if (!$rs->Eof ()) {
			$ret = new LineaDeProduccion ($rs->Fields ("iLineaDeProduccionId"));
			$ret->Leer ();
		}
		$rs->Close ();
		
		return $ret;
	}
	
	//---------- Metodos del crud ----------
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM LineaDeProduccion WHERE iLineaDeProduccionId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->codigo = $rs->Fields ("cCodigo");
			$this->descripcionCorta = $rs->Fields ("cDescripcionCorta");
			$this->descripcionLarga = $rs->Fields ("cDescripcionLarga");
			$rs->Close ();
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}

	//
	// Chequea existencia en:
	// - Producto
	// Borra de:
	
	public function Borrar () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT COUNT(p.*) AS cnt
									FROM LineaDeProduccion l
									LEFT OUTER JOIN Producto p ON p.iLineaDeProduccionId = l.iLineaDeProduccionId
									WHERE
										l.iLineaDeProduccionId = $this->id");
			
			if ($rs->Fields ("cnt") == 0) {
				$conn->Execute ("DELETE FROM LineaDeProduccion WHERE iLineaDeProduccionId = $this->id");

			} else {
				$conn->Execute ("UPDATE LineaDeProduccion SET bActivo = " . DB::ToBoolean (false) . " WHERE iLineaDeProduccionId = $this->id");
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
			if (!$this->ChequearCodigoRepetido ('LineaDeProduccion', $this->codigo)) {
				return new RetValue ('El codigo ingresado ya esta siendo utilizado por otro registro');
			}
		
			$conn->Execute ("INSERT INTO LineaDeProduccion (iLineaDeProduccionId
				,cCodigo
				,cDescripcionCorta
				,cDescripcionLarga
				,bActivo
			) VALUES (
				nextval ('seq_linea_de_produccion_id')
				,'$this->codigo'
				,'$this->descripcionCorta'
				,'$this->descripcionLarga'
				, " . DB::ToBoolean (true) . "
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_linea_de_produccion_id');
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
			$conn->Execute ("UPDATE LineaDeProduccion SET $asig WHERE iLineaDeProduccionId = $this->id");			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
