/**************************************************************************************************
 * Archivo: CentroDeCosto.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Empresa.model.CentroDeCosto', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'codigoSistemaExterno'},
		{name: 'descripcion'}
	],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/Modulos/Empresa/CentroDeCosto/FormularioController.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/Modulos/Empresa/CentroDeCosto/FormularioController.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/Modulos/Empresa/CentroDeCosto/FormularioController.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/Modulos/Empresa/CentroDeCosto/FormularioController.php?f=Borrar'
		},
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});
