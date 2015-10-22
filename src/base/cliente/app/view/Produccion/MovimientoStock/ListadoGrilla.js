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

Ext.define ('Sistema.view.Produccion.MovimientoStock.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	alias	: 'widget.prod-movst-ListadoGrilla',
	layout	: 'fit',
	forceFit: true,
	reserveScrollbar: true,
	enableColumnHide: false,
	enableColumnMove: false,
	viewConfig:{
		markDirty:false
	},
	columns: {
		items: [
			{menuDisabled: true, text: 'Producto'		, dataIndex: 'codigoProducto'				, flex:1},
			{menuDisabled: true, text: 'Estado'			, dataIndex: 'detMovimientoStockAnulacionId', width: 100, renderer: 'MostrarEstadoMovimiento'},
			{menuDisabled: true, text: 'Tipo Mov.'		, dataIndex: 'codigoTipoMovimiento'			, width: 110},
			{menuDisabled: true, text: 'Almacen'		, dataIndex: 'codigoAlmacen'				, width: 100},
			{menuDisabled: true, text: 'Ubicacion'		, dataIndex: 'codigoUbicacion'				, width: 100},
			{menuDisabled: true, text: 'Entra'			, dataIndex: 'cantidadEntra'				, width: 100, renderer:Formato.PuntoFlotante.Transformar},
			{menuDisabled: true, text: 'Sale'			, dataIndex: 'cantidadSale'					, width: 100, renderer:Formato.PuntoFlotante.Transformar},
			{menuDisabled: true, text: 'UM'				, dataIndex: 'codigoUM'						, width: 70},
			{menuDisabled: true, text: 'Mov.'			, dataIndex: 'movimientoStockId'			, width: 70},
			{menuDisabled: true, text: 'Detalle'		, dataIndex: 'id'							, width: 90},
			{menuDisabled: true, text: 'Mov. Anulacion'	, dataIndex: 'movimientoStockAnulacionId'	, width: 120},
			{menuDisabled: true, text: 'Contenedor'		, dataIndex: 'codigoContenedor'				, width: 100},
			{menuDisabled: true, text: 'Fecha'			, dataIndex: 'fecha'						, width: 120}
		]
	},
    dockedItems: [{
        xtype			: 'pagingtoolbar',
        dock			: 'bottom',
        displayInfo		: true,
		beforePageText 	: 'Pagina',
		afterPageText  	: 'de {0}',
		firstText      	: 'Primera Pagina',
		prevText       	: 'Pagina Anterior',
		nextText       	: 'Proxima Pagina',
		lastText       	: 'Ultima Pagina',
		refreshText    	: 'Refrescar',
		displayMsg		: 'Mostrando resultados {0} - {1} de {2}',
	    emptyMsg		: 'No hay datos que mostrar'
    }]
});