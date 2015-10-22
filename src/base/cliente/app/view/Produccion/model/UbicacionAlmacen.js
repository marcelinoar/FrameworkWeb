/**************************************************************************************************
 * Archivo: UbicacionAlmacen.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Ubicaciones
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.UbicacionAlmacen', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'codigo'},
		{name: 'almacenId'},
		{name: 'zonaStockId'},
		{name: 'areaStockId'},
		{name: 'descripcion'}
	],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/Modulos/Produccion/UbicacionAlmacen/FormularioController.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/Modulos/Produccion/UbicacionAlmacen/FormularioController.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/Modulos/Produccion/UbicacionAlmacen/FormularioController.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/Modulos/Produccion/UbicacionAlmacen/FormularioController.php?f=Borrar'
		},
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});
