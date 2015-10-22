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

Ext.define ('Sistema.view.Produccion.OrdenDeTrabajo.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-ot-ListadoController',
	requires:[
		'Sistema.view.Produccion.OrdenDeTrabajo.ListadoGrillaStore',
		'Sistema.view.Produccion.store.StoreEstadoOT'
	],

	//
	// Asignacion de EventHandlers para los controles de la vista.
	//
	init: function () {
		ListadoControllerBase2.InyectarDependencia (this, 'Produccion:OrdenDeTrabajo');
		this.params = {
			formularioController: 'Server/Sysgran/Aplicacion/Modulos/Produccion/OrdenDeTrabajo/FormularioController.php',
			nuevaEntidad		: 'Sistema.view.Produccion.OrdenDeTrabajo.Formulario',
			editarEntidad		: 'Sistema.view.Produccion.OrdenDeTrabajo.Formulario',
			storeGrilla			: 'Sistema.view.Produccion.OrdenDeTrabajo.ListadoGrillaStore',
			xtypeListado		: 'prod-ot-Listado',
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
			"prod-ot-Listado": {
				render: this.onRender
			}
	   });
	},

	SetupFiltros: function () {
		var me = this;

		// Cargamos los componentes del listado.
		this.ctl.tbCodCentroDeTrabajo		= this.getView ().down ("textfield[name='tbCodCentroDeTrabajo']");
		this.ctl.tbDescCentroDeTrabajo		= this.getView ().down ("textfield[name='tbDescCentroDeTrabajo']");
		this.ctl.tbCodProducto				= this.getView ().down ("textfield[name='tbCodProducto']");
		this.ctl.tbDescProducto				= this.getView ().down ("textfield[name='tbDescProducto']");
		this.ctl.tbDescUM					= this.getView ().down ("textfield[name='tbDescUM']");
		this.ctl.tbCodUM					= this.getView ().down ("textfield[name='tbCodUM']");
		this.ctl.tbCodPedidoDeVentas		= this.getView ().down ("textfield[name='tbCodPedidoDeVentas']");
		this.ctl.tbDescPedidoDeVentas		= this.getView ().down ("textfield[name='tbDescPedidoDeVentas']");
		this.ctl.tbCodLote					= this.getView ().down ("textfield[name='tbCodLote']");

		// Campo Lote de fabricacion
		this.ctl.CampoLote = new CampoBusqueda ();
		this.ctl.CampoLote.SetClaseModelo ('Sistema.view.Produccion.model.LoteDeFabricacion');
		this.ctl.CampoLote.SetClaseListado ('Sistema.view.Produccion.LoteDeFabricacion.Listado');
		this.ctl.CampoLote.SetClaseFormulario ('Sistema.view.Produccion.LoteDeFabricacion.Formulario');
		this.ctl.CampoLote.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/LoteDeFabricacion/FormularioController.php');
		this.ctl.CampoLote.SetController (this);
		this.ctl.CampoLote.SetTextFieldCodigo ('tbCodLote');
		this.ctl.CampoLote.SetBtnBuscar ('btnBuscarLote');

		this.ctl.CampoLote.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodLote.setValue (rec.get ('id'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoLote.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodLote.setValue ('');
		};

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

		// Campo Unidad de Medida
		this.ctl.CampoUM= new CampoBusqueda ();
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

		this.AgregarFiltro (new FiltroCombo ('estado', this, 'cbEstadoId', 'estado', 'Sistema.view.Produccion.store.StoreEstadoOT'));
		this.AgregarFiltro (new FiltroTexto ('comentario', this, 'cbComentarios', 'tbComentarios', 'tcomentario', 'comentario'));
		this.AgregarFiltro (new FiltroCampoBusqueda ('centro_trabajo', this, this.ctl.CampoCentroDeTrabajo, 'centroTrabajo'));
		this.AgregarFiltro (new FiltroCampoBusqueda ('producto', this, this.ctl.CampoProducto, 'producto'));
		this.AgregarFiltro (new FiltroCampoBusqueda ('unidad_de_medida', this, this.ctl.CampoUM, 'um'));
		this.AgregarFiltro (new FiltroCampoBusqueda ('lote', this, this.ctl.CampoLote, 'lote'));
		this.AgregarFiltro (new FiltroRangoNumerico ('cantidad', this, 'tbCantidadDesde', 'tbCantidadHasta', 'cant_desde', 'cant_hasta'));
		this.AgregarFiltro (new FiltroCodigoNumerico ('codigo', this, 'tbCodigo', 'codigo'));
	},

	GetOnNuevoParamsEntrada: function (params) {
		return ManejadorDeVentanas.ReqFormularioWS (null);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioWS (item.get ('id'));
	}
});