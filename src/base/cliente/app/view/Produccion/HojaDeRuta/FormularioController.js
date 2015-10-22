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

Ext.define ('Sistema.view.Produccion.HojaDeRuta.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-hdruta-FormularioController',

    init: function () {
    	FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Produccion.model.HojaDeRuta', 'Produccion:HojaDeRuta');

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
    		"prod-hdruta-Formulario": {
    			afterrender: this.onRender
    		}
    	});
    },

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 700;
    	ctl.params.altoVentana		= 450;
    },

	CargarComponentes: function () {
		var me = this;

		this.params.nombreEntidad = 'Hoja de Ruta';
		this.ctl.tbCodigo = this.getView ().down ("textfield[name='tbCodigo']");
		this.ctl.tbDescripcionCorta = this.getView ().down ("textfield[name='tbDescripcionCorta']");
		this.ctl.tbDescripcionLarga = this.getView ().down ("textareafield[name='tbDescripcionLarga']");

		// Listados
		this.ctl.lstOperaciones = this.getView ().down ("prod-hdruta-oper-Listado").controller;
		this.ctl.lstOperaciones.ConfigurarListado (function () {me.SetDetalleModificado ();}, this.params.permisos);
	},

    GetElementoFoco: function () {
    	return "textfield[name='tbCodigo']";
    },

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		this.params.registro = rec;

		this.ctl.tbCodigo.setValue (rec.get ('codigo'));
		this.ctl.tbDescripcionCorta.setValue (rec.get ('descripcionCorta'));
		this.ctl.tbDescripcionLarga.setValue (rec.get ('descripcionLarga'));

		this.ctl.lstOperaciones.setStoreDetalle (rec.operaciones ());

		this.ctl.tbCodigo.setReadOnly (!esNuevo);
	},

	ObtenerRegistroDeFormulario: function () {
		if (!this.ValidarFormulario ()) {
			return null;
		}

		this.params.registro.set ('codigo', this.ctl.tbCodigo.value);
		this.params.registro.set ('descripcionCorta', this.ctl.tbDescripcionCorta.value);
		this.params.registro.set ('descripcionLarga', this.ctl.tbDescripcionLarga.value);

		return this.params.registro;
	},

	ValidarFormulario: function () {
		var ret = true;

		this.params.registro.operaciones ().each (function (rec) {
			ret = ret && rec.get ('nroDeOrden') != '' && rec.get ('nroDeOrden') != null;
		});

		if (!ret) {
			Ext.Msg.alert('Error', 'Debe indicar un numero de orden para cada operacion.');
		}

		return ret;
	}
});