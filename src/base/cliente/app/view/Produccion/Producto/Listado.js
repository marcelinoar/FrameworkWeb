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

Ext.define ('Sistema.view.Produccion.Producto.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'prod-producto-ListadoController',
    alias			: 'widget.prod-producto-Listado',
    requires: [
    	'Sistema.view.Produccion.Producto.ListadoGrillaStore'
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
		text: 'Crear Nuevo Producto',
		name: 'btnNuevo',
		iconCls: 'btnNuevo',
		tooltip: 'Crear un nuevo producto'
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
				type: 'vbox'
			},
			items: [{
				xtype: 'panel',
				anchor:'100%',
				layout: {
					type: 'hbox'
				},
				items: [{
					xtype: 'form',
					layout: {
						type: 'form'
					},
					defaults: {
						anchor: '50%'
					},
					items: [{
						xtype: 'fieldcontainer',
						fieldLabel: 'Tipo',
						msgTarget : 'side',
						layout: 'hbox',
						defaults: {
							hideLabel: true
						},
						items: [{
							xtype			: 'combo',
							name			: 'cbTipoDeProductoId',
							queryMode		: 'local',
							width			: 140,
							editable		: true,
							forceSelection	: true,
							allowBlank		: true,
							typeAhead		: true,
							valueField		: 'tipoDeProductoId',
							displayField	: 'nombre'
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
						fieldLabel: 'Valor de Atributo',
						msgTarget : 'side',
						layout: 'hbox',
						defaults: {
							hideLabel: true
						},
						items: [{
							xtype			: 'combo',
							name			: 'cbAtributoId',
							queryMode		: 'local',
							width			: 140,
							editable		: true,
							forceSelection	: true,
							allowBlank		: true,
							typeAhead		: true,
							valueField		: 'id',
							displayField	: 'nombre',
							store			: Ext.create ('Sistema.view.Produccion.store.StoreAtributoProducto', {autoLoad: false})
						}, {
							width: 10
						}, {
							xtype: 'displayfield',
							value: 'Desde:'
						}, {
							width: 10
						}, {
							xtype: 'textfield',
							name: 'tbAtributoDesde',
							width: 50,
							allowBlank: true,
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
							name: 'tbAtributoHasta',
							width: 50,
							allowBlank: true,
							vtype: 'numerico'
						}]
					}, {
						xtype: 'fieldcontainer',
						fieldLabel: 'Agrp. Primario',
						msgTarget : 'side',
						layout: 'hbox',
						defaults: {
							hideLabel: true
						},
						items: [{
							xtype			: 'combo',
							name			: 'cbAgrupadorProductoPrimarioId',
							queryMode		: 'local',
							width			: 140,
							editable		: true,
							forceSelection	: true,
							allowBlank		: true,
							typeAhead		: true,
							valueField		: 'agrupadorProductoPrimarioId',
							displayField	: 'nombre'
						}, {
							width: 10
						}, {
							xtype: 'displayfield',
							value: 'Agrp. Sec:'
						}, {
							width: 10
						}, {
							xtype			: 'combo',
							name			: 'cbAgrupadorProductoSecundarioId',
							queryMode		: 'local',
							width			: 140,
							editable		: true,
							forceSelection	: false,
							allowBlank		: true,
							typeAhead		: true,
							valueField		: 'agrupadorProductoSecundarioId',
							displayField	: 'nombre'
						}]
					}] // Fin de items
				}, {
					xtype: 'form',
					layout: {
						type: 'form'
					},
					defaults: {
						anchor: '50%'
					},
					items: [{
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
						xtype: 'fieldcontainer',
						fieldLabel: 'Linea de Produccion',
						msgTarget : 'side',
						layout: 'hbox',
						defaults: {
							hideLabel: true
						},
						items: [{
							xtype: 'textfield',
							name: 'tbCodLineaDeProduccion',
							width: 100,
							vtype: 'cstring'
						}, {
							width: 10
						}, {
							xtype: 'textfield',
							name: 'tbDescLineaDeProduccion',
							width: 215,
							readOnly: true,
							vtype: 'sstring'
						}, {
							width: 10
						}, {
							iconCls: 'btnBuscar',
							name: 'btnBuscarLineaDeProduccion',
							xtype: 'button'
						}]
					}, {
						xtype: 'fieldcontainer',
						fieldLabel: 'UM Stock',
						msgTarget : 'side',
						layout: 'hbox',
						defaults: {
							hideLabel: true
						},
						items: [{
							xtype: 'textfield',
							name: 'tbCodUMStock',
							width: 100,
							vtype: 'cstring'
						}, {
							width: 10
						}, {
							xtype: 'textfield',
							name: 'tbDescUMStock',
							width: 215,
							readOnly: true,
							vtype: 'sstring'
						}, {
							width: 10
						}, {
							iconCls: 'btnBuscar',
							name: 'btnBuscarUMStock',
							xtype: 'button'
						}]
					}, {
						xtype			: 'combo',
						name			: 'cbAgrupadorProductoTerciarioId',
						fieldLabel		: 'Agrp. Terciario',
						queryMode		: 'local',
						width			: 140,
						editable		: true,
						forceSelection	: true,
						allowBlank		: true,
						typeAhead		: true,
						valueField		: 'agrupadorProductoTerciarioId',
						displayField	: 'nombre'
					}]
				}]
			}, {
				height: 5
			}, {
				xtype : 'panel',
				anchor: '100%',
				layout: {
					type: 'hbox'
				},
				items :[{
					xtype: 'tbfill'
				}, {
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
		}]
	}, {
		xtype	: 'panel',
		height 	: 10
	}, {
		flex	: 1,
		xtype 	: 'prod-producto-ListadoGrilla'
	}]
});