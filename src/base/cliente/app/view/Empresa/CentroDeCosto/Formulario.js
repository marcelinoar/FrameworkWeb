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

Ext.define('Sistema.view.Empresa.CentroDeCosto.Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget.emp-ccosto-Formulario',
    controller: 'emp-ccosto-FormularioController',
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
			name: 'tbCodigoSistemaExterno',
			fieldLabel: 'Codigo Sistema Externo',
			allowBlank: true,
			vtype: 'sstring'
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
