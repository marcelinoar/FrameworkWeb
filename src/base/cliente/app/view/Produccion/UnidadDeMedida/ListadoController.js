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

Ext.define ('Sistema.view.Produccion.UnidadDeMedida.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-umed-ListadoController',
    requires:[
    	'Sistema.view.Produccion.UnidadDeMedida.ListadoGrillaStore'
    ],

	//
	// Asignacion de EventHandlers para los controles de la vista.
	//
	init: function () {
		ListadoControllerBase2.InyectarDependencia (this, 'Produccion:UnidadDeMedida');
		this.params = {
			formularioController: 'Server/Sysgran/Aplicacion/Modulos/Produccion/UnidadDeMedida/FormularioController.php',
			nuevaEntidad		: 'Sistema.view.Produccion.UnidadDeMedida.Formulario',
			editarEntidad		: 'Sistema.view.Produccion.UnidadDeMedida.Formulario',
			storeGrilla			: 'Sistema.view.Produccion.UnidadDeMedida.ListadoGrillaStore',
			xtypeListado		: 'prod-umed-Listado',
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
			"prod-umed-Listado": {
				render: this.onRender
			}
	   });
	},

	SetupFiltros: function () {
		var me = this;

		this.AgregarFiltro (new FiltroTexto ('codigo', this, 'cbCodigo', 'tbCodigo', 'tcodigo', 'codigo'));
		this.AgregarFiltro (new FiltroTexto ('descripcion', this, 'cbDescripcion', 'tbDescripcion', 'tdescripcion', 'descripcion'));
	},

	GetOnNuevoParamsEntrada: function (params) {
		return ManejadorDeVentanas.ReqFormularioWS (null);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioWS (item.get ('id'));
	}
});