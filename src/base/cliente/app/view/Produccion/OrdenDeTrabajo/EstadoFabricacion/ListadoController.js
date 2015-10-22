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

Ext.define ('Sistema.view.Produccion.OrdenDeTrabajo.EstadoFabricacion.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-ot-est-ListadoController',

	params: {
		formularioCreacion		: '',
		tituloFormularioCreacion: '',
		formularioEdicion		: '',
		tituloFormularioEdicion	: '',
		xtypeListado			: 'prod-ot-est-Listado',
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
		ListadoDetalleControllerBase.InyectarDependencia (this, 'Produccion:OrdenDeTrabajo');

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

		this.InicializarStoreListado ();
	},

	MostrarDatos: function (ordenDeTrabajoId) {
		var me = this;

		new ConsultaWS ().Ejecutar ('Produccion', 'OrdenDeTrabajo', 'FormularioController', 'GetEstadoOrdenDeTrabajo', {ordenDeTrabajoId:ordenDeTrabajoId}, function (resp) {
				if (this.RespuestaOK ()) {
					me.getView ().down ('grid').store.loadData (resp);

				} else {
					Ext.Msg.alert('Error', this.GetMensajeRespuesta ());
				}
		});
	},

	InicializarStoreListado: function () {
		var st = Ext.create ('Sistema.view.Produccion.MedicionDeAtributo.StoreAtributo', {autoDestroy:true});
		this.getView ().down ('grid').setStore (st);
	},

	GetOnNuevoParamsEntrada: function (params) {
		return ManejadorDeVentanas.ReqFormularioDetalle (null);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioDetalle (item);
	}
});