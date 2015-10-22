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

Ext.define ('Sistema.view.Desarrollo.FormularioMaestro.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.des-fmae-FormularioController',

    init: function () {
    	FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Desarrollo.model.FormularioMaestro',  'Desarrollo:FormularioMaestro');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.onBtnGuardarClick
    		},
    		"des-fmae-Formulario": {
    			afterrender: this.onRender
    		}
    	});
    },

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 900;
    	ctl.params.altoVentana		= 700;
    },

	CargarComponentes: function () {
		var me = this;

		this.ctl.cbModuloId = this.getView ().down ("combo[name='cbModuloId']");
		this.ctl.cbTipoFormularioId = this.getView ().down ("combo[name='cbTipoFormularioId']");
		this.ctl.tbNombreEntidad = this.getView ().down ("textfield[name='tbNombreEntidad']");
		this.ctl.tbNombreEntidadPermisos = this.getView ().down ("textfield[name='tbNombreEntidadPermisos']");
		this.ctl.tbPrefijoXtype = this.getView ().down ("textfield[name='tbPrefijoXtype']");
		this.ctl.tbNombreSecuencia = this.getView ().down ("textfield[name='tbNombreSecuencia']");
		this.ctl.tbDescripcion = this.getView ().down ("textareafield[name='tbDescripcion']");

		this.ctl.lstDetalles = this.getView ().down ("des-fmae-df-Listado").controller;
		this.ctl.lstCamposFormulario = this.getView ().down ("des-fmae-cf-Listado").controller;
		this.ctl.lstCamposListado = this.getView ().down ("des-fmae-cd-Listado").controller;

		this.ctl.lstDetalles.ConfigurarListado (function () {me.SetDetalleModificado ();});
		this.ctl.lstCamposFormulario.ConfigurarListado (function () {me.SetDetalleModificado ();});
		this.ctl.lstCamposListado.ConfigurarListado (function () {me.SetDetalleModificado ();});

		this.ctl.cbModuloId.store.load();
		this.ctl.cbTipoFormularioId.store.load ();
	},

    GetElementoFoco: function () {
    	return "combo[name='cbModuloId']";
    },

	CargarRegistroEnFormulario: function (rec) {
		this.params.registro = rec;

		this.ctl.cbModuloId.setValue (rec.get ('moduloId'));
		this.ctl.cbTipoFormularioId.setValue (rec.get ('tipoFormularioId'));
		this.ctl.tbNombreEntidad.setValue (rec.get ('nombreEntidad'));
		this.ctl.tbPrefijoXtype.setValue (rec.get ('prefijoXtype'));
		this.ctl.tbNombreSecuencia.setValue (rec.get ('nombreSecuencia'));
		this.ctl.tbDescripcion.setValue (rec.get ('descripcion'));
		this.ctl.tbNombreEntidadPermisos.setValue (rec.get ('nombreEntidadPermisos'));

		this.ctl.lstDetalles.setStoreDetalle (rec.detalles());
		this.ctl.lstCamposFormulario.setStoreDetalle (rec.camposFormulario());
		this.ctl.lstCamposListado.setStoreDetalle (rec.camposListado());
	},

	ObtenerRegistroDeFormulario: function () {
		this.params.registro.set ('moduloId', this.ctl.cbModuloId.value);
		this.params.registro.set ('tipoFormularioId', this.ctl.cbTipoFormularioId.value);
		this.params.registro.set ('nombreEntidad', this.ctl.tbNombreEntidad.value);
		this.params.registro.set ('prefijoXtype', this.ctl.tbPrefijoXtype.value);
		this.params.registro.set ('nombreSecuencia', this.ctl.tbNombreSecuencia.value);
		this.params.registro.set ('descripcion', this.ctl.tbDescripcion.value);
		this.params.registro.set ('nombreEntidadPermisos', this.ctl.tbNombreEntidadPermisos.value);

		return this.params.registro;
	}
});