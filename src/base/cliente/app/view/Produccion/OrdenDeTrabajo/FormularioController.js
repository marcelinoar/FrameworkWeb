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

Ext.define ('Sistema.view.Produccion.OrdenDeTrabajo.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-ot-FormularioController',
	requires: [
		'Sistema.view.Produccion.model.OrdenDeTrabajo'
	],

    init: function () {
    	FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Produccion.model.OrdenDeTrabajo', 'Produccion:OrdenDeTrabajo');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.onBtnGuardarClick
    		},
    		"prod-ot-Formulario": {
    			afterrender: this.onRender
    		},
			"textfield[name='tbCantidad']": {
				blur: this.tbCantidadBlur
			},
			"button[name='btnCambiarEstadoOT']": {
				click: this.btnCambiarEstadoOTClick
			}
    	});
    },

	//
	// Al perder el foco formatea el campo cantidad y actualiza los valores del formualrio.
	//
    tbCantidadBlur: function (ctl) {
		this.FormatearCampoPuntoFlotante (ctl);
		this.ctl.lstDetFormulaDeProduccionOT.ActualizarDetalleCantidades (this.ctl.tbCantidad.value, this.ctl.CampoUM.itemId, this.ctl.CampoProducto.itemId);
		this.ctl.lstOperacionesHojaDeRuta.ActualizarTiempoListado (this.ctl.tbCantidad.value, this.ctl.CampoUM.itemId, this.ctl.CampoProducto.itemId);
    },

    btnCambiarEstadoOTClick: function () {
    	this.CambiarEstadoOT ();
    },

	//
	// Cuando se da enter o TAB recalcula la cantidad de materiales a utilizar.
	//
    onTbCantidadSpecialKey: function (f, e) {
        if (e.getKey () == e.ENTER || e.getKey () == e.TAB) {
			this.ctl.lstDetFormulaDeProduccionOT.ActualizarDetalleCantidades (this.ctl.tbCantidad.value, this.ctl.CampoUM.itemId, this.ctl.CampoProducto.itemId);
			this.ctl.lstOperacionesHojaDeRuta.ActualizarTiempoListado (this.ctl.tbCantidad.value, this.ctl.CampoUM.itemId, this.ctl.CampoProducto.itemId);
		}
    },

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 1024;
    	ctl.params.altoVentana		= 650;
    },

	CargarComponentes: function () {
		var me = this;

		this.params.nombreEntidad = 'Orden de Trabajo';

		// Cargamos los elementos de la pantalla
		this.ctl.tbCodigo 				= this.getView ().down ("textfield[name='tbCodigo']");
		this.ctl.tbEstado				= this.getView ().down ("textfield[name='tbEstado']");
		this.ctl.tbCantidad 			= this.getView ().down ("textfield[name='tbCantidad']");
		this.ctl.tbFechaCreacion 		= this.getView ().down ("datefield[name='tbFechaCreacion']");
		this.ctl.tbFechaProgramada 		= this.getView ().down ("datefield[name='tbFechaProgramada']");
		this.ctl.tbFechaProduccionReal 	= this.getView ().down ("datefield[name='tbFechaProduccionReal']");
		this.ctl.tbFechaTerminada 		= this.getView ().down ("datefield[name='tbFechaTerminada']");
		this.ctl.tbCodProducto 			= this.getView ().down ("textfield[name='tbCodProducto']");
		this.ctl.tbDescProducto 		= this.getView ().down ("textfield[name='tbDescProducto']");
		this.ctl.tbCodCentroDeTrabajo 	= this.getView ().down ("textfield[name='tbCodCentroDeTrabajo']");
		this.ctl.tbDescCentroDeTrabajo 	= this.getView ().down ("textfield[name='tbDescCentroDeTrabajo']");
		this.ctl.tbCodUM 				= this.getView ().down ("textfield[name='tbCodUM']");
		this.ctl.tbDescUM 				= this.getView ().down ("textfield[name='tbDescUM']");
		this.ctl.tbComentarios 			= this.getView ().down ("textareafield[name='tbComentarios']");
		this.ctl.tbCodPedidoDeVentas	= this.getView ().down ("textfield[name='tbCodPedidoDeVentas']");
		this.ctl.tbDescPedidoDeVentas	= this.getView ().down ("textfield[name='tbDescPedidoDeVentas']");
		this.ctl.tbDescOtPadre			= this.getView ().down ("textfield[name='tbDescOtPadre']");
		this.ctl.tbCodOtPadre			= this.getView ().down ("textfield[name='tbCodOtPadre']");
		this.ctl.btnVerProducto			= this.getView ().down ("button[name='btnVerProducto']");
		this.ctl.btnCambiarEstadoOT		= this.getView ().down ("button[name='btnCambiarEstadoOT']");
		this.ctl.btnBorrar				= this.getView ().down ("button[name='btnBorrar']");
		this.ctl.btnBuscarProducto		= this.getView ().down ("button[name='btnBuscarProducto']");

		// Configuracion de listados
		this.ctl.lstValesDeFabricacion 			= this.getView ().down ("prod-ot-vf-Listado").controller;
		this.ctl.lstDetFormulaDeProduccionOT	= this.getView ().down ("prod-ot-frm-Listado").controller;
		this.ctl.lstOperacionesHojaDeRuta		= this.getView ().down ("prod-ot-hdr-Listado").controller;
		this.ctl.lstDetReservaMateriaPrimaOT	= this.getView ().down ("prod-ot-res-Listado").controller;
		this.ctl.lstDetMedicionDeAtributoOT		= this.getView ().down ("prod-ot-med-Listado").controller;
		this.ctl.lstDetRegistroHistoricoOT		= this.getView ().down ("prod-ot-hist-Listado").controller;
		this.ctl.lstEstadoFabricacion			= this.getView ().down ("prod-ot-est-Listado").controller;

		this.ctl.lstDetFormulaDeProduccionOT.ConfigurarListado (function () {me.SetDetalleModificado ();});
		this.ctl.lstOperacionesHojaDeRuta.ConfigurarListado (function () {me.SetDetalleModificado ();});
		this.ctl.lstDetReservaMateriaPrimaOT.ConfigurarListado (function () {me.SetDetalleModificado ();});

		// Variables locales
		this.ctl.centroDeTrabajoId = 0;

		// Configuracion del CampoProducto.
		this.ctl.CampoProducto = new CampoBusqueda ();
		this.ctl.CampoProducto.SetClaseModelo ('Sistema.view.Produccion.model.Producto');
		this.ctl.CampoProducto.SetClaseListado ('Sistema.view.Produccion.Producto.Listado');
		this.ctl.CampoProducto.SetClaseFormulario ('Sistema.view.Produccion.Producto.Formulario');
		this.ctl.CampoProducto.SetFuncionLecturaPorId ('BuscarProductoPorId');
		this.ctl.CampoProducto.SetFuncionLecturaPorCodigo ('BuscarProductoPorCodigo');
		this.ctl.CampoProducto.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/OrdenDeTrabajo/FormularioController.php');
		this.ctl.CampoProducto.SetController (this);
		this.ctl.CampoProducto.SetTextFieldCodigo ('tbCodProducto');
		this.ctl.CampoProducto.SetBtnBuscar ('btnBuscarProducto');
		this.ctl.CampoProducto.SetBtnVerRegistro ('btnVerProducto');

		// Filtramos para que solo se listen los productos de fabricacion.
		this.ctl.CampoProducto.SetFiltroListado (function () {
			var ret = [{
				nombre: 'tipo_sistema',
				params: {
					id: 1
				}
			}];

			return ret;
		});

		this.ctl.CampoProducto.onRegistroSeleccionadoOk = function (rec) {
			if (!rec.get ('esProductoDeFabricacion')) {
				Ext.Msg.alert('Alerta', 'El producto seleccionado no es un producto de fabricacion.');
				me.ctl.CampoProducto.onRegistroSeleccionadoError ();

			} else {
				me.ctl.tbCodProducto.setValue (rec.get ('codigo'));
				me.ctl.tbDescProducto.setValue (rec.get ('descripcionCorta'));
				me.ctl.tbCodCentroDeTrabajo.setValue (rec.get ('centroDeTrabajo').codigo);
				me.ctl.tbDescCentroDeTrabajo.setValue (rec.get ('centroDeTrabajo').nombre);
				me.ctl.centroDeTrabajoId = rec.get ('centroDeTrabajo').id;
				me.ctl.tbCodUM.setValue (rec.get ('unidadDeMedidaFabricacion').codigo);
				me.ctl.tbDescUM.setValue (rec.get ('unidadDeMedidaFabricacion').descripcionCorta);
				me.ctl.CampoUM.itemId = (rec.get ('unidadDeMedidaFabricacion').id);

				me.ctl.lstDetFormulaDeProduccionOT.SetFormulaDeProduccion (rec.get ('formulaDeProduccionId'));
				me.ctl.lstOperacionesHojaDeRuta.SetHojaDeRuta (rec.get ('hojaDeRutaId'));
				this.itemId = rec.get ('id');

				me.ctl.lstDetFormulaDeProduccionOT.ActualizarDetalleCantidades (me.ctl.tbCantidad.value, me.ctl.CampoUM.itemId, me.ctl.CampoProducto.itemId);
				me.ctl.lstOperacionesHojaDeRuta.ActualizarListado (me.ctl.tbCantidad.value, me.ctl.CampoUM.itemId, me.ctl.CampoProducto.itemId);
			}
		};

		this.ctl.CampoProducto.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodProducto.setValue ('');
			me.ctl.tbDescProducto.setValue ('');
			me.ctl.tbCodCentroDeTrabajo.setValue ('');
			me.ctl.tbDescCentroDeTrabajo.setValue ('');
			me.ctl.tbCodUM.setValue ('');
			me.ctl.tbDescUM.setValue ('');
			me.ctl.CampoUM.itemId = (0);
			me.ctl.centroDeTrabajoId = 0;

			me.ctl.lstDetFormulaDeProduccionOT.ActualizarDetalleCantidades (me.ctl.tbCantidad.value, me.ctl.CampoUM.itemId, me.ctl.CampoProducto.itemId);
			me.ctl.lstOperacionesHojaDeRuta.ActualizarListado (me.ctl.tbCantidad.value, me.ctl.CampoUM.itemId, me.ctl.CampoProducto.itemId);
		};

		// Campo Unidad de medida
		this.ctl.CampoUM = new CampoBusqueda ();
		this.ctl.CampoUM.SetClaseModelo ('Sistema.view.Produccion.model.UnidadDeMedida');
		this.ctl.CampoUM.SetClaseListado ('Sistema.view.Produccion.UnidadDeMedida.Listado');
		this.ctl.CampoUM.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/UnidadDeMedida/FormularioController.php');
		this.ctl.CampoUM.SetController (this);
		this.ctl.CampoUM.SetTextFieldCodigo ('tbCodUM');
		this.ctl.CampoUM.SetBtnBuscar ('btnBuscarUM');

		this.ctl.CampoUM.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodUM.setValue (rec.get ('codigo'));
			me.ctl.tbDescUM.setValue (rec.get ('descripcionCorta'));
			me.ctl.CampoUM.itemId = rec.get ('id');

			// Actualiza las cantidades de la formula
			me.ctl.lstDetFormulaDeProduccionOT.ActualizarDetalleCantidades (me.ctl.tbCantidad.value, me.ctl.CampoUM.itemId, me.ctl.CampoProducto.itemId);

			// Actualiza los tiempos de la Hoja de Ruta
			me.ctl.lstOperacionesHojaDeRuta.ActualizarTiempoListado (me.ctl.tbCantidad.value, me.ctl.CampoUM.itemId, me.ctl.CampoProducto.itemId);
		};

		this.ctl.CampoUM.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodUM.setValue ('');
			me.ctl.tbDescUM.setValue ('');

			// Blanqueamos todas las cantidades.
			me.ctl.lstDetFormulaDeProduccionOT.ActualizarDetalleCantidades (me.ctl.tbCantidad.value, me.ctl.CampoUM.itemId, me.ctl.CampoProducto.itemId);
			me.ctl.lstOperacionesHojaDeRuta.ActualizarTiempoListado (me.ctl.tbCantidad.value, me.ctl.CampoUM.itemId, me.ctl.CampoProducto.itemId);
		};

		// Campo Orden de Trabajo
		this.ctl.CampoOrdenDeTrabajo = new CampoBusqueda ();
		this.ctl.CampoOrdenDeTrabajo.SetClaseModelo ('Sistema.view.Produccion.model.OrdenDeTrabajo');
		this.ctl.CampoOrdenDeTrabajo.SetClaseListado ('Sistema.view.Produccion.OrdenDeTrabajo.Listado');
		this.ctl.CampoOrdenDeTrabajo.SetClaseFormulario ('Sistema.view.Produccion.OrdenDeTrabajo.Formulario');
		this.ctl.CampoOrdenDeTrabajo.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/OrdenDeTrabajo/FormularioController.php');
		this.ctl.CampoOrdenDeTrabajo.SetController (this);
		this.ctl.CampoOrdenDeTrabajo.SetTextFieldCodigo ('tbCodOtPadre');
		this.ctl.CampoOrdenDeTrabajo.SetBtnBuscar ('btnBuscarOtPadre');
		this.ctl.CampoOrdenDeTrabajo.SetBtnVerRegistro ('btnVerOtPadre');
		this.ctl.CampoOrdenDeTrabajo.SetBtnLimpiar ('btnLimpiarOtPadre');

		this.ctl.CampoOrdenDeTrabajo.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodOtPadre.setValue (rec.get ('id'));
			me.ctl.tbDescOtPadre.setValue (rec.get ('producto').descripcionCorta);
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoOrdenDeTrabajo.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodOtPadre.setValue ('');
			me.ctl.tbDescOtPadre.setValue ('');
		};

		// Callback al listado de formulas para que pueda acceder a la cantidad total de la OT.
		this.ctl.lstDetFormulaDeProduccionOT.GetCantidad = function () {return me.ctl.tbCantidad.value;};

		// Callback al listado de formulas para que pueda acceder a la unidad de medida.
		this.ctl.lstDetFormulaDeProduccionOT.GetUnidadDeMedidaId = function () {return me.ctl.CampoUM.itemId;};

		// Callback al listado de formulas para que pueda acceder al producto.
		this.ctl.lstDetFormulaDeProduccionOT.GetProductoId = function () {return me.ctl.CampoProducto.itemId;};

		// Callback al listado de formulas para que pueda acceder al id de la OT.
		this.ctl.lstDetFormulaDeProduccionOT.GetOrdenDeTrabajoId = function () {return (me.esNuevo ? null : me.params.registro.get ('id'));};

		// Callback al listado de hojas de Ruta para que pueda acceder a la cantidad total de la OT.
		this.ctl.lstOperacionesHojaDeRuta.GetCantidad = function () {return me.ctl.tbCantidad.value;};

		// Callback al listado de hojas de Ruta  para que pueda acceder a la unidad de medida.
		this.ctl.lstOperacionesHojaDeRuta.GetUnidadDeMedidaId = function () {return me.ctl.CampoUM.itemId;};

		// Callback al listado de hojas de Ruta para que pueda acceder al producto.
		this.ctl.lstOperacionesHojaDeRuta.GetProductoId = function () {return me.ctl.CampoProducto.itemId;};

		// Callback al listado de formulas para que pueda acceder al id de la OT.
		this.ctl.lstOperacionesHojaDeRuta.GetOrdenDeTrabajoId = function () {return (me.esNuevo ? null : me.params.registro.get ('id'));};

		this.ctl.lstDetReservaMateriaPrimaOT.GetCentroDeTrabajo = function () {return me.ctl.centroDeTrabajoId;};
	},

    GetElementoFoco: function () {
    	return "textfield[name='tbCodProducto']";
    },

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		this.params.registro = rec;

		// Asocio el store del modelo al de las grillas
		this.ctl.lstDetFormulaDeProduccionOT.setStoreDetalle (rec.detFormulaDeProduccionOT ());
		this.ctl.lstOperacionesHojaDeRuta.setStoreDetalle (rec.operacionesHojaDeRuta ());
		this.ctl.lstValesDeFabricacion.setStoreDetalle (rec.valesDeFabricacion());
		this.ctl.lstDetMedicionDeAtributoOT.setStoreDetalle (rec.detMedicionDeAtributoOT ());

		// Si es una OT nueva
		if (esNuevo) {
			this.ConfigurarPantallaPorEstado (0);

		// Si abrimos una OT ya existente
		} else {
			this.ConfigurarPantallaPorEstado (rec.get ('estadoOTId'));

			this.ctl.tbCodigo.setValue (rec.get ('id'));
			this.ctl.tbEstado.setValue (rec.get ('nombreEstadoOT'));
			this.ctl.tbCantidad.setValue (Formato.PuntoFlotante.Convertir (rec.get ('cantidad')));
			this.ctl.tbFechaCreacion.setValue (rec.get ('fechaDeCreacion'));
			this.ctl.tbFechaProgramada.setValue (rec.get ('fechaDeProduccionProgramada'));
			this.ctl.tbFechaProduccionReal.setValue (rec.get ('fechaDeProduccion'));
			this.ctl.tbFechaTerminada.setValue (rec.get ('fechaDeTerminacion'));
			this.ctl.tbComentarios.setValue (rec.get ('comentarios'));

			// Actualizamos la informacion del producto y deshabilitamos el componente completo
			// menos el boton de ver.
			this.ctl.CampoProducto.itemId = rec.get ('productoId');
			this.ctl.tbCodProducto.setValue (rec.get ('producto').codigo);
			this.ctl.tbDescProducto.setValue (rec.get ('producto').descripcionCorta);
			this.ctl.btnBuscarProducto.disable ();
			this.ctl.tbCodProducto.disable ();
			this.ctl.btnVerProducto.enable ();

			// Informacion Centro de trabajo
			this.ctl.centroDeTrabajoId = rec.get ('producto').centroDeTrabajo.id;
			this.ctl.tbCodCentroDeTrabajo.setValue (rec.get ('producto').centroDeTrabajo.codigo);
			this.ctl.tbDescCentroDeTrabajo.setValue (rec.get ('producto').centroDeTrabajo.nombre);

			// Orden de trabajo Padre
			this.ctl.CampoOrdenDeTrabajo.itemId = rec.get ('ordenDeTrabajoPadreId');
			this.ctl.tbCodOtPadre.setValue (rec.get ('ordenDeTrabajoPadreId'));
			this.ctl.tbDescOtPadre.setValue (rec.get ('descripcionProductoOTPadre'));

			// Informacion Unidad de Medida
			this.ctl.CampoUM.itemId = rec.get ('unidadDeMedidaId');
			this.ctl.tbCodUM.setValue (rec.get ('unidadDeMedida').codigo);
			this.ctl.tbDescUM.setValue (rec.get ('unidadDeMedida').descripcionCorta);

			// Cargamos la formula en la grilla
			this.ctl.lstDetFormulaDeProduccionOT.SetFormulaDeProduccion (rec.get ('formulaDeProduccionId'));

			// Cargamos la hoja de ruta en la grilla
			this.ctl.lstOperacionesHojaDeRuta.SetHojaDeRuta (rec.get ('hojaDeRutaId'), rec.get ('id'));

			// Cargamos la informacion de estado en la grilla.
			this.ctl.lstEstadoFabricacion.MostrarDatos (rec.get ('id'));

			this.ctl.lstDetReservaMateriaPrimaOT.SetLoteDeFabricacion (rec.get ('loteDeFabricacionId'));
		}
	},

	ObtenerRegistroDeFormulario: function () {
		// Validamos que la cantidad no sea nula.
		if (this.ctl.tbCantidad.value == '' || this.ctl.tbCantidad.value == null || this.ctl.tbCantidad.value == '0,0000') {
			Ext.Msg.alert('Error', 'La cantidad ingresada debe ser mayor a cero');

			return null;
		}

		// Validamos que haya seleccionado algun producto.
		if (this.ctl.CampoProducto.itemId == 0) {
			Ext.Msg.alert('Error', 'Debe seleccionar un producto valido');

			return null;
		}

		// Validamos que tenga una formula seleccionada.
		if (this.ctl.lstDetFormulaDeProduccionOT.GetFormulaDeProduccion () == 0) {
			Ext.Msg.alert('Error', 'Debe seleccionar una formula de produccion.');

			return null;
		}

		this.params.registro.set ('loteDeFabricacionId', this.ctl.lstDetReservaMateriaPrimaOT.GetLoteDeFabricacion ());
		this.params.registro.set ('productoId', this.ctl.CampoProducto.itemId);
		this.params.registro.set ('formulaDeProduccionId', this.ctl.lstDetFormulaDeProduccionOT.GetFormulaDeProduccion ());
		this.params.registro.set ('hojaDeRutaId', this.ctl.lstOperacionesHojaDeRuta.GetHojaDeRuta ());
		this.params.registro.set ('unidadDeMedidaId', this.ctl.CampoUM.itemId);
		this.params.registro.set ('ordenDeTrabajoPadreId', this.ctl.CampoOrdenDeTrabajo.itemId);
		this.params.registro.set ('pedidoDeVentaId', null);
		this.params.registro.set ('cantidad', Formato.PuntoFlotante.FormatoDB (this.ctl.tbCantidad.value));
		this.params.registro.set ('comentarios', this.ctl.tbComentarios.value);

		// Si esta programada permitimos cambiar la fecha de programacion.
		if (this.params.registro.get ('estadoOTId') == 3) {
			this.params.registro.set ('fechaDeProduccionProgramada', this.ctl.tbFechaProgramada.getRawValue ());

		} else {
			// Ponemos la fecha en cero para no actualizarla.
			this.params.registro.set ('fechaDeProduccionProgramada', null);
		}

		return this.params.registro;
	},

	//---------- Metodos Privados ----------

	CambiarEstadoOT: function () {
		var me = this, ret;
		var params = {
			ordenDeTrabajoId: me.params.registro.get ('id'),
			estadoId: 0,
			fechaProgramada: null
		};

		switch (this.params.registro.get ('estadoOTId')) {
			case 1: // Emitida -> Confirmada
				params.estadoId = 2;
				ret = true;
				break;

			case 2: // Confirmada -> Programada
				if (this.ctl.tbFechaProgramada.value == null || !this.ctl.tbFechaProgramada.isValid ()) {
					Ext.Msg.alert('Error', 'La fecha de produccion programada es invalida');
					ret = false;

				} else {
					params.estadoId = 3;
					params.fechaProgramada = this.ctl.tbFechaProgramada.getRawValue ();
					ret = true;
				}
				break;

			case 3: // Programada -> En Produccion
				if (this.ctl.tbFechaProgramada.value == null || !this.ctl.tbFechaProgramada.isValid ()) {
					Ext.Msg.alert('Error', 'La fecha de produccion programada es invalida');
					ret = false;

				} else {
					params.estadoId = 4;
					ret = true;
				}
				break;

			case 4: // En Produccion -> Finalizada
				params.estadoId = 5;
				ret = true;
				break;
		}

		if (ret) {
			new ConsultaWS ().Ejecutar ('Produccion', 'OrdenDeTrabajo', 'FormularioController', 'CambiarDeEstadoOT', params, function (resp) {
				if (this.RespuestaOK ()) {
					me.IntentarCerrarVentanaContenedora ();

				} else {
					Ext.Msg.alert('Error', this.GetMensajeRespuesta ());
				}
			});
		}
	},

	//
	// Define como configurar la pantalla segun el estado de la
	// OT que se este editando.
	//
	ConfigurarPantallaPorEstado: function (estadoId) {
		switch (estadoId) {
			case 0: // No Emitida
				this.ConfigurarPantallaNoEmitida ();
				break;

			case 1: // Emitida
				this.ConfigurarPantallaEmitida ();
				break;

			case 2: // Confirmada
				this.ConfigurarPantallaConfirmada ();
				break;

			case 3: // Programada
				this.ConfigurarPantallaProgramada ();
				break;

			case 4: // En Produccion
				this.ConfigurarPantallaEnProduccion ();
				break;

			case 5: // Finalizada
				this.ConfigurarPantallaFinalizada ();
				break;

			case '6': // Anulada
				this.ConfigurarPantallaAnulada ();
				break;
		}
	},

	ConfigurarPantallaProgramada: function () {
		this.ctl.btnCambiarEstadoOT.setText ('Pasar a Produccion');
		this.ctl.btnCambiarEstadoOT.setDisabled (false);

		this.ctl.tbFechaCreacion.setReadOnly (true);
		this.ctl.tbFechaProgramada.setDisabled (false);
		this.ctl.tbFechaProduccionReal.setDisabled (true);
		this.ctl.tbFechaTerminada.setDisabled (true);

		this.ctl.lstDetReservaMateriaPrimaOT.Deshabilitar ();
		this.ctl.btnBorrar.setText ('Anular');
	},

	ConfigurarPantallaEnProduccion: function () {
		this.ctl.btnCambiarEstadoOT.setText ('Finalizar');
		this.ctl.btnCambiarEstadoOT.setDisabled (false);

		this.ctl.tbFechaCreacion.setReadOnly (true);
		this.ctl.tbFechaProgramada.setReadOnly (true);
		this.ctl.tbFechaProduccionReal.setReadOnly (true);
		this.ctl.tbFechaTerminada.setDisabled (true);
		this.ctl.btnBorrar.setText ('Anular');
	},

	ConfigurarPantallaFinalizada: function () {
		this.ctl.btnCambiarEstadoOT.setHidden (true);
		this.ctl.tbFechaCreacion.setReadOnly (true);
		this.ctl.tbFechaProgramada.setReadOnly (true);
		this.ctl.tbFechaProduccionReal.setReadOnly (true);
		this.ctl.tbFechaTerminada.setReadOnly (true);
		this.ctl.btnBorrar.setDisabled (true);
	},

	ConfigurarPantallaAnulada: function () {
		this.ctl.btnCambiarEstadoOT.setHidden (true);
		this.ctl.tbFechaCreacion.setReadOnly (true);
		this.ctl.tbFechaProgramada.setReadOnly (true);
		this.ctl.tbFechaProduccionReal.setReadOnly (true);
		this.ctl.tbFechaTerminada.setReadOnly (true);
		this.ctl.btnBorrar.setDisabled (true);
	},

	ConfigurarPantallaNoEmitida: function () {
		this.ctl.btnCambiarEstadoOT.setText ('Confirmar Orden de Trabajo');
		this.ctl.btnCambiarEstadoOT.setDisabled (true);

		this.ctl.tbCantidad.setValue (Formato.PuntoFlotante.Transformar (0));
		this.ctl.tbEstado.setValue ('No Emitida');
		this.ctl.tbCodigo.setValue ('----');

		this.ctl.tbFechaCreacion.setDisabled (true);
		this.ctl.tbFechaProgramada.setDisabled (true);
		this.ctl.tbFechaProduccionReal.setDisabled (true);
		this.ctl.tbFechaTerminada.setDisabled (true);

		this.ctl.lstDetReservaMateriaPrimaOT.Deshabilitar ();
		this.ctl.lstDetFormulaDeProduccionOT.DeshabilitarCreacionDeOTsHijas ();
	},

	ConfigurarPantallaEmitida: function () {
		this.ctl.btnCambiarEstadoOT.setText ('Confirmar Orden de Trabajo');
		this.ctl.btnCambiarEstadoOT.setDisabled (false);

		this.ctl.tbFechaCreacion.setReadOnly (true);
		this.ctl.tbFechaProgramada.setDisabled (true);
		this.ctl.tbFechaProduccionReal.setDisabled (true);
		this.ctl.tbFechaTerminada.setDisabled (true);

		this.ctl.lstDetReservaMateriaPrimaOT.Deshabilitar ();
	},

	ConfigurarPantallaConfirmada: function () {
		this.ctl.btnCambiarEstadoOT.setText ('Establecer como Programada');
		this.ctl.btnBorrar.setText ('Anular');
		this.ctl.btnCambiarEstadoOT.setDisabled (false);

		this.ctl.tbFechaCreacion.setReadOnly (true);
		this.ctl.tbFechaProgramada.setDisabled (false);
		this.ctl.tbFechaProduccionReal.setDisabled (true);
		this.ctl.tbFechaTerminada.setDisabled (true);

		this.ctl.lstDetReservaMateriaPrimaOT.Deshabilitar ();
	}

});