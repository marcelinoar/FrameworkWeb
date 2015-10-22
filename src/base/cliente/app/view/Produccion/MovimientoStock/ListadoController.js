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

Ext.define ('Sistema.view.Produccion.MovimientoStock.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-movst-ListadoController',
	requires:[
		'Sistema.view.Produccion.MovimientoStock.ListadoGrillaStore'
	],

	//
	// Asignacion de EventHandlers para los controles de la vista.
	//
	init: function () {
		ListadoControllerBase2.InyectarDependencia (this, 'Produccion:MovimientoStock');
		this.params = {
			nuevaEntidad		: '',
			editarEntidad		: 'Sistema.view.Produccion.VisualizacionMovimientoStock.Formulario',
			storeGrilla			: 'Sistema.view.Produccion.MovimientoStock.ListadoGrillaStore',
			xtypeListado		: 'prod-movst-Listado',
			ventanaMaximizable	: true,
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
			"prod-movst-Listado": {
				render: this.onRender
			}
	   });
	},

    //
    // Define el texto a mostrar en la columna 'Estado' de la grilla.
    //
    MostrarEstadoMovimiento: function (val) {
    	if (val == '') {
    		return '<span style="color:' + "#73b51e" + ';">Confirmado</span>';

    	} else {
    		return '<span style="color:' + "#cf4c35" + ';">Anulado</span>';
    	}
    },

	SetupFiltros: function () {
	},

	GetOnNuevoParamsEntrada: function (params) {
		return ManejadorDeVentanas.ReqFormularioWS (null);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioWS (item.get ('movimientoStockId'));
	}
});