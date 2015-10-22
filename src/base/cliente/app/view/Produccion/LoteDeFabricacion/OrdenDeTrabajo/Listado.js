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

Ext.define ('Sistema.view.Produccion.LoteDeFabricacion.OrdenDeTrabajo.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'prod-lote-ot-ListadoController',
    alias			: 'widget.prod-lote-ot-Listado',
	closable		: false,

	tbar: [{
		xtype: 'button',
		text: 'Agregar Orden de Trabajo',
		name: 'btnNuevo',
		iconCls: 'btnNuevo',
		tooltip: 'Agregar una Orden de Trabajo al lote'
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
		xtype: 'prod-lote-ot-ListadoGrilla'
	}]
});