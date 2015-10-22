/**************************************************************************************************
 * Archivo: Pais.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Paises
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Sistema.model.Pais', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'nombreAbreviado'},
		{name: 'nombreOficial'}
	],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/Modulos/Sistema/Pais/FormularioController.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/Modulos/Sistema/Pais/FormularioController.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/Modulos/Sistema/Pais/FormularioController.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/Modulos/Sistema/Pais/FormularioController.php?f=Borrar'
		},
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});
