Ext.define ('Sistema.view.Produccion.model.AtributoOperHRuta', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'nombre'},
		{name: 'valor'}
	],
	proxy: {
		type: 'memory'
	}
});
