/**************************************************************************************************
 * Archivo: DetProductoAlmacen.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.DetProductoAlmacen', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'almacenId'},
		{name: 'codigo'},
		{name: 'descripcionCorta'},
		{name: 'stockCritico'},
		{name: 'stockActual'},
		{name: 'puntoDePedido'}
	],

	proxy: {
		type: 'memory'
	}
});
