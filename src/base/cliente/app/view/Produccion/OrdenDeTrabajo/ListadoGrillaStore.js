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

Ext.define ('Sistema.view.Produccion.OrdenDeTrabajo.ListadoGrillaStore', {
	extend	: 'Ext.data.Store',
	model	: 'Sistema.view.Produccion.model.OrdenDeTrabajo',
	alias	: 'store.prod-ot-ListadoGrillaStore',
	fields	: [
		{name: 'codigo'		, sortType:'asInt'},
		{name: 'cantidad'	, sortType:'asFloat'}
	],
	pageSize: 20,
	proxy	: {
		type: 'ajax',
		enablePaging: true,
		url: 'Server/Sysgran/Aplicacion/Modulos/Produccion/OrdenDeTrabajo/ListadoController.php',
		reader: {
			type: 'json',
			rootProperty: 'root',
			totalProperty: 'total'
		}
	}
});