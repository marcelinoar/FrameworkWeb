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

Ext.define ('Sistema.view.Produccion.HojaDeRuta.Operaciones.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-hdruta-oper-ListadoController',

	params: {
		formularioCreacion		: 'Sistema.view.Produccion.Operacion.Listado',
		tituloFormularioCreacion: '',
		formularioEdicion		: 'Sistema.view.Produccion.Operacion.Formulario',
		tituloFormularioEdicion	: '',
		xtypeListado			: 'prod-hdruta-oper-Listado',
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
			},
			"button[name='btnSubir']": {
				click: this.onBtnSubirClick
			},
			"button[name='btnBajar']": {
				click: this.onBtnBajarClick
			},
			"button[name='btnRecargarListado']": {
				click: this.onBtnRecargarListadoClick
			}
	   });
	},

	onBtnSubirClick: function () {
		var grid = this.getView ().down ('grid');

  		moveSelectedRow (grid, -1, 'nroDeOrden');
  		this.setModificado ();
	},

	onBtnBajarClick: function () {
		var grid = this.getView ().down ('grid');

  		moveSelectedRow (grid, 1, 'nroDeOrden');
  		this.setModificado ();
	},

	GetOnNuevoParamsEntrada: function (params) {
		return ManejadorDeVentanas.ReqListadoWS (true, false, null, ModoEjecucionListado.Seleccion, true, true);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioWS (item.get ('id'));
	}
});