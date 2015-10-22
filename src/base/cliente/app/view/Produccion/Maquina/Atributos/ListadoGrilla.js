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
Ext.define ('Sistema.view.Produccion.Maquina.Atributos.ListadoGrilla', {
	extend  		: 'Ext.grid.Panel',
	alias			: 'widget.prod-maq-att-ListadoGrilla',
	height			: 130,
	scroll			: 'vertical',
	reserveScrollbar: true,
	forceFit		: true,
	enableColumnMove: false,
	enableColumnHide: false,
	viewConfig:{
	    markDirty:false
	},
	columns: {
		items: [{
			text: 'Nombre',
			sortable: false,
			dataIndex: 'nombre',
			width: 261,
			editor: {
				xtype: 'textfield',
				allowBlank: false,
				vtype: 'sstring'
			}
		}, {
			text: 'Valor',
			sortable: false,
			dataIndex: 'valor',
			flex:1,
			editor: {
				xtype: 'textfield',
				allowBlank: false,
				vtype: 'sstring'
			}
		}, {
			menuDisabled: true,
			width: 25,
			name:'colBorrar',
			sortable: false,
			xtype: 'actioncolumn',
			handler: 'onBorrarRegistroGrilla',
			items: [{
				iconCls: 'btnBorrar',
				tooltip: 'Borrar Registro'
			}]
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