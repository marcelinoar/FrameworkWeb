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

Ext.define ('Sistema.view.Produccion.HojaDeRuta.Operaciones.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'prod-hdruta-oper-ListadoController',
    alias			: 'widget.prod-hdruta-oper-Listado',
	closable		: false,
	tbar: [{
		xtype: 'button',
		text: 'Agregar Operaciones',
		name: 'btnNuevo',
		iconCls: 'btnNuevo'
	}],

	items: [{
		xtype: 'prod-hdruta-oper-ListadoGrilla'
	}]
});