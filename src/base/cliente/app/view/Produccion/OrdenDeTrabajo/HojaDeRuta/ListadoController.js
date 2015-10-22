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

Ext.define ('Sistema.view.Produccion.OrdenDeTrabajo.HojaDeRuta.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-ot-hdr-ListadoController',

	params: {
		formularioCreacion		: 'Sistema.view.Produccion.OrdenDeTrabajo.HojaDeRuta.Formulario',
		tituloFormularioCreacion: '',
		formularioEdicion		: 'Sistema.view.Produccion.OrdenDeTrabajo.HojaDeRuta.Formulario',
		tituloFormularioEdicion	: 'Detalle Operacion - Orden de Trabajo',
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

		this.ctl.tbCodHojaDeRuta = this.getView ().down ("textfield[name='tbCodHojaDeRuta']");
		this.ctl.tbDescHojaDeRuta = this.getView ().down ("textfield[name='tbDescHojaDeRuta']");

		// Ver!
		this.ctl.ordenDeTrabajoId = null;

		// Campo Hoja de Ruta
		this.ctl.CampoHdr = new CampoBusqueda ();
		this.ctl.CampoHdr.SetClaseModelo ('Sistema.view.Produccion.model.HojaDeRuta');
		this.ctl.CampoHdr.SetClaseListado ('Sistema.view.Produccion.HojaDeRuta.Listado');
		this.ctl.CampoHdr.SetClaseFormulario ('Sistema.view.Produccion.HojaDeRuta.Formulario');
		this.ctl.CampoHdr.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/HojaDeRuta/FormularioController.php');
		this.ctl.CampoHdr.SetController (this);
		this.ctl.CampoHdr.SetBtnVerRegistro ('btnVerHojaDeRuta');

		this.ctl.CampoHdr.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodHojaDeRuta.setValue (rec.get ('codigo'));
			me.ctl.tbDescHojaDeRuta.setValue (rec.get ('descripcionCorta'));
			this.itemId = rec.get ('id');

			me.ActualizarListado (me.GetCantidad (), me.GetUnidadDeMedidaId (), me.GetProductoId ());
		};

		this.ctl.CampoHdr.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodHojaDeRuta.setValue ('');
			me.ctl.tbDescHojaDeRuta.setValue ('');

			me.ActualizarListado (0, 0, 0, 0);
		};
	},

	//---------- Metodos Publicos ----------

	//
	// Borra todo el listado de operaciones y lo carga de nuevo. Se pierden todos los datos
	// cargados por usuario.
	//
	ActualizarListado: function (cantidad, unidadDeMedidaId, productoId) {
		var st = this.getView ().down ('grid').store;
		var me = this;

		// Siempre limpia la grilla primero.
		st.removeAll ();

		// Si no hay producto y unidad seleccionados entonces no pedimos los datos.
		if (unidadDeMedidaId != 0 && productoId != 0) {
			new ConsultaWS ().Ejecutar ('Produccion', 'OrdenDeTrabajo', 'FormularioController', 'LeerDetalleHojaDeRutaPorId', {cantidad:cantidad, unidadDeMedidaId: unidadDeMedidaId, productoId: productoId, ordenDeTrabajoId:me.ctl.ordenDeTrabajoId}, function (resp) {
				if (this.RespuestaOK ()) {
					st.loadData (resp);

				} else {
					Ext.Msg.alert('Error', this.GetMensajeRespuesta ());
				}
			});
		}
	},

	//
	// Actualiza solo la columna de tiempo estandar ante un cambio de unidad de medida o cantidad.
	//
	ActualizarTiempoListado: function (cantidad, unidadDeMedidaId, productoId) {
		var me = this;
		var params;

		params = {
			ordenDeTrabajoId	: me.GetOrdenDeTrabajoId (),
			productoId			: productoId,
			unidadDeMedidaId	: unidadDeMedidaId,
			cantidad			: cantidad
		};

		if (cantidad != 0 && unidadDeMedidaId != 0 && productoId != 0) {
			new ConsultaWS ().Ejecutar ('Produccion', 'OrdenDeTrabajo', 'FormularioController', 'GetDetalleListadoHojaDeRutaPorTiempo', params, function (resp) {
				if (this.RespuestaOK ()) {
					me.RecorrerYActualizarListado (resp);

				} else {
					Ext.Msg.alert('Error', this.GetMensajeRespuesta ());
				}
			});
		}
	},

	//---------- Metodos Setters ----------

	//
	// Setea la Hoja de ruta. Provoca que se cargue el componente con la descripcion de la hoja de ruta
	//
	SetHojaDeRuta: function (hojaDeRutaId, ordenDeTrabajoId) {
		this.ctl.ordenDeTrabajoId = ordenDeTrabajoId;
		this.ctl.CampoHdr.BuscarPorId (hojaDeRutaId);
	},

	GetHojaDeRuta: function () {
		return this.ctl.CampoHdr.itemId;
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

	// Definimos este metodo por si se intenta ejecutar antes de haber sido asignado.
	GetOrdenDeTrabajoId: function () {
		Ext.Msg.alert('Error', 'Error. metodo:GetOrdenDeTrabajoId () no definido');
	},

	// ---- Metodos Privados ----

	//
	// Recorre la grilla y actualiza la columna Tiempo estandar utilizando los datos recibidos.
	//
	RecorrerYActualizarListado: function (data) {
		var st = this.getView ().down ('grid').store;
		var i, j;

		st.each (function (rec) {
			for (i = 0; i < data.length; i++) {
				if (data[i].operacionId == rec.get ('operacionId')) {
					for (j = 0; j < data[i].maquinas.length; j++) {
						if (data[i].maquinas[j].maquinaId == rec.get ('maquinaId')) {
							rec.set ('tiempoEstandar', data[i].maquinas[j].tiempoEstandar);
						}
					}
				}
			}
		});
	},

	GetOnNuevoParamsEntrada: function (params) {
		return ManejadorDeVentanas.ReqFormularioDetalle (null);
	},

	//
	// Le pasamos estos parametros al formulario.
	//
	GetOnEditarParamsEntrada: function (item, params) {
		var p = {
			modelo				: item,
			ordenDeTrabajoId	: this.GetOrdenDeTrabajoId (),
			productoId			: this.GetProductoId (),
			unidadDeMedidaId	: this.GetUnidadDeMedidaId (),
			cantidad			: this.GetCantidad ()
		};

		return p;
		//return ManejadorDeVentanas.ReqFormularioDetalle (item);
	}
});