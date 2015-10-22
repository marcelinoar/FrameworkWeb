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

Ext.define ('Sistema.view.Produccion.OrdenDeTrabajo.ValeDeFabricacion.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-ot-vf-ListadoController',

	params: {
		formularioCreacion		: '',
		tituloFormularioCreacion: '',
		formularioEdicion		: 'Sistema.view.Produccion.ValeDeFabricacion.Formulario',
		tituloFormularioEdicion	: 'Vale de Fabricacion - Orden de Trabajo',
		xtypeListado			: 'prod-ot-vf-Listado',
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
		ListadoDetalleControllerBase.InyectarDependencia (this, 'Produccion:OrdenDeTrabajo');

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

	GetOnNuevoParamsEntrada: function (params) {
		return ManejadorDeVentanas.ReqFormularioWS (null);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioWS (item.get ('id'));
	}
});