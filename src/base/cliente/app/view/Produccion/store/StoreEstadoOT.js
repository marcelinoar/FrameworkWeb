Ext.define ("Sistema.view.Produccion.store.StoreEstadoOT", {
	extend	: "Ext.data.Store",
	fields	: ['id', 'nombre'],
	proxy	: {
		type: 'ajax',
		url: 'Server/Sysgran/Aplicacion/Modulos/Produccion/StoreWS/StoreWSEstadoOT.php',
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});