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

Ext.define ('Sistema.view.Produccion.OrdenDeTrabajo.ReservaMateriaPrima.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	alias	: 'widget.prod-ot-res-ListadoGrilla',
	forceFit: true,
	layout	: 'fit',
	viewConfig:{
		markDirty:false
	},
	enableColumnHide: false,
	enableColumnMove: false,
	columns: {
		items: [
			{menuDisabled: true, text: 'Movimiento'		, dataIndex: '' , width: 200},
			{menuDisabled: true, text: 'Producto'		, dataIndex: '' , width: 200},
			{menuDisabled: true, text: 'Descripcion'	, dataIndex: '' , flex:1},
			{menuDisabled: true, text: 'Cantidad'		, dataIndex: '' , width: 100, renderer: Formato.PuntoFlotante.Transformar},
			{menuDisabled: true, text: 'UM'				, dataIndex: '' , width: 70},
			{menuDisabled: true, text: 'Almacen'		, dataIndex: '' , width: 70},
			{menuDisabled: true, text: 'Ubicacion'		, dataIndex: '' , width: 70},
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
