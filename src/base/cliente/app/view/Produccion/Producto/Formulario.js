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

Ext.define('Sistema.view.Produccion.Producto.Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget.prod-producto-Formulario',
    controller: 'prod-producto-FormularioController',
	closable: false,
	bodyPadding: 10,

	layout: {
		type: 'vbox',
		align: 'stretch',
		pack: 'top'
	},

	items: [{
		xtype: 'panel',
		layout: {
			type: 'hbox',
			align: 'stretch',
			pack: 'top'
		},
		items: [{
			xtype: 'form',
			width:500,
			layout: {
				type: 'form',
				align: 'stretch',
				pack: 'top'
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
					width: 150,
					fieldLabel: 'Codigo',
					allowBlank: false,
					vtype: 'cstring'
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
				fieldLabel: 'Tipo',
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					hideLabel: true
				},
				items: [{
					xtype			: 'combo',
					fieldLabel		: 'Tipo',
					name			: 'cbTipoDeProductoId',
					queryMode		: 'local',
					multiSelect		: false,
					width			: 140,
					editable		: true,
					forceSelection	: true,
					allowBlank		: false,
					typeAhead		: true,
					valueField		: 'tipoDeProductoId',
					displayField	: 'nombre',
					store			: Ext.create ('Sistema.view.Produccion.store.StoreTipoDeProducto', {autoLoad: false})
				}, {
					width: 5
				}, {
					xtype: 'displayfield',
					value: 'Agr. Nivel 1:'
				}, {
					width: 5
				}, {
					xtype			: 'combo',
					name			: 'cbAgrupadorProductoPrimarioId',
					queryMode		: 'local',
					editable		: true,
					width			: 140,
					forceSelection	: true,
					typeAhead		: true,
					valueField		: 'agrupadorProductoPrimarioId',
					displayField	: 'nombre',
					store			: Ext.create ('Sistema.view.Produccion.store.StoreAgrupadorProductoPrimario', {autoLoad: false})
				}]
			}, {
				xtype: 'fieldcontainer',
				fieldLabel: 'Agr. Nivel 2',
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					hideLabel: true
				},
				items: [{
					xtype			: 'combo',
					name			: 'cbAgrupadorProductoSecundarioId',
					queryMode		: 'local',
					editable		: true,
					width			: 140,
					forceSelection	: true,
					typeAhead		: true,
					valueField		: 'agrupadorProductoSecundarioId',
					displayField	: 'nombre',
					store			: Ext.create ('Sistema.view.Produccion.store.StoreAgrupadorProductoSecundario', {autoLoad: false})
				}, {
					width: 5
				}, {
					xtype: 'displayfield',
					value: 'Agr. Nivel 3:'
				}, {
					width: 5
				}, {
					xtype			: 'combo',
					name			: 'cbAgrupadorProductoTerciarioId',
					queryMode		: 'local',
					editable		: true,
					width			: 140,
					forceSelection	: true,
					typeAhead		: true,
					valueField		: 'agrupadorProductoTerciarioId',
					displayField	: 'nombre',
					store			: Ext.create ('Sistema.view.Produccion.store.StoreAgrupadorProductoTerciario', {autoLoad: false})
				}]
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
				vtype: 'sstring'
			}]
		}, {
			width: 10
		}, {
			xtype: 'panel',
			width: 485,
			layout: {
				type: 'vbox',
				align: 'stretch',
				pack: 'top'
			},
			items: [{
				xtype: 'tabpanel',
				name: 'formTabPanel',
				items:[{
					title: 'UM Alternativas',
					disabled: false,
					items: [{
						xtype: 'prod-producto-ua-Listado',
						height: 220
					}]
				}, {
					title: 'Archivos Adjuntos',
					disabled: false,
					items: [{
						html: 'listado de archivos adjuntos',
						height: 220
					}]
				}, {
					title: 'Atributos',
					disabled: false,
					items: [{
						xtype: 'prod-producto-att-Listado',
						height: 220
					}]
				}, {
					title: 'Imagen',
					disabled: false,
					items: [{
						xtype: 'panel',
						layout: {
							type: 'hbox',
							align: 'stretch',
							pack: 'top'
						},
						items: [{
							xtype: 'image',
							name: 'imgImagenProducto',
							src:'http://192.168.56.101/img/1296-701-071.jpg',
							width: 200,
							height: 220
						}]
					}]
				}]
			}]
		}]
	}, {
		xtype: 'panel',
		height: 10
	}, {
		xtype: 'tabpanel',
		name: 'formTabPanel',
		width: '100%',
		items:[{
			title: 'Stock',
			closable: false,
			name:'panelStock',
			layout:'fit',
			items:[{
				xtype:'prod-producto-pa-Listado'
			}]
		}, {
			title: 'Fabricacion',
			disabled: false,
			name:'panelFabricacion',
			closable: false,
			items: [{
				xtype: 'tabpanel',
				reference: 'tabpanel',
				border: false,
				defaults: {
					bodyPadding: 10,
					autoScroll: true,
					closable: true,
					border: false
				},
				bind: {
					tabPosition: 'left',
					tabRotation: 'default'
				},
				items: [{
					xtype: 'panel',
					title: 'Gral',
					closable: false,
					layout: {
						type: 'hbox',
						align: 'stretch',
						pack: 'top'
					},
					height: 270,
					items: [{
						xtype: 'form',
						layout: {
							type: 'vbox',
							align: 'stretch',
							pack: 'top'
						},
						items: [{
							xtype: 'fieldset',
							title: 'UM Fabricacion',
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
									name: 'tbCodUMFabricacion',
									width: 100,
									vtype: 'cstring'
								}, {
									width: 10
								}, {
									xtype: 'textfield',
									name: 'tbDescUMFabricacion',
									width: 200,
									readOnly: true,
									vtype: 'sstring'
								}, {
									width: 10
								}, {
									iconCls: 'btnBuscar',
									name: 'btnBuscarUMFabricacion',
									xtype: 'button'
								}]
							}]
						}, {
							xtype: 'fieldset',
							title: 'Almacen Destino',
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
									name: 'tbCodAlmacenDestino',
									width: 100,
									vtype: 'cstring'
								}, {
									width: 10
								}, {
									xtype: 'textfield',
									name: 'tbDescAlmacenDestino',
									width: 200,
									readOnly: true,
									vtype: 'sstring'
								}, {
									width: 10
								}, {
									iconCls: 'btnBuscar',
									name: 'btnBuscarAlmacenDestino',
									xtype: 'button'
								}]
							}]
						}, {
							xtype: 'fieldset',
							title: 'Centro de Trabajo',
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
									name: 'tbCodCentroDeTrabajo',
									width: 100,
									vtype: 'cstring'
								}, {
									width: 10
								}, {
									xtype: 'textfield',
									name: 'tbDescCentroDeTrabajo',
									width: 200,
									readOnly: true,
									vtype: 'sstring'
								}, {
									width: 10
								}, {
									iconCls: 'btnBuscar',
									name: 'btnBuscarCentroDeTrabajo',
									xtype: 'button'
								}]
							}]
						}, {
							xtype: 'fieldset',
							title: 'Producto Secundario',
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
									name: 'tbCodProductoSecundario',
									width: 100,
									vtype: 'cstring'
								}, {
									width: 10
								}, {
									xtype: 'textfield',
									name: 'tbDescProductoSecundario',
									width: 200,
									readOnly: true,
									vtype: 'sstring'
								}, {
									width: 10
								}, {
									iconCls: 'btnBuscar',
									name: 'btnBuscarProductoSecundario',
									xtype: 'button'
								}]
							}]
						}]
					}, {
						width: 10
					}, {
						xtype: 'fieldset',
						title: 'Formulas de Produccion',
						name: 'FilterFieldSet',
						width: 580,
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
							disabled: false,
							items: [{
								xtype: 'prod-producto-frm-Listado'
							}]
						}]
					}]
				}, {
					title: 'Hoja de Ruta',
					height: 270,
					closable: false,
					disabled: false,
					items: [{
						xtype: 'prod-producto-ophr-Listado'
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
