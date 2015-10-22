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

Ext.define('Sistema.view.Produccion.Maquina.Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget.prod-maq-Formulario',
    controller: 'prod-maq-FormularioController',
	closable: false,
	bodyPadding: 10,

	layout: {
		type: 'vbox',
		align: 'stretch',
		pack: 'top'
	},

	items: [{
		xtype: 'form',
		layout: {
			type: 'form',
			align: 'stretch',
			pack: 'top'
		},
		items: [{
			xtype: 'textfield',
			name: 'tbCodigo',
			fieldLabel: 'Codigo',
			allowBlank: false,
			vtype: 'cstring'
		}, {
			xtype: 'fieldcontainer',
			fieldLabel: 'Centro de Trabajo',
			msgTarget : 'side',
			layout: 'hbox',
			defaults: {
				flex: 1,
				hideLabel: true
			},
			items: [{
				xtype: 'textfield',
				name: 'tbCodCentroDeTrabajo',
				allowBlank: false,
				width: 150,
				vtype: 'cstring'
			}, {
				width: 10
			}, {
				xtype: 'textfield',
				name: 'tbNombreCentroDeTrabajo',
				width: 283,
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
			xtype: 'textareafield',
			name: 'tbDescripcion',
			fieldLabel: 'Descripcion',
			vtype: 'sstring'
		}]
	}, {
		xtype: 'panel',
		height: 10
	}, {
		xtype: 'tabpanel',
		name: 'formTabPanel',
		items:[{
			title: 'Atributos',
			disabled: false,
			items: [{
				xtype: 'prod-maq-att-Listado'
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
