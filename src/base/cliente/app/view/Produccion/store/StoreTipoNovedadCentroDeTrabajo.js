Ext.define ("Sistema.view.Produccion.store.StoreTipoNovedadCentroDeTrabajo", {
	extend	: "Ext.data.Store",
	fields	: ['id', 'nombre'],
	proxy	: {
		type: 'ajax',
		url: 'Server/Sysgran/Aplicacion/Modulos/Produccion/StoreWS/StoreWSTipoNovedadCT.php',
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});