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

Ext.define ('Sistema.view.Empresa.CuentaContable.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'emp-ccont-ListadoController',
    alias			: 'widget.emp-ccont-Listado',
	closable		: false,
	layout			: {
		type: 'vbox',
		align : 'stretch',
		pack  : 'start'
	},
	requires: [
		'Sistema.view.Empresa.CuentaContable.ListadoGrillaStore'
	],

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
		text: 'Nueva Cuenta Contable',
		name: 'btnNuevo',
		iconCls: 'btnNuevo',
		tooltip: 'Crear una nueva Cuenta Contable'
	}, {
		xtype: 'textfield',
		fieldLabel: 'Buscar:',
		name: 'tbBuscar',
		width: 250
	}, {
		xtype			: 'combo',
		fieldLabel		: '',
		name			: 'cbCampos',
		queryMode		: 'local',
		editable		: false,
		forceSelection	: true,
		valueField		: 'id_field',
		displayField	: 'desc_field',
		value			: 'bcod',
		width			: '150',
		store			: {
			fields: ['id_field', 'desc_field'],
			data: [{
				id_field: 'bcod',
				desc_field: 'Codigo'
			}, {
				id_field: 'bdesc',
				desc_field: 'Descripcion'
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
			name: 'exportarPdf'
		}, {
			text: 'Exportar a Excel',
			name: 'exportarExcel'
		}, {
			text: 'Exprotar a Word',
			name: 'exportarWord'
		}]
	}],

	items: [{
		xtype	: 'panel',
		height 	: 10
	}, {
		xtype	: 'panel',
		height 	: 10
	}, {
		flex:1,
		xtype 	: 'emp-ccont-ListadoGrilla'
	}]
});