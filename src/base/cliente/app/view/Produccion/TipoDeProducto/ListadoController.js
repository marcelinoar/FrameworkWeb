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

Ext.define ('Sistema.view.Produccion.TipoDeProducto.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-tprod-ListadoController',
    requires:[
    	'Sistema.view.Produccion.TipoDeProducto.ListadoGrillaStore'
    ],

	//
	// Asignacion de EventHandlers para los controles de la vista.
	//
	init: function () {
		ListadoControllerBase2.InyectarDependencia (this, 'Produccion:TipoDeProducto');
		this.params = {
			formularioController: 'Server/Sysgran/Aplicacion/Modulos/Produccion/TipoDeProducto/FormularioController.php',
			nuevaEntidad		: 'Sistema.view.Produccion.TipoDeProducto.Formulario',
			editarEntidad		: 'Sistema.view.Produccion.TipoDeProducto.Formulario',
			storeGrilla			: 'Sistema.view.Produccion.TipoDeProducto.ListadoGrillaStore',
			xtypeListado		: 'prod-tprod-Listado',
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
			"prod-tprod-Listado": {
				render: this.onRender
			}
	   });
	},

	SetupFiltros: function () {
		this.AgregarFiltro (new FiltroCodigoNumerico ('codigo', this, 'tbCodigo', 'codigo'));
		this.AgregarFiltro (new FiltroTexto ('nombre', this, 'cbNombre', 'tbNombre', 'tnom', 'nom'));
		this.AgregarFiltro (new FiltroCheckBox ('es_ventas', this, 'ckVentas', 'esVentas'));
		this.AgregarFiltro (new FiltroCheckBox ('es_fabricacion', this, 'ckFabricacion', 'esFabricacion'));
		this.AgregarFiltro (new FiltroCheckBox ('es_compras', this, 'ckCompras', 'esCompras'));
	},

	GetOnNuevoParamsEntrada: function (params) {
		return ManejadorDeVentanas.ReqFormularioWS (null);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioWS (item.get ('id'));
	}
});