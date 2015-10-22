/**************************************************************************************************
 * Archivo: ListadoController.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define('Sistema.view.Sistema.Grupo.Menu.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sis-grp-mnu-ListadoController',

    init: function () {
    	this.control ({
    		"button[name='btnRefrescar']": {
    			click: this.onBtnRefrescarClick
    		},
    		"treepanel[name='trMenu']": {
    			checkchange: this.onTrMenuCheckChange
    		}
    	});
    },

	//
	// Si se cambia el valor a un check marcamos el registro
	// como dirty.
	//
    onTrMenuCheckChange: function () {
    	this.setModificado ();
    },

	//
	// Refrescar mantiene el idModelo del store.
	//
	onBtnRefrescarClick: function () {
		this.getView ().down ("treepanel[name='trMenu']").getStore().reload ();
	},

	//
	// Cargamos el store pasandole el id del modelo.
	//
	setModeloId: function (modelo_id) {
		this.getView ().down ("treepanel[name='trMenu']").getStore().load ({
			params: {
				id: modelo_id
			}
		});
	},

	//
	// Registramos el callback del formulario para indicar que hay un registro dirty
	//
	ConfigurarListado: function (dirty_callback) {
		this['setModificado'] = dirty_callback;
	},

	//
	// Devuelve un array con los nodos del arbol chequeados.
	//
	ObtenerRegistroModificado: function () {
		var registros = this.getView ().down ("treepanel[name='trMenu']").getChecked ();
		var ret = [];

		Ext.Array.each(registros, function (r){
			ret.push(r.get('id'));
        });

        return ret;
	}
});
