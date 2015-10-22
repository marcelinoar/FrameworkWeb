Ext.define ("Sistema.view.Produccion.store.StoreCentroDeTrabajo", {
	extend	: "Ext.data.Store",
	fields	: ['centroDeTrabajoId', 'nombre'],
	proxy	: {
		type: 'ajax',
		url: 'Server/Sysgran/Aplicacion/Modulos/Produccion/StoreWS/StoreWSCentroDeTrabajo.php',
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});