Ext.define ("Sistema.view.Sistema.store.StoreCiudad", {
	extend	: "Ext.data.Store",
	fields	: ['ciudadId', 'nombre'],
	proxy	: {
		type: 'ajax',
		url: 'Server/Sysgran/Aplicacion/Modulos/Sistema/StoreWS/StoreWSCiudad.php',
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});