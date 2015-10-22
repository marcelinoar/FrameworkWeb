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

Ext.define('Sistema.view.Produccion.TipoMovimientoStock.Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget.prod-tmov-Formulario',
    controller: 'prod-tmov-FormularioController',
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
			type: 'form',
			align: 'stretch',
			pack: 'top'
		},
		items: [{
			xtype: 'textfield',
			name: 'tbCodigo',
			fieldLabel: 'Codigo',
			allowBlank: false,
			vtype: 'sstring'
		}, {
			xtype: 'textfield',
			name: 'tbDescripcionCorta',
			fieldLabel: 'Descripcion Corta',
			allowBlank: false,
			vtype: 'sstring'
		}, {
			xtype: 'textareafield',
			name: 'tbDescripcionLarga',
			fieldLabel: 'Descripcion Larga',
			allowBlank: true,
			vtype: 'sstring'
		}, {
			xtype: 'checkboxgroup',
			fieldLabel: 'Permite',
			columns:2,
			anchor:'100%',
			items: [{
				boxLabel:'Origen Nulo',
				name: 'ckOrigenNull'
			}, {
				boxLabel:'Destino Nulo',
				name: 'ckDestinoNull'
			}]
		}]
	}, {
		xtype: 'fieldset',
		title: 'Campos Requeridos',
		name: 'FilterFieldSet',
		collapsible: false,
		collapsed: false,
		defaults: {
			anchor: '100%',
			layout: {
				type: 'hbox'
			}
		},
		items: [{
			xtype: 'panel',
			anchor:'100%',
			layout: {
				type: 'hbox'
			},
			items: [{
				xtype: 'form',
				anchor:'60%',
				fieldDefaults:{
					labelAlign:'left',
					labelWidth:130
				},
				items: [{
					xtype: 'fieldcontainer',
					fieldLabel: 'Lote de Fabricacion',
					msgTarget : 'side',
					layout: 'hbox',
					defaults: {
						hideLabel: true
					},
					items: [{
						xtype: 'checkbox',
						name: 'ckRequiereLoteFabricacion'
					}, {
						width: 10
					}, {
						xtype: 'displayfield',
						value: 'Lote de Compra:'
					}, {
						width: 10
					}, {
						xtype: 'checkbox',
						name: 'ckRequiereLoteCompras'
					}, {
						width: 10
					}, {
						xtype: 'displayfield',
						value: 'Orden de Trabajo:'
					}, {
						width: 10
					}, {
						xtype: 'checkbox',
						name: 'ckRequiereOT'
					}]
				}, {
					xtype: 'fieldcontainer',
					fieldLabel: 'Formula de Fabricacion',
					msgTarget : 'side',
					layout: 'hbox',
					defaults: {
						hideLabel: true
					},
					items: [{
						xtype: 'checkbox',
						name: 'ckRequiereFormulaDeFabricacion'
					}, {
						width: 10
					}, {
						xtype: 'displayfield',
						value: 'Pedido de Venta'
					}, {
						width: 10
					}, {
						xtype: 'checkbox',
						name: 'ckRequierePVenta'
					}, {
						width: 10
					}, {
						xtype: 'displayfield',
						value: 'Orden de Compra'
					}, {
						width: 10
					}, {
						xtype: 'checkbox',
						name: 'ckRequiereOCompra'
					}]
				}]
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
