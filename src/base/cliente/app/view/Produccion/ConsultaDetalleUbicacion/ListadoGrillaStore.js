/**************************************************************************************************
 * Archivo: ListadoGrillaStore.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.ConsultaDetalleUbicacion.ListadoGrillaStore', {
	extend	: 'Ext.data.Store',
	alias	: 'store.prod-cdubic-ListadoGrillaStore',
	model	: 'Sistema.view.Produccion.model.ItemConsultaDetalleUbicacion',
	pageSize: 20,
	proxy	: {
		type: 'ajax',
		enablePaging: true,
		url: 'Server/Sysgran/Aplicacion/Modulos/Produccion/ConsultaDetalleUbicacion/ListadoController.php',
		reader: {
			type: 'json',
			rootProperty: 'root',
			totalProperty: 'total'
		}
	}
});