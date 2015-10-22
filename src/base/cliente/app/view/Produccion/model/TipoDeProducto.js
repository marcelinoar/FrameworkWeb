/**************************************************************************************************
 * Archivo: TipoDeProducto.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Tipos de producto
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.TipoDeProducto', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'nombre'},
		{name: 'esProductoDeCompras'},
		{name: 'esProductoDeVentas'},
		{name: 'esProductoDeFabricacion'}
	],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/Modulos/Produccion/TipoDeProducto/FormularioController.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/Modulos/Produccion/TipoDeProducto/FormularioController.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/Modulos/Produccion/TipoDeProducto/FormularioController.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/Modulos/Produccion/TipoDeProducto/FormularioController.php?f=Borrar'
		},
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});
