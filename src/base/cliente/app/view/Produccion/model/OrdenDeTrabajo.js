/**************************************************************************************************
 * Archivo: OrdenDeTrabajo.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Pantalla de carga de Ordenes de Trabajo
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.OrdenDeTrabajo', {
	extend: 'Ext.data.Model',
	requires: [
		'Sistema.view.Produccion.model.ValeDeFabricacion',
		'Sistema.view.Produccion.model.OperacionHojaDeRutaOT',
		'Sistema.view.Produccion.model.DetFormulaDeProduccionOT',
		'Sistema.view.Produccion.model.DetReservaMateriaPrimaOT',
		'Sistema.view.Produccion.model.DetMedicionDeAtributoOT',
		'Sistema.view.Produccion.model.DetRegistroHistoricoOT'
	],
	fields: [
		{name: 'codigo'},
		{name: 'productoId'},
		{name: 'estadoOTId', type: 'int'},
		{name: 'loteDeFabricacionId'},
		{name: 'formulaDeProduccionId'},
		{name: 'hojaDeRutaId'},
		{name: 'cantidad'},
		{name: 'unidadDeMedidaId'},
		{name: 'fechaDeProduccionProgramada'},
		{name: 'ordenDeTrabajoPadreId'},
		{name: 'comentarios'},
		{name: 'valesDeFabricacion'},
		{name: 'operacionesHojaDeRuta'},
		{name: 'detFormulaDeProduccionOT'},
		{name: 'detReservaMateriaPrimaOT'},
		{name: 'detMedicionDeAtributoOT'},
		{name: 'detRegistroHistoricoOT'}
	],
	hasMany: [{
		model: 'Sistema.view.Produccion.model.ValeDeFabricacion',
		name: 'valesDeFabricacion'
	}, {
		model: 'Sistema.view.Produccion.model.OperacionHojaDeRutaOT',
		name: 'operacionesHojaDeRuta'
	}, {
		model: 'Sistema.view.Produccion.model.DetFormulaDeProduccionOT',
		name: 'detFormulaDeProduccionOT'
	}, {
		model: 'Sistema.view.Produccion.model.DetReservaMateriaPrimaOT',
		name: 'detReservaMateriaPrimaOT'
	}, {
		model: 'Sistema.view.Produccion.model.DetMedicionDeAtributoOT',
		name: 'detMedicionDeAtributoOT'
	}, {
		model: 'Sistema.view.Produccion.model.DetRegistroHistoricoOT',
		name: 'detRegistroHistoricoOT'
	}],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/Modulos/Produccion/OrdenDeTrabajo/FormularioController.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/Modulos/Produccion/OrdenDeTrabajo/FormularioController.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/Modulos/Produccion/OrdenDeTrabajo/FormularioController.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/Modulos/Produccion/OrdenDeTrabajo/FormularioController.php?f=Borrar'
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
