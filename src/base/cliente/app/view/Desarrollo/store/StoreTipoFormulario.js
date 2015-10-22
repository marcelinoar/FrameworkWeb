Ext.define ("Sistema.view.Desarrollo.store.StoreTipoFormulario", {
	extend	: "Ext.data.Store",
	fields	: ['id', 'descripcion'],
	proxy	: {
		type: 'ajax',
		url: 'Server/Sysgran/Aplicacion/Modulos/Desarrollo/StoreWS/StoreTipoFormulario.php',
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});