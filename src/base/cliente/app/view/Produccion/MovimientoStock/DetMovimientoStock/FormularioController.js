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

Ext.define ('Sistema.view.Produccion.MovimientoStock.DetMovimientoStock.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-movst-dmov-FormularioController',

    init: function () {
    	FormularioDetalleControllerBase.InyectarDependencia (this, 'Sistema.view.Produccion.model.DetMovimientoStock');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this._onBtnGuardarClick
    		},
    		"button[name='btnCrearContenedorDestino']": {
				click: this.onBtnCrearContenedorDestinoClick
    		},
    		"prod-movst-dmov-Formulario": {
    			afterrender: this.onRender
    		},
			"textfield[name='tbCantidad']": {
				blur: this.FormatearCampoPuntoFlotante
			},
			"checkbox[name='ckMismoContenedor']": {
				change: this.onCkMismoContenedorChange
			},
			"checkbox[name='ckCrearDetalle']": {
				change: this.onCkCrearDetalleChange
			},
			"textfield[name='tbContenedorOrigen']": {
				change: this.onTbContenedorOrigenChange,
				specialkey: this.onTbContenedorOrigenSpecialKey
			},
			"textfield[name='tbContenedorDestino']": {
				change: this.tbChangeToUpperCase,
				specialkey: this.onTbContenedorDestinoSpecialKey
			}
    	});
    },

    //---------- Event Handlers ----------

	onBtnCrearContenedorDestinoClick: function () {
        var me = this;

		new ConsultaWS ().Ejecutar ('Produccion', 'MovimientoStock', 'FormularioController', 'GenerarNuevoContenedor', null, function (resp) {
			if (this.RespuestaOK ()) {
				me.ctl.tbContenedorDestino.setValue (resp.codigo);
				me.ctl.ContenedorDestinoId = resp.id;
				me.ctl.ContenedorNuevo = true;
				me.ctl.ckCrearDetalle.disable ();
				me.ctl.ckCrearDetalle.setValue (true);
				me.ctl.CampoDetalleDestino.Deshabilitar ();

			} else {
				me.ctl.ContenedorNuevo = false;
				me.ctl.tbContenedorDestino.setValue ('');
				me.ctl.ContenedorDestinoId = 0;

				Ext.Msg.alert('Error', this.GetMensajeRespuesta ());
			}
		});
	},

	onCkCrearDetalleChange: function () {
		if (this.ctl.ckCrearDetalle.value) {
			this.ctl.CampoDetalleDestino.Deshabilitar ();

		} else {
			this.ctl.CampoDetalleDestino.Habilitar ();
		}
	},

	onTbContenedorOrigenSpecialKey: function (f, e) {
    	if (e.getKey () == e.ENTER || e.getKey () == e.TAB) {
    		this.BuscarContenedorOrigenPorCodigo (f.value);
    	}
	},

	onTbContenedorDestinoSpecialKey: function (f, e) {
    	if (e.getKey () == e.ENTER || e.getKey () == e.TAB) {
    		this.BuscarContenedorDestinoPorCodigo (f.value);
    	}
	},

	onTbContenedorOrigenChange: function () {
		this.tbChangeToUpperCase (this.ctl.tbContenedorOrigen, this.ctl.tbContenedorOrigen.value);

		if (this.ctl.ckMismoContenedor.value) {
			this.ctl.tbContenedorDestino.setValue (this.ctl.tbContenedorOrigen.value);
		}
	},

	onCkMismoContenedorChange: function () {
		if (this.ctl.ckMismoContenedor.value) {
			this.ctl.tbContenedorDestino.disable ();
			this.ctl.tbContenedorDestino.setValue (this.ctl.tbContenedorOrigen.value);
			this.ctl.btnCrearContenedorDestino.disable ();
			this.ctl.ckCrearDetalle.setValue (true);
			this.ctl.ckCrearDetalle.disable ();
			this.ctl.btnImprimirContDestino.enable ();
			this.ctl.ContenedorNuevo = false;
			this.ctl.CampoDetalleDestino.Deshabilitar ();

		} else {
			this.ctl.tbContenedorDestino.enable ();
			this.ctl.tbContenedorDestino.setValue ('');
			this.ctl.btnCrearContenedorDestino.enable ();
			this.ctl.ckCrearDetalle.enable ();
			this.ctl.btnImprimirContDestino.disable ();
			this.ctl.ContenedorNuevo = false;
			this.ctl.CampoDetalleDestino.Deshabilitar ();
		}
    },

    //---------- Metodos Privados del Formulario ----------

    HabilitarOrigen: function (habilitar) {
    	if (habilitar) {
			this.ctl.tbContenedorOrigen.enable ();
			this.ctl.tbUbicacionOrigen.enable ();
			this.ctl.btnBuscarUbicacionOrigen.enable ();
			this.ctl.tbAreaOrigen.enable ();
			this.ctl.tbZonaOrigen.enable ();
			this.ctl.tbDetalleOrigen.enable ();
			this.ctl.btnBuscarDetalleOrigen.enable ();

			// Solo habilitamos la impresion cuando hay un contenedor seleccionado.
			this.ctl.btnImprimirContOrigen.disable ();

    	} else {
			this.ctl.tbContenedorOrigen.disable();
			this.ctl.tbUbicacionOrigen.disable ();
			this.ctl.btnBuscarUbicacionOrigen.disable ();
			this.ctl.tbAreaOrigen.disable ();
			this.ctl.tbZonaOrigen.disable ();
			this.ctl.tbDetalleOrigen.disable ();
			this.ctl.btnBuscarDetalleOrigen.disable ();
			this.ctl.btnImprimirContOrigen.disable ();
    	}
    },

    HabilitarDestino: function (habilitar) {
    	if (habilitar) {
			this.ctl.tbContenedorDestino.enable ();
			this.ctl.btnCrearContenedorDestino.enable ();
			this.ctl.tbUbicacionDestino.enable ();
			this.ctl.btnBuscarUbicacionDestino.enable ();
			this.ctl.tbAreaDestino.enable ();
			this.ctl.tbZonaDestino.enable ();
			this.ctl.CampoDetalleDestino.Deshabilitar ();

			if (this.ctl.ContenedorOrigenId != 0) {
				this.ctl.ckMismoContenedor.enable ();

			} else {
				this.ctl.ckMismoContenedor.disable ();
			}

		} else {
			this.ctl.ckMismoContenedor.disable ();
			this.ctl.tbContenedorDestino.disable ();
			this.ctl.btnCrearContenedorDestino.disable ();
			this.ctl.btnImprimirContDestino.disable ();
			this.ctl.tbUbicacionDestino.disable ();
			this.ctl.btnBuscarUbicacionDestino.disable ();
			this.ctl.tbAreaDestino.disable ();
			this.ctl.tbZonaDestino.disable ();
			this.ctl.ckCrearDetalle.disable ();
			this.ctl.tbDetalleDestino.disable ();
			this.ctl.btnBuscarDetalleDestino.disable ();
		}
    },

	BuscarContenedorDestinoPorCodigo: function (codigo) {
		var me = this;
		var productoId

		// Si hay un producto seleccionado lo pasamos como parametro en la busqueda.
		produtoId = null;
		if (this.ctl.CampoProducto.itemId != 0) {
			productoId = this.ctl.CampoProducto.itemId;
		}

		new ConsultaWS ().Ejecutar ('Produccion', 'MovimientoStock', 'FormularioController', 'GetInfoContenedor', {codigo: codigo, productoId: productoId}, function (resp) {
			if (this.RespuestaOK ()) {
				if (resp == null) {
					me.ctl.tbUbicacionDestino.setValue ('');
					me.ctl.tbAreaDestino.setValue ('');
					me.ctl.tbZonaDestino.setValue ('');
					me.ctl.tbDetalleDestino.setValue ('');
					me.ctl.tbContenedorDestino.setValue ('');
					me.ctl.ContenedorDestinoId = 0;
					me.ctl.btnImprimirContDestino.disable ();
					me.ctl.ContenedorNuevo = false;

					Ext.Msg.alert('Atencion', 'Contenedor Invalido');

				} else {
					me.CargarContenedorDestino (resp);
				}

			} else {
				Ext.Msg.alert('Error', this.GetMensajeRespuesta ());
			}
		});
	},

	BuscarContenedorOrigenPorCodigo: function (codigo) {
		var me = this;
		var productoId;

		// Si hay un producto seleccionado lo pasamos como parametro en la busqueda.
		produtoId = null;
		if (this.ctl.CampoProducto.itemId != 0) {
			productoId = this.ctl.CampoProducto.itemId;
		}

		new ConsultaWS ().Ejecutar ('Produccion', 'MovimientoStock', 'FormularioController', 'GetInfoContenedor', {codigo: codigo, productoId: productoId}, function (resp) {
			if (this.RespuestaOK ()) {
				if (resp == null) {
					Ext.Msg.alert('Atencion', 'Contenedor Invalido');

					// Limpio la Ubicacion Origen
					me.ctl.tbUbicacionOrigen.setValue ('');
					me.ctl.tbAreaOrigen.setValue ('');
					me.ctl.tbZonaOrigen.setValue ('');
					// Limpio el detalle Origen
					me.ctl.tbDetalleOrigen.setValue ('');
					// Limpio el contenedor origen
					me.ctl.tbContenedorOrigen.setValue ('');
					me.ctl.ContenedorOrigenId = 0;
					me.ctl.btnImprimirContOrigen.disable ();

					me.HabilitarDestino (false);

				} else {
					me.CargarContenedorOrigen (resp);
				}

			} else {
				Ext.Msg.alert('Error', this.GetMensajeRespuesta ());
			}
		});
	},

	CargarContenedorOrigen: function (resp) {
		// Chequeamos que el contenedor este ubicado dentro del almacen origen.
		if (resp.ubicacion.almacenId != this.getView ().paramsEntrada.almacenOrigenId) {
			Ext.Msg.alert('Atencion', 'El contenedor no se encuentra en el Almacen Origen');
			this.ctl.tbContenedorOrigen.setValue ('');
			this.ctl.ContenedorOrigenId = 0;
			this.ctl.btnImprimirContOrigen.disable ();

			return;
		}

		this.ctl.ContenedorOrigenId = resp.id;
		this.ctl.btnImprimirContOrigen.enable ();

		// Ubicacion Origen
		this.ctl.CampoUbicacionOrigen.itemId = resp.ubicacion.id;
		this.ctl.tbUbicacionOrigen.setValue (resp.ubicacion.codigo);
		this.ctl.tbAreaOrigen.setValue (resp.ubicacion.area.codigo);
		this.ctl.tbZonaOrigen.setValue (resp.ubicacion.zona.codigo);
		this.ctl.tbDetalleOrigen.setValue (resp.detalleUbicacion.nroDeDetalle);
		this.ctl.CampoDetalleOrigen.itemId = resp.detalleUbicacion.id;

		// Producto
		this.ctl.tbCodProducto.setValue (resp.detalleUbicacion.producto.codigo);
		this.ctl.tbDescProducto.setValue (resp.detalleUbicacion.producto.descripcionCorta);
		this.ctl.CampoProducto.itemId = resp.detalleUbicacion.productoId;

		// Seteo la UM si es que no fue seleccionada antes
		if (this.ctl.CampoUM.itemId == 0) {
			this.ctl.tbCodUM.setValue (resp.detalleUbicacion.unidadDeMedida.codigo);
			this.ctl.CampoUM.itemId = resp.detalleUbicacion.unidadDeMedida.id;
		}

		// Seteo la cantidad si es que no fue seteada antes
		if (Formato.Lib.ToFloat (this.ctl.tbCantidad.value) == 0) {
			this.ctl.tbCantidad.setValue (Formato.PuntoFlotante.Transformar (resp.detalleUbicacion.cantidad));
		}

		// Habilitamos la edicion del cuadro de destino (en caso de ser necesario)
		this.HabilitarDestino (this.ctl.HabilitaOrigenYDestino);
	},

	CargarContenedorDestino: function (resp) {
		// Chequeamos que el contenedor este ubicado dentro del almacen origen.
		if (resp.ubicacion.almacenId != this.getView ().paramsEntrada.almacenDestinoId) {
			Ext.Msg.alert('Atencion', 'El contenedor no se encuentra en el Almacen de Destino');
			this.ctl.tbContenedorDestino.setValue ('');
			this.ctl.ContenedorDestinoId = 0;

			return;
		}

		// Si no hay un producto seleccionado entonces usamos el que viene con el contenedor. Idem UM.
		if (this.ctl.CampoProducto.itemId == 0) {
			Ext.Msg.alert('Atencion', 'Debe seleccionar un producto primero');
			this.ctl.tbContenedorDestino.setValue ('');
			this.ctl.ContenedorDestinoId = 0;

			return;
		}

		// Chequeamos que el contenedor seleccionado no sea igual al origen (si es que hay un contenedor origen seleccionado)
		if (this.ctl.ContenedorOrigenId != 0 && resp.id == this.ctl.ContenedorOrigenId) {
			Ext.Msg.alert('Atencion', 'No puede seleccionar el mismo contenedor que en el origen');
			this.ctl.tbContenedorDestino.setValue ('');
			this.ctl.ContenedorDestinoId = 0;

			return;
		}

		// Chequeamos que tenga el mismo producto que el seleccionado en el detalle.
		if (resp.detalleUbicacion.producto.id != this.ctl.CampoProducto.itemId) {
			Ext.Msg.alert('Atencion', 'El contenedor no contiene al producto seleccionado');
			this.ctl.tbContenedorDestino.setValue ('');
			this.ctl.ContenedorDestinoId = 0;

			return;
		}

		this.ctl.ContenedorDestinoId = resp.id;
		this.ctl.btnImprimirContDestino.enable ();
		this.ctl.ContenedorNuevo = false;

		// Ubicacion Destino
		this.ctl.CampoUbicacionDestino.itemId = resp.ubicacion.id;
		this.ctl.tbUbicacionDestino.setValue (resp.ubicacion.codigo);
		this.ctl.tbAreaDestino.setValue (resp.ubicacion.area.codigo);
		this.ctl.tbZonaDestino.setValue (resp.ubicacion.zona.codigo);
		this.ctl.tbDetalleDestino.setValue (resp.detalleUbicacion.nroDeDetalle);
		this.ctl.CampoDetalleDestino.itemId = resp.detalleUbicacion.id;
		this.ctl.ckCrearDetalle.setValue (false);
		this.ctl.ckCrearDetalle.disable ();
	},

    ConfigurarPantallaFormulario: function (esNuevo, rec) {
    	this.ctl.EsNuevo 				= esNuevo;
		this.ctl.HabilitaOrigenYDestino = (!rec.get ('origenNull') && !rec.get ('destinoNull'));
		this.ctl.HabilitaOrigen 		= !this.ctl.HabilitaOrigenYDestino && !rec.get ('origenNull');
		this.ctl.HabilitaDestino 		= !this.ctl.HabilitaOrigenYDestino && !rec.get ('destinoNull');

    	if (rec != null) {
    		if (esNuevo && this.ctl.HabilitaOrigenYDestino) {
				this.HabilitarOrigen (true);

    		} else if (this.ctl.HabilitaOrigen) {
				this.HabilitarOrigen (true);

    		} else if (this.ctl.HabilitaDestino) {
    			this.HabilitarDestino (true);
    		}

			this.ctl.tbCantidad.setValue ('0');
			this.FormatearCampoPuntoFlotante (this.ctl.tbCantidad);
		}
    },

	//---------- Metodos Estandar del Formulario ----------

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 894;
    	ctl.params.altoVentana		= 490;
    },

	CargarComponentes: function () {
		var me = this;

		// Checkbox
		this.ctl.ckMismoContenedor = this.getView ().down ("checkbox[name='ckMismoContenedor']");
		this.ctl.ckCrearDetalle = this.getView ().down ("checkbox[name='ckCrearDetalle']");

		// Textfields
		this.ctl.tbContenedorOrigen = this.getView ().down ("textfield[name='tbContenedorOrigen']");
		this.ctl.tbUbicacionOrigen = this.getView ().down ("textfield[name='tbUbicacionOrigen']");
		this.ctl.tbAreaOrigen = this.getView ().down ("textfield[name='tbAreaOrigen']");
		this.ctl.tbZonaOrigen = this.getView ().down ("textfield[name='tbZonaOrigen']");
		this.ctl.tbDetalleOrigen = this.getView ().down ("textfield[name='tbDetalleOrigen']");
		this.ctl.tbContenedorDestino = this.getView ().down ("textfield[name='tbContenedorDestino']");
		this.ctl.tbUbicacionDestino = this.getView ().down ("textfield[name='tbUbicacionDestino']");
		this.ctl.tbAreaDestino = this.getView ().down ("textfield[name='tbAreaDestino']");
		this.ctl.tbZonaDestino = this.getView ().down ("textfield[name='tbZonaDestino']");
		this.ctl.tbDetalleDestino = this.getView ().down ("textfield[name='tbDetalleDestino']");
		this.ctl.tbCodProducto = this.getView ().down ("textfield[name='tbCodProducto']");
		this.ctl.tbDescProducto = this.getView ().down ("textfield[name='tbDescProducto']");
		this.ctl.tbCantidad = this.getView ().down ("textfield[name='tbCantidad']");
		this.ctl.tbCodUM = this.getView ().down ("textfield[name='tbCodUM']");

		// Buttons
		this.ctl.btnBuscarUbicacionOrigen = this.getView ().down ("button[name='btnBuscarUbicacionOrigen']");
		this.ctl.btnBuscarUbicacionDestino = this.getView ().down ("button[name='btnBuscarUbicacionDestino']");
		this.ctl.btnCrearContenedorDestino = this.getView ().down ("button[name='btnCrearContenedorDestino']");
		this.ctl.btnBuscarProducto = this.getView ().down ("button[name='btnBuscarProducto']");
		this.ctl.btnBuscarUM = this.getView ().down ("button[name='btnBuscarUM']");
		this.ctl.btnBuscarDetalleOrigen = this.getView ().down ("button[name='btnBuscarDetalleOrigen']");
		this.ctl.btnBuscarDetalleDestino = this.getView ().down ("button[name='btnBuscarDetalleDestino']");
		this.ctl.btnImprimirContDestino = this.getView ().down ("button[name='btnImprimirContDestino']");
		this.ctl.btnImprimirContOrigen = this.getView ().down ("button[name='btnImprimirContOrigen']");

		// Campo Producto
		this.ctl.CampoProducto = new CampoBusqueda ();
		this.ctl.CampoProducto.SetClaseModelo ('Sistema.view.Produccion.model.Producto');
		this.ctl.CampoProducto.SetClaseListado ('Sistema.view.Produccion.Producto.Listado');
		this.ctl.CampoProducto.SetClaseFormulario ('Sistema.view.Produccion.Producto.Formulario');
		this.ctl.CampoProducto.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/MovimientoStock/FormularioController.php');
		this.ctl.CampoProducto.SetFuncionLecturaPorCodigo ('BuscarProductoPorCodigo');
		this.ctl.CampoProducto.SetFuncionLecturaPorId ('BuscarProductoPorId');
		this.ctl.CampoProducto.SetController (this);
		this.ctl.CampoProducto.SetTextFieldCodigo ('tbCodProducto');
		this.ctl.CampoProducto.SetBtnBuscar ('btnBuscarProducto');

		// Variables del formulario
		this.ctl.ContenedorOrigenId 	= 0;
		this.ctl.ContenedorDestinoId 	= 0;
		this.ctl.HabilitaOrigen 		= false;
		this.ctl.HabilitaDestino 		= false;
		this.ctl.HabilitaOrigenYDestino = false;
		this.ctl.EsNuevo 				= false;
		this.ctl.ContenedorNuevo		= false;

		this.ctl.CampoProducto.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodProducto.setValue (rec.get ('codigo'));
			me.ctl.tbDescProducto.setValue (rec.get ('descripcionCorta'));

			// Seteamos la UM
			me.ctl.tbCodUM.setValue (rec.get ('unidadDeMedida').codigo);
			me.ctl.CampoUM.itemId = rec.get ('unidadDeMedida').id;

			// Limpiamos el Contenedor, la Ub Orig y el Det Orig
			me.ctl.tbContenedorOrigen.setValue ('');
			me.ctl.ContenedorOrigenId = 0;
			me.ctl.btnImprimirContOrigen.disable ();
			me.ctl.CampoUbicacionOrigen.itemId = 0;
			me.ctl.tbUbicacionOrigen.setValue ('');
			me.ctl.CampoUbicacionOrigen.itemId = 0;
			me.ctl.CampoDetalleOrigen.itemId = 0;
			me.ctl.tbDetalleOrigen.setValue ('');
			me.ctl.tbZonaOrigen.setValue ('');
			me.ctl.tbAreaOrigen.setValue ('');

			this.itemId = rec.get ('id');

			// Agrega los filtros en todos los otros controles para que filtren por producto.
			me.ctl.CampoUbicacionOrigen.AgregarParametroAdicional ('productoId', this.itemId);
			me.HabilitarDestino (false);
		};

		this.ctl.CampoProducto.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodProducto.setValue ('');
			me.ctl.tbDescProducto.setValue ('');

			// Limpiamos el Contenedor, la Ub Orig y el Det Orig
			me.ctl.tbContenedorOrigen.setValue ('');
			me.ctl.btnImprimirContOrigen.disable ();
			me.ctl.ContenedorOrigenId = 0;
			me.ctl.CampoUbicacionOrigen.itemId = 0;
			me.ctl.tbUbicacionOrigen.setValue ('');
			me.ctl.CampoUbicacionOrigen.itemId = 0;
			me.ctl.CampoDetalleOrigen.itemId = 0;
			me.ctl.tbDetalleOrigen.setValue ('');
			me.ctl.tbZonaOrigen.setValue ('');
			me.ctl.tbAreaOrigen.setValue ('');

			me.ctl.CampoUbicacionOrigen.AgregarParametroAdicional ('productoId', null);
			me.HabilitarDestino (false);
		};

		// CampoUbicacionOrigen
		this.ctl.CampoUbicacionOrigen = new CampoBusqueda ();
		this.ctl.CampoUbicacionOrigen.SetClaseModelo ('Sistema.view.Produccion.model.ItemConsultaUbicacionMovStock');
		this.ctl.CampoUbicacionOrigen.SetClaseListado ('Sistema.view.Produccion.ConsultaUbicacionMovStock.Listado');
		this.ctl.CampoUbicacionOrigen.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/MovimientoStock/FormularioController.php');
		this.ctl.CampoUbicacionOrigen.SetController (this);
		this.ctl.CampoUbicacionOrigen.SetFuncionLecturaPorCodigo ('BuscarUbicacionDetallePorCodigo');
		this.ctl.CampoUbicacionOrigen.SetFuncionLecturaPorId ('BuscarUbicacionDetallePorId');
		this.ctl.CampoUbicacionOrigen.SetBtnBuscar ('btnBuscarUbicacionOrigen');
		this.ctl.CampoUbicacionOrigen.SetTextFieldCodigo ('tbUbicacionOrigen');

		this.ctl.CampoUbicacionOrigen.onRegistroSeleccionadoOk = function (rec) {
			var almacenId, ubicacionId;

			// Si selecciono desde un listado trae un detalle
			if (rec.get ('esDetalle')) {
				// Actualiza la ubicacion origen
				this.itemId = rec.get ('ubicacion').id;
				me.ctl.tbUbicacionOrigen.setValue (rec.get ('ubicacion').codigo);

				// seteo zona y area
				me.ctl.tbZonaOrigen.setValue (rec.get ('ubicacion').zona.codigo);
				me.ctl.tbAreaOrigen.setValue (rec.get ('ubicacion').area.codigo);

				// Actualiza el detalle origen
				me.ctl.tbDetalleOrigen.setValue (rec.get ('nroDeDetalle'));
				me.ctl.CampoDetalleOrigen.itemId = rec.get ('id');

				ubicacionId = rec.get ('ubicacion').id;
				almacenId = rec.get ('ubicacion').almacenId;

				// Sete el contenedor si es que tiene uno asociado, sino lo limpio
				if (rec.get ('contenedor') != null) {
					me.ctl.tbContenedorOrigen.setValue (rec.get ('contenedor').codigo);
					me.ctl.ContenedorOrigenId = rec.get ('contenedorId');
					me.ctl.btnImprimirContOrigen.enable ();

				} else {
					me.ctl.tbContenedorOrigen.setValue ('');
					me.ctl.ContenedorOrigenId = 0;
					me.ctl.btnImprimirContOrigen.disable ();
				}

				// Seteo la UM si es que no esta seleccionada
				if (me.ctl.CampoUM.itemId == 0) {
					me.ctl.CampoUM.itemId = rec.get ('unidadDeMedida').id;
					me.ctl.tbCodUM.setValue (rec.get ('unidadDeMedida').codigo);
				}

				// Seteo la cantidad si es que no fue seteada antes
				if (Formato.Lib.ToFloat (me.ctl.tbCantidad.value) == 0) {
					me.ctl.tbCantidad.setValue (Formato.PuntoFlotante.Transformar (rec.get ('cantidad')));
				}

				// Actualizamos cantidad, UM y producto
				if (me.ctl.CampoProducto.itemId == 0) {
					me.ctl.CampoProducto.itemId = rec.get ('productoId');
					me.ctl.tbCodProducto.setValue (rec.get ('producto').codigo);
					me.ctl.tbDescProducto.setValue (rec.get ('producto').descripcionCorta);
				}

				// Habilitamos la edicion del cuadro de destino (en caso de ser necesario)
				me.HabilitarDestino (me.ctl.HabilitaOrigenYDestino);

			// Si busco por codigo trae una ubicacion
			} else {
				this.itemId = rec.get ('id');
				// Seteo zona y ubicacion.
				me.ctl.tbUbicacionOrigen.setValue (rec.get ('codigo'));
				me.ctl.tbZonaOrigen.setValue (rec.get ('zona').codigo);
				me.ctl.tbAreaOrigen.setValue (rec.get ('area').codigo);

				// Blanqueo el detalle origen.
				me.ctl.tbDetalleOrigen.setValue ('');
				me.ctl.tbDetalleOrigen.itemId = 0;

				// Blanqueo el contenedor origen.
				me.ctl.tbContenedorOrigen.setValue ('');
				me.ctl.ContenedorOrigenId = 0;
				me.ctl.btnImprimirContOrigen.disable ();

				ubicacionId = rec.get ('id');
				almacenId = rec.get ('almacenId');
				me.HabilitarDestino (false);
			}

			// Habilitamos la busqueda por detalle
			me.ctl.CampoDetalleOrigen.Habilitar ();
		};

		this.ctl.CampoUbicacionOrigen.onRegistroSeleccionadoError = function () {
			me.ctl.tbUbicacionOrigen.setValue ('');
			me.ctl.tbZonaOrigen.setValue ('');
			me.ctl.tbAreaOrigen.setValue ('');
			me.ctl.tbDetalleOrigen.setValue ('');
			me.ctl.CampoDetalleOrigen.itemId = 0;
			me.ctl.CampoDetalleOrigen.Deshabilitar ();
			me.HabilitarDestino (false);
		};

		this.ctl.CampoUbicacionOrigen.SetFiltroListado (function () {
			var ret;

			// Si hay un producto seleccionado lo pasa como parametro a la busqueda.
			if (me.ctl.CampoProducto.itemId != 0) {
				ret = [{
					nombre: 'almacen',
					params: {
						id: me.getView ().paramsEntrada.almacenOrigenId
					}
				}, {
					nombre: 'producto',
					params: {
						id: me.ctl.CampoProducto.itemId
					}
				}];

			// Sino solo pasa el almacen
			} else {
				ret = [{
					nombre: 'almacen',
					params: {
						id: me.getView ().paramsEntrada.almacenOrigenId
					}
				}];
			}

			return ret;
		});

		// CampoUbicacionDestino
		this.ctl.CampoUbicacionDestino = new CampoBusqueda ();
		this.ctl.CampoUbicacionDestino.SetClaseModelo ('Sistema.view.Produccion.model.UbicacionAlmacen');
		this.ctl.CampoUbicacionDestino.SetClaseListado ('Sistema.view.Produccion.UbicacionAlmacen.Listado');
		this.ctl.CampoUbicacionDestino.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/UbicacionAlmacen/FormularioController.php');
		this.ctl.CampoUbicacionDestino.SetController (this);
		this.ctl.CampoUbicacionDestino.SetTextFieldCodigo ('tbUbicacionDestino');
		this.ctl.CampoUbicacionDestino.SetBtnBuscar ('btnBuscarUbicacionDestino');

		this.ctl.CampoUbicacionDestino.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbUbicacionDestino.setValue (rec.get ('codigo'));
			me.ctl.tbZonaDestino.setValue (rec.get ('zona').codigo);
			me.ctl.tbAreaDestino.setValue (rec.get ('area').codigo);
			me.ctl.CampoDetalleDestino.itemId = 0;
			me.ctl.tbDetalleDestino.setValue ('');
			this.itemId = rec.get ('id');

			me.ctl.CampoDetalleDestino.AgregarParametroAdicional ('ubicacionId', this.itemId);
			me.ctl.CampoDetalleDestino.AgregarParametroAdicional ('almacenId', me.getView ().paramsEntrada.almacenDestinoId);
			me.ctl.CampoDetalleDestino.AgregarParametroAdicional ('productoId', me.ctl.CampoProducto.itemId);

			if (me.ctl.tbContenedorDestino.value == '') {
				me.ctl.CampoDetalleDestino.Deshabilitar ();
				me.ctl.ckCrearDetalle.enable();
				me.ctl.ckCrearDetalle.setValue (true);
			}
		};

		this.ctl.CampoUbicacionDestino.onRegistroSeleccionadoError = function () {
			me.ctl.tbUbicacionOrigen.setValue ('');
			me.ctl.tbZonaDestino.setValue ('');
			me.ctl.tbAreaDestino.setValue ('');
			me.ctl.CampoDetalleDestino.itemId = 0;
			me.ctl.tbDetalleDestino.setValue ('');
			me.ctl.CampoDetalleDestino.Deshabilitar ();
			me.ctl.ckCrearDetalle.disable ();
		};

		// Siempre filtro las posiciones destino por almacen y producto
		this.ctl.CampoUbicacionDestino.SetFiltroListado (function () {
			var ret;

			ret = [{
				nombre: 'almacen',
				params: {
					id: me.getView ().paramsEntrada.almacenDestinoId
				}
			}];

			return ret;
		});

		// Campo UM
		this.ctl.CampoUM = new CampoBusqueda ();
		this.ctl.CampoUM.SetClaseModelo ('Sistema.view.Produccion.model.UnidadDeMedida');
		this.ctl.CampoUM.SetClaseListado ('Sistema.view.Produccion.UnidadDeMedida.Listado');
		this.ctl.CampoUM.SetClaseFormulario ('Sistema.view.Produccion.UnidadDeMedida.Formulario');
		this.ctl.CampoUM.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/UnidadDeMedida/FormularioController.php');
		this.ctl.CampoUM.SetController (this);
		this.ctl.CampoUM.SetTextFieldCodigo ('tbCodUM');
		this.ctl.CampoUM.SetBtnBuscar ('btnBuscarUM');

		this.ctl.CampoUM.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodUM.setValue (rec.get ('codigo'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoUM.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodUM.setValue ('');
		};

		// Campo Detalle Origen
		this.ctl.CampoDetalleOrigen = new CampoBusqueda ();
		this.ctl.CampoDetalleOrigen.SetClaseModelo ('Sistema.view.Produccion.model.ItemConsultaDetalleUbicacion');
		this.ctl.CampoDetalleOrigen.SetClaseListado ('Sistema.view.Produccion.ConsultaDetalleUbicacion.Listado');
		this.ctl.CampoDetalleOrigen.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/ConsultaDetalleUbicacion/FormularioController.php');
		this.ctl.CampoDetalleOrigen.SetController (this);
		this.ctl.CampoDetalleOrigen.SetBtnBuscar ('btnBuscarDetalleOrigen');

		this.ctl.CampoDetalleOrigen.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbDetalleOrigen.setValue (rec.get ('nroDeDetalle'));
			this.itemId = rec.get ('id');

			// Si no hay producto seleccionado entonces lo seleccionamos.
			if (me.ctl.CampoProducto.itemId == 0) {
				me.ctl.CampoProducto.itemId = rec.get ('productoId');
				me.ctl.tbCodProducto.setValue (rec.get ('producto').codigo);
				me.ctl.tbDescProducto.setValue (rec.get ('producto').descripcionCorta);
			}

			// Seteo la UM si es que no esta seleccionada
			if (me.ctl.CampoUM.itemId == 0) {
				me.ctl.CampoUM.itemId = rec.get ('unidadDeMedida').id;
				me.ctl.tbCodUM.setValue (rec.get ('unidadDeMedida').codigo);
			}

			// Seteo la cantidad si es que no fue seteada antes
			if (Formato.Lib.ToFloat (me.ctl.tbCantidad.value) == 0) {
				me.ctl.tbCantidad.setValue (Formato.PuntoFlotante.Transformar (rec.get ('cantidad')));
			}

			// Seteamos el contenedor si viene con el detalle o lo limpiamos.
			if (rec.get ('contenedor') != null) {
				me.ctl.tbContenedorOrigen.setValue (rec.get ('contenedor').codigo);
				me.ctl.ContenedorOrigenId = rec.get ('contenedorId');
				me.ctl.btnImprimirContOrigen.enable ();

			} else {
				me.ctl.tbContenedorOrigen.setValue ('');
				me.ctl.btnImprimirContOrigen.disable ();
				me.ctl.ContenedorOrigenId = 0;
			}

			// Habilitamos la edicion del cuadro de destino (en caso de ser necesario)
			me.HabilitarDestino (me.ctl.HabilitaOrigenYDestino);
		};

		this.ctl.CampoDetalleOrigen.onRegistroSeleccionadoError = function () {
			me.ctl.tbDetalleOrigen.setValue ('');
		};

		this.ctl.CampoDetalleOrigen.SetFiltroListado (function () {
			var ret;

			ret = [{
				nombre: 'productoId',
				params: {
					id: LibGeneral.GetIdOrNull (me.ctl.CampoProducto.itemId)
				}
			}, {
				nombre: 'almacenId',
				params: {
					id: me.getView ().paramsEntrada.almacenOrigenId
				}
			}, {
				nombre: 'ubicacion',
				params: {
					id: LibGeneral.GetIdOrNull (me.ctl.CampoUbicacionOrigen.itemId)
				}
			}];

			return ret;
		});

		// Campo Detalle Destino
		this.ctl.CampoDetalleDestino = new CampoBusqueda ();
		this.ctl.CampoDetalleDestino.SetClaseModelo ('Sistema.view.Produccion.model.ItemConsultaDetalleUbicacion');
		this.ctl.CampoDetalleDestino.SetClaseListado ('Sistema.view.Produccion.ConsultaDetalleUbicacion.Listado');
		this.ctl.CampoDetalleDestino.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/ConsultaDetalleUbicacion/FormularioController.php');
		this.ctl.CampoDetalleDestino.SetController (this);
		this.ctl.CampoDetalleDestino.SetTextFieldCodigo ('tbDetalleDestino');
		this.ctl.CampoDetalleDestino.SetBtnBuscar ('btnBuscarDetalleDestino');

		this.ctl.CampoDetalleDestino.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbDetalleDestino.setValue (rec.get ('nroDeDetalle'));
			this.itemId = rec.get ('id');

			if (rec.get ('contenedor') != null) {
				me.ctl.tbContenedorDestino.setValue (rec.get ('contenedor').codigo);
				me.ctl.ContenedorDestinoId = rec.get ('contenedor').id;
			}
		};

		this.ctl.CampoDetalleDestino.onRegistroSeleccionadoError = function () {
			me.ctl.tbDetalleDestino.setValue ('');
		};

		this.ctl.CampoDetalleDestino.SetFiltroListado (function () {
			var ret;

			ret = [{
				nombre: 'productoId',
				params: {
					id: me.ctl.CampoProducto.itemId
				}
			}, {
				nombre: 'almacenId',
				params: {
					id: me.getView ().paramsEntrada.almacenDestinoId
				}
			}, {
				nombre: 'ubicacion',
				params: {
					id: LibGeneral.GetIdOrNull (me.ctl.CampoUbicacionDestino.itemId)
				}
			}];

			return ret;
		});
	},

    GetElementoFoco: function () {
    	return "textfield[name='tbCodProducto']";
    },

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		this.params.registro = rec;

		if (esNuevo) {
			this.ConfigurarPantallaFormulario (esNuevo, this.getView ().paramsEntrada.tipoMovimiento);
			// Inicializamos los parametros adicionales del detalle
			this.ctl.CampoUbicacionDestino.AgregarParametroAdicional ('almacenId', this.getView ().paramsEntrada.almacenDestinoId);
			this.ctl.CampoUbicacionDestino.AgregarParametroAdicional ('productoId', null);

			this.ctl.CampoDetalleDestino.AgregarParametroAdicional ('ubicacionId', null);
			this.ctl.CampoDetalleDestino.AgregarParametroAdicional ('almacenId', this.getView ().paramsEntrada.almacenDestinoId);
			this.ctl.CampoDetalleDestino.AgregarParametroAdicional ('productoId', null);

			this.ctl.CampoDetalleOrigen.AgregarParametroAdicional ('ubicacionId', null);
			this.ctl.CampoDetalleOrigen.AgregarParametroAdicional ('almacenId', null);
			this.ctl.CampoDetalleOrigen.AgregarParametroAdicional ('productoId', null);

			// Inicializamos los parametros en null
			this.ctl.CampoUbicacionOrigen.AgregarParametroAdicional ('productoId', null);
			this.ctl.CampoUbicacionOrigen.AgregarParametroAdicional ('almacenId', this.getView ().paramsEntrada.almacenOrigenId);

		} else {
			this.ctl.CampoProducto.BuscarPorId (rec.get ('productoId'));
			this.ctl.CampoUM.BuscarPorId (rec.get ('unidadDeMedidaId'));
			this.ctl.tbCantidad.setValue (Formato.PuntoFlotante.Transformar (rec.get ('cantidad')));
		}
	},

	_onBtnGuardarClick: function () {
		var me = this;
		var params = {};

		if (!this.ValidarFormulario ()) {
			return null;
		}

		params = {
			productoId	: me.ctl.CampoProducto.itemId,
			um			: me.ctl.CampoUM.itemId,
			det			: me.ctl.CampoDetalleOrigen.itemId,
			cant		: me.ctl.tbCantidad.value
		};

		new ConsultaWS ().Ejecutar ('Produccion', 'MovimientoStock', 'FormularioController', 'ChequearUM', params, function (resp) {
			if (this.RespuestaOK ()) {
				if (resp.resultado == true) {
					me.onBtnGuardarClick ();

				} else {
					Ext.Msg.alert('Error', resp.resultado_txt);
				}

			} else {
				Ext.Msg.alert('Error', this.GetMensajeRespuesta ());
			}
		});
	},

	ObtenerRegistroDeFormulario: function () {
		this.params.registro.set ('productoId', this.ctl.CampoProducto.itemId);
		this.params.registro.set ('codigoProducto', this.ctl.tbCodProducto.value);
		this.params.registro.set ('cantidad', this.ctl.tbCantidad.value);
		this.params.registro.set ('unidadDeMedidaId', this.ctl.CampoUM.itemId);
		this.params.registro.set ('codigoUnidadDeMedida', this.ctl.tbCodUM.value);
		this.params.registro.set ('codigoUbicacionOrigen', this.ctl.tbUbicacionOrigen.value);
		this.params.registro.set ('codigoUbicacionDestino', this.ctl.tbUbicacionDestino.value);
		this.params.registro.set ('codigoContenedorOrigen', this.ctl.tbContenedorOrigen.value);
		this.params.registro.set ('codigoContenedorDestino', this.ctl.tbContenedorDestino.value);
		this.params.registro.set ('contenedorOrigenId', this.ctl.ContenedorOrigenId);
		this.params.registro.set ('contenedorDestinoId', this.ctl.ContenedorDestinoId);
		this.params.registro.set ('ubicacionAlmacenOrigenId', this.ctl.CampoUbicacionOrigen.itemId);
		this.params.registro.set ('ubicacionAlmacenDestinoId', this.ctl.CampoUbicacionDestino.itemId);
		this.params.registro.set ('detalleUbicacionOrigenId', this.ctl.CampoDetalleOrigen.itemId);
		this.params.registro.set ('detalleUbicacionDestinoId', this.ctl.CampoDetalleDestino.itemId);

		return this.params.registro;
	},

	ValidarFormulario: function () {
		if (Formato.Lib.ToFloat (this.ctl.tbCantidad.value) <= 0) {
			Ext.Msg.alert('Error', 'Debe indicar una cantidad mayor a cero');
			return false;
		}

		if (this.ctl.CampoProducto.itemId == 0) {
			Ext.Msg.alert('Error', 'Debe seleccionar un Producto');
			return false;
		}

		if (this.ctl.CampoUM.itemId == 0) {
			Ext.Msg.alert('Error', 'Debe seleccionar una Unidad de Medida');
			return false;
		}

		if (this.ctl.HabilitaOrigenYDestino) {
			if (this.ctl.CampoUbicacionOrigen.itemId == 0) {
				Ext.Msg.alert('Error', 'Debe seleccionar una ubicacion origen');
				return false;
			}

			if (this.ctl.CampoUbicacionDestino.itemId == 0) {
				Ext.Msg.alert('Error', 'Debe seleccionar una ubicacion destino');
				return false;
			}

			if (this.ctl.CampoDetalleOrigen.itemId == 0) {
				Ext.Msg.alert('Error', 'Debe seleccionar un detalle de la ubicacion origen');
				return false;
			}

			if (!this.ctl.ckCrearDetalle.value && this.ctl.CampoDetalleDestino.itemId == 0) {
				Ext.Msg.alert('Error', 'Debe seleccionar o crear un detalle para la ubicacion destino');
				return false;
			}

		} else if (this.ctl.HabilitaOrigen) {
			if (this.ctl.CampoUbicacionOrigen.itemId == 0) {
				Ext.Msg.alert('Error', 'Debe seleccionar una ubicacion origen');
				return false;
			}

			if (this.ctl.CampoDetalleOrigen.itemId == 0) {
				Ext.Msg.alert('Error', 'Debe seleccionar un detalle de la ubicacion origen');
				return false;
			}

		} else {
			if (this.ctl.CampoUbicacionDestino.itemId == 0) {
				Ext.Msg.alert('Error', 'Debe seleccionar una ubicacion destino');
				return false;
			}

			if (!this.ctl.ckCrearDetalle.value && this.ctl.CampoDetalleDestino.itemId == 0) {
				Ext.Msg.alert('Error', 'Debe seleccionar o crear un detalle para la ubicacion destino');
				return false;
			}
		}

		return true;
	}
});