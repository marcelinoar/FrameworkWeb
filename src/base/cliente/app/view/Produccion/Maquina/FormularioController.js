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

Ext.define ('Sistema.view.Produccion.Maquina.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-maq-FormularioController',

    init: function () {
    	FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Produccion.model.Maquina', 'Produccion:Maquina');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.onBtnGuardarClick
    		},
    		"prod-maq-Formulario": {
    			afterrender: this.onRender
    		},
			"button[name='btnBuscarCentroDeTrabajo']": {
				click: this.onBtnBuscarCentroDeTrabajoClick
			},
			"textfield[name='tbCodigo']": {
				change: this.tbChangeToUpperCase
			},
			"textfield[name='tbCodCentroDeTrabajo']": {
				specialkey: this.onTbCodCentroDeTrabajoSpecialKey,
				change: this.tbChangeToUpperCase
			}
    	});
    },

	//---------- Handlers de los eventos de los botones de busqueda ----------

	onBtnBuscarCentroDeTrabajoClick: function () {
		this.ctl.CampoCentroDeTrabajo.AbrirVentanaBusqueda ();
	},

	onTbCodCentroDeTrabajoSpecialKey: function (f, e) {
    	if (e.getKey () == e.ENTER || e.getKey () == e.TAB) {
    		this.ctl.CampoCentroDeTrabajo.BuscarPorCodigo (f.value);
    	}
	},

	//---------- Handlers eventos estandar del formulario ----------

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 700;
    	ctl.params.altoVentana		= 430;
    },

	CargarComponentes: function () {
		var me = this;

		this.params.nombreEntidad = 'Maquina';
		this.ctl.tbCodigo = this.getView ().down ("textfield[name='tbCodigo']");
		this.ctl.tbDescripcion = this.getView ().down ("textareafield[name='tbDescripcion']");
		this.ctl.tbCodCentroDeTrabajo = this.getView ().down ("textfield[name='tbCodCentroDeTrabajo']");
		this.ctl.tbNombreCentroDeTrabajo = this.getView ().down ("textfield[name='tbNombreCentroDeTrabajo']");

		// Listados
		this.ctl.lstAtributos = this.getView ().down ("prod-maq-att-Listado").controller;
		this.ctl.lstAtributos.ConfigurarListado (function () {me.SetDetalleModificado ();}, this.params.permisos);

		// Inicializa el componente de busqueda de Centros de Trabajo
		this.ctl.CampoCentroDeTrabajo = new CampoBusqueda ();
		this.ctl.CampoCentroDeTrabajo.SetClaseModelo ('Sistema.view.Produccion.model.CentroDeTrabajo');
		this.ctl.CampoCentroDeTrabajo.SetClaseListado ('Sistema.view.Produccion.CentroDeTrabajo.Listado');
		this.ctl.CampoCentroDeTrabajo.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/CentroDeTrabajo/FormularioController.php');

		this.ctl.CampoCentroDeTrabajo.onRegistroSeleccionadoOk = function (rec) {
			this.itemId = rec.get ('id');
			me.ctl.tbCodCentroDeTrabajo.setValue (rec.get ('codigo'));
			me.ctl.tbNombreCentroDeTrabajo.setValue (rec.get ('nombre'));
		};

		this.ctl.CampoCentroDeTrabajo.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodCentroDeTrabajo.setValue ('');
			me.ctl.tbNombreCentroDeTrabajo.setValue ('');
		};
	},

    GetElementoFoco: function () {
    	return "textfield[name='tbCodigo']";
    },

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		this.params.registro = rec;

		this.ctl.tbCodigo.setValue (rec.get ('codigo'));
		this.ctl.tbDescripcion.setValue (rec.get ('descripcion'));

		if (!esNuevo) {
			this.ctl.CampoCentroDeTrabajo.BuscarPorId (rec.get ('centroDeTrabajoId'));
			this.ctl.tbCodigo.setReadOnly (true);
		}

		this.ctl.lstAtributos.setStoreDetalle (rec.atributos ());
	},

	ObtenerRegistroDeFormulario: function () {
		this.params.registro.set ('centroDeTrabajoId', this.ctl.CampoCentroDeTrabajo.itemId);
		this.params.registro.set ('codigo', this.ctl.tbCodigo.value);
		this.params.registro.set ('descripcion', this.ctl.tbDescripcion.value);

		return this.params.registro;
	}
});