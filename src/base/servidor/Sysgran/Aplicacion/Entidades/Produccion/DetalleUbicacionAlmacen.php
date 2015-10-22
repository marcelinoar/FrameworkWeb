<?
/**************************************************************************************************
 * Archivo: DetalleUbicacionAlmacen.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: 
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");
require_once ('Sysgran/Aplicacion/Entidades/Produccion/UbicacionAlmacen.php');

class DetalleUbicacionAlmacen extends EntidadBase {
	public $id;
	public $ubicacionAlmacenId;
	public $almacenId;
	public $contenedorId;
	public $productoId;
	public $cantidad;
	public $nroDeDetalle;		// Este es como el codigo
	
	public function DetalleUbicacionAlmacen ($id = null) {
		$this->id = $id;
	}
	
	//---------- Metodos estaticos ----------
	
	public static function GetDetalleUbicacionPorCodigo ($codigo, $almacenId, $ubicacionId) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT iDetalleUbicacionAlmacenId 
								FROM DetalleUbicacionAlmacen 
								WHERE 
									iAlmacenId = $almacenId AND
									iUbicacionAlmacenId = $ubicacionId AND
									iNroDeDetalle = $codigo");

		$ret = null;
		if (!$rs->Eof ()) {
			$ret = new DetalleUbicacionAlmacen ($rs->Fields ("iDetalleUbicacionAlmacenId"));
			$ret->Leer ();
		}
		$rs->Close ();
		
		return $ret;
	}
	
	public static function GetDetalleUbicacion ($id) {
		$ret = new DetalleUbicacionAlmacen ($id);
		
		if ($ret->Leer () != null) {
			return null;
		
		} else {
			return $ret;
		}
	}
	
	//---------- CRUD ----------
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM DetalleUbicacionAlmacen WHERE iDetalleUbicacionAlmacenId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->ubicacionAlmacenId 	= $rs->Fields ('iUbicacionAlmacenId');
			$this->almacenId			= $rs->Fields ('iAlmacenId');
			$this->contenedorId			= $rs->Fields ('iContenedorId');
			$this->productoId			= $rs->Fields ('iProductoId');
			$this->cantidad				= $rs->Fields ('fCantidad');
			$this->nroDeDetalle			= $rs->Fields ('iNroDeDetalle');
			
			$rs->Close ();
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}

	public function Borrar () {
		global $conn;
		
		try {
			$conn->Execute ("DELETE FROM DetalleUbicacionAlmacen WHERE iDetalleUbicacionAlmacenId = $this->id");
			return null;
					
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}	
	}
	
	public function Crear () {
		global $conn;
		
		try {
			$conn->Execute ("INSERT INTO DetalleUbicacionAlmacen (
				iDetalleUbicacionAlmacenId
				,iUbicacionAlmacenId
				,iAlmacenId
				,iContenedorId
				,iProductoId
				,fCantidad
				,iNroDeDetalle
			) VALUES (
				nextval ('seq_det_ubicacion_id')
				,$this->ubicacionAlmacenId
				,$this->almacenId
				," . $this->SetNulleableIdValue  ($this->contenedorId) . "
				," . $this->SetNulleableIdValue  ($this->productoId) . "
				," . DB::ToFloat ($this->cantidad) . "
				," . $this->GenerarNroDeDetalle () . "
			)");

			$this->id = $conn->GetSecuenceLastId ('seq_det_ubicacion_id');
			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}	
	}
	
	private function GenerarNroDeDetalle () {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT MAX(iNroDeDetalle) AS nro
								FROM DetalleUbicacionAlmacen 
								WHERE 
									iAlmacenId = $this->almacenId AND
									iUbicacionAlmacenId = $this->ubicacionAlmacenId");
		
		if ($rs->Fields ('nro') != null) {
			$ret = $rs->Fields ('nro') + 1;
		
		} else {
			$ret = 1;
		}
		
		$rs->Close ();
		
		return $ret;
	}
}
?>
