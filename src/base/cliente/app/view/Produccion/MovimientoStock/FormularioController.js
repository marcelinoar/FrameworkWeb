/**************************************************************************************************
 * Archivo: FormularioController.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.MovimientoStock.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-movst-FormularioController',
	requires: [
		'Sistema.view.Produccion.model.MovimientoStock'
	],

    init: function () {
    	FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Produccion.model.MovimientoStock', 'Produccion:MovimientoStock');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.onBtnGuardarClick
    		},
    		"prod-movst-Formulario": {
    			afterrender: this.onRender
    		},
    		"combo": {
				change: this.onComboChange
    		}
    	});
    },

    //---------- Event Handlers ----------
    onComboChange: function (combo) {
		// Borra todos los detalles cargados si es que hay alguno.
		this.params.registro.detalles ().removeAll ();

		// Si hay un item seleccionado
		if (this.ctl.cbAlmacenOrigen.value != null && this.ctl.cbAlmacenDestino.value != null) {
			this.ctl.lstDetalles.HabilitarBotonNuevo ();
		}

		// Con esto hacemos que si el origen o destino es null entonces haya que seleccionar el almacen
		// una sola vez y el otro campo copie los valores.
		if (combo.name == 'cbAlmacenOrigen' && this.ctl.CampoTipoMovimiento.item != null) {
			if (this.ctl.CampoTipoMovimiento.item.get ('destinoNull')) {
				this.ctl.cbAlmacenDestino.setValue (combo.value);
			}
		}

		if (combo.name == 'cbAlmacenDestino' && this.ctl.CampoTipoMovimiento.item != null) {
			if (this.ctl.CampoTipoMovimiento.item.get ('origenNull')) {
				this.ctl.cbAlmacenOrigen.setValue (combo.value);
			}
		}
    },

    //---------- Otros Metodos ----------

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 1024;
    	ctl.params.altoVentana		= 650;
    },

    InicializarStoreCombos: function () {
        var st_orig = Ext.create ('Sistema.view.Produccion.MovimientoStock.StoreAlmacenAsociado', {autoDestroy:true});
        var st_dest = Ext.create ('Sistema.view.Produccion.MovimientoStock.StoreAlmacenAsociado', {autoDestroy:true});

        this.ctl.cbAlmacenOrigen.setStore (st_orig);
        this.ctl.cbAlmacenDestino.setStore (st_dest);
    },

    CambiarTipoMovimiento: function (rec) {
		// Borra todos los detalles cargados si es que hay alguno.
		this.params.registro.detalles ().removeAll ();

    	// Resetea y carga los combos de almacenes orig y dest.
		this.ctl.cbAlmacenOrigen.store.removeAll ();
		this.ctl.cbAlmacenOrigen.store.loadData (rec.get ('almOrig'));
		this.ctl.cbAlmacenDestino.store.removeAll ();
		this.ctl.cbAlmacenDestino.store.loadData (rec.get ('almDest'));
		this.ctl.cbAlmacenOrigen.reset ();
		this.ctl.cbAlmacenDestino.reset ();

		// Configuramos la visibilidad de los controles segun el tipo de movimiento.
		if (rec.get ('requiereLoteFabricacion')) {
			this.ctl.CampoLoteFabricacion.Habilitar ();
		}

		if (rec.get ('requiereOT')) {
			this.ctl.CampoOrdenDeTrabajo.Habilitar ();
		}

		if (rec.get ('requiereOT')) {
			this.ctl.CampoOrdenDeTrabajo.Habilitar ();
		}

		if (rec.get ('requiereLoteCompras')) {
			this.ctl.tbLoteDeCompras.enable ();
		}

		if (rec.get ('origenNull')) {
			this.ctl.cbAlmacenOrigen.disable ();

		} else {
			this.ctl.cbAlmacenOrigen.enable ();
		}

		if (rec.get ('destinoNull')) {
			this.ctl.cbAlmacenDestino.disable ();

		} else {
			this.ctl.cbAlmacenDestino.enable ();
		}
    },

	CargarComponentes: function () {
		var me = this;

		this.params.nombreEntidad 			= 'Carga de Movimiento de Stock';
		this.ctl.tbTimestamp 				= this.getView ().down ("textfield[name='tbTimestamp']");
		this.ctl.tbUsuario 					= this.getView ().down ("textfield[name='tbUsuario']");
		this.ctl.tbCodTipoMovimiento 		= this.getView ().down ("textfield[name='tbCodTipoMovimiento']");
		this.ctl.tbDescTipoMovimiento	 	= this.getView ().down ("textfield[name='tbDescTipoMovimiento']");
		this.ctl.tbComentarios 				= this.getView ().down ("textfield[name='tbComentarios']");
		this.ctl.tbCodLoteFabricacion 		= this.getView ().down ("textfield[name='tbCodLoteFabricacion']");
		this.ctl.tbCodOT 					= this.getView ().down ("textfield[name='tbCodOT']");
		this.ctl.tbCodPedidoDeVenta 		= this.getView ().down ("textfield[name='tbCodPedidoDeVenta']");
		this.ctl.tbLoteDeCompras 			= this.getView ().down ("textfield[name='tbLoteDeCompras']");
		this.ctl.tbCodOrdenDeCompra 		= this.getView ().down ("textfield[name='tbCodOrdenDeCompra']");
		this.ctl.cbAlmacenOrigen 			= this.getView ().down ("combo[name='cbAlmacenOrigen']");
		this.ctl.cbAlmacenDestino			= this.getView ().down ("combo[name='cbAlmacenDestino']");
		this.ctl.btnBuscarOT 				= this.getView ().down ("button[name='btnBuscarOT']");
		this.ctl.btnBuscarTipoMovimiento 	= this.getView ().down ("button[name='btnBuscarTipoMovimiento']");
		this.ctl.btnBuscarLoteFabricacion 	= this.getView ().down ("button[name='btnBuscarLoteFabricacion']");
		this.ctl.btnBuscarOrdenDeCompra 	= this.getView ().down ("button[name='btnBuscarOrdenDeCompra']");
		this.ctl.btnBuscarPedidoDeVenta	 	= this.getView ().down ("button[name='btnBuscarPedidoDeVenta']");

		// Campo Tipo Movimiento
		this.ctl.CampoTipoMovimiento= new CampoBusqueda ();
		this.ctl.CampoTipoMovimiento.SetClaseModelo ('Sistema.view.Produccion.model.TipoMovimientoStock');
		this.ctl.CampoTipoMovimiento.SetClaseListado ('Sistema.view.Produccion.TipoMovimientoStock.Listado');
		this.ctl.CampoTipoMovimiento.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/MovimientoStock/FormularioController.php');
		this.ctl.CampoTipoMovimiento.SetController (this);
		this.ctl.CampoTipoMovimiento.SetFuncionLecturaPorId ('BuscarTipoMovPorId');
		this.ctl.CampoTipoMovimiento.SetFuncionLecturaPorCodigo ('BuscarTipoMovPorCodigo');
		this.ctl.CampoTipoMovimiento.SetTextFieldCodigo ('tbCodTipoMovimiento');
		this.ctl.CampoTipoMovimiento.SetBtnBuscar ('btnBuscarTipoMovimiento');
		this.ctl.CampoTipoMovimiento.item = null;

		this.ctl.CampoTipoMovimiento.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodTipoMovimiento.setValue (rec.get ('codigo'));
			me.ctl.tbDescTipoMovimiento.setValue (rec.get ('descripcionCorta'));

			this.itemId = rec.get ('id');
			this.item = rec;

			me.CambiarTipoMovimiento (rec);
			me.ctl.lstDetalles.DeshabilitarBotonNuevo ();
		};

		this.ctl.CampoTipoMovimiento.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodTipoMovimiento.setValue ('');
			me.ctl.tbDescTipoMovimiento.setValue ('');
			me.ctl.lstDetalles.DeshabilitarBotonNuevo ();
		};

		// Campo Lote de Fabricacion
		this.ctl.CampoLoteFabricacion= new CampoBusqueda ();
		this.ctl.CampoLoteFabricacion.SetClaseModelo ('Sistema.view.Produccion.model.LoteDeFabricacion');
		this.ctl.CampoLoteFabricacion.SetClaseListado ('Sistema.view.Produccion.LoteDeFabricacion.Listado');
		this.ctl.CampoLoteFabricacion.SetClaseFormulario ('Sistema.view.Produccion.LoteDeFabricacion.Formulario');
		this.ctl.CampoLoteFabricacion.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/LoteDeFabricacion/FormularioController.php');
		this.ctl.CampoLoteFabricacion.SetController (this);
		this.ctl.CampoLoteFabricacion.SetTextFieldCodigo ('tbCodLoteFabricacion');
		this.ctl.CampoLoteFabricacion.SetBtnBuscar ('btnBuscarLoteFabricacion');

		this.ctl.CampoLoteFabricacion.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodLoteFabricacion.setValue (rec.get ('id'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoLoteFabricacion.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodLoteFabricacion.setValue ('');
		};

		// Filtramos lote y OT
		this.ctl.CampoLoteFabricacion.SetFiltroListado (function () {
			var ret = null;

			// Si esta seleccionada la OT ponemos el filtro
			if (me.ctl.CampoOrdenDeTrabajo.itemId != 0) {
				ret = [{
					nombre: 'orden_de_trabajo',
					params: {
						id: me.ctl.CampoOrdenDeTrabajo.itemId
					}
				}];
			}

			return ret;
		});

		// Campo Orden de Trabajo
		this.ctl.CampoOrdenDeTrabajo = new CampoBusqueda ();
		this.ctl.CampoOrdenDeTrabajo.SetClaseModelo ('Sistema.view.Produccion.model.OrdenDeTrabajo');
		this.ctl.CampoOrdenDeTrabajo.SetClaseListado ('Sistema.view.Produccion.OrdenDeTrabajo.Listado');
		this.ctl.CampoOrdenDeTrabajo.SetClaseFormulario ('Sistema.view.Produccion.OrdenDeTrabajo.Formulario');
		this.ctl.CampoOrdenDeTrabajo.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/OrdenDeTrabajo/FormularioController.php');
		this.ctl.CampoOrdenDeTrabajo.SetController (this);
		this.ctl.CampoOrdenDeTrabajo.SetTextFieldCodigo ('tbCodOT');
		this.ctl.CampoOrdenDeTrabajo.SetBtnBuscar ('btnBuscarOT');

		this.ctl.CampoOrdenDeTrabajo.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodOT.setValue (rec.get ('id'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoOrdenDeTrabajo.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodOT.setValue ('');
		};

		// Filtramos lote y OT
		this.ctl.CampoOrdenDeTrabajo.SetFiltroListado (function () {
			var ret = null;

			// Si hay un lote seleccionado filtramos por lote
			if (me.ctl.CampoLoteFabricacion.itemId != 0) {
				ret = [{
					nombre: 'lote',
					params: {
						id: me.ctl.CampoLoteFabricacion.itemId
					}
				}];
			}

			return ret;
		});

		// Inicializamos los stores de los almacenes origen y destino
		this.InicializarStoreCombos ();

		// Asociamos el store detalle al listado
		this.ctl.lstDetalles = this.getView ().down ("prod-movst-dmov-Listado").controller;
		this.ctl.lstDetalles.ConfigurarListado (function () {me.SetDetalleModificado ();});
		this.ctl.lstDetalles.GetTipoMovimiento = function () {return me.ctl.CampoTipoMovimiento.item;};
		this.ctl.lstDetalles.GetAlmacenOrigen = function () {return me.ctl.cbAlmacenOrigen.value;};
		this.ctl.lstDetalles.GetAlmacenDestino = function () {return me.ctl.cbAlmacenDestino.value;};

		// Consultamos fecha, hora y usuario
		new ConsultaWS ().Ejecutar ('Produccion', 'MovimientoStock', 'FormularioController', 'GetDatosIniciales', null, function (resp) {
			if (this.RespuestaOK ()) {
				me.ctl.tbTimestamp.setValue (resp.fechaYHora);
				me.ctl.tbUsuario.setValue (resp.nombreUsuario);

			} else {
				Ext.Msg.alert('Error', this.GetMensajeRespuesta ());
			}
		});
	},

    GetElementoFoco: function () {
    	return "textfield[name='tbCodTipoMovimiento']";
    },

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		this.params.registro = rec;
		this.ctl.lstDetalles.setStoreDetalle (rec.detalles ());
	},

	ObtenerRegistroDeFormulario: function () {
		this.params.registro.set ('tipoMovimientoStockId', this.ctl.CampoTipoMovimiento.itemId);
		this.params.registro.set ('almacenOrigenId', this.ctl.cbAlmacenOrigen.value);
		this.params.registro.set ('almacenDestinoId', this.ctl.cbAlmacenDestino.value);
		this.params.registro.set ('loteDeFabricacionId', this.ctl.CampoLoteFabricacion.itemId);
		this.params.registro.set ('ordenDeTrabajoId', this.ctl.CampoOrdenDeTrabajo.itemId);
		this.params.registro.set ('ordenDeCompraId', null);
		this.params.registro.set ('pedidoDeVentaId', null);
		this.params.registro.set ('comentarios', this.ctl.tbComentarios.value);
		this.params.registro.set ('loteDeCompras', this.ctl.tbLoteDeCompras.value);

		return this.params.registro;
	}
});