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

Ext.define ('Sistema.view.Produccion.Producto.OperacionesHojaDeRuta.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'prod-producto-ophr-ListadoController',
    alias			: 'widget.prod-producto-ophr-Listado',
	closable		: false,
	height			: 250,
	autoScroll		:true,
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
				width: 150,
				allowBlank: true,
				vtype: 'cstring'
			}, {
				width: 10
			}, {
				xtype: 'textfield',
				name: 'tbDescHojaDeRuta',
				width: 200,
				readOnly: true,
				vtype: 'sstring'
			}, {
				width: 10
			}, {
				iconCls: 'btnBuscar',
				name: 'btnBuscarHojaDeRuta',
				xtype: 'button'
			}]
		}, {
			height: 5
		}]
	}],

	items: [{
		xtype: 'prod-producto-ophr-ListadoGrilla'
	}]
});