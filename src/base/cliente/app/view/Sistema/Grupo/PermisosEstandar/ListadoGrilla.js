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

var st = Ext.create ('Sistema.view.Sistema.Grupo.PermisosEstandar.ListadoGrillaStore', {autoLoad:false});

Ext.define ('Sistema.view.Sistema.Grupo.PermisosEstandar.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	height	: 255,
	store	: st,
	alias	: 'widget.sis-grp-perm-ListadoGrilla',
	forceFit: true,
	viewConfig:{
		markDirty:false
	},
	enableColumnHide: false,
	enableColumnMove: false,
	columns: {
		items: [
			{menuDisabled: true, text: 'Grupo'		, sortable: false			, dataIndex: 'nombreGrupo'			, width: '13%'},
			{menuDisabled: true, text: 'Entidad'	, sortable: false			, dataIndex: 'nombreEntidad'		, flex:1},
			{menuDisabled: true, xtype : 'checkcolumn', text : 'Ver Listado'	, dataIndex : 'verListado'			, width: '13%'},
			{menuDisabled: true, xtype : 'checkcolumn', text : 'Ver Registro'	, dataIndex : 'verRegistro'			, width: '13%'},
			{menuDisabled: true, xtype : 'checkcolumn', text : 'Crear'			, dataIndex : 'crearRegistro'		, width: '8%'},
			{menuDisabled: true, xtype : 'checkcolumn', text : 'Borrar'			, dataIndex : 'borrarRegistro'		, width: '8%'},
			{menuDisabled: true, xtype : 'checkcolumn', text : 'Modificar'		, dataIndex : 'modificarRegistro'	, width: '10%'}
		]
	}
});