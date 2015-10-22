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

Ext.define ('Sistema.view.Produccion.Producto.UnidadesAlernativas.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-producto-ua-FormularioController',

    init: function () {
    	FormularioDetalleControllerBase.InyectarDependencia (this, 'Sistema.view.Produccion.model.UnidadAlternativaProducto', 'Produccion:Operacion');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.onBtnGuardarClick
    		},
    		"prod-producto-ua-Formulario": {
    			afterrender: this.onRender
    		},
			"button[name='btnBuscarUnidadOrigen']": {
				click: this.onBtnBuscarUnidadOrigenClick
			},
			"textfield[name='tbCodUnidadOrigen']": {
				specialkey: this.onTbCodUnidadOrigenSpecialKey,
				change: this.tbChangeToUpperCase
			},
			"button[name='btnBuscarUnidadDestino']": {
				click: this.onBtnBuscarUnidadDestinoClick
			},
			"textfield[name='tbCodUnidadDestino']": {
				specialkey: this.onTbCodUnidadDestinoSpecialKey,
				change: this.tbChangeToUpperCase
			},
			"textfield[name='tbFactorDeConversion']": {
				blur: this.FormatearCampoPuntoFlotante
			}
    	});
    },

	//---------- Handlers de los eventos de los botones de busqueda ----------

	onBtnBuscarUnidadOrigenClick: function () {
		this.ctl.CampoUnidadOrigen.AbrirVentanaBusqueda ();
	},

	onTbCodUnidadOrigenSpecialKey: function (f, e) {
    	if (e.getKey () == e.ENTER || e.getKey () == e.TAB) {
    		this.ctl.CampoUnidadOrigen.BuscarPorCodigo (f.value);
    	}
	},

	onBtnBuscarUnidadDestinoClick: function () {
		this.ctl.CampoUnidadDestino.AbrirVentanaBusqueda ();
	},

	onTbCodUnidadDestinoSpecialKey: function (f, e) {
    	if (e.getKey () == e.ENTER || e.getKey () == e.TAB) {
    		this.ctl.CampoUnidadDestino.BuscarPorCodigo (f.value);
    	}
	},

	//---------- Handlers eventos estandar del formulario ----------

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 400;
    	ctl.params.altoVentana		= 200;
    },

	CargarComponentes: function () {
		var me = this;

		this.ctl.tbCodUnidadOrigen		= this.getView ().down ("textfield[name='tbCodUnidadOrigen']");
		this.ctl.tbDescUnidadOrigen		= this.getView ().down ("textfield[name='tbDescUnidadOrigen']");
		this.ctl.tbCodUnidadDestino		= this.getView ().down ("textfield[name='tbCodUnidadDestino']");
		this.ctl.tbDescUnidadDestino	= this.getView ().down ("textfield[name='tbDescUnidadDestino']");
		this.ctl.tbFactorDeConversion	= this.getView ().down ("textfield[name='tbFactorDeConversion']");

		// Inicializa el componente de busqueda de Centros de Trabajo
		this.ctl.CampoUnidadOrigen = new CampoBusqueda ();
		this.ctl.CampoUnidadOrigen.SetClaseModelo ('Sistema.view.Produccion.model.UnidadDeMedida');
		this.ctl.CampoUnidadOrigen.SetClaseListado ('Sistema.view.Produccion.UnidadDeMedida.Listado');
		this.ctl.CampoUnidadOrigen.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/UnidadDeMedida/FormularioController.php');

		this.ctl.CampoUnidadOrigen.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodUnidadOrigen.setValue (rec.get ('codigo'));
			me.ctl.tbDescUnidadOrigen.setValue (rec.get ('descripcionCorta'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoUnidadOrigen.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodUnidadOrigen.setValue ('');
			me.ctl.tbDescUnidadOrigen.setValue ('');
		};

		// Inicializa el componente de busqueda de Centros de Trabajo
		this.ctl.CampoUnidadDestino = new CampoBusqueda ();
		this.ctl.CampoUnidadDestino.SetClaseModelo ('Sistema.view.Produccion.model.UnidadDeMedida');
		this.ctl.CampoUnidadDestino.SetClaseListado ('Sistema.view.Produccion.UnidadDeMedida.Listado');
		this.ctl.CampoUnidadDestino.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/UnidadDeMedida/FormularioController.php');

		this.ctl.CampoUnidadDestino.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodUnidadDestino.setValue (rec.get ('codigo'));
			me.ctl.tbDescUnidadDestino.setValue (rec.get ('descripcionCorta'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoUnidadDestino.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodUnidadDestino.setValue ('');
			me.ctl.tbDescUnidadDestino.setValue ('');
		};
	},

    GetElementoFoco: function () {
    	return "textfield[name='tbCodUnidadOrigen']";
    },

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		this.params.registro = rec;

		if (esNuevo) {
			this.ctl.tbFactorDeConversion.setValue (Formato.PuntoFlotante.Transformar (0));

		} else {
			this.ctl.tbFactorDeConversion.setValue (Formato.PuntoFlotante.Transformar (rec.get ('factorDeConversion')));
			this.ctl.CampoUnidadOrigen.BuscarPorId (rec.get ('unidadOrigenId'));
			this.ctl.CampoUnidadDestino.BuscarPorId (rec.get ('unidadDestinoId'));
		}
	},

	ObtenerRegistroDeFormulario: function () {
		if (Formato.PuntoFlotante.GetNumero (this.ctl.tbFactorDeConversion.value) == 0) {
			Ext.Msg.alert('Error', 'El factor de conversion no  puede ser cero');
			return null;
		}

		this.params.registro.set ('factorDeConversion'	, Formato.PuntoFlotante.FormatoDB (this.ctl.tbFactorDeConversion.value));
		this.params.registro.set ('unidadOrigenId'		, this.ctl.CampoUnidadOrigen.itemId);
		this.params.registro.set ('unidadDestinoId'		, this.ctl.CampoUnidadDestino.itemId);

		return this.params.registro;
	}
});