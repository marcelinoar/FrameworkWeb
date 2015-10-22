Ext.define ("Sistema.view.Produccion.store.StoreFiltroTexto", {
	extend	: "Ext.data.Store",
	fields: ['tipo', 'nombre'],
	proxy	: {
		type: 'memory'
	},
	data : [
		{tipo:'emp', nombre:'Empieza'},
		{tipo:'con', nombre:'Contiene'},
		{tipo:'igu', nombre:'Igual'},
		{tipo:'ter', nombre:'Termina'}
	]
});