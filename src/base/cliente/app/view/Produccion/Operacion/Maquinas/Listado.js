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

Ext.define ('Sistema.view.Produccion.Operacion.Maquinas.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'prod-oper-maq-ListadoController',
    alias			: 'widget.prod-oper-maq-Listado',
	closable		: false,

	tbar: [{
		xtype: 'button',
		text: 'Agregar Maquinas',
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
		xtype: 'prod-oper-maq-ListadoGrilla'
	}]
});