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

Ext.define ('Sistema.view.Produccion.Producto.FormulasDeProduccion.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	alias	: 'widget.prod-producto-frm-ListadoGrilla',
	height	: 120,
	viewConfig:{
		markDirty:false
	},
	enableColumnHide: false,
	enableColumnMove: false,
	columns: {
		items: [
			{menuDisabled: true		, text: 'Formula'		, dataIndex: 'codigo'				, width: 200},
			{menuDisabled: true		, text: 'Descripcion'	, dataIndex: 'descripcionCorta'		, flex:1},
			{menuDisabled: true		, xtype : 'checkcolumn'	, text : 'Principal'	, dataIndex: 'esFormulaPrincipal'	, width: '13%'},
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