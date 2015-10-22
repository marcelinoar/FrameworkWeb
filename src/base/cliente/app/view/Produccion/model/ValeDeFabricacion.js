/**************************************************************************************************
 * Archivo: ValeDeFabricacion.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: .
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.ValeDeFabricacion', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'nombre'}
	],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/Modulos/Produccion/ValeDeFabricacion/FormularioController.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/Modulos/Produccion/ValeDeFabricacion/FormularioController.php?f=Crear'
		},
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});
