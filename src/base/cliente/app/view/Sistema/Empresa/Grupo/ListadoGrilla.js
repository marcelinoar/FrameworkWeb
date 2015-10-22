/**************************************************************************************************
 * ---------------- ARCHIVO GENERADO AUTOMATICAMENTE ----------------
 * Archivo: Formulario.js
 * ------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Sistema.Empresa.Grupo.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	alias	: 'widget.sis-emp-grp-ListadoGrilla',
	forceFit: true,
	layout	: 'fit',
	enableColumnHide: false,
	enableColumnMove: false,
	viewConfig:{
		markDirty:false
	},
	columns: {
		items: [
			{text: 'Codigo', dataIndex: 'grupoId'	, width: '10%'},
			{text: 'Grupo', dataIndex: 'nombre'	, flex:1},
			{
				menuDisabled: true,
				name:'colEditar',
				hidden: true,
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