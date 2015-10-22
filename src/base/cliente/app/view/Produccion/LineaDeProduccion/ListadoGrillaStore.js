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

Ext.define ('Sistema.view.Produccion.LineaDeProduccion.ListadoGrillaStore', {
	extend	: 'Ext.data.Store',
	model	: 'Sistema.view.Produccion.model.LineaDeProduccion',
	alias	: 'store.prod-ldp-ListadoGrillaStore',
	pageSize: 20,
	proxy	: {
		type: 'ajax',
		enablePaging: true,
		url: 'Server/Sysgran/Aplicacion/Modulos/Produccion/LineaDeProduccion/ListadoController.php',
		reader: {
			type: 'json',
			rootProperty: 'root',
			totalProperty: 'total'
		}
	}
});