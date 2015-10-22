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

Ext.define ('Sistema.view.Produccion.ConsultaUbicacionMovStock.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	alias	: 'widget.prod-cums-ListadoGrilla',
	layout	: 'fit',
	forceFit: true,
	enableColumnHide: false,
	enableColumnMove: false,
	viewConfig:{
		markDirty:false
	},
	columns: {
		items: [
			{
				menuDisabled: true,
				xtype: 'checkcolumn',
				header: 'Seleccionar',
				dataIndex: 'seleccion',
				width: 100,
				name: 'colSeleccion',
				stopSelection: false
            },
			{menuDisabled: true, text: 'Ubicacion'	, dataIndex: 'codigoUbicacion'				, width: 120},
			{menuDisabled: true, text: 'Area'		, dataIndex: 'codigoArea'					, width: 100},
			{menuDisabled: true, text: 'Zona'		, dataIndex: 'codigoZona'					, width: 100},
			{menuDisabled: true, text: 'Detalle'	, dataIndex: 'detalleUbicacionAlmacenId'	, width: 100},
			{menuDisabled: true, text: 'Producto'	, dataIndex: 'codigoProducto'				, flex:1},
			{menuDisabled: true, text: 'Cantidad'	, dataIndex: 'cantidad'						, width: 120, renderer:Formato.PuntoFlotante.Transformar},
			{menuDisabled: true, text: 'UM'			, dataIndex: 'codigoUnidadDeMedida'			, width: 100},
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