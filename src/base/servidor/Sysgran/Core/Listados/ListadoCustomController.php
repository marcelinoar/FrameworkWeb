<?
/***************************************************************************************************
 * 																									
 * Archivo: ListadoCustomController.php																		
 * ------------------------------------------------------------------------------------------------ 
 *																									
 * Autor: Marcelino Morales																			
 * 																									
 * Version: 1.0																						
 * 																									
 * Descripcion: Permite generar un listado accediendo a los parametros de entrada directamente.
 *																									
 ***************************************************************************************************/

class ListadoCustomController {
	protected $Query;
	
	public function ListadoCustomController () {
		$this->Query = '';
	}
	
	public function GetParametro ($nombre) {
		$ret = null;
		
		if (isset ($_GET[$nombre])) {
			$ret = $_GET[$nombre];
		}
		
		return $ret;
	}
	
	// Sobrecargable.
	public function ArmarQuery () {
	}
	
	// Sobrecargable.
	public function CargarItem ($rs) {
	}
	
	public function Ejecutar () {
		global $_GET;
		global $conn;
		
		$this->ArmarQuery ();
		
		$start = $_GET['start'];
		$limit = $_GET['limit'];

		if ($start <= 0) {
			$start = 0;
		}

		if ($limit <= 0) {
			$limit = 1;
		}

		$query = $this->Query;		
		$pselect = strpos ($query, 'SELECT');
		$antes = substr ($query, 0, $pselect + 6);
		$despues = substr ($query, $pselect + 6);

		$query = $antes . ' COUNT(*) OVER() AS cntTotal, ' . $despues . ' LIMIT ' . $limit . ' OFFSET ' . $start;

		//$query = "SELECT * FROM (SELECT R.*, rowNum AS rnum, COUNT(*) OVER() AS cntTotal FROM (" . $this->Query. ") R) WHERE rnum > $start AND rnum <= " . ($start + $limit);
		
		$rs = $conn->Retrieve ($query);

		$lst = null;
		$total = 0;
		
		while (!$rs->Eof ()) {
			$lst[] = $this->CargarItem ($rs);
			$total = $rs->Fields ("cntTotal");
			
			$rs->Next ();
		}

		$rs->Close ();
		
		print $this->ImprimirListadoPaginado ($lst, $total);
	}

	private function ImprimirListadoPaginado ($lst, $total) {
		$arr = array ();
		$arr['root'] = $lst;
		$arr['total'] = $total;
		
		return Encoder::Encode ($arr, '');
	}
}

?>