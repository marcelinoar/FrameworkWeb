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

Ext.define ('Sistema.view.Produccion.Operacion.Maquinas.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	height	: 200,
	alias	: 'widget.prod-oper-maq-ListadoGrilla',
	forceFit: true,
	enableColumnHide: false,
	enableColumnMove: false,
	viewConfig:{
		markDirty:false
	},
	columns: {
		items: [
			{menuDisabled: true, text: 'Codigo'		, dataIndex: 'codigo'	, width: 200},
			{menuDisabled: true, text: 'Descripcion', dataIndex: 'descripcion'	, flex:1},
			{
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