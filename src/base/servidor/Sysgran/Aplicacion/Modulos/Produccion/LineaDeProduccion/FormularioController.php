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
require_once ('Sysgran/Aplicacion/Entidades/Produccion/LineaDeProduccion.php');
require_once ('Sysgran/Aplicacion/Modulos/Produccion/Store/StoreLineaDeProduccion.php');

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
		$lst->Store = new StoreLineaDeProduccion ();
		$lst->NombreArchivo = 'listado';
		$lst->Titulo = 'LISTADO DE LINEAS DE PRODUCCION';
		$lst->Columnas = array ('Codigo' => 'codigo', 'Descripcion' => 'descripcionCorta');
		$lst->AnchoColumnas = array ('150', '500');
	}
	
	public function Crear ($codigo, $descripcionCorta, $descripcionLarga) {
		global $conn;
		
		if (LineaDeProduccion::GetLineaDeProduccionPorCodigo ($codigo) == null) {
			$e = new LineaDeProduccion ();
			$e->codigo = $codigo;
			$e->descripcionCorta = $descripcionCorta;
			$e->descripcionLarga = $descripcionLarga;

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
	
	public function BuscarPorCodigo ($codigo) {
		try {
			$codigo = Validador::CodigoAlfanumerico ($codigo);
			$ret = LineaDeProduccion::GetLineaDeProduccionPorCodigo ($codigo);

			if ($ret == null) {
				return Encoder::EncodeResponseError ('Codigo Inexistente');				

			} else {
				return Encoder::Encode (Array ($ret));	
			}
			
		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ($ex);
		}
	}	

	public function BuscarPorId ($codigo) {
		$ret = new LineaDeProduccion ($codigo);
		$ret_val = $ret->Leer ();
		
		if ($ret_val != null) {
			return Encoder::EncodeResponseError ('Codigo Inexistente');				
			
		} else {
			return Encoder::Encode (Array ($ret));	
		}
	}		
		
	public function Leer ($id) {
		$e = new LineaDeProduccion ($id);
		
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
			
			$e = new LineaDeProduccion ($id);
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
					
		$e = new LineaDeProduccion ($id);
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
