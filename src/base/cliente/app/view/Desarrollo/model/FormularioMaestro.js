/**************************************************************************************************
 * Archivo: FormularioMaestro.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Desarrollo.model.FormularioMaestro', {
	extend: 'Ext.data.Model',
	requires: [
		'Sistema.view.Desarrollo.model.DetalleFormulario',
		'Sistema.view.Desarrollo.model.CampoFormulario',
		'Sistema.view.Desarrollo.model.CampoListado'
	],
	fields: [
		{name: 'moduloId'},
		{name: 'tipoFormularioId'},
		{name: 'nombreEntidadPermisos'},
		{name: 'nombreEntidad'},
		{name: 'prefijoXtype'},
		{name: 'nombreSecuencia'},
		{name: 'anchoVentana'},
		{name: 'altoVentana'},
		{name: 'descripcion'},
		{name: 'camposFormulario'},
		{name: 'camposListado'},
		{name: 'detalles'}
	],
	hasMany: [{
		model: 'Sistema.view.Desarrollo.model.DetalleFormulario',
		name: 'detalles'
	}, {
		model: 'Sistema.view.Desarrollo.model.CampoFormulario',
		name: 'camposFormulario'
	}, {
		model: 'Sistema.view.Desarrollo.model.CampoListado',
		name: 'camposListado'
	}],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/WS/Desarrollo/FormularioMaestroWS.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/WS/Desarrollo/FormularioMaestroWS.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/WS/Desarrollo/FormularioMaestroWS.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/WS/Desarrollo/FormularioMaestroWS.php?f=Borrar'
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
