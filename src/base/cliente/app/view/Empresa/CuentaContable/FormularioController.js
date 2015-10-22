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

Ext.define ('Sistema.view.Empresa.CuentaContable.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.emp-ccont-FormularioController',

    init: function () {
    	FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Empresa.model.CuentaContable');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.onBtnGuardarClick
    		},
    		"emp-ccont-Formulario": {
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

		this.params.nombreEntidad = 'Cuenta Contable';
		this.ctl.tbCodigoSistemaExterno = this.getView ().down ("textfield[name='tbCodigoSistemaExterno']");
		this.ctl.tbDescripcion = this.getView ().down ("textareafield[name='tbDescripcion']");


	},

    GetElementoFoco: function () {
    	return "textfield[name='tbCodigoSistemaExterno']";
    },

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		this.params.registro = rec;

		this.ctl.tbCodigoSistemaExterno.setValue (rec.get ('codigoSistemaExterno'));
		this.ctl.tbDescripcion.setValue (rec.get ('descripcion'));

	},

	ObtenerRegistroDeFormulario: function () {
		this.params.registro.set ('codigoSistemaExterno', this.ctl.tbCodigoSistemaExterno.value);
		this.params.registro.set ('descripcion', this.ctl.tbDescripcion.value);

		return this.params.registro;
	}
});