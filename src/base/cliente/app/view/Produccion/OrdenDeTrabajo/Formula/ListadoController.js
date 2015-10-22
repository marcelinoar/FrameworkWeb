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

Ext.define ('Sistema.view.Produccion.OrdenDeTrabajo.Formula.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-ot-frm-ListadoController',

	params: {
		formularioCreacion		: '',
		tituloFormularioCreacion: '',
		formularioEdicion		: '',
		tituloFormularioEdicion	: '',
		xtypeListado			: 'prod-ot-hdr-Listado',
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
		var me = this;
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

		this.ctl.tbCodFormula = this.getView ().down ("textfield[name='tbCodFormula']");
		this.ctl.tbDescFormula = this.getView ().down ("textfield[name='tbDescFormula']");

		// Campo Formula
		this.ctl.CampoFormula = new CampoBusqueda ();
		this.ctl.CampoFormula.SetClaseModelo ('Sistema.view.Produccion.model.FormulaDeProduccion');
		this.ctl.CampoFormula.SetClaseListado ('Sistema.view.Produccion.FormulaDeProduccion.Listado');
		this.ctl.CampoFormula.SetClaseFormulario ('Sistema.view.Produccion.FormulaDeProduccion.Formulario');
		this.ctl.CampoFormula.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/FormulaDeProduccion/FormularioController.php');
		this.ctl.CampoFormula.SetController (this);
		this.ctl.CampoFormula.SetTextFieldCodigo ('tbCodFormula');
		this.ctl.CampoFormula.SetBtnBuscar ('btnBuscarFormula');
		this.ctl.CampoFormula.SetBtnVerRegistro ('btnVerFormula');

		this.ctl.CampoFormula.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodFormula.setValue (rec.get ('codigo'));
			me.ctl.tbDescFormula.setValue (rec.get ('descripcionCorta'));
			this.itemId = rec.get ('id');

			me.ActualizarListado (rec.get ('id'), me.GetCantidad (), me.GetUnidadDeMedidaId (), me.GetProductoId ());
		};

		this.ctl.CampoFormula.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodFormula.setValue ('');
			me.ctl.tbDescFormula.setValue ('');

			me.ActualizarListado (0, 0, 0, 0);
		};
	},

	ActualizarListado: function (formulaId, cantidad, unidadDeMedidaId, productoId) {
		var me = this;
		var st = this.getView ().down ('grid').store;

		// Siempre limpia la grilla primero.
		st.removeAll ();

		// Si no hay producto, unidad y formula seleccionadas entonces no pedimos los datos.
		if (formulaId != 0 && unidadDeMedidaId != 0 && productoId != 0) {
			new ConsultaWS ().Ejecutar ('Produccion', 'OrdenDeTrabajo', 'FormularioController', 'LeerDetalleFormulaPorId', {formulaId:formulaId, cantidad:cantidad, unidadDeMedidaId: unidadDeMedidaId, productoId: productoId}, function (resp) {
				if (this.RespuestaOK ()) {
					st.loadData (resp);

				} else {
					Ext.Msg.alert('Error', this.GetMensajeRespuesta ());
				}
			});
		}
	},

	//
	// Crea una OT hija para el item seleccionado en la girlla.
	//
	onCrearOTHija: function (grid, rowIndex, colIndex) {
		var item = grid.getStore ().getAt (rowIndex);
		var me = this;

		Ext.MessageBox.confirm('Generar OT Hija', 'Esta seguro que desea generar una OT para este Producto?', function(btn){
			if(btn === 'yes'){
				new ConsultaWS ().Ejecutar ('Produccion', 'OrdenDeTrabajo', 'FormularioController', 'CrearOTHija', {
				otPadreId: me.GetOrdenDeTrabajoId ()
				, productoId: item.get ('productoId')
				, cantidad: item.get ('cantidad')
				, unidadDeMedidaId: item.get ('unidadDeMedidaId')}, function (resp) {
					if (this.RespuestaOK ()) {
						Ext.Msg.alert('Orden de Trabajo Creada', 'La Orden de trabajo se creo con exito. El codigo de la OT hija es: ' + resp);

					} else {
						Ext.Msg.alert('Error', this.GetMensajeRespuesta ());
					}
				});
			}
		});
	},

	DeshabilitarCreacionDeOTsHijas: function () {
		var col = this.getView ().down ("actioncolumn[name='colCrearOT']");

		col.hide ();
	},

	//
	// Este metodo se ejecuta desde el formulario maestro cuando cambia algun parametro del calculo
	// de cantidades de la formula (cantidad, um, producto). Entonces se actualiza el listado detalle.
	//
	ActualizarDetalleCantidades: function (cantidad, unidadDeMedidaId, productoId) {
		this.ActualizarListado (this.ctl.CampoFormula.itemId, cantidad, unidadDeMedidaId, productoId);
	},

	//
	// Este metodo permite cambiar la formula seleccionada desde el formulario maestro.
	//
	SetFormulaDeProduccion: function (formula) {
		this.ctl.CampoFormula.BuscarPorId (formula);
	},

	//
	// Devuelve el Id de la formula de produccion seleccionada
	//
	GetFormulaDeProduccion: function () {
		return this.ctl.CampoFormula.itemId;
	},

	// Definimos este metodo por si se intenta ejecutar antes de haber sido asignado.
	GetOrdenDeTrabajoId: function () {
		Ext.Msg.alert('Error', 'Error. metodo:GetOrdenDeTrabajoId () no definido');
	},

	// Definimos este metodo por si se intenta ejecutar antes de haber sido asignado.
	GetCantidad: function () {
		Ext.Msg.alert('Error', 'Error. metodo:GetCantidad () no definido');
	},

	// Definimos este metodo por si se intenta ejecutar antes de haber sido asignado.
	GetUnidadDeMedidaId: function () {
		Ext.Msg.alert('Error', 'Error. metodo:GetUnidadDeMedidaId () no definido');
	},

	// Definimos este metodo por si se intenta ejecutar antes de haber sido asignado.
	GetProductoId: function () {
		Ext.Msg.alert('Error', 'Error. metodo:GetProductoId() no definido');
	},

	GetOnNuevoParamsEntrada: function (params) {
		return ManejadorDeVentanas.ReqFormularioDetalle (null);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioDetalle (item);
	}
});