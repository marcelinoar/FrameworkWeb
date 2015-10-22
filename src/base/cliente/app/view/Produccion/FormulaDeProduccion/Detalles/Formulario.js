/**************************************************************************************************
 * Archivo: Formulario.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define('Sistema.view.Produccion.FormulaDeProduccion.Detalles.Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget.prod-form-det-Formulario',
    controller: 'prod-form-det-FormularioController',
	closable: false,
	bodyPadding: 10,

	layout: {
		type: 'vbox',
		align: 'stretch',
		pack: 'top'
	},

	items: [{
		xtype: 'form',
		layout: {
			type: 'vbox',
			align: 'stretch',
			pack: 'top'
		},
		items: [{
			xtype: 'fieldset',
			title: 'Elemento a incluir',
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
				fieldLabel: 'Producto',
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					hideLabel: true
				},
				items: [{
					xtype: 'textfield',
					name: 'tbCodProducto',
					width: 160,
					allowBlank: true,
					vtype: 'cstring'
				}, {
					width: 10
				}, {
					xtype: 'textfield',
					name: 'tbDescProducto',
					width: 200,
					readOnly: true,
					vtype: 'sstring'
				}, {
					width: 10
				}, {
					iconCls: 'btnBuscar',
					name: 'btnBuscarProducto',
					xtype: 'button'
				}]
			}, {
				xtype: 'fieldcontainer',
				fieldLabel: 'Formula',
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					hideLabel: true
				},
				items: [{
					xtype: 'textfield',
					name: 'tbCodFormula',
					width: 160,
					allowBlank: true,
					vtype: 'cstring'
				}, {
					width: 10
				}, {
					xtype: 'textfield',
					name: 'tbDescFormula',
					width: 200,
					readOnly: true,
					vtype: 'sstring'
				}, {
					width: 10
				}, {
					iconCls: 'btnBuscar',
					name: 'btnBuscarFormula',
					xtype: 'button'
				}]
			}]
		}, {
			xtype: 'fieldcontainer',
			fieldLabel: 'Cantidad',
			msgTarget : 'side',
			layout: 'hbox',
			defaults: {
				hideLabel: true
			},
			items: [{
				xtype: 'textfield',
				name: 'tbCantidadUtilizada',
				fieldLabel: 'Cantidad',
				width: 90,
				allowBlank: false
			}, {
				width: 10
			}, {
				xtype			: 'combo',
				name			: 'cbUnidadDeMedidaId',
				fieldLabel		: 'UM',
				allowBlank		: false,
				queryMode		: 'local',
				width			: 100,
				editable		: false,
				forceSelection	: true,
				valueField		: 'unidadDeMedidaId',
				displayField	: 'codigo',
				store			: Ext.create ('Sistema.view.Produccion.store.StoreUnidadDeMedida', {autoLoad: false})
			}]
		}]
	}],
	buttons: [{
		text: 'Guardar',
		iconCls:'btnGuardar',
		name: 'btnGuardar'
	}, {
		text: 'Borrar',
		iconCls:'btnBorrar',
		name: 'btnBorrar'
	}]
});
