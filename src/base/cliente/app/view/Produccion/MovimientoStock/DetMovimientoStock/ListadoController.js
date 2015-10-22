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

Ext.define ('Sistema.view.Produccion.MovimientoStock.DetMovimientoStock.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-movst-dmov-ListadoController',

	params: {
		formularioCreacion		: 'Sistema.view.Produccion.MovimientoStock.DetMovimientoStock.Formulario',
		tituloFormularioCreacion: 'Detalle Movimiento Stock',
		formularioEdicion		: 'Sistema.view.Produccion.MovimientoStock.DetMovimientoStock.Formulario',
		tituloFormularioEdicion	: 'Detalle Movimiento Stock',
		xtypeListado			: 'prod-movst-dmov-Listado',
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

	// Virtual. Devuelve el tipo de movimiento.
	GetTipoMovimiento: function () {
	},

	// Virtual.
	GetAlmacenOrigen: function () {
	},

	// Virtual.
	GetAlmacenDestino: function () {
	},

	HabilitarBotonNuevo: function () {
		this.getView ().down ("button[name='btnNuevo']").enable ();
	},

	DeshabilitarBotonNuevo: function () {
		this.getView ().down ("button[name='btnNuevo']").disable ();
	},

	GetOnNuevoParamsEntrada: function (params) {
		var me = this;
		var p = {
			modelo				: null,
			tipoMovimiento		: me.GetTipoMovimiento (),
			almacenOrigenId		: me.GetAlmacenOrigen (),
			almacenDestinoId	: me.GetAlmacenDestino ()
		};

		return p;
	},

	GetOnEditarParamsEntrada: function (item, params) {
		var me = this;
		var p = {
			modelo				: item,
			tipoMovimiento		: me.GetTipoMovimiento (),
			almacenOrigenId		: me.GetAlmacenOrigen (),
			almacenDestinoId	: me.GetAlmacenDestino ()
		};

		return p;
	}
});