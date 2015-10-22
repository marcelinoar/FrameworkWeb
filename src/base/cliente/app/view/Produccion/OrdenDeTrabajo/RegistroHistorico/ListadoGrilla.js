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

Ext.define ('Sistema.view.Produccion.OrdenDeTrabajo.RegistroHistorico.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	alias	: 'widget.prod-ot-hist-ListadoGrilla',
	forceFit: true,
	layout	: 'fit',
	viewConfig:{
		markDirty:false
	},
	enableColumnHide: false,
	enableColumnMove: false,
	columns: {
		items: [
			{menuDisabled: true, text: 'Fecha y Hora'		, dataIndex: '' , width: 200},
			{menuDisabled: true, text: 'Operacion'			, dataIndex: '' , flex:1},
			{menuDisabled: true, text: 'Usuario'			, dataIndex: '' , width: 70},
			{
				menuDisabled: true,
				name:'colEditar',
				width: 25,
				sortable: false,
				xtype: 'actioncolumn',
				handler: 'onEditarRegistroGrilla',
				items: [{
					iconCls: 'btnEditar',
					tooltip: 'Editar'
				}]
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
	}
});
