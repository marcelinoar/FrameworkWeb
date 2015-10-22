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
require_once ('Sysgran/Core/Php/GeneradorExcel.php');
require_once ('Sysgran/Core/Red/Encoder.php');
require_once ('Sysgran/Aplicacion/Modulos/Produccion/Store/StoreProgramaDeTrabajo.php');

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
		$lst->Store = new StoreProgramaDeTrabajo ();
		$lst->NombreArchivo = 'listado';
		$lst->Titulo = 'PROGRAMA DE TRABAJO';
		$lst->Columnas = array ('OT' => 'id', 
								'Producto' => 'codigoProducto',
								'Fecha' => 'fechaDeProduccion',
								'Cliente' => 'codigoCliente',
								'Cantidad' => 'cantidad',
								'UM' => 'codigoUnidadDeMedida',
								'Maquina' => 'codigoMaquina',
								'Lote' => 'loteId');
		$lst->AnchoColumnas = array (50, 100, 100, 100, 100, 50, 100, 50);
	}
}

$ws = new FormularioController ();
$ws->Ejecutar ();
?>
