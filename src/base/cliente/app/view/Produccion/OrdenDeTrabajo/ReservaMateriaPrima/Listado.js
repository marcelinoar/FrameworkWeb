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

Ext.define ('Sistema.view.Produccion.OrdenDeTrabajo.ReservaMateriaPrima.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'prod-ot-res-ListadoController',
    alias			: 'widget.prod-ot-res-Listado',
	closable		: false,
	width			: '100%',

	tbar: [{
		xtype: 'fieldset',
		title: 'Lote de Fabricacion',
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
				xtype: 'displayfield',
				value: 'Codigo:'
			}, {
				width: 10
			}, {
				xtype: 'textfield',
				name: 'tbCodLoteDeFabricacion',
				width: 100,
				allowBlank: true,
				vtype: 'cstring'
			}, {
				width: 10
			}, {
				iconCls: 'btnBuscar',
				name: 'btnBuscarLoteDeFabricacion',
				xtype: 'button'
			}, {
				width: 10
			}, {
				xtype: 'button',
				name: 'btnVerLoteDeFabricacion',
				text: 'Ver'
			}, {
				width: 10
			}, {
				xtype: 'button',
				name: 'btnLimpiarLoteDeFabricacion',
				text: 'Limpiar'
			}]
		}]
	}, {
		xtype: 'tbfill'
	}, {
		xtype: 'button',
		iconCls: 'btnAgregar',
		name: 'btnAgrgarMovimientoReserva',
		text: 'Agregar Movimiento'
	}],

	items: [{
		height: 5
	}, {
		xtype: 'prod-ot-res-ListadoGrilla'
	}]
});