/**************************************************************************************************
 * Archivo: CentroDeTrabajo.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Centro de Trabajo
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.CentroDeTrabajo', {
	extend: 'Ext.data.Model',
	requires: [
		'Sistema.view.Produccion.model.Maquina',
		'Sistema.view.Produccion.model.AtributoCentroDeTrabajo',
		'Sistema.view.Produccion.model.Operacion'
	],
	fields: [
		{name: 'nombre'},
		{name: 'codigo'},
		{name: 'almacenAsociadoId'},
		{name: 'generaPallet'},
		{name: 'maquinas'},
		{name: 'operaciones'},
		{name: 'atributos'},
		{name: 'organizaPorLote'}
	],
	hasMany: [{
		model: 'Sistema.view.Produccion.model.Maquina',
		name: 'maquinas'
	}, {
		model: 'Sistema.view.Produccion.model.AtributoCentroDeTrabajo',
		name: 'atributos'
	}, {
		model: 'Sistema.view.Produccion.model.Operacion',
		name: 'operaciones'
	}],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/Modulos/Produccion/CentroDeTrabajo/FormularioController.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/Modulos/Produccion/CentroDeTrabajo/FormularioController.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/Modulos/Produccion/CentroDeTrabajo/FormularioController.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/Modulos/Produccion/CentroDeTrabajo/FormularioController.php?f=Borrar'
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
