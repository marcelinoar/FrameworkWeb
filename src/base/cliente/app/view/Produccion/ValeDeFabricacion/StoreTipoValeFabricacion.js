Ext.define ("Sistema.view.Produccion.ValeDeFabricacion.StoreTipoValeFabricacion", {
	extend	: "Ext.data.Store",
	fields	: ['id', 'nombre'],
	proxy	: {
		type: 'memory'
	}
});