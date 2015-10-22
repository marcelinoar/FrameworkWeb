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

Ext.define ('Sistema.view.Produccion.UbicacionAlmacen.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-ubic-ListadoController',
	requires:[
		'Sistema.view.Produccion.UbicacionAlmacen.ListadoGrillaStore'
	],

	//
	// Asignacion de EventHandlers para los controles de la vista.
	//
	init: function () {
		ListadoControllerBase2.InyectarDependencia (this, 'Produccion:UbicacionAlmacen');
		this.params = {
			formularioController: 'Server/Sysgran/Aplicacion/Modulos/Produccion/UbicacionAlmacen/FormularioController.php',
			nuevaEntidad		: 'Sistema.view.Produccion.UbicacionAlmacen.Formulario',
			editarEntidad		: 'Sistema.view.Produccion.UbicacionAlmacen.Formulario',
			storeGrilla			: 'Sistema.view.Produccion.UbicacionAlmacen.ListadoGrillaStore',
			xtypeListado		: 'prod-ubic-Listado',
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
			"prod-ubic-Listado": {
				render: this.onRender
			}
	   });
	},

	SetupFiltros: function () {
		var me = this;

		// Cargamos los componentes del listado.
		this.ctl.tbCodPlanta		= this.getView ().down ("textfield[name='tbCodPlanta']");
		this.ctl.tbDescPlanta		= this.getView ().down ("textfield[name='tbDescPlanta']");
		this.ctl.tbCodAlmacen		= this.getView ().down ("textfield[name='tbCodAlmacen']");
		this.ctl.tbDescAlmacen		= this.getView ().down ("textfield[name='tbDescAlmacen']");
		this.ctl.tbCodZona		= this.getView ().down ("textfield[name='tbCodZona']");
		this.ctl.tbDescZona		= this.getView ().down ("textfield[name='tbDescZona']");
		this.ctl.tbCodArea		= this.getView ().down ("textfield[name='tbCodArea']");
		this.ctl.tbDescArea		= this.getView ().down ("textfield[name='tbDescArea']");

		// Campo Planta
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

		// Campo Almacen
		this.ctl.CampoAlmacen = new CampoBusqueda ();
		this.ctl.CampoAlmacen.SetClaseModelo ('Sistema.view.Produccion.model.Almacen');
		this.ctl.CampoAlmacen.SetClaseListado ('Sistema.view.Produccion.Almacen.Listado');
		this.ctl.CampoAlmacen.SetClaseFormulario ('Sistema.view.Produccion.Almacen.Formulario');
		this.ctl.CampoAlmacen.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/Almacen/FormularioController.php');
		this.ctl.CampoAlmacen.SetController (this);
		this.ctl.CampoAlmacen.SetTextFieldCodigo ('tbCodAlmacen');
		this.ctl.CampoAlmacen.SetBtnBuscar ('btnBuscarAlmacen');

		this.ctl.CampoAlmacen.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodAlmacen.setValue (rec.get ('codigo'));
			me.ctl.tbDescAlmacen.setValue (rec.get ('descripcionCorta'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoAlmacen.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodAlmacen.setValue ('');
			me.ctl.tbDescAlmacen.setValue ('');
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
			me.ctl.tbDescZona.setValue (rec.get ('descripcion'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoZona.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodZona.setValue ('');
			me.ctl.tbDescZona.setValue ('');
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
			me.ctl.tbDescArea.setValue (rec.get ('descripcion'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoArea.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodArea.setValue ('');
			me.ctl.tbDescArea.setValue ('');
		};

		this.AgregarFiltro (new FiltroCampoBusqueda ('planta', this, this.ctl.CampoPlanta, 'planta'));
		this.AgregarFiltro (new FiltroCampoBusqueda ('almacen', this, this.ctl.CampoAlmacen, 'almacen'));
		this.AgregarFiltro (new FiltroCampoBusqueda ('zona', this, this.ctl.CampoZona, 'zona'));
		this.AgregarFiltro (new FiltroCampoBusqueda ('area', this, this.ctl.CampoArea, 'area'));
		this.AgregarFiltro (new FiltroTexto ('codigo', this, 'cbCodigo', 'tbCodigo', 'tcodigo', 'codigo'));
		this.AgregarFiltro (new FiltroTexto ('descripcion', this, 'cbDescripcion', 'tbDescripcion', 'tdesc', 'desc'));
	},

	GetOnNuevoParamsEntrada: function (params) {
		return ManejadorDeVentanas.ReqFormularioWS (null);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioWS (item.get ('id'));
	}
});