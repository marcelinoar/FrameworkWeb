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

Ext.define('Sistema.view.Produccion.MovimientoStock.Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget.prod-movst-Formulario',
    controller: 'prod-movst-FormularioController',
	closable: false,
	bodyPadding: 10,
	autoScroll:true,
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
				fieldLabel: 'Fecha y Hora',
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					hideLabel: true
				},
				items: [{
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
				}, {
					width: 10
				}, {
					iconCls: 'btnBuscar',
					name: 'btnBuscarTipoMovimiento',
					xtype: 'button'
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
					xtype           : 'combo',
					name            : 'cbAlmacenOrigen',
					queryMode       : 'local',
					multiSelect     : false,
					width           : 250,
					editable        : true,
					forceSelection  : true,
					allowBlank      : false,
					typeAhead       : true,
					valueField      : 'almacenId',
					displayField    : 'codigo'
				}, {
					width: 10
				}, {
					xtype: 'displayfield',
					value: 'Alm. Destino:'
				}, {
					width: 10
				}, {
					xtype           : 'combo',
					name            : 'cbAlmacenDestino',
					queryMode       : 'local',
					multiSelect     : false,
					width           : 250,
					editable        : true,
					forceSelection  : true,
					allowBlank      : false,
					typeAhead       : true,
					valueField      : 'almacenId',
					displayField    : 'codigo'
				}]
			}, {
				xtype: 'textareafield',
				name: 'tbComentarios',
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
					disabled:true,
					width: 150,
					vtype: 'cstring'
				}, {
					width: 10
				}, {
					iconCls: 'btnBuscar',
					name: 'btnBuscarLoteFabricacion',
					disabled:true,
					xtype: 'button'
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
					disabled:true,
					width: 150,
					vtype: 'cstring'
				}, {
					width: 10
				}, {
					iconCls: 'btnBuscar',
					name: 'btnBuscarOT',
					disabled:true,
					xtype: 'button'
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
					disabled:true,
					width: 150,
					vtype: 'cstring'
				}, {
					width: 10
				}, {
					iconCls: 'btnBuscar',
					disabled:true,
					name: 'btnBuscarOrdenDeCompra',
					xtype: 'button'
				}, {
					width: 10
				}, {
					xtype: 'displayfield',
					value: 'Pedido de Venta:'
				}, {
					width: 10
				}, {
					xtype: 'textfield',
					disabled:true,
					name: 'tbCodPedidoDeVenta',
					width: 150,
					vtype: 'cstring'
				}, {
					width: 10
				}, {
					iconCls: 'btnBuscar',
					disabled:true,
					name: 'btnBuscarPedidoDeVenta',
					xtype: 'button'
				}]
			}, {
				xtype: 'textfield',
				name: 'tbLoteDeCompras',
				disabled:true,
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
			title: 'Detalles',
			disabled: false,
			items: [{
				xtype: 'prod-movst-dmov-Listado'
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
