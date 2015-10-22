Ext.define ("Sistema.view.Produccion.ValeDeFabricacion.StoreOperacion", {
	extend	: "Ext.data.Store",
	fields	: ['operacionId', 'nombre'],
	proxy	: {
		type: 'memory'
	}
});