/**************************************************************************************************
 * Archivo: Listado.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.OrdenDeTrabajo.HojaDeRuta.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'prod-ot-hdr-ListadoController',
    alias			: 'widget.prod-ot-hdr-Listado',
	closable		: false,
	width			: '100%',

	tbar: [{
		xtype: 'fieldset',
		title: 'Hoja de Ruta',
		name: 'FilterFieldSet',
		collapsible: false,
		collapsed: false,
		defaults: {
			anchor: '100%',
			layout: {
				type: 'hbox',
				align: 'stretch',
				pack: 'top'
			}
		},
		items: [{
			xtype: 'fieldcontainer',
			msgTarget : 'side',
			layout: 'hbox',
			defaults: {
				hideLabel: true
			},
			items: [{
				xtype: 'textfield',
				name: 'tbCodHojaDeRuta',
				width: 180,
				allowBlank: true,
				readOnly: true,
				vtype: 'cstring'
			}, {
				width: 10
			}, {
				xtype: 'textfield',
				name: 'tbDescHojaDeRuta',
				width: 250,
				readOnly: true,
				vtype: 'sstring'
			}, {
				width: 10
			}, {
				xtype: 'button',
				name: 'btnVerHojaDeRuta',
				text: 'Ver'
			}]
		}, {
			height: 5
		}]
	}],

	items: [{
		xtype: 'prod-ot-hdr-ListadoGrilla'
	}]
});