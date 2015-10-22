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

Ext.define ('Sistema.view.Produccion.OrdenDeTrabajo.Formula.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'prod-ot-frm-ListadoController',
    alias			: 'widget.prod-ot-frm-Listado',
	closable		: false,
	width			: '100%',

	tbar: [{
		xtype: 'fieldset',
		title: 'Formula',
		name: 'FilterFieldSet',
		collapsible: false,
		collapsed: false,
		defaults: {
			anchor: '100%',
			layout: {
				type: 'hbox',
				align: 'stretch',
				pack: 'top'
			}
		},
		items: [{
			xtype: 'fieldcontainer',
			msgTarget : 'side',
			layout: 'hbox',
			defaults: {
				hideLabel: true
			},
			items: [{
				xtype: 'textfield',
				name: 'tbCodFormula',
				width: 180,
				allowBlank: true,
				vtype: 'cstring'
			}, {
				width: 10
			}, {
				xtype: 'textfield',
				name: 'tbDescFormula',
				width: 250,
				readOnly: true,
				vtype: 'sstring'
			}, {
				width: 10
			}, {
				iconCls: 'btnBuscar',
				name: 'btnBuscarFormula',
				xtype: 'button'
			}, {
				width: 10
			}, {
				xtype: 'button',
				name: 'btnVerFormula',
				text: 'Ver'
			}]
		}, {
			height: 5
		}]
	}],

	items: [{
		xtype: 'prod-ot-frm-ListadoGrilla'
	}]
});