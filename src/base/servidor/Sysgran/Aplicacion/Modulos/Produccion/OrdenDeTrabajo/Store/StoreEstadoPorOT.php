<?
/**************************************************************************************************
 * Archivo: StoreEstadoPorOT.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Devuelve el contenido del combo de estados que tiene disponible una OT
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ('template.php');
require_once ('Sysgran/Core/Red/Encoder.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/EstadoOT.php');

class StoreEstadoPorOT {
	private $ordenDeTrabajoId;
	
	public function StoreEstadoPorOT ($ordenDeTrabajoId = null) {
		$this->ordenDeTrabajoId = $ordenDeTrabajoId;
	}

	public function Ejecutar () {
		global $conn;
		
		$ret = array ();
		switch ($this->ordenDeTrabajoId) {
			case null:
				$ret[] = new EstadoOT (EstadoOT::NoEmitida);
				break;
				
			case EstadoOT::Emitida:
				$ret[] = new EstadoOT (EstadoOT::Confirmada);
				$ret[] = new EstadoOT (EstadoOT::Anulada);
				break;
				
			case EstadoOT::Confirmada:
				$ret[] = new EstadoOT (EstadoOT::Programada);
				$ret[] = new EstadoOT (EstadoOT::Anulada);
				break;
		}
		
		return $ret;
	}
}
?>