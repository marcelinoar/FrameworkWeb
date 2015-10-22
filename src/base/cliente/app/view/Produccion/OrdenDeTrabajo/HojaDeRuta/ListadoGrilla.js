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

Ext.define ('Sistema.view.Produccion.OrdenDeTrabajo.HojaDeRuta.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	alias	: 'widget.prod-ot-hdr-ListadoGrilla',
	forceFit: true,
	layout	: 'fit',
	viewConfig:{
		markDirty:false
	},
	enableColumnHide: false,
	enableColumnMove: false,
	columns: {
		items: [
			{menuDisabled: true, text: 'Operacion'			, dataIndex: 'codigoOperacion' , width: 200},
			{menuDisabled: true, text: 'Descripcion'		, dataIndex: 'descripcionOperacion' , flex:1},
			{menuDisabled: true, text: 'Maquina'			, dataIndex: 'codigoMaquina' , width: 200},
			{menuDisabled: true, text: 'T. Estandar (min)'	, dataIndex: 'tiempoEstandar' , width: 130, renderer: Formato.PuntoFlotante.Transformar}
		]
	}
});