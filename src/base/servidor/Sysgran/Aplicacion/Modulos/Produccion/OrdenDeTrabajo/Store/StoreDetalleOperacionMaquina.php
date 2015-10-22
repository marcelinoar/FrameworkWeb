<?
/**************************************************************************************************
 * Archivo: StoreDetalleOperacionMaquina.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: 
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ('template.php');
require_once ('Sysgran/Core/Red/Encoder.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/Maquina.php');

//
// Para hacer los calculos recibimos el Id de la OT por que 
// por mas que esta fijado que la OT usa siempre la misma Hoja de Ruta que el producto asociado, la OT mantiene
// una copia privada de esa hoja de ruta congelada en el momento en que se creo la misma, y entonces por esto
// puede ser diferente a la del producto, si la de este ultimo cambio despues de haber creado la OT.
//

class StoreDetalleOperacionMaquina {
	private $Producto;
	private $Cantidad;
	private $OrdenDeTrabajoId;
	
	public function StoreDetalleOperacionMaquina ($ordendeTrabajoId, $Producto, $cantidad) {
		$this->Producto			= $Producto;
		$this->Cantidad 		= $cantidad;
		$this->OrdenDeTrabajoId	= $ordenDeTrabajoId;
	}

	public function Ejecutar () {
		global $conn;
		
		// Si se trata de una OT nueva usamos la HDR del producto.
		if ($this->OrdenDeTrabajoId == null) {
			$rs = $conn->Retrieve ("SELECT dh.iOperacionId
									FROM DetHojaDeRuta dh
									WHERE
										dh.iHojaDeRutaId = " . $this->Producto->hojaDeRutaId);
		
		// Sino usamos la de la OT.
		} else {
			$rs = $conn->Retrieve ("SELECT dh.iOperacionId
									FROM DetHojaDeRutaProductoMaquina dh, OrdenDeTrabajo ot
									WHERE
										ot.iOrdenDeTrabajoId = " . $this->OrdenDeTrabajoId . " AND 
										dh.iProductoId = " . $this->Producto->id . " AND
										dh.iHojaDeRutaId = ot.iHojaDeRutaId");
		}
		
		$ret = array ();
		while (!$rs->Eof ()) {
			$st = new StoreDetalleOperacion ($this->OrdenDeTrabajoId, $this->Producto, $this->Cantidad, $rs->Fields ("iOperacionId"));
			
			$item['operacionId'] = $rs->Fields ("iOperacionId");
			$item['maquinas'] = $st->Ejecutar ();
			
			$ret[] = $item;
			$rs->Next ();
		}
	
		$rs->Close ();		
		
		return $ret;
	}
}
?>