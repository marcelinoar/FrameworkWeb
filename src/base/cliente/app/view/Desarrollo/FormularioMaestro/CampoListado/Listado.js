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

Ext.define ('Sistema.view.Desarrollo.FormularioMaestro.CampoListado.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'des-fmae-cd-ListadoController',
    alias			: 'widget.des-fmae-cd-Listado',
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
		xtype: 'des-fmae-cd-ListadoGrilla'
	}]
});