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

Ext.define ('Sistema.view.Produccion.CentroDeTrabajo.Operacion.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'prod-ct-oper-ListadoController',
    alias			: 'widget.prod-ct-oper-Listado',
	closable		: false,

	tbar: [{
		xtype: 'button',
		text: 'Agregar Operacion',
		name: 'btnNuevo',
		iconCls: 'btnNuevo'
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
		xtype: 'prod-ct-oper-ListadoGrilla'
	}]
});