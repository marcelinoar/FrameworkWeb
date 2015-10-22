Ext.define ("Sistema.view.Empresa.store.StoreTipoDocumentoIdentidad", {
	extend	: "Ext.data.Store",
	fields	: ['tipoDocumentoIdentidadId', 'nombre'],
	proxy	: {
		type: 'ajax',
		url: 'Server/Sysgran/Aplicacion/Modulos/Empresa/StoreWS/StoreWSTipoDocumentoIdentidad.php',
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});