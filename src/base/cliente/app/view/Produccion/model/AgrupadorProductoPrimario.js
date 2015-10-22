/**************************************************************************************************
 * Archivo: AgrupadorProductoPrimario.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Agrupador primario
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.AgrupadorProductoPrimario', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'nombre'}
	],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/Modulos/Produccion/AgrupadorProductoPrimario/FormularioController.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/Modulos/Produccion/AgrupadorProductoPrimario/FormularioController.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/Modulos/Produccion/AgrupadorProductoPrimario/FormularioController.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/Modulos/Produccion/AgrupadorProductoPrimario/FormularioController.php?f=Borrar'
		},
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});
