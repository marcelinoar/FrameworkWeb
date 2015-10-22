/**************************************************************************************************
 * Archivo: LoteDeFabricacion.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Lotes
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.LoteDeFabricacion', {
	extend: 'Ext.data.Model',
	requires: [
		'Sistema.view.Produccion.model.OrdenDeTrabajo',
		'Sistema.view.Produccion.model.ValeDeFabricacion'
	],
	fields: [
		{name: 'productoId'},
		{name: 'ordenesDeTrabajo'},
		{name: 'valesDeFabricacion'}
	],
	hasMany: [{
		model: 'Sistema.view.Produccion.model.OrdenDeTrabajo',
		name: 'ordenesDeTrabajo'
	},{
		model: 'Sistema.view.Produccion.model.ValeDeFabricacion',
		name: 'valesDeFabricacion'
	}],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/Modulos/Produccion/LoteDeFabricacion/FormularioController.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/Modulos/Produccion/LoteDeFabricacion/FormularioController.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/Modulos/Produccion/LoteDeFabricacion/FormularioController.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/Modulos/Produccion/LoteDeFabricacion/FormularioController.php?f=Borrar'
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
