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

Ext.define ('Sistema.view.Produccion.AgrupadorProductoTerciario.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'prod-agr3-ListadoController',
    alias			: 'widget.prod-agr3-Listado',
	requires: [
		'Sistema.view.Produccion.AgrupadorProductoTerciario.ListadoGrillaStore'
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
		text: 'Crear Nuevo Tipo',
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
					xtype: 'textfield',
					name: 'tbCodigo',
					fieldLabel: 'Codigo',
					allowBlank: true,
					vtype: 'numerico'
				}, {
					xtype: 'fieldcontainer',
					fieldLabel: 'Nombre',
					msgTarget : 'side',
					layout: 'hbox',
					defaults: {
						hideLabel: true
					},
					items: [{
						xtype			: 'combo',
						name			: 'cbNombre',
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
						name: 'tbNombre',
						allowBlank: true,
						vtype: 'sstring'
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
		xtype 	: 'prod-agr3-ListadoGrilla'
	}]
});