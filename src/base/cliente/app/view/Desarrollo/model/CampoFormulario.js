/**************************************************************************************************
 * Archivo: CampoFormulario.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: .
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Desarrollo.model.CampoFormulario', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'nombre'},
		{name: 'etiqueta'},
		{name: 'tipoCampoId'},
		{name: 'nombreCampoDb'},
		{name: 'esNull'},
		{name: 'esAutoFoco'},
		{name: 'store'},
		{name: 'idField'},
		{name: 'descField'}
	],

	proxy: {
		type: 'memory'
	}
});
