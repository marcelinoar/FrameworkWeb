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

Ext.define ('Sistema.view.Produccion.OrdenDeTrabajo.Formula.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	alias	: 'widget.prod-ot-frm-ListadoGrilla',
	forceFit: true,
	layout	: 'fit',
	viewConfig:{
		markDirty:false
	},
	enableColumnHide: false,
	enableColumnMove: false,
	columns: {
		items: [
			{menuDisabled: true, text: 'Producto'		, dataIndex: 'codigoProducto' 		, width: 200},
			{menuDisabled: true, text: 'Descripcion'	, dataIndex: 'descripcionProducto' 	, flex:1},
			{menuDisabled: true, text: 'Cantidad'		, dataIndex: 'cantidad'				, width: 100, renderer: Formato.PuntoFlotante.Transformar},
			{menuDisabled: true, text: 'UM'				, dataIndex: 'codigoUnidadDeMedida'	, width: 70},
			{
				menuDisabled: true,
				name:'colCrearOT',
				width: 25,
				sortable: false,
				xtype: 'actioncolumn',
				handler: 'onCrearOTHija',
				items: [{
					iconCls: 'btnAgregar',
					tooltip: 'Crear OT'
				}]
			}]
	}
});