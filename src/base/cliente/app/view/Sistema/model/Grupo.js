/**************************************************************************************************
 * Archivo: Grupo.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Grupos de usuarios
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Sistema.model.Grupo', {
	extend: 'Ext.data.Model',
	requires: [
		'Sistema.view.Sistema.model.PermisoCustom',
		'Sistema.view.Sistema.model.PermisoEstandar'
	],
	fields: [
		{name: 'empresas'},
		{name: 'usuarios'},
		{name: 'permisosEstandar'},
		{name: 'permisosCustom'},
		{name: 'nombre'},
		{name: 'descripcion'}
	],
	hasMany: [{
		model: 'Sistema.view.Sistema.model.Usuario',
		name: 'usuarios'
	}, {
		model: 'Sistema.view.Sistema.model.PermisoEstandar',
		name: 'permisosEstandar'
	}, {
		model: 'Sistema.view.Sistema.model.Empresa',
		name: 'empresas'
	}, {
		model: 'Sistema.view.Sistema.model.PermisoCustom',
		name: 'permisosCustom'
	}],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/Modulos/Sistema/Grupo/FormularioController.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/Modulos/Sistema/Grupo/FormularioController.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/Modulos/Sistema/Grupo/FormularioController.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/Modulos/Sistema/Grupo/FormularioController.php?f=Borrar'
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
