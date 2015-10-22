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

Ext.define ('Sistema.view.Produccion.OrdenDeTrabajo.ValeDeFabricacion.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'prod-ot-vf-ListadoController',
    alias			: 'widget.prod-ot-vf-Listado',
	closable		: false,

	items: [{
		height: 10
	}, {
		xtype: 'prod-ot-vf-ListadoGrilla'
	}]
});