<?
/**************************************************************************************************
 * Archivo: EstadoOT.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: 
 * Modificaciones:
 *	-
 *
 **************************************************************************************************/
 
class EstadoOT {
	const NoEmitida		= 0;
	const Emitida 		= 1;
	const Confirmada 	= 2;
	const Programada 	= 3;
	const EnProduccion 	= 4;
	const Finalizada 	= 5;
	const Anulada 		= 6;
	
	public $estadoOTId;
	public $nombre;
	
	public function EstadoOT ($estadoId) {
		$this->estadoOTId = $estadoId;
		$this->nombre = $this->GetNombre ($estadoId);
	}
	
	static function GetNombre ($id) {
		$ret = '';
		
		switch ($id) {
			case EstadoOT::Emitida:
				$ret = 'Emitida';
				break;
			case EstadoOT::Confirmada:
				$ret = 'Confirmada';
				break;
				
			case EstadoOT::Programada:
				$ret = 'Programada';
				break;
				
			case EstadoOT::EnProduccion:
				$ret = 'En Produccion';
				break;
				
			case EstadoOT::Finalizada:
				$ret = 'Finalizada';
				break;
				
			case EstadoOT::Anulada:
				$ret = 'Anulada';
				break;
		}
		
		return $ret;
	}
}
?>