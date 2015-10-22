Ext.define ("Sistema.view.Desarrollo.store.StoreModelos", {
	extend	: "Ext.data.Store",
	fields	: ['id', 'codigo', 'nombre'],
	proxy	: {
		type: 'ajax',
		url: 'Server/Sysgran/Aplicacion/Modulos/Desarrollo/Modulo/ListadoController.php',
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});