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

Ext.define('Sistema.view.Desarrollo.FormularioMaestro.CampoListado.Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget.des-fmae-cd-Formulario',
    controller: 'des-fmae-cd-FormularioController',
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
			name: 'tbEtiqueta',
			fieldLabel: 'Etiqueta',
			allowBlank: false,
			vtype: 'sstring'
		}, {
			xtype			: 'combo',
			fieldLabel		: 'Tipo Campo',
			name			: 'cbTipoCampoId',
			queryMode		: 'local',
			editable		: true,
			forceSelection	: true,
			allowBlank		: false,
			typeAhead		: true,
			valueField		: 'id',
			displayField	: 'descripcion',
			store			: Ext.create ('Sistema.view.Desarrollo.store.StoreTipoCampo', {autoLoad: false})
		}, {
			xtype: 'textfield',
			name: 'tbAnchoColumna',
			fieldLabel: 'Ancho Columna',
			allowBlank: false,
			vtype: 'sstring'
		}, {
			xtype: 'checkbox',
			name: 'ckEsFlex',
			fieldLabel: 'Flex'
		}, {
			xtype: 'checkbox',
			name: 'ckEsSubCampo',
			fieldLabel: 'SubCampo'
		}, {
			xtype: 'textfield',
			name: 'tbNombreSubCampo',
			fieldLabel: 'Nombre SubCampo',
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
