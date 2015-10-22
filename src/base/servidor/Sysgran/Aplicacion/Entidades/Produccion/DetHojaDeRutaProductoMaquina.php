<?
/**************************************************************************************************
 * Archivo: DetHojaDeRutaProductoMaquina.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Representa una conversion de unidades de medida para un producto. Es una clase con
 * 				doble clave, no tiene campo Id.
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");

class DetHojaDeRutaProductoMaquina extends EntidadBase {
	// Estas son las claves
	public $operacionId;
	public $productoId;
	public $hojaDeRutaId;	
	public $maquinaId;

	// Campos de datos	
	public $tiempoTrabajo;
	public $tiempoPreparacion;
	public $cntOperTrabajo;
	public $cntOperPreparacion;
	public $kgDeMerma;
	public $kgDeRecorte;
	public $codigoOperacion;				// Codigo de la operacion. Solo para mostrar
	public $codigoMaqina;					// Idem.
	public $nroDeOrden;						// Esto viene de la tabla DetHojaDeRuta
	
	public function DetHojaDeRutaProductoMaquina ($productoId = null, $operacionId = null, $hojaDeRutaId = null, $maquinaId = null) {
		$this->productoId 	= $productoId;
		$this->operacionId 	= $operacionId;
		$this->hojaDeRutaId = $hojaDeRutaId;
		$this->maquinaId	= $maquinaId;
	}
	
	//---------- Funciones publicas estaticas de la clase ----------
	
	public static function GetDetallesProducto ($productoId) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT dp.*, o.cCodigo AS codigo_operacion, m.cCodigo AS codigo_maquina
								FROM DetHojaDeRutaProductoMaquina dp
								LEFT OUTER JOIN Operacion o ON dp.iOperacionId = o.iOperacionId
								LEFT OUTER JOIN Maquina m ON m.iMaquinaId = dp.iMaquinaId
								WHERE 
									dp.iProductoId = $productoId");
									
		$ret = array ();
		while (!$rs->Eof ()) {
			$item = new DetHojaDeRutaProductoMaquina ($productoId, $rs->Fields ("iOperacionId"), $rs->Fields ("iHojaDeRutaId"), $rs->Fields ("iMaquinaId"));
			$item->SetPropiedades ($rs);

			$ret[] = $item;
			$rs->Next ();
		}
		$rs->Close ();
		
		return $ret;
	}
	//---------- Metodos del CRUD ----------
	
	/**
	 *
	 * Indica si un objeto comparte las mismas claves que this
	 *
	 * @param	$obj Objeto a chequear
	 *
	 * @return	Devuelve true si las claves son iguales, false de lo contrario
	 */
	public function EsEquivalente ($obj) {
		return ($this->productoId 		== $obj->productoId 
				&& $this->hojaDeRutaId 	== $obj->hojaDeRutaId 
				&& $this->operacionId 	== $obj->operacionId 
				&& $this->maquinaId 	== $obj->maquinaId);
	}

	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT dp.*, o.cCodigo AS codigo_operacion, m.cCodigo AS codigo_maquina
									FROM DetHojaDeRutaProductoMaquina dp
									LEFT OUTER JOIN Operacion o ON dp.iOperacionId = o.iOperacionId
									LEFT OUTER JOIN Maquina m ON m.iMaquinaId = dp.iMaquinaId
									WHERE
										dp.iMaquinaId = $this->maquinaId AND
										dp.iProductoId = $this->productoId AND
										dp.iOperacionId = $this->operacionId AND
										dp.iHojaDeRutaId = $this->hojaDeRutaId");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}
			
			$this->SetPropiedades ($rs);
			
			$rs->Close ();
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	private function SetPropiedades ($rs) {
		$this->tiempoTrabajo 		= DB::FromFloat ($rs->Fields ('fTiempoTrabajo'));
		$this->tiempoPreparacion	= DB::FromFloat ($rs->Fields ("fTiempoPreparacion"));
		$this->cntOperTrabajo		= $rs->Fields ("iCntOperTrabajo");
		$this->cntOperPreparacion	= $rs->Fields ("iCntOperPreparacion");
		$this->kgDeMerma			= DB::FromFloat ($rs->Fields ("fKgDeMerma"));
		$this->kgDeRecorte			= DB::FromFloat ($rs->Fields ("fKgDeRecorte"));
		$this->codigoOperacion		= $rs->Fields ("codigo_operacion");
		$this->codigoMaquina		= $rs->Fields ("codigo_maquina");
	}
	
	public function Borrar () {
		global $conn;
		
		try {
			$conn->Execute ("DELETE FROM DetHojaDeRutaProductoMaquina
							WHERE 
								iMaquinaId		= $this->maquinaId AND
								iOperacionId = $this->operacionId AND 
								iHojaDeRutaId = $this->hojaDeRutaId AND 
								iProductoId = $this->productoId");
			
			return null;
					
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Crear () {
		global $conn;
		
		try {
			$conn->Execute ("INSERT INTO DetHojaDeRutaProductoMaquina (iOperacionId
				,iHojaDeRutaId
				,iProductoId
				,iMaquinaId
				,fTiempoTrabajo
				,fTiempoPreparacion
				,iCntOperTrabajo
				,iCntOperPreparacion
				,fKgDeMerma
				,fKgDeRecorte
			) VALUES (
				$this->operacionId
				,$this->hojaDeRutaId
				,$this->productoId
				,$this->maquinaId
				," . DB::ToFloat ($this->tiempoTrabajo) . "
				," . DB::ToFloat ($this->tiempoPreparacion) . "
				,$this->cntOperTrabajo
				,$this->cntOperPreparacion
				," . DB::ToFloat ($this->kgDeMerma) . "
				," . DB::ToFloat ($this->kgDeRecorte) . "
			)");
		
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Actualizar ($campos = null) {
		global $conn;
		
		try {
			$conn->Execute ("UPDATE DetHojaDeRutaProductoMaquina
							SET 
								fTiempoTrabajo = " . DB::ToFloat ($this->tiempoTrabajo) . ",
								fTiempoPreparacion = " . DB::ToFloat ($this->tiempoPreparacion) . ",
								iCntOperTrabajo = $this->cntOperTrabajo,
								iCntOperPreparacion = $this->cntOperPreparacion,
								fKgDeMerma = " . DB::ToFloat ($this->kgDeMerma) . ",
								fKgDeRecorte = " . DB::ToFloat ($this->kgDeRecorte) . "
							WHERE 
								iOperacionId = $this->operacionId AND 
								iMaquinaId = $this->maquinaId AND
								iHojaDeRutaId = $this->hojaDeRutaId AND
								iProductoId = $this->productoId");			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
