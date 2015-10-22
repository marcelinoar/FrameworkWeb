Ext.define ("Sistema.view.main.MainMenuStore", {
	extend:	"Ext.data.TreeStore",

	proxy: {
		type: 'ajax',
		url: 'Server/Sysgran/Aplicacion/Modulos/Sistema/MenuItem/ReadMenuItems.php',
		reader: {
			type: 'json',
			rootProperty: 'menu'
		}
	}
})