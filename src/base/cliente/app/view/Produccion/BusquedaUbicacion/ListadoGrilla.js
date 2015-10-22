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

Ext.define ('Sistema.view.Produccion.BusquedaUbicacion.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	alias	: 'widget.prod-bubic-ListadoGrilla',
	layout	: 'fit',
	forceFit: true,
	enableColumnHide: false,
	enableColumnMove: false,
	viewConfig:{
		markDirty:false
	},
	columns: {
		items: [{
				menuDisabled: true,
				xtype: 'checkcolumn',
				header: 'Seleccionar',
				dataIndex: 'seleccion',
				width: 100,
				name: 'colSeleccion',
				stopSelection: false
            },
			{menuDisabled: true, text: 'Ubicacion'			, dataIndex: 'codigoUbicacion'				, width: 120},
			{menuDisabled: true, text: 'Detalle'			, dataIndex: 'detalleUbicacionAlmacenId'	, width: 100},
			{menuDisabled: true, text: 'Producto'			, dataIndex: 'codigoProducto'				, flex:1},
			{menuDisabled: true, text: 'Cantidad'			, dataIndex: 'cantidad'						, width: 150},
			{menuDisabled: true, text: 'UM'					, dataIndex: 'codigoUnidadDeMedida'			, width: 100},
			{menuDisabled: true, text: 'Contenedor'			, dataIndex: 'codigoContenedor'				, width: 150},
			{menuDisabled: true, text: 'Lote de Compras'	, dataIndex: 'loteDeCompras'				, width: 150},
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
			}
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