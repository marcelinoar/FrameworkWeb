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

Ext.define ('Sistema.view.Produccion.OrdenDeTrabajo.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'prod-ot-ListadoController',
    alias			: 'widget.prod-ot-Listado',
    requires: [
    	'Sistema.view.Produccion.OrdenDeTrabajo.ListadoGrillaStore'
    ],
	closable		: false,
	layout			: {
		type: 'vbox',
		align : 'stretch',
		pack  : 'start'
	},

	bbar:[{
		xtype: 'tbfill'
	}, {
		xtype: 'button',
		name: 'btnAceptar',
		text: 'Aceptar',
		iconCls: 'btnAceptar'
	}, {
		xtype: 'button',
		name: 'btnCancelar',
		text: 'Cancelar',
		iconCls: 'btnCancelar'
	}, {
		xtype: 'tbfill'
	}],

	tbar: 	[{
		xtype: 'button',
		text: 'Nueva Orden de Trabajo',
		name: 'btnNuevo',
		iconCls: 'btnNuevo',
		tooltip: 'Crear una nueva Orden de Trabajo'
	}, {
		xtype: 'tbfill'
	}, {
		xtype: 'button',
		text: 'Exportar Datos',
		name: 'btnExportar',
		menu: [{
			text: 'Exportar a Pdf',
			handler: 'onGenerarListadoPdf',
			name: 'exportarPdf'
		}, {
			text: 'Exportar a Excel',
			handler: 'onGenerarListadoExcel',
			name: 'exportarExcel'
		}]
	}],

	items: [{
		xtype	: 'panel',
		height 	: 10
	}, {
		xtype: 'fieldset',
		title: 'Filtrar Resultados',
		name: 'FilterFieldSet',
		collapsible: true,
		collapsed: true,
		defaults: {
			anchor: '30%',
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
					fieldLabel: 'Codigo',
					msgTarget : 'side',
					layout: 'hbox',
					defaults: {
						hideLabel: true
					},
					items: [{
						xtype: 'textfield',
						name: 'tbCodigo',
						allowBlank: true,
						vtype: 'numerico'
					}, {
						width: 10
					}, {
						xtype: 'displayfield',
						value: 'Estado:'
					}, {
						width: 10
					}, {
						xtype			: 'combo',
						name			: 'cbEstadoId',
						queryMode		: 'local',
						width			: 140,
						editable		: true,
						forceSelection	: true,
						allowBlank		: true,
						typeAhead		: true,
						valueField		: 'id',
						displayField	: 'nombre'
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
						vtype: 'cstring'
					}, {
						width: 10
					}, {
						xtype: 'textfield',
						name: 'tbDescCentroDeTrabajo',
						width: 215,
						readOnly: true,
						vtype: 'sstring'
					}, {
						width: 10
					}, {
						iconCls: 'btnBuscar',
						name: 'btnBuscarCentroDeTrabajo',
						xtype: 'button'
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
					}]
				}, {
					xtype: 'fieldcontainer',
					fieldLabel: 'Lote',
					msgTarget : 'side',
					layout: 'hbox',
					defaults: {
						hideLabel: true
					},
					items: [{
						xtype: 'textfield',
						name: 'tbCodLote',
						width: 100,
						vtype: 'cstring'
					}, {
						width: 10
					}, {
						iconCls: 'btnBuscar',
						name: 'btnBuscarLote',
						xtype: 'button'
					}]
				}]
			}, {
				width:10
			}, {
				xtype: 'form',
				anchor:'50%',
				items: [{
					xtype: 'fieldcontainer',
					fieldLabel: 'Comentarios',
					msgTarget : 'side',
					layout: 'hbox',
					defaults: {
						hideLabel: true
					},
					items: [{
						xtype			: 'combo',
						name			: 'cbComentarios',
						queryMode		: 'local',
						width			: 100,
						editable		: true,
						forceSelection	: true,
						allowBlank		: true,
						typeAhead		: true,
						valueField		: 'tipo',
						displayField	: 'nombre'
					}, {
						width: 10
					}, {
						xtype: 'textfield',
						name: 'tbComentarios',
						allowBlank: true,
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
					}, {
						xtype: 'displayfield',
						value: 'Desde:'
					}, {
						width: 10
					}, {
						xtype: 'textfield',
						name: 'tbCantidadDesde',
						allowBlank: true,
						width:70,
						vtype: 'numerico'
					}, {
						width: 10
					}, {
						xtype: 'displayfield',
						value: 'Hasta:'
					}, {
						width: 10
					}, {
						xtype: 'textfield',
						name: 'tbCantidadHasta',
						width:70,
						allowBlank: true,
						vtype: 'numerico'
					}]
				}, {
					xtype: 'fieldcontainer',
					fieldLabel: 'P. Venta',
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
					}]
				}, {
					xtype: 'fieldcontainer',
					fieldLabel: 'UM',
					msgTarget : 'side',
					layout: 'hbox',
					defaults: {
						hideLabel: true
					},
					items: [{
						xtype: 'textfield',
						name: 'tbCodUM',
						width: 100,
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
				}]
			}]
		}, {
			xtype: 'panel',
			anchor:'100%',
			layout: {
				type: 'hbox'
			},
			items: [{
				xtype: 'button',
				text: 'Limpiar Filtros',
				name: 'btnLimpiarFiltros',
				tooltip: 'Limpiar el valor de los filtros'
			}, {
				width: 20
			}, {
				xtype: 'button',
				text: 'Buscar',
				name: 'btnBuscar',
				tooltip: 'Ejecutar la consulta'
			}]
		}, {
			height: 10
		}]
	}, {
		xtype	: 'panel',
		height 	: 10
	}, {
		flex	: 1,
		xtype 	: 'prod-ot-ListadoGrilla'
	}]
});