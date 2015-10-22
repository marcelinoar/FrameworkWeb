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

Ext.define ('Sistema.view.Produccion.ProgramaDeTrabajo.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	alias	: 'widget.prod-prg-ListadoGrilla',
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
				name: 'colSeleccion',
				stopSelection: false
            },
			{menuDisabled: true, text: '#OT'			, dataIndex: 'id'					, width: 100},
			{menuDisabled: true, text: 'Producto'		, dataIndex: 'codigoProducto'		, width: 150},
			{menuDisabled: true, text: 'Descripcion'	, dataIndex: 'descripcionProducto'	, width:'30%'},
			{menuDisabled: true, text: 'Fecha'			, dataIndex: 'fechaDeProduccion'	, width: 120},
			{menuDisabled: true, text: 'Cliente'		, dataIndex: 'codigoCliente'		, width: 120},
			{menuDisabled: true, text: 'Cantidad'		, dataIndex: 'cantidad'				, width: 100},
			{menuDisabled: true, text: 'UM'				, dataIndex: 'UM'					, width: 70},
			{menuDisabled: true, text: 'Maquina'		, dataIndex: 'codigoMaquina'		, width: 150},
			{menuDisabled: true, text: 'Lote'			, dataIndex: 'loteId'				, width: 120},
			{
				menuDisabled: true,
				name:'colEditar',
				sortable: false,
				xtype: 'actioncolumn',
				handler: 'onEditarRegistroGrilla',
				items: [{
					iconCls: 'btnEditar',
					tooltip: 'Editar'
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