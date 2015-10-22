<?
/**************************************************************************************************
 * Archivo: StoreInfoFabricacion.php
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
require_once ('Sysgran/Aplicacion/Entidades/Produccion/OrdenDeTrabajo.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/Producto.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/FormulaDeProduccion.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/HojaDeRuta.php');

class NodoStoreInfoFabricacion {
	public $operacionId;
	public $nombreOperacion;
	public $cantidadProducida;
	public $cantidadRechazada;
	public $cantidadRecortes;
	public $codigoUnidadProducida;
	public $codigoUnidadRechazada;
	public $codigoUnidadRecortes;
	public $codioOperacion;
	
	public function NodoStoreInfoFabricacion () {
		$this->cantidadProducida 	= 0;
		$this->cantidadRechazada 	= 0;
		$this->cantidadRecortes		= 0;
	}
}

class StoreInfoFabricacion {
	private $ordenDeTrabajoId;
	private $unidadProducidaId;
	private $unidadRechazadaId;
	private $unidadRecortesId;
	
	public function StoreInfoFabricacion ($ordenDeTrabajoId, $unidadProducidaId, $unidadRechazadaId, $unidadRecortesId) {
		$this->ordenDeTrabajoId = $ordenDeTrabajoId;

/* DEBUG
		$this->unidadProducidaId = $unidadProducidaId;
		$this->unidadRechazadaId = $unidadRechazadaId;
		$this->unidadRecortesid = $unidadRecortesId;
		
		$this->unidadProduccion = new UnidadDeMedida ($unidadProducidaId);
		$this->unidadProduccion->Leer ();
		
		$this->unidadRechazo = new UnidadDeMedida ($unidadRechazadaId);
		$this->unidadRechazo->Leer ();
		
		$this->unidadRecortes = new UnidadDeMedida ($unidadRecortesId);
		$this->unidadRecortes->Leer ();		
*/		
	}

	public function Ejecutar () {
		$ot = new OrdenDeTrabajo ($this->ordenDeTrabajoId);
		$ot->Leer ();
		
		$ot->hojaDeRuta = new HojaDeRuta ($ot->hojaDeRutaId);
		$ot->hojaDeRuta->Leer ();
		
		$ot->producto = new Producto ($ot->productoId);
		$ot->producto->Leer ();
		
		// DEBUG. Por ahora fijamos la unidad para que sea siempre la de fabricacion.
		$this->unidadProducidaId = $ot->producto->unidadDeMedidaFabricacionId;
		$this->unidadRechazadaId = $ot->producto->unidadDeMedidaFabricacionId;
		$this->unidadRecortesId = $ot->producto->unidadDeMedidaFabricacionId;
		
		$this->unidadProduccion = new UnidadDeMedida ($this->unidadProducidaId);
		$this->unidadProduccion->Leer ();
		
		$this->unidadRechazo = new UnidadDeMedida ($this->unidadRechazadaId);
		$this->unidadRechazo->Leer ();
		
		$this->unidadRecortes = new UnidadDeMedida ($this->unidadRecortesId);
		$this->unidadRecortes->Leer ();		

		// Primero leo todas las operaciones de la hoja de ruta.		
		$operaciones = array ();
		foreach ($ot->hojaDeRuta->operaciones as $oper) {
			$item = new NodoStoreInfoFabricacion ();
			$item->operacionId 				= $oper->operacionId;
			$item->nombreOperacion 			= $oper->nombre;
			$item->codigoOperacion 			= $oper->codigo;
			$item->codigoUnidadProducida 	= $this->unidadProduccion->codigo;
			$item->codigoUnidadRechazada 	= $this->unidadRechazo->codigo;
			$item->codigoUnidadRecortes 	= $this->unidadRecortes->codigo;
			
			$operaciones[$oper->operacionId] = $item;
		}

		// Ahora recorro los vales de fabricacion.		
		foreach ($ot->valesDeFabricacion as $vf) {
			$cnt_prod 	= $ot->producto->ConvertirCantidad (Lib::DevolverNumero ($vf->cantidadProducida), $vf->unidadDeMedidaCantProducidaId, $this->unidadProducidaId);
			$cnt_rech 	= $ot->producto->ConvertirCantidad (Lib::DevolverNumero ($vf->cantidadRechazada), $vf->unidadDeMedidaCantRechazadaId, $this->unidadRechazadaId);
			$cnt_rec	= $ot->producto->ConvertirCantidad (Lib::DevolverNumero ($vf->cantidadRecortes), $vf->unidadDeMedidaCantRecortesId, $this->unidadRecortesId);
		
			$operaciones[$vf->operacionId]->cantidadProducida 	+= $cnt_prod;
			$operaciones[$vf->operacionId]->cantidadRechazada 	+= $cnt_rech;
			$operaciones[$vf->operacionId]->cantidadRecortes 	+= $cnt_rec;
		}
		
		// DEBUG. Pasamos todo a un array simple para que se pueda leer desde js
		$ret = array ();
		foreach ($operaciones as $item) {
			$ret[] = $item;
		}
		
		return $ret;
	}
}
?>