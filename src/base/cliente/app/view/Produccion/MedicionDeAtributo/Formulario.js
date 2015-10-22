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

Ext.define('Sistema.view.Produccion.MedicionDeAtributo.Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget.prod-medat-Formulario',
    controller: 'prod-medat-FormularioController',
	requires: [
		'Sistema.view.Produccion.model.MedicionDeAtributo',
		'Sistema.view.Produccion.MedicionDeAtributo.StoreAtributo'
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
			// --- comienza cuadro registro
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
				fieldLabel: 'Nro. de Registro',
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					hideLabel: true
				},
				items: [{
					xtype: 'textfield',
					name: 'tbNroDeRegistro',
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
				height:10
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
					name: 'tbCodOrdenDeTrabajo',
					width: 150,
					vtype: 'cstring'
				}, {
					width: 10
				}, {
					iconCls: 'btnBuscar',
					name: 'btnBuscarOrdenDeTrabajo',
					xtype: 'button'
				}, {
					width: 10
				}, {
					xtype: 'button',
					name: 'btnVerOrdenDeTrabajo',
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
					name: 'tbCodProducto',
					readOnly:true,
					width: 150,
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
					xtype: 'button',
					name: 'btnVerProducto',
					text: 'Ver'
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
					width: 100,
					readOnly:true,
					vtype: 'cstring'
				}, {
					width: 10
				}, {
					xtype: 'displayfield',
					value: 'UM:'
				}, {
					width: 10
				}, {
					xtype: 'textfield',
					name: 'tbCodUnidadOT',
					readOnly:true,
					width: 60,
					vtype: 'cstring'
				}, {
					width: 10
				}, {
					xtype: 'textfield',
					name: 'tbDesUnidadOT',
					width: 215,
					readOnly: true,
					vtype: 'sstring'
				}, {
					width: 10
				}, {
					xtype: 'button',
					name: 'btnVerUnidadOT',
					text: 'Ver'
				}]
			}]

			// --- Termina cuadro registro
			}, {
				// --- comienza cuadro Atributos
				xtype: 'fieldset',
				title: 'Atributos',
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
					fieldLabel: 'Atributo',
					msgTarget : 'side',
					layout: 'hbox',
					defaults: {
						hideLabel: true
					},
					items: [{
						xtype           : 'combo',
						name            : 'cbAtributoId',
						queryMode       : 'local',
						multiSelect     : false,
						forceSelection	: true,
						width           : 250,
						editable        : true,
						allowBlank      : false,
						typeAhead       : true,
						valueField      : 'atributoProductoId',
						displayField    : 'nombre'
					}, {
						width: 10
					}, {
						xtype: 'displayfield',
						value: 'UM:'
					}, {
						width: 10
					}, {
						xtype: 'textfield',
						name: 'tbCodUnidadAtributo',
						readOnly: true,
						width: 60,
						vtype: 'cstring'
					}, {
						width: 10
					}, {
						xtype: 'textfield',
						name: 'tbDescUnidadAtributo',
						width: 200,
						readOnly: true,
						vtype: 'sstring'
					}, {
						width: 10
					}, {
						xtype: 'button',
						name: 'btnVerUnidadAtributo',
						text: 'Ver'
					}]
				}, {
					xtype: 'fieldcontainer',
					fieldLabel: 'Valor Teorico',
					msgTarget : 'side',
					layout: 'hbox',
					defaults: {
						hideLabel: true
					},
					items: [{
						xtype: 'textfield',
						name: 'tbValorAtributoTeorico',
						fieldLabel: 'Valor Teorico',
						readOnly: true,
						width: 100,
						vtype: 'cstring'
					}, {
						width: 10
					}, {
						xtype: 'textfield',
						name: 'tbCodUnidadValorTeorico',
						readOnly: true,
						width: 60,
						vtype: 'cstring'
					}]
				}, {
					xtype: 'fieldcontainer',
					fieldLabel: 'Valor Medido',
					msgTarget : 'side',
					layout: 'hbox',
					defaults: {
						hideLabel: true
					},
					items: [{
						xtype: 'textfield',
						name: 'tbValorAtributoMedido',
						readOnly: false,
						width: 100,
						vtype: 'cstring'
					}, {
						width: 10
					}, {
						xtype: 'textfield',
						name: 'tbCodUnidadValorMedido',
						readOnly: true,
						width: 60,
						vtype: 'cstring'
					}]
				}, {
					xtype: 'textareafield',
					name: 'tbComentarios',
					fieldLabel: 'Comentarios',
					vtype: 'sstring'
				}, {
					height:10
				}]
			}]
	}],
	buttons: [{
		text: 'Guardar Registro',
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
