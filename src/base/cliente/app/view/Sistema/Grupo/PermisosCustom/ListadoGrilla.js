/**************************************************************************************************
 * Archivo: Formulario.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

var st = Ext.create ('Sistema.view.Sistema.Grupo.PermisosCustom.ListadoGrillaStore', {autoLoad:false});

Ext.define ('Sistema.view.Sistema.Grupo.PermisosCustom.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	height	: 255,
	alias	: 'widget.sis-grp-pcus-ListadoGrilla',
	store	: st,
	forceFit: true,
	viewConfig:{
		markDirty:false
	},
	enableColumnHide: false,
	enableColumnMove: false,
	columns: {
		items: [
			{menuDisabled: true, text: 'Grupo'		, sortable: false			, dataIndex: 'nombreGrupo'		, width: '15%'},
			{menuDisabled: true, text: 'Entidad'	, sortable: false			, dataIndex: 'nombreEntidad'	, width: '40%'},
			{menuDisabled: true, text: 'Permiso'	, sortable: false			, dataIndex: 'codigo'			, flex:1},
			{menuDisabled: true, xtype : 'checkcolumn', text : 'Seleccionar'	, dataIndex : 'aplicar'			, width: '10%'}
		]
	}
});