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

Ext.define ('Sistema.view.Produccion.OrdenDeTrabajo.ReservaMateriaPrima.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-ot-res-ListadoController',

	params: {
		formularioCreacion		: 'Sistema.view.Produccion.OrdenDeTrabajo.ReservaMateriaPrima.Formulario',
		tituloFormularioCreacion: '',
		formularioEdicion		: 'Sistema.view.Produccion.OrdenDeTrabajo.ReservaMateriaPrima.Formulario',
		tituloFormularioEdicion	: '',
		xtypeListado			: 'prod-ot-res-Listado',
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
			"button[name='btnLimpiarLoteDeFabricacion']": {
				click: this.onBtnLimpiarLoteDeFabricacionClick
			}
	   });

		this.ctl.btnAgrgarMovimientoReserva 	= this.getView ().down ("button[name='btnAgrgarMovimientoReserva']");
		this.ctl.tbCodLoteDeFabricacion		= this.getView ().down ("textfield[name='tbCodLoteDeFabricacion']");

		// Campo Lote de fabricacion
		this.ctl.CampoLote = new CampoBusqueda ();
		this.ctl.CampoLote.SetClaseModelo ('Sistema.view.Produccion.model.LoteDeFabricacion');
		this.ctl.CampoLote.SetClaseListado ('Sistema.view.Produccion.LoteDeFabricacion.Listado');
		this.ctl.CampoLote.SetClaseFormulario ('Sistema.view.Produccion.LoteDeFabricacion.Formulario');
		this.ctl.CampoLote.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/LoteDeFabricacion/FormularioController.php');
		this.ctl.CampoLote.SetController (this);
		this.ctl.CampoLote.SetTextFieldCodigo ('tbCodLoteDeFabricacion');
		this.ctl.CampoLote.SetBtnBuscar ('btnBuscarLoteDeFabricacion');
		this.ctl.CampoLote.SetBtnVerRegistro ('btnVerLoteDeFabricacion');

		this.ctl.CampoLote.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodLoteDeFabricacion.setValue (rec.get ('id'));
			me.setModificado ();
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoLote.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodLoteDeFabricacion.setValue ('');
		};

		// Filtramos los lotes que no son del CT del producto.
		this.ctl.CampoLote.SetFiltroListado (function () {
			var ret = [{
				nombre: 'centro_trabajo',
				params: {
					id: me.GetCentroDeTrabajo ()
				}
			}];

			return ret;
		});
	},

	onBtnLimpiarLoteDeFabricacionClick: function () {
		this.ctl.CampoLote.itemId = 0;
		this.ctl.tbCodLoteDeFabricacion.setValue ('');
	},

	// Virtual, a sobrecargar por el formulario.
	GetCentroDeTrabajo: function () {
	},

	GetLoteDeFabricacion: function () {
		return this.ctl.CampoLote.itemId;
	},

	SetLoteDeFabricacion: function (loteId) {
		if (loteId != '') {
			this.ctl.CampoLote.BuscarPorId (loteId);
		}
	},

	//
	// Deshabilita todos los componentes de la pagina.
	//
	Deshabilitar: function () {
		this.ctl.btnAgrgarMovimientoReserva.disable ();
	},

	GetOnNuevoParamsEntrada: function (params) {
		return ManejadorDeVentanas.ReqFormularioDetalle (null);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioDetalle (item);
	}
});