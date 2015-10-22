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

Ext.define('Sistema.view.Produccion.UbicacionAlmacen.Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget.prod-ubic-Formulario',
    controller: 'prod-ubic-FormularioController',
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
			vtype: 'sstring'
		}, {
			xtype: 'fieldcontainer',
			fieldLabel: 'Almacen',
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
		}, {
			xtype: 'fieldcontainer',
			fieldLabel: 'Zona',
			msgTarget : 'side',
			layout: 'hbox',
			defaults: {
				hideLabel: true
			},
			items: [{
				xtype: 'textfield',
				name: 'tbCodZona',
				width: 100,
				vtype: 'cstring'
			}, {
				width: 10
			}, {
				xtype: 'textfield',
				name: 'tbDescZona',
				width: 215,
				readOnly: true,
				vtype: 'sstring'
			}, {
				width: 10
			}, {
				iconCls: 'btnBuscar',
				name: 'btnBuscarZona',
				xtype: 'button'
			}]
		}, {
			xtype: 'fieldcontainer',
			fieldLabel: 'Area',
			msgTarget : 'side',
			layout: 'hbox',
			defaults: {
				hideLabel: true
			},
			items: [{
				xtype: 'textfield',
				name: 'tbCodArea',
				width: 100,
				vtype: 'cstring'
			}, {
				width: 10
			}, {
				xtype: 'textfield',
				name: 'tbDescArea',
				width: 215,
				readOnly: true,
				vtype: 'sstring'
			}, {
				width: 10
			}, {
				iconCls: 'btnBuscar',
				name: 'btnBuscarArea',
				xtype: 'button'
			}]
		}, {
			xtype: 'textareafield',
			name: 'tbDescripcion',
			fieldLabel: 'Descripcion',
			allowBlank: true,
			vtype: 'sstring'
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
