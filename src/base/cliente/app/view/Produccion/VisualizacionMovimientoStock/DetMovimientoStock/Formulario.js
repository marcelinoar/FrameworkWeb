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

Ext.define('Sistema.view.Produccion.VisualizacionMovimientoStock.DetMovimientoStock.Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget.prod-vmovst-dmov-Formulario',
    controller: 'prod-vmovst-dmov-FormularioController',
	closable: false,
	bodyPadding: 10,
	layout: {
		type: 'form',
		align: 'stretch',
		pack: 'top'
	},
	fieldDefaults:{
		labelAlign: 'left',
		labelWidth: 100
	},
	items: [{
		xtype: 'fieldcontainer',
		fieldLabel: 'Nro. Det. Movimiento',
		msgTarget : 'side',
		layout: 'hbox',
		defaults: {
			hideLabel: true
		},
		items: [{
			xtype:'textfield',
			readOnly:true,
			width: 100,
			name: 'tbNroMovimiento'
		}, {
			width: 10
		}, {
			xtype: 'displayfield',
			value: 'Det. Mov. Anulacion:'
		}, {
			width: 10
		}, {
			xtype:'textfield',
			readOnly:true,
			width: 100,
			name: 'tbCodMovimientoAnulacion'
		}]
	}, {
		xtype: 'fieldcontainer',
		fieldLabel: 'Producto',
		msgTarget : 'side',
		layout: 'hbox',
		defaults: {
			hideLabel: true
		},
		items: [{
			xtype:'textfield',
			readOnly:true,
			name: 'tbCodProducto',
			width: 150,
			vtype: 'cstring'
		}, {
			width: 10
		}, {
			xtype:'textfield',
			readOnly:true,
			name: 'tbDescProducto',
			width: 200
		},{
			width: 10
		}, {
			name: 'btnVerProducto',
			text: 'Ver',
			xtype: 'button'
		}]
	}, {
		xtype: 'fieldcontainer',
		fieldLabel: 'Cantidad Entra',
		msgTarget : 'side',
		layout: 'hbox',
		defaults: {
			hideLabel: true
		},
		items: [{
			xtype:'textfield',
			readOnly:true,
			width: 100,
			name: 'tbCantidadEntra'
		}, {
			width: 10
		}, {
			xtype: 'displayfield',
			value: 'Cantidad Sale:'
		}, {
			width: 10
		}, {
			xtype:'textfield',
			readOnly:true,
			width: 100,
			name: 'tbCantidadSale'
		}, {
			width: 10
		}, {
			xtype: 'displayfield',
			value: 'UM:'
		}, {
			width: 10
		}, {
			xtype:'textfield',
			readOnly:true,
			name: 'tbCodUM',
			width: 50
		}]
	}, {
		xtype: 'fieldcontainer',
		fieldLabel: 'Contenedor',
		msgTarget : 'side',
		layout: 'hbox',
		defaults: {
			hideLabel: true
		},
		items: [{
			xtype:'textfield',
			readOnly:true,
			width: 150,
			name: 'tbContenedor'
		}]
	}, {
		xtype: 'fieldcontainer',
		fieldLabel: 'Ubicacion',
		msgTarget : 'side',
		layout: 'hbox',
		defaults: {
			hideLabel: true
		},
		items: [{
			xtype:'textfield',
			readOnly:true,
			width: 100,
			name: 'tbCodigoUbicacion'
		}, {
			width: 10
		}, {
			xtype: 'displayfield',
			value: 'Detalle:'
		}, {
			width: 10
		}, {
			xtype:'textfield',
			readOnly:true,
			name: 'tbDetalleUbicacion',
			width: 50
		}]
	}],

	buttons: [{
		text: 'ANULAR MOVIMIENTO',
		cls: 'btnAtencion',
		name: 'btnAnular'
	}, {
		xtype: 'tbfill'
	}, {
		text: 'Cerrar',
		name: 'btnGuardar'
	}, {
		hidden:true,
		name: 'btnBorrar'
	}]
});
