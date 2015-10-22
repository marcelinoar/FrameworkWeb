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

Ext.define ('Sistema.view.Produccion.VisualizacionMovimientoStock.DetMovimientoStock.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-vmovst-dmov-FormularioController',

    init: function () {
    	FormularioDetalleControllerBase.InyectarDependencia (this, 'Sistema.view.Produccion.model.DetMovimientoStock');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this._onBtnGuardarClick
    		},
    		"prod-vmovst-dmov-Formulario": {
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

		Ext.MessageBox.confirm('Anular Detalle de Movimiento de Stock', 'Esta seguro de que desea anular el Movimiento?', function (btn){
			if(btn === 'yes') {
				new ConsultaWS ().Ejecutar ('Produccion', 'MovimientoStock', 'FormularioController', 'AnularDetalleMovimientoStock', {detMovimientoStockId: me.params.registro.get ('id'), movimientoStockId: me.params.registro.get ('movimientoStockId')}, function (resp) {
					if (!this.RespuestaOK ()) {
						Ext.Msg.alert('Error', this.GetMensajeRespuesta ());
					}

					me.params.registro.RecargarFormularioPadre ();
					me.IntentarCerrarVentanaContenedora ();
				});
			}
		});
    },

    //---------- Otros Metodos ----------

    //
    // Virtual. Permite hacer que el formulario padre recargue el registro.
    //
    RecargarFormularioPadre: function () {
    },

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 570;
    	ctl.params.altoVentana		= 260;
    },

	CargarComponentes: function () {
		var me = this;

		// Textfields
		this.ctl.tbNroMovimiento = this.getView ().down ("textfield[name='tbNroMovimiento']");
		this.ctl.tbCodProducto = this.getView ().down ("textfield[name='tbCodProducto']");
		this.ctl.tbDescProducto = this.getView ().down ("textfield[name='tbDescProducto']");
		this.ctl.tbCantidadEntra = this.getView ().down ("textfield[name='tbCantidadEntra']");
		this.ctl.tbCantidadSale = this.getView ().down ("textfield[name='tbCantidadSale']");
		this.ctl.tbCodUM = this.getView ().down ("textfield[name='tbCodUM']");
		this.ctl.tbContenedor = this.getView ().down ("textfield[name='tbContenedor']");
		this.ctl.tbCodigoUbicacion = this.getView ().down ("textfield[name='tbCodigoUbicacion']");
		this.ctl.tbDetalleUbicacion = this.getView ().down ("textfield[name='tbDetalleUbicacion']");
		this.ctl.tbCodMovimientoAnulacion = this.getView ().down ("textfield[name='tbCodMovimientoAnulacion']");

		// Buttons
		this.ctl.btnBuscarUbicacionOrigen = this.getView ().down ("button[name='btnBuscarUbicacionOrigen']");
		this.ctl.btnCrearContenedorDestino = this.getView ().down ("button[name='btnCrearContenedorDestino']");
		this.ctl.btnBuscarProducto = this.getView ().down ("button[name='btnBuscarProducto']");
		this.ctl.btnBuscarUM = this.getView ().down ("button[name='btnBuscarUM']");
		this.ctl.btnBuscarDetalleOrigen = this.getView ().down ("button[name='btnBuscarDetalleOrigen']");
		this.ctl.btnBuscarDetalleDestino = this.getView ().down ("button[name='btnBuscarDetalleDestino']");

		// Configuracion del CampoProducto.
		this.ctl.CampoProducto = new CampoBusqueda ();
		this.ctl.CampoProducto.SetClaseModelo ('Sistema.view.Produccion.model.Producto');
		this.ctl.CampoProducto.SetClaseFormulario ('Sistema.view.Produccion.Producto.Formulario');
		this.ctl.CampoProducto.SetFuncionLecturaPorId ('BuscarProductoPorId');
		this.ctl.CampoProducto.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/OrdenDeTrabajo/FormularioController.php');
		this.ctl.CampoProducto.SetController (this);
		this.ctl.CampoProducto.SetBtnVerRegistro ('btnVerProducto');
		this.ctl.CampoProducto.onRegistroSeleccionadoOk = function (rec) {return;};
		this.ctl.CampoProducto.onRegistroSeleccionadoError = function () {return;};
	},

    GetElementoFoco: function () {
    	return "textfield[name='tbNroMovimiento']";
    },

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		this.params.registro = rec;

		this.ctl.tbNroMovimiento.setValue (rec.get ('id'));
		this.ctl.tbCodProducto.setValue (rec.get ('codigoProducto'));
		this.ctl.tbDescProducto.setValue (rec.get ('descripcionProducto'));
		this.ctl.CampoProducto.itemId = rec.get ('productoId');
		this.ctl.tbCantidadEntra.setValue (Formato.PuntoFlotante.Transformar (rec.get ('cantidadEntra')));
		this.ctl.tbCantidadSale.setValue (Formato.PuntoFlotante.Transformar (rec.get ('cantidadSale')));
		this.ctl.tbCodUM.setValue (rec.get ('codigoUM'));
		this.ctl.tbContenedor.setValue (rec.get ('codigoContenedor'));
		this.ctl.tbCodigoUbicacion.setValue (rec.get ('codigoUbicacion'));
		this.ctl.tbDetalleUbicacion.setValue (rec.get ('nroDetalleUbicacion'));
		this.ctl.tbCodMovimientoAnulacion.setValue (rec.get ('detMovimientoStockAnulacionId'));
	},

	ObtenerRegistroDeFormulario: function () {
		return null;
	}
});