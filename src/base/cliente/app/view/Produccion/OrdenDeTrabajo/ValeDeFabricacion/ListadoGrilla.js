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

Ext.define ('Sistema.view.Produccion.OrdenDeTrabajo.ValeDeFabricacion.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	alias	: 'widget.prod-ot-vf-ListadoGrilla',
	forceFit: true,
	layout	: 'fit',
	viewConfig:{
		markDirty:false
	},
	enableColumnHide: false,
	enableColumnMove: false,
	columns: {
		items: [
			{menuDisabled: true, text: 'Codigo'		, dataIndex: 'id'					, width: 90},
			{menuDisabled: true, text: 'Fecha'		, dataIndex: 'fecha'				, width: 90},
			{menuDisabled: true, text: 'Operacion'	, dataIndex: 'codigoOperacion'		, flex:1},
			{menuDisabled: true, text: 'Contenedor'	, dataIndex: 'codigoContenedor'		, width: 90},
			{menuDisabled: true, text: 'Producida'	, dataIndex: 'cantidadProducida'	, width: 113, renderer:Formato.PuntoFlotante.Transformar},
			{menuDisabled: true, text: 'UM'			, dataIndex: 'codUMProducida'		, width: 35},
			{menuDisabled: true, text: 'Rechazada'	, dataIndex: 'cantidadRechazada'	, width: 112, renderer:Formato.PuntoFlotante.Transformar},
			{menuDisabled: true, text: 'UM'			, dataIndex: 'codUMRechazada'		, width: 35},
			{menuDisabled: true, text: 'Recortes'	, dataIndex: 'cantidadRecortes'		, width: 112, renderer:Formato.PuntoFlotante.Transformar},
			{menuDisabled: true, text: 'UM'			, dataIndex: 'codUMRecortes'		, width: 35}
		]
	}
});