/**************************************************************************************************
 * Archivo: HojaDeRuta.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM Hojas de ruta
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.HojaDeRuta', {
	extend: 'Ext.data.Model',
	requires: [
		'Sistema.view.Produccion.model.Operacion'
	],
	fields: [
		{name: 'codigo'},
		{name: 'operaciones'},
		{name: 'estadoHojaDeRutaId'},
		{name: 'descripcionCorta'},
		{name: 'descripcionLarga'}
	],
	hasMany: [{
		model: 'Sistema.view.Produccion.model.Operacion',
		name: 'operaciones'
	}],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/Modulos/Produccion/HojaDeRuta/FormularioController.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/Modulos/Produccion/HojaDeRuta/FormularioController.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/Modulos/Produccion/HojaDeRuta/FormularioController.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/Modulos/Produccion/HojaDeRuta/FormularioController.php?f=Borrar'
		},
		reader: {
			type: 'json',
			rootProperty: 'root'
		},
		writer: {
			writeAllFields: true,
			allDataOptions: {
				associated: true
			}
		}
	}
});
