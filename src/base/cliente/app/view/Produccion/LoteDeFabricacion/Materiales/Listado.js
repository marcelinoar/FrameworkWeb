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

Ext.define ('Sistema.view.Produccion.LoteDeFabricacion.Materiales.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'prod-lote-mat-ListadoController',
    alias			: 'widget.prod-lote-mat-Listado',
	closable		: false,
	requires:[
		'Sistema.view.Produccion.LoteDeFabricacion.Materiales.StoreMateriales'
	],

	tbar: [{
		xtype: 'button',
		text: 'Calcular Formula de Lote',
		iconCls: 'btnRecargar',
		name: 'btnCalcularFormula'
	}],

	items: [{
		xtype: 'prod-lote-mat-ListadoGrilla'
	}]
});