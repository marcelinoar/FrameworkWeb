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

Ext.define ('Sistema.view.Produccion.Producto.FormulasDeProduccion.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'prod-producto-frm-ListadoController',
    alias			: 'widget.prod-producto-frm-Listado',
	closable		: false,
	width			: '100%',

	tbar: [{
		xtype: 'button',
		text: 'Agregar Formula',
		name: 'btnNuevo',
		iconCls: 'btnNuevo',
		tooltip: 'Agregar una formula al producto'
	}, {
		xtype: 'tbfill'
	}, {
		xtype: 'button',
		text: 'Recargar Listado',
		name: 'btnRecargarListado',
		iconCls: 'btnRecargar',
		tooltip: 'Refrescar los datos del listado'
	}],

	items: [{
		xtype: 'prod-producto-frm-ListadoGrilla'
	}]
});