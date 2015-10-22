Ext.define ("Sistema.view.Produccion.MovimientoStock.StoreAlmacenAsociado", {
	extend	: "Ext.data.Store",
	fields	: ['id', 'nombre'],
	proxy	: {
		type: 'memory'
	}
});