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

Ext.define ('Sistema.view.Produccion.CentroDeTrabajo.Atributos.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'prod-ct-att-ListadoController',
    alias			: 'widget.prod-ct-att-Listado',
	closable		: false,

	tbar: [{
		xtype: 'button',
		text: 'Agregar Atributo',
		iconCls: 'btnNuevo',
		name: 'btnAgregarAtributo'
	}],

	items: [{
		xtype: 'prod-ct-att-ListadoGrilla'
	}]
});