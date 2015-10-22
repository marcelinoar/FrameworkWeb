Ext.define ("Sistema.view.Produccion.store.StoreEstadoHojaDeRuta", {
	extend	: "Ext.data.Store",
	fields	: ['estadoHojaDeRutaId', 'nombre'],
	proxy	: {
		type: 'ajax',
		url: 'Server/Sysgran/Aplicacion/Modulos/Produccion/StoreWS/StoreWSEstadoHojaDeRuta.php',
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});