Ext.define ("Sistema.view.Produccion.OrdenDeTrabajo.EstadoFabricacion.StoreEstadoFabricacion", {
	extend	: "Ext.data.Store",
	fields	: ['id', 'nombre'],
	proxy	: {
		type: 'memory'
	}
});