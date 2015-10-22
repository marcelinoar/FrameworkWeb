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

Ext.define ('Sistema.view.Produccion.LoteDeFabricacion.OrdenDeTrabajo.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	alias	: 'widget.prod-lote-ot-ListadoGrilla',
	forceFit: true,
	layout	: 'fit',
	viewConfig:{
		markDirty:false
	},
	enableColumnHide: false,
	enableColumnMove: false,
	columns: {
		items: [
			{menuDisabled: true, text: 'Codigo'		, dataIndex: 'id'					, width: 120},
			{menuDisabled: true, text: 'Producto'	, dataIndex: 'producto'				, flex:1, renderer: function(value) {if (value != undefined) {return value.codigo;} else {return null;}}},
			{menuDisabled: true, text: 'Formula'	, dataIndex: 'formula'				, width: 200, renderer: function(value) {if (value != undefined) {return value.codigo;} else {return null;}}},
			{menuDisabled: true, text: 'Cantidad'	, dataIndex: 'cantidad'				, width: 120, renderer: Formato.PuntoFlotante.Transformar},
			{menuDisabled: true, text: 'UM'			, dataIndex: 'unidadDeMedida'		, width: 70, renderer: function(value) {if (value != undefined) {return value.codigo;} else {return null;}}},
			{
				menuDisabled: true,
				width: 25,
				name:'colBorrar',
				sortable: false,
				xtype: 'actioncolumn',
				handler: 'onBorrarRegistroGrilla',
				items: [{
					iconCls: 'btnBorrar',
					tooltip: 'Borrar'
				}]
			}]
	}
});