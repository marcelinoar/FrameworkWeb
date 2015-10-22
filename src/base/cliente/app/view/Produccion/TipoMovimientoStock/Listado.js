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

Ext.define ('Sistema.view.Produccion.TipoMovimientoStock.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'prod-tmov-ListadoController',
    alias			: 'widget.prod-tmov-Listado',
	requires:[
		'Sistema.view.Produccion.TipoMovimientoStock.ListadoGrillaStore'
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
		text: 'Crear Tipo Movimiento de Stock',
		name: 'btnNuevo',
		iconCls: 'btnNuevo'
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
						xtype			: 'combo',
						name			: 'cbCodigo',
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
						name: 'tbCodigo',
						allowBlank: true,
						vtype: 'sstring'
					}]
				}, {
					xtype: 'fieldcontainer',
					fieldLabel: 'Descripcion',
					msgTarget : 'side',
					layout: 'hbox',
					defaults: {
						hideLabel: true
					},
					items: [{
						xtype			: 'combo',
						name			: 'cbDescripcion',
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
						name: 'tbDescripcion',
						allowBlank: true,
						vtype: 'sstring'
					}]
				}, {
					xtype: 'checkboxgroup',
					fieldLabel: 'Permite',
					width:500,
					columns: 3,
					vertical: true,
					items: [{
						boxLabel: 'Origen Nulo',
						name: 'ckOrigenNull'
					}, {
						boxLabel: 'Destino Nulo',
						name: 'ckDestinoNull'
					}]
				}]
			}, {
				width:10
			}, {
				xtype: 'form',
				anchor:'50%',
				items: [{
					xtype: 'checkboxgroup',
					fieldLabel: '',
					width:500,
					columns: 3,
					vertical: true,
					items: [{
						boxLabel: 'Lote de Fabricacion',
						name: 'ckLoteFabricacion'
					}, {
						boxLabel: 'Lote de Compras',
						name: 'ckLoteCompras'
					}, {
						boxLabel: 'Orden de Trabajo',
						name: 'ckOrdenDeTrabajo'
					}]
				}, {
					xtype: 'checkboxgroup',
					fieldLabel: '',
					width:500,
					columns: 3,
					vertical: true,
					items: [{
						boxLabel: 'Formula de Fabricacion',
						name: 'ckFormulaDeFabricacion'
					}, {
						boxLabel: 'Pedido de Ventas',
						name: 'ckPedidoDeVentas'
					}, {
						boxLabel: 'Orden de Compra',
						name: 'ckOrdenDeCompra'
					}]
				}]
			}]
		}, {
			height:10
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
		xtype 	: 'prod-tmov-ListadoGrilla'
	}]
});