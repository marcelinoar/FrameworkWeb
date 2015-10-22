/**************************************************************************************************
 * Archivo: Planta.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Plantas de produccion
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.Planta', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'nombre'},
		{name: 'paisId'},
		{name: 'provinciaId'},
		{name: 'ciudadId'},
		{name: 'direccion'},
		{name: 'descripcion'}
	],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/Modulos/Produccion/Planta/FormularioController.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/Modulos/Produccion/Planta/FormularioController.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/Modulos/Produccion/Planta/FormularioController.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/Modulos/Produccion/Planta/FormularioController.php?f=Borrar'
		},
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});
