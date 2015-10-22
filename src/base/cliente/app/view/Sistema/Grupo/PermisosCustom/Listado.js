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

Ext.define ('Sistema.view.Sistema.Grupo.PermisosCustom.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'sis-grp-pcus-ListadoController',
    alias			: 'widget.sis-grp-pcus-Listado',
	closable		: false,

	items: [{
		xtype: 'sis-grp-pcus-ListadoGrilla'
	}]
});