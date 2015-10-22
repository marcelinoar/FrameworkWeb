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

Ext.define ('Sistema.view.Produccion.TipoActMantMaquina.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'prod-tactm-ListadoController',
    alias			: 'widget.prod-tactm-Listado',
	requires: [
		'Sistema.view.Produccion.TipoActMantMaquina.ListadoGrillaStore'
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
		text: 'Nuevo Tipo de Actividad',
		name: 'btnNuevo',
		iconCls: 'btnNuevo',
		tooltip: 'Crear un nuevo tipo de actividad de mantenimiento de maquina'
	}, {
		xtype: 'textfield',
		fieldLabel: 'Buscar:',
		name: 'tbBuscar',
		width: '30%'
	}, {
		xtype			: 'combo',
		fieldLabel		: '',
		name			: 'cbCampos',
		queryMode		: 'local',
		editable		: false,
		forceSelection	: true,
		valueField		: 'id_field',
		displayField	: 'desc_field',
		value			: 'bnom',
		width			: '150',
		store			: {
			fields: ['id_field', 'desc_field'],
			data: [{
				id_field	: 'bnom',
				desc_field	: 'Nombre'
			}]
		}
	}, {
		xtype: 'button',
		iconCls:'btnBuscar',
		name: 'btnBuscar',
		tooltip: 'Realizar una busqueda'
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
				layout: {
					type: 'form'
				},
				defaults: {
					anchor: '50%'
				},
				items: [{
					xtype: 'textfield',
					filterName: 'fcodigo',
					fieldLabel: 'Codigo',
					allowBlank: true,
					vtype: 'numerico'
				}]
			}, {
				xtype : 'panel',
				width: 10
			}, {
				xtype : 'panel',
				anchor: '100%',
				items :[{
					xtype: 'button',
					text: 'Limpiar Filtros',
					name: 'btnLimpiarFiltros',
					tooltip: 'Limpiar el valor de los filtros'
				}]
			}]
		}]
	}, {
		xtype	: 'panel',
		height 	: 10
	}, {
		flex	: 1,
		xtype 	: 'prod-tactm-ListadoGrilla'
	}]
});