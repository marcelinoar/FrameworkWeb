<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: FormulaDeProduccion.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Formulas de Produccion
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ('Sysgran/Core/Php/EntidadBase.php');
require_once ('TipoFormulaDeProduccion.php');
require_once ('DetFormulaDeProduccion.php');

class FormulaDeProduccion extends EntidadBase {
	public $id;
	public $codigo;
	public $descripcionCorta;
	public $descripcionLarga;
	public $tipoFormulaDeProduccionId;
	
	public $detalles = array ();	

	public function FormulaDeProduccion ($id = null) {
		$this->MapaCampos['codigo'] 			= 'cCodigo';
		$this->MapaCampos['descripcionCorta'] 	= 'cDescripcionCorta';
		$this->MapaCampos['descripcionLarga'] 	= 'cDescripcionLarga';
		$this->id = $id;
	}
	
	//---------- Funciones para setear los valores de los campos relacionados ----------	
	
	public function SetDetalles ($arr) {
		$this->detalles = array ();
		
		foreach ($arr as $item) {	
			$obj = new DetFormulaDeProduccion ($item->id);
			$obj->ActualizarPropiedades ($item);
			
			$this->detalles[] = $obj;
		}
	}	

	//---------- Funciones publicas estaticas de la clase ----------
	
	public static function GetFormulasDeProducto($producto_id) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT fp.*, (prod.iFormulaDeProduccionId is not null) AS es_formula_principal
								FROM FormulaDeProduccionProducto fpp
								LEFT OUTER JOIN ProductoFabricacion prod ON (prod.iProductoId = fpp.iProductoId AND prod.iFormulaDeProduccionId = fpp.iFormulaDeProduccionId)
								JOIN FormulaDeProduccion fp ON fpp.iFormulaDeProduccionId = fp.iFormulaDeProduccionId
								WHERE
									fpp.iProductoId = $producto_id");

		$ret = array ();
		while (!$rs->Eof ()) {
			$item = new FormulaDeProduccion ($rs->Fields ("iFormulaDeProduccionId"));
			
			FormulaDeProduccion::CargarRegistro ($rs, $item);
			
			// Agregamos a la entidad este campo que es util en la lista de formulas del producto
			$item->esFormulaPrincipal = DB::FromBoolean ($rs->Fields ('es_formula_principal'));			
			
			$ret[] = $item;
			$rs->Next ();
		}
		$rs->Close ();
		
		return $ret;
	}
	
	public static function GetFormulaDeProduccionPorCodigo ($codigo) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT iFormulaDeProduccionId FROM FormulaDeProduccion WHERE cCodigo = '$codigo'");

		$ret = null;
		if (!$rs->Eof ()) {
			$ret = new FormulaDeProduccion ($rs->Fields ("iFormulaDeProduccionId"));
			$ret->Leer ();
		}
		$rs->Close ();
		
		return $ret;
	}	

	//---------- Otros metodos publicos de la clase ----------
	
	/**
	 *
	 * Recorre recursivamente la formula y devuelve una vision achatada de la misma con todos los componentes que se encuentran
	 * en alguno de los niveles inferiores sin mostrar las formulas. Ademas hace el calculo de cantidades necesarias para produccion.
	 *
	 * @param	$cantidad Cantidad de formula indicada. Es numerico, no es un string.
	 *
	 * @return	Devuelve un array asociativo con las propiedades de los productos que la componen
	 */
	
	public function GetListaDeMateriales ($cantidad) {
		$lista = array ();

		$this->RecorrerFormula ($lista, $this->id, $cantidad);
		
		return $lista;
	}
	
	//---------- Metodos privados de la clase ----------

	//	
	// Recorre recursivamente la formula calculando las cantidades necesarias para produccion.
	// Va agregando los resultados en $lista_ret.
	//	
	private function RecorrerFormula (&$lista_ret, $formula_id, $cantidad) {
		$lista = $this->GetDetalleFormula ($formula_id);

		foreach ($lista as $item) {
			if ($item['formulaId'] != null) {
				$this->RecorrerFormula ($lista_ret, $item['formulaId'], $item['cantidad'] * $cantidad);	

			} else {
				$this->AgregarProducto ($lista_ret, $item, $cantidad);
			}
		}
	}

	//
	// Es parte del calculo de materiales necesarios por formula. Agrega un item a la lista de
	// resultados devueltos.
	//
	private function AgregarProducto (&$lista_ret, $item, $cantidad) {
		// Tenemos que formatear el resultado de la multiplicacion como un string que represente
		// a un numero de 4 cifras (decimales) antes de pasarlo a DB::FromFloat.
		$item['cantidad'] = DB::FromFloat (number_format ($item['cantidad'] * $cantidad, 4, ',', ''));
		
		$lista_ret[] = $item;
	}
	
	//
	// Parte del calculo de materiales necesarios por formula. Devuelve el detalle de una subformula dada.
	//
	private function GetDetalleFormula ($formula_id) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT d.iUnidadDeMedidaId, d.iProductoUsadoId, d.iFormulaUsadaId, d.fCantidadUtilizada, p.cCodigo AS cod_prod, 
								p.cDescripcionCorta AS desc_prod, u.cCodigo AS cod_um
								FROM DetFormulaDeProduccion d
								LEFT OUTER JOIN Producto p ON p.iProductoId = d.iProductoUsadoId 
								LEFT OUTER JOIN UnidadDeMedida u ON d.iUnidadDeMedidaId = u.iUnidadDeMedidaId
								WHERE 
									iFormulaDeProduccionId = $formula_id");
		
		$ret = array ();
		while (!$rs->Eof ()) {
			$item['unidadDeMedidaId'] 		= $rs->Fields ("iUnidadDeMedidaId");
			$item['productoId'] 			= $rs->Fields ("iProductoUsadoId");
			$item['formulaId'] 				= $rs->Fields ("iFormulaUsadaId");
			
			// Mantenemos el formato numerico para poder hacer los calculos
			$item['cantidad'] 				= $rs->Fields ("fCantidadUtilizada");	
			$item['cantidadUnitaria'] 		= $rs->Fields ("fCantidadUtilizada");
			$item['codigoProducto']			= $rs->Fields ("cod_prod");
			$item['descripcionProducto']	= $rs->Fields ("desc_prod");
			$item['codigoUnidadDeMedida']	= $rs->Fields ("cod_um");
			
			$ret[] = $item;
			$rs->Next ();
		}
		
		$rs->Close ();
		
		return $ret;
	}	

	//---------- Funciones del CRUD ----------
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM FormulaDeProduccion WHERE iFormulaDeProduccionId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}
			
			FormulaDeProduccion::CargarRegistro ($rs, $this);
			$this->detalles = DetFormulaDeProduccion::GetDetallesDeFormula ($this->id);
			$rs->Close ();
			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}

	private static function CargarRegistro ($rs, $obj) {
		$obj->codigo 			= $rs->Fields ("cCodigo");
		$obj->descripcionCorta 	= $rs->Fields ("cDescripcionCorta");
		$obj->descripcionLarga 	= $rs->Fields ("cDescripcionLarga");
		$obj->detalles			= array ();
	}
	
	public function Borrar () {
		global $conn;

		try {
			$rs = $conn->Retrieve ("SELECT COUNT(ot.*) + COUNT(l.*) + COUNT(dfp.*) AS cnt
									FROM FormulaDeProduccion f
									LEFT OUTER JOIN OrdenDeTrabajo ot ON ot.iFormulaDeProduccionId = f.iFormulaDeProduccionId
									LEFT OUTER JOIN LoteDeFabricacion l ON l.iFormulaDeProduccionId = f.iFormulaDeProduccionId
									LEFT OUTER JOIN DetFormulaDeProduccion dfp ON dfp.iFormulaUsadaId = f.iFormulaDeProduccionId
									WHERE
										f.iFormulaDeProduccionId = $this->id");
			
			if ($rs->Fields ("cnt") == 0) {
				$this->BorradoReal ();
				
			} else {
				$conn->Execute ("UPDATE FormulaDeProduccion SET bActivo = " . DB::ToBoolean (false) . " WHERE iFormulaDeProduccionId = $this->id");
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
			if (!$this->ChequearCodigoRepetido ('FormulaDeProduccion', $this->codigo)) {
				return new RetValue ('El codigo ingresado ya esta siendo utilizado por otro registro');
			}
		
			$conn->Execute ("INSERT INTO FormulaDeProduccion (iFormulaDeProduccionId
				,cCodigo
				,cDescripcionCorta
				,cDescripcionLarga
				,bActivo
				,iTipoFormulaDeProduccionId
			) VALUES (
				nextval ('seq_formula_de_produccion_id')
				,'$this->codigo'
				,'$this->descripcionCorta'
				,'$this->descripcionLarga'
				," . DB::ToBoolean (true) . "
				,$this->tipoFormulaDeProduccionId
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_formula_de_produccion_id');
			
			foreach ($this->detalles as $item) {
				$item->formulaDeProduccionId = $this->id;
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
			$conn->Execute ("UPDATE FormulaDeProduccion SET $asig WHERE iFormulaDeProduccionId = $this->id");			
			
			$this->ActualizarCamposRelacionados ($campos, "detalles", "formulaDeProduccionId", "DetFormulaDeProduccion"); 					
			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
	
	/**
	 *
	 * Borra la instancia de la base de datos.
	 *
	 */
	public function BorradoReal () {
		global $conn;
		
		$conn->Execute ("DELETE FROM FormulaDeProduccionProducto WHERE iFormulaDeProduccionId = $this->id");
		$conn->Execute ("DELETE FROM DetFormulaDeProduccion WHERE iFormulaDeProduccionId = $this->id");
		$conn->Execute ("DELETE FROM FormulaDeProduccion WHERE iFormulaDeProduccionId = $this->id");
	}
}
?>
