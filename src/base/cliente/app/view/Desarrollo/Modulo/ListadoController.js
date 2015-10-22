/**************************************************************************************************
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Desarrollo.Modulo.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.des-mod-ListadoController',

	//
	// Asignacion de EventHandlers para los controles de la vista.
	//
	init: function () {
		ListadoControllerBase.InyectarDependencia (this, 'Desarrollo:Modulo');
		this.params = {
			comboFiltrosUrl		: 'Server/Sysgran/Aplicacion/Modulos/Desarrollo/Modulo/ListadoController.php',
			nuevaEntidad		: 'Sistema.view.Desarrollo.Modulo.Formulario',
			editarEntidad		: 'Sistema.view.Desarrollo.Modulo.Formulario',
			storeGrilla			: 'Sistema.view.Desarrollo.Modulo.ListadoGrillaStore',
			xtypeListado		: 'des-mod-Listado',
			ventanaMaximizable	: false,
			ventanaMaximized	: false,
			ventanaModal		: false,
			verColEditar		: true,
			verColBorrar		: true,
			anchoVentana		: 800,
			altoVentana			: 500
		};

	   	this.control({
			"button[name='btnBuscar']": {
				click: this.onBtnBuscarClick
			},
			"fieldset[name='FilterFieldSet'] combo": {
				render: this.onFilterComboRender,
				select: this.onFilterComboSelect
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
			"des-mod-Listado": {
				render: this.onRender
			},
			"des-mod-ListadoGrilla": {
				celldblclick: this.onListadoGrillaCellDblClick
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