/**************************************************************************************************
 * Archivo: Listado.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Sistema.MenuItem.Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: 'sis-mnuitem-ListadoController',
    alias			: 'widget.sis-mnuitem-Listado',
	closable		: false,
	layout: {
		type: 'hbox',
		tdAttrs: { style: 'padding: 10px; vertical-align: top;' },
		align : 'stretch',
		pack  : 'start'
	},
	requires:[
		'Sistema.view.Sistema.MenuItem.ListadoGrillaStore'
	],

	tbar: [{
		xtype:'button',
		text: 'Refrescar Datos',
		name: 'btnRefrescar'
	}, {
		xtype: 'tbfill'
	}, {
		xtype:'button',
		text: 'Editar',
		name: 'btnEditar'
	}, {
		xtype:'button',
		text: 'Agregar',
		name: 'btnAgregar'
	}, {
		xtype: 'button',
		text: 'Borrar',
		name: 'btnBorrar'
	}],

	items: [{
			xtype: 'panel',
			width: '100%',
			title: 'Configuracion de Menu del Sistema',
			layout	: 'fit',
			forceFit: true,
			items: [{
				xtype:'treepanel',
				width: '100%',
				selModel: {
					checkOnly: true
				},
				name: 'trMenuTreePanel',
				rootVisible: true,
				store: Ext.create ("Sistema.view.Sistema.MenuItem.ListadoGrillaStore", {}),
				columns: [
					{ xtype: 'treecolumn', dataIndex:'nombre', header: 'Menu', width: '40%'},
					{ header: 'XType', dataIndex: 'xtype', width: '20%'},
					{ header: 'Descripcion', dataIndex: 'descripcion', flex:1}
				]
			}]
		}]
});