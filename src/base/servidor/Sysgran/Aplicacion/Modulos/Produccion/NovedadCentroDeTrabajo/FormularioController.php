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
require_once ('Sysgran/Aplicacion/Entidades/Produccion/NovedadCentroDeTrabajo.php');
require_once ('Sysgran/Aplicacion/Modulos/Produccion/Store/StoreNovedadCentroDeTrabajo.php');

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
		$lst->Store = new StoreNovedadCentroDeTrabajo ();
		$lst->NombreArchivo = 'listado';
		$lst->Titulo = 'NOVEDADES CENTRO DE TRABAJO';
		$lst->Columnas = array ('Nro' => 'id', 'Centro de Trabajo' => 'nombreCentroDeTrabajo', 'Tipo' => 'nombreTipo', 'Fecha y Hora' => 'fecha', 'Maquina' => 'codigoMaquina', 'Comentarios' => 'comentario');
		$lst->AnchoColumnas = array ('50', '120', '120', '150', '100', '110');
	}
	
	public function Crear (   $maquinaId
							, $centroDeTrabajoId
							, $tipoNovedadCTId
							, $comentarios
							, $fecha
							, $hora
							, $minutos){
							
		$vf = new NovedadCentroDeTrabajo ();
		$vf->maquinaId 			= $maquinaId;
		$vf->centroDeTrabajoId	= $centroDeTrabajoId;
		$vf->tipoNovedadCTId	= $tipoNovedadCTId;
		$vf->comentarios		= $comentarios;
		$vf->fechaYHora			= sprintf ("%s %0d:%0d:00", $fecha, $hora, $minutos);

		$ret_val = $vf->Crear ();
		if ($ret_val != null) {
			return Encoder::EncodeResponseError ($ret_val);
		}
		
		return Encoder::EncodeResponseOk ();			
	}
	
	public function Leer ($id){
		$e = new NovedadCentroDeTrabajo ($id);
		$ret_val = $e->Leer ();
		
		if ($ret_val == null) {
			$e->fecha 	= $e->GetFecha ();
			$e->hora	= $e->GetHoras ();
			$e->minutos	= $e->GetMinutos ();
			$e->usuario	= $e->GetUsuario ();
			
			return Encoder::Encode ($e);
			
		} else {
			return Encoder::EncodeResponseError ($ret_val->GetMessage ());				
		}	
	}
}

$ws = new FormularioController ();
$ws->Ejecutar ();
?>
