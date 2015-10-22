/**************************************************************************************************
 * Archivo: Operacion.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.Operacion', {
	extend: 'Ext.data.Model',
	requires: [
		'Sistema.view.Produccion.model.AtributoOperacion',
		'Sistema.view.Produccion.model.Maquina'
	],
	fields: [
		{name: 'centroDeTrabajoId'},
		{name: 'maquinas'},
		{name: 'nombre'},
		{name: 'atributos'},
		{name: 'descripcion'}
	],
	hasMany: [{
		model: 'Sistema.view.Produccion.model.AtributoOperacion',
		name: 'atributos'
	}, {
		model: 'Sistema.view.Produccion.model.Maquina',
		name: 'maquinas'
	}],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/Modulos/Produccion/Operacion/FormularioController.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/Modulos/Produccion/Operacion/FormularioController.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/Modulos/Produccion/Operacion/FormularioController.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/Modulos/Produccion/Operacion/FormularioController.php?f=Borrar'
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
