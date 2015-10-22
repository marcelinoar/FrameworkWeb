/**************************************************************************************************
 * Archivo: FormulaDeProduccion.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Formulas de Produccion
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.FormulaDeProduccion', {
	extend: 'Ext.data.Model',
	requires: [
		'Sistema.view.Produccion.model.DetFormulaDeProduccion'
	],
	fields: [
		{name: 'codigo'},
		{name: 'descripcionCorta'},
		{name: 'detalles'},
		{name: 'descripcionLarga'}
	],
	hasMany: [{
		model: 'Sistema.view.Produccion.model.DetFormulaDeProduccion',
		name: 'detalles'
	}],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/Modulos/Produccion/FormulaDeProduccion/FormularioController.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/Modulos/Produccion/FormulaDeProduccion/FormularioController.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/Modulos/Produccion/FormulaDeProduccion/FormularioController.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/Modulos/Produccion/FormulaDeProduccion/FormularioController.php?f=Borrar'
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
