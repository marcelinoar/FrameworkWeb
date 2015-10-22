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

Ext.define ('Sistema.view.Produccion.Operacion.Atributos.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-oper-att-FormularioController',

    init: function () {
    	FormularioDetalleControllerBase.InyectarDependencia (this, 'Sistema.view.Produccion.model.AtributoOperacion', 'Produccion:Operacion');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.onBtnGuardarClick
    		},
    		"prod-oper-att-Formulario": {
    			afterrender: this.onRender
    		},
			"button[name='btnBuscarUnidadDeMedida']": {
				click: this.onBtnBuscarUnidadDeMedidaClick
			},
			"textfield[name='tbCodUnidadDeMedida']": {
				specialkey: this.onTbCodUnidadDeMedidaSpecialKey,
				change: this.tbChangeToUpperCase
			}
    	});
    },

	//---------- Handlers de los eventos de los botones de busqueda ----------

	onBtnBuscarUnidadDeMedidaClick: function () {
		this.ctl.CampoUnidadDeMedida.AbrirVentanaBusqueda ();
	},

	onTbCodUnidadDeMedidaSpecialKey: function (f, e) {
    	if (e.getKey () == e.ENTER || e.getKey () == e.TAB) {
    		this.ctl.CampoUnidadDeMedida.BuscarPorCodigo (f.value);
    	}
	},

	//---------- Handlers eventos estandar del formulario ----------

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 500;
    	ctl.params.altoVentana		= 150;
    },

	CargarComponentes: function () {
		var me = this;

		this.ctl.tbNombre 				= this.getView ().down ("textfield[name='tbNombre']");
		this.ctl.tbUnidadDeMedidaId		= this.getView ().down ("textfield[name='tbUnidadDeMedidaId']");
		this.ctl.tbCodUnidadDeMedida	= this.getView ().down ("textfield[name='tbCodUnidadDeMedida']");
		this.ctl.tbNombreUnidadDeMedida	= this.getView ().down ("textfield[name='tbNombreUnidadDeMedida']");
		this.ctl.unidadDeMedidaId 		= 0;	// Id de la unidad de medida asociada.

		// Inicializa el componente de busqueda de Centros de Trabajo
		this.ctl.CampoUnidadDeMedida = new CampoBusqueda ();
		this.ctl.CampoUnidadDeMedida.SetClaseModelo ('Sistema.view.Produccion.model.UnidadDeMedida');
		this.ctl.CampoUnidadDeMedida.SetClaseListado ('Sistema.view.Produccion.UnidadDeMedida.Listado');
		this.ctl.CampoUnidadDeMedida.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/UnidadDeMedida/FormularioController.php');

		this.ctl.CampoUnidadDeMedida.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.unidadDeMedidaId = rec.get ('id');
			me.ctl.tbCodUnidadDeMedida.setValue (rec.get ('codigo'));
			me.ctl.tbNombreUnidadDeMedida.setValue (rec.get ('descripcionCorta'));
		};

		this.ctl.CampoUnidadDeMedida.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodUnidadDeMedida.setValue ('');
			me.ctl.tbNombreUnidadDeMedida.setValue ('');
		};
	},

    GetElementoFoco: function () {
    	return "textfield[name='tbNombre']";
    },

	CargarRegistroEnFormulario: function (rec) {
		this.params.registro = rec;

		this.ctl.tbNombre.setValue (rec.get ('nombre'));
		this.ctl.CampoUnidadDeMedida.BuscarPorId (rec.get ('unidadDeMedidaId'));
	},

	ObtenerRegistroDeFormulario: function () {
		this.params.registro.set ('nombre'			, this.ctl.tbNombre.value);
		this.params.registro.set ('unidadDeMedidaId', this.ctl.unidadDeMedidaId);

		return this.params.registro;
	}
});