/**************************************************************************************************
 * Archivo: TipoDocumentoIdentidad.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Tipo Documento de Identidad
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Empresa.model.TipoDocumentoIdentidad', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'nombre'}
	],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/Modulos/Empresa/TipoDocumentoIdentidad/FormularioController.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/Modulos/Empresa/TipoDocumentoIdentidad/FormularioController.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/Modulos/Empresa/TipoDocumentoIdentidad/FormularioController.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/Modulos/Empresa/TipoDocumentoIdentidad/FormularioController.php?f=Borrar'
		},
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});
