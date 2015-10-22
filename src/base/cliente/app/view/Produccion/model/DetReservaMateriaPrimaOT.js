/**************************************************************************************************
 * Archivo: DetReservaMateriaPrimaOT.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de atributos de productos
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.DetReservaMateriaPrimaOT', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'operacionId'},
		{name: 'productoId'},
		{name: 'hojaDeRutaId'},
		{name: 'maquinaId'},
		{name: 'nroDeOrden'},
		{name: 'tiempoDeTrabajo'},
		{name: 'tiempoDePreparacion'},
		{name: 'cntOperTrabajo'},
		{name: 'cntOperPreparacion'},
		{name: 'kgDeMerma'},
		{name: 'kgDeRecorte'}
	],

	proxy: {
		type: 'memory'
	}
});
