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

Ext.define ('Sistema.view.Produccion.BusquedaUbicacion.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-bubic-ListadoController',
    requires:[
    	'Sistema.view.Produccion.BusquedaUbicacion.ListadoGrillaStore'
    ],

	//
	// Asignacion de EventHandlers para los controles de la vista.
	//
	init: function () {
		// DEBUG Cambiar el codigo de permisos.
		ListadoControllerBase2.InyectarDependencia (this, 'Produccion:TipoMovimientoStock');
		this.params = {
			formularioController: 'Server/Sysgran/Aplicacion/Modulos/Produccion/BusquedaUbicacion/FormularioController.php',
			nuevaEntidad		: '',
			editarEntidad		: 'Sistema.view.Produccion.BusquedaUbicacion.Formulario',
			storeGrilla			: 'Sistema.view.Produccion.BusquedaUbicacion.ListadoGrillaStore',
			xtypeListado		: 'prod-bubic-Listado',
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
			"prod-bubic-Listado": {
				render: this.onRender
			}
	   });
	},

	SetupFiltros: function () {
		var me = this;
/*
		// Cargamos los componentes del listado.
		this.ctl.tbCodCentroDeTrabajo	= this.getView ().down ("textfield[name='tbCodCentroDeTrabajo']");
		this.ctl.tbDescCentroDeTrabajo	= this.getView ().down ("textfield[name='tbDescCentroDeTrabajo']");
		this.ctl.tbCodMaquina			= this.getView ().down ("textfield[name='tbCodMaquina']");
		this.ctl.tbDescMaquina			= this.getView ().down ("textfield[name='tbDescMaquina']");
		this.ctl.tbCodUsuario			= this.getView ().down ("textfield[name='tbCodUsuario']");
		this.ctl.tbDescUsuario			= this.getView ().down ("textfield[name='tbDescUsuario']");

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

		// Campo Usuario
		this.ctl.CampoUsuario = new CampoBusqueda ();
		this.ctl.CampoUsuario.SetClaseModelo ('Sistema.view.Sistema.model.Usuario');
		this.ctl.CampoUsuario.SetClaseListado ('Sistema.view.Sistema.Usuario.Listado');
		this.ctl.CampoUsuario.SetClaseFormulario ('Sistema.view.Sistema.Usuario.Formulario');
		this.ctl.CampoUsuario.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Sistema/Usuario/FormularioController.php');
		this.ctl.CampoUsuario.SetController (this);
		this.ctl.CampoUsuario.SetTextFieldCodigo ('tbCodUsuario');
		this.ctl.CampoUsuario.SetBtnBuscar ('btnBuscarUsuario');

		this.ctl.CampoUsuario.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodUsuario.setValue (rec.get ('id'));
			me.ctl.tbDescUsuario.setValue (rec.get ('loginName'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoUsuario.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodUsuario.setValue ('');
			me.ctl.tbDescUsuario.setValue ('');
		};

		this.AgregarFiltro (new FiltroCampoBusqueda ('centro_trabajo', this, this.ctl.CampoCentroDeTrabajo, 'ct'));
		this.AgregarFiltro (new FiltroCampoBusqueda ('usuario', this, this.ctl.CampoUsuario, 'usu'));
		this.AgregarFiltro (new FiltroCampoBusqueda ('maquina', this, this.ctl.CampoMaquina, 'maq'));
		this.AgregarFiltro (new FiltroRangoFechas ('rango_fechas', this, 'tbFechaDesde', 'tbFechaHasta', 'desde', 'hasta'));
		this.AgregarFiltro (new FiltroCodigoNumerico ('codigo', this, 'tbCodigo', 'codigo'));
		this.AgregarFiltro (new FiltroTexto ('comentario', this, 'cbComentarios', 'tbComentarios', 'tcomentario', 'comentario'));
*/
	},

	GetOnNuevoParamsEntrada: function (params) {
		return ManejadorDeVentanas.ReqFormularioWS (null);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioWS (item.get ('id'));
	}
});