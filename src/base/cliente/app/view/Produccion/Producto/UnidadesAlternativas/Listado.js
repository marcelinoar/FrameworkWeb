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

Ext.define ('Sistema.view.Produccion.Producto.UnidadesAlernativas.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'prod-producto-ua-ListadoController',
    alias			: 'widget.prod-producto-ua-Listado',
	closable		: false,

	tbar: [{
		xtype: 'button',
		text: 'Agregar Unidad',
		name: 'btnNuevo',
		iconCls: 'btnNuevo',
		tooltip: 'Agregar una nueva unidad de medida'
	}],

	items: [{
		xtype: 'prod-producto-ua-ListadoGrilla'
	}]
});