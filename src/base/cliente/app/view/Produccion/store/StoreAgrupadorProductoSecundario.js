Ext.define ("Sistema.view.Produccion.store.StoreAgrupadorProductoSecundario", {
	extend	: "Ext.data.Store",
	fields	: ['agrupadorProductoSecundarioId', 'nombre'],
	proxy	: {
		type: 'ajax',
		url: 'Server/Sysgran/Aplicacion/Modulos/Produccion/StoreWS/StoreWSAgrupadorProductoSecundario.php',
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});