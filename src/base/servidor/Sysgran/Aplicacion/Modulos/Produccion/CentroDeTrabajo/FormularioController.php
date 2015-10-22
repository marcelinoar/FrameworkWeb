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
require_once ('Sysgran/Aplicacion/Entidades/Produccion/CentroDeTrabajo.php');
require_once ('Sysgran/Aplicacion/Modulos/Produccion/Store/StoreCentroDeTrabajo.php');

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
		$lst->Store = new StoreCentroDeTrabajo ();
		$lst->NombreArchivo = 'listado';
		$lst->Titulo = 'LISTADO DE CENTROS DE TRABAJO';
		$lst->Columnas = array ('Codigo' => 'codigo', 'Nombre' => 'nombre');
		$lst->AnchoColumnas = array ('150', '500');
	}
	
	public function Crear ($nombre, $codigo, $atributos, $maquinas, $operaciones, $plantaId, $almacenAsociadoId, $generaPallet, $organizaPorLote) {
		global $conn;
				
		$e = new CentroDeTrabajo ();
		$e->nombre 				= $nombre;
		$e->codigo 				= $codigo;
		$e->plantaId			= $plantaId;
		$e->almacenAsociadoId 	= $almacenAsociadoId;
		$e->generaPallet 		= $generaPallet;
		$e->organizaPorLote 	= $organizaPorLote;
		
		$e->SetAtributos ($atributos);
		$e->SetOperaciones ($operaciones);
		$e->SetMaquinas ($maquinas);
		
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
			$codigo = Validador::CodigoAlfanumerico ($codigo);
			$ret = CentroDeTrabajo::GetCentroDeTrabajoPorCodigo ($codigo);

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
		$ret = new CentroDeTrabajo ($codigo);
		$ret_val = $ret->Leer ();
		
		if ($ret_val != null) {
			return Encoder::EncodeResponseError ('Codigo Inexistente');				
			
		} else {
			return Encoder::Encode (Array ($ret));	
		}
	}	
	
	public function Leer ($id) {
		$e = new CentroDeTrabajo ($id);
		
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
			
			$e = new CentroDeTrabajo ($id);
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
					
		$e = new CentroDeTrabajo ($id);
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
