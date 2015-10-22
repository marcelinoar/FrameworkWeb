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

Ext.define ('Sistema.view.Produccion.AreaStock.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-area-FormularioController',
	requires: [
		'Sistema.view.Produccion.model.AreaStock'
	],

    init: function () {
    	FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Produccion.model.AreaStock', 'Produccion:AreaStock');

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
    		"prod-area-Formulario": {
    			afterrender: this.onRender
    		}
    	});
    },

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 500;
    	ctl.params.altoVentana		= 250;
    },

	CargarComponentes: function () {
		var me = this;

		this.params.nombreEntidad = 'Area';
		this.ctl.tbCodigo = this.getView ().down ("textfield[name='tbCodigo']");
		this.ctl.tbDescripcion = this.getView ().down ("textareafield[name='tbDescripcion']");
		this.ctl.tbCodPlanta = this.getView ().down ("textfield[name='tbCodPlanta']");
		this.ctl.tbDescPlanta = this.getView ().down ("textfield[name='tbDescPlanta']");

		// Campo Planta
		this.ctl.CampoPlanta = new CampoBusqueda ();
		this.ctl.CampoPlanta.SetClaseModelo ('Sistema.view.Produccion.model.Planta');
		this.ctl.CampoPlanta.SetClaseListado ('Sistema.view.Produccion.Planta.Listado');
		this.ctl.CampoPlanta.SetClaseFormulario ('Sistema.view.Produccion.Planta.Formulario');
		this.ctl.CampoPlanta.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/Planta/FormularioController.php');
		this.ctl.CampoPlanta.SetController (this);
		this.ctl.CampoPlanta.SetTextFieldCodigo ('tbCodPlanta');
		this.ctl.CampoPlanta.SetBtnBuscar ('btnBuscarPlanta');

		this.ctl.CampoPlanta.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodPlanta.setValue (rec.get ('id'));
			me.ctl.tbDescPlanta.setValue (rec.get ('nombre'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoPlanta.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodPlanta.setValue ('');
			me.ctl.tbDescPlanta.setValue ('');
		};
	},

    GetElementoFoco: function () {
    	return "textfield[name='tbCodPlanta']";
    },

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		this.params.registro = rec;

		this.ctl.tbCodigo.setValue (rec.get ('codigo'));
		this.ctl.tbDescripcion.setValue (rec.get ('descripcion'));
		this.ctl.CampoPlanta.BuscarPorId (rec.get ('plantaId'));
		this.ctl.tbCodigo.setReadOnly (!esNuevo);
	},

	ObtenerRegistroDeFormulario: function () {
		this.params.registro.set ('codigo', this.ctl.tbCodigo.value);
		this.params.registro.set ('descripcion', this.ctl.tbDescripcion.value);
		this.params.registro.set ('plantaId', this.ctl.CampoPlanta.itemId);

		return this.params.registro;
	}
});