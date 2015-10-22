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

Ext.define ('Sistema.view.Produccion.OrdenDeTrabajo.MedicionDeAtributos.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	alias	: 'widget.prod-ot-med-ListadoGrilla',
	forceFit: true,
	layout	: 'fit',
	viewConfig:{
		markDirty:false
	},
	enableColumnHide: false,
	enableColumnMove: false,
	columns: {
		items: [
			{menuDisabled: true, text: 'Fecha y Hora'	, dataIndex: 'timestamp' , width: 150},
			{menuDisabled: true, text: 'Atributo'		, dataIndex: 'nombreAtributo' , width: 200},
			{menuDisabled: true, text: 'Valor Teorico'	, dataIndex: 'valorTeorico' , width: 110, renderer: Formato.PuntoFlotante.Transformar},
			{menuDisabled: true, text: 'Valor Medido'	, dataIndex: 'valorMedido' , width: 110, renderer: Formato.PuntoFlotante.Transformar},
			{menuDisabled: true, text: 'UM'				, dataIndex: 'codigoUnidadDeMedida' , width: 70},
			{menuDisabled: true, text: 'Comentario'		, dataIndex: 'comentario' , flex:1}
		]
	}
});
