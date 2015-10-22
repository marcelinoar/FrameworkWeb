<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: HojaDeRuta.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM Hojas de ruta
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");
require_once ("TipoHojaDeRuta.php");
require_once ("OperacionPorHojaDeRuta.php");

class HojaDeRuta extends EntidadBase {
	public $id;
	public $codigo;
	public $descripcionCorta;
	public $descripcionLarga;
	public $operaciones;
	public $tipoHojaDeRutaId;

	public function HojaDeRuta ($id = null) {
		$this->MapaCampos['descripcionCorta'] = 'cDescripcionCorta';
		$this->MapaCampos['descripcionLarga'] = 'cDescripcionLarga';
		$this->id = $id;
	}
	
	//---------- Funciones para setear los valores de los campos relacionados ----------	
	

	public function SetOperaciones ($operaciones) {
		$this->operaciones = $this->MaterializarOperaciones ($operaciones);
	}	
	
	private function MaterializarOperaciones ($arr) {
		$ret = array ();
		
		foreach ($arr as $item) {	
			$obj = new OperacionPorHojaDeRuta ();
			$obj->operacionId 	= $item->operacionId;
			$obj->hojaDeRutaId	= $this->id;
			$obj->nroDeOrden 	= $item->nroDeOrden;

			$ret[] = $obj;
		}
		
		return $ret;
	}

	//---------- Funciones publicas estaticas de la clase ----------
	
	public static function GetHojaDeRutaPorCodigo ($codigo) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT iHojaDeRutaId FROM HojaDeRuta WHERE cCodigo = '$codigo'");

		$ret = null;
		if (!$rs->Eof ()) {
			$ret = new HojaDeRuta ($rs->Fields ("iHojaDeRutaId"));
			$ret->Leer ();
		}
		$rs->Close ();
		
		return $ret;
	}
	
	//---------- Otros metodos publicos de la clase ----------
	
	/**
	 *
	 * Realiza una copia de la hoja de ruta actual cambiando el tipo y el codigo por uno nuevo.
	 * Copia la informacion de la hoja de ruta vinculada a un producto.
	 *
	 * @param	$codigo 	El nuevo codigo
	 * @param	$tipo 		El nuevo tipo
	 * @param	$productoId	Id del producto al que queremos replicarle datos
	 *
	 * @return	Devuelve la nueva hoja de ruta
	 */
	
	public function Copiar ($codigo, $tipo, $productoId) {
		global $conn;
		
		$hdr = new HojaDeRuta ($this->id);
		$hdr->Leer ();
		
		$hdr->codigo = $codigo;
		$hdr->tipoHojaDeRutaId = $tipo;
		
		$hdr->Crear ();
		
		// Copiamos la informacion de DetHojaDeRutaProductoMaquina
		$rs = $conn->Retrieve ("SELECT iOperacionId, iMaquinaId FROM DetHojaDeRutaProductoMaquina WHERE iHojaDeRutaId = $this->id AND iProductoId = $productoId");
		while (!$rs->Eof ()) {
			$det = new DetHojaDeRutaProductoMaquina ($productoId, $rs->Fields ('iOperacionId'), $this->id, $rs->Fields ('iMaquinaId'));
			$det->Leer ();
			$det->hojaDeRutaId = $hdr->id;
			$det->Crear ();
			
			$rs->Next ();
		}
		
		$rs->Close ();
			
		return $hdr;
	}
	
	//---------- Metodos del crud ----------
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM HojaDeRuta WHERE iHojaDeRutaId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->codigo = $rs->Fields ("cCodigo");
			$this->descripcionCorta = $rs->Fields ("cDescripcionCorta");
			$this->descripcionLarga = $rs->Fields ("cDescripcionLarga");
			$this->operaciones = OperacionPorHojaDeRuta::GetOperacionesPorHojaDeRuta ($this->id);
			
			$rs->Close ();
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Borrar () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT COUNT(dh.*) + COUNT(pf.*) + COUNT(ot.*) AS cnt
									FROM HojaDeRuta h
									LEFT OUTER JOIN DetHojaDeRutaProductoMaquina dh ON dh.iHojaDeRutaId = h.iHojaDeRutaId
									LEFT OUTER JOIN ProductoFabricacion pf ON pf.iHojaDeRutaId = h.iHojaDeRutaId
									LEFT OUTER JOIN OrdenDeTrabajo ot ON ot.iHojaDeRutaId = h.iHojaDeRutaId
									WHERE
										h.iHojaDeRutaId = $this->id");
			
			if ($rs->Fields ("cnt") == 0) {
				$conn->Execute ("DELETE FROM HojaDeRuta WHERE iHojaDeRutaId = $this->id");
				$conn->Execute ("DELETE FROM DetHojaDeRuta WHERE iHojaDeRutaId = $this->id");
			
			} else {
				$conn->Execute ("UPDATE HojaDeRuta SET bActivo = " . DB::ToBoolean (false) . " WHERE iHojaDeRutaId = $this->id");
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
			if (!$this->ChequearCodigoRepetido ('HojaDeRuta', $this->codigo)) {
				return new RetValue ('El codigo ingresado ya esta siendo utilizado por otro registro');
			}
		
			$conn->Execute ("INSERT INTO HojaDeRuta (iHojaDeRutaId
				,cCodigo
				,cDescripcionCorta
				,cDescripcionLarga
				,bActivo
				,iTipoHojaDeRutaId
			) VALUES (
				nextval ('seq_hoja_de_ruta_id')
				,'" . strtoupper ($this->codigo) . "'
				,'$this->descripcionCorta'
				,'$this->descripcionLarga'
				," . DB::ToBoolean (true) . "
				,$this->tipoHojaDeRutaId
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_hoja_de_ruta_id');
			
			foreach ($this->operaciones as $item) {
				$item->hojaDeRutaId	= $this->id;
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
			$conn->Execute ("UPDATE HojaDeRuta SET $asig WHERE iHojaDeRutaId = $this->id");			
			$this->ActualizarCamposRelacionMxMConValores ($this->MaterializarOperaciones ($campos['operaciones']), $this->operaciones);		
			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
