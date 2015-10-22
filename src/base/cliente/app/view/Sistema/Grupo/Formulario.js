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

Ext.define('Sistema.view.Sistema.Grupo.Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget.sis-grp-Formulario',
    controller: 'sis-grp-FormularioController',
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
			name: 'tbNombre',
			fieldLabel: 'Nombre',
			allowBlank: false,
			vtype: 'sstring'
		}, {
			xtype: 'textareafield',
			name: 'tbDescripcion',
			fieldLabel: 'Descripcion',
			allowBlank: false,
			vtype: 'sstring'
		}]
	}, {
		xtype: 'panel',
		height: 10
	}, {
		xtype: 'tabpanel',
		name: 'formTabPanel',
		items:[{
			title: 'Usuarios',
			disabled: false,
			items: [{
				xtype: 'sis-grp-usu-Listado'
			}]
		}, {
			title: 'Empresas',
			disabled: false,
			items: [{
				xtype: 'sis-grp-emp-Listado'
			}]
		}, {
			title: 'Menu',
			disabled: false,
			items: [{
				xtype: 'sis-grp-mnu-Listado'
			}]
		}, {
			title: 'Permisos Basicos',
			disabled: false,
			items: [{
				xtype: 'sis-grp-perm-Listado'
			}]
		}, {
			title: 'Permisos Especiales',
			disabled: false,
			items: [{
				xtype: 'sis-grp-pcus-Listado'
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
