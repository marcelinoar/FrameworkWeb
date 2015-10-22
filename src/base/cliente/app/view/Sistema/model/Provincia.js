/**************************************************************************************************
 * Archivo: Provincia.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Provincias
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Sistema.model.Provincia', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'paisId'},
		{name: 'nombre'},
		{name: 'abreviatura'}
	],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/Modulos/Sistema/Provincia/FormularioController.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/Modulos/Sistema/Provincia/FormularioController.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/Modulos/Sistema/Provincia/FormularioController.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/Modulos/Sistema/Provincia/FormularioController.php?f=Borrar'
		},
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});
