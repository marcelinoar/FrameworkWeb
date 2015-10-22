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

Ext.define ('Sistema.view.Produccion.VisualizacionMovimientoStock.DetMovimientoStock.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'prod-vmovst-dmov-ListadoController',
    alias			: 'widget.prod-vmovst-dmov-Listado',
	closable		: false,

	items: [{
		xtype: 'prod-vmovst-dmov-ListadoGrilla'
	}]
});