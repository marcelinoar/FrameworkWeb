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

Ext.define ('Sistema.view.Desarrollo.FormularioMaestro.DetalleFormulario.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'des-fmae-df-ListadoController',
    alias			: 'widget.des-fmae-df-Listado',
	closable		: false,

	tbar: [{
		xtype: 'button',
		text: 'Agregar Registro',
		name: 'btnNuevo',
		iconCls: 'btnNuevo',
		tooltip: 'Agregar un nuevo registro'
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
		xtype: 'des-fmae-df-ListadoGrilla'
	}]
});