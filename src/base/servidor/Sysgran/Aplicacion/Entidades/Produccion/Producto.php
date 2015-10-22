<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: Producto.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Productos
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");
require_once ("FormulaDeProduccion.php");
require_once ("ValorAtributoProducto.php");
require_once ("UnidadAlternativaDeProducto.php");
require_once ("DetHojaDeRutaProductoMaquina.php");
require_once ("LineaDeProduccion.php");
require_once ("UnidadDeMedida.php");
require_once ("Almacen.php");
require_once ("CentroDeTrabajo.php");
require_once ("HojaDeRuta.php");
require_once ("TipoDeProducto.php");
require_once ("DetProductoAlmacen.php");

class Producto extends EntidadBase {
	public $id;
	public $codigo;
	public $tipoDeProductoId;
	public $lineaDeProduccionId;
	public $unidadDeMedidaStockId;
	public $agrupadorProductoPrimarioId;
	public $agrupadorProductoSecundarioId;
	public $agrupadorProductoTerciarioId;
	public $descripcionCorta;
	public $descripcionLarga;
	public $almacenDestinoId;
	public $productoSecundarioId;
	public $unidadDeMedidaFabricacionId;
	public $centroDeTrabajoId;
	public $hojaDeRutaId;
	public $formulaDeProduccionId;
	
	// Relaciones
	public $atributos;
	public $unidadesAlternativas;
	public $formulas;
	public $operaciones;
	public $productoAlmacen;

	public function Producto ($id = null) {
		$this->MapaCampos['tipoDeProductoId'] = 'iTipoDeProductoId';
		$this->MapaCampos['lineaDeProduccionId'] = 'iLineaDeProduccionId';
		$this->MapaCampos['unidadDeMedidaStockId'] = 'iUnidadDeMedidaStockId';
		$this->MapaCampos['agrupadorProductoPrimarioId'] = 'iAgrupadorProductoPrimarioId';
		$this->MapaCampos['agrupadorProductoSecundarioId'] = 'iAgrupadorProductoSecundarioId';
		$this->MapaCampos['agrupadorProductoTerciarioId'] = 'iAgrupadorProductoTerciarioId';
		$this->MapaCampos['descripcionCorta'] = 'cDescripcionCorta';
		$this->MapaCampos['descripcionLarga'] = 'cDescripcionLarga';
		$this->id = $id;
	}
	
	//---------- Funciones para setear los valores de los campos relacionados ----------		

	public function SetFormulas ($formulas) {
		$this->formulas = $formulas;
	}	
	
	public function SetAtributos ($atributos) {
		$this->atributos = $this->MaterializarAtributos ($atributos);
	}
	
	private function MaterializarAtributos ($atributos) {
		$ret = array ();
		
		foreach ($atributos as $item) {	
			$obj = new ValorAtributoProducto ($this->id, $item->atributoProductoId);
			$obj->valor = $item->valor;
			
			$ret[] = $obj;
		}
		
		return $ret;
	}
	
	public function SetUnidadesAlternativas ($unid) {
		$this->unidadesAlternativas = $this->MaterializarUnidadesAlternativas ($unid);
	}
	
	private function MaterializarUnidadesAlternativas ($unid) {
		$ret = array ();
		
		foreach ($unid as $item) {	
			$obj = new UnidadAlternativaDeProducto ($this->id, $item->unidadOrigenId, $item->unidadDestinoId);
			$obj->factorDeConversion = $item->factorDeConversion;
			
			$ret[] = $obj;
		}
		
		return $ret;
	}

	public function SetOperaciones ($arr) {
		$this->operaciones = $this->MaterializarOperaciones ($arr);
	}
	
	public function SetProductoAlmacen ($arr) {
		$this->productoAlmacen = $this->MaterializarProductoAlmacen ($arr);
	}
	
	private function MaterializarOperaciones ($arr) {
		$ret = array ();
		
		foreach ($arr as $item) {	
			$obj = new DetHojaDeRutaProductoMaquina ($this->id, $item->operacionId, $item->hojaDeRutaId, $item->maquinaId);
			$obj->tiempoTrabajo 		= $item->tiempoTrabajo;
			$obj->tiempoPreparacion		= $item->tiempoPreparacion;
			$obj->cntOperTrabajo		= $item->cntOperTrabajo;
			$obj->cntOperPreparacion	= $item->cntOperPreparacion;
			$obj->kgDeMerma				= $item->kgDeMerma;
			$obj->kgDeRecorte			= $item->kgDeRecorte;
			
			$ret[] = $obj;
		}
		
		return $ret;
	}

	private function MaterializarProductoAlmacen ($arr) {
		$ret = array ();
		
		foreach ($arr as $item) {	
			$obj = new DetProductoAlmacen ($this->id, $item->almacenId);
			$obj->stockCritico			= $item->stockCritico;
			$obj->puntoDePedido			= $item->puntoDePedido;
			
			$ret[] = $obj;
		}
		
		return $ret;
	}

	//---------- Metodos para obtener objetos relacionados ----------
	
	public function GetLineaDeProduccion () {
		if ($this->lineaDeProduccionId != null) {
			$ret = new LineaDeProduccion ($this->lineaDeProduccionId);
			$ret->Leer ();
			return $ret;
		
		} else {
			return null;
		}
	}

	public function GetUMStock () {
		if ($this->unidadDeMedidaStockId != null) {
			$ret = new UnidadDeMedida ($this->unidadDeMedidaStockId);
			$ret->Leer ();
			return $ret;
			
		} else {
			return null;
		}
	}
	
	public function GetUMFabricacion () {
		if ($this->unidadDeMedidaFabricacionId != null) {
			$ret = new UnidadDeMedida ($this->unidadDeMedidaFabricacionId);
			$ret->Leer ();
			return $ret;

		} else {
			return null;
		}
	}	
	
	public function GetAlmacenDestino () {
		if ($this->almacenDestinoId != null) {
			$ret = new Almacen ($this->almacenDestinoId);
			$ret->Leer ();
			return $ret;
			
		} else {
			return null;
		}
	}	
	
	public function GetCentroDeTrabajo () {
		if ($this->centroDeTrabajoId != null) {
			$ret = new CentroDeTrabajo ($this->centroDeTrabajoId);
			$ret->Leer ();
			return $ret;
			
		} else {
			return null;
		}
	}	
	
	public function GetHojaDeRuta () {
		if ($this->hojaDeRutaId != null) {
			$ret = new HojaDeRuta ($this->hojaDeRutaId);
			$ret->Leer ();
			return $ret;
			
		} else {
			return null;
		}
	}
	
	public function GetTipoDeProducto () {
		if ($this->tipoDeProductoId != null) {
			$ret = new TipoDeProducto ($this->tipoDeProductoId);
			$ret->Leer ();
			$ret->SetValoresBooleanos ();
			
			return $ret;
		
		} else {
			return null;
		}
	}
	
	public function GetProductoSecundario () {
		if ($this->productoSecundarioId != null) {
			$ret = new Producto ($this->productoSecundarioId);
			$ret->Leer ();
		
			return $ret;
			
		} else {
			return null;
		}
	}
	
	//
	// Devuelve el Id de la formula principal o null.
	//
	public function GetFormulaPrincipal ($campos = null) {
		$ret = null;
		
		// Buscamos las formulas en las propiedades del objeto
		if ($campos == null) {
			$formulas = $this->formulas;
		
		// Sino las tomamos del array de propiedades recibido
		} else {
			$formulas = $campos['formulas'];
		}
		
		foreach ($formulas as $item) {
			if ($item->esFormulaPrincipal) {
				$ret = $item->id;
			}
		}
		
		return $ret;
	}
	
	//---------- Funciones publicas estaticas de la clase ----------	
	
	public static function GetProductoPorCodigo ($codigo) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT iProductoId FROM Producto WHERE cCodigo = '$codigo'");
		if (!$rs->Eof ()) {
			$ret = new Producto ($rs->Fields ("iProductoId"));
			$ret->Leer ();
		
		} else {
			$ret = null;
		}
		
		$rs->Close ();
		
		return $ret;
	}
	
	public static function GetProducto ($productoId) {
		$ret = new Producto ($productoId);
		
		$ret_val = $ret->Leer ();
		if ($ret_val != null) {
			return null;
		
		} else {
			return $ret;
		}
	}
	
	// ------------ Otros metodos publicos de la clase ------------
	
	//
	// Intenta calcular la cantidad a fabricar utilizando las conversiones de unidad de medida cargadas.
	// Si no existen las necesarias devuelve null. De lo contrario la cantidad solicitada.
	//
	public function CalcularCantidadFabricacion ($cantidad, $um_dest) {
		$um_fab = $this->unidadDeMedidaFabricacionId;
		
		return $this->ConvertirCantidad ($cantidad, $um_fab, $um_dest);
/*		
		// Si recibo los datos en la unidad de fabricacion no hay que hacer ninguna conversion.
		if ($um_fab == $um_dest) {
			return $cantidad;
		
		} else {
			// Primero intento buscar en la tabla de conversion al derecho y multiplico.
			foreach ($this->unidadesAlternativas as $item) {
				if ($item->unidadOrigenId == $um_dest && $item->unidadDestinoId == $um_fab) {
					return $cantidad * Lib::DevolverNumero ($item->factorDeConversion);
				}
			}
			
			// Si no lo encuentro busco al reves y divido.
			foreach ($this->unidadesAlternativas as $item) {
				if ($item->unidadOrigenId == $um_fab && $item->unidadDestinoId == $um_dest) {
					return $cantidad / Lib::DevolverNumero ($item->factorDeConversion);
				}
			}
		}
		
		// Si no encuentra nada devuelve null
		return null;
*/		
	}
	
	public function ConvertirCantidad ($cantidad, $um_orig, $um_dest) {
		// Si recibo los datos en la unidad de fabricacion no hay que hacer ninguna conversion.
		if ($um_orig == $um_dest) {
			return $cantidad;
		
		} else {
			// Primero intento buscar en la tabla de conversion al derecho y multiplico.
			foreach ($this->unidadesAlternativas as $item) {
				if ($item->unidadOrigenId == $um_dest && $item->unidadDestinoId == $um_orig) {
					return $cantidad * Lib::DevolverNumero ($item->factorDeConversion);
				}
			}
			
			// Si no lo encuentro busco al reves y divido.
			foreach ($this->unidadesAlternativas as $item) {
				if ($item->unidadOrigenId == $um_orig && $item->unidadDestinoId == $um_dest) {
					return $cantidad / Lib::DevolverNumero ($item->factorDeConversion);
				}
			}
		}
		
		// Si no encuentra nada devuelve null
		return null;
	}
	
	// 
	// Calcula el tiempo estandar para la operacion, maquina, cantidad y hoja de ruta indicadas
	// La cantidad debe estar expresada en la unidad de medida de fabricacion.
	//
	
	public function CalcularTiempoEstandarDeOperMaquina ($operacionId, $hojaDeRutaId, $maquinaId, $cantidad) {
		$ret = 0;
		
		foreach ($this->operaciones as $item) {
			if ($item->operacionId == $operacionId && $item->productoId = $this->id && $item->hojaDeRutaId == $hojaDeRutaId && $item->maquinaId == $maquinaId) {
				$ret = $cantidad * Lib::DevolverNumero ($item->tiempoTrabajo);
				
				break;
			}
		}
		
		return $ret;
	}
	
	//
	// Indica si la unidad de medida pasada por parametro es una unidad valida para
	// fabricacion (por que es la UM de fabricacion o por que tiene una conversion cargada)
	//
	// Devuelve true o false
	//
	
	public function EsUnidadDeFabricacionValida ($unidadId) {
		return ($this->CalcularCantidadFabricacion (1, $unidadId) != null);
	}
	
	//---------- CRUD ----------
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT prod.*, pf.iAlmacenDestinoId, pf.iUnidadDeMedidaId, pf.iCentroDeTrabajoId, pf.iHojaDeRutaId, pf.iProductoSecundarioId, pf.iFormulaDeProduccionId
									FROM Producto prod 
									LEFT OUTER JOIN ProductoFabricacion pf ON (prod.iProductoId = pf.iProductoId)
									WHERE prod.iProductoId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->codigo = $rs->Fields ("cCodigo");
			$this->tipoDeProductoId = $rs->Fields ("iTipoDeProductoId");
			$this->lineaDeProduccionId = $rs->Fields ("iLineaDeProduccionId");
			$this->unidadDeMedidaStockId = $rs->Fields ("iUnidadDeMedidaStockId");
			$this->agrupadorProductoPrimarioId = $rs->Fields ("iAgrupadorProductoPrimarioId");
			$this->agrupadorProductoSecundarioId = $rs->Fields ("iAgrupadorProductoSecundarioId");
			$this->agrupadorProductoTerciarioId = $rs->Fields ("iAgrupadorProductoTerciarioId");
			$this->descripcionCorta = $rs->Fields ("cDescripcionCorta");
			$this->descripcionLarga = $rs->Fields ("cDescripcionLarga");
			
			// Info de fabricacion.
			$this->almacenDestinoId = $rs->Fields ("iAlmacenDestinoId");
			$this->unidadDeMedidaFabricacionId = $rs->Fields ("iUnidadDeMedidaId");
			$this->centroDeTrabajoId = $rs->Fields ("iCentroDeTrabajoId");
			$this->hojaDeRutaId = $rs->Fields ("iHojadeRutaId");
			$this->productoSecundarioId = $rs->Fields ("iProductoSecundarioId");
			$this->formulaDeProduccionId = $rs->Fields ("iFormulaDeProduccionId");
			
			$rs->Close ();

			$this->unidadesAlternativas = UnidadAlternativaDeProducto::GerUnidadesAlternativasDeProducto ($this->id);
			$this->atributos = ValorAtributoProducto::GetValoresDeProducto ($this->id);
			$this->productoAlmacen	= DetProductoAlmacen::GetInfoProducto ($this->id);

			$tipo_prod = new TipoDeProducto ($this->tipoDeProductoId);
			$tipo_prod->Leer ();
			
			if ($tipo_prod->EsProductoDeFabricacion ()) {
				$this->formulas = FormulaDeProduccion::GetFormulasDeProducto ($this->id);
				$this->operaciones = DetHojaDeRutaProductoMaquina::GetDetallesProducto ($this->id);
			}
			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Borrar () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT COUNT(pu.*) + COUNT(ms.*) + COUNT(dfp.*) + COUNT(pc.*) + COUNT(ot.*) + COUNT(pf.*) AS cnt
									FROM Producto p
									LEFT OUTER JOIN ProductoUbicacion pu ON pu.iProductoId = p.iProductoId
									LEFT OUTER JOIN MovimientoDeStock ms ON ms.iProductoId = p.iProductoId
									LEFT OUTER JOIN DetFormulaDeProduccion dfp ON dfp.iProductoUsadoId = p.iProductoId
									LEFT OUTER JOIN ProductoPorContenedor pc ON pc.iProductoId = p.iProductoId
									LEFT OUTER JOIN OrdenDeTrabajo ot ON ot.iProductoId = p.iProductoId
									LEFT OUTER JOIN ProductoFabricacion pf ON pf.iProductoId = p.iProductoId 
									WHERE
										p.iProductoId = $this->id");
			
			if ($rs->Fields ("cnt") == 0) {
				$conn->Execute ("DELETE FROM Producto WHERE iProductoId = $this->id");
				$conn->Execute ("DELETE FROM ProductoFabricacion WHERE iProductoId = $this->id");
				$conn->Execute ("DELETE FROM ValorAtributoProducto WHERE iProductoId = $this->id");
				$conn->Execute ("DELETE FROM UnidadAlternativaDeProducto WHERE iProductoId = $this->id");
				$conn->Execute ("DELETE FROM ClienteDeProducto WHERE iProductoId = $this->id");
				$conn->Execute ("DELETE FROM FormulaDeProduccionProducto WHERE iProductoId = $this->id");
				$conn->Execute ("DELETE FROM ProductoAlmacen WHERE iProductoId = $this->id");
				
			} else {
				$conn->Execute ("UPDATE Producto SET bActivo = " . DB::ToBoolean (false) . " WHERE iProductoId = $this->id");
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
			if (!$this->ChequearCodigoRepetido ('Producto', $this->codigo)) {
				return new RetValue ('El codigo ingresado ya esta siendo utilizado por otro registro');
			}
		
			$conn->Execute ("INSERT INTO Producto (iProductoId
				,cCodigo
				,iTipoDeProductoId
				,iLineaDeProduccionId
				,iUnidadDeMedidaStockId
				,iAgrupadorProductoPrimarioId
				,iAgrupadorProductoSecundarioId
				,iAgrupadorProductoTerciarioId
				,cDescripcionCorta
				,cDescripcionLarga
				,bActivo
			) VALUES (
				nextval ('seq_producto_id')
				,'$this->codigo'
				,$this->tipoDeProductoId
				," . $this->SetNulleableIdValue ($this->lineaDeProduccionId) . "
				," . $this->SetNulleableIdValue ($this->unidadDeMedidaStockId) . "
				," . $this->SetNulleableIdValue ($this->agrupadorProductoPrimarioId) . "
				," . $this->SetNulleableIdValue ($this->agrupadorProductoSecundarioId) . "
				," . $this->SetNulleableIdValue ($this->agrupadorProductoTerciarioId) . "
				,'$this->descripcionCorta'
				,'$this->descripcionLarga'
				," . DB::ToBoolean (true) . "
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_producto_id');
			
			
			// Si es un producto de fabricacion guardamos los datos de produccion.
			$tipo = $this->GetTipoDeProducto ();
			
			if ($tipo->EsProductoDeFabricacion ()) {
				$conn->Execute ("INSERT INTO ProductoFabricacion (
									iProductoId,
									iAlmacenDestinoId,
									iUnidadDeMedidaId,
									iCentroDeTrabajoId,
									iProductoSecundarioId,
									iHojaDeRutaId,
									iFormulaDeProduccionId
								) VALUES (
									$this->id, 
									" . $this->SetNulleableIdValue ($this->almacenDestinoId) . ",
									" . $this->SetNulleableIdValue ($this->unidadDeMedidaFabricacionId) . ",
									" . $this->SetNulleableIdValue ($this->centroDeTrabajoId) . ",
									" . $this->SetNulleableIdValue ($this->productoSecundarioId) . ",
									" . $this->SetNulleableIdValue ($this->hojaDeRutaId) . ",
									" . $this->SetNulleableIdValue ($this->GetFormulaPrincipal ()) . "
								)");
								
				// Formulas de Produccion
				foreach ($this->formulas as $item) {
					$this->CrearRelacionFormula ($this->id, $item->id);
				}

				// Operaciones
				foreach ($this->operaciones as $item) {
					$item->productoId = $this->id;
					$item->Crear ();
				}
			}
			
			// Atributos
			foreach ($this->atributos as $item) {
				$item->productoId = $this->id;
				$item->Crear ();
			}

			// Unidades alternativas
			foreach ($this->unidadesAlternativas as $item) {
				$item->productoId = $this->id;
				$item->Crear ();
			}
			
			// ProductoAlmacen
			foreach ($this->productoAlmacen as $item) {
				$item->productoId = $this->id;
				$item->Crear ();
			}

			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	protected function CrearRelacionFormula ($productoId, $formulaId) {
		global $conn;
		
		$conn->Execute ("INSERT INTO FormulaDeProduccionProducto (iProductoId, iFormulaDeProduccionId) VALUES ($productoId, $formulaId)");
	}
	
	protected function BorrarRelacionFormula ($productoId, $formulaId) {
		global $conn;
		
		$conn->Execute ("DELETE FROM FormulaDeProduccionProducto WHERE iProductoId = $productoId AND iFormulaDeProduccionId = $formulaId");
	}	
	
	public function Actualizar ($campos = null) {
		global $conn;
		
		try {
			$conn->Execute ("UPDATE Producto 
							SET 
								iTipoDeProductoId = " . $campos['tipoDeProductoId'] . ",
								iLineaDeProduccionId = " . $this->SetNulleableIdValue ($campos['lineaDeProduccionId']) . ", 
								iUnidadDeMedidaStockId = " . $this->SetNulleableIdValue ($campos['unidadDeMedidaStockId']) . ", 
								iAgrupadorProductoPrimarioId = " . $this->SetNulleableIdValue ($campos['agrupadorProductoPrimarioId']) . ", 
								iAgrupadorProductoSecundarioId = " . $this->SetNulleableIdValue ($campos['agrupadorProductoSecundarioId']) . ", 
								iAgrupadorProductoTerciarioId = " . $this->SetNulleableIdValue ($campos['agrupadorProductoTerciarioId']) . ", 
								cDescripcionCorta = '" . $campos['descripcionCorta'] . "', 
								cDescripcionLarga = '" . $campos['descripcionLarga'] . "' 
							WHERE 
								iProductoId = $this->id");

			$this->ActualizarCamposRelacionMxMConValores ($this->MaterializarAtributos ($campos['atributos']), $this->atributos);
			$this->ActualizarCamposRelacionMxMConValores ($this->MaterializarUnidadesAlternativas ($campos['unidadesAlternativas']), $this->unidadesAlternativas);
			
			// Ahora actualizamos la info segun el tipo de producto.
			$this->ActualizarPorTipoDeProducto ($campos);
			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}

	private function ActualizarPorTipoDeProducto ($campos) {
		global $conn;
		
		$tipo_nuevo = new TipoDeProducto ($campos['tipoDeProductoId']);
		$tipo_nuevo->Leer ();
		$tipo_viejo = $this->GetTipoDeProducto ();
		
		$this->ActualizarCamposRelacionMxMConValores ($this->MaterializarProductoAlmacen ($campos['productoAlmacen']), $this->productoAlmacen);		

		// Si el producto era de fabricacion y sigue siendo actualizamos todo.
		if ($tipo_viejo->EsProductoDeFabricacion () && $tipo_nuevo->EsProductoDeFabricacion ()) {
			// Buscamos la formula principal.
			$conn->Execute ("UPDATE ProductoFabricacion 
							SET 
								iAlmacenDestinoId  		= " . $this->SetNulleableIdValue ($campos['almacenDestinoId']) . ", 
								iUnidadDeMedidaId 		= " . $this->SetNulleableIdValue ($campos['unidadDeMedidaFabricacionId']) . ", 
								iCentroDeTrabajoId		= " . $this->SetNulleableIdValue ($campos['centroDeTrabajoId']) . ",
								iHojaDeRutaId			= " . $this->SetNulleableIdValue ($campos['hojaDeRutaId']) . " ,
								iProductoSecundarioId	= " . $this->SetNulleableIdValue ($campos['productoSecundarioId']) . ",
								iFormulaDeProduccionId	= " . $this->SetNulleableIdValue ($this->GetFormulaPrincipal ($campos)) . "
							WHERE iProductoId = $this->id");

			$this->ActualizarCampoRelacionUnoAMuchos  ($campos, "formulas", "id", "id", "CrearRelacionFormula", "BorrarRelacionFormula");
			$this->ActualizarCamposRelacionMxMConValores ($this->MaterializarOperaciones ($campos['operaciones']), $this->operaciones);		

		// Si no era de fabricacion y ahora si hay que insertar todos los valores.
		} else if ($tipo_nuevo->EsProductoDeFabricacion ()) {
			$conn->Execute ("INSERT INTO ProductoFabricacion (
								iProductoId,
								iAlmacenDestinoId,
								iUnidadDeMedidaId,
								iCentroDeTrabajoId,
								iProductoSecundarioId,
								iHojaDeRutaId,
								iFormulaDeProduccionId
							) VALUES (
								$this->id, 
								" . $this->SetNulleableIdValue ($campos['almacenDestinoId']) . ", 
								" . $this->SetNulleableIdValue ($campos['unidadDeMedidaFabricacionId']) . ", 
								" . $this->SetNulleableIdValue ($campos['centroDeTrabajoId']) . ",
								" . $this->SetNulleableIdValue ($campos['hojaDeRutaId']) . " ,
								" . $this->SetNulleableIdValue ($campos['productoSecundarioId']) . ",
								" . $this->SetNulleableIdValue ($this->GetFormulaPrincipal ($campos)) . "
							)");

			// Formulas de Produccion
			$this->SetFormulas ($campos['formulas']);
			foreach ($this->formulas as $item) {
				$this->CrearRelacionFormula ($this->id, $item->id);
			}
			
			// Operaciones
			$this->SetOperaciones ($campos['operaciones']);
			foreach ($this->operaciones as $item) {
				$item->productoId = $this->id;
				$item->Crear ();
			}
		
		// Si era y ya no es hay que borrar todo.
		} else if ($tipo_viejo->EsProductoDeFabricacion ()) {
			$conn->Execute ("DELETE FROM ProductoFabricacion WHERE iProductoId = $this->id");
			$conn->Execute ("DELETE FROM DetHojaDeRutaProductoMaquina WHERE iProductoId = $this->id");
			$conn->Execute ("DELETE FROM FormulaDeProduccionProducto WHERE iProductoId = $this->id");
		}
	}
}
?>
