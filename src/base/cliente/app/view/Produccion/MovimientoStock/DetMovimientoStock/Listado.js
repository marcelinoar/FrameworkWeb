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

Ext.define ('Sistema.view.Produccion.MovimientoStock.DetMovimientoStock.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'prod-movst-dmov-ListadoController',
    alias			: 'widget.prod-movst-dmov-Listado',
	closable		: false,

	tbar: [{
		xtype: 'button',
		text: 'Agregar Registro',
		name: 'btnNuevo',
		disabled: true,
		iconCls: 'btnNuevo',
		tooltip: 'Agregar un nuevo registro'
	}, {
		xtype: 'tbfill'
	}],

	items: [{
		xtype: 'prod-movst-dmov-ListadoGrilla'
	}]
});