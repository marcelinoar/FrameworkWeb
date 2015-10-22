Ext.define ("Sistema.view.Desarrollo.store.StoreTipoDetalleFormulario", {
	extend	: "Ext.data.Store",
	fields	: ['id', 'descripcion'],
	proxy	: {
		type: 'ajax',
		url: 'Server/Sysgran/Aplicacion/Modulos/Desarrollo/StoreWS/StoreTipoDetalleFormulario.php',
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});