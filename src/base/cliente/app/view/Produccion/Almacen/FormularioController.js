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

Ext.define ('Sistema.view.Produccion.Almacen.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-alm-FormularioController',
	requires: [
		'Sistema.view.Produccion.model.Almacen',
		'Sistema.view.Produccion.model.Planta'
	],

    init: function () {
    	FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Produccion.model.Almacen', 'Produccion:Almacen');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.onBtnGuardarClick
    		},
    		"prod-alm-Formulario": {
    			afterrender: this.onRender
    		},
			"textfield[name='tbCodigo']": {
				change: this.tbChangeToUpperCase
			}
    	});
    },

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 700;
    	ctl.params.altoVentana		= 250;
    },

	CargarComponentes: function () {
		var me = this;

		this.params.nombreEntidad = 'Almacen';
		this.ctl.tbCodigo = this.getView ().down ("textfield[name='tbCodigo']");
		this.ctl.tbDescripcionCorta = this.getView ().down ("textfield[name='tbDescripcionCorta']");
		this.ctl.tbDescripcionLarga = this.getView ().down ("textfield[name='tbDescripcionLarga']");
		this.ctl.tbPlantaId = this.getView ().down ("textfield[name='tbPlantaId']");
		this.ctl.tbNombrePlanta = this.getView ().down ("textfield[name='tbNombrePlanta']");

		// Inicializa el componente de busqueda de Linea de Produccion
		this.ctl.CampoPlanta = new CampoBusqueda ();
		this.ctl.CampoPlanta.SetClaseModelo ('Sistema.view.Produccion.model.Planta');
		this.ctl.CampoPlanta.SetClaseListado ('Sistema.view.Produccion.Planta.Listado');
		this.ctl.CampoPlanta.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/Planta/FormularioController.php');
		this.ctl.CampoPlanta.SetController (this);
		this.ctl.CampoPlanta.SetTextFieldCodigo ('tbPlantaId');
		this.ctl.CampoPlanta.SetBtnBuscar ('btnBuscarPlanta');

		this.ctl.CampoPlanta.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbPlantaId.setValue (rec.get ('id'));
			me.ctl.tbNombrePlanta.setValue (rec.get ('nombre'));
		};

		this.ctl.CampoPlanta.onRegistroSeleccionadoError = function () {
			me.ctl.tbPlantaId.setValue ('');
			me.ctl.tbNombrePlanta.setValue ('');

			Ext.Msg.alert('Error', 'Codigo inexistente');
		};
	},

    GetElementoFoco: function () {
    	return "textfield[name='tbCodigo']";
    },

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		this.params.registro = rec;

		this.ctl.tbCodigo.setValue (rec.get ('codigo'));
		this.ctl.tbDescripcionCorta.setValue (rec.get ('descripcionCorta'));
		this.ctl.tbDescripcionLarga.setValue (rec.get ('descripcionLarga'));
		this.ctl.tbPlantaId.setValue (rec.get ('plantaId'));

		if (rec.get ('plantaId') != '') {
			// Cargamos los componentes de busqueda.
			this.ctl.CampoPlanta.BuscarPorId (rec.get ('plantaId'));
		}

		this.ctl.tbCodigo.setReadOnly (!esNuevo);
	},

	ObtenerRegistroDeFormulario: function () {
		var flag;

		this.params.registro.set ('codigo', this.ctl.tbCodigo.value);
		this.params.registro.set ('descripcionCorta', this.ctl.tbDescripcionCorta.value);
		this.params.registro.set ('descripcionLarga', this.ctl.tbDescripcionLarga.value);
		this.params.registro.set ('plantaId', this.ctl.tbPlantaId.value);

		return this.params.registro;
	}
});