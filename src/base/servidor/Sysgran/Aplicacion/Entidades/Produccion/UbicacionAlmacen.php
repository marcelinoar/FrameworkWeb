<?
/**************************************************************************************************
 * Archivo: UbicacionAlmacen.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Ubicaciones
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");
require_once ('Sysgran/Aplicacion/Entidades/Produccion/AreaStock.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/ZonaStock.php');

class UbicacionAlmacen extends EntidadBase {
	public $id;
	public $codigo;
	public $almacenId;
	public $zonaStockId;
	public $areaStockId;
	public $descripcion;

	public function UbicacionAlmacen ($id = null) {
		$this->MapaCampos['codigo'] = 'cCodigo';
		$this->MapaCampos['almacenId'] = 'iAlmacenId';
		$this->MapaCampos['zonaStockId'] = 'iZonaStockId';
		$this->MapaCampos['areaStockId'] = 'iAreaStockId';
		$this->MapaCampos['descripcion'] = 'cDescripcion';
		$this->id = $id;
	}
	
	//---------- Metodos GET ----------
	
	public function GetZona () {
		$ret = new ZonaStock ($this->zonaStockId);
		$ret->Leer ();
		
		return $ret;
	}

	public function GetArea () {
		$ret = new AreaStock ($this->areaStockId);
		$ret->Leer ();
		
		return $ret;
	}
	
	public function TieneProducto ($productoId) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT COUNT(*) AS cnt 
								FROM DetalleUbicacionAlmacen 
								WHERE
									iUbicacionAlmacenId = $this->id AND
									iAlmacenId = $this->almacenId AND
									iProductoId = $productoId");
									
		$ret = $rs->Fields ('cnt') > 0;
		$rs->Close ();
		
		return $ret;
	}

	//---------- Funciones estaticas ----------

	public static function GetUbicacion ($id) {
		$ret = new UbicacionAlmacen ($id);
		$ret->Leer ();
		
		return $ret;
	}

	public static function GetUbicacionAlmacenPorCodigo ($codigo) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT iUbicacionAlmacenId FROM UbicacionAlmacen WHERE cCodigo = '$codigo'");
			
		$ret = null;
		if (!$rs->Eof ()) {
			$ret = new UbicacionAlmacen ($rs->Fields ("iUbicacionAlmacenId"));
			$ret->Leer ();
		}
		$rs->Close ();
		
		return $ret;			
	}
	
	//---------- CRUD ----------	
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM UbicacionAlmacen WHERE iUbicacionAlmacenId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->codigo = $rs->Fields ("cCodigo");
			$this->almacenId = $rs->Fields ("iAlmacenId");
			$this->zonaStockId = $rs->Fields ("iZonaStockId");
			$this->areaStockId = $rs->Fields ("iAreaStockId");
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
			$rs = $conn->Retrieve ("SELECT COUNT(u.*) AS cnt
									FROM UbicacionAlmacen a
									LEFT OUTER JOIN DetalleUbicacionAlmacen u ON u.iUbicacionAlmacenId = a.iUbicacionAlmacenId
									WHERE 
										a.iUbicacionAlmacenId = $this->id");
										
			if ($rs->Fields ("cnt") == 0) {
				$conn->Execute ("DELETE FROM UbicacionAlmacen WHERE iUbicacionAlmacenId = $this->id");
			
			} else {
				$conn->Execute ("UPDATE UbicacionAlmacen SET bActivo = " . DB::ToBoolean (false) . " WHERE iUbicacionAlmacenId = $this->id");
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
			$conn->Execute ("INSERT INTO UbicacionAlmacen (iUbicacionAlmacenId
				,cCodigo
				,iAlmacenId
				,iZonaStockId
				,iAreaStockId
				,cDescripcion
				,bActivo
			) VALUES (
			nextval ('seq_ubic_alm_id')
				,'$this->codigo'
				,$this->almacenId
				,$this->zonaStockId
				,$this->areaStockId
				,'$this->descripcion'
				," . DB::ToBoolean (true) . "
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_ubic_alm_id');
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
			$conn->Execute ("UPDATE UbicacionAlmacen SET $asig WHERE iUbicacionAlmacenId = $this->id");			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
