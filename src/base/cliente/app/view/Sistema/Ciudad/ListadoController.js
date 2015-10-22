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

Ext.define ('Sistema.view.Sistema.Ciudad.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sis-ciudad-ListadoController',

	//
	// Asignacion de EventHandlers para los controles de la vista.
	//
	init: function () {
		ListadoControllerBase.InyectarDependencia (this, 'Sistema:Ciudad');
		this.params = {
			comboFiltrosUrl		: 'Server/Sysgran/Aplicacion/Modulos/Sistema/Ciudad/ListadoController.php',
			nuevaEntidad		: 'Sistema.view.Sistema.Ciudad.Formulario',
			editarEntidad		: 'Sistema.view.Sistema.Ciudad.Formulario',
			storeGrilla			: 'Sistema.view.Sistema.Ciudad.ListadoGrillaStore',
			xtypeListado		: 'sis-ciudad-Listado',
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
			"textfield[name='tbBuscar']":{
				specialkey: this.onTbBuscarSpecialKey
			},
			"fieldset[name='FilterFieldSet'] textfield[filterName='fcodigo']": {
				blur: this.onFilterTextoBlur,
				specialkey: this.onFilterTextoSpecialKey
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
			"sis-ciudad-Listado": {
				render: this.onRender
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