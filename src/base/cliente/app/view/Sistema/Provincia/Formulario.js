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

Ext.define('Sistema.view.Sistema.Provincia.Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget.sis-prov-Formulario',
    controller: 'sis-prov-FormularioController',
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
			xtype: 'textfield',
			name: 'tbNombre',
			fieldLabel: 'Nombre',
			allowBlank: false,
			vtype: 'sstring'
		}, {
			xtype: 'textfield',
			name: 'tbAbreviatura',
			fieldLabel: 'Abreviatura',
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
