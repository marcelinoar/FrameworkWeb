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

Ext.define('Sistema.view.Produccion.Producto.Atributos.Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget.prod-producto-att-Formulario',
    controller: 'prod-producto-att-FormularioController',
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
			xtype: 'fieldcontainer',
			fieldLabel: 'Atributo',
			msgTarget : 'side',
			layout: 'hbox',
			defaults: {
				flex: 1,
				hideLabel: true
			},
			items: [{
				xtype: 'textfield',
				name: 'tbAtributoId',
				width: 50,
				allowBlank: false
			}, {
				width: 10
			}, {
				xtype: 'textfield',
				name: 'tbNombreAtributo',
				width: 100,
				readOnly: true,
				vtype: 'sstring'
			}, {
				width: 10
			}, {
				iconCls: 'btnBuscar',
				name: 'btnBuscarAtributo',
				xtype: 'button'
			}]
		}, {
			xtype: 'textfield',
			name: 'tbCodUnidadDeMedida',
			fieldLabel: 'Unidad de Medida',
			readOnly: true,
			allowBlank: false
		}, {
			xtype: 'textfield',
			name: 'tbValor',
			fieldLabel: 'Valor',
			allowBlank: false
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
