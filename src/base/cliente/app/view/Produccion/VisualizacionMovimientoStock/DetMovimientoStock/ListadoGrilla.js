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

Ext.define ('Sistema.view.Produccion.VisualizacionMovimientoStock.DetMovimientoStock.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	alias	: 'widget.prod-vmovst-dmov-ListadoGrilla',
	forceFit: true,
	layout	: 'fit',
	viewConfig:{
		markDirty:false
	},
	enableColumnHide: false,
	enableColumnMove: false,
	columns: {
		items: [
			{menuDisabled: true, text: '#'			, dataIndex: 'id'								, width: 90},
			{menuDisabled: true, text: 'Producto'	, dataIndex: 'codigoProducto'					, flex:1},
			{menuDisabled: true, text: 'Estado'		, dataIndex: 'detMovimientoStockAnulacionId'	, width: 100, renderer: 'MostrarEstadoDetalle'},
			{menuDisabled: true, text: 'Ubicacion'	, dataIndex: 'codigoUbicacion'					, width: 100},
			{menuDisabled: true, text: 'Detalle'	, dataIndex: 'nroDetalleUbicacion'				, width: 80},
			{menuDisabled: true, text: 'Entra'		, dataIndex: 'cantidadEntra'					, width: 100, renderer:Formato.PuntoFlotante.Transformar},
			{menuDisabled: true, text: 'Sale'		, dataIndex: 'cantidadSale'						, width: 100, renderer:Formato.PuntoFlotante.Transformar},
			{menuDisabled: true, text: 'UM'			, dataIndex: 'codigoUM'							, width: 70},
			{menuDisabled: true, text: 'Contenedor'	, dataIndex: 'codigoContenedor'					, width: 100},
			{
				menuDisabled: true,
				width: 25,
				name:'colBorrar',
				sortable: false,
				xtype: 'actioncolumn',
				handler: 'onBorrarRegistroGrilla',
				items: [{
					iconCls: 'btnBorrar',
					tooltip: 'Anular Detalle'
				}]
			}]
	}
});