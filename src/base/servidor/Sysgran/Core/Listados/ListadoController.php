<?
/***************************************************************************************************
 * 																									
 * Archivo: ListadoControllerBase.php																		
 * ------------------------------------------------------------------------------------------------ 
 *																									
 * Autor: Marcelino Morales																			
 * 																									
 * Version: 1.0																						
 * 																									
 * Descripcion:
 *																									
 ***************************************************************************************************/

class ListadoController {
	private $Store;
	
	public function ListadoController () {
		$this->Store = null;
	}

	public function SetListadoDefault ($st) {
		$this->Store = $st;
	}
	
	private function SetearParametrosListado () {
		if ($this->Store->AutoCargaParametros) {
			$this->Store->SetearValorFiltros ($_GET);
			
		} else {
			foreach ($_GET as $clave => $valor) {
				$this->Store->SetParametro ($clave, $valor);
			}	
		}
	}

	public function Ejecutar () {
		$this->SetearParametrosListado ();

		if ($this->Store->HabilitaPaginado) {
			print $this->ImprimirListadoPaginado ();

		} else {
			print $this->ImprimirListadoEstandar ();
		}
	}
	
	private function ImprimirListadoEstandar () {
		return Encoder::Encode ($this->Store->Ejecutar (), 'root');
	}
	
	private function ImprimirListadoPaginado () {
		$arr = array ();
		$arr['root'] = $this->Store->Ejecutar ();
		$arr['total'] = $this->Store->Total;
		
		return Encoder::Encode ($arr, '');
	}
}

?>