Ext.define('Sistema.view.main.Main', {
    extend: 'Ext.container.Container',
    xtype: 'app-main',

    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    items: [{
    	xtype: 'panel',
    	layout: {
			type: 'vbox',
			pack: 'start'
	    },
    	name:'panel-superior',
    	region:'north',
    	height:95,
		bbar: {
			layout: {
				type: 'hbox',
				pack: 'end'
			},
			style: {
				backgroundColor: '#11517e'
			},
			items: [{
				xtype: 'tbfill'
			}, {
				xtype: 'displayfield',
				name:'lbHeaderFechaYEmpresa'
			}, {
				xtype:'splitbutton',
				name: 'btnMenuSistema',
				iconCls: null,
				menu:[{
					text:'Salir',
					handler : 'onBtnLogout'
				}]
			}, {
				iconCls: null,
				text:'x',
				xtype: 'button',
				name: 'btnCerrarTodosTab',
				tooltip: 'Cierra todos los Tabs abiertos'
			}]
		},
    	items:[{
    		width:'100%',
    		html: "<table width='100%' height='50' bgcolor='#187e37' border='0'><tr height='50'><td width='20'></td><td align='left'><font face='arial' size='6' color='white'>Plasticos del Comahue</font></td></tr></table>"
    	}]
    }, {
        xtype: 'panel',
        title: 'Menu del Sistema',
        name: 'panel-lateral-izquierdo',
        region: 'west',
        collapsible: true,
        width: '20%',
        split: true,
        autoScroll: true,
        items:[{
			xtype:'treepanel',
			width:'100%',
			name: 'trMainTreePanel',
			rootVisible: false,
			store: Ext.create ("Sistema.view.main.MainMenuStore", {}),
			columns: [
				{ xtype: 'treecolumn', header: '', dataIndex: 'nombre', flex: 1 }
			]
		}]
    },{
        region: 'center',
        xtype: 'tabpanel',
        autoDestroy: true,
        name: 'panel-central',
        items:[{
        	xtype: 'panel',
        	padding: 20,
        	title:'Inicio',
        	name: 'tabInicio',
        	layout: {
        		type: 'table',
				columns: 2,
				tableAttrs: {
				  style: {
					 width: '100%'
				  }
			   }
			}
        }]
    }]
});
