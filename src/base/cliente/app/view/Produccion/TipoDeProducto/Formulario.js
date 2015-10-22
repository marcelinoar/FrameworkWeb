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

Ext.define('Sistema.view.Produccion.TipoDeProducto.Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget.prod-tprod-Formulario',
    controller: 'prod-tprod-FormularioController',
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
			xtype: 'checkbox',
			name: 'ckEsProductoDeCompras',
			fieldLabel: 'Producto de Compras'
		}, {
			xtype: 'checkbox',
			name: 'ckEsProductoDeVentas',
			fieldLabel: 'Producto de Ventas'
		}, {
			xtype: 'checkbox',
			name: 'ckEsProductoDeFabricacion',
			fieldLabel: 'Producto de Fabricacion'
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
