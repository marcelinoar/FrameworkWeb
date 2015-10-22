Ext.define ("Sistema.view.Produccion.store.StoreEstadosPorOT", {
	extend	: "Ext.data.Store",
	fields	: ['iEstadoOTId', 'nombre'],
	proxy	: {
		type: 'memory'
	}
});