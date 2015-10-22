/**************************************************************************************************
 * Archivo: Maquina.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Maquinas
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.AtributoCentroDeTrabajo', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'atributoId'},
		{name: 'centroDeTrabajoId'},
		{name: 'valor'},
		{name: 'nombre'}
	],

	proxy: {
		type: 'memory'
	}
});
