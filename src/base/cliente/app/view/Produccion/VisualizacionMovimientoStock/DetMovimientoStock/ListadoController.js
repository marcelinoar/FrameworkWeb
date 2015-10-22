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

Ext.define ('Sistema.view.Produccion.VisualizacionMovimientoStock.DetMovimientoStock.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-vmovst-dmov-ListadoController',

	params: {
		formularioCreacion		: 'Sistema.view.Produccion.VisualizacionMovimientoStock.DetMovimientoStock.Formulario',
		tituloFormularioCreacion: 'Detalle Movimiento Stock',
		formularioEdicion		: 'Sistema.view.Produccion.VisualizacionMovimientoStock.DetMovimientoStock.Formulario',
		tituloFormularioEdicion	: 'Detalle Movimiento Stock',
		xtypeListado			: 'prod-vmovst-dmov-Listado',
		ventanaMaximizable		: false,
		ventanaMaximized		: false,
		ventanaModal			: true,
		verColEditar			: true,
		verColBorrar			: true
	},

	//
	// Asignacion de EventHandlers para los controles de la vista.
	//
	init: function () {
		ListadoDetalleControllerBase.InyectarDependencia (this, 'Produccion:MovimientoStock');

	   	this.control({
			"grid": {
				afterrender: this.onGrillaAfterRender,
				celldblclick: this.onListadoGrillaCellDblClick
			},
			"button[name='btnNuevo']": {
				click: this.onBtnNuevoClick
			},
			"button[name='btnRecargarListado']": {
				click: this.onBtnRecargarListadoClick
			}
	   });
	},

    //
    // Virtual. Permite hacer que el formulario padre recargue el registro.
    //
    RecargarFormularioPadre: function () {
    },

    //
    // Define el texto a mostrar en la columna 'Estado' de la grilla.
    //
    MostrarEstadoDetalle: function (val) {
    	if (val == '') {
    		return '<span style="color:' + "#73b51e" + ';">Confirmado</span>';

    	} else {
    		return '<span style="color:' + "#cf4c35" + ';">Anulado</span>';
    	}
    },

	GetOnNuevoParamsEntrada: function (params) {
		return ManejadorDeVentanas.ReqFormularioDetalle (null);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		// Le contravandeo dentro del modelo la funcion que hace que el formulario padre se recargue.
		item.RecargarFormularioPadre = this.RecargarFormularioPadre;

		return ManejadorDeVentanas.ReqFormularioDetalle (item);
	}
});