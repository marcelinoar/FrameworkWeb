Ext.define ('Sistema.view.Produccion.model.OperacionHojaDeRuta', {
	extend: 'Ext.data.Model',
	requires: [
		'Sistema.view.Produccion.model.AtributoOperHRuta'
	],
	fields: [
		{name: 'codigo'},
		{name: 'atributos'}
	],
	hasMany: [{
		model: 'Sistema.view.Produccion.model.AtributoOperHRuta',
		name: 'atributos'
	}],

	proxy: {
		type: 'memory',
		writer: {
			writeAllFields: true,
			allDataOptions: {
				associated: true
			}
		}
	}
});
