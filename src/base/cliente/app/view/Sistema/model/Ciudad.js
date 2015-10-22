/**************************************************************************************************
 * Archivo: Ciudad.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Ciudades
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Sistema.model.Ciudad', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'paisId'},
		{name: 'provinciaId'},
		{name: 'nombre'}
	],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/Modulos/Sistema/Ciudad/FormularioController.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/Modulos/Sistema/Ciudad/FormularioController.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/Modulos/Sistema/Ciudad/FormularioController.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/Modulos/Sistema/Ciudad/FormularioController.php?f=Borrar'
		},
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});
