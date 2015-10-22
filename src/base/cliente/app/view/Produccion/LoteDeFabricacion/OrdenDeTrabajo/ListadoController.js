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

Ext.define ('Sistema.view.Produccion.LoteDeFabricacion.OrdenDeTrabajo.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-lote-ot-ListadoController',

	params: {
		formularioCreacion		: 'Sistema.view.Produccion.OrdenDeTrabajo.Listado',
		tituloFormularioCreacion: 'Lote de Produccion - Seleccion de Orden de Trabajo',
		formularioEdicion		: 'Sistema.view.Produccion.OrdenDeTrabajo.Formulario',
		tituloFormularioEdicion	: '',
		xtypeListado			: 'prod-lote-ot-Listado',
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
			"button[name='btnNuevo']": {
				click: this._onBtnNuevoClick
			},
			"button[name='btnRecargarListado']": {
				click: this.onBtnRecargarListadoClick
			}
	   });
	},

	//---------- Event Handlers ----------

	_onBtnNuevoClick: function () {
		// Solo permitimos agregar OTs si primero seleccionaron el CT.
		if (this.GetCentroDeTrabajo () != 0) {
			this.onBtnNuevoClick ();

		} else {
			Ext.Msg.alert('Atencion', 'Para agregar una Orden de Trabajo al lote primero debe seleccionar un Centro de Trabajo');
		}
	},

	//---------- Funciones publicas ----------

	LimpiarListado: function () {
		var grilla = this.getView ().down ('grid');

		if (grilla != null) {
			grilla.store.removeAll ();
		}
	},

	//---------- Funciones virtuales ----------

	GetCentroDeTrabajo: function () {
		return 0;
	},

	//---------- Funciones privadas ----------

	GetOnNuevoParamsEntrada: function (params) {
		var me = this;
		var filtro = [{
			nombre: 'centro_trabajo',
			params: {
				id: me.GetCentroDeTrabajo ()
			}
		}, {
			nombre: 'lote',
			params: {
				id: 0
			}
		}, {
			nombre: 'estado',
			params: {
				id: 3
			}
		}];

		return ManejadorDeVentanas.ReqListadoWS (true, false, null, ModoEjecucionListado.Seleccion, true, true, filtro);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioWS (item.get ('id'));
	}
});