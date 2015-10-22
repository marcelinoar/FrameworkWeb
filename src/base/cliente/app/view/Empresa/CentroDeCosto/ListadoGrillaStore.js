/**************************************************************************************************
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Empresa.CentroDeCosto.ListadoGrillaStore', {
	extend	: 'Ext.data.Store',
	model	: 'Sistema.view.Empresa.model.CentroDeCosto',
	alias	: 'store.emp-ccosto-ListadoGrillaStore',
	proxy	: {
		type: 'ajax',
		enablePaging: true,
		url: 'Server/Sysgran/Aplicacion/Modulos/Empresa/CentroDeCosto/ListadoController.php',
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});