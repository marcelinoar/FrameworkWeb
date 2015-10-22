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

Ext.define ('Sistema.view.Sistema.Grupo.Empresa.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'sis-grp-emp-ListadoController',
    alias			: 'widget.sis-grp-emp-Listado',
	closable		: false,

	tbar: [{
		xtype: 'button',
		text: 'Agregar Empresa',
		name: 'btnNuevo',
		iconCls: 'btnNuevo',
		tooltip: 'Agrega una empresa al grupo'
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
		xtype: 'sis-grp-emp-ListadoGrilla'
	}]
});