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

Ext.define ("Sistema.view.Sistema.Permiso.ListadoGrillaStore", {
	extend:	"Ext.data.TreeStore",
	proxy: {
		type: 'ajax',
		url: 'Server/Sysgran/Aplicacion/Modulos/Sistema/Permiso/ReadPermisos.php',
		reader: {
			type: 'json',
			rootProperty: 'arbol'
		}
	}
});
