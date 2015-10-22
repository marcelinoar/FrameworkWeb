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

Ext.define ('Sistema.view.Produccion.VisualizacionMovimientoStock.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-vmovst-FormularioController',
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
    			click: this._onBtnGuardarClick
    		},
    		"prod-vmovst-Formulario": {
    			afterrender: this.onRender
    		},
    		"button[name='btnAnular']": {
    			click: this.onBtnAnularClick
    		}
    	});
    },

    //---------- Event Handlers ----------

	_onBtnGuardarClick: function () {
		this.IntentarCerrarVentanaContenedora ();
	},

    onBtnAnularClick: function () {
    	var me = this;

		Ext.MessageBox.confirm('Anular Movimiento de Stock', 'Esta seguro de que desea anular el Movimiento de Stock?', function (btn){
			if(btn === 'yes') {
				new ConsultaWS ().Ejecutar ('Produccion', 'MovimientoStock', 'FormularioController', 'AnularMovimientoStock', {movimientoStockId: me.params.registro.get ('id')}, function (resp) {
					if (this.RespuestaOK ()) {
						Ext.Msg.alert('Realizado', 'El movimiento de Stock fue anulado correctamente');

					} else {
						Ext.Msg.alert('Error', this.GetMensajeRespuesta ());
					}

					me.IntentarCerrarVentanaContenedora ();
				});
			}
		});
    },

    //---------- Otros Metodos ----------

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 1024;
    	ctl.params.altoVentana		= 650;
    },

	CargarComponentes: function () {
		var me = this;

		this.params.nombreEntidad 			= 'Visualizacion de Movimiento de Stock';
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
		this.ctl.tbAlmacenOrigen 			= this.getView ().down ("textfield[name='tbAlmacenOrigen']");
		this.ctl.tbNroMovimiento			= this.getView ().down ("textfield[name='tbNroMovimiento']");
		this.ctl.tbAlmacenDestino			= this.getView ().down ("textfield[name='tbAlmacenDestino']");
		this.ctl.tbTransaccionDeAnulacion	= this.getView ().down ("textfield[name='tbTransaccionDeAnulacion']");
		this.ctl.btnVerOT 					= this.getView ().down ("button[name='btnVerOT']");
		this.ctl.btnVerLoteFabricacion 		= this.getView ().down ("button[name='btnVerLoteFabricacion']");
		this.ctl.btnVerOrdenDeCompra 		= this.getView ().down ("button[name='btnVerOrdenDeCompra']");
		this.ctl.btnVerPedidoDeVenta	 	= this.getView ().down ("button[name='btnVerPedidoDeVenta']");

		this.ctl.lstDetalles = this.getView ().down ("prod-vmovst-dmov-Listado").controller;
		this.ctl.lstDetalles.ConfigurarListado (function () {return;});
		this.ctl.lstDetalles.RecargarFormularioPadre = function () {me.RecargarFormulario ();};


		// Campo Lote de Fabricacion
		this.ctl.CampoLoteFabricacion= new CampoBusqueda ();
		this.ctl.CampoLoteFabricacion.SetClaseModelo ('Sistema.view.Produccion.model.LoteDeFabricacion');
		this.ctl.CampoLoteFabricacion.SetClaseFormulario ('Sistema.view.Produccion.LoteDeFabricacion.Formulario');
		this.ctl.CampoLoteFabricacion.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/LoteDeFabricacion/FormularioController.php');
		this.ctl.CampoLoteFabricacion.SetController (this);
		this.ctl.CampoLoteFabricacion.SetBtnVerRegistro ('btnVerLoteFabricacion');
		this.ctl.CampoLoteFabricacion.onRegistroSeleccionadoOk = function (rec) {return;};
		this.ctl.CampoLoteFabricacion.onRegistroSeleccionadoError = function (rec) {return;};

		// Campo Orden de Trabajo
		this.ctl.CampoOrdenDeTrabajo = new CampoBusqueda ();
		this.ctl.CampoOrdenDeTrabajo.SetClaseModelo ('Sistema.view.Produccion.model.OrdenDeTrabajo');
		this.ctl.CampoOrdenDeTrabajo.SetClaseFormulario ('Sistema.view.Produccion.OrdenDeTrabajo.Formulario');
		this.ctl.CampoOrdenDeTrabajo.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/OrdenDeTrabajo/FormularioController.php');
		this.ctl.CampoOrdenDeTrabajo.SetController (this);
		this.ctl.CampoOrdenDeTrabajo.SetBtnVerRegistro ('btnVerOT');
		this.ctl.CampoOrdenDeTrabajo.onRegistroSeleccionadoOk = function (rec) {return;};
		this.ctl.CampoOrdenDeTrabajo.onRegistroSeleccionadoError = function (rec) {return;};
	},

    GetElementoFoco: function () {
    	return "textfield[name='tbCodTipoMovimiento']";
    },

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		this.params.registro = rec;

		this.ctl.tbTimestamp.setValue (rec.get ('fecha'));
		this.ctl.tbUsuario.setValue (rec.get ('usuario'));
		this.ctl.tbCodTipoMovimiento.setValue (rec.get ('codigoTipo'));
		this.ctl.tbDescTipoMovimiento.setValue (rec.get ('descripcionTipo'));
		this.ctl.tbComentarios.setValue (rec.get ('comentarios'));
		this.ctl.tbCodLoteFabricacion.setValue (rec.get ('loteDeFabricacionId'));
		this.ctl.tbCodOT.setValue (rec.get ('ordenDeTrabajoId'));
		this.ctl.tbCodPedidoDeVenta.setValue (rec.get ('pedidoDeVentaId'));
		this.ctl.tbLoteDeCompras.setValue (rec.get ('loteDeCompras'));
		this.ctl.tbCodOrdenDeCompra.setValue (rec.get ('ordenDeCompraId'));
		this.ctl.tbAlmacenOrigen.setValue (rec.get ('codigoAlmacenOrigen'));
		this.ctl.tbAlmacenDestino.setValue (rec.get ('codigoAlmacenDestino'));
		this.ctl.tbNroMovimiento.setValue (rec.get ('id'));
		this.ctl.tbTransaccionDeAnulacion.setValue (rec.get ('movimientoStockAnulacionId'));
		this.ctl.lstDetalles.setStoreDetalle (rec.detalles ());

		if (rec.get ('loteDeFabricacionId') != null) {
			this.ctl.CampoLoteFabricacion.itemId = rec.get ('loteDeFabricacionId');
		}

		if (rec.get ('ordenDeTrabajoId') != null) {
			this.ctl.CampoOrdenDeTrabajo.itemId = rec.get ('ordenDeTrabajoId');
		}
	},

	ObtenerRegistroDeFormulario: function () {
		return null;
	}
});