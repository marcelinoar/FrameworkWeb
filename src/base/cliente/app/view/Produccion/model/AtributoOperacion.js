/**************************************************************************************************
 * Archivo: AtributoOperacion.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Maquinas
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.AtributoOperacion', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'atributoId'},
		{name: 'centroDeTrabajoId'},
		{name: 'operacionId'},
		{name: 'nombre'}
	],

	proxy: {
		type: 'memory'
	}
});
