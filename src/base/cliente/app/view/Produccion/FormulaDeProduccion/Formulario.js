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

Ext.define('Sistema.view.Produccion.FormulaDeProduccion.Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget.prod-form-Formulario',
    controller: 'prod-form-FormularioController',
	closable: false,
	bodyPadding: 10,
	requires:[
		'Sistema.view.Produccion.Producto.OperacionesHojaDeRuta.ListadoGrillaStore'
	],

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
			vtype: 'sstring'
		}, {
			xtype: 'textfield',
			name: 'tbDescripcionCorta',
			fieldLabel: 'Descripcion Corta',
			allowBlank: false,
			vtype: 'sstring'
		}, {
			xtype: 'textareafield',
			name: 'tbDescripcionLarga',
			fieldLabel: 'Descripcion Larga',
			vtype: 'sstring'
		}]
	}, {
		xtype: 'panel',
		height: 10
	}, {
		xtype: 'tabpanel',
		name: 'formTabPanel',
		items:[{
			title: 'Estructura',
			disabled: false,
			items: [{
				xtype: 'prod-form-det-Listado'
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
