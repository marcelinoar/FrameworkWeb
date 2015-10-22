/**************************************************************************************************
 * Archivo: Almacen.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Almacenes
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.Almacen', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'codigo'},
		{name: 'nombre'},
		{name: 'plantaId'},
		{name: 'tipoAlmacenId'},
		{name: 'cntPasillos'},
		{name: 'cntPosicionesX'},
		{name: 'cntPosicionesY'},
		{name: 'cntPosicionesZ'}
	],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/Modulos/Produccion/Almacen/FormularioController.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/Modulos/Produccion/Almacen/FormularioController.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/Modulos/Produccion/Almacen/FormularioController.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/Modulos/Produccion/Almacen/FormularioController.php?f=Borrar'
		},
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});
