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

Ext.define ('Sistema.view.Sistema.Pais.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	alias	: 'widget.sis-pais-ListadoGrilla',
	layout	: 'fit',
	forceFit: true,
	enableColumnHide: false,
	enableColumnMove: false,
	viewConfig:{
		markDirty:false
	},
	requires:[
		'Sistema.view.Sistema.Pais.ListadoGrillaStore'
	],
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
			{menuDisabled: true, text: 'Codigo', dataIndex: 'codigo'	, width: '10%'},
			{menuDisabled: true, text: 'Nombre Abreviado', dataIndex: 'nombreAbreviado'	, width: '40%'},
			{menuDisabled: true, text: 'Nombre Oficial', dataIndex: 'nombreOficial'	, flex:1},
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