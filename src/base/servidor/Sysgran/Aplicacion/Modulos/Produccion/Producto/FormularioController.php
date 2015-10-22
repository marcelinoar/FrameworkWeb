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
require_once ('Sysgran/Aplicacion/Entidades/Produccion/Producto.php');
require_once ('Sysgran/Aplicacion/Modulos/Produccion/Store/StoreTipoDeProducto.php');
require_once ('Sysgran/Aplicacion/Modulos/Produccion/Store/StoreAgrupadorProductoPrimario.php');
require_once ('Sysgran/Aplicacion/Modulos/Produccion/Store/StoreAgrupadorProductoSecundario.php');
require_once ('Sysgran/Aplicacion/Modulos/Produccion/Store/StoreAgrupadorProductoTerciario.php');
require_once ('Sysgran/Aplicacion/Modulos/Produccion/Store/StoreUnidadDeMedida.php');
require_once ('Sysgran/Aplicacion/Modulos/Produccion/Store/StoreAtributoProducto.php');
require_once ('Sysgran/Aplicacion/Modulos/Produccion/Store/StoreProductoAlmacen.php');
require_once ('Sysgran/Aplicacion/Modulos/Produccion/Store/StoreDetHojaDeRutaProductoMaquina.php');
require_once ('Store/StoreOperacionesPorHojaDeRuta.php');
require_once ('Sysgran/Aplicacion/Modulos/Produccion/Store/StoreProducto.php');

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
		$lst->Store = new StoreProducto ();
		$lst->NombreArchivo = 'listado';
		$lst->Titulo = 'LISTADO DE PRODUCTOS';
		$lst->Columnas = array ('Codigo' => 'id', 
								'Descripcion' => 'descripcionCorta');
		$lst->AnchoColumnas = array (150, 500);
	}	
	
	public function Crear ($codigo
							, $tipoDeProductoId
							, $lineaDeProduccionId
							, $unidadDeMedidaStockId
							, $agrupadorProductoPrimarioId
							, $agrupadorProductoSecundarioId
							, $agrupadorProductoTerciarioId
							, $descripcionCorta
							, $descripcionLarga
							, $unidadesAlternativas
							, $atributos
							, $formulas
							, $operaciones
							, $productoAlmacen
							, $unidadDeMedidaFabricacionId = null
							, $almacenDestinoId = null
							, $centroDeTrabajoId = null
							, $productoSecundarioId = null
							, $hojaDeRutaId = null) {
		global $conn;

		if (Producto::GetProductoPorCodigo ($codigo) == null) {
			$e = new Producto ();
			$e->codigo = $codigo;
			$e->tipoDeProductoId = $tipoDeProductoId;
			$e->lineaDeProduccionId = $lineaDeProduccionId;
			$e->unidadDeMedidaStockId = $unidadDeMedidaStockId;
			$e->agrupadorProductoPrimarioId = $agrupadorProductoPrimarioId;
			$e->agrupadorProductoSecundarioId = $agrupadorProductoSecundarioId;
			$e->agrupadorProductoTerciarioId = $agrupadorProductoTerciarioId;
			$e->descripcionCorta = $descripcionCorta;
			$e->descripcionLarga = $descripcionLarga;
			$e->unidadDeMedidaFabricacionId = $unidadDeMedidaFabricacionId;
			$e->almacenDestinoId = $almacenDestinoId;
			$e->productoSecundarioId = $productoSecundarioId;
			$e->centroDeTrabajoId = $centroDeTrabajoId;
			$e->hojaDeRutaId = $hojaDeRutaId;

			// Cargamos las entidades relacionadas
			$e->SetFormulas ($formulas);
			$e->SetAtributos ($atributos);
			$e->SetUnidadesAlternativas ($unidadesAlternativas);
			$e->SetOperaciones ($operaciones);
			$e->SetProductoAlmacen ($productoAlmacen);

			$conn->BeginTransaction ();
			$ret_val = $e->Crear ();

			if ($ret_val == null) {
				$conn->Commit ();
				return Encoder::EncodeResponseOk ();

			} else {
				$conn->Rollback ();
				return Encoder::EncodeResponseError ($ret_val->GetMessage ());
			}
		
		} else {
			return Encoder::EncodeResponseError ('El codigo ingresado ya fue utilizado');
		}
	}
	
	//
	// Busca un producto por codigo y lo devuelve.
	//
	public function BuscarPorCodigo ($codigo) {
		try {
			$codigo = Validador::CodigoAlfanumerico ($codigo);
			$ret = Producto::GetProductoPorCodigo ($codigo);

			if ($ret == null) {
				return Encoder::EncodeResponseError ('Codigo Inexistente');				

			} else {
				return Encoder::Encode (Array ($ret));	
			}
			
		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ($ex);
		}
	}	
	
	//
	// Busca un producto por id y lo devuelve.
	//
	public function BuscarPorId ($codigo) {
		$ret = new Producto ($codigo);
		$ret_val = $ret->Leer ();
		
		if ($ret_val != null) {
			return Encoder::EncodeResponseError ('Codigo Inexistente');				
			
		} else {
			return Encoder::Encode (Array ($ret));	
		}
	}
	
	public function Leer ($id) {
		$e = new Producto ($id);
		
		$ret_val = $e->Leer ();
		
		if ($ret_val == null) {
			$e->lineaDeProduccion 			= $e->GetLineaDeProduccion ();
			$e->unidadDeMedidaStock			= $e->GetUMStock ();
			$e->unidadDeMedidaFabricacion	= $e->GetUMFabricacion ();
			$e->almacenDestino				= $e->GetAlmacenDestino ();
			$e->centroDeTrabajo				= $e->GetCentroDeTrabajo ();
			$e->hojaDeRuta					= $e->GetHojaDeRuta ();
			$e->tipoDeProducto				= $e->GetTipoDeProducto ();
			$e->productoSecundario			= $e->GetProductoSecundario ();
			
			return Encoder::Encode ($e);
			
		} else {
			return Encoder::EncodeResponseError ($ret_val->GetMessage ());				
		}
	}
	
	public function Actualizar ($params) {
		global $conn;
				
		if (isset ($params["id"])) {
			$id = $params["id"];
			
			$e = new Producto ($id);
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
					
		$e = new Producto ($id);
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

	public function GetInfoFormulario () {
		try {		
			$ret['tiposDeProducto'] 				= (new StoreTipoDeProducto ())->Ejecutar ();
			$ret['agrupadoresPrimarios']			= (new StoreAgrupadorProductoPrimario ())->Ejecutar ();
			$ret['agrupadoresSecundarios']			= (new StoreAgrupadorProductoSecundario ())->Ejecutar ();
			$ret['agrupadoresTerciarios']			= (new StoreAgrupadorProductoTerciario ())->Ejecutar ();
			$ret['unidadesDeMedida']				= (new StoreUnidadDeMedida ())->Ejecutar ();
			$ret['nombresDeAtributos']				= (new StoreAtributoProducto ())->Ejecutar ();
			$ret['productoAlmacen']					= (new StoreProductoAlmacen ())->Ejecutar ();
		
		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ($ex);
		}

		return Encoder::EncodeResponseOk ($ret);
	}	
	
	//
	// Devuelve un listado de las operaciones y las maquinas asociadas a un producto. Si el producto es nulo entonces
	// solo devuelve la info de las operaciones y maquinas.
	//
	public function GetOperacionesPorHojaDeRutaProducto ($productoId, $hojaDeRutaId) {
		$st = new StoreOperacionesPorHojaDeRuta ($productoId, $hojaDeRutaId);
		
		return Encoder::EncodeResponseOk ($st->Ejecutar ());	
	}
}

$ws = new FormularioController ();
$ws->Ejecutar ();
?>
