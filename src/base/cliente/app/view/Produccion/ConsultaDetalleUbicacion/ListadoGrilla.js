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

Ext.define ('Sistema.view.Produccion.ConsultaDetalleUbicacion.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	alias	: 'widget.prod-cdubic-ListadoGrilla',
	layout	: 'fit',
	forceFit: true,
	enableColumnHide: false,
	enableColumnMove: false,
	viewConfig:{
		markDirty:false
	},
	columns: {
		items: [
			{menuDisabled: true, text: '#'			, dataIndex: 'nroDeDetalle'			, width: 70},
			{menuDisabled: true, text: 'Producto'	, dataIndex: 'codigoProducto'		, flex:1},
			{menuDisabled: true, text: 'Cantidad'	, dataIndex: 'cantidad'				, width: 80, renderer:Formato.PuntoFlotante.Transformar},
			{menuDisabled: true, text: 'UM'			, dataIndex: 'codigoUnidadDeMedida'	, width: 70}
		]
    }
});