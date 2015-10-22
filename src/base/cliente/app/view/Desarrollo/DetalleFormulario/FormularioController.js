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

Ext.define ('Sistema.view.Desarrollo.DetalleFormulario.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.des-fdet-FormularioController',

    init: function () {
    	FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Desarrollo.model.DetalleFormulario', 'Desarrollo:DetalleFormulario');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.onBtnGuardarClick
    		},
    		"des-fdet-Formulario": {
    			afterrender: this.onRender
    		}
    	});
    },

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 900;
    	ctl.params.altoVentana		= 600;
    },

	CargarComponentes: function () {
		var me = this;

		this.ctl.cbTipoDetalleFormularioId = this.getView ().down ("combo[name='cbTipoDetalleFormularioId']");
		this.ctl.tbNombreEntidad = this.getView ().down ("textfield[name='tbNombreEntidad']");
		this.ctl.tbEtiqueta = this.getView ().down ("textfield[name='tbEtiqueta']");
		this.ctl.tbPrefijoXtype = this.getView ().down ("textfield[name='tbPrefijoXtype']");
		this.ctl.tbRutaEntidad = this.getView ().down ("textfield[name='tbRutaEntidad']");
		this.ctl.tbClaseEntidad = this.getView ().down ("textfield[name='tbClaseEntidad']");
		this.ctl.tbNombreCampoFormulario = this.getView ().down ("textfield[name='tbNombreCampoFormulario']");
		this.ctl.tbDescripcion = this.getView ().down ("textareafield[name='tbDescripcion']");


		this.ctl.lstCamposFormulario = this.getView ().down ("des-fdet-cf-Listado").controller;
		this.ctl.lstCamposListado = this.getView ().down ("des-fdet-cd-Listado").controller;

		this.ctl.lstCamposFormulario.ConfigurarListado (function () {me.SetDetalleModificado ();});
		this.ctl.lstCamposListado.ConfigurarListado (function () {me.SetDetalleModificado ();});

		this.ctl.cbTipoDetalleFormularioId.store.load ();
	},

    GetElementoFoco: function () {
    	return "combo[name='cbTipoDetalleFormularioId']";
    },

	CargarRegistroEnFormulario: function (rec) {
		this.params.registro = rec;

		this.ctl.cbTipoDetalleFormularioId.store.reload ();

		this.ctl.cbTipoDetalleFormularioId.setValue (rec.get ('tipoDetalleFormularioId'));
		this.ctl.tbNombreEntidad.setValue (rec.get ('nombreEntidad'));
		this.ctl.tbEtiqueta.setValue (rec.get ('etiqueta'));
		this.ctl.tbPrefijoXtype.setValue (rec.get ('prefijoXtype'));
		this.ctl.tbRutaEntidad.setValue (rec.get ('rutaEntidad'));
		this.ctl.tbClaseEntidad.setValue (rec.get ('claseEntidad'));
		this.ctl.tbNombreCampoFormulario.setValue (rec.get ('nombreCampoFormulario'));
		this.ctl.tbDescripcion.setValue (rec.get ('descripcion'));

		this.ctl.lstCamposFormulario.setStoreDetalle (rec.camposFormulario());
		this.ctl.lstCamposListado.setStoreDetalle (rec.camposListado());
	},

	ObtenerRegistroDeFormulario: function () {
		this.params.registro.set ('tipoDetalleFormularioId', this.ctl.cbTipoDetalleFormularioId.value);
		this.params.registro.set ('nombreEntidad', this.ctl.tbNombreEntidad.value);
		this.params.registro.set ('etiqueta', this.ctl.tbEtiqueta.value);
		this.params.registro.set ('prefijoXtype', this.ctl.tbPrefijoXtype.value);
		this.params.registro.set ('rutaEntidad', this.ctl.tbRutaEntidad.value);
		this.params.registro.set ('claseEntidad', this.ctl.tbClaseEntidad.value);
		this.params.registro.set ('nombreCampoFormulario', this.ctl.tbNombreCampoFormulario.value);
		this.params.registro.set ('descripcion', this.ctl.tbDescripcion.value);

		return this.params.registro;
	}
});