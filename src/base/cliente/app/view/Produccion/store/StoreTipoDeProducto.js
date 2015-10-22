Ext.define ("Sistema.view.Produccion.store.StoreTipoDeProducto", {
	extend	: "Ext.data.Store",
	fields	: ['tipoDeProductoId', 'nombre'],
	proxy	: {
		type: 'ajax',
		url: 'Server/Sysgran/Aplicacion/Modulos/Produccion/StoreWS/StoreWSTipoDeProducto.php',
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});