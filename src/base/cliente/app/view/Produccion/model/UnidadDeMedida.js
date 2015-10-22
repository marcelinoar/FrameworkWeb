/**************************************************************************************************
 * Archivo: UnidadDeMedida.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Unidad de Medida
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.UnidadDeMedida', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'codigo'},
		{name: 'descripcionCorta'}
	],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/Modulos/Produccion/UnidadDeMedida/FormularioController.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/Modulos/Produccion/UnidadDeMedida/FormularioController.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/Modulos/Produccion/UnidadDeMedida/FormularioController.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/Modulos/Produccion/UnidadDeMedida/FormularioController.php?f=Borrar'
		},
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});
