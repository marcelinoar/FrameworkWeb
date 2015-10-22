/**************************************************************************************************
 * Archivo: Formulario.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *      -
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define('Sistema.view.Produccion.ValeDeFabricacion.Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget.prod-vfab-Formulario',
    controller: 'prod-vfab-FormularioController',
    requires:[
    	'Sistema.view.Produccion.ValeDeFabricacion.StoreTipoValeFabricacion',
    	'Sistema.view.Produccion.ValeDeFabricacion.StoreOperacion'
    ],
	closable: false,
	bodyPadding: 10,
	autoScroll:true,
	fieldDefaults:{
			labelAlign:'left',
			labelWidth:105
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
			title: 'General',
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
				fieldLabel: 'Nro. de Vale',
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					hideLabel: true
				},
				items: [{
					xtype: 'textfield',
					name: 'tbNroValeDeFabricacion',
					readOnly: true,
					width: 150
				}, {
					width: 10
				}, {
					xtype: 'displayfield',
					value: 'Fecha y Hora:'
				}, {
					width: 10
				}, {
					xtype: 'textfield',
					name: 'tbFechaYHoraCarga',
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
					name: 'tbUsuarioDeCarga',
					readOnly: true,
					width: 150
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
					width: 150,
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
				}, {
					width: 10
				}, {
					xtype: 'button',
					name: 'btnVerCentroDeTrabajo',
					text: 'Ver'
				}, {
					width: 10
				}, {
					xtype: 'displayfield',
					value: 'Tipo de Vale:'
				}, {
					width: 10
				}, {
					xtype                   : 'combo',
					disabled                : true,
					name                    : 'cbTipoValeFabricacion',
					queryMode               : 'local',
					multiSelect             : false,
					width                   : 250,
					editable                : true,
					forceSelection  : true,
					allowBlank              : false,
					typeAhead               : true,
					valueField              : 'id',
					displayField    : 'nombre'
				}]
			}]

			// --- Termina cuadro general
			// --- comienza cuadro Lote/ot
			}, {
				xtype: 'panel',
				layout: {
					type: 'hbox',
					align: 'stretch',
					pack: 'top'
				},
				width: '100%',
				items: [{
					// -- Comienza cuadro lote
					xtype: 'fieldset',
					title: 'Lote de Fabricacion',
					name: 'FilterFieldSet',
					collapsible: false,
					collapsed: false,
					width:'49%',
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
						fieldLabel: 'Lote',
						msgTarget : 'side',
						layout: 'hbox',
						defaults: {
							hideLabel: true
						},
						items: [{
							xtype: 'textfield',
							name: 'tbCodLoteDeFabricacion',
							disabled:true,
							width: 180,
							vtype: 'numerico'
						}, {
							width: 10
						}, {
							iconCls: 'btnBuscar',
							name: 'btnBuscarLoteDeFabricacion',
							disabled:true,
							xtype: 'button'
						}, {
							width: 10
						}, {
							xtype: 'button',
							disabled:true,
							name: 'btnVerLoteDeFabricacion',
							text: 'Ver'
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
							name: 'tbCodProductoLote',
							width: 100,
							readOnly: true,
							vtype: 'cstring'
						}, {
							width: 10
						}, {
							xtype: 'textfield',
							name: 'tbDescProductoLote',
							width: 185,
							readOnly: true,
							vtype: 'sstring'
						}, {
							width: 10
						}, {
							xtype: 'button',
							disabled:true,
							name: 'btnVerProductoLote',
							text: 'Ver'
						}]
					}]
				// -- termina cuadro lote
				}, {
					width: 10
				}, {
					// -- Comienza cuadro ot
					xtype: 'fieldset',
					title: 'Orden de Trabajo',
					name: 'FilterFieldSet',
					collapsible: false,
					collapsed: false,
					width:'49%',
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
						fieldLabel: 'Orden de Trabajo',
						msgTarget : 'side',
						layout: 'hbox',
						defaults: {
							hideLabel: true
						},
						items: [{
							xtype: 'textfield',
							name: 'tbCodOrdenDeTrabajo',
							disabled:true,
							width: 180,
							vtype: 'numerico'
						}, {
							width: 10
						}, {
							iconCls: 'btnBuscar',
							disabled:true,
							name: 'btnBuscarOrdenDeTrabajo',
							xtype: 'button'
						}, {
							width: 10
						}, {
							xtype: 'button',
							disabled:true,
							name: 'btnVerOrdenDeTrabajo',
							text: 'Ver'
						}]
					}, {
						height: 10
					}, {
						xtype: 'fieldcontainer',
						fieldLabel: 'Prod. Principal',
						msgTarget : 'side',
						layout: 'hbox',
						defaults: {
							hideLabel: true
						},
						items: [{
							xtype: 'textfield',
							name: 'tbCodProductoPrincipal',
							disabled:true,
							width: 100,
							readOnly: true,
							vtype: 'cstring'
						}, {
							width: 10
						}, {
							xtype: 'textfield',
							name: 'tbDescProductoPrincipal',
							disabled:true,
							width: 185,
							readOnly: true,
							vtype: 'sstring'
						}, {
							width: 10
						}, {
							xtype: 'button',
							disabled:true,
							name: 'btnVerProductoPrincipal',
							text: 'Ver'
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
							name: 'tbCodFormulaProdPrincipal',
							disabled:true,
							width: 100,
							readOnly: true,
							vtype: 'cstring'
						}, {
							width: 10
						}, {
							xtype: 'textfield',
							name: 'tbDescFormulaProdPrincipal',
							disabled:true,
							width: 185,
							readOnly: true,
							vtype: 'sstring'
						}, {
							width: 10
						}, {
							xtype: 'button',
							disabled:true,
							name: 'btnVerFormulaProdPrincipal',
							text: 'Ver'
						}]
					}, {
						height: 10
					}, {
						xtype: 'fieldcontainer',
						fieldLabel: 'Prod. Secundario',
						msgTarget : 'side',
						layout: 'hbox',
						defaults: {
							hideLabel: true
						},
						items: [{
							xtype: 'textfield',
							name: 'tbCodProductoSecundario',
							disabled:true,
							width: 100,
							readOnly: true,
							vtype: 'cstring'
						}, {
							width: 10
						}, {
							xtype: 'textfield',
							name: 'tbDescProductoSecundario',
							disabled:true,
							width: 185,
							readOnly: true,
							vtype: 'sstring'
						}, {
							width: 10
						}, {
							xtype: 'button',
							disabled:true,
							name: 'btnVerProductoSecundario',
							text: 'Ver'
						}]
					}, {
						height: 5
					}]
				// -- termina cuadro ot
				}]
			}, {
				// --- comienza cuadro Operario
				xtype: 'fieldset',
				title: 'Operario',
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
					fieldLabel: 'Nro. de Legajo',
					msgTarget : 'side',
					layout: 'hbox',
					defaults: {
						hideLabel: true
					},
					items: [{
						xtype: 'textfield',
						name: 'tbCodNroDeLegajo',
						width: 150,
						vtype: 'cstring'
					}, {
						width: 10
					}, {
						iconCls: 'btnBuscar',
						name: 'btnBuscarNroDeLegajo',
						xtype: 'button'
					}, {
						width: 10
					}, {
						xtype: 'button',
						name: 'btnVerNroDeLegajo',
						text: 'Ver'
					}, {
						width: 10
					}, {
						xtype: 'displayfield',
						value: 'Nombre:'
					}, {
						width: 10
					}, {
						xtype: 'textfield',
						name: 'tbNombreOperario',
						readOnly: true,
						width: 200,
						vtype: 'cstring'
					}, {
						width: 10
					}, {
						xtype: 'displayfield',
						value: 'Apellido:'
					}, {
						width: 10
					}, {
						xtype: 'textfield',
						name: 'tbApellidoOperario',
						width: 200,
						readOnly: true,
						vtype: 'sstring'
					}]
				}]

				// --- Termina cuadro Operario
			}, {
				// --- comienza cuadro Valores
				xtype: 'fieldset',
				title: 'Informacion',
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
					xtype                   : 'combo',
					disabled                : true,
					fieldLabel              : 'Operacion',
					name                    : 'cbOperacionId',
					queryMode               : 'local',
					multiSelect             : false,
					anchor                  : '30%',
					editable                : true,
					forceSelection  : true,
					allowBlank              : false,
					typeAhead               : true,
					valueField              : 'operacionId',
					displayField    : 'nombre'
				}, {
					xtype: 'fieldcontainer',
					fieldLabel: 'Cant. Producida',
					msgTarget : 'side',
					layout: 'hbox',
					defaults: {
						hideLabel: true
					},
					items: [{
						xtype: 'textfield',
						name: 'tbCantidadProducida',
						width: 100,
						disabled:true,
						vtype: 'cstring'
					}, {
						width: 20
					}, {
						xtype: 'displayfield',
						value: 'UM:'
					}, {
						width: 10
					}, {
						xtype: 'textfield',
						name: 'tbCodUMProducida',
						disabled:true,
						width: 100,
						vtype: 'cstring'
					}, {
						width: 10
					}, {
						xtype: 'textfield',
						name: 'tbDescUMProducida',
						width: 215,
						disabled:true,
						readOnly: true,
						vtype: 'sstring'
					}, {
						width: 10
					}, {
						iconCls: 'btnBuscar',
						disabled:true,
						name: 'btnBuscarUMProducida',
						xtype: 'button'
					}]
				}, {
					xtype: 'fieldcontainer',
					fieldLabel: 'Cant. Rechazada',
					msgTarget : 'side',
					layout: 'hbox',
					defaults: {
						hideLabel: true
					},
					items: [{
						xtype: 'textfield',
						name: 'tbCantidadRechazada',
						disabled:true,
						width: 100,
						vtype: 'cstring'
					}, {
						width: 20
					}, {
						xtype: 'displayfield',
						value: 'UM:'
					}, {
						width: 10
					}, {
						xtype: 'textfield',
						name: 'tbCodUMRechazada',
						disabled:true,
						width: 100,
						vtype: 'cstring'
					}, {
						width: 10
					}, {
						xtype: 'textfield',
						name: 'tbDescUMRechazada',
						disabled:true,
						width: 215,
						readOnly: true,
						vtype: 'sstring'
					}, {
						width: 10
					}, {
						iconCls: 'btnBuscar',
						disabled:true,
						name: 'btnBuscarUMRechazada',
						xtype: 'button'
					}]
				}, {
					xtype: 'fieldcontainer',
					fieldLabel: 'Cant. Recortes',
					msgTarget : 'side',
					layout: 'hbox',
					defaults: {
						hideLabel: true
					},
					items: [{
						xtype: 'textfield',
						name: 'tbCantidadDeRecortes',
						disabled:true,
						width: 100,
						vtype: 'cstring'
					}, {
						width: 20
					}, {
						xtype: 'displayfield',
						value: 'UM:'
					}, {
						width: 10
					}, {
						xtype: 'textfield',
						disabled:true,
						name: 'tbCodUMDeRecortes',
						width: 100,
						vtype: 'cstring'
					}, {
						width: 10
					}, {
						xtype: 'textfield',
						name: 'tbDescUMDeRecortes',
						disabled:true,
						width: 215,
						readOnly: true,
						vtype: 'sstring'
					}, {
						width: 10
					}, {
						iconCls: 'btnBuscar',
						disabled:true,
						name: 'btnBuscarUMDeRecortes',
						xtype: 'button'
					}]
				}, {
					xtype: 'textareafield',
					name: 'tbComentarios',
					fieldLabel: 'Comentarios',
					vtype: 'sstring'
				}, {
					height: 5
				}]

				// --- Termina cuadro valores
			}, {
				// --- comienza cuadro Pallet
				xtype: 'fieldset',
				title: 'Informacion de Pallet',
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
					height: 5
				}, {
					xtype: 'fieldcontainer',
					fieldLabel: 'Codigo de Pallet',
					msgTarget : 'side',
					layout: 'hbox',
					defaults: {
						hideLabel: true
					},
					items: [{
						xtype: 'textfield',
						name: 'tbCodigoDePallet',
						width: 250,
						vtype: 'cstring'
					}, {
						width: 10
					}, {
						xtype: 'button',
						name: 'btnGenerarCodigoDePallet',
						disabled:true,
						text: 'Generar Codigo de Pallet'
					}]
				}, {
					height: 5
				}]
				// --- Termina cuadro pallet
			}]
	}],
	buttons: [{
		text: 'Guardar Vale de Fabricacion',
		iconCls:'btnGuardar',
		name: 'btnGuardar'
	}, {
		text: 'Cerrar',
		name: 'btnCerrar',
		hidden:true
	}, {
		text: 'Borrar',
		hidden: true,
		iconCls:'btnBorrar',
		name: 'btnBorrar'
	}]
});
