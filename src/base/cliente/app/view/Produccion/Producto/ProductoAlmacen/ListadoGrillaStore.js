/**************************************************************************************************
 * Archivo: ListadoGrillaStore.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/
Ext.require ([
	'Sistema.view.Produccion.model.DetProductoAlmacen'
]);

Ext.define ('Sistema.view.Produccion.Producto.ProductoAlmacen.ListadoGrillaStore', {
	extend	: 'Ext.data.ArrayStore',
	model	: 'Sistema.view.Produccion.model.DetProductoAlmacen'
});