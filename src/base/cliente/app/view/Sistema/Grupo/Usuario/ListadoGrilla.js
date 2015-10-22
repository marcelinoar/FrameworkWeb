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

Ext.define ('Sistema.view.Sistema.Grupo.Usuario.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	alias	: 'widget.sis-grp-usu-ListadoGrilla',
	forceFit: true,
	layout	: 'fit',
	viewConfig:{
		markDirty:false
	},
	enableColumnHide: false,
	enableColumnMove: false,
	columns: {
		items: [
			{menuDisabled: true, text: 'Codigo', dataIndex: 'id'	, width: '10%'},
			{menuDisabled: true, text: 'Usuario', dataIndex: 'loginName' , flex:1},
			{
				menuDisabled: true,
				name:'colEditar',
				width: 25,
				hidden: true,
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