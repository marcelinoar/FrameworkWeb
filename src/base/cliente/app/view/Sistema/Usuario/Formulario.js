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

Ext.define('Sistema.view.Sistema.Usuario.Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget.sis-usu-Formulario',
    controller: 'sis-usu-FormularioController',
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
			xtype: 'displayfield',
			name: 'lbLoginName',
			fieldLabel: 'Nombre de Usuario',
			hidden: true
		}, {
			xtype: 'textfield',
			name: 'tbLoginName',
			fieldLabel: 'Nombre de Usuario',
			allowBlank: false,
			vtype: 'sstring'
		}, {
			xtype: 'textfield',
			name: 'tbPassword',
			inputType: 'password',
			fieldLabel: 'Password',
			allowBlank: false,
			vtype: 'sstring'
		}, {
			xtype: 'textfield',
			name: 'tbRePassword',
			fieldLabel: 'Reingrese Password',
			inputType: 'password',
			allowBlank: false,
			vtype: 'sstring'
		}, {
			xtype: 'textfield',
			name: 'tbEmail',
			fieldLabel: 'Email',
			allowBlank: true,
			vtype: 'email'
		}, {
			xtype: 'textareafield',
			name: 'tbComentario',
			fieldLabel: 'Comentarios',
			allowBlank: true,
			vtype: 'sstring'
		}]
	}, {
		xtype: 'fieldset',
		title: 'Empleado',
		collapsible: false,
		defaults: {
			labelWidth: 120,
			anchor: '100%',
			layout: {
				type: 'hbox'
			}
		},
		items: [{
			xtype: 'fieldcontainer',
			fieldLabel: 'Nro. Legajo',
			msgTarget : 'side',
			layout: 'hbox',
			defaults: {
				hideLabel: true
			},
			items: [{
				xtype: 'textfield',
				name: 'tbEmpleadoId',
				fieldLabel: 'Empleado',
				allowBlank: true,
				vtype: 'numerico'
			}, {
				width: 10
			}, {
				iconCls: 'btnBuscar',
				name: 'btnBuscarEmpleado',
				xtype: 'button'
			}]
		}, {
			xtype: 'textfield',
			name: 'tbNombreEmpleado',
			fieldLabel: 'Nombre y Apellido',
			readOnly: true,
			allowBlank: true
		}]
	}, {
		xtype: 'panel',
		height: 10
	}, {
		xtype: 'tabpanel',
		name: 'formTabPanel',
		items:[{
			title: 'Grupos',
			disabled: false,
			items: [{
				xtype: 'sis-usu-grp-Listado'
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
