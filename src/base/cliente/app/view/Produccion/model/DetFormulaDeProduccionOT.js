/**************************************************************************************************
 * Archivo: DetFormulaDeProduccionOT.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.DetFormulaDeProduccionOT', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'productoId'},
		{name: 'codigoProducto'},
		{name: 'descripcionProducto'},
		{name: 'cantidadUnitaria'},
		{name: 'cantidad'},
		{name: 'unidadDeMedidaId'},
		{name: 'ordenDeTrabajoId'},		// Es el id de la OT hija para ese item.
		{name: 'codigoUnidadDeMedida'}
	],

	proxy: {
		type: 'memory'
	}
});
