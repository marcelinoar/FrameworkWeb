/**************************************************************************************************
 * Archivo: OperacionHojaDeRutaOT.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.OperacionHojaDeRutaOT', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'codigoOperacion'},
		{name: 'operacionId'},
		{name: 'descripcionOperacion'},
		{name: 'maquinaId'},
		{name: 'codigoMaquina'},
		{name: 'tiempoEstandar'}
	],

	proxy: {
		type: 'memory'
	}
});
