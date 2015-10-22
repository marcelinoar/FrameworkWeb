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

Ext.define ('Sistema.view.Sistema.Pais.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sis-pais-FormularioController',

    init: function () {
    	FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Sistema.model.Pais', 'Sistema:Pais');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.onBtnGuardarClick
    		},
    		"sis-pais-Formulario": {
    			afterrender: this.onRender
    		}
    	});
    },

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 500;
    	ctl.params.altoVentana		= 160;
    },

	CargarComponentes: function () {
		var me = this;

		this.params.nombreEntidad = 'Pais';
		this.ctl.tbNombreAbreviado = this.getView ().down ("textfield[name='tbNombreAbreviado']");
		this.ctl.tbNombreOficial = this.getView ().down ("textfield[name='tbNombreOficial']");
	},

    GetElementoFoco: function () {
    	return "textfield[name='tbNombreAbreviado']";
    },

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		this.params.registro = rec;

		this.ctl.tbNombreAbreviado.setValue (rec.get ('nombreAbreviado'));
		this.ctl.tbNombreOficial.setValue (rec.get ('nombreOficial'));

	},

	ObtenerRegistroDeFormulario: function () {
		this.params.registro.set ('nombreAbreviado', this.ctl.tbNombreAbreviado.value);
		this.params.registro.set ('nombreOficial', this.ctl.tbNombreOficial.value);

		return this.params.registro;
	}
});