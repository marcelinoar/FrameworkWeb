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

Ext.define('Sistema.view.Produccion.LoteDeFabricacion.Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget.prod-lote-Formulario',
    controller: 'prod-lote-FormularioController',
	closable: false,
	autoScroll:true,
	bodyPadding: 10,
	fieldDefaults:{
		labelAlign:'left',
		labelWidth:130
	},
	layout: {
		type: 'vbox',
		align: 'stretch',
		pack: 'top'
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
			height: 185,
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
				fieldLabel: 'Codigo',
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					hideLabel: true
				},
				items: [{
					xtype: 'textfield',
					name: 'tbCodigo',
					readOnly:true
				}, {
					width: 10
				}, {
					xtype: 'displayfield',
					value: 'Fecha de Creacion:'
				}, {
					width: 10
				}, {
					xtype: 'textfield',
					name: 'tbFechaCreacion',
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
					width: 120,
					allowBlank: false,
					vtype: 'cstring'
				}, {
					width: 10
				}, {
					xtype: 'textfield',
					name: 'tbDescCentroDeTrabajo',
					width: 200,
					readOnly:true
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
				}]
			}, {
				xtype: 'fieldcontainer',
				fieldLabel: 'Producto Secundario',
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					hideLabel: true
				},
				items: [{
					xtype: 'textfield',
					name: 'tbCodProducto',
					allowBlank: false,
					width: 120,
					vtype: 'cstring'
				}, {
					width: 10
				}, {
					xtype: 'textfield',
					name: 'tbDescProducto',
					width: 200,
					readOnly:true
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
				xtype: 'textareafield',
				name: 'tbComentario',
				fieldLabel: 'Comentarios',
				vtype: 'sstring'
			}]
			// -- Termina el cuadro general
		}, {
			height:10
		}, {
			// --- comienza cuadro de OTs
			xtype: 'fieldset',
			title: 'Ordenes de Trabajo',
			name: 'FilterFieldSet',
			collapsible: false,
			height:250,
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
				xtype: 'prod-lote-ot-Listado'
			}]
			// -- Termina el cuadro de OTs
		}, {
			height: 10
		}, {
			// --- comienza cuadro de materiales
			xtype: 'fieldset',
			title: 'Formula de Produccion',
			name: 'FilterFieldSet',
			collapsible: false,
			height:250,
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
				xtype: 'prod-lote-mat-Listado'
			}]
			// -- Termina el cuadro de materiales
		}, {
			height: 10
		}, {
			// --- comienza cuadro de Movimientos
			xtype: 'fieldset',
			title: 'Movimientos de Reserva de Materia Prima',
			name: 'FilterFieldSet',
			collapsible: false,
			height:250,
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
				//xtype: 'prod-lote-ot-Listado'
			}]
			// -- Termina el cuadro de movimientos
		}, {
			height: 10
		}, {
			// --- comienza cuadro de Vales de FAbricacion
			xtype: 'fieldset',
			title: 'Vales de Fabricacion del Lote',
			name: 'FilterFieldSet',
			collapsible: false,
			height:200,
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
				xtype: 'prod-lote-vf-Listado'
			}]
			// -- Termina el cuadro de Vales de fabricacion
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
