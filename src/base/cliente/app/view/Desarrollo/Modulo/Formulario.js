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

Ext.define('Sistema.view.Desarrollo.Modulo.Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget.des-mod-Formulario',
    controller: 'des-mod-FormularioController',
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
				name: 'tbRutaArchivos',
				fieldLabel: 'Ruta Archivos',
				allowBlank: false,
				vtype: 'sstring'
			}, {
				xtype: 'textfield',
				name: 'tbRuta',
				fieldLabel: 'Ruta',
				allowBlank: false,
				vtype: 'sstring'
			}]
	}],

	buttons: [{
			text: 'Guardar',
			name: 'btnGuardar'
		}, {
			text: 'Borrar',
			name: 'btnBorrar'
		}]
});
