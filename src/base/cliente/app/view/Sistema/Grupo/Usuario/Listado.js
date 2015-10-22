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

Ext.define ('Sistema.view.Sistema.Grupo.Usuario.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'sis-grp-usu-ListadoController',
    alias			: 'widget.sis-grp-usu-Listado',
	closable		: false,

	tbar: [{
		xtype: 'button',
		text: 'Agregar Usuario',
		name: 'btnNuevo',
		iconCls: 'btnNuevo',
		tooltip: 'Agregar un usuario al grupo'
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
		xtype: 'sis-grp-usu-ListadoGrilla'
	}]
});