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

Ext.define ('Sistema.view.Sistema.Grupo.Usuario.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sis-grp-usu-ListadoController',

	params: {
		formularioCreacion		: 'Sistema.view.Sistema.Usuario.Listado',
		tituloFormularioCreacion: '',
		formularioEdicion		: 'Sistema.view.Sistema.Usuario.Formulario',
		tituloFormularioEdicion	: '',
		xtypeListado			: 'sis-grp-usu-Listado',
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
		ListadoDetalleControllerBase.InyectarDependencia (this, 'Sistema:Grupo');

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
		return ManejadorDeVentanas.ReqListadoWS (true, false, null, ModoEjecucionListado.Seleccion, true, true);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioWS (item.get ('id'));
	}
});