Ext.define ("Sistema.view.Produccion.store.StoreAgrupadorProductoTerciario", {
	extend	: "Ext.data.Store",
	fields	: ['agrupadorProductoTerciarioId', 'nombre'],
	proxy	: {
		type: 'ajax',
		url: 'Server/Sysgran/Aplicacion/Modulos/Produccion/StoreWS/StoreWSAgrupadorProductoTerciario.php',
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});