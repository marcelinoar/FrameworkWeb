/**************************************************************************************************
 * Archivo: CampoListado.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: .
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Desarrollo.model.CampoListado', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'nombre'},
		{name: 'etiqueta'},
		{name: 'tipoCampoId'},
		{name: 'anchoColumna'},
		{name: 'esFlex'},
		{name: 'esSubCampo'},
		{name: 'nombreSubCampo'}
	],

	proxy: {
		type: 'memory'
	}
});
