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

Ext.define ('Sistema.view.Produccion.MovimientoStock.DetMovimientoStock.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	alias	: 'widget.prod-movst-dmov-ListadoGrilla',
	forceFit: true,
	layout	: 'fit',
	viewConfig:{
		markDirty:false
	},
	enableColumnHide: false,
	enableColumnMove: false,
	columns: {
		items: [
			{menuDisabled: true, text: 'Producto'	, dataIndex: 'codigoProducto'			, flex:1},
			{menuDisabled: true, text: 'Cantidad'	, dataIndex: 'cantidad'					, width: 150},
			{menuDisabled: true, text: 'UM'			, dataIndex: 'codigoUnidadDeMedida'		, width: 100},
			{menuDisabled: true, text: 'Origen'		, dataIndex: 'codigoUbicacionOrigen'	, width: 80},
			{menuDisabled: true, text: 'Cont. Orig'	, dataIndex: 'codigoContenedorOrigen'	, width: 150},
			{menuDisabled: true, text: 'Destino'	, dataIndex: 'codigoUbicacionDestino'	, width: 80},
			{menuDisabled: true, text: 'Cont. Dest'	, dataIndex: 'codigoContenedorDestino'	, width: 150},
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