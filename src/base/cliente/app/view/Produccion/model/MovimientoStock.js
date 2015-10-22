/**************************************************************************************************
 * Archivo: MovimientoStock.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.MovimientoStock', {
	extend: 'Ext.data.Model',
	requires: [
		'Sistema.view.Produccion.model.DetMovimientoStock'
	],
	fields: [
		{name: 'detalles'},
		{name: 'tipoMovimientoStockId'},
		{name: 'almacenOrigenId'},
		{name: 'almacenDestinoId'},
		{name: 'loteDeFabricacionId'},
		{name: 'ordenDeTrabajoId'},
		{name: 'ordenDeCompraId'},
		{name: 'pedidoDeVentaId'},
		{name: 'comentarios'},
		{name: 'loteDeCompras'}
	],
	hasMany: [{
		model: 'Sistema.view.Produccion.model.DetMovimientoStock',
		name: 'detalles'
	}],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/Modulos/Produccion/MovimientoStock/FormularioController.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/Modulos/Produccion/MovimientoStock/FormularioController.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/Modulos/Produccion/MovimientoStock/FormularioController.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/Modulos/Produccion/MovimientoStock/FormularioController.php?f=Borrar'
		},
		reader: {
			type: 'json',
			rootProperty: 'root'
		},
		writer: {
			writeAllFields: true,
			allDataOptions: {
				associated: true
			}
		}
	}
});
