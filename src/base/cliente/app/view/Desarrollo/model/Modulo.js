/**************************************************************************************************
 * Archivo: Modulo.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Desarrollo.model.Modulo', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'nombre'},
		{name: 'rutaArchivos'},
		{name: 'ruta'}
	],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/WS/Desarrollo/ModuloWS.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/WS/Desarrollo/ModuloWS.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/WS/Desarrollo/ModuloWS.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/WS/Desarrollo/ModuloWS.php?f=Borrar'
		},
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});
