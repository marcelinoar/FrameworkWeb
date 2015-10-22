<?
/**************************************************************************************************
 * Archivo: OrdenDeTrabajo.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Pantalla de carga de Ordenes de Trabajo
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ('Sysgran/Core/Php/EntidadBase.php');
require_once ('EstadoOT.php');
require_once ('OperacionPorOT.php');
require_once ('FormulaDeProduccion.php');
require_once ('DetFormulaDeProduccionOT.php');
require_once ('ValeDeFabricacion.php');
require_once ('HojaDeRuta.php');
require_once ('Producto.php');
require_once ('UnidadDeMedida.php');
require_once ('MedicionDeAtributo.php');

class OrdenDeTrabajo extends EntidadBase {
	public $id;
	public $loteDeFabricacionId;
	public $estadoOTId;
	public $productoId;
	public $formulaDeProduccionId;
	public $hojaDeRutaId;
	public $unidadDeMedidaId;
	public $pedidoDeVentaId;
	public $ordenDeTrabajoPadreId;
	public $cantidad;
	public $fechaDeCreacion;
	public $fechaDeProduccion;
	public $fechaDeTerminacion;
	public $fechaDeProduccionProgramada;
	public $comentarios;
	
	// Campos de relacion
	public $valesDeFabricacion 			= array ();
	public $operacionesHojaDeRuta 		= array ();
	public $detFormulaDeProduccionOT 	= array ();
	public $detReservaMateriaPrimaOT 	= array ();
	public $detMedicionDeAtributoOT 	= array ();
	public $detRegistroHistoricoOT 		= array ();
	
	// Informativos. Solo se leen
	public $descripcionProductoOTPadre;

	public function OrdenDeTrabajo ($id = null) {
		$this->id = $id;
	}
	
	//
	// Es un caso particular del Crear (). A partir de los datos pasados crea una nueva OT con estado
	// emitida.
	//
	public function CrearOTDeProducto ($prod, $cantidad, $unidadDeMedidaId) {
		$this->productoId 				= $prod->id;
		$this->formulaDeProduccionId 	= $prod->formulaDeProduccionId;
		$this->hojaDeRutaId				= $prod->hojaDeRutaId;
		$this->unidadDeMedidaId			= $prod->unidadDeMedidaFabricacionId;
		$this->cantidad					= $prod->CalcularCantidadFabricacion ($cantidad, $unidadDeMedidaId);
		
		// Agregamos como no seleccionada la maquina de todas las operaciones.
		$hdr = new HojaDeRuta ($prod->hojaDeRutaId);
		
		$ret_val = $hdr->Leer ();
		if ($ret_val != null) {
			return $ret_val;
		}
		
		foreach ($hdr->operaciones as $item) {
			$obj = new OperacionPorOT (null, $item->operacionId, $this->hojaDeRutaId);
			$obj->maquinaId = 0;
			
			$this->operacionesHojaDeRuta[] = $obj;
		}
		
		return $this->Crear ();
	}
	
	public function AsociarConOTPadre ($otPadreId) {
		global $conn;
		
		$conn->Execute ("UPDATE OrdenDeTrabajo SET iOrdenDeTrabajoPadreId = $otPadreId WHERE iOrdenDeTrabajoId = $this->id");
	}
	
	//---------- Funciones para setear los valores de los campos relacionados ----------		
	
	public function SetOperacionesHojaDeRuta ($operaciones) {
		$this->operacionesHojaDeRuta = array ();
		
		foreach ($operaciones as $item) {
			$obj = new OperacionPorOT (null, $item->operacionId, $this->hojaDeRutaId);
			$obj->maquinaId = $item->maquinaId;
			
			$this->operacionesHojaDeRuta[] = $obj;
		}
	}
	//---------- Funciones publicas estaticas de la clase ----------
	
	public static function GetOrdenesDeTrabajoPorLote ($loteId) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT ot.*
								, TO_CHAR(ot.dFechaDeProduccionProgramada, 'DD/MM/YYYY') AS fecha_programada 
								, TO_CHAR(ot.dFechaDeCreacion, 'DD/MM/YYYY') AS fecha_creacion
								, TO_CHAR(ot.dFechaDeProduccion, 'DD/MM/YYYY') AS fecha_produccion
								, TO_CHAR(ot.dFechaDeTerminacion, 'DD/MM/YYYY') AS fecha_terminacion
								, p.cDescripcionCorta
								FROM OrdenDeTrabajo ot
								LEFT OUTER JOIN OrdenDeTrabajo ot2 ON ot2.iOrdenDeTrabajoId = ot.iOrdenDeTrabajoPadreId
								LEFT OUTER JOIN Producto p ON p.iProductoId = ot2.iProductoId
								WHERE 
									ot.iLoteDeFabricacionId = $loteId");

		$ret = array ();
		while (!$rs->Eof ()) {
			$item = new OrdenDeTrabajo ($rs->Fields ("iOrdenDeTrabajoId"));
			$item->productoId 					= $rs->Fields ("iProductoId");
			$item->loteDeFabricacionId 			= $rs->Fields ("iLoteDeFabricacionId");
			$item->formulaDeProduccionId 		= $rs->Fields ("iFormulaDeProduccionId");
			$item->descripcionProductoOTPadre	= $rs->Fields ("cDescripcionCorta");
			$item->estadoOTId					= $rs->Fields ("iEstadoOTId");
			$item->nombreEstadoOT				= EstadoOT::GetNombre ($item->estadoOTId);
			$item->hojaDeRutaId 				= $rs->Fields ("iHojaDeRutaId");
			$item->cantidad 					= DB::FromFloat ($rs->Fields ("fCantidad"));
			$item->unidadDeMedidaId 			= $rs->Fields ("iUnidadDeMedidaId");
			$item->fechaDeProduccionProgramada 	= $rs->Fields ("fecha_programada");
			$item->fechaDeCreacion				= $rs->Fields ("fecha_creacion");
			$item->fechaDeProduccion			= $rs->Fields ("fecha_produccion");
			$item->fechaDeTerminacion			= $rs->Fields ("fecha_terminacion");
			$item->pedidoDeVentaId				= $rs->Fields ("iPedidoDeVentaId");
			$item->ordenDeTrabajoPadreId		= $rs->Fields ("iOrdenDeTrabajoPadreId");
			$item->comentarios 					= $rs->Fields ("cComentarios");
			
			$item->producto 					= $item->GetProducto ();
			$item->producto->centroDeTrabajo 	= $item->producto->GetCentroDeTrabajo ();
			$item->unidadDeMedida 				= $item->GetUnidadDeMedida ();
			$item->formula						= $item->GetFormulaDeProduccion ();
			
			$ret[] = $item;
			
			$rs->Next ();
		}
		$rs->Close ();
		
		return $ret;
	}

	//---------- Metodos para obtener objetos relacionados ----------
	
	public function GetProducto () {
		$prod = new Producto ($this->productoId);
		$prod->Leer ();
		
		return $prod;
	}
	
	public function GetUnidadDeMedida () {
		$um = new UnidadDeMedida ($this->unidadDeMedidaId);
		$um->Leer ();
		
		return $um;
	}
	
	public function GetFormulaDeProduccion () {
		$f = new FormulaDeProduccion ($this->formulaDeProduccionId);
		$f->Leer ();
		
		return $f;
	}
	
	//---------- Otros Metodos Publicos ----------
	
	public function CambiarDeEstado ($estadoId, $fechaProgramada) {
		global $conn;
		
		try {
			if ($fechaProgramada != null) {
				$conn->Execute ("UPDATE OrdenDeTrabajo SET iEstadoOTId = $estadoId, dFechaDeProduccionProgramada = " . DB::SetNulleableDateValue ($fechaProgramada) . " WHERE iOrdenDeTrabajoId = $this->id");
			
			} else {
				$conn->Execute ("UPDATE OrdenDeTrabajo SET iEstadoOTId = $estadoId WHERE iOrdenDeTrabajoId = $this->id");
			}
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
		
		return null;
	}
	
	//---------- CRUD ----------

	public function Crear () {
		global $conn;

		$ret_val = $this->ValidarOT ();
		if ($ret_val != null) {
			return $ret_val;
		}
		
		try {
			// Creamos el egistro en la tabla de OT. 
			// Ponemos en cero la Hoja de ruta por que todavia tenemos
			// que hacer la copia.
			$conn->Execute ("INSERT INTO OrdenDeTrabajo (
				iOrdenDeTrabajoId
				,iLoteDeFabricacionId
				,iEstadoOTId
				,iProductoId
				,iFormulaDeProduccionId
				,iHojaDeRutaId
				,iUnidadDeMedidaId
				,iPedidoDeVentaId
				,iOrdenDeTrabajoPadreId
				,bActivo
				,fCantidad
				,dFechaDeCreacion
				,dFechaDeProduccion
				,dFechaDeTerminacion
				,dFechaDeProduccionProgramada
				,cComentarios
				,iOrdenDentroDeLote
			) VALUES (
				nextval ('seq_orden_trabajo_id')
				," . $this->SetNulleableIdValue ($this->loteDeFabricacionId) . "
				," . EstadoOT::Emitida . "
				,$this->productoId
				,$this->formulaDeProduccionId
				,0
				,$this->unidadDeMedidaId
				," . $this->SetNulleableIdValue  ($this->pedidoDeVentaId) . "
				," . $this->SetNulleableIdValue  ($this->ordenDeTrabajoPadreId) . "
				,true
				," . DB::ToFloat ($this->cantidad) . "
				, CURRENT_TIMESTAMP
				, null
				, null
				, null
				,'$this->comentarios'
				,1
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_orden_trabajo_id');
			
			// Guardamos toda la informacion de la nueva hoja de ruta.
			if ($this->GuardarDatosHojaDeRuta () == null) {
				return new RetValue ('Ha ocurrido un error intentando copar la hoja de ruta');
			}
			
			// Guardamos toda la informacion de la nueva formula.
			if ($this->GuardarDatosFormula () == null) {
				return new RetValue ('Ha ocurrido un error intentando copar la formula de produccion');
			}
			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT ot.*
									, TO_CHAR(ot.dFechaDeProduccionProgramada, 'DD/MM/YYYY') AS fecha_programada 
									, TO_CHAR(ot.dFechaDeCreacion, 'DD/MM/YYYY') AS fecha_creacion
									, TO_CHAR(ot.dFechaDeProduccion, 'DD/MM/YYYY') AS fecha_produccion
									, TO_CHAR(ot.dFechaDeTerminacion, 'DD/MM/YYYY') AS fecha_terminacion
									, p.cDescripcionCorta
									FROM OrdenDeTrabajo ot
									LEFT OUTER JOIN OrdenDeTrabajo ot2 ON ot2.iOrdenDeTrabajoId = ot.iOrdenDeTrabajoPadreId
									LEFT OUTER JOIN Producto p ON p.iProductoId = ot2.iProductoId
									WHERE 
										ot.iOrdenDeTrabajoId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->productoId 					= $rs->Fields ("iProductoId");
			$this->loteDeFabricacionId 			= $rs->Fields ("iLoteDeFabricacionId");
			$this->formulaDeProduccionId 		= $rs->Fields ("iFormulaDeProduccionId");
			$this->descripcionProductoOTPadre	= $rs->Fields ("cDescripcionCorta");
			$this->estadoOTId					= $rs->Fields ("iEstadoOTId");
			$this->nombreEstadoOT				= EstadoOT::GetNombre ($this->estadoOTId);
			$this->hojaDeRutaId 				= $rs->Fields ("iHojaDeRutaId");
			$this->cantidad 					= DB::FromFloat ($rs->Fields ("fCantidad"));
			$this->unidadDeMedidaId 			= $rs->Fields ("iUnidadDeMedidaId");
			$this->fechaDeProduccionProgramada 	= $rs->Fields ("fecha_programada");
			$this->fechaDeCreacion				= $rs->Fields ("fecha_creacion");
			$this->fechaDeProduccion			= $rs->Fields ("fecha_produccion");
			$this->fechaDeTerminacion			= $rs->Fields ("fecha_terminacion");
			$this->pedidoDeVentaId				= $rs->Fields ("iPedidoDeVentaId");
			$this->ordenDeTrabajoPadreId		= $rs->Fields ("iOrdenDeTrabajoPadreId");
			$this->comentarios 					= $rs->Fields ("cComentarios");
			
			$this->valesDeFabricacion = ValeDeFabricacion::GetValesDeFabricacionDeOT ($this->id);
			$this->detMedicionDeAtributoOT = MedicionDeAtributo::GetMedicionDeAtributosPorOT ($this->id);
			
			$rs->Close ();
	
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Borrar () {
		global $conn;
		
		try {
			foreach ($this->valesDeFabricacion as $item) {
				$item->Borrar ();
			}

			$conn->Execute ("DELETE FROM OrdenDeTrabajo WHERE iOrdenDeTrabajoId = $this->id");
			
			return null;
					
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	
	public function Actualizar ($campos = null) {
		global $conn;

		$ret_val = $this->ValidarOT ();
		if ($ret_val != null) {
			return $ret_val;
		}
		
		try {
			if ($campos != null) {
				$this->ActualizarFormulaDeProduccion ($campos);
				$this->ActualizarHojaDeRuta ($campos);
				
				//
				// Si tiene fecha de produccion y esta en estado programada en la DB, y vino con estado En Produccion entonces quiere decir
				// que la pasaron a produccion. Ponemos la fecha de la DB.
				//
				$fecha_prod = '';
				if ($this->estadoOTId == EstadoOT::Programada && $campos['estadoOTId'] == EstadoOT::EnProduccion && $campos['fechaDeProduccionProgramada'] != null) {
					$fecha_prod = ', dFechaDeProduccion = CURRENT_TIMESTAMP ';
				}
				
				// Actualizamos la tabla maestra
				$conn->Execute ("UPDATE OrdenDeTrabajo
								SET
									iEstadoOTId 					= " . $campos['estadoOTId'] . "
									, iHojaDeRutaId 				= " . $campos['hojaDeRutaId'] . "
									, iUnidadDeMedidaId 			= " . $campos['unidadDeMedidaId'] . "
									, iPedidoDeVentaId 				= " . $this->SetNulleableIdValue ($campos['pedidoDeVentaId']) . "
									, iOrdenDeTrabajoPadreId 		= " . $this->SetNulleableIdValue ($campos['ordenDeTrabajoPadreId']) . "
									, iLoteDeFabricacionId			= " . $this->SetNulleableIdValue ($campos['loteDeFabricacionId']) . "
									$fecha_prod
									, dFechaDeProduccionProgramada 	= " . DB::SetNulleableDateValue ($campos['fechaDeProduccionProgramada']) . "
									, fCantidad 					= " . DB::ToFloat ($campos['cantidad']) . "
									, cComentarios 					= '" . $campos['comentarios'] . "'
								WHERE
									iOrdenDeTrabajoId = $this->id");

			}
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}

	//---------- Metodos privados ----------
	
	/**
	 * Valida la OT
	 *
	 * @return	Devuelve null si esta bien y RetValue () si hay algun error.
	 */

	private function ValidarOT () {
		$prod = new Producto ($this->productoId);
		
		if ($prod->Leer () != null) {
			return new RetValue ('Error de lectura de producto');
		}
		
		// Chequeamos que la UM sea valida.
		if ($prod->CalcularCantidadFabricacion (1, $this->unidadDeMedidaId) == null) {
			return new RetValue ('La unidad de medida seleccionada no es valida para este producto');
		}
		
		return null;
	}

	/**
	 *
	 * Actualiza la hoja de ruta.
	 *
	 * @param	$campos El array de campos que vienen del formulario
	 *
	 */
	
	private function ActualizarHojaDeRuta ($campos) {
		$this->SetOperacionesHojaDeRuta ($campos['operacionesHojaDeRuta']);
		
		foreach ($this->operacionesHojaDeRuta as $item) {
			$item->ordenDeTrabajoId = $this->id;
			
			$item->Actualizar ();
		}
	}
	
	/**
	 *
	 * Actualiza la formula de producion. Si la formula cambio entonces borra la anterior
	 * y crea una copia de la nueva.
	 *
	 * @param	$campos El array de campos que vienen del formulario
	 *
	 */
	
	private function ActualizarFormulaDeProduccion ($campos) {
		$viejaFormula	= $this->formulaDeProduccionId;
		$nuevaFormulaId = $campos['formulaDeProduccionId'];
		$detalles		= $campos['detFormulaDeProduccionOT'];
		
		if ($this->formulaDeProduccionId != $nuevaFormulaId) {
			$this->Cantidad = $campos['cantidad'];
			//$this->SetDetFormulaDeProduccionOT ($detalles);
			$this->formulaDeProduccionId = $nuevaFormulaId;
			
			// Primero guardamos la formula nueva.
			$this->GuardarDatosFormula ();

			// Despues borramos la instancia vieja
			$frm = new FormulaDeProduccion ($viejaFormula);
			$frm->BorradoReal ();
		}
	}

	/**
	 *
	 * Creamos una nueva formula basada en la seleccionada pero sin subformulas (tal como se en la grilla)
	 *
	 * @return	Devuelve la nueva formula o null en caso de ocurrir algun error.
	 */
	
	private function GuardarDatosFormula () {
		global $conn;
		
		$frm_orig 	= new FormulaDeProduccion ($this->formulaDeProduccionId);
		$prod		= new Producto ($this->productoId);
		
		if ($frm_orig->Leer () != null) {
			return null;
		}
		
		if ($prod->Leer () != null) {
			return null;
		}
		
		$frm = new FormulaDeProduccion ();
		$frm->codigo 					= $this->GenerarCodigoFormula ($frm_orig->codigo);
		$frm->descripcionCorta 			= $frm_orig->descripcionCorta;
		$frm->descripcionLarga 			= $frm_orig->descripcionLarga;
		$frm->tipoFormulaDeProduccionId	= TipoFormulaDeProduccion::FormulaOrdenDeTrabajo;
		
		// Obtengo la lista de materiales usados en la formula seleccionada y los agrego a 
		// la nueva formula.
		$detalles = $frm_orig->GetListaDeMateriales ($prod->CalcularCantidadFabricacion ($this->cantidad, $this->unidadDeMedidaId));
		foreach ($detalles as $item) {
			$det = new DetFormulaDeProduccion ();
			$det->productoUsadoId 	= $item['productoId'];
			$det->unidadDeMedidaId 	= $item['unidadDeMedidaId'];
			
			// Ponemos la cantidad de la formula achatada
			$det->cantidadUtilizada = Lib::DevolverNumero ($item['cantidad']) / Lib::DevolverNumero ($this->cantidad);
			
			$frm->detalles[] = $det;
		}
		
		// Si puedo crear la formula entonces actualizo la OT	
		$ret_val = $frm->Crear ();
		if ($ret_val == null) {
			$this->formulaDeProduccionId = $frm->id;
			$conn->Execute ("UPDATE OrdenDeTrabajo SET iFormulaDeProduccionId = $frm->id WHERE iOrdenDeTrabajoId = $this->id");
		
		} else {
			return null;
		}
		
		return $frm;
	}
	
	/**
	 *
	 * Hacemos una copia de la hoja de ruta, guardamos la informacion de la seleccion de maquinas por operacion
	 * y actualizamos la OT para que apunte a la nueva HDR.
	 *
	 * @return	Devuelve la nueva hoja de ruta o null en caso de ocurrir algun error.
	 */
	 
	private function GuardarDatosHojaDeRuta () {
		global $conn;
		
		// Hacemos una copia de la hoja de ruta original.
		$hdr_orig = new HojaDeRuta ($this->hojaDeRutaId);
		
		if ($hdr_orig->Leer () != null) {
			return null;
		}

		$ret_val = $hdr_orig->Copiar ($this->GenerarCodigoHojaDeRuta ($hdr_orig->codigo), TipoHojaDeRuta::HojaDeRutaOrdenDeTrabajo, $this->productoId);
		if ($ret_val == null) {
			return null;
		}
		
		// Actualizamos la OT para que apunte a la nueva hdr.
		$conn->Execute ("UPDATE OrdenDeTrabajo SET iHojaDeRutaId = $ret_val->id WHERE iOrdenDeTrabajoId = $this->id");
		$this->hojaDeRutaId = $ret_val->id;

		// Guardamos la seleccion de maquinas.
		foreach ($this->operacionesHojaDeRuta as $item) {
			$item->ordenDeTrabajoId = $this->id;
			$item->hojaDeRutaId 	= $ret_val->id;
			$item->Crear ();
		}
		
		return $ret_val;
	}
	
	/**
	 *
	 * Genera el codigo de la copia de la hoja de ruta que va a quedar asociada
	 * a la OT.
	 *
	 * @param	$cod_orig El codigo original
	 *
	 * @return	Devuelve el nuevo codigo
	 */
	
	private function GenerarCodigoHojaDeRuta ($cod_orig) {
		return sprintf ("%07d/%s", $this->id, $cod_orig);
	}
	
	/**
	 *
	 * Genera el codigo de la copia de la formula que va a quedar asociada
	 * a la OT.
	 *
	 * @param	$cod_orig El codigo original
	 *
	 * @return	Devuelve el nuevo codigo
	 */
	
	private function GenerarCodigoFormula ($cod_orig) {
		return sprintf ("%07d/%s", $this->id, $cod_orig);
	}
}
?>
