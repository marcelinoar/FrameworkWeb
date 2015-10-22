<?
require_once ('template.php');
require_once ('Sysgran/Core/Red/Encoder.php');
require_once ('Sysgran/Core/Listados/ParametroFiltro.php');
require_once ('Sysgran/Core/Listados/ParametroBusqueda.php');

class StoreBase {
	protected $Query;
	protected $Filtros;
	public $HabilitaPaginado;					// Si es true entonces se crean los parametros limit, start y page.
	public $Total;								// Cantidad total de registros existentes.
	public $AutoCargaParametros;				// Indica la forma en que el Listado controller debe realizar la carga de los parametros.
												// Puede ser de la forma clasica (default) o como lo hace el StoreCustom.
	
	public function StoreBase ($paginado = false) {
		$this->Filtros = array ();
		$this->HabilitaPaginado = $paginado;
		$this->Total = 0;
		$this->AutoCargaParametros = false;
	}
	
	public function GetFiltro ($nombre) {
		return $this->Filtros[$nombre];
	}
	
	public function Ejecutar () {
		global $conn;
		
		$rs = $conn->Retrieve ($this->ArmarQuery ());

		$list = array ();
		while (!$rs->Eof ()) {
			$list[] = $this->CargarItem ($rs);
			
			if ($this->HabilitaPaginado) {
				$this->Total = $rs->Fields ("cntTotal");
			}
			
			$rs->Next ();
		}

		$rs->Close ();
		
		return $list;	
	}

	//
	// Setea un valor al parametro indicado.
	//
	public function SetParametro ($nombre, $valor) {
		$ret = null;
		
		for ($i = 0; $i < count ($this->Filtros) && ($ret == null); $i++) {
			//if ($this->Filtros[$i]->Nombre == $nombre) {
			
			// Consulta si el parametro recibido pertenece a algun componente de busqueda.
			if ($this->Filtros[$i]->PerteneceParametro ($nombre)) {
				// De ser asi lo informa.
				$ret = $this->Filtros[$i];
				$this->Filtros[$i]->SetValor ($nombre, $valor);
			}
		}	
		
		return $ret;	
	}

	protected function AgregarParametro ($param) {
		$this->Filtros[] = $param;	
	}
	
	protected function CargarItem ($rs) {
	}
	
	//
	// Arma un array de strings donde cada item tiene la forma: "<campo_parametro> = <valor>".
	//
	private function GetParametrosActivos () {
		$ret = array ();
		for ($i = 0; $i < count ($this->Filtros); $i++) {
			if ($this->Filtros[$i]->Activo) {
				$ret[] = $this->Filtros[$i]->GetTextoQuery ();
			}
		}
		
		return $ret;
	}
	
	//
	// Arma un string con los parametros activos de la forma: "<campo> = <valor> AND <campo> = <valor> AND ..."
	//
	private function GetParamWhere () {
		$params_activos = $this->GetParametrosActivos ();
		$ret = '';
	
		if (count ($params_activos) > 0) {
			$ret = $params_activos[0];
			
			for ($i = 1; $i < count ($params_activos); $i++) {
				$ret .= ' AND ' . $params_activos[$i];
			}
		}
		
		return $ret;
	}
	
	/*
	 * Devuelve true si hay algun parametro activo.
	 */
	private function AplicarParametros () {
		$ret = false;
		for ($i = 0; $i < count ($this->Filtros); $i++) {
			$ret = $ret || $this->Filtros[$i]->Activo;
		}
		
		return $ret;
	}
	
	/*
	 * Si esta habilitado el paginado mete el query en un sub query del from y filtra los resultados por pagina
	 */
	private function ArmarQuery () {
		global $_GET;
		
		if ($this->AplicarParametros ()) {
			$this->InsertarParametros ();
		}
		
		// Usamos el query modificado (si es que se le agregaron los atributos)
		$query = $this->Query;		
		
		if ($this->HabilitaPaginado == true) {
			$start = $_GET['start'];
			$limit = $_GET['limit'];
			
			if ($start <= 0) {
				$start = 0;
			}
			
			if ($limit <= 0) {
				$limit = 1;
			}
			
			// Para postgresql
			$pselect = strpos ($query, 'SELECT');
			$antes = substr ($query, 0, $pselect + 6);
			$despues = substr ($query, $pselect + 6);

			$query = $antes . ' COUNT(*) OVER() AS cntTotal, ' . $despues . ' LIMIT ' . $limit . ' OFFSET ' . $start;
			
			// Para Oracle
			//$query = "SELECT * FROM (SELECT R.*, rowNum AS rnum, COUNT(*) OVER() AS cntTotal FROM (" . $query . ") R) WHERE rnum > $start AND rnum <= " . ($start + $limit);
		}

		return $query;
	}	

	/**
	 *
	 * Esta funcion solo debe ser llamada si hay algun parametro habilitado (es decir, si vino alguno por GET)
	 * La funcion entonces modifica el query interno insertando las condiciones en el Where que sean necesarias
	 *
	 */
	
	private function InsertarParametros () {
		$pwhere = strpos ($this->Query, 'WHERE');
		if ($pwhere != false) {
			$antes = substr ($this->Query, 0, $pwhere + 5);
			$despues = substr ($this->Query, $pwhere + 5);

			$query = $antes . ' ' . $this->GetParamWhere (). ' AND '. $despues;

		// Si no tiene where entonces ponemos los parametros antes del group u order by
		} else {
			$pgroupby = strpos ($this->Query, 'GROUP BY');
			$porderby = strpos ($this->Query, 'ORDER BY');

			// Lo ponemos adelante del que aparezca primero.

			if ($pgroupby && !$porderby) { 							// Si solo tengo group by
				$antes = substr ($this->Query, 0, $pgroupby);
				$despues = substr ($this->Query, $pgroupby);

				$query = $antes . ' WHERE ' . $this->GetParamWhere () . ' ' . $despues;

			} else if (!$pgroupby && $porderby) { 					// Si solo tengo order by
				$antes = substr ($this->Query, 0, $porderby);
				$despues = substr ($this->Query, $porderby);

				$query = $antes . ' WHERE ' . $this->GetParamWhere () . ' ' . $despues;

			} else if ($pgroupby && $porderby) { 					//Si tengo los dos pongo los parametros adelante del que ete primero
				if ($pgroupby > $porderby) {
					$antes = substr ($this->Query, 0, $porderby);
					$despues = substr ($this->Query, $porderby);

					$query = $antes . ' WHERE ' . $this->GetParamWhere () . ' ' . $despues;

				} else {
					$antes = substr ($this->Query, 0, $pgroupby);
					$despues = substr ($this->Query, $pgroupby);

					$query = $antes . ' WHERE ' . $this->GetParamWhere () . ' ' . $despues;
				}

			} else { 												// Si no tengo ninguno
				$query = $this->Query . ' WHERE ' . $this->GetParamWhere ();
			}
		}
		
		$this->Query = $query;
	}
}

/*
 * Convencion: Los querys con mayuscula, ningun alias igual rnum, ningun parametro igual a limit, page y start, no se usa select *. Hay que nombrar todos los campos
 */

/*
class StoreMovimientoCajero extends Store {
	public function StoreMovimientoCajero () {
		parent::__construct ();

		$this->AgregarParametro (new ParametroFiltro ("ftipo", "tc.iTipoCajaId"));
		$this->AgregarParametro (new ParametroFiltro ("fubic", "u.iUbicacionId"));
		$this->AgregarParametro (new ParametroBusqueda ("bnom", "c.cNombre"));

		$this->Query = "SELECT c.*, tc.cNombre AS nom_tipo, u.cNombre AS nom_ubic 
							FROM Caja c, TipoCaja tc, UbicacionDeCajas u
							WHERE
								c.iUbicacionId = u.iUbicacionId AND
								c.iTipoCajaId = tc.iTipoCajaId";
	}
	
	protected function CargarItem ($rs) {
		$ret['id'] 					= $rs->Fields ("iCajaId");
		$ret['codigo']				= $rs->Fields ("iCodigo");
		$ret['nombre'] 				= $rs->Fields ("cNombre");
		$ret['ubicacion']['nombre'] = $rs->Fields ("nom_ubic");
		$ret['tipoCaja']['nombre'] 	= $rs->Fields ("nom_tipo");

		return $ret;
	}
}

$s = new StoreMovimientoCajero ();
//$s->SetParametro ('ftipo', 1);
print Encoder::Encode ($s->Ejecutar ());


SELECT p.cCodigo, p.cDescripcionCorta AS desc_producto, ldp.cDescripcionCorta AS desc_linea
      , umst.cCodigo AS um_stock, ep.cNombre AS estado, tdp.cNombre AS tipo
      , umf.cDescripcionCorta AS um_fabricacion
FROM Producto p
LEFT OUTER JOIN UnidadDeMedida umst ON (p.iUnidadDeMedidaStockId = umst.iUnidadDeMedidaId)
LEFT OUTER JOIN LineaDeProduccion ldp ON (p.iLineaDeProduccionId = ldp.iLineaDeProduccionId)
LEFT OUTER JOIN ProductoFabricacion pf ON (p.iProductoId = pf.iProductoId) 
LEFT OUTER JOIN UnidadDeMedida umf ON (pf.iUnidadDeMedidaId = umf.iUnidadDeMedidaId)
-- Agregando o sacando esto cambio el filtro de formula LEFT OUTER JOIN FormulaDeProduccionProducto fpp ON (p.iProductoId = fpp.iProductoId AND fpp.iFormulaDeProduccionId = 35)
JOIN EstadoProducto ep ON (p.iEstadoProductoId = ep.iEstadoProductoId)
JOIN TipoDeProducto tdp ON (p.iTipoDeProductoId = tdp.iTipoDeProductoId)
WHERE 
  p.cCodigo LIKE ('%S%')
*/
?>