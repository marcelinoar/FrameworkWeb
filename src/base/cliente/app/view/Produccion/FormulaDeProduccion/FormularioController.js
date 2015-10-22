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

Ext.define ('Sistema.view.Produccion.FormulaDeProduccion.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-form-FormularioController',

    init: function () {
    	var me = this;
    	FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Produccion.model.FormulaDeProduccion', 'Produccion:FormulaDeProduccion');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this._onBtnGuardarClick
    		},
			"textfield[name='tbCodigo']": {
				change: this.tbChangeToUpperCase
			},
    		"prod-form-Formulario": {
    			afterrender: this.onRender
    		}
    	});

		this.info_formulario 	= null;
		this.esNuevo			= false;

		// Creamos un semaforo para que sincronice las dos transacciones que tiene el formulario.
    	this.semaforo = new Semaforo (2);
    	this.semaforo.Method = function () {
    		me.MostrarDatosAsinc ();
    	};
    },

	//
	// Pisamos el handler del evento guardar para meter unas validaciones.
	//
	_onBtnGuardarClick: function (me, e, eOpts) {
		if (this.params.registro.detalles ().count () == 0) {
			Ext.Msg.alert('Error de validacion', 'No se puede guardar una formula sin elementos');

		} else {
			this.onBtnGuardarClick (me, e, eOpts);
		}
	},

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 700;
    	ctl.params.altoVentana		= 450;
    },

	CargarComponentes: function () {
		var me = this;

		this.params.nombreEntidad = 'Formula de Produccion';
		this.ctl.tbCodigo = this.getView ().down ("textfield[name='tbCodigo']");
		this.ctl.tbDescripcionCorta = this.getView ().down ("textfield[name='tbDescripcionCorta']");
		this.ctl.tbDescripcionLarga = this.getView ().down ("textareafield[name='tbDescripcionLarga']");

		// Traigo la info del server.
		var consulta_form = new ConsultaWS ().Ejecutar ('Produccion', 'FormulaDeProduccion', 'FormularioController', 'GetInfoFormulario', null, function (resp) {
			if (this.RespuestaOK ()) {
				InfoFormularioBase.InyectarDependencia (resp);
				me.info_formulario = resp;
				me.semaforo.Set ();
			} else {
				Ext.Msg.alert('Error', this.GetMensajeRespuesta ());
			}
		});

		// Listados
		this.ctl.lstDetalles = this.getView ().down ("prod-form-det-Listado").controller;
		this.ctl.lstDetalles.ConfigurarListado (function () {me.SetDetalleModificado ();}, this.params.permisos);
	},

    GetElementoFoco: function () {
    	return "textfield[name='tbCodigo']";
    },

	//
	// Este metodo lo dispara el semaforo y se ejecuta cuando se terminaron de ejecutar los request que traen la info del formulario y el registro.
	//
	MostrarDatosAsinc: function () {
		this.params.registro = this.params.registro;

		// Cargarmos la informacion recibida en los listados.
		this.ctl.lstDetalles.SetDatosFormulario (this.info_formulario);

		this.ctl.tbCodigo.setValue (this.params.registro.get ('codigo'));
		this.ctl.tbDescripcionCorta.setValue (this.params.registro.get ('descripcionCorta'));
		this.ctl.tbDescripcionLarga.setValue (this.params.registro.get ('descripcionLarga'));
		this.ctl.lstDetalles.setStoreDetalle (this.params.registro.detalles ());
		this.ctl.tbCodigo.setReadOnly (!this.esNuevo);
	},

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		this.params.registro = rec;
		this.esNuevo = esNuevo;
		this.semaforo.Set ();
	},

	ObtenerRegistroDeFormulario: function () {

		this.params.registro.set ('codigo', this.ctl.tbCodigo.value);
		this.params.registro.set ('descripcionCorta', this.ctl.tbDescripcionCorta.value);
		this.params.registro.set ('descripcionLarga', this.ctl.tbDescripcionLarga.value);

		return this.params.registro;
	}
});
