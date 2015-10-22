/**************************************************************************************************
 * ---------------- ARCHIVO GENERADO AUTOMATICAMENTE ----------------
 * Archivo: Listado.js
 * ------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Sistema.Empresa.Grupo.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'sis-emp-grp-ListadoController',
    alias			: 'widget.sis-emp-grp-Listado',
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
		xtype: 'sis-emp-grp-ListadoGrilla'
	}]
});