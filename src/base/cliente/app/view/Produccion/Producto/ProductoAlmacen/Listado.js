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

Ext.define ('Sistema.view.Produccion.Producto.ProductoAlmacen.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'prod-producto-pa-ListadoController',
    alias			: 'widget.prod-producto-pa-Listado',
	closable		: false,
	width			: '100%',

	items: [{
		xtype: 'prod-producto-pa-ListadoGrilla'
	}]
});