/**************************************************************************************************
 * Archivo: LineaDeProduccion.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Linea de Produccion
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.LineaDeProduccion', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'codigo'},
		{name: 'descripcionCorta'},
		{name: 'descripcionLarga'}
	],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/Modulos/Produccion/LineaDeProduccion/FormularioController.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/Modulos/Produccion/LineaDeProduccion/FormularioController.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/Modulos/Produccion/LineaDeProduccion/FormularioController.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/Modulos/Produccion/LineaDeProduccion/FormularioController.php?f=Borrar'
		},
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});
