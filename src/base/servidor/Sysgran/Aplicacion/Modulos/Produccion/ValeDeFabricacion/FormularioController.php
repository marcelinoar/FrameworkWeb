<?
/**************************************************************************************************
 * Archivo: FormularioController.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ('template.php');
require_once ('Sysgran/Core/Red/JSonRouterBase.php');
require_once ('Sysgran/Core/Red/Encoder.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/OrdenDeTrabajo.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/Producto.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/FormulaDeProduccion.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/HojaDeRuta.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/CentroDeTrabajo.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/Contenedor.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/ValeDeFabricacion.php');

class FormularioController extends JSonRouterBase {
	public function Crear (   $centroDeTrabajoId
							, $tipoDeVale
							, $ordenDeTrabajoId
							, $operacionId
							, $empleadoId
							, $cantidadProducida
							, $cantidadRechazada
							, $cantidadRecortes
							, $unidadDeMedidaCantProducidaId
							, $unidadDeMedidaCantRechazadaId
							, $unidadDeMedidaCantRecortesId
							, $comentarios
							, $loteId
							, $codigoDePallet){
							
		$vf = new ValeDeFabricacion ();
		$vf->centroDeTrabajoId 				= $centroDeTrabajoId;
		$vf->tipoDeVale						= $tipoDeVale;
		$vf->ordenDeTrabajoId				= $ordenDeTrabajoId;
		$vf->empleadoId						= $empleadoId;
		$vf->operacionId					= $operacionId;
		$vf->cantidadProducida				= $cantidadProducida;
		$vf->cantidadRechazada				= $cantidadRechazada;
		$vf->cantidadRecortes				= $cantidadRecortes;
		$vf->unidadDeMedidaCantProducidaId	= $unidadDeMedidaCantProducidaId;
		$vf->unidadDeMedidaCantRechazadaId	= $unidadDeMedidaCantRechazadaId;
		$vf->unidadDeMedidaCantRecortesId	= $unidadDeMedidaCantRecortesId;
		$vf->observaciones					= $comentarios;
		$vf->loteDeFabricacionId			= $loteId;
		$vf->contenedor						= Contenedor::BuscarContenedorPorCodigo ($codigoDePallet);
		
		if ($vf->contenedor == null) {
			return Encoder::EncodeResponseError ('El contenedor indicado no existe o es invalido');
		}
		
		$ret_val = $vf->Crear ();
		if ($ret_val != null) {
			return Encoder::EncodeResponseError ($ret_val);
		}
		
		return Encoder::EncodeResponseOk ();			
	}
	
	public function Leer ($id){
		$e = new ValeDeFabricacion ($id);
		
		$ret_val = $e->Leer ();
		
		if ($ret_val == null) {
			return Encoder::Encode ($e);
			
		} else {
			return Encoder::EncodeResponseError ($ret_val->GetMessage ());				
		}	
	}
	
	public function GenerarNuevoContenedor () {
		$c = new Contenedor ();
		$ret_val = $c->Crear ();
		
		if ($ret_val != null) {
			return Encoder::EncodeResponseError ($ret_val);
		}
		
		return Encoder::EncodeResponseOk ($c);
	}
	
	public function BuscarCentroDeTrabajoPorCodigo ($codigo) {
		try {
			$codigo = Validador::CodigoAlfanumerico ($codigo);
			
		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ('Codigo invalido');				
		}
		
		$ct = CentroDeTrabajo::GetCentroDeTrabajoPorCodigo ($codigo);
		if ($ct == null) {
			return Encoder::EncodeResponseError ('Codigo Inexistente');				
		}

		$ct->tipoDeVale = $this->GetTipoDeValePorCT ($ct);		
		
		return Encoder::Encode (Array ($ct));	
	}	
	
	public function BuscarCentroDeTrabajoPorId ($codigo) {
		try {
			$codigo = Validador::NumeroEntero ($codigo);
			
		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ('Codigo invalido');				
		}
	
		$ct = new CentroDeTrabajo ($codigo);
		$ret_val = $ct->Leer ();
		if ($ret_val != null) {
			return Encoder::EncodeResponseError ('Codigo Inexistente');				
		} 

		$ct->tipoDeVale = $this->GetTipoDeValePorCT ($ct);

		return Encoder::Encode (Array ($ct));	
	}	
	
	private function GetTipoDeValePorCT ($ct) {
		//
		// Si el CT se maneja con lotes entonces hay que diferenciar dos 
		// casos. En caso contrario no hace falta.
		//
		$ret = array ();
		if ($ct->organizaPorLote == true) {
			$item['id'] = 1;
			$item['nombre'] = 'Producto';
			$ret[] = $item;

			$item['id'] = 2;
			$item['nombre'] = 'Recorte / Rechazo';
			$ret[] = $item;
		
		} else {
			$item['id'] = 3;
			$item['nombre'] = 'Producto / Recorte / Rechazo';
			$ret[] = $item;
		}
		
		return $ret;
	}
	
	public function BuscarOTPorCodigo ($codigo) {
		try {
			$codigo = Validador::NumeroEntero ($codigo);
			
		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ('Codigo invalido');				
		}
	
		return $this->BuscarOTPorId ($codigo);
	}	
	
	public function BuscarOTPorId ($codigo) {
		try {
			$codigo = Validador::NumeroEntero ($codigo);
			
		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ('Codigo invalido');				
		}

		$ot = new OrdenDeTrabajo ($codigo);
		$ret_val = $ot->Leer ();
		if ($ret_val != null) {
			return Encoder::EncodeResponseError ('Codigo Inexistente');						
		}

		$formulaOT = new FormulaDeProduccion ($ot->formulaDeProduccionId);
		$ret_val = $formulaOT->Leer ();
		if ($ret_val != null) {
			return Encoder::EncodeResponseError ($ret_val);						
		}

		$productoPrincipal = new Producto ($ot->productoId);
		$ret_val = $productoPrincipal->Leer ();
		if ($ret_val != null) {
			return Encoder::EncodeResponseError ($ret_val);						
		}

		$productoSecundario = new Producto ($productoPrincipal->productoSecundarioId);
		$ret_val = $productoSecundario->Leer ();
		if ($ret_val != null) {
			return Encoder::EncodeResponseError ($ret_val);						
		}
		
		$hdr = new HojaDeRuta ($ot->hojaDeRutaId);
		$ret_val = $hdr->Leer ();
		if ($ret_val != null) {
			return Encoder::EncodeResponseError ($ret_val);						
		}
		
		$ot->formulaDeProduccion 	= $formulaOT;
		$ot->productoPrincipal 		= $productoPrincipal;
		$ot->productoSecundario 	= $productoSecundario;
		$ot->operaciones			= $hdr->operaciones;
		
		return Encoder::Encode (Array ($ot));	
	}	
}

$ws = new FormularioController ();
$ws->Ejecutar ();
?>
