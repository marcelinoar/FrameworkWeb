/**************************************************************************************************
 * Archivo: AtributoMaquina.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.AtributoMaquina', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'atributoId'},
		{name: 'maquinaId'},
		{name: 'valor'},
		{name: 'nombre'}
	],

	proxy: {
		type: 'memory'
	}
});
