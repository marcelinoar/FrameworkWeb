/**************************************************************************************************
 * Archivo: Empresa.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Empresas
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Sistema.model.Empresa', {
	extend: 'Ext.data.Model',
/*	requires: [
		'Sistema.view.Sistema.model.Grupo'
	],
*/
	fields: [
		{name: 'nombre'},
		{name: 'cuit'},
		{name: 'paisId'},
		{name: 'provinciaId'},
		{name: 'ciudadId'},
		{name: 'direccion'},
		{name: 'descripcion'},
		{name: 'grupos'}
	],
	hasMany: [{
		model: 'Sistema.view.Sistema.model.Grupo',
		name: 'grupos'
	}],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/Modulos/Sistema/Empresa/FormularioController.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/Modulos/Sistema/Empresa/FormularioController.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/Modulos/Sistema/Empresa/FormularioController.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/Modulos/Sistema/Empresa/FormularioController.php?f=Borrar'
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
