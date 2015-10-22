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

Ext.define('Sistema.view.Produccion.OrdenDeTrabajo.HojaDeRuta.Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget.prod-ot-hdr-Formulario',
    controller: 'prod-ot-hdr-FormularioController',
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
			xtype: 'fieldcontainer',
			msgTarget : 'side',
			fieldLabel: 'Operacion',
			layout: 'hbox',
			defaults: {
				hideLabel: true
			},
			items: [{
				xtype: 'textfield',
				name: 'tbCodigoOperacion',
				width: 150,
				readOnly: true
			}, {
				width: 10
			}, {
				xtype: 'textfield',
				name: 'tbDescripcionOperacion',
				width: 150,
				readOnly: true
			}]
		}, {
			xtype			: 'combo',
			fieldLabel		: 'Maquina',
			name			: 'cbMaquinaId',
			queryMode		: 'local',
			width			: 150,
			editable		: true,
			forceSelection	: true,
			allowBlank		: false,
			typeAhead		: true,
			valueField		: 'maquinaId',
			displayField	: 'codigo'
		}, {
			xtype: 'fieldcontainer',
			msgTarget : 'side',
			fieldLabel: 'Tiempo Estandar',
			layout: 'hbox',
			defaults: {
				hideLabel: true
			},
			items: [{
				xtype: 'textfield',
				name: 'tbTiempoEstandar',
				width: 150,
				readOnly: true
			}, {
				width: 10
			}, {
				xtype: 'displayfield',
				value: 'min'
			}]
		}]
	}],
	buttons: [{
		text: 'Guardar',
		iconCls:'btnGuardar',
		name: 'btnGuardar'
	}, {
		text: 'Borrar',
		hidden: true,
		iconCls:'btnBorrar',
		name: 'btnBorrar'
	}]
});
