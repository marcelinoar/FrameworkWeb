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

Ext.define ('Sistema.view.Produccion.Producto.ProductoAlmacen.ListadoGrilla', {
	extend  		: 'Ext.grid.Panel',
	alias			: 'widget.prod-producto-pa-ListadoGrilla',
	viewConfig:{
		markDirty:false
	},
	height			: 247,
	enableColumnHide: false,
	enableColumnMove: false,
	autoScroll :true,
	tbar: [{
		xtype: 'fieldset',
		title: 'Unidad de Medida Stock',
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
			fieldLabel: 'UM Stock',
			msgTarget : 'side',
			layout: 'hbox',
			defaults: {
				hideLabel: true
			},
			items: [{
				xtype: 'textfield',
				name: 'tbCodUMStock',
				width: 100,
				vtype: 'cstring'
			}, {
				width: 10
			}, {
				xtype: 'textfield',
				name: 'tbDescCodUMStock',
				width: 215,
				readOnly: true,
				vtype: 'sstring'
			}, {
				width: 10
			}, {
				iconCls: 'btnBuscar',
				name: 'btnBuscarUMStock',
				xtype: 'button'
			}]
		}, {
			height: 5
		}]
	}],

	columns: {
		items: [{
			text: 'Almacen',
			sortable: false,
			dataIndex: 'codigo',
			width: 261
		}, {
			text: 'Descripcion',
			sortable: false,
			dataIndex: 'descripcionCorta',
			flex:1
		}, {
			text: 'Stock Critico',
			sortable: false,
			dataIndex: 'stockCritico',
			editor: {
				xtype: 'textfield',
				allowBlank: true,
				vtype: 'numerico'
			},
			renderer: Formato.PuntoFlotante.Transformar,
			width: 100
		}, {
			text: 'P. de Pedido',
			sortable: false,
			dataIndex: 'puntoDePedido',
			editor: {
				xtype: 'textfield',
				allowBlank: true,
				vtype: 'numerico'
			},
			renderer: Formato.PuntoFlotante.Transformar
		}]
	},
    selType: 'cellmodel',
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1,
		listeners: {
			beforeedit: function(editor ,e ,eOpts ){
			  e.value = '';
			}
		}
    }
});