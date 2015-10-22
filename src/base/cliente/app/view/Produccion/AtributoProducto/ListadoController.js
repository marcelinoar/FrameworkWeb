/**************************************************************************************************
 * Archivo: ListadoController.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.AtributoProducto.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-atprod-ListadoController',
    requires:[
    	'Sistema.view.Produccion.AtributoProducto.ListadoGrillaStore'
    ],

	//
	// Asignacion de EventHandlers para los controles de la vista.
	//
	init: function () {
		ListadoControllerBase2.InyectarDependencia (this, 'Produccion:AtributoProducto');
		this.params = {
			formularioController: 'Server/Sysgran/Aplicacion/Modulos/Produccion/AtributoProducto/FormularioController.php',
			nuevaEntidad		: 'Sistema.view.Produccion.AtributoProducto.Formulario',
			editarEntidad		: 'Sistema.view.Produccion.AtributoProducto.Formulario',
			storeGrilla			: 'Sistema.view.Produccion.AtributoProducto.ListadoGrillaStore',
			xtypeListado		: 'prod-atprod-Listado',
			ventanaMaximizable	: false,
			ventanaMaximized	: false,
			ventanaModal		: false,
			verColEditar		: true,
			verColBorrar		: true,
			anchoVentana		: 800,
			altoVentana			: 500
		};

	   	this.control({
			"grid": {
				celldblclick: this.onListadoGrillaCellDblClick
			},
			"button[name='btnBuscar']": {
				click: this.onBtnBuscarClick
			},
			"button[name='btnLimpiarFiltros']": {
				click: this.onBtnLimpiarFiltrosClick
			},
			"button[name='btnNuevo']": {
				click: this.onBtnNuevoClick
			},
			"button[name='btnRecargarListado']": {
				click: this.onBtnRecargarListadoClick
			},
			"button[name='btnAceptar']": {
				click: this.onBtnAceptarClick
			},
			"button[name='btnCancelar']": {
				click: this.onBtnCancelarClick
			},
			"prod-atprod-Listado": {
				render: this.onRender
			}
	   });
	},

	SetupFiltros: function () {
		var me = this;

		// Cargamos los componentes del listado.
		this.ctl.tbCodUM		= this.getView ().down ("textfield[name='tbCodUM']");
		this.ctl.tbDescUM		= this.getView ().down ("textfield[name='tbDescUM']");

		// Campo Centro de Trabajo
		this.ctl.CampoUM = new CampoBusqueda ();
		this.ctl.CampoUM.SetClaseModelo ('Sistema.view.Produccion.model.UnidadDeMedida');
		this.ctl.CampoUM.SetClaseListado ('Sistema.view.Produccion.UnidadDeMedida.Listado');
		this.ctl.CampoUM.SetClaseFormulario ('Sistema.view.Produccion.UnidadDeMedida.Formulario');
		this.ctl.CampoUM.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/UnidadDeMedida/FormularioController.php');
		this.ctl.CampoUM.SetController (this);
		this.ctl.CampoUM.SetTextFieldCodigo ('tbCodUM');
		this.ctl.CampoUM.SetBtnBuscar ('btnBuscarUM');

		this.ctl.CampoUM.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodUM.setValue (rec.get ('codigo'));
			me.ctl.tbDescUM.setValue (rec.get ('descripcionCorta'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoUM.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodUM.setValue ('');
			me.ctl.tbDescUM.setValue ('');
		};

		this.AgregarFiltro (new FiltroCampoBusqueda ('unidad_de_medida', this, this.ctl.CampoUM, 'um'));
		this.AgregarFiltro (new FiltroCodigoNumerico ('codigo', this, 'tbCodigo', 'codigo'));
		this.AgregarFiltro (new FiltroCombo ('tipo', this, 'cbTipo', 'tipo', 'Sistema.view.Produccion.store.StoreTipoAtributoProducto'));
		this.AgregarFiltro (new FiltroTexto ('nombre', this, 'cbNombre', 'tbNombre', 'tnombre', 'nombre'));
	},

	GetOnNuevoParamsEntrada: function (params) {
		return ManejadorDeVentanas.ReqFormularioWS (null);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioWS (item.get ('id'));
	}
});