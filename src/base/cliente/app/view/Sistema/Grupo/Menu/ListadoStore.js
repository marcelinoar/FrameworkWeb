
Ext.define ("Sistema.view.Sistema.Grupo.Menu.ListadoStore", {
	extend:	"Ext.data.TreeStore",

	proxy: {
		type: 'ajax',
		url: 'Server/Sysgran/Aplicacion/Modulos/Sistema/Grupo/FormularioController.php',
		reader: {
			type: 'json'
		},
		root: {
			expanded: true
		},
		extraParams: {
			f: 'GetMenuGrupo'
		}
	}
})