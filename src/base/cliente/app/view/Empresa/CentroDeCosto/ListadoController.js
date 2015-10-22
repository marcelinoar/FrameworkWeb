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

Ext.define ('Sistema.view.Empresa.CentroDeCosto.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.emp-ccosto-ListadoController',

	//
	// Asignacion de EventHandlers para los controles de la vista.
	//
	init: function () {
		ListadoControllerBase.InyectarDependencia (this);
		this.params = {
			comboFiltrosUrl		: 'Server/Sysgran/Aplicacion/Modulos/Empresa/CentroDeCosto/ListadoController.php',
			nuevaEntidad		: 'Sistema.view.Empresa.CentroDeCosto.Formulario',
			editarEntidad		: 'Sistema.view.Empresa.CentroDeCosto.Formulario',
			storeGrilla			: 'Sistema.view.Empresa.CentroDeCosto.ListadoGrillaStore',
			xtypeListado		: 'emp-ccosto-Listado',
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
			"fieldset[name='FilterFieldSet'] combo": {
				render: this.onFilterComboRender,
				select: this.onFilterComboSelect
			},
			"fieldset[name='FilterFieldSet'] textfield[filterName='fcodigo']": {
				blur: this.onFilterTextoBlur,
				specialkey: this.onFilterTextoSpecialKey
			},
			"textfield[name='tbBuscar']":{
				specialkey: this.onTbBuscarSpecialKey
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
			"emp-ccosto-Listado": {
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