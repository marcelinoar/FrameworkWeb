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

Ext.define ('Sistema.view.Produccion.Operacion.Atributos.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-oper-att-ListadoController',

	params: {
		formularioCreacion		: 'Sistema.view.Produccion.Operacion.Atributos.Formulario',
		tituloFormularioCreacion: '',
		formularioEdicion		: 'Sistema.view.Produccion.Operacion.Atributos.Formulario',
		tituloFormularioEdicion	: '',
		xtypeListado			: 'prod-oper-att-Listado',
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
		ListadoDetalleControllerBase.InyectarDependencia (this, 'Produccion:Operacion');

	   	this.control({
			"grid": {
				afterrender: this.onGrillaAfterRender,
				celldblclick: this.onListadoGrillaCellDblClick
			},
			"button[name='btnNuevo']": {
				click: this.onBtnNuevoClick
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