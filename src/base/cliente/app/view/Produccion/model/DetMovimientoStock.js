/**************************************************************************************************
 * Archivo: DetMovimientoStock.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: .
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.DetMovimientoStock', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'productoId'}
	],

	proxy: {
		type: 'memory'
	}
});
