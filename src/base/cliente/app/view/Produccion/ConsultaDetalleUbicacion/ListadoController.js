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

Ext.define ('Sistema.view.Produccion.ConsultaDetalleUbicacion.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-cdubic-ListadoController',
    requires:[
    	'Sistema.view.Produccion.ConsultaDetalleUbicacion.ListadoGrillaStore'
    ],

	//
	// Asignacion de EventHandlers para los controles de la vista.
	//
	init: function () {
		ListadoControllerBase2.InyectarDependencia (this, 'Produccion:MovimientoStock');
		this.GetComponenteFoco = this._GetComponenteFoco;

		this.params = {
			formularioController: 'Server/Sysgran/Aplicacion/Modulos/Produccion/ConsultaDetalleUbicacion/FormularioController.php',
			nuevaEntidad		: '',
			editarEntidad		: '',
			storeGrilla			: 'Sistema.view.Produccion.ConsultaDetalleUbicacion.ListadoGrillaStore',
			xtypeListado		: 'prod-cdubic-Listado',
			ventanaMaximizable	: false,
			ventanaMaximized	: false,
			ventanaModal		: false,
			verColEditar		: true,
			verColBorrar		: true,
			anchoVentana		: 325,
			altoVentana			: 350
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
			"prod-cdubic-Listado": {
				render: this.onRender
			}
	   });
	},

    _GetComponenteFoco: function () {
    	return this.getView ().down ("button[name='btnAceptar']");
    },

	SetupFiltros:function  () {
		this.AgregarFiltro (new FiltroParametro ('almacenId', 'alm'));
		this.AgregarFiltro (new FiltroParametro ('ubicacion', 'ubic'));
		this.AgregarFiltro (new FiltroParametro ('productoId', 'prod'));
	},

	GetOnNuevoParamsEntrada: function (params) {
		return ManejadorDeVentanas.ReqFormularioWS (null);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioWS (item.get ('id'));
	}
});