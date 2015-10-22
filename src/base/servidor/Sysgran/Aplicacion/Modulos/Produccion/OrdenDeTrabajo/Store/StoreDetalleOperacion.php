<?
/**************************************************************************************************
 * Archivo: StoreDetalleOperacion.php
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

class StoreDetalleOperacion {
	private $Producto;
	private $Cantidad;
	private $OperacionId;
	private $OrdenDeTrabajo;
	
	public function StoreDetalleOperacion ($ot, $prod, $cantidad, $operacionId) {
		$this->Producto			= $prod;
		$this->OperacionId		= $operacionId;
		$this->Cantidad 		= $cantidad;
		$this->OrdenDeTrabajo	= $ot;
	}

	public function Ejecutar () {
		global $conn;
		
		// Si tenemos la OT entonces usamos la hoja de ruta asociada, sino usamos la del producto.
		$hdr_id = $this->Producto->hojaDeRutaId;
		if ($this->OrdenDeTrabajo != null) {
			$hdr_id = $this->OrdenDeTrabajo->hojaDeRutaId;
		}
		$rs = $conn->Retrieve ("SELECT m.iMaquinaId, dh.fTiempoTrabajo, m.cCodigo, dh.iOperacionId
								FROM DetHojaDeRutaProductoMaquina dh
								JOIN Maquina m ON m.iMaquinaId = dh.iMaquinaId
								WHERE
									dh.iProductoId = " . $this->Producto->id . " AND
									dh.iHojaDeRutaId = " . $hdr_id . " AND 
									dh.iOperacionId = $this->OperacionId");
		
		$ret = array ();
		$item['maquinaId'] 		= 0;
		$item['codigo'] 		= 'Ninguna';
		$item['tiempoEstandar'] = 0;
		$ret[] = $item;
		
		while (!$rs->Eof ()) {
			$item['maquinaId'] = $rs->Fields ("iMaquinaId");
			$item['codigo'] = $rs->Fields ("cCodigo");
			$item['tiempoEstandar'] = DB::FromFloat ($this->Producto->CalcularTiempoEstandarDeOperMaquina ($this->OperacionId, $this->Producto->hojaDeRutaId, $rs->Fields ("iMaquinaId"), $this->Cantidad));

			$ret[] = $item;
			$rs->Next ();
		}
	
		$rs->Close ();		
		
		return $ret;
	}
}
?>