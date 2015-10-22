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

Ext.define ('Sistema.view.Produccion.TipoMovimientoStock.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-tmov-ListadoController',
	requires:[
		'Sistema.view.Produccion.TipoMovimientoStock.ListadoGrillaStore'
	],

	//
	// Asignacion de EventHandlers para los controles de la vista.
	//
	init: function () {
		ListadoControllerBase2.InyectarDependencia (this, 'Produccion:TipoMovimientoStock');
		this.params = {
			nuevaEntidad		: 'Sistema.view.Produccion.TipoMovimientoStock.Formulario',
			editarEntidad		: 'Sistema.view.Produccion.TipoMovimientoStock.Formulario',
			storeGrilla			: 'Sistema.view.Produccion.TipoMovimientoStock.ListadoGrillaStore',
			xtypeListado		: 'prod-tmov-Listado',
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
			"prod-tmov-Listado": {
				render: this.onRender
			}
	   });
	},

	SetupFiltros: function () {
		this.AgregarFiltro (new FiltroTexto ('codigo', this, 'cbCodigo', 'tbCodigo', 'tcodigo', 'codigo'));
		this.AgregarFiltro (new FiltroTexto ('descripcion', this, 'cbDescripcion', 'tbDescripcion', 'tdescripcion', 'descripcion'));
		this.AgregarFiltro (new FiltroCheckBox ('origen_nulo', this, 'ckOrigenNull', 'origen_nulo'));
		this.AgregarFiltro (new FiltroCheckBox ('destino_nulo', this, 'ckDestinoNull', 'destino_nulo'));
		this.AgregarFiltro (new FiltroCheckBox ('lote_fabricacion', this, 'ckLoteFabricacion', 'lote_fabricacion'));
		this.AgregarFiltro (new FiltroCheckBox ('lote_compras', this, 'ckLoteCompras', 'lote_compras'));
		this.AgregarFiltro (new FiltroCheckBox ('orden_de_trabajo', this, 'ckOrdenDeTrabajo', 'ot'));
		this.AgregarFiltro (new FiltroCheckBox ('formula_fabricacion', this, 'ckFormulaDeFabricacion', 'formula_fabricacion'));
		this.AgregarFiltro (new FiltroCheckBox ('pedido_ventas', this, 'ckPedidoDeVentas', 'pedido_ventas'));
		this.AgregarFiltro (new FiltroCheckBox ('orden_de_compra', this, 'ckOrdenDeCompra', 'oc'));
	},

	GetOnNuevoParamsEntrada: function (params) {
		return ManejadorDeVentanas.ReqFormularioWS (null);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioWS (item.get ('id'));
	}
});