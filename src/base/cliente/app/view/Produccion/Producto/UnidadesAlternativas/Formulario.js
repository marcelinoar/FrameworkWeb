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

Ext.define('Sistema.view.Produccion.Producto.UnidadesAlernativas.Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget.prod-producto-ua-Formulario',
    controller: 'prod-producto-ua-FormularioController',
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
			fieldLabel: 'Unidad de Origen',
			msgTarget : 'side',
			layout: 'hbox',
			defaults: {
				flex: 1,
				hideLabel: true
			},
			items: [{
				xtype: 'textfield',
				name: 'tbCodUnidadOrigen',
				width: 50,
				allowBlank: false,
				vtype: 'cstring'
			}, {
				width: 10
			}, {
				xtype: 'textfield',
				name: 'tbDescUnidadOrigen',
				width: 100,
				readOnly: true,
				vtype: 'sstring'
			}, {
				width: 10
			}, {
				iconCls: 'btnBuscar',
				name: 'btnBuscarUnidadOrigen',
				xtype: 'button'
			}]
		}, {
			xtype: 'fieldcontainer',
			fieldLabel: 'Unidad de Destino',
			msgTarget : 'side',
			layout: 'hbox',
			defaults: {
				flex: 1,
				hideLabel: true
			},
			items: [{
				xtype: 'textfield',
				name: 'tbCodUnidadDestino',
				width: 50,
				allowBlank: false,
				vtype: 'cstring'
			}, {
				width: 10
			}, {
				xtype: 'textfield',
				name: 'tbDescUnidadDestino',
				width: 100,
				readOnly: true,
				vtype: 'sstring'
			}, {
				width: 10
			}, {
				iconCls: 'btnBuscar',
				name: 'btnBuscarUnidadDestino',
				xtype: 'button'
			}]
		}, {
			xtype: 'textfield',
			name: 'tbFactorDeConversion',
			fieldLabel: 'Conversion',
			width: 100,
			width: 90,
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
