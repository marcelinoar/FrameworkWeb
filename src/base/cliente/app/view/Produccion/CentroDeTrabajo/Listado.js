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

Ext.define ('Sistema.view.Produccion.CentroDeTrabajo.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'prod-ct-ListadoController',
    alias			: 'widget.prod-ct-Listado',
    requires: [
    	'Sistema.view.Produccion.CentroDeTrabajo.ListadoGrillaStore'
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
		text: 'Crear Centro de Trabajo',
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
				}, {
					xtype: 'fieldcontainer',
					fieldLabel: 'Planta',
					msgTarget : 'side',
					layout: 'hbox',
					defaults: {
						hideLabel: true
					},
					items: [{
						xtype: 'textfield',
						name: 'tbCodPlanta',
						width: 100,
						vtype: 'cstring'
					}, {
						width: 10
					}, {
						xtype: 'textfield',
						name: 'tbDescPlanta',
						width: 215,
						readOnly: true,
						vtype: 'sstring'
					}, {
						width: 10
					}, {
						iconCls: 'btnBuscar',
						name: 'btnBuscarPlanta',
						xtype: 'button'
					}]
				}, {
					xtype: 'fieldcontainer',
					fieldLabel: 'Almacen Asociado',
					msgTarget : 'side',
					layout: 'hbox',
					defaults: {
						hideLabel: true
					},
					items: [{
						xtype: 'textfield',
						name: 'tbCodAlmacen',
						width: 100,
						vtype: 'cstring'
					}, {
						width: 10
					}, {
						xtype: 'textfield',
						name: 'tbDescAlmacen',
						width: 215,
						readOnly: true,
						vtype: 'sstring'
					}, {
						width: 10
					}, {
						iconCls: 'btnBuscar',
						name: 'btnBuscarAlmacen',
						xtype: 'button'
					}]
				}]
			}, {
				width:10
			}, {
				xtype: 'form',
				anchor:'50%',
				fieldDefaults:{
					labelAlign:'left',
					labelWidth:130
				},
				items: [{
					xtype: 'fieldcontainer',
					fieldLabel: 'Contiene Operacion',
					msgTarget : 'side',
					layout: 'hbox',
					defaults: {
						hideLabel: true
					},
					items: [{
						xtype: 'textfield',
						name: 'tbCodOperacion',
						width: 100,
						vtype: 'cstring'
					}, {
						width: 10
					}, {
						xtype: 'textfield',
						name: 'tbDescOperacion',
						width: 215,
						readOnly: true,
						vtype: 'sstring'
					}, {
						width: 10
					}, {
						iconCls: 'btnBuscar',
						name: 'btnBuscarOperacion',
						xtype: 'button'
					}]
				}, {
					xtype: 'fieldcontainer',
					fieldLabel: 'Contiene Maquina',
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
				}, {
					xtype: 'checkboxgroup',
					fieldLabel: 'Caracteristicas',
					width:600,
					columns: 3,
					vertical: true,
					items: [{
						boxLabel: 'Genera Contenedor',
						name: 'ckGenContenedor'
					}, {
						boxLabel: 'Ser organiza por Lote',
						name: 'ckLote'
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
		xtype 	: 'prod-ct-ListadoGrilla'
	}]
});