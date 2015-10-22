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

Ext.define ('Sistema.view.Empresa.CuentaContable.ListadoGrillaStore', {
	extend	: 'Ext.data.Store',
	model	: 'Sistema.view.Empresa.model.CuentaContable',
	alias	: 'store.emp-ccont-ListadoGrillaStore',
	proxy	: {
		type: 'ajax',
		enablePaging: true,
		url: 'Server/Sysgran/Aplicacion/Modulos/Empresa/CuentaContable/ListadoController.php',
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});