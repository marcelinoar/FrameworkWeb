<?
/**************************************************************************************************
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
require_once ('TipoContenedor.php');
require_once ('DetalleUbicacionAlmacen.php');

class Contenedor extends EntidadBase {
	public $id;
	public $tipoContenedorId;
	public $codigo;
	public $fechaDeCreacion;
	
	// Informacion de stock
	public $detalleUbicacionAlmacenId;
	public $ubicacionAlmacenId;
	public $almacenId;

	public function Contenedor ($id = null) {
		$this->id = $id;
		$this->tipoContenedorId = TipoContenedor::Creado;
	}
	
	//---------- Funciones Get ----------
	
	public function GetDetalleUbicacion () {
		$ret = null;
	
		if ($this->detalleUbicacionAlmacenId != null) {
			$ret = new DetalleUbicacionAlmacen ($this->detalleUbicacionAlmacenId);
			$ret->Leer ();
		}
		
		return $ret;
	}
	
	//---------- Funciones Estaticas ----------	
	
	public static function GetContenedor ($id) {

		$ret = null;
		if ($id != null) {
			$ret = new Contenedor ($id);
			$ret->Leer ();
		}

		return $ret;
	}
	
	//---------- CRUD ----------
	
	public static function BuscarContenedorPorCodigo ($codigo) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT iContenedorId FROM Contenedor WHERE cCodigo = '$codigo'");
		if ($rs->Eof ()) {
			$ret = null;
			
		} else {
			$ret = new Contenedor ($rs->Fields ("iContenedorId"));
			$ret->Leer ();
		}
		
		return $ret;
	}
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT cCodigo, iTipoContenedorId, TO_CHAR(dFechaDeCreacion, 'DD/MM/YYYY') AS fecha, iAlmacenId, iUbicacionAlmacenId, iDetalleUbicacionAlmacenId 
									FROM Contenedor 
									WHERE 
										iContenedorId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->codigo 						= $rs->Fields ("cCodigo");
			$this->tipoContenedorId 			= $rs->Fields ("iTipoContenedorId");
			$this->fechaDeCreacion 				= $rs->Fields ("fecha");
			$this->almacenId					= $rs->Fields ('iAlmacenId');
			$this->ubicacionAlmacenId 			= $rs->Fields ('iUbicacionAlmacenId');
			$this->detalleUbicacionAlmacenId 	= $rs->Fields ('iDetalleUbicacionAlmacenId');
			
			$rs->Close ();
			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}

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
			$conn->Execute ("INSERT INTO Contenedor (iContenedorId
				,iTipoContenedorId
				,cCodigo
				,dFechaDeCreacion
				,bActivo
			) VALUES (
				nextval ('seq_contenedor_id')
				, $this->tipoContenedorId
				,''
				, CURRENT_TIMESTAMP
				, " . DB::ToBoolean (true) . "
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_contenedor_id');
			
			$this->codigo = $this->GenerarCodigoContenedor ();
			$conn->Execute ("UPDATE Contenedor SET cCodigo = '$this->codigo' WHERE iContenedorId = $this->id");
			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Actualizar () {
		global $conn;
		
		try {
			$conn->Execute ("UPDATE Contenedor 
							SET 
								iTipoContenedorId = $this->tipoContenedorId,
								iAlmacenId = $this->almacenId,
								iUbicacionAlmacenId = $this->ubicacionAlmacenId,
								iDetalleUbicacionAlmacenId = $this->detalleUbicacionAlmacenId
							WHERE
								iContenedorId = $this->id");
								
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}		
	}
	
	private function GenerarCodigoContenedor (){
		return sprintf ("%010d", $this->id);
	}
}
?>
