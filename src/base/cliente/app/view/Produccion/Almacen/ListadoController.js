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

Ext.define ('Sistema.view.Produccion.Almacen.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-alm-ListadoController',
	requires: [
		'Sistema.view.Produccion.Almacen.ListadoGrillaStore'
	],

	//
	// Asignacion de EventHandlers para los controles de la vista.
	//
	init: function () {
		ListadoControllerBase2.InyectarDependencia (this, 'Produccion:Almacen');
		this.params = {
			formularioController: 'Server/Sysgran/Aplicacion/Modulos/Produccion/Almacen/FormularioController.php',
			nuevaEntidad		: 'Sistema.view.Produccion.Almacen.Formulario',
			editarEntidad		: 'Sistema.view.Produccion.Almacen.Formulario',
			storeGrilla			: 'Sistema.view.Produccion.Almacen.ListadoGrillaStore',
			xtypeListado		: 'prod-alm-Listado',
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
			"prod-alm-Listado": {
				render: this.onRender
			}
	   });
	},

	SetupFiltros: function () {
		var me = this;

		// Cargamos los componentes del listado.
		this.ctl.tbCodPlanta		= this.getView ().down ("textfield[name='tbCodPlanta']");
		this.ctl.tbDescPlanta		= this.getView ().down ("textfield[name='tbDescPlanta']");

		// Campo Centro de Trabajo
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

		this.AgregarFiltro (new FiltroTexto ('codigo', this, 'cbCodigo', 'tbCodigo', 'tcodigo', 'codigo'));
		this.AgregarFiltro (new FiltroTexto ('descripcion', this, 'cbDescripcion', 'tbDescripcion', 'tdesc', 'desc'));
		this.AgregarFiltro (new FiltroCampoBusqueda ('planta', this, this.ctl.CampoPlanta, 'planta'));
	},

	GetOnNuevoParamsEntrada: function (params) {
		return ManejadorDeVentanas.ReqFormularioWS (null);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioWS (item.get ('id'));
	}
});