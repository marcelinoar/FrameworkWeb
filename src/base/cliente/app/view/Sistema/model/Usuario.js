/**************************************************************************************************
 * Archivo: Usuario.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Usuarios
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Sistema.model.Usuario', {
	extend: 'Ext.data.Model',
/*	requires: [
		'Sistema.view.Sistema.model.Grupo'
	],
*/
	fields: [
		{name: 'loginName'},
		{name: 'password'},
		{name: 'grupos'},
		{name: 'email'},
		{name: 'empleadoId'},
		{name: 'comentario'}
	],
	hasMany: [{
		model: 'Sistema.view.Sistema.model.Grupo',
		name: 'grupos'
	}],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/Modulos/Sistema/Usuario/FormularioController.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/Modulos/Sistema/Usuario/FormularioController.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/Modulos/Sistema/Usuario/FormularioController.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/Modulos/Sistema/Usuario/FormularioController.php?f=Borrar'
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
