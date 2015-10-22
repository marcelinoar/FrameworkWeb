Ext.define ("Sistema.view.Produccion.MedicionDeAtributo.StoreAtributo", {
	extend	: "Ext.data.Store",
	fields	: ['atributoId', 'nombre'],
	proxy	: {
		type: 'memory'
	}
});