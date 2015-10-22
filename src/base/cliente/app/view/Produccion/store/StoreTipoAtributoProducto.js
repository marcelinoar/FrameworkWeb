Ext.define ("Sistema.view.Produccion.store.StoreTipoAtributoProducto", {
	extend	: "Ext.data.Store",
	fields	: ['id', 'nombre'],
	proxy	: {
		type: 'ajax',
		url: 'Server/Sysgran/Aplicacion/Modulos/Produccion/StoreWS/StoreWSTipoAtributoProducto.php',
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});