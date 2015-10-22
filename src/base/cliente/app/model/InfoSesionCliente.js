/**************************************************************************************************
 * Archivo: PerfilDeAcceso.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Ciudades
 * Modificaciones:
 *	-
 *
 **************************************************************************************************/

Ext.define ('Sistema.model.InfoSesionCliente', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'loginName'},
		{name: 'fecha'},
		{name: 'empresa'},
		{name: 'permisos'}
	],

	proxy: {
		type: 'ajax',
		api: {
			read: 'Server/Sysgran/Aplicacion/Modulos/Core/InfoSesionCliente.php?f=Leer'
		},
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	},

	GetPermiso: function (entidad) {
		var ret = null;
		var i, e;

		for (i = 0; i < this.get ('permisos').length; i++) {
			e = this.get ('permisos')[i];

			if (e.entidad == entidad) {
				ret = e;
			}
		}

		return ret;
	},

	ChequearPermisoCustom: function (entidad, codigo) {
		var ret;
		var i, j, e;

		var ret = false;
		for (i = 0; i < this.get ('permisos').length; i++) {
			e = this.get ('permisos')[i];

			if (e.entidad == entidad) {
				for (j = 0; j < e.permisosCustom.length; j++) {
					ret = ret || (e.permisosCustom[j] == codigo);
				}
			}
		}

		return ret;
	}
});
