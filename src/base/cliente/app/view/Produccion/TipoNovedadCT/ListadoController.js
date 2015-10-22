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

Ext.define ('Sistema.view.Produccion.TipoNovedadCT.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-tnovct-ListadoController',
	requires: [
		'Sistema.view.Produccion.TipoNovedadCT.ListadoGrillaStore'
	],

	//
	// Asignacion de EventHandlers para los controles de la vista.
	//
	init: function () {
		ListadoControllerBase2.InyectarDependencia (this, 'Produccion:TipoNovedadCT');
		this.params = {
			formularioController: 'Server/Sysgran/Aplicacion/Modulos/Produccion/TipoNovedadCT/FormularioController.php',
			nuevaEntidad		: 'Sistema.view.Produccion.TipoNovedadCT.Formulario',
			editarEntidad		: 'Sistema.view.Produccion.TipoNovedadCT.Formulario',
			storeGrilla			: 'Sistema.view.Produccion.TipoNovedadCT.ListadoGrillaStore',
			xtypeListado		: 'prod-tnovct-Listado',
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
			"prod-tnovct-Listado": {
				render: this.onRender
			}
	   });
	},
	SetupFiltros: function () {
		this.AgregarFiltro (new FiltroTexto ('nombre', this, 'cbNombre', 'tbNombre', 'tnombre', 'nombre'));
		this.AgregarFiltro (new FiltroCodigoNumerico ('codigo', this, 'tbCodigo', 'codigo'));
	},

	GetOnNuevoParamsEntrada: function (params) {
		return ManejadorDeVentanas.ReqFormularioWS (null);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioWS (item.get ('id'));
	}
});