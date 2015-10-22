/**************************************************************************************************
 * Archivo: Empleado.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Empleado
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Empresa.model.Empleado', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'nombre'},
		{name: 'apellido'},
		{name: 'nroLegajo'}
	],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/Modulos/Empresa/Empleado/FormularioController.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/Modulos/Empresa/Empleado/FormularioController.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/Modulos/Empresa/Empleado/FormularioController.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/Modulos/Empresa/Empleado/FormularioController.php?f=Borrar'
		},
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});
