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

Ext.define('Sistema.view.Produccion.Almacen.Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget.prod-alm-Formulario',
    controller: 'prod-alm-FormularioController',
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
			xtype: 'textfield',
			name: 'tbDescripcionCorta',
			fieldLabel: 'Descripcion Corta',
			allowBlank: false,
			vtype: 'sstring'
		}, {
			xtype: 'fieldcontainer',
			fieldLabel: 'Planta',
			msgTarget : 'side',
			layout: 'hbox',
			defaults: {
				flex: 1,
				hideLabel: true
			},
			items: [{
				xtype: 'textfield',
				name: 'tbPlantaId',
				width: 50,
				allowBlank: true,
				vtype: 'numerico'
			}, {
				width: 10
			}, {
				xtype: 'textfield',
				width: 268,
				name: 'tbNombrePlanta',
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
			xtype: 'textareafield',
			name: 'tbDescripcionLarga',
			fieldLabel: 'Descripcion Larga',
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
