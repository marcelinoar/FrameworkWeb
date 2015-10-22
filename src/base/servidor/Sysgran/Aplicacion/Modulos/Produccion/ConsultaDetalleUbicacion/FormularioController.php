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
require_once ('Sysgran/Core/Php/GeneradorExcel.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/DetalleUbicacionAlmacen.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/Producto.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/Contenedor.php');
require_once ('Sysgran/Aplicacion/Entidades/Produccion/UnidadDeMedida.php');

class FormularioController extends JSonRouterBase {
	/*
		El detalle de la ubicacion ya no se busca mas por codigo
	
	public function BuscarPorCodigo ($codigo, $almacenId, $ubicacionId, $productoId = null) {
		try {
			$codigo 		= Validador::NumeroEntero ($codigo);
			$almacenId 		= Validador::NumeroEntero ($almacenId);
			$ubicacionId 	= Validador::NumeroEntero ($ubicacionId);
			
			$ret = DetalleUbicacionAlmacen::GetDetalleUbicacionPorCodigo ($codigo, $almacenId, $ubicacionId);
			if ($ret == null) {
				return Encoder::EncodeResponseError ('Codigo Inexistente');				
			}

			if ($productoId != null && $ret->productoId != $productoId) {
				return Encoder::EncodeResponseError ('El detalle no contiene al producto indicado');				
			}
			
			$ret->producto = Producto::GetProducto ($ret->productoId);
			$ret->unidadDeMedida = UnidadDeMedida::GetUnidadDeMedida ($ret->unidadDeMedidaId);
			
			return Encoder::Encode (Array ($ret));	
			
		} catch (Exception $ex) {
			return Encoder::EncodeResponseError ($ex);
		}
	}
	*/
	
	public function BuscarPorId ($codigo) {
		$ret = DetalleUbicacionAlmacen::GetDetalleUbicacion ($codigo);

		$ret->producto = Producto::GetProducto ($ret->productoId);
		$ret->contenedor = Contenedor::GetContenedor ($ret->contenedorId);
		$ret->unidadDeMedida = UnidadDeMedida::GetUnidadDeMedida ($ret->producto->unidadDeMedidaStockId);
		
		if ($ret == null) {
			return Encoder::EncodeResponseError ('Codigo Inexistente');				
		
		} else {
			return Encoder::Encode (Array ($ret));	
		}
	}	
}

$ws = new FormularioController ();
$ws->Ejecutar ();
?>
