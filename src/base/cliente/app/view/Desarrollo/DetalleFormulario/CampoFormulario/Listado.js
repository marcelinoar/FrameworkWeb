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

Ext.define ('Sistema.view.Desarrollo.DetalleFormulario.CampoFormulario.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'des-fdet-cf-ListadoController',
    alias			: 'widget.des-fdet-cf-Listado',
	closable		: false,

	tbar: [{
		xtype: 'button',
		text: 'Agregar Registro',
		name: 'btnNuevo',
		iconCls: 'btnNuevo',
		tooltip: 'Agregar un nuevo registro'
	}, {
		xtype: 'tbfill'
	}],

	items: [{
		xtype: 'des-fdet-cf-ListadoGrilla'
	}]
});