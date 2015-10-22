Ext.define ("Sistema.view.Desarrollo.store.StoreTipoCampo", {
	extend	: "Ext.data.Store",
	fields	: ['id', 'descripcion'],
	proxy	: {
		type: 'ajax',
		url: 'Server/Sysgran/Aplicacion/Modulos/Desarrollo/StoreWS/StoreTipoCampo.php',
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});