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

Ext.define('Sistema.view.Produccion.LineaDeProduccion.Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget.prod-ldp-Formulario',
    controller: 'prod-ldp-FormularioController',
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
			vtype: 'cstring'
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
