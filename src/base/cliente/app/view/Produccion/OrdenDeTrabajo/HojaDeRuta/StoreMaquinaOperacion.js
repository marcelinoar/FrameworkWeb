Ext.define ("Sistema.view.Produccion.OrdenDeTrabajo.HojaDeRuta.StoreMaquinaOperacion", {
	extend	: "Ext.data.Store",
	fields	: ['maquinaId', 'codigo'],
	proxy	: {
		type: 'memory'
/*
		type: 'ajax',
		url: 'Server/Sysgran/Aplicacion/Modulos/Produccion/OrdenDeTrabajo/FormularioController.php',
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
*/
	}
});