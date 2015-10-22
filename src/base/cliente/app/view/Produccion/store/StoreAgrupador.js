Ext.define ("Sistema.view.Produccion.store.StoreUnidadDeMedida", {
	extend	: "Ext.data.Store",
	fields	: ['unidadDeMedidaId', 'codigo', 'descripcionCorta'],
	proxy	: {
		type: 'ajax',
		url: 'Server/Sysgran/Aplicacion/Modulos/Produccion/StoreWS/StoreWSUnidadDeMedida.php',
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});