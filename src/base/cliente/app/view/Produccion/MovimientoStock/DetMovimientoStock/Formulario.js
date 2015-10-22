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

Ext.define('Sistema.view.Produccion.MovimientoStock.DetMovimientoStock.Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget.prod-movst-dmov-Formulario',
    controller: 'prod-movst-dmov-FormularioController',
	closable: false,
	bodyPadding: 10,
	layout: {
		type: 'vbox',
		align: 'stretch',
		pack: 'top'
	},
	fieldDefaults:{
		labelAlign: 'left',
		labelWidth: 100
	},
	items: [{
		xtype: 'fieldset',
		title: 'Producto',
		collapsible: false,
		layout: {
			type: 'form'
		},
		items: [{
			items: [{
				xtype: 'fieldcontainer',
				fieldLabel: 'Producto',
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					hideLabel: true
				},
				items: [{
					xtype:'textfield',
					name: 'tbCodProducto',
					width: 150,
					vtype: 'cstring'
				}, {
					width: 10
				}, {
					xtype:'textfield',
					name: 'tbDescProducto',
					width: 200
				},{
					width: 10
				}, {
					iconCls: 'btnBuscar',
					name: 'btnBuscarProducto',
					xtype: 'button'
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
					xtype:'textfield',
					width: 150,
					name: 'tbCantidad'
				}, {
					width: 10
				}, {
					xtype: 'displayfield',
					value: 'UM:'
				}, {
					width: 10
				}, {
					xtype:'textfield',
					name: 'tbCodUM',
					width: 50
				}, {
					width: 10
				}, {
					iconCls: 'btnBuscar',
					name: 'btnBuscarUM',
					xtype: 'button'
				}]
			}]
		}]
	}, {
		xtype: 'panel',
		layout: {
			type: 'hbox',
			align: 'stretch',
			pack: 'top'
		},
		items: [{
			xtype	: 'panel',
			height 	: 10
		}, {
			xtype: 'fieldset',
			title: 'Origen',
			width: 430,
			collapsible: false,
			layout: {
				type: 'form'
			},
			items: [{
				xtype: 'fieldcontainer',
				fieldLabel: 'Contenedor',
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					hideLabel: true
				},
				items: [{
					xtype:'textfield',
					name: 'tbContenedorOrigen',
					disabled: true,
					width: 150,
					vtype: 'cstring'
				}, {
					width: 10
				}, {
					name: 'btnImprimirContOrigen',
					disabled: true,
					text: 'Imp',
					xtype: 'button'
				}]
			}, {
				height: 20
			}, {
				xtype: 'fieldcontainer',
				fieldLabel: 'Ubicacion',
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					hideLabel: true
				},
				items: [{
					xtype:'textfield',
					width: 150,
					name: 'tbUbicacionOrigen',
					disabled: true,
					vtype: 'cstring'
				}, {
					width: 10
				}, {
					name: 'btnBuscarUbicacionOrigen',
					disabled: true,
					text: 'Buscar',
					xtype: 'button'
				}]
			}, {
				xtype: 'fieldcontainer',
				fieldLabel: 'Area',
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					hideLabel: true
				},
				items: [{
					xtype:'textfield',
					name: 'tbAreaOrigen',
					disabled: true,
					readOnly: true,
					width: 100
				}]
			}, {
				xtype: 'fieldcontainer',
				fieldLabel: 'Zona',
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					hideLabel: true
				},
				items: [{
					xtype:'textfield',
					name: 'tbZonaOrigen',
					disabled: true,
					readOnly: true,
					width: 100
				}]
			}, {
				xtype: 'fieldcontainer',
				fieldLabel: 'Detalle',
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					hideLabel: true
				},
				items: [{
					xtype:'textfield',
					name: 'tbDetalleOrigen',
					disabled: true,
					readOnly: true,
					width: 100
				}, {
					width: 10
				}, {
					xtype: 'button',
					text: 'Ver Detalles',
					disabled:true,
					name: 'btnBuscarDetalleOrigen'
				}]
			}]
		}, {
			width: 10
		}, {
			xtype: 'fieldset',
			title: 'Destino',
			width: 430,
			collapsible: false,
			layout: {
				type: 'form'
			},
			items: [{
				xtype: 'checkbox',
				fieldLabel: 'Mismo Contenedor',
				disabled: true,
				name: 'ckMismoContenedor'
			}, {
				xtype: 'fieldcontainer',
				fieldLabel: 'Contenedor',
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					hideLabel: true
				},
				items: [{
					xtype:'textfield',
					width: 150,
					name: 'tbContenedorDestino',
					disabled: true,
					vtype: 'cstring'
				}, {
					width: 10
				}, {
					xtype: 'button',
					name: 'btnCrearContenedorDestino',
					disabled: true,
					text: 'Crear'
				}, {
					width: 10
				}, {
					name: 'btnImprimirContDestino',
					disabled: true,
					text: 'Imp',
					xtype: 'button'
				}]
			}, {
				height: 20
			}, {
				xtype: 'fieldcontainer',
				fieldLabel: 'Ubicacion',
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					hideLabel: true
				},
				items: [{
					xtype:'textfield',
					width: 150,
					name: 'tbUbicacionDestino',
					disabled: true,
					vtype: 'cstring'
				}, {
					width: 10
				}, {
					name: 'btnBuscarUbicacionDestino',
					disabled: true,
					text: 'Buscar',
					xtype: 'button'
				}]
			}, {
				xtype: 'fieldcontainer',
				fieldLabel: 'Area',
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					hideLabel: true
				},
				items: [{
					xtype:'textfield',
					name: 'tbAreaDestino',
					disabled: true,
					readOnly: true,
					width: 100
				}]
			}, {
				xtype: 'fieldcontainer',
				fieldLabel: 'Zona',
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					hideLabel: true
				},
				items: [{
					xtype:'textfield',
					name: 'tbZonaDestino',
					disabled: true,
					readOnly: true,
					width: 100
				}]
			}, {
				xtype: 'checkboxgroup',
				fieldLabel: 'Detalle',
				columns: 1,
				vertical: true,
				items: [{
					boxLabel: 'Crear nuevo detalle',
					disabled: true,
					name: 'ckCrearDetalle'
				}]
			}, {
				xtype: 'fieldcontainer',
				fieldLabel: 'Codigo',
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					hideLabel: true
				},
				items: [{
					xtype:'textfield',
					name: 'tbDetalleDestino',
					disabled: true,
					readOnly:true,
					width: 100
				}, {
					width: 10
				}, {
					xtype: 'button',
					text: 'Ver Detalles',
					disabled: true,
					name: 'btnBuscarDetalleDestino'
				}]
			}, {
				height: 10
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
