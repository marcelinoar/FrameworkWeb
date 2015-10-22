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
	'Sistema.view.Produccion.model.DetHojaDeRutaProductoMaquina'
]);

Ext.define ('Sistema.view.Produccion.Producto.OperacionesHojaDeRuta.ListadoGrillaStore', {
	extend	: 'Ext.data.Store',
	model	: 'Sistema.view.Produccion.model.DetHojaDeRutaProductoMaquina',
	groupField: 'codigoOperacion'
});