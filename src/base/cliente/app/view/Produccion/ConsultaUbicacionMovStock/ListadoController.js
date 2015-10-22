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

Ext.define ('Sistema.view.Produccion.ConsultaUbicacionMovStock.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-cums-ListadoController',
    requires:[
    	'Sistema.view.Produccion.ConsultaUbicacionMovStock.ListadoGrillaStore'
    ],

	//
	// Asignacion de EventHandlers para los controles de la vista.
	//
	init: function () {
		ListadoControllerBase2.InyectarDependencia (this, 'Produccion:MovimientoStock');
		this.GetComponenteFoco = this._GetComponenteFoco;

		this.params = {
			formularioController: 'Server/Sysgran/Aplicacion/Modulos/Produccion/ConsultaUbicacionMovStock/FormularioController.php',
			nuevaEntidad		: '',
			editarEntidad		: '',
			storeGrilla			: 'Sistema.view.Produccion.ConsultaUbicacionMovStock.ListadoGrillaStore',
			xtypeListado		: 'prod-cums-Listado',
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
			"prod-cums-Listado": {
				render: this.onRender
			}
	   });
	},

    _GetComponenteFoco: function () {
    	return this.getView ().down ("textfield[name='tbCodProducto']");
    },

	SetupFiltros:function  () {
		var me = this;

		// Cargamos los componentes del listado.
		this.ctl.tbCodProducto		= this.getView ().down ("textfield[name='tbCodProducto']");
		this.ctl.tbDescProducto		= this.getView ().down ("textfield[name='tbDescProducto']");
		this.ctl.tbCodArea			= this.getView ().down ("textfield[name='tbCodArea']");
		this.ctl.tbDescArea			= this.getView ().down ("textfield[name='tbDescArea']");
		this.ctl.tbCodZona			= this.getView ().down ("textfield[name='tbCodZona']");
		this.ctl.tbDescZona			= this.getView ().down ("textfield[name='tbDescZona']");

		// Campo Producto
		this.ctl.CampoProducto = new CampoBusqueda ();
		this.ctl.CampoProducto.SetClaseModelo ('Sistema.view.Produccion.model.Producto');
		this.ctl.CampoProducto.SetClaseListado ('Sistema.view.Produccion.Producto.Listado');
		this.ctl.CampoProducto.SetClaseFormulario ('Sistema.view.Produccion.Producto.Formulario');
		this.ctl.CampoProducto.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/Producto/FormularioController.php');
		this.ctl.CampoProducto.SetController (this);
		this.ctl.CampoProducto.SetTextFieldCodigo ('tbCodProducto');
		this.ctl.CampoProducto.SetBtnBuscar ('btnBuscarProducto');

		this.ctl.CampoProducto.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodProducto.setValue (rec.get ('codigo'));
			me.ctl.tbDescProducto.setValue (rec.get ('descripcionCorta'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoProducto.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodProducto.setValue ('');
			me.ctl.tbDescProducto.setValue ('');
		};

		// Campo Area
		this.ctl.CampoArea = new CampoBusqueda ();
		this.ctl.CampoArea.SetClaseModelo ('Sistema.view.Produccion.model.AreaStock');
		this.ctl.CampoArea.SetClaseListado ('Sistema.view.Produccion.AreaStock.Listado');
		this.ctl.CampoArea.SetClaseFormulario ('Sistema.view.Produccion.AreaStock.Formulario');
		this.ctl.CampoArea.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/AreaStock/FormularioController.php');
		this.ctl.CampoArea.SetController (this);
		this.ctl.CampoArea.SetTextFieldCodigo ('tbCodArea');
		this.ctl.CampoArea.SetBtnBuscar ('btnBuscarArea');

		this.ctl.CampoArea.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodArea.setValue (rec.get ('codigo'));
			me.ctl.tbDescArea.setValue (rec.get ('descripcionCorta'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoArea.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodArea.setValue ('');
			me.ctl.tbDescArea.setValue ('');
		};

		// Campo Zona
		this.ctl.CampoZona = new CampoBusqueda ();
		this.ctl.CampoZona.SetClaseModelo ('Sistema.view.Produccion.model.ZonaStock');
		this.ctl.CampoZona.SetClaseListado ('Sistema.view.Produccion.ZonaStock.Listado');
		this.ctl.CampoZona.SetClaseFormulario ('Sistema.view.Produccion.ZonaStock.Formulario');
		this.ctl.CampoZona.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/ZonaStock/FormularioController.php');
		this.ctl.CampoZona.SetController (this);
		this.ctl.CampoZona.SetTextFieldCodigo ('tbCodZona');
		this.ctl.CampoZona.SetBtnBuscar ('btnBuscarZona');

		this.ctl.CampoZona.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodZona.setValue (rec.get ('codigo'));
			me.ctl.tbDescZona.setValue (rec.get ('descripcionCorta'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoZona.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodZona.setValue ('');
			me.ctl.tbDescZona.setValue ('');
		};

		this.AgregarFiltro (new FiltroCampoBusqueda ('producto', this, this.ctl.CampoProducto, 'prod'));
		this.AgregarFiltro (new FiltroCampoBusqueda ('area', this, this.ctl.CampoArea, 'area'));
		this.AgregarFiltro (new FiltroCampoBusqueda ('zona', this, this.ctl.CampoZona, 'zona'));
		this.AgregarFiltro (new FiltroParametro ('almacen', 'alm'));
		this.AgregarFiltro (new FiltroParametro ('ubicaciones_vacias', 'uv'));
	},

	GetOnNuevoParamsEntrada: function (params) {
		return ManejadorDeVentanas.ReqFormularioWS (null);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioWS (item.get ('id'));
	}
});