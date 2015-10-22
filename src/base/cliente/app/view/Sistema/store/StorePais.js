Ext.define ("Sistema.view.Sistema.store.StorePais", {
	extend	: "Ext.data.Store",
	fields	: ['paisId', 'nombre'],
	proxy	: {
		type: 'ajax',
		url: 'Server/Sysgran/Aplicacion/Modulos/Sistema/StoreWS/StoreWSPais.php',
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});