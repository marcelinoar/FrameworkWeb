Ext.define ("Sistema.view.Empresa.store.StoreCuentaContable", {
	extend	: "Ext.data.Store",
	fields	: ['cuentaContableId', 'codigoSistemaExterno', 'descripcion'],
	proxy	: {
		type: 'ajax',
		url: 'Server/Sysgran/Aplicacion/Modulos/Empresa/StoreWS/StoreWSCuentaContable.php',
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});