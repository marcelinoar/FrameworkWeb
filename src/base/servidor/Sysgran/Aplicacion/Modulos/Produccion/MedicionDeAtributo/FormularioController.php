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
require_once ('Sysgran/Aplicacion/Entidades/Produccion/MedicionDeAtributo.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/UnidadDeMedida.php');

class FormularioController extends JSonRouterBase {
	public function Crear ($ordenDeTrabajoId, $atributoProductoId, $valorMedido, $comentario){
		$ma = new MedicionDeAtributo ();
		$ma->ordenDeTrabajoId = $ordenDeTrabajoId;
		$ma->atributoProductoId = $atributoProductoId;
		$ma->comentario = $comentario;
		$ma->valorMedido = $valorMedido;
		
		$ret_val = $ma->Crear ();
		if ($ret_val != null) {
			return Encoder::EncodeResponseError ($ret_val);
		}
		
		return Encoder::EncodeResponseOk ();			
	}
	
	public function Leer ($id){
		$ma = new MedicionDeAtributo ($id);
		
		$ret_val = $ma->Leer ();
		
		if ($ret_val == null) {
			return Encoder::Encode ($ma);
			
		} else {
			return Encoder::EncodeResponseError ($ret_val->GetMessage ());				
		}	
	}
	
	public function BuscarOrdenDeTrabajoPorCodigo ($codigo) {
		try {
			$codigo = Validador::NumeroEntero ($codigo);
		
			return $this->BuscarOrdenDeTrabajoPorId ($codigo);

		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ($ex);
		}
	}	
	
	public function BuscarOrdenDeTrabajoPorId ($codigo) {
		try {
			Validador::NumeroEntero ($codigo);

			// Leemos la OT
			$ot = new OrdenDeTrabajo ($codigo);
			$ret_val = $ot->Leer ();
			if ($ret_val != null) {
				return Encoder::EncodeResponseError ('Codigo Inexistente');				
			} 

			// Agregamos la Unidad de medida
			$ot->unidadDeMedida = new UnidadDeMedida ($ot->unidadDeMedidaId);
			$ret_val = $ot->unidadDeMedida->Leer ();
			if ($ret_val != null) {
				return Encoder::EncodeResponseError ($ret_val);				
			} 

			// Agregamos el producto
			$ot->producto = new Producto ($ot->productoId);
			$ret_val = $ot->producto->Leer ();
			if ($ret_val != null) {
				return Encoder::EncodeResponseError ($ret_val);				
			} 

			// Cargo las unidades de los atributos
			foreach ($ot->producto->atributos as $at) {
				$at->unidadDeMedida = new UnidadDeMedida ($at->unidadDeMedidaId);
				$ret_val = $at->unidadDeMedida->Leer ();
				if ($ret_val != null) {
					return Encoder::EncodeResponseError ($ret_val);				
				}
			}

			return Encoder::Encode (Array ($ot));	
			
		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ($ex);				
		}
	}	
}

$ws = new FormularioController ();
$ws->Ejecutar ();
?>
