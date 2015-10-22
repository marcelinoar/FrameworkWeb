<?
/**************************************************************************************************
 * Archivo: StoreDetalleFormula.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Trae los datos de la grilla de detalles de Hoja de ruta del ABM de OT
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ('template.php');
require_once ('Sysgran/Core/Red/Encoder.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/Maquina.php');

class StoreDetalleHojaDeRuta {
	private $Producto;
	private $HojaDeRutaId;
	private $Cantidad;
	private $OrdenDeTrabajoId;
	
	public function StoreDetalleHojaDeRuta ($Producto, $hojaDeRutaId, $cantidad, $ordenDeTrabajoId) {
		$this->Producto			= $Producto;
		$this->HojaDeRutaId 	= $hojaDeRutaId;
		$this->Cantidad 		= $cantidad;
		$this->OrdenDeTrabajoId	= $ordenDeTrabajoId;
	}

	public function Ejecutar () {
		global $conn;
		
		if ($this->OrdenDeTrabajoId == null) {
			$rs = $conn->Retrieve ("SELECT dh.iOperacionId, o.cDescripcion, o.cCodigo, count (rr.*), max (rr.iMaquinaId)
									FROM DetHojaDeRuta dh
									JOIN Operacion o ON o.iOperacionId = dh.iOperacionId 
									LEFT OUTER JOIN DetHojaDeRutaProductoMaquina rr ON (rr.iOperacionId = dh.iOperacionId AND rr.iHojaDeRutaId = dh.iHojaDeRutaId AND rr.iProductoid = " . $this->Producto->id . ")
									WHERE
										dh.iHojaDeRutaId = $this->HojaDeRutaId
									GROUP BY dh.iOperacionid, o.cCodigo, o.cDescripcion, dh.iNroDeOrden
									ORDER BY dh.iNroDeOrden desc");

		} else {
			// Si viene con OT entonces devolvemos la maquina que fue seleccionada.

			$rs = $conn->Retrieve ("SELECT o.iOperacionId, o.cDescripcion, o.cCodigo, oo.iMaquinaId AS maquina_id, (CASE WHEN oo.iMaquinaId = 0 THEN 0 ELSE 1 END) AS cnt_maquinas
									FROM OrdenDeTrabajo ot
									JOIN DetHojaDeRuta dh ON dh.iHojaDeRutaId = ot.iHojaDeRutaId
									JOIN Operacion o ON o.iOperacionId = dh.iOperacionId
									LEFT OUTER JOIN OperacionPorOt oo ON (oo.iOrdenDeTrabajoId = ot.iOrdenDeTrabajoId AND oo.iHojaDeRutaId = ot.iHojaDeRutaId)
									WHERE
										ot.iOrdenDeTrabajoId = $this->OrdenDeTrabajoId
									ORDER BY dh.iNroDeOrden");
			
			/* Este era el query orignal. no funcionaba por que no traia las operaciones nuevas si modificaba la hoja de ruta despues de haber creado la OT.
			$rs = $conn->Retrieve ("SELECT oo.iOperacionId, o.cDescripcion, o.cCodigo, oo.iMaquinaId AS maquina_id, (CASE WHEN oo.iMaquinaId = 0 THEN 0 ELSE 1 END) AS cnt_maquinas
									FROM OrdenDeTrabajo ot
									JOIN OperacionPorOt oo ON (oo.iOrdenDeTrabajoId = ot.iOrdenDeTrabajoId AND oo.iHojaDeRutaId = ot.iHojaDeRutaId),
									DetHojaDeRuta dh, Operacion o
									WHERE
										o.iOperacionId = oo.iOperacionId AND
										dh.iOperacionId = oo.iOperacionId AND
										dh.iHojaDeRutaId = oo.iHojaDeRutaId AND
										ot.iOrdenDeTrabajoId = $this->OrdenDeTrabajoId
									ORDER BY dh.iNroDeOrden", 1); */
		}
		
		$ret = array ();
		while (!$rs->Eof ()) {
			$item['codigoOperacion'] 		= $rs->Fields ("cCodigo");
			$item['operacionId'] 			= $rs->Fields ("iOperacionId");
			$item['descripcionOperacion'] 	= $rs->Fields ("cDescripcion");

			// Si hay una sola maquina cargada entonces la seleccionamos directamente.		
			if ($rs->Fields ("cnt_maquinas") == 1) {
				$maquina = new Maquina ($rs->Fields ("maquina_id"));
				$maquina->Leer ();
			
				$item['maquinaId'] 		= $maquina->id;
				$item['codigoMaquina'] 	= $maquina->codigo;
				$item['tiempoEstandar'] = $this->Producto->CalcularTiempoEstandarDeOperMaquina ($rs->Fields ("iOperacionId"), $this->HojaDeRutaId, $maquina->id, $this->Cantidad);

			// Si no hay ninguna o hay mas de una
			} else {
				$item['maquinaId'] 		= 0;
				$item['codigoMaquina'] 	= 'Ninguna';
				$item['tiempoEstandar'] = 0;
			}
			
			$ret[] = $item;
			$rs->Next ();
		}
		
		$rs->Close ();
		
		return $ret;
	}
}
?>