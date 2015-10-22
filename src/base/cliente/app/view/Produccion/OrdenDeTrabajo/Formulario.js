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

Ext.define('Sistema.view.Produccion.OrdenDeTrabajo.Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget.prod-ot-Formulario',
    controller: 'prod-ot-FormularioController',
	closable: false,
	bodyPadding: 10,
	items: [{
		xtype: 'panel',
		layout: {
			type: 'hbox',
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
			width:'60%',
			items: [{
				xtype: 'fieldcontainer',
				fieldLabel: 'Codigo',
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					hideLabel: true
				},
				items: [{
					xtype: 'textfield',
					name: 'tbCodigo',
					width: 150,
					allowBlank: true,
					readOnly: true
				}, {
					width: 10
				}, {
					xtype: 'displayfield',
					value: 'Estado:'
				}, {
					width: 10
				}, {
					xtype: 'textfield',
					name: 'tbEstado',
					width: 150,
					allowBlank: true,
					readOnly: true
				}]
			}, {
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
					width: 100,
					vtype: 'cstring'
				}, {
					width: 10
				}, {
					xtype: 'textfield',
					name: 'tbDescProducto',
					width: 215,
					readOnly: true,
					vtype: 'sstring'
				}, {
					width: 10
				}, {
					iconCls: 'btnBuscar',
					name: 'btnBuscarProducto',
					xtype: 'button'
				}, {
					width: 10
				}, {
					xtype: 'button',
					name: 'btnVerProducto',
					text: 'Ver'
				}]
			}, {
				xtype: 'fieldcontainer',
				fieldLabel: 'Centro de Trabajo',
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					hideLabel: true
				},
				items: [{
					xtype: 'textfield',
					name: 'tbCodCentroDeTrabajo',
					width: 100,
					readOnly: true,
					vtype: 'cstring'
				}, {
					width: 10
				}, {
					xtype: 'textfield',
					name: 'tbDescCentroDeTrabajo',
					width: 215,
					readOnly: true,
					vtype: 'sstring'
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
					name: 'tbCantidad',
					width: 100
				}, {
					width: 10
				}, {
					xtype: 'displayfield',
					value: 'UM:'
				}, {
					width: 10
				}, {
					xtype: 'textfield',
					name: 'tbCodUM',
					width: 50,
					vtype: 'cstring'
				}, {
					width: 10
				}, {
					xtype: 'textfield',
					name: 'tbDescUM',
					width: 215,
					readOnly: true,
					vtype: 'sstring'
				}, {
					width: 10
				}, {
					iconCls: 'btnBuscar',
					name: 'btnBuscarUM',
					xtype: 'button'
				}]
			}, {
				xtype: 'textareafield',
				name: 'tbComentarios',
				fieldLabel: 'Comentarios',
				vtype: 'sstring'
			}]
		}, {
			width: 10
		}, {
			xtype: 'fieldset',
			title: 'Fechas',
			collapsible: false,
			collapsed: false,
			width:388,
			defaults: {
				anchor: '100%',
				layout: {
					type: 'vbox',
					align: 'stretch',
					pack: 'top'
				}
			},
			items: [{
				xtype: 'datefield',
				fieldLabel: 'Creada',
				name: 'tbFechaCreacion',
				format: 'd/m/Y'
			}, {
				xtype: 'datefield',
				fieldLabel: 'Programada',
				name: 'tbFechaProgramada',
				format: 'd/m/Y',
				allowBlank: true
			}, {
				xtype: 'datefield',
				fieldLabel: 'En Produccion',
				name: 'tbFechaProduccionReal',
				format: 'd/m/Y',
				allowBlank: true
			}, {
				xtype: 'datefield',
				fieldLabel: 'Terminacion',
				name: 'tbFechaTerminada',
				format: 'd/m/Y',
				allowBlank: true
			}, {
				xtype: 'button',
				text:'Confirmar Orden de Trabajo',
				name:'btnCambiarEstadoOT'
			}]
		}]
	}, {
		xtype: 'fieldset',
		title: 'Origen',
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
			fieldLabel: 'Pedido de Venta',
			msgTarget : 'side',
			layout: 'hbox',
			defaults: {
				hideLabel: true
			},
			items: [{
				xtype: 'textfield',
				name: 'tbCodPedidoDeVentas',
				width: 100,
				vtype: 'cstring'
			}, {
				width: 10
			}, {
				xtype: 'textfield',
				name: 'tbDescPedidoDeVentas',
				width: 215,
				readOnly: true,
				vtype: 'sstring'
			}, {
				width: 10
			}, {
				iconCls: 'btnBuscar',
				name: 'btnBuscarPedidoDeVentas',
				xtype: 'button'
			}, {
				width: 10
			}, {
				xtype: 'button',
				name: 'btnVerPedidoDeVentas',
				text: 'Ver'
			}, {
				width: 10
			}, {
				xtype: 'button',
				name: 'btnLimpiarPeidoDeVenta',
				text: 'Limpiar'
			}]
		}, {
			xtype: 'fieldcontainer',
			fieldLabel: 'Orden de Trabajo',
			msgTarget : 'side',
			layout: 'hbox',
			defaults: {
				hideLabel: true
			},
			items: [{
				xtype: 'textfield',
				name: 'tbCodOtPadre',
				width: 100,
				vtype: 'cstring'
			}, {
				width: 10
			}, {
				xtype: 'textfield',
				name: 'tbDescOtPadre',
				width: 215,
				readOnly: true,
				vtype: 'sstring'
			}, {
				width: 10
			}, {
				iconCls: 'btnBuscar',
				name: 'btnBuscarOtPadre',
				xtype: 'button'
			}, {
				width: 10
			}, {
				xtype: 'button',
				name: 'btnVerOtPadre',
				text: 'Ver'
			}, {
				width: 10
			}, {
				xtype: 'button',
				name: 'btnLimpiarOtPadre',
				text: 'Limpiar'
			}]
		}]
	}, {
		xtype: 'tabpanel',
		name: 'formTabPanel',
		items:[{
			title: 'Formula',
			disabled: false,
			items: [{
				xtype: 'prod-ot-frm-Listado'
			}]
		}, {
			title: 'Hoja de Ruta',
			disabled: false,
			items: [{
				xtype: 'prod-ot-hdr-Listado'
			}]
		}, {
			title: 'Reserva de MP',
			disabled: false,
			items: [{
				xtype: 'prod-ot-res-Listado'
			}]
		}, {
			title: 'Vales de Fabricacion',
			disabled: false,
			items: [{
				xtype: 'prod-ot-vf-Listado'
			}]
		}, {
			title: 'Control de Calidad',
			disabled: false,
			items: [{
				xtype: 'prod-ot-med-Listado'
			}]
		}, {
			title: 'Estado de Fabricacion',
			disabled: false,
			items: [{
				xtype: 'prod-ot-est-Listado'
			}]
		}, {
			title: 'Historico',
			disabled: false,
			items: [{
				xtype: 'prod-ot-hist-Listado'
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
