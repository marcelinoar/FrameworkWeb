/**************************************************************************************************
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Desarrollo.DetalleFormulario.CampoFormulario.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.des-fdet-cf-ListadoController',

	params: {
		formularioCreacion		: 'Sistema.view.Desarrollo.DetalleFormulario.CampoFormulario.Formulario',
		tituloFormularioCreacion: '',
		formularioEdicion		: 'Sistema.view.Desarrollo.DetalleFormulario.CampoFormulario.Formulario',
		tituloFormularioEdicion	: '',
		xtypeListado			: 'des-fdet-cf-Listado',
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