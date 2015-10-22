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

Ext.define ('Sistema.view.Produccion.NovedadCentroDeTrabajo.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	alias	: 'widget.prod-novct-ListadoGrilla',
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
			{menuDisabled: true, text: 'Nro.'				, dataIndex: 'id'						, width: 70},
			{menuDisabled: true, text: 'Centro de Trabajo'	, dataIndex: 'nombreCentroDeTrabajo'	, width: 150},
			{menuDisabled: true, text: 'Tipo'				, dataIndex: 'nombreTipo'				, width: 150},
			{menuDisabled: true, text: 'Fecha'				, dataIndex: 'fecha'					, width: 150},
			{menuDisabled: true, text: 'Maquina'			, dataIndex: 'codigoMaquina'			, width: 150},
			{menuDisabled: true, text: 'Comentario'			, dataIndex: 'comentario'				, flex:1},
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