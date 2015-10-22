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

Ext.define ('Sistema.view.Empresa.TipoDocumentoIdentidad.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.emp-tdocid-FormularioController',

    init: function () {
    	FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Empresa.model.TipoDocumentoIdentidad');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.onBtnGuardarClick
    		},
    		"emp-tdocid-Formulario": {
    			afterrender: this.onRender
    		}
    	});
    },

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 500;
    	ctl.params.altoVentana		= 130;
    },

	CargarComponentes: function () {
		var me = this;

		this.params.nombreEntidad = 'Tipo Documento Identidad';
		this.ctl.tbNombre = this.getView ().down ("textfield[name='tbNombre']");


	},

    GetElementoFoco: function () {
    	return "textfield[name='tbNombre']";
    },

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		this.params.registro = rec;

		this.ctl.tbNombre.setValue (rec.get ('nombre'));

	},

	ObtenerRegistroDeFormulario: function () {
		this.params.registro.set ('nombre', this.ctl.tbNombre.value);

		return this.params.registro;
	}
});