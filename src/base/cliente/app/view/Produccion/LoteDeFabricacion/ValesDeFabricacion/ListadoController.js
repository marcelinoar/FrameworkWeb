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

Ext.define ('Sistema.view.Produccion.LoteDeFabricacion.ValesDeFabricacion.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-lote-vf-ListadoController',

	params: {
		formularioCreacion		: '',
		tituloFormularioCreacion: '',
		formularioEdicion		: 'Sistema.view.Produccion.ValeDeFabricacion.Formulario',
		tituloFormularioEdicion	: 'Lote de Produccion - Vales de Fabricacion Cargados',
		xtypeListado			: 'prod-lote-vf-Listado',
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
		ListadoDetalleControllerBase.InyectarDependencia (this, 'Produccion:LoteDeFabricacion');

	   	this.control({
			"grid": {
				afterrender: this.onGrillaAfterRender,
				celldblclick: this.onListadoGrillaCellDblClick
			},
			"button[name='btnRecargarListado']": {
				click: this.onBtnRecargarListadoClick
			}
	   });
	},

	//---------- Event Handlers ----------

	//---------- Funciones publicas ----------

	//---------- Funciones virtuales ----------

	//---------- Funciones privadas ----------
	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioWS (item.get ('id'));
	}
});