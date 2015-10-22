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

Ext.define ('Sistema.view.Desarrollo.DetalleFormulario.CampoFormulario.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.des-fdet-cf-FormularioController',

    init: function () {
    	FormularioDetalleControllerBase.InyectarDependencia (this, 'Sistema.view.Desarrollo.model.CampoFormulario', 'Desarrollo:DetalleFormulario');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.onBtnGuardarClick
    		},
    		"des-fdet-cf-Formulario": {
    			afterrender: this.onRender
    		}
    	});
    },

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 500;
    	ctl.params.altoVentana		= 400;
    },

	CargarComponentes: function () {
		var me = this;

		this.ctl.tbNombre = this.getView ().down ("textfield[name='tbNombre']");
		this.ctl.tbEtiqueta = this.getView ().down ("textfield[name='tbEtiqueta']");
		this.ctl.cbTipoCampoId = this.getView ().down ("combo[name='cbTipoCampoId']");
		this.ctl.tbNombreCampoDb = this.getView ().down ("textfield[name='tbNombreCampoDb']");
		this.ctl.ckEsNull = this.getView ().down ("checkbox[name='ckEsNull']");
		this.ctl.ckEsAutoFoco = this.getView ().down ("checkbox[name='ckEsAutoFoco']");
		this.ctl.tbStore = this.getView ().down ("textfield[name='tbStore']");
		this.ctl.tbIdField = this.getView ().down ("textfield[name='tbIdField']");
		this.ctl.tbDescField = this.getView ().down ("textfield[name='tbDescField']");

		this.ctl.cbTipoCampoId.store.load ();
	},

    GetElementoFoco: function () {
    	return "textfield[name='tbNombre']";
    },

	CargarRegistroEnFormulario: function (rec) {
		this.params.registro = rec;

		this.ctl.tbNombre.setValue (rec.get ('nombre'));
		this.ctl.tbEtiqueta.setValue (rec.get ('etiqueta'));
		this.ctl.cbTipoCampoId.setValue (rec.get ('tipoCampoId'));
		this.ctl.tbNombreCampoDb.setValue (rec.get ('nombreCampoDb'));
		this.ctl.ckEsNull.setValue (rec.get ('esNull'));
		this.ctl.ckEsAutoFoco.setValue (rec.get ('esAutoFoco'));
		this.ctl.tbStore.setValue (rec.get ('store'));
		this.ctl.tbIdField.setValue (rec.get ('idField'));
		this.ctl.tbDescField.setValue (rec.get ('descField'));
	},

	ObtenerRegistroDeFormulario: function () {
		this.params.registro.set ('nombre', this.ctl.tbNombre.value);
		this.params.registro.set ('etiqueta', this.ctl.tbEtiqueta.value);
		this.params.registro.set ('tipoCampoId', this.ctl.cbTipoCampoId.value);
		this.params.registro.set ('nombreCampoDb', this.ctl.tbNombreCampoDb.value);
		this.params.registro.set ('esNull', (this.ctl.ckEsNull.value) ? 1 : 0);
		this.params.registro.set ('esAutoFoco', (this.ctl.ckEsAutoFoco.value) ? 1 : 0);
		this.params.registro.set ('store', this.ctl.tbStore.value);
		this.params.registro.set ('idField', this.ctl.tbIdField.value);
		this.params.registro.set ('descField', this.ctl.tbDescField.value);

		return this.params.registro;
	}
});