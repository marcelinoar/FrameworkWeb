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

Ext.define ('Sistema.view.Produccion.ProgramaDeTrabajo.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'prod-prg-ListadoController',
    alias			: 'widget.prod-prg-Listado',
	requires: [
		'Sistema.view.Produccion.ProgramaDeTrabajo.ListadoGrillaStore'
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
		text: '',
		name: 'btnNuevo',
		hidden:true,
		iconCls: 'btnNuevo',
		tooltip: ''
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
		collapsed: false,
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
					fieldLabel: 'Maquina',
					msgTarget : 'side',
					layout: 'hbox',
					defaults: {
						hideLabel: true
					},
					items: [{
						xtype: 'textfield',
						name: 'tbCodMaquina',
						width: 100,
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
					}]
				}]
			}, {
				width:10
			}, {
				xtype: 'form',
				anchor:'50%',
				items: [{
					xtype: 'fieldcontainer',
					fieldLabel: 'Fecha',
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
						xtype: 'datefield',
						name: 'tbFechaDesde',
						format: 'd/m/Y',
						value: new Date()
					}, {
						width: 10
					}, {
						xtype: 'displayfield',
						value: 'Hasta:'
					}, {
						width: 10
					}, {
						xtype: 'datefield',
						name: 'tbFechaHasta',
						format: 'd/m/Y',
						value: new Date()
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
		xtype 	: 'prod-prg-ListadoGrilla'
	}]
});