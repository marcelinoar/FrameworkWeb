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

Ext.define('Sistema.view.Produccion.VisualizacionMovimientoStock.Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget.prod-vmovst-Formulario',
    controller: 'prod-vmovst-FormularioController',
	closable: false,
	bodyPadding: 10,
	autoScroll:true,
	requires:[
		'Sistema.view.Produccion.VisualizacionMovimientoStock.DetMovimientoStock.FormularioController'
	],
	fieldDefaults:{
			labelAlign:'left',
			labelWidth:120
	},
	items: [{
		xtype: 'panel',
		layout: {
			type: 'vbox',
			align: 'stretch',
			pack: 'top'
		},
		items: [{
			// --- comienza cuadro general
			xtype: 'fieldset',
			title: 'Cabecera',
			name: 'FilterFieldSet',
			collapsible: false,
			collapsed: false,
			defaults: {
				anchor: '100%',
				layout: {
					type: 'vbox',
					align: 'stretch',
					pack: 'top'
				}
			},
			items: [{
				xtype: 'fieldcontainer',
				fieldLabel: 'Nro. Movimiento',
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					hideLabel: true
				},
				items: [{
					xtype: 'textfield',
					name: 'tbNroMovimiento',
					readOnly: true,
					width: 80
				}, {
					width: 10
				}, {
					xtype: 'displayfield',
					value: 'Mov. de Anulacion:'
				}, {
					width: 10
				}, {
					xtype: 'textfield',
					name: 'tbTransaccionDeAnulacion',
					readOnly: true,
					width: 100
				}, {
					width: 10
				}, {
					xtype: 'displayfield',
					value: 'Fecha y Hora:'
				}, {
					width: 10
				}, {
					xtype: 'textfield',
					name: 'tbTimestamp',
					readOnly: true,
					width: 150
				}, {
					width: 10
				}, {
					xtype: 'displayfield',
					value: 'Usuario:'
				}, {
					width: 10
				}, {
					xtype: 'textfield',
					name: 'tbUsuario',
					readOnly: true,
					width: 150
				}]
			}, {
				xtype: 'fieldcontainer',
				fieldLabel: 'Tipo',
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					hideLabel: true
				},
				items: [{
					xtype: 'textfield',
					name: 'tbCodTipoMovimiento',
					readOnly: true,
					width: 150,
					vtype: 'cstring'
				}, {
					width: 10
				}, {
					xtype: 'textfield',
					name: 'tbDescTipoMovimiento',
					width: 215,
					readOnly: true,
					vtype: 'sstring'
				}]
			}, {
				xtype: 'fieldcontainer',
				fieldLabel: 'Alm. Origen',
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					hideLabel: true
				},
				items: [{
					xtype: 'textfield',
					name: 'tbAlmacenOrigen',
					readOnly: true,
					vtype: 'sstring'
				}, {
					width: 10
				}, {
					xtype: 'displayfield',
					value: 'Alm. Destino:'
				}, {
					width: 10
				}, {
					xtype: 'textfield',
					name: 'tbAlmacenDestino',
					readOnly: true,
					vtype: 'sstring'
				}]
			}, {
				xtype: 'textareafield',
				name: 'tbComentarios',
				readOnly: true,
				fieldLabel: 'Comentarios',
				allowBlank: true,
				vtype: 'sstring'
			}, {
				height: 10
			}]
		}, {
			// --- comienza cuadro de informacion anexa
			xtype: 'fieldset',
			title: 'Informacion Adjunta',
			name: 'FilterFieldSet',
			collapsible: false,
			collapsed: false,
			defaults: {
				anchor: '100%',
				layout: {
					type: 'vbox',
					align: 'stretch',
					pack: 'top'
				}
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
					xtype: 'textfield',
					name: 'tbCodLoteFabricacion',
					readOnly:true,
					width: 150,
					vtype: 'cstring'
				}, {
					width: 10
				}, {
					xtype: 'button',
					name: 'btnVerLoteFabricacion',
					text: 'Ver'
				}, {
					width: 10
				}, {
					xtype: 'displayfield',
					value: 'OT:'
				}, {
					width: 10
				}, {
					xtype: 'textfield',
					name: 'tbCodOT',
					readOnly:true,
					width: 150,
					vtype: 'cstring'
				}, {
					width: 10
				}, {
					xtype: 'button',
					name: 'btnVerOT',
					text: 'Ver'
				}]
			}, {
				xtype: 'fieldcontainer',
				fieldLabel: 'Ord. de Compra',
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					hideLabel: true
				},
				items: [{
					xtype: 'textfield',
					name: 'tbCodOrdenDeCompra',
					readOnly:true,
					width: 150,
					vtype: 'cstring'
				}, {
					width: 10
				}, {
					xtype: 'button',
					name: 'btnVerOrdenDeCompra',
					text: 'Ver'
				}, {
					width: 10
				}, {
					xtype: 'displayfield',
					value: 'Pedido de Venta:'
				}, {
					width: 10
				}, {
					xtype: 'textfield',
					readOnly:true,
					name: 'tbCodPedidoDeVenta',
					width: 150,
					vtype: 'cstring'
				}, {
					width: 10
				}, {
					xtype: 'button',
					name: 'btnVerPedidoDeVenta',
					text: 'Ver'
				}]
			}, {
				xtype: 'textfield',
				name: 'tbLoteDeCompras',
				readOnly:true,
				fieldLabel: 'Lote de Compras',
				allowBlank: true,
				vtype: 'sstring'
			}, {
				height: 10
			}]
		}]
	}, {
		xtype: 'panel',
		height: 10
	}, {
		xtype: 'tabpanel',
		name: 'formTabPanel',
		items:[{
			title: 'Detalles del Movimiento',
			disabled: false,
			items: [{
				xtype: 'prod-vmovst-dmov-Listado'
			}]
		}]
	}],
	buttons: [{
		text: 'ANULAR MOVIMIENTO COMPLETO',
		cls: 'btnAtencion',
		name: 'btnAnular'
	}, {
		xtype: 'tbfill'
	}, {
		text: 'Cerrar',
		name: 'btnGuardar'
	}, {
		text: 'Borrar',
		hidden: true,
		iconCls:'btnBorrar',
		name: 'btnBorrar'
	}]
});
