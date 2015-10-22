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

Ext.define ('Sistema.view.Produccion.OrdenDeTrabajo.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	alias	: 'widget.prod-ot-ListadoGrilla',
	layout	: 'fit',
	forceFit: true,
	enableColumnHide: false,
	enableColumnMove: false,
	reserveScrollbar: true,
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
			{menuDisabled: true, text: 'Codigo'				, dataIndex: 'codigo'					, width: 100},
			{menuDisabled: true, text: 'Centro de Trabajo'	, dataIndex: 'codigoCentroDeTrabajo'	, width: 200},
			{menuDisabled: true, text: 'Producto'			, dataIndex: 'codigoProducto'			, width: 200},
			{menuDisabled: true, text: 'Descripcion'		, dataIndex: 'descripcionProducto'		, flex:1},
			{menuDisabled: true, text: 'Cantidad'			, dataIndex: 'cantidad'					, width: 100 ,renderer: Formato.PuntoFlotante.Transformar},
			{menuDisabled: true, text: 'UM'					, dataIndex: 'codigoUnidadDeMedida'		, width: 100},
			{menuDisabled: true, text: 'Estado'				, dataIndex: 'nombreEstado'				, width: 200},
			{menuDisabled: true, text: 'Creado'				, dataIndex: 'fechaCreacion'			, width: 150},
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