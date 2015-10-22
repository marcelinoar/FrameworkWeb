/**************************************************************************************************
 * Archivo: PermisoCustom.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Permiso del sistema
 * Modificaciones:
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Sistema.model.PermisoEstandar', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'entidadId'},
		{name: 'nombreEntidad'},
		{name: 'nombreGrupo'},
		{name: 'verListado'},
		{name: 'verRegistro'},
		{name: 'crearRegistro'},
		{name: 'borrarRegistro'},
		{name: 'modificarRegistro'}
	],

	proxy: {
		type: 'memory'
	}
});
