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

Ext.define ('Sistema.view.Desarrollo.DetalleFormulario.CampoListado.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.des-fdet-cd-ListadoController',

	params: {
		formularioCreacion		: 'Sistema.view.Desarrollo.DetalleFormulario.CampoListado.Formulario',
		tituloFormularioCreacion: '',
		formularioEdicion		: 'Sistema.view.Desarrollo.DetalleFormulario.CampoListado.Formulario',
		tituloFormularioEdicion	: '',
		xtypeListado			: 'des-fdet-cd-Listado',
		ventanaMaximizable		: true,
		ventanaMaximized		: false,
		ventanaModal			: true,
		verColEditar			: true,
		verColBorrar			: true
	},

	//
	// Asignacion de EventHandlers para los controles de la vista.
	//
	init: function () {
		ListadoDetalleControllerBase.InyectarDependencia (this,  'Desarrollo:DetalleFormulario');

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
		return ManejadorDeVentanas.ReqFormularioDetalle (null);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioDetalle (item);
	}
});