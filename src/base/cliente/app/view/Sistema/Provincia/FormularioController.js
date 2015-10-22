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

Ext.define ('Sistema.view.Sistema.Provincia.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sis-prov-FormularioController',

    init: function () {
    	FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Sistema.model.Provincia', 'Sistema:Provincia');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.onBtnGuardarClick
    		},
    		"sis-prov-Formulario": {
    			afterrender: this.onRender
    		}
    	});
    },

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 500;
    	ctl.params.altoVentana		= 190;
    },

	CargarComponentes: function () {
		var me = this;

		this.params.nombreEntidad = 'Provincia';
		this.ctl.cbPaisId = this.getView ().down ("combo[name='cbPaisId']");
		this.ctl.tbNombre = this.getView ().down ("textfield[name='tbNombre']");
		this.ctl.tbAbreviatura = this.getView ().down ("textfield[name='tbAbreviatura']");
	},

    GetElementoFoco: function () {
    	return "combo[name='cbPaisId']";
    },

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		this.params.registro = rec;
		this.ctl.cbPaisId.store.reload ();

		this.ctl.cbPaisId.setValue (rec.get ('paisId'));
		this.ctl.tbNombre.setValue (rec.get ('nombre'));
		this.ctl.tbAbreviatura.setValue (rec.get ('abreviatura'));

	},

	ObtenerRegistroDeFormulario: function () {
		this.params.registro.set ('paisId', this.ctl.cbPaisId.value);
		this.params.registro.set ('nombre', this.ctl.tbNombre.value);
		this.params.registro.set ('abreviatura', this.ctl.tbAbreviatura.value);

		return this.params.registro;
	}
});