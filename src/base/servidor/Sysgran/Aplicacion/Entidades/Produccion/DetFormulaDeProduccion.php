<?
/**************************************************************************************************
 * Archivo: DetFormulaDeProduccion.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: TODO. En esta clase hay algo raro. Parece que para actualizar se toma el campo $itemId que
 * 				dependiendo de si el detalle referencia a un producto a una toma uno u otro valor.
 * 				Pero esto no se hace asi al crear. Ver que pasa.
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");
require_once ('TipoDetFormulaDeProduccion.php');

class DetFormulaDeProduccion extends EntidadBase {
	public $id;						// Id propio de la clase.
	public $formulaDeProduccionId;	// Id de la formula a la que pertenece este detalle.
	public $tipo;					// Campo calculado
	public $unidadDeMedidaId;		// Unidad de medida asociada.
	public $codigo;					// Codigo del producto o la formula usada.
	public $descripcionCorta;		// Descripcion del producto o formula usado.
	public $itemId;					// Id del producto o formula usado.
	public $cantidadUtilizada;		// Punto flotante.

	public function DetFormulaDeProduccion ($id = null) {
		$this->MapaCampos['unidadDeMedidaId'] 			= 'iUnidadDeMedidaId';
		$this->MapaCampos['cantidadUtilizada'] 			= 'fCantidadUtilizada';
		$this->id = $id;
	}
	
	//---------- Funciones publicas estaticas de la clase ----------		
	
	static function GetDetallesDeFormula ($formulaId) {
		global $conn;

		$rs = $conn->Retrieve ("SELECT dfp.*, 
									rp.cCodigo AS cod_prod,
									rp.cDescripcionCorta AS desc_prod,
									rf.cCodigo AS cod_form,
									rf.cDescripcionCorta AS desc_form
									FROM DetFormulaDeProduccion dfp 
									LEFT OUTER JOIN Producto rp ON (rp.iProductoId = dfp.iProductoUsadoId)
									LEFT OUTER JOIN FormulaDeProduccion rf ON (rf.iFormulaDeProduccionId = dfp.iFormulaUsadaId)
									WHERE 
										dfp.iFormulaDeProduccionId = $formulaId");

		$ret = array ();
		while (!$rs->Eof ()) {
			$item = new DetFormulaDeProduccion ();
			DetFormulaDeProduccion::LeerCamposEntidad ($item, $rs);
			$ret[] = $item;
			
			$rs->Next ();
		}
		
		$rs->Close ();
		
		return $ret;
	}
	
	//---------- Metodos publicos	----------
	
	protected function ActualizarPropiedades ($item) {
		$this->formulaDeProduccionId 	= $item->formulaDeProduccionId;
		$this->tipo						= $item->tipo;
		$this->unidadDeMedidaId			= $item->unidadDeMedidaId;
		$this->cantidadUtilizada		= $item->cantidadUtilizada;
		$this->itemId					= $item->itemId;

		if ($this->tipo == TipoDetFormulaDeProduccion::Formula) {
			$this->productoUsadoId 	= 'null';
			$this->formulaUsadaId	= $item->itemId;
			
		} else {
			$this->formulaUsadaId 	= 'null';
			$this->productoUsadoId	= $item->itemId;
		}
	}

	//---------- Funciones del CRUD ----------
	
	public function Leer () {
		global $conn;
		
		try {		
			$rs = $conn->Retrieve ("SELECT dfp.*, 
									rp.cCodigo AS cod_prod,
									rp.cDescripcionCorta AS desc_prod,
									rf.cCodigo AS cod_form,
									rf.cDescripcionCorta AS desc_form
									FROM DetFormulaDeProduccion dfp 
									LEFT OUTER JOIN Producto rp ON (rp.iProductoId = dfp.iProductoUsadoId)
									LEFT OUTER JOIN FormulaDeProduccion rf ON (rf.iFormulaDeProduccionId = dfp.iFormulaUsadaId)
									WHERE 
										dfp.iFormulaDeProduccionId = $this->formulaDeProduccionId AND 
										dfp.iDetFormulaDeProduccionId = $this->id");

			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}
			
			$this->LeerCamposEntidad ($this, $rs);
			$rs->Close ();
			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}			
	}
	
	private static function LeerCamposEntidad ($item, $rs) {
		$item->id						= $rs->Fields ("iDetFormulaDeProduccionId");
		$item->formulaDeProduccionId 	= $rs->Fields ("iFormulaDeProduccionId");
		$item->unidadDeMedidaId 		= $rs->Fields ("iUnidadDeMedidaId");
		$item->cantidadUtilizada 		= DB::FromFloat ($rs->Fields ("fCantidadUtilizada"));

		if ($rs->Fields ("iProductoUsadoId") != null) {	// Carga de Formula
			$item->itemId			= $rs->Fields ("iProductoUsadoId");
			$item->codigo 			= $rs->Fields ("cod_prod");
			$item->descripcionCorta	= $rs->Fields ("desc_prod");
			$item->tipo 			= TipoDetFormulaDeProduccion::Producto;

		} else {
			$item->itemId			= $rs->Fields ("iFormulaUsadaId");
			$item->codigo 			= $rs->Fields ("cod_form");
			$item->descripcionCorta	= $rs->Fields ("desc_form");
			$item->tipo 			= TipoDetFormulaDeProduccion::Formula;
		}
	}
	
	public function Borrar () {
		global $conn;
		
		try {
			$conn->Execute ("DELETE FROM DetFormulaDeProduccion WHERE iFormulaDeProduccionId = $this->formulaDeProduccionId AND iDetFormulaDeProduccionId = $this->id");
			
			return null;
					
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}			
	}
	
	public function Crear () {
		global $conn;
		
		try {
			$conn->Execute ("INSERT INTO DetFormulaDeProduccion (iDetFormulaDeProduccionId
				,iFormulaDeProduccionId
				,iUnidadDeMedidaId
				,fCantidadUtilizada
				,iProductoUsadoId
				,iFormulaUsadaId
			) VALUES (
				nextval ('seq_det_frmprod_id')
				,$this->formulaDeProduccionId
				,$this->unidadDeMedidaId
				," . DB::ToFloat ($this->cantidadUtilizada) . "
				," . $this->SetNulleableIdValue  ($this->productoUsadoId) . "
				," . $this->SetNulleableIdValue  ($this->formulaUsadaId) . "
			)");

			$this->id = $conn->GetSecuenceLastId ('seq_det_frmprod_id');
			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}

	// Falta
	public function Actualizar ($campos = null) {
		global $conn;

		try {		
			if ($campos != null) {
				$this->ActualizarPropiedades ($campos);
				
				$conn->Execute ("UPDATE DetFormulaDeProduccion 
								SET 
									iUnidadDeMedidaId 	= $this->unidadDeMedidaId, 
									fCantidadUtilizada 	= " . DB::ToFloat ($this->cantidadUtilizada) . ",
									iProductoUsadoId 	= $this->productoUsadoId,
									iFormulaUsadaId		= $this->formulaUsadaId
								WHERE iDetFormulaDeProduccionId = $this->id");	
			}
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
