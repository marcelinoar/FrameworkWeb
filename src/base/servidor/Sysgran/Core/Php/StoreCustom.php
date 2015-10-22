<?
require_once ('template.php');
require_once ('StoreBase.php');
require_once ('Sysgran/Core/Red/Encoder.php');
require_once ('Sysgran/Core/Listados/ParametroFiltro.php');
require_once ('Sysgran/Core/Listados/ParametroBusqueda.php');

class StoreCustom {
	public $HabilitaPaginado;
	protected $Filtros = array ();
	
	public function StoreCustom ($paginado = false) {
		$this->HabilitaPaginado = $paginado;
		$this->AutoCargaParametros = true;
	}

	public function GetFiltro ($nombre) {
		$ret = null;
		
		if (isset ($this->Filtros[$nombre])) {
			$ret = $this->Filtros[$nombre];
		}
		
		return $ret;
	}
	
	// Sobrecargable.
	protected function ArmarQuery () {
	}
	
	// Sobrecargable.
	protected function CargarItem ($rs) {
	}
	
	// Es equivalente a agregar parametro. Hay que reemplazarla.
	protected function AgregarFiltro ($filtro) {
		$this->Filtros[$filtro->Nombre] = $filtro;	
	}
	
	public function SetearValorFiltros ($GET) {;
		foreach ($this->Filtros as $item) {
			$item->EvaluarParametros ($GET);
		}
	}
	
	public function Ejecutar () {
		global $conn;
		
		$this->Query = $this->ArmarQuery ();
		
		// Si esta habilitado el paginado cambio el query y tomo los parametros de la pagina.
		// Sino directamente ejecuto el query.
		if ($this->HabilitaPaginado == true) {
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

			$this->Query = $antes . ' COUNT(*) OVER() AS cntTotal, ' . $despues . ' LIMIT ' . $limit . ' OFFSET ' . $start;
		}
		
		$rs = $conn->Retrieve ($this->Query);

		$lst = array ();
		$total = 0;
		
		while (!$rs->Eof ()) {
			$lst[] = $this->CargarItem ($rs);

			if ($this->HabilitaPaginado) {
				$this->Total = $rs->Fields ("cntTotal");
			}
			$rs->Next ();
		}

		$rs->Close ();
		
		return $lst;
	}
}

?>