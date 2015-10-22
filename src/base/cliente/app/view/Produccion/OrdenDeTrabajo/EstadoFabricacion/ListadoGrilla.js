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

Ext.define ('Sistema.view.Produccion.OrdenDeTrabajo.EstadoFabricacion.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	alias	: 'widget.prod-ot-est-ListadoGrilla',
	forceFit: true,
	layout	: 'fit',
	viewConfig:{
		markDirty:false
	},
	enableColumnHide: false,
	enableColumnMove: false,
	columns: {
		items: [
			{menuDisabled: true, text: 'Operacion'			, dataIndex: 'codigoOperacion' 			, width: 150},
			{menuDisabled: true, text: 'Descripcion'		, dataIndex: 'nombreOperacion' 			, flex:1},
			{menuDisabled: true, text: 'Cnt. Producida'		, dataIndex: 'cantidadProducida' 		, width: 120, renderer: Formato.PuntoFlotante.Transformar},
			{menuDisabled: true, text: 'Cnt. Rechazada'		, dataIndex: 'cantidadRechazada' 		, width: 120, renderer: Formato.PuntoFlotante.Transformar},
			{menuDisabled: true, text: 'Cnt. Recortes'		, dataIndex: 'cantidadRecortes' 		, width: 120, renderer: Formato.PuntoFlotante.Transformar},
			{menuDisabled: true, text: 'UM'					, dataIndex: 'codigoUnidadProducida' 	, width: 70}
		]
	}
});
