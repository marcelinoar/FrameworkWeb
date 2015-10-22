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

Ext.define ('Sistema.view.Produccion.LoteDeFabricacion.ValesDeFabricacion.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	alias	: 'widget.prod-lote-vf-ListadoGrilla',
	forceFit: true,
	layout	: 'fit',
	viewConfig:{
		markDirty:false
	},
	enableColumnHide: false,
	enableColumnMove: false,
	columns: {
		items: [
			{menuDisabled: true, text: 'Codigo'					, dataIndex: 'id'					, width: 100},
			{menuDisabled: true, text: 'Fecha'					, dataIndex: 'fecha'				, flex:1},
			{menuDisabled: true, text: 'Contenedor'				, dataIndex: 'codigoContenedor'		, width: 100},
			{menuDisabled: true, text: 'Cantidad Rechazada'		, dataIndex: 'cantidadRechazada'	, width: 220, renderer:Formato.PuntoFlotante.Transformar},
			{menuDisabled: true, text: 'UM'						, dataIndex: 'codUMRechazada'		, width: 70},
			{menuDisabled: true, text: 'Cantidad de Recortes'	, dataIndex: 'cantidadRecortes'		, width: 220, renderer:Formato.PuntoFlotante.Transformar},
			{menuDisabled: true, text: 'UM'						, dataIndex: 'codUMRecortes'		, width: 70}
		]
	}
});