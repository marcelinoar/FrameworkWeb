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
require_once ('Sysgran/Aplicacion/Entidades/Produccion/AtributoProducto.php');
require_once ('Sysgran/Aplicacion/Modulos/Produccion/Store/StoreAtributoProducto.php');

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
		$lst->Store = new StoreAtributoProducto ();
		$lst->NombreArchivo = 'listado';
		$lst->Titulo = 'LISTADO DE ATRIBUTOS DE PRODUCTO';
		$lst->Columnas = array ('Codigo' => 'codigo', 'Nombre' => 'nombre', 'Tipo' => 'nombreTipo', 'Unidad de Medida' => 'codigoUnidadDeMedida');
		$lst->AnchoColumnas = array ('50', '200', '250', '150');
	}
	
	public function Crear ($nombre, $unidadDeMedidaId, $tipoAtributoProductoId) {
		global $conn;
				
		$e = new AtributoProducto ();
		$e->nombre = $nombre;
		$e->unidadDeMedidaId = $unidadDeMedidaId;
		$e->tipoAtributoProductoId = $tipoAtributoProductoId;
		
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
	
	public function BuscarPorId ($codigo) {
		$ret = new AtributoProducto ($codigo);
		$ret_val = $ret->Leer ();
		
		if ($ret_val != null) {
			return Encoder::EncodeResponseError ('Codigo Inexistente');				
			
		} else {
			$ret->unidadDeMedida = $ret->GetUnidadDeMedida ();
			
			return Encoder::Encode (Array ($ret));	
		}
	}
	
	public function BuscarPorCodigo ($codigo) {
		try {
			$codigo = Validador::NumeroEntero ($codigo);

			$ret = AtributoProducto::GetAtributoProductoPorCodigo ($codigo);
			$ret->unidadDeMedida = $ret->GetUnidadDeMedida ();

			if ($ret == null) {
				return Encoder::EncodeResponseError ('Codigo Inexistente');				

			} else {
				return Encoder::Encode (Array ($ret));	
			}
			
		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ($ex);
		}
	}	
	
	public function Leer ($id) {
		$e = new AtributoProducto ($id);
		
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
			
			$e = new AtributoProducto ($id);
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
					
		$e = new AtributoProducto ($id);
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
