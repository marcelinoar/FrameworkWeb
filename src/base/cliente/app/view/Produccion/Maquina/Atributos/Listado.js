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

Ext.define ('Sistema.view.Produccion.Maquina.Atributos.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'prod-maq-att-ListadoController',
    alias			: 'widget.prod-maq-att-Listado',
	closable		: false,

	tbar: [{
		xtype: 'button',
		text: 'Agregar Registro',
		iconCls: 'btnNuevo',
		name: 'btnAgregarAtributo'
	}],

	items: [{
		xtype: 'prod-maq-att-ListadoGrilla'
	}]
});