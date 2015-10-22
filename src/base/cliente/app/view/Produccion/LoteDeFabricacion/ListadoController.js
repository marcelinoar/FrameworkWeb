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

Ext.define ('Sistema.view.Produccion.LoteDeFabricacion.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-lote-ListadoController',
	requires:[
		'Sistema.view.Produccion.LoteDeFabricacion.ListadoGrillaStore'
	],

	//
	// Asignacion de EventHandlers para los controles de la vista.
	//
	init: function () {
		ListadoControllerBase2.InyectarDependencia (this, 'Produccion:LoteDeFabricacion');
		this.params = {
			formularioController: 'Server/Sysgran/Aplicacion/Modulos/Produccion/LoteDeFabricacion/FormularioController.php',
			nuevaEntidad		: 'Sistema.view.Produccion.LoteDeFabricacion.Formulario',
			editarEntidad		: 'Sistema.view.Produccion.LoteDeFabricacion.Formulario',
			storeGrilla			: 'Sistema.view.Produccion.LoteDeFabricacion.ListadoGrillaStore',
			xtypeListado		: 'prod-lote-Listado',
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
			"prod-lote-Listado": {
				render: this.onRender
			}
	   });
	},

	SetupFiltros: function () {
		var me = this;

		// Cargamos los componentes del listado.
		this.ctl.tbCodCentroDeTrabajo		= this.getView ().down ("textfield[name='tbCodCentroDeTrabajo']");
		this.ctl.tbDescCentroDeTrabajo		= this.getView ().down ("textfield[name='tbDescCentroDeTrabajo']");
		this.ctl.tbCodProductoSecundario	= this.getView ().down ("textfield[name='tbCodProductoSecundario']");
		this.ctl.tbDescProductoSecundario	= this.getView ().down ("textfield[name='tbDescProductoSecundario']");
		this.ctl.tbCodOrdenDeTrabajo		= this.getView ().down ("textfield[name='tbCodOrdenDeTrabajo']");
		this.ctl.tbDescOrdenDeTrabajo		= this.getView ().down ("textfield[name='tbDescOrdenDeTrabajo']");

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

		// Campo Producto
		this.ctl.CampoProducto = new CampoBusqueda ();
		this.ctl.CampoProducto.SetClaseModelo ('Sistema.view.Produccion.model.Producto');
		this.ctl.CampoProducto.SetClaseListado ('Sistema.view.Produccion.Producto.Listado');
		this.ctl.CampoProducto.SetClaseFormulario ('Sistema.view.Produccion.Producto.Formulario');
		this.ctl.CampoProducto.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/Producto/FormularioController.php');
		this.ctl.CampoProducto.SetController (this);
		this.ctl.CampoProducto.SetTextFieldCodigo ('tbCodProductoSecundario');
		this.ctl.CampoProducto.SetBtnBuscar ('btnBuscarProductoSecundario');

		this.ctl.CampoProducto.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodProductoSecundario.setValue (rec.get ('codigo'));
			me.ctl.tbDescProductoSecundario.setValue (rec.get ('descripcionCorta'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoProducto.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodProductoSecundario.setValue ('');
			me.ctl.tbDescProductoSecundario.setValue ('');
		};

		// Campo Orden De Trabajo
		this.ctl.CampoOrdenDeTrabajo= new CampoBusqueda ();
		this.ctl.CampoOrdenDeTrabajo.SetClaseModelo ('Sistema.view.Produccion.model.OrdenDeTrabajo');
		this.ctl.CampoOrdenDeTrabajo.SetClaseListado ('Sistema.view.Produccion.OrdenDeTrabajo.Listado');
		this.ctl.CampoOrdenDeTrabajo.SetClaseFormulario ('Sistema.view.Produccion.OrdenDeTrabajo.Formulario');
		this.ctl.CampoOrdenDeTrabajo.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/OrdenDeTrabajo/FormularioController.php');
		this.ctl.CampoOrdenDeTrabajo.SetController (this);
		this.ctl.CampoOrdenDeTrabajo.SetTextFieldCodigo ('tbCodOrdenDeTrabajo');
		this.ctl.CampoOrdenDeTrabajo.SetBtnBuscar ('btnBuscarOrdenDeTrabajo');

		this.ctl.CampoOrdenDeTrabajo.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodOrdenDeTrabajo.setValue (rec.get ('id'));
			me.ctl.tbDescOrdenDeTrabajo.setValue (rec.get ('producto').codigo);
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoOrdenDeTrabajo.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodOrdenDeTrabajo.setValue ('');
			me.ctl.tbDescOrdenDeTrabajo.setValue ('');
		};

		this.AgregarFiltro (new FiltroTexto ('comentario', this, 'cbComentarios', 'tbComentarios', 'tcomentarios', 'comentarios'));
		this.AgregarFiltro (new FiltroCampoBusqueda ('centro_trabajo', this, this.ctl.CampoCentroDeTrabajo, 'centroTrabajo'));
		this.AgregarFiltro (new FiltroCampoBusqueda ('producto', this, this.ctl.CampoProducto, 'producto'));
		this.AgregarFiltro (new FiltroCampoBusqueda ('orden_de_trabajo', this, this.ctl.CampoOrdenDeTrabajo, 'ot'));
		this.AgregarFiltro (new FiltroCodigoNumerico ('codigo', this, 'tbCodigo', 'codigo'));
	},

	GetOnNuevoParamsEntrada: function (params) {
		return ManejadorDeVentanas.ReqFormularioWS (null);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioWS (item.get ('id'));
	}
});