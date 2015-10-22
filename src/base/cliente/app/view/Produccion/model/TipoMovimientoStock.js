/**************************************************************************************************
 * Archivo: TipoMovimientoStock.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.TipoMovimientoStock', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'codigo'},
		{name: 'descripcionCorta'},
		{name: 'descripcionLarga'},
		{name: 'requiereLoteFabricacion'},
		{name: 'requiereLoteCompras'},
		{name: 'requiereOT'},
		{name: 'requiereFormulaDeFabricacion'},
		{name: 'requierePVenta'},
		{name: 'requiereOCompra'},
		{name: 'origenNull'},
		{name: 'destinoNull'}
	],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/Modulos/Produccion/TipoMovimientoStock/FormularioController.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/Modulos/Produccion/TipoMovimientoStock/FormularioController.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/Modulos/Produccion/TipoMovimientoStock/FormularioController.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/Modulos/Produccion/TipoMovimientoStock/FormularioController.php?f=Borrar'
		},
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});
