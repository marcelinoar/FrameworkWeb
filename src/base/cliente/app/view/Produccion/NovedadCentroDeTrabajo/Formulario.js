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

Ext.define('Sistema.view.Produccion.NovedadCentroDeTrabajo.Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget.prod-novct-Formulario',
    controller: 'prod-novct-FormularioController',
	requires: [
		'Sistema.view.Produccion.model.NovedadCentroDeTrabajo',
		'Sistema.view.Produccion.store.StoreTipoNovedadCentroDeTrabajo'
	],
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
			// --- comienza cuadro registro
			xtype: 'fieldset',
			title: 'Informacion del Registro',
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
				fieldLabel: 'Nro',
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					hideLabel: true
				},
				items: [{
					xtype: 'textfield',
					name: 'tbNroNovedad',
					readOnly: true,
					width: 150
				}, {
					width: 10
				}, {
					xtype: 'displayfield',
					value: 'Fecha:'
				}, {
					width: 10
				}, {
					xtype: 'textfield',
					name: 'tbFecha',
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
			}]
			// --- Termina cuadro registro
		}, {
			// --- comienza cuadro datos
			xtype: 'fieldset',
			title: 'Datos de Novedad',
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
				fieldLabel: 'Fecha',
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					hideLabel: true
				},
				items: [{
					xtype: 'datefield',
					name: 'tbFechaCreacion',
					format: 'd/m/Y'
				}, {
					width: 10
				}, {
					xtype: 'displayfield',
					value: 'Hora:'
				}, {
					width: 10
				}, {
				   name : 'nfHoras',
				   xtype: 'numberfield',
				   width: 95,
				   allowBlank: false
				}, {
					width: 10
				}, {
					xtype: 'displayfield',
					value: 'Minutos:'
				}, {
					width: 10
				}, {
				   name : 'nfMinutos',
				   xtype: 'numberfield',
				   width: 95,
				   allowBlank: false
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
					xtype           : 'combo',
					name            : 'cbTipoNovedad',
					queryMode       : 'local',
					multiSelect     : false,
					forceSelection	: true,
					width           : 250,
					editable        : true,
					allowBlank      : false,
					typeAhead       : true,
					valueField      : 'id',
					displayField    : 'nombre'
				}]
			}, {
				xtype: 'fieldcontainer',
				fieldLabel: 'Maquina',
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					hideLabel: true
				},
				items: [{
					xtype: 'textfield',
					name: 'tbCodMaquina',
					width: 150,
					vtype: 'cstring'
				}, {
					width: 10
				}, {
					xtype: 'textfield',
					name: 'tbDescMaquina',
					width: 215,
					readOnly: true,
					vtype: 'sstring'
				}, {
					width: 10
				}, {
					iconCls: 'btnBuscar',
					name: 'btnBuscarMaquina',
					xtype: 'button'
				}, {
					width: 10
				}, {
					xtype: 'button',
					name: 'btnVerMaquina',
					text: 'Ver'
				}]
			}, {
				xtype: 'textareafield',
				name: 'tbComentarios',
				fieldLabel: 'Comentarios',
				vtype: 'sstring'
			}, {
				height: 10
			}]
		}]	// --- Termina cuadro de datos
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
