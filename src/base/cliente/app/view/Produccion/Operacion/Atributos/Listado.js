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

Ext.define ('Sistema.view.Produccion.Operacion.Atributos.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'prod-oper-att-ListadoController',
    alias			: 'widget.prod-oper-att-Listado',
	closable		: false,

	tbar: [{
		xtype: 'button',
		text: 'Agregar Atributo',
		name: 'btnNuevo',
		iconCls: 'btnNuevo',
		tooltip: 'Agregar un nuevo atributo a la operacion'
	}],

	items: [{
		xtype: 'prod-oper-att-ListadoGrilla'
	}]
});