Ext.define ("Sistema.view.Produccion.store.StoreAgrupadorProductoPrimario", {
	extend	: "Ext.data.Store",
	fields	: ['agrupadorProductoPrimarioId', 'nombre'],
	proxy	: {
		type: 'ajax',
		url: 'Server/Sysgran/Aplicacion/Modulos/Produccion/StoreWS/StoreWSAgrupadorProductoPrimario.php',
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});