/**************************************************************************************************
 * Archivo: DetMedicionDeAtributoOT.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.DetMedicionDeAtributoOT', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'formulaDeProduccionId'},
		{name: 'tipo'},
		{name: 'unidadDeMedidaId'},
		{name: 'codigo'},
		{name: 'descripcionCorta'},
		{name: 'itemId'},
		{name: 'cantidadUtilizada'}
	],

	proxy: {
		type: 'memory'
	}
});
