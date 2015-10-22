Ext.define ("Sistema.view.Sistema.store.StoreProvincia", {
	extend	: "Ext.data.Store",
	fields	: ['provinciaId', 'nombre'],
	proxy	: {
		type: 'ajax',
		url: 'Server/Sysgran/Aplicacion/Modulos/Sistema/StoreWS/StoreWSProvincia.php',
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});