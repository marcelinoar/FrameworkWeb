/**************************************************************************************************
 * Archivo: Maquina.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Maquinas
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.Maquina', {
	extend: 'Ext.data.Model',
	requires: [
		'Sistema.view.Produccion.model.AtributoMaquina'
	],
	fields: [
		{name: 'centroDeTrabajoId'},
		{name: 'codigo'},
		{name: 'atributos'},
		{name: 'descripcion'}
	],
	hasMany: [{
		model: 'Sistema.view.Produccion.model.AtributoMaquina',
		name: 'atributos'
	}],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/Modulos/Produccion/Maquina/FormularioController.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/Modulos/Produccion/Maquina/FormularioController.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/Modulos/Produccion/Maquina/FormularioController.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/Modulos/Produccion/Maquina/FormularioController.php?f=Borrar'
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
