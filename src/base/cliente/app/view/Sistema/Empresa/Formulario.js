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

Ext.define('Sistema.view.Sistema.Empresa.Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget.sis-emp-Formulario',
    controller: 'sis-emp-FormularioController',
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
			xtype: 'textfield',
			name: 'tbCuit',
			fieldLabel: 'Cuit',
			allowBlank: true,
			vtype: 'cstring'
		}, {
			xtype			: 'combo',
			fieldLabel		: 'Pais',
			name			: 'cbPaisId',
			queryMode		: 'local',
			editable		: true,
			forceSelection	: true,
			allowBlank		: false,
			typeAhead		: true,
			valueField		: 'paisId',
			displayField	: 'nombreOficial',
			store			: Ext.create ('Sistema.view.Sistema.store.StorePais', {autoLoad: false})
		}, {
			xtype			: 'combo',
			fieldLabel		: 'Provincia',
			name			: 'cbProvinciaId',
			queryMode		: 'local',
			editable		: true,
			forceSelection	: true,
			allowBlank		: false,
			typeAhead		: true,
			valueField		: 'provinciaId',
			displayField	: 'nombre',
			store			: Ext.create ('Sistema.view.Sistema.store.StoreProvincia', {autoLoad: false})
		}, {
			xtype			: 'combo',
			fieldLabel		: 'Ciudad',
			name			: 'cbCiudadId',
			queryMode		: 'local',
			editable		: true,
			forceSelection	: true,
			allowBlank		: false,
			typeAhead		: true,
			valueField		: 'ciudadId',
			displayField	: 'nombre',
			store			: Ext.create ('Sistema.view.Sistema.store.StoreCiudad', {autoLoad: false})
		}, {
			xtype: 'textfield',
			name: 'tbDireccion',
			fieldLabel: 'Direccion',
			allowBlank: true,
			vtype: 'sstring'
		}, {
			xtype: 'textareafield',
			name: 'tbDescripcion',
			fieldLabel: 'Descripcion',
			allowBlank: true,
			vtype: 'sstring'
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
				xtype: 'sis-emp-grp-Listado'
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
