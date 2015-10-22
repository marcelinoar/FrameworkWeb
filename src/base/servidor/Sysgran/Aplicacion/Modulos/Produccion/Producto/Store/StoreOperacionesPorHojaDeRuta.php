<?
/**************************************************************************************************
 * Archivo: StoreOperacionesPorHojaDeRuta.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Devuelve para una operacion y un producto, cuales son las maquinas que estan disponibles.
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ('template.php');
require_once ('Sysgran/Core/Red/Encoder.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/Maquina.php');

class StoreOperacionesPorHojaDeRuta {
	private $ProductoId;
	private $HojaDeRutaId;
	
	public function StoreOperacionesPorHojaDeRuta ($productoId, $hojaDeRutaId) {
		$this->ProductoId		= $productoId;
		$this->HojaDeRutaId		= $hojaDeRutaId;
	}

	public function Ejecutar () {
		global $conn;

		// Si no recibimos el producto devolvemos todas las cantidades en cero.
		if ($this->ProductoId == null) {
			$rs = $conn->Retrieve ("SELECT o.iOperacionId, m.iMaquinaId, o.cCodigo AS cod_operacion, m.cCodigo AS cod_maquina, 0 AS fTiempoTrabajo, 0 AS fTiempoPreparacion, 0 AS iCntOperTrabajo, 0 AS iCntOperPreparacion, 0 AS fKgDeMerma, 0 AS fKgDeRecorte
									FROM DetHojaDeRuta dhr, Operacion o, Maquina m, MaquinaOperacion mo
									WHERE
										dhr.iHojaDeRutaId = $this->HojaDeRutaId AND
										dhr.iOperacionId = o.iOperacionId AND
										dhr.iOperacionId = mo.iOperacionId AND
										m.iMaquinaId = mo.iMaquinaId 
									ORDER BY dhr.iNroDeOrden, m.iMaquinaId");
		
		} else {
			$rs = $conn->Retrieve ("SELECT t1.iOperacionId, m.cCodigo AS cod_maquina, o.cCodigo AS cod_operacion, t1.iMaquinaId, dd.fTiempoTrabajo, dd.fTiempoPreparacion, dd.iCntOperTrabajo, dd.iCntOperPreparacion, dd.fKgDeMerma, dd.fKgDeRecorte
									FROM (
										SELECT o.iOperacionId, mo.iMaquinaId, dhr.iHojaDeRutaId, dhr.iNroDeOrden
										FROM DetHojaDeRuta dhr, Operacion o,MaquinaOperacion mo
										WHERE
											dhr.iHojaDeRutaId = $this->HojaDeRutaId AND
											dhr.iOperacionId = o.iOperacionId AND
											dhr.iOperacionId = mo.iOperacionId
									) t1
									LEFT OUTER JOIN DetHojaDeRutaProductoMaquina dd ON (
										dd.iOperacionId = t1.iOperacionId AND
										dd.iHojaDeRutaId = t1.iHojaDeRutaId AND
										dd.iProductoId = $this->ProductoId AND
										dd.iMaquinaId = t1.iMaquinaId
									), Maquina m, Operacion o
									WHERE
										m.iMaquinaId = t1.iMaquinaId AND
										o.iOperacionId = t1.iOperacionId
									ORDER BY t1.iNroDeOrden, t1.iMaquinaId");
		}									
		
		$ret = array ();
		while (!$rs->Eof ()) {
			$item['maquinaId'] 			= $rs->Fields ("iMaquinaId");
			$item['codigoMaquina'] 		= $rs->Fields ("cod_maquina");
			$item['operacionId'] 		= $rs->Fields ("iOperacionId");
			$item['codigoOperacion'] 	= $rs->Fields ("cod_operacion");
			$item['tiempoTrabajo'] 		= DB::FromFloat (($rs->Fields ("fTiempoTrabajo") == null ? 0 : $rs->Fields ("fTiempoTrabajo")));
			$item['tiempoPreparacion'] 	= DB::FromFloat (($rs->Fields ("fTiempoPreparacion") == null ? 0 : $rs->Fields ("fTiempoPreparacion")));
			$item['cntOperTrabajo'] 	= ($rs->Fields ("iCntOperTrabajo") == null ? 0 : $rs->Fields ("iCntOperTrabajo"));
			$item['cntOperPreparacion'] = ($rs->Fields ("iCntOperPreparacion") == null ? 0 : $rs->Fields ("iCntOperPreparacion"));
			$item['kgDeMerma'] 			= DB::FromFloat (($rs->Fields ("fKgDeMerma") == null ? 0 : $rs->Fields ("fKgDeMerma")));
			$item['kgDeRecorte'] 		= DB::FromFloat (($rs->Fields ("fKgDeRecorte") == null ? 0 : $rs->Fields ("fKgDeRecorte")));
			$item['productoId']			= ($this->ProductoId == null ? 0 : $this->ProductoId);
			$item['hojaDeRutaId']		= $this->HojaDeRutaId;

			$ret[] = $item;
			$rs->Next ();
		}
	
		$rs->Close ();		
		
		return $ret;
	}
}
?>