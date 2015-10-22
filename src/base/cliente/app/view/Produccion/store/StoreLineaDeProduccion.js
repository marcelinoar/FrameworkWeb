Ext.define ("Sistema.view.Produccion.store.StoreLineaDeProduccion", {
	extend	: "Ext.data.Store",
	fields	: ['lineaDeProduccionId', 'nombre'],
	proxy	: {
		type: 'ajax',
		url: 'Server/Sysgran/Aplicacion/Modulos/Produccion/StoreWS/StoreWSLineaDeProduccion.php',
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});