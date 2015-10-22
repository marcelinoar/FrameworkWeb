/**************************************************************************************************
 * Archivo: DetalleFormulario.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Desarrollo.model.DetalleFormulario', {
	extend: 'Ext.data.Model',
	requires: [
		'Sistema.view.Desarrollo.model.CampoFormulario',
		'Sistema.view.Desarrollo.model.CampoListado'
	],
	fields: [
		{name: 'tipoDetalleFormularioId'},
		{name: 'nombreEntidad'},
		{name: 'prefijoXtype'},
		{name: 'rutaEntidad'},
		{name: 'claseEntidad'},
		{name: 'nombreCampoFormulario'},
		{name: 'descripcion'},
		{name: 'camposFormulario'},
		{name: 'camposListado'},
		{name: 'etiqueta'}
	],
	hasMany: [{
		model: 'Sistema.view.Desarrollo.model.CampoFormulario',
		name: 'camposFormulario'
	}, {
		model: 'Sistema.view.Desarrollo.model.CampoListado',
		name: 'camposListado'
	}],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/WS/Desarrollo/DetalleFormularioWS.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/WS/Desarrollo/DetalleFormularioWS.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/WS/Desarrollo/DetalleFormularioWS.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/WS/Desarrollo/DetalleFormularioWS.php?f=Borrar'
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
