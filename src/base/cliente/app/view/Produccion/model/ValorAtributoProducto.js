/**************************************************************************************************
 * Archivo: ValorAtributoProducto.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de atributos de productos
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.ValorAtributoProducto', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'nombre'},
		{name: 'unidadDeMedidaId'},
		{name: 'valor'},
		{name: 'atributoProductoId'}
	],

	proxy: {
		type: 'memory'
	}
});
