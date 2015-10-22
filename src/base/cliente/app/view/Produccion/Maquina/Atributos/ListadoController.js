/**************************************************************************************************
 * ---------------- ARCHIVO GENERADO AUTOMATICAMENTE ----------------
 * Archivo: ListadoController.js
 * ------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.Maquina.Atributos.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-maq-att-ListadoController',

	init: function () {
	   	this.control({
	   		"textfield": {
	   			change: this.onTextFieldChange
	   		},
			"button[name='btnAgregarAtributo']": {
				click: this.onBtnAgregarAtributoClick
			}
	   });

		this.ctl = {};
		this.ctl.btnAgregarAtributo = this.getView ().down ("button[name='btnAgregarAtributo']");
		this.ctl.lstAtributos 		= this.getView ().down ("prod-maq-att-ListadoGrilla");
	},

	onTextFieldChange: function () {
		this.setModificado ();
	},

	onBtnAgregarAtributoClick: function () {
		var reg = Ext.create ("Sistema.view.Produccion.model.AtributoMaquina", {});

		this.setModificado ();
		this.ctl.lstAtributos.store.insert (0, reg);
        this.ctl.lstAtributos.getPlugins ()[0].startEditByPosition ({
            row: 0,
            column: 0
        });
	},

	onBorrarRegistroGrilla: function (grid, row_index) {
		this.setModificado ();
		this.ctl.lstAtributos.getStore ().removeAt (row_index);
	},

	ConfigurarListado: function (set_dirty_callback, permisos) {
		this['setModificado'] = set_dirty_callback;
		this.permisos = permisos;
	},

	//
	// Setea a st como el store de la grilla.
	//
	setStoreDetalle: function (st) {
		this.getView ().down ('grid').reconfigure (st);
	}
});