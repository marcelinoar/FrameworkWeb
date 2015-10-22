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

Ext.define ('Sistema.view.Produccion.Producto.UnidadesAlernativas.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	height	: 185,
	alias	: 'widget.prod-producto-ua-ListadoGrilla',
	forceFit: true,
	enableColumnHide: false,
	enableColumnMove: false,
	viewConfig:{
	    markDirty:false
	},
	columns: {
		items: [
			{menuDisabled: true, text: 'UM. Orig'	, dataIndex: 'unidadOrigenId'		, width: '30%', renderer: 'renCodigoUnidadDeMedida'},
			{menuDisabled: true, text: 'UM. Dest'	, dataIndex: 'unidadDestinoId'		, width: '30%', renderer: 'renCodigoUnidadDeMedida'},
			{menuDisabled: true, text: 'Conversion'	, dataIndex: 'factorDeConversion'	, flex:1, renderer: Formato.PuntoFlotante.Transformar},
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