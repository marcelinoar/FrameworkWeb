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

Ext.define("Sistema.view.Sistema.Grupo.Menu.Listado",{
	extend			: 'Ext.panel.Panel',
    controller		: 'sis-grp-mnu-ListadoController',
    alias			: 'widget.sis-grp-mnu-Listado',
	closable		: false,
	height			: 265,
	autoScroll		: true,
	enableColumnHide: false,
	enableColumnMove: false,

	tbar: [{
		xtype: 'tbfill'
	}, {
		xtype:'button',
		text: 'Recargar Listado',
		name: 'btnRefrescar',
		iconCls: 'btnRecargar'
	}],

	items: [{
			xtype: 'panel',
			width: 848,
			layout	: 'fit',
			forceFit: true,
			autoScroll: true,
			items: [{
				xtype:'treepanel',
				width: '100%',
				name: 'trMenu',
				rootVisible: false,
				store: Ext.create ("Sistema.view.Sistema.Grupo.Menu.ListadoStore", {}),
				columns: [
					{xtype: 'treecolumn', header: 'Menu', flex:1, dataIndex: 'text'}
				]
			}]
		}]

/*
	items: [{
			xtype: 'panel',
			width: '100%',
			layout	: 'fit',
			forceFit: true,
			autoScroll: true,
			items: [{
				xtype:'treepanel',
				width: '100%',
				name: 'trMenu',
				rootVisible: false,
				loader: {
					url: "Server/Sysgran/Aplicacion/Modulos/Sistema/Grupo/ReadMenuItems.php",
					renderer: 'data'
				},
				root: {

				}
			}]
		}]
*/
});
