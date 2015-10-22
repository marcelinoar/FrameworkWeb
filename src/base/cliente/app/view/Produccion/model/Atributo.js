/**************************************************************************************************
 * Archivo: Atributo.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.Atributo', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'nombre'},
		{name: 'valor'}
	],

	proxy: {
		type: 'memory'
	}
});
