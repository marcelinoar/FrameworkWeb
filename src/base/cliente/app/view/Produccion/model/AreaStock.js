/**************************************************************************************************
 * Archivo: AreaStock.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: area
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.AreaStock', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'codigo'},
		{name: 'descripcion'},
		{name: 'plantaId'}
	],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/Modulos/Produccion/AreaStock/FormularioController.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/Modulos/Produccion/AreaStock/FormularioController.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/Modulos/Produccion/AreaStock/FormularioController.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/Modulos/Produccion/AreaStock/FormularioController.php?f=Borrar'
		},
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});
