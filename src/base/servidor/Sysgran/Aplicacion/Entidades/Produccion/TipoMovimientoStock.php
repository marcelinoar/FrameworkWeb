<?
/**************************************************************************************************
 * Archivo: TipoMovimientoStock.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: 
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");

class TipoMovimientoStock extends EntidadBase {
	public $id;
	public $codigo;
	public $descripcionCorta;
	public $descripcionLarga;
	public $requiereLoteFabricacion;
	public $requiereLoteCompras;
	public $requiereOT;
	public $requiereFormulaDeFabricacion;
	public $requierePVenta;
	public $requiereOCompra;
	public $origenNull;
	public $destinoNull;

	public function TipoMovimientoStock ($id = null) {
		$this->MapaCampos['codigo'] = 'cCodigo';
		$this->MapaCampos['descripcionCorta'] = 'cDescripcionCorta';
		$this->MapaCampos['descripcionLarga'] = 'cDescripcionLarga';
		$this->MapaCampos['requiereLoteFabricacion'] = 'bRequiereLoteFabricacion';
		$this->MapaCampos['requiereLoteCompras'] = 'bRequiereLoteCompras';
		$this->MapaCampos['requiereOT'] = 'bRequiereOT';
		$this->MapaCampos['requiereFormulaDeFabricacion'] = 'bRequiereFormulaDeFabricacion';
		$this->MapaCampos['requierePVenta'] = 'bRequierePVenta';
		$this->MapaCampos['requiereOCompra'] = 'bRequiereOCompra';
		$this->MapaCampos['origenNull'] = 'bOrigenNull';
		$this->MapaCampos['destinoNull'] = 'bDestinoNull';
		$this->id = $id;
	}

	//---------- Funciones Get ----------
	
	public function GetAlmacenesOrigen () {
		global $conn;
		
		
/* DEBUG: Por ahora lo dejamos sin restriccion.		
		$rs = $conn->Retrieve ("SELECT a.iAlmacenId, a.cCodigo 
								FROM AutorizacionMovStockOrigen au
								JOIN Almacen a ON a.iAlmacenId = au.iAlmacenId 
								WHERE 
									au.iUsuarioId = " . Sesion::GetSesion ()->usuarioId . " AND
									au.iTipoMovimientoStockId = $this->id
								ORDER BY a.iAlmacenId ASC");
*/								

		$rs = $conn->Retrieve ("SELECT a.iAlmacenId, a.cCodigo 
								FROM Almacen a
								ORDER BY a.iAlmacenId ASC");

		$ret = array ();
		while (!$rs->Eof ()) {
			$item['almacenId'] = $rs->Fields ('iAlmacenId');
			$item['codigo'] = $rs->Fields ('cCodigo');
			$ret[] = $item;
			
			$rs->Next ();
		}
		
		$rs->Close ();
		
		return $ret;
	}

	public function GetAlmacenesDestino () {
		global $conn;
		
/* DEBUG: Por ahora lo dejamos sin restriccion.				
		$rs = $conn->Retrieve ("SELECT a.iAlmacenId, a.cCodigo 
								FROM AutorizacionMovStockDestino au
								JOIN Almacen a ON a.iAlmacenId = au.iAlmacenId 
								WHERE 
									au.iUsuarioId = " . Sesion::GetSesion ()->usuarioId . " AND
									au.iTipoMovimientoStockId = $this->id
								ORDER BY a.iAlmacenId ASC");
*/								

		$rs = $conn->Retrieve ("SELECT a.iAlmacenId, a.cCodigo 
								FROM Almacen a
								ORDER BY a.iAlmacenId ASC");
								
		$ret = array ();
		while (!$rs->Eof ()) {
			$item['almacenId'] = $rs->Fields ('iAlmacenId');
			$item['codigo'] = $rs->Fields ('cCodigo');
			$ret[] = $item;
			
			$rs->Next ();
		}
		
		$rs->Close ();
		
		return $ret;
	}
	
	//---------- Funciones publicas estaticas de la clase ----------	
	
	public static function GetTipoMovimientoPorCodigo ($codigo) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT iTipoMovimientoStockId FROM TipoMovimientoStock WHERE cCodigo = '$codigo'");
		if (!$rs->Eof ()) {
			$ret = new TipoMovimientoStock ($rs->Fields ("iTipoMovimientoStockId"));
			$ret->Leer ();
		
		} else {
			$ret = null;
		}
		
		$rs->Close ();
		
		return $ret;
	}
	
	// ------------ Otros metodos publicos de la clase ------------
	
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM TipoMovimientoStock WHERE iTipoMovimientoStockId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->codigo = $rs->Fields ("cCodigo");
			$this->descripcionCorta = $rs->Fields ("cDescripcionCorta");
			$this->descripcionLarga = $rs->Fields ("cDescripcionLarga");
			$this->requiereLoteFabricacion = DB::FromBoolean ($rs->Fields ("bRequiereLoteFabricacion"));
			$this->requiereLoteCompras = DB::FromBoolean ($rs->Fields ("bRequiereLoteCompras"));
			$this->requiereOT = DB::FromBoolean ($rs->Fields ("bRequiereOT"));
			$this->requiereFormulaDeFabricacion = DB::FromBoolean ($rs->Fields ("bRequiereFormulaDeFabricacion"));
			$this->requierePVenta = DB::FromBoolean ($rs->Fields ("bRequierePVenta"));
			$this->requiereOCompra = DB::FromBoolean ($rs->Fields ("bRequiereOCompra"));
			$this->origenNull = DB::FromBoolean ($rs->Fields ("bOrigenNull"));
			$this->destinoNull = DB::FromBoolean ($rs->Fields ("bDestinoNull"));
			$rs->Close ();
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Borrar () {
		global $conn;
		
		try {
			$conn->Execute ("DELETE FROM TipoMovimientoStock WHERE iTipoMovimientoStockId = $this->id");
			
			return null;
					
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Crear () {
		global $conn;
		
		try {
			$conn->Execute ("INSERT INTO TipoMovimientoStock (
				iTipoMovimientoStockId
				,cCodigo
				,cDescripcionCorta
				,cDescripcionLarga
				,bRequiereLoteFabricacion
				,bRequiereLoteCompras
				,bRequiereOT
				,bRequiereFormulaDeFabricacion
				,bRequierePVenta
				,bRequiereOCompra
				,bOrigenNull
				,bDestinoNull
				,bActivo
				,bHabilitaCargaManual
			) VALUES (
				nextval ('seq_tip_mov_stock_id')
				,'$this->codigo'
				,'$this->descripcionCorta'
				,'$this->descripcionLarga'
				," . DB::ToBoolean ($this->requiereLoteFabricacion) . "
				," . DB::ToBoolean ($this->requiereLoteCompras) . "
				," . DB::ToBoolean ($this->requiereOT) . "
				," . DB::ToBoolean ($this->requiereFormulaDeFabricacion) . "
				," . DB::ToBoolean ($this->requierePVenta) . "
				," . DB::ToBoolean ($this->requiereOCompra) . "
				," . DB::ToBoolean ($this->origenNull) . "
				," . DB::ToBoolean ($this->destinoNull) . "
				," . DB::ToBoolean (true) . "
				," . DB::ToBoolean (true) . "
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_tip_mov_stock_id');
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
			$conn->Execute ("UPDATE TipoMovimientoStock SET $asig WHERE iTipoMovimientoStockId = $this->id");			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
