/**************************************************************************************************
 * Archivo: FormularioController.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.LineaDeProduccion.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-ldp-FormularioController',

    init: function () {
    	FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Produccion.model.LineaDeProduccion', 'Produccion:LineaDeProduccion');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.onBtnGuardarClick
    		},
			"textfield[name='tbCodigo']": {
				change: this.tbChangeToUpperCase
			},
    		"prod-ldp-Formulario": {
    			afterrender: this.onRender
    		}
    	});
    },

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 500;
    	ctl.params.altoVentana		= 250;
    },

	CargarComponentes: function () {
		var me = this;

		this.params.nombreEntidad = 'Linea de Produccion';
		this.ctl.tbCodigo			= this.getView ().down ("textfield[name='tbCodigo']");
		this.ctl.tbDescripcionCorta = this.getView ().down ("textfield[name='tbDescripcionCorta']");
		this.ctl.tbDescripcionLarga	= this.getView ().down ("textareafield[name='tbDescripcionLarga']");
	},

    GetElementoFoco: function () {
    	return "textfield[name='tbCodigo']";
    },

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		this.params.registro = rec;

		this.ctl.tbCodigo.setValue (rec.get ('codigo'));
		this.ctl.tbDescripcionCorta.setValue (rec.get ('descripcionCorta'));
		this.ctl.tbDescripcionLarga.setValue (rec.get ('descripcionLarga'));
		this.ctl.tbCodigo.setReadOnly (!esNuevo);
	},

	ObtenerRegistroDeFormulario: function () {
		this.params.registro.set ('codigo', this.ctl.tbCodigo.value);
		this.params.registro.set ('descripcionCorta', this.ctl.tbDescripcionCorta.value);
		this.params.registro.set ('descripcionLarga', this.ctl.tbDescripcionLarga.value);

		return this.params.registro;
	}
});