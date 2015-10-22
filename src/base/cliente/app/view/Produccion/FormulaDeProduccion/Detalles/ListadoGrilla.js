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

Ext.define ('Sistema.view.Produccion.FormulaDeProduccion.Detalles.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	height	: 150,
	alias	: 'widget.prod-form-det-ListadoGrilla',
	autoScroll :true,
	enableColumnHide: false,
	enableColumnMove: false,
	viewConfig:{
	    markDirty:false
	},
	columns: {
		items: [
			{menuDisabled: true, text: 'Codigo'			, dataIndex: 'codigo'			, width: 160},
			{menuDisabled: true, text: 'Descripcion'	, dataIndex: 'descripcionCorta'	, flex:1},
			{menuDisabled: true, text: 'Cantidad'		, dataIndex: 'cantidadUtilizada', width: '15%', renderer: Formato.PuntoFlotante.Transformar},
			{menuDisabled: true, text: 'UM'				, dataIndex: 'unidadDeMedidaId'	, width: '15%', renderer: 'renCodigoUnidadDeMedida'},
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