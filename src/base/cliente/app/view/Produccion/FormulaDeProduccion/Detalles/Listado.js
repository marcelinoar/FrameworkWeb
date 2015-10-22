/**************************************************************************************************
 * Archivo: Listado.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.FormulaDeProduccion.Detalles.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'prod-form-det-ListadoController',
    alias			: 'widget.prod-form-det-Listado',
	closable		: false,

	tbar: [{
		xtype: 'button',
		text: 'Agregar Elemento',
		name: 'btnNuevo',
		iconCls: 'btnNuevo'
	}],

	items: [{
		xtype: 'prod-form-det-ListadoGrilla'
	}]
});