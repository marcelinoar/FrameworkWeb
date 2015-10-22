<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: FormularioController.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ('template.php');
require_once ('Sysgran/Core/Red/JSonRouterBase.php');
require_once ('Sysgran/Core/Red/Encoder.php');
require_once ('Sysgran/Core/Php/GeneradorExcel.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/LoteDeFabricacion.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/FormulaDeProduccion.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/OrdenDeTrabajo.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/Producto.php');
require_once ('Sysgran/Aplicacion/Modulos/Produccion/Store/StoreLoteDeFabricacion.php');

class FormularioController extends JSonRouterBase {
	public function GenerarListadoPdf () {
		$g = new GeneradorListadoPdf ();
		$this->ConfigurarListadoImpresion ($g);
		$g->Ejecutar ();
	}
	
	public function GenerarListadoExcel () {
		$g = new GeneradorListadoExcel ();
		$this->ConfigurarListadoImpresion ($g);
		
		return $g->Ejecutar ();
	}
	
	private function ConfigurarListadoImpresion ($lst) {
		$lst->Store = new StoreLoteDeFabricacion ();
		$lst->NombreArchivo = 'listado';
		$lst->Titulo = 'LISTADO DE LOTES DE FABRICACION';
		$lst->Columnas = array ('Codigo' => 'codigo', 'Centro de Trabajo' => 'nombreCentroDeTrabajo', 'Fecha de Creacion' => 'fechaCreacion', 'Comentarios' => 'comentario');
		$lst->AnchoColumnas = array ('50', '100', '100', '400');
	}
	
	public function Crear ($productoId, $ordenesDeTrabajo, $comentario, $centroDeTrabajoId) {
		global $conn;
				
		$e = new LoteDeFabricacion ();
		$e->productoId 			= $productoId;
		$e->comentario			= $comentario;
		$e->centroDeTrabajoId	= $centroDeTrabajoId;
		
		$e->SetOrdenesDeTrabajo ($ordenesDeTrabajo);
			
		$conn->BeginTransaction ();
		$ret_val = $e->Crear ();
		
		if ($ret_val == null) {
			$conn->Commit ();
			return Encoder::EncodeResponseOk ();
			
		} else {
			$conn->Rollback ();
			return Encoder::EncodeResponseError ($ret_val->GetMessage ());
		}
	}
	
	public function BuscarPorCodigo ($codigo) {
		try {
			$codigo = Validador::NumeroEntero ($codigo);
		
			return $this->BuscarPorId ($codigo);
			
		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ($ex);
		}
	}	
	
	public function BuscarPorId ($codigo) {
		$ret = new LoteDeFabricacion ($codigo);
		$ret_val = $ret->Leer ();
		
		if ($ret_val != null) {
			return Encoder::EncodeResponseError ('Codigo Inexistente');				
			
		} else {
			$ret->producto = $ret->GetProducto ();
			
			return Encoder::Encode (Array ($ret));	
		}
	}	
	
	public function Leer ($id) {
		$e = new LoteDeFabricacion ($id);
		
		$ret_val = $e->Leer ();
		
		if ($ret_val == null) {
			$e->centroDeTrabajo = $e->GetCentroDeTrabajo ();
			
			return Encoder::Encode ($e);
			
		} else {
			return Encoder::EncodeResponseError ($ret_val->GetMessage ());				
		}
	}
	
	public function Actualizar ($params) {
		global $conn;
				
		if (isset ($params["id"])) {
			$id = $params["id"];
			
			$e = new LoteDeFabricacion ($id);
			$ret_val = $e->Leer ();
					
			if ($ret_val == null) {
				unset ($params["id"]);
					
				$conn->BeginTransaction ();					
				$ret_val = $e->Actualizar ($params);
				
				if ($ret_val == null) {
					$conn->Commit ();
					return Encoder::EncodeResponseOk ();
				
				} else {
					$conn->Rollback ();
					return Encoder::EncodeResponseError ($ret_val->GetMessage ());
				}
			
			} else {
				return Encoder::EncodeResponseError ($ret_val->GetMessage ());
			}
			
		} else {
			return Encoder::EncodeResponseError (ERR_JSR_PARAMETROS_DINAMICOS_INVALIDOS);
		}
	}
	
	public function Borrar ($id) {
		global $conn;
					
		$e = new LoteDeFabricacion ($id);
		$ret_val = $e->Leer ();
		
		if ($ret_val == null) {
			$conn->BeginTransaction ();
			$ret_val = $e->Borrar ();
			
			if ($ret_val == null) {
				$conn->Commit ();
				return Encoder::EncodeResponseOk ();
			
			} else {
				$conn->Rollback ();
				return Encoder::EncodeResponseError ($ret_val->GetMessage ()); 
			}
			
		} else {
			$conn->Rollback ();
			return Encoder::EncodeResponseError ($ret_val->GetMessage ());
		}
	}
	
	//
	// Recibe un array de ids de las OTs que pertenecen al lote y realiza el calculo de materiales necesarios
	// para su fabricacion.
	//
	public function CalcularFormulaDeLote ($ots) {
		$a = JSonRouterBase::ParsearArray ($ots);
		$listado = array ();
		
		try {
			foreach ($a as $id) {
				$ot = new OrdenDeTrabajo ($id);
				$ret_val = $ot->Leer ();
				if ($ret_val != null) {
					throw new Exception('No se puede leer la OT con id:' . $id);
				}

				$ot->formula = new FormulaDeProduccion ($ot->formulaDeProduccionId);
				$ret_val = $ot->formula->Leer ();
				if ($ret_val != null) {
					throw new Exception('No se puede leer la Formula con id:' . $ot->formulaDeProduccionId);
				}

				$ot->producto = new Producto ($ot->productoId);
				$ret_val = $ot->producto->Leer ();
				if ($ret_val != null) {
					throw new Exception('No se puede leer el Producto con id:' . $ot->productoId);
				}

				$cantidad = $ot->producto->CalcularCantidadFabricacion ($ot->cantidad, $ot->unidadDeMedidaId);
				if ($cantidad == null) {
					throw new Exception('No se puede realizar la conversion de unidades de medida para Producto:' . $ot->productoId . ' UM:' . $ot->unidadDeMedidaId);
				}

				$lmat = $ot->formula->GetListaDeMateriales ($cantidad);

				foreach ($lmat as $item) {
					$listado[] = $item;
				}
			}

			$listado_final = $this->UnificarFormula ($listado);

		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ($ex); 
		}					
		
		return Encoder::EncodeResponseOk ($listado_final);	
	}
	
	//
	// Recorre el listado de materiales recibido y lo unifica por producto.
	//
	private function UnificarFormula ($listado) {
		$ret = array ();

		for ($i = 0; $i < count ($listado); $i++) {
			$prim = $listado[$i];
			$flag = false;
			$item_unif = null;
			
			for ($j = 0; $j < count ($listado); $j++) {
				$sec = $listado[$j];

				//
				// Estamos recorriendo la lista con sigo misma. Entonces tenemos que filtrar no tomar como 
				// repetidos los items con sigo mismos ($i == $j) y tambien no volver a contar los que ya
				// sume (saltear)
				//
				if ($prim['productoId'] == $sec['productoId'] && $i != $j && !$listado[$i]['saltear']) {
					// Si es el primero que encontramos creamos el item unificado
					if (!$flag) {
						$item_unif = $this->GetCopiaItem ($prim);
					}

					// Si estan en las mismas unidades solo sumo las cantidades
					if ($item_unif['unidadDeMedidaId'] == $sec['unidadDeMedidaId']) {
						$item_unif['cantidad'] += Lib::DevolverNumero ($sec['cantidad']);
						
					// Si estan en unidades distintas tengo que hacer la conversion.
					} else {
						$prod = new Producto ($item_unif['productoId']);
						$prod->Leer ();
						$cnt = $prod->ConvertirCantidad (Lib::DevolverNumero ($sec['cantidad']), $item_unif['unidadDeMedidaId'], $sec['unidadDeMedidaId']);
						
						if ($cnt == null) {
							throw new Exception('No se puede realizar la conversion de unidades de medida para Producto:' . $prod->id . ' UM:' . $item_unif['unidadDeMedidaId'] . ' UM:' . $sec['unidadDeMedidaId']);
						}
						
						$item_unif['cantidad'] += $cnt;
					}

					$flag = true;
					$listado[$j]['saltear'] = true;
				}
			}

			// Si habia repetidos agregamos el producto unificado			
			if ($flag) {
				$ret[] = $item_unif;
				
			// sino lo usamos tal cual esta.
			} else if (!$listado[$i]['saltear']) {
				$ret[] = $this->GetcopiaItem ($prim);
			}
		}
		
		// Formateamos las cantidades.
		for ($i = 0; $i < count ($ret); $i++) {
			$ret[$i]['cantidad'] = DB::FromFloat ($ret[$i]['cantidad']);
		}
		
		return $ret;
	}
	
	//
	// Devuelve una version simplificada de los datos que nos interesan para este formulario de los que recibimos
	// en el calculo de la formula.
	//
	private function GetCopiaItem ($item) {
		$ret['unidadDeMedidaId'] 		= $item['unidadDeMedidaId'];
		$ret['productoId'] 				= $item['productoId'];
		$ret['cantidad'] 				= Lib::DevolverNumero ($item['cantidad']);
		$ret['codigoProducto']			= $item['codigoProducto'];
		$ret['descripcionProducto']		= $item['descripcionProducto'];
		$ret['codigoUnidadDeMedida']	= $item['codigoUnidadDeMedida'];
		
		return $ret;
	}
}

$ws = new FormularioController ();
$ws->Ejecutar ();
?>
