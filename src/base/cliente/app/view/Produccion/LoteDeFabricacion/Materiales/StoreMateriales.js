Ext.define ("Sistema.view.Produccion.LoteDeFabricacion.Materiales.StoreMateriales", {
	extend	: "Ext.data.Store",
	fields	: ['id', 'nombre'],
	proxy	: {
		type: 'memory'
	}
});