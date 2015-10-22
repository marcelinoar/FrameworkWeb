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

Ext.define ('Sistema.view.Produccion.HojaDeRuta.Operaciones.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	alias	: 'widget.prod-hdruta-oper-ListadoGrilla',
	height	: 150,
	autoScroll :true,
//	forceFit: true,
	enableColumnHide: false,
	enableColumnMove: false,
	viewConfig:{
		markDirty:false
	},
	columns: {
		items: [{
			menuDisabled: true, text: 'Operacion', dataIndex: 'codigo', width: 200
		}, {
			menuDisabled: true,
			text: 'Nro. Orden',
			dataIndex: 'nroDeOrden',
			width: 100,
			editor: {
				xtype: 'textfield',
				allowBlank: true,
				vtype: 'numerico'
			}
		}, {
			menuDisabled: true, text: 'Nombre', dataIndex: 'nombre', flex:1
		}, {
			menuDisabled: true,
			width: 25,
			name:'colBorrar',
			sortable: false,
			xtype: 'actioncolumn',
			handler: 'onBorrarRegistroGrilla',
			items: [{
				iconCls: 'btnBorrar',
				tooltip: 'Borrar'
			}]
		}]
	},
	selType: 'cellmodel',
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1,
		listeners: {
			beforeedit: function(editor ,e ,eOpts ){
				var grilla = this.view.up ('prod-hdruta-oper-Listado');

				grilla.controller.setModificado ();
				e.value = '';
			}
		}
    }
});