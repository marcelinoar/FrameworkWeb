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

Ext.define ('Sistema.view.Produccion.ProgramaDeTrabajo.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-prg-ListadoController',
    requires:[
    	'Sistema.view.Produccion.ProgramaDeTrabajo.ListadoGrillaStore'
    ],

	//
	// Asignacion de EventHandlers para los controles de la vista.
	//
	init: function () {
		ListadoControllerBase2.InyectarDependencia (this, 'Produccion:ProgramaDeTrabajo');
		this.params = {
			formularioController: 'Server/Sysgran/Aplicacion/Modulos/Produccion/ProgramaDeTrabajo/FormularioController.php',
			nuevaEntidad		: '',
			editarEntidad		: 'Sistema.view.Produccion.OrdenDeTrabajo.Formulario',
			storeGrilla			: 'Sistema.view.Produccion.ProgramaDeTrabajo.ListadoGrillaStore',
			xtypeListado		: 'prod-prg-Listado',
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
			"prod-prg-Listado": {
				render: this.onRender
			}
	   });
	},

	SetupFiltros: function () {
		var me = this;

		// Cargamos los componentes del listado.
		this.ctl.tbCodCentroDeTrabajo	= this.getView ().down ("textfield[name='tbCodCentroDeTrabajo']");
		this.ctl.tbDescCentroDeTrabajo	= this.getView ().down ("textfield[name='tbDescCentroDeTrabajo']");
		this.ctl.tbCodMaquina			= this.getView ().down ("textfield[name='tbCodMaquina']");
		this.ctl.tbDescMaquina			= this.getView ().down ("textfield[name='tbDescMaquina']");


		// Campo Centro de Trabajo
		this.ctl.CampoCentroDeTrabajo = new CampoBusqueda ();
		this.ctl.CampoCentroDeTrabajo.SetClaseModelo ('Sistema.view.Produccion.model.CentroDeTrabajo');
		this.ctl.CampoCentroDeTrabajo.SetClaseListado ('Sistema.view.Produccion.CentroDeTrabajo.Listado');
		this.ctl.CampoCentroDeTrabajo.SetClaseFormulario ('Sistema.view.Produccion.CentroDeTrabajo.Formulario');
		this.ctl.CampoCentroDeTrabajo.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/CentroDeTrabajo/FormularioController.php');
		this.ctl.CampoCentroDeTrabajo.SetController (this);
		this.ctl.CampoCentroDeTrabajo.SetTextFieldCodigo ('tbCodCentroDeTrabajo');
		this.ctl.CampoCentroDeTrabajo.SetBtnBuscar ('btnBuscarCentroDeTrabajo');

		this.ctl.CampoCentroDeTrabajo.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodCentroDeTrabajo.setValue (rec.get ('codigo'));
			me.ctl.tbDescCentroDeTrabajo.setValue (rec.get ('nombre'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoCentroDeTrabajo.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodCentroDeTrabajo.setValue ('');
			me.ctl.tbDescCentroDeTrabajo.setValue ('');
		};

		// Campo Maquina
		this.ctl.CampoMaquina = new CampoBusqueda ();
		this.ctl.CampoMaquina.SetClaseModelo ('Sistema.view.Produccion.model.Maquina');
		this.ctl.CampoMaquina.SetClaseListado ('Sistema.view.Produccion.Maquina.Listado');
		this.ctl.CampoMaquina.SetClaseFormulario ('Sistema.view.Produccion.Maquina.Formulario');
		this.ctl.CampoMaquina.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/Maquina/FormularioController.php');
		this.ctl.CampoMaquina.SetController (this);
		this.ctl.CampoMaquina.SetTextFieldCodigo ('tbCodMaquina');
		this.ctl.CampoMaquina.SetBtnBuscar ('btnBuscarMaquina');

		this.ctl.CampoMaquina.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodMaquina.setValue (rec.get ('codigo'));
			me.ctl.tbDescMaquina.setValue (rec.get ('descripcion'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoMaquina.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodMaquina.setValue ('');
			me.ctl.tbDescMaquina.setValue ('');
		};

		this.AgregarFiltro (new FiltroCampoBusqueda ('centro_trabajo', this, this.ctl.CampoCentroDeTrabajo, 'ct'));
		this.AgregarFiltro (new FiltroCampoBusqueda ('maquina', this, this.ctl.CampoMaquina, 'maq'));
		this.AgregarFiltro (new FiltroRangoFechas ('rango_fechas', this, 'tbFechaDesde', 'tbFechaHasta', 'desde', 'hasta'));
	},

	GetOnNuevoParamsEntrada: function (params) {
		return ManejadorDeVentanas.ReqFormularioWS (null);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioWS (item.get ('id'));
	}
});