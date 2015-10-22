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

Ext.define ('Sistema.view.Produccion.Producto.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-producto-ListadoController',
    requires:[
    	'Sistema.view.Produccion.Producto.ListadoGrillaStore'
    ],

	//
	// Asignacion de EventHandlers para los controles de la vista.
	//
	init: function () {
		ListadoControllerBase2.InyectarDependencia (this, 'Produccion:Producto');
		this.params = {
			formularioController: 'Server/Sysgran/Aplicacion/Modulos/Produccion/Producto/FormularioController.php',
			nuevaEntidad		: 'Sistema.view.Produccion.Producto.Formulario',
			editarEntidad		: 'Sistema.view.Produccion.Producto.Formulario',
			storeGrilla			: 'Sistema.view.Produccion.Producto.ListadoGrillaStore',
			xtypeListado		: 'prod-producto-Listado',
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
			"button[name='btnNuevo']": {
				click: this.onBtnNuevoClick
			},
			"button[name='btnRecargarListado']": {
				click: this.onBtnRecargarListadoClick
			},
			"button[name='btnLimpiarFiltros']": {
				click: this.onBtnLimpiarFiltrosClick
			},
			"button[name='btnBuscarLineaDeProduccion']": {
				click: this.onBtnBuscarLineaDeProduccionClick
			},
			"textfield[name='tbCodLineaDeProduccion']": {
				specialkey: this.onTbCodLineaDeProduccionSpecialKey,
				change: this.tbChangeToUpperCase
			},
			"button[name='btnBuscarUMStock']": {
				click: this.onBtnBuscarUMStockClick
			},
			"textfield[name='tbCodUMStock']": {
				specialkey: this.onTbCodUMStockSpecialKey,
				change: this.tbChangeToUpperCase
			},
			"button[name='btnBuscar']": {
				click: this.onBtnBuscarClick
			},
			"button[name='btnAceptar']": {
				click: this.onBtnAceptarClick
			},
			"button[name='btnCancelar']": {
				click: this.onBtnCancelarClick
			},
			"prod-producto-Listado": {
				render: this.onRender
			}
	   });
	},

	GetOnNuevoParamsEntrada: function (params) {
		return ManejadorDeVentanas.ReqFormularioWS (null);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioWS (item.get ('id'));
	},

	// --------------------------------------------------------------

	onBtnBuscarLineaDeProduccionClick: function () {
		this.ctl.CampoLineaDeProduccion.AbrirVentanaBusqueda ();
	},

	onTbCodLineaDeProduccionSpecialKey: function (f, e) {
    	if (e.getKey () == e.ENTER || e.getKey () == e.TAB) {
    		this.ctl.CampoLineaDeProduccion.BuscarPorCodigo (f.value);
    	}
	},

	onBtnBuscarUMStockClick: function () {
		this.ctl.CampoUMStock.AbrirVentanaBusqueda ();
	},

	onTbCodUMStockSpecialKey: function (f, e) {
    	if (e.getKey () == e.ENTER || e.getKey () == e.TAB) {
    		this.ctl.CampoUMStock.BuscarPorCodigo (f.value);
    	}
	},

	//
	// Se inicializan los controles de los filtros.
	//
	SetupFiltros: function () {
		var me = this;

		// Cargamos los componentes del listado.
		this.ctl.tbCodLineaDeProduccion		= this.getView ().down ("textfield[name='tbCodLineaDeProduccion']");
		this.ctl.tbDescLineaDeProduccion 	= this.getView ().down ("textfield[name='tbDescLineaDeProduccion']");
		this.ctl.tbCodUMStock				= this.getView ().down ("textfield[name='tbCodUMStock']");
		this.ctl.tbDescUMStock				= this.getView ().down ("textfield[name='tbDescUMStock']");

		// Campo Linea de Produccion.
		this.ctl.CampoLineaDeProduccion = new CampoBusqueda ();
		this.ctl.CampoLineaDeProduccion.SetClaseModelo ('Sistema.view.Produccion.model.LineaDeProduccion');
		this.ctl.CampoLineaDeProduccion.SetClaseListado ('Sistema.view.Produccion.LineaDeProduccion.Listado');
		this.ctl.CampoLineaDeProduccion.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/LineaDeProduccion/FormularioController.php');

		this.ctl.CampoLineaDeProduccion.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodLineaDeProduccion.setValue (rec.get ('codigo'));
			me.ctl.tbDescLineaDeProduccion.setValue (rec.get ('descripcionCorta'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoLineaDeProduccion.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodLineaDeProduccion.setValue ('');
			me.ctl.tbDescLineaDeProduccion.setValue ('');
		};

		// Campo Unidad de Medida Stock.
		this.ctl.CampoUMStock = new CampoBusqueda ();
		this.ctl.CampoUMStock.SetClaseModelo ('Sistema.view.Produccion.model.UnidadDeMedida');
		this.ctl.CampoUMStock.SetClaseListado ('Sistema.view.Produccion.UnidadDeMedida.Listado');
		this.ctl.CampoUMStock.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/UnidadDeMedida/FormularioController.php');

		this.ctl.CampoUMStock.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodUMStock.setValue (rec.get ('codigo'));
			me.ctl.tbDescUMStock.setValue (rec.get ('descripcionCorta'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoUMStock.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodUMStock.setValue ('');
			me.ctl.tbDescUMStock.setValue ('');
		};

		// Cargamos los filtros del listado.

		// Permite filtrar los productos por su clasificacion de usuario.
		this.AgregarFiltro (new FiltroCombo ('tipo_usuario', this, 'cbTipoDeProductoId', 'tipo_usuario', 'Sistema.view.Produccion.store.StoreTipoDeProducto'));
		this.AgregarFiltro (new FiltroCombo ('agrupador_primario', this, 'cbAgrupadorProductoPrimarioId', 'agrupadorPrimario', 'Sistema.view.Produccion.store.StoreAgrupadorProductoPrimario'));
		this.AgregarFiltro (new FiltroCombo ('agrupador_secundario', this, 'cbAgrupadorProductoSecundarioId', 'agrupadorSecundario', 'Sistema.view.Produccion.store.StoreAgrupadorProductoSecundario'));
		this.AgregarFiltro (new FiltroCombo ('agrupador_terciario', this, 'cbAgrupadorProductoTerciarioId', 'agrupadorTerciario', 'Sistema.view.Produccion.store.StoreAgrupadorProductoTerciario'));
		this.AgregarFiltro (new FiltroTexto ('codigo', this, 'cbCodigo', 'tbCodigo', 'tcodigo', 'codigo'));
		this.AgregarFiltro (new FiltroTexto ('descripcion', this, 'cbDescripcion', 'tbDescripcion', 'ftbusqueda', 'ftvalor'));
		this.AgregarFiltro (new FiltroCampoBusqueda ('linea_produccion', this, this.ctl.CampoLineaDeProduccion, 'lineaDeProduccion'));
		this.AgregarFiltro (new FiltroCampoBusqueda ('unidad_stock', this, this.ctl.CampoUMStock, 'umStock'));
		this.AgregarFiltro (new FiltroRangoAtributoNumerico ('valor_atributo', this, 'cbAtributoId', 'tbAtributoDesde', 'tbAtributoHasta', 'fatributoId', 'fdesde', 'fhasta'));

		// Permite filtrar los productos por su clasificacion de sistema.
		this.AgregarFiltro (new FiltroParametro ('tipo_sistema', 'tipo_sistema'));
	}
});