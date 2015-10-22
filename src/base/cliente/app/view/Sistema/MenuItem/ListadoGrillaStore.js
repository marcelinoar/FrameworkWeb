/**************************************************************************************************
 * Archivo: ListadoGrillaStore.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	- Por algun motivo no se puede usar el modelo (model) normal en este tipo de stores. Por eso esta
 *		comentado.
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ("Sistema.view.Sistema.MenuItem.ListadoGrillaStore", {
	extend:	"Ext.data.TreeStore",
	//model: 'Sistema.view.Sistema.model.MenuItem',

	proxy: {
		type: 'ajax',
		url: 'Server/Sysgran/Aplicacion/Modulos/Sistema/MenuItem/ReadMenuItems.php',
		reader: {
			type: 'json',
			rootProperty: 'menu'
		}
	}
});
