Ext.define ("Sistema.view.Produccion.store.StoreAtributoProducto", {
	extend	: "Ext.data.Store",
	fields	: ['id', 'nombre'],
	proxy	: {
		type: 'ajax',
		url: 'Server/Sysgran/Aplicacion/Modulos/Produccion/StoreWS/StoreWSAtributoProducto.php',
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});