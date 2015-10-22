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

Ext.define ('Sistema.view.Sistema.Grupo.PermisosEstandar.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'sis-grp-perm-ListadoController',
    alias			: 'widget.sis-grp-perm-Listado',
	closable		: false,

	items: [{
		xtype: 'sis-grp-perm-ListadoGrilla'
	}]
});