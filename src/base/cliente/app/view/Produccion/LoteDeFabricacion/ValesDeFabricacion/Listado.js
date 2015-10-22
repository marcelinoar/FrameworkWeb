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

Ext.define ('Sistema.view.Produccion.LoteDeFabricacion.ValesDeFabricacion.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'prod-lote-vf-ListadoController',
    alias			: 'widget.prod-lote-vf-Listado',
	closable		: false,

	items: [{
		xtype: 'prod-lote-vf-ListadoGrilla'
	}]
});