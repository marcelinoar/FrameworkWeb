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

Ext.define ('Sistema.view.Desarrollo.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.des-mod-FormularioController',

    init: function () {
    	FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Desarrollo.model.Modulo', 'Desarrollo:Modulo');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.onBtnGuardarClick
    		},
    		"des-mod-Formulario": {
    			afterrender: this.onRender
    		}
    	});
    },

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 500;
    	ctl.params.altoVentana		= 200;
    },

	CargarComponentes: function () {
		var me = this;

		this.ctl.tbNombre = this.getView ().down ("textfield[name='tbNombre']");
		this.ctl.tbRutaArchivos = this.getView ().down ("textfield[name='tbRutaArchivos']");
		this.ctl.tbRuta = this.getView ().down ("textfield[name='tbRuta']");


	},

    GetElementoFoco: function () {
    	return "textfield[name='tbNombre']";
    },

	CargarRegistroEnFormulario: function (rec) {
		this.params.registro = rec;

		this.ctl.tbNombre.setValue (rec.get ('nombre'));
		this.ctl.tbRutaArchivos.setValue (rec.get ('rutaArchivos'));
		this.ctl.tbRuta.setValue (rec.get ('ruta'));

	},

	ObtenerRegistroDeFormulario: function () {
		this.params.registro.set ('nombre', this.ctl.tbNombre.value);
		this.params.registro.set ('rutaArchivos', this.ctl.tbRutaArchivos.value);
		this.params.registro.set ('ruta', this.ctl.tbRuta.value);

		return this.params.registro;
	}
});