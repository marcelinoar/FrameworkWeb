/**************************************************************************************************
 * Archivo: PermisoCustom.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Permiso del sistema
 * Modificaciones:
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Sistema.model.PermisoCustom', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'entidadId'},
		{name: 'permisoCustomId'},
		{name: 'nombreEntidad'},
		{name: 'nombreGrupo'},
		{name: 'codigo'},
		{name: 'aplicar'}
	],

	proxy: {
		type: 'memory'
	}
});
