<?
/**************************************************************************************************
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
require_once ('Sysgran/Aplicacion/Entidades/Produccion/UbicacionAlmacen.php');
require_once ('Sysgran/Aplicacion/Modulos/Produccion/Store/StoreUbicacionAlmacen.php');

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
	
	
	public function BuscarPorId ($codigo) {
		$ret = new UbicacionAlmacen ($codigo);
		$ret_val = $ret->Leer ();
		
		if ($ret_val != null) {
			return Encoder::EncodeResponseError ('Codigo Inexistente');				
			
		} else {
			$ret->zona = $ret->GetZona ();
			$ret->area = $ret->GetArea ();
		
			return Encoder::Encode (Array ($ret));	
		}
	}		
	
	public function BuscarPorCodigo ($codigo) {
		try {
			$ret = UbicacionAlmacen::GetUbicacionAlmacenPorCodigo ($codigo);

			if ($ret == null) {
				return Encoder::EncodeResponseError ('Codigo Inexistente');				

			} else {
				$ret->zona = $ret->GetZona ();
				$ret->area = $ret->GetArea ();
			
				return Encoder::Encode (Array ($ret));	
			}
			
		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ($ex);
		}
	}	
	
	private function ConfigurarListadoImpresion ($lst) {
		$lst->Store = new StoreUbicacionAlmacen ();
		$lst->NombreArchivo = 'listado';
		$lst->Titulo = 'UBICACIONES DE ALMACENES';
		$lst->Columnas = array ('Codigo' => 'codigo', 
								'Planta' => 'nombrePlanta',
								'Almacen' => 'codigoAlmacen',
								'Zona' => 'codigoZona',
								'Area' => 'codigoArea',
								'Descripcion' => 'descripcion');
		$lst->AnchoColumnas = array (90, 120, 80, 80, 80, 200);
	}

	public function Crear ($codigo, $almacenId, $zonaStockId, $areaStockId, $descripcion) {
		global $conn;
				
		$e = new UbicacionAlmacen ();
		$e->codigo = $codigo;
		$e->almacenId = $almacenId;
		$e->zonaStockId = $zonaStockId;
		$e->areaStockId = $areaStockId;
		$e->descripcion = $descripcion;
		
		// ** Agregar las llamadas a los metodos de la clase que cargan los elementos de cada array detalle.
			
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
	
	public function Leer ($id) {
		$e = new UbicacionAlmacen ($id);
		
		$ret_val = $e->Leer ();
		
		if ($ret_val == null) {
			return Encoder::Encode ($e);
			
		} else {
			return Encoder::EncodeResponseError ($ret_val->GetMessage ());				
		}
	}
	
	public function Actualizar ($params) {
		global $conn;
				
		if (isset ($params["id"])) {
			$id = $params["id"];
			
			$e = new UbicacionAlmacen ($id);
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
					
		$e = new UbicacionAlmacen ($id);
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
}

$ws = new FormularioController ();
$ws->Ejecutar ();
?>
