Ext.define ("Sistema.view.Produccion.store.StoreMaquina", {
	extend	: "Ext.data.Store",
	fields	: ['maquinaId', 'codigo'],
	proxy	: {
		type: 'ajax',
		url: 'Server/Sysgran/Aplicacion/Modulos/Produccion/StoreWS/StoreWSMaquina.php',
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});