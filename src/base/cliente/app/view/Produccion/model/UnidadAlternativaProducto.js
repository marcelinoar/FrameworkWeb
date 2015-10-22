/**************************************************************************************************
 * Archivo: UnidadAlternativaProducto.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Maquinas
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.UnidadAlternativaProducto', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'unidadDestinoId'},
		{name: 'unidadOrigenId'},
		{name: 'factorDeConversion'}
	],

	proxy: {
		type: 'memory'
	}
});
