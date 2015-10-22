/**************************************************************************************************
 * Archivo: ArchivoAdjuntoProducto.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Maquinas
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.ArchivoAdjuntoProducto', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'archivoAdjuntoId'},
		{name: 'nombre'}
	],

	proxy: {
		type: 'memory'
	}
});
