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

Ext.define ('Sistema.view.Produccion.LoteDeFabricacion.Materiales.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-lote-mat-ListadoController',

	params: {
		formularioCreacion		: '',
		tituloFormularioCreacion: '',
		formularioEdicion		: '',
		tituloFormularioEdicion	: '',
		xtypeListado			: 'prod-lote-mat-Listado',
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
				click: this.onBtnNuevoClick
			},
			"button[name='btnCalcularFormula']": {
				click: this.onBtnCalcularFormulaClick
			}
	   });

	   this.InicializarStoreListado ();
	},
	//---------- Event Handlers ----------

	onBtnCalcularFormulaClick: function () {
		this.CalcularMateriales ();
	},

	//---------- Metodos publicos ----------

	LimpiarListado: function () {
		var grilla = this.getView ().down ('grid');

		if (grilla != null) {
			grilla.store.removeAll ();
		}
	},

	CalcularMateriales: function () {
		var i = 0, ids_ots = [];

		// Armamos un array con los ids de las OTs del lote
		this.GetOrdenesDeTrabajo ().each (function (e) {
			ids_ots[i++] = e.get ('id');
		});

		this.CalcularFormulaDeFabricacion (ids_ots);
	},

	//---------- Metodos virtuales ----------

	//
	// Debe ser implementado por el formulario controller. Debe devolver las ots cargadas en el listado.
	//
	GetOrdenesDeTrabajo: function () {
	},

	//---------- Metodos privados ----------

	//
	// Recibe un array con los ids de las OTs del lote y calcula y muestra en la grilla.
	//
	CalcularFormulaDeFabricacion: function (listado_ots) {
		var me = this;

		new ConsultaWS ().Ejecutar ('Produccion', 'LoteDeFabricacion', 'FormularioController', 'CalcularFormulaDeLote', {ots:Formato.Lib.CodificarArray (listado_ots)}, function (resp) {
				if (this.RespuestaOK ()) {
					me.getView ().down ('grid').store.loadData (resp);

				} else {
					Ext.Msg.alert('Error', this.GetMensajeRespuesta ());
				}
		});
	},

	//
	// Asocia el store vacio al listado.
	//
	InicializarStoreListado: function () {
		var st = Ext.create ('Sistema.view.Produccion.LoteDeFabricacion.Materiales.StoreMateriales', {autoDestroy:true});
		this.getView ().down ('grid').setStore (st);
	},

	GetOnNuevoParamsEntrada: function (params) {
		return ManejadorDeVentanas.ReqListadoWS (true, false, null, ModoEjecucionListado.Seleccion, true, true);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioWS (item.get ('id'));
	}
});