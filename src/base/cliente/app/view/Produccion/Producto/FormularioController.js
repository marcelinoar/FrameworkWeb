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

Ext.define ('Sistema.view.Produccion.Producto.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-producto-FormularioController',

    init: function () {
    	var me = this;

    	FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Produccion.model.Producto', 'Produccion:Producto');
    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.onBtnGuardarClick
    		},
    		"prod-producto-Formulario": {
    			afterrender: this.onRender
    		},
			"textfield[name='tbCodigo']": {
				change: this.tbChangeToUpperCase
			},
			"combo[name='cbTipoDeProductoId']": {
				select: this.onCbTipoDeProductoIdChange
			}
    	});

		this.info_formulario 	= null;

		// Creamos un semaforo para que sincronice las dos transacciones que tiene el formulario.
    	this.semaforo = new Semaforo (2);
    	this.semaforo.Method = function () {
    		me.MostrarDatosAsinc ();
    	};
    },

	//---------- Handlers eventos estandar del formulario ----------

	//
	// Configura la pantalla al cambiar el tipo de producto.
	//
	onCbTipoDeProductoIdChange: function (t, registros) {
		if (registros.length > 0) {
			var rec = registros[0];
			this.ConfigurarVisibilidadDePantalla (rec.get ('esProductoDeFabricacion'), rec.get ('esProductoDeVentas'), rec.get ('esProductoDeCompras'));
		}
	},

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 1024;
    	ctl.params.altoVentana		= 640;
    },

	CargarComponentes: function () {
		var me = this;

		this.params.nombreEntidad = 'Producto';

		// Cargamos los elementos de la pantalla.
		this.ctl.tbCodigo 							= this.getView ().down ("textfield[name='tbCodigo']");
		this.ctl.cbTipoDeProductoId 				= this.getView ().down ("combo[name='cbTipoDeProductoId']");
		this.ctl.tbCodLineaDeProduccion				= this.getView ().down ("textfield[name='tbCodLineaDeProduccion']");
		this.ctl.tbDescLineaDeProduccion			= this.getView ().down ("textfield[name='tbDescLineaDeProduccion']");
		this.ctl.tbCodUMStock						= this.getView ().down ("textfield[name='tbCodUMStock']");
		this.ctl.tbDescCodUMStock					= this.getView ().down ("textfield[name='tbDescCodUMStock']");
		this.ctl.cbAgrupadorProductoPrimarioId 		= this.getView ().down ("combo[name='cbAgrupadorProductoPrimarioId']");
		this.ctl.cbAgrupadorProductoSecundarioId 	= this.getView ().down ("combo[name='cbAgrupadorProductoSecundarioId']");
		this.ctl.cbAgrupadorProductoTerciarioId 	= this.getView ().down ("combo[name='cbAgrupadorProductoTerciarioId']");
		this.ctl.tbDescripcionCorta 				= this.getView ().down ("textfield[name='tbDescripcionCorta']");
		this.ctl.tbDescripcionLarga 				= this.getView ().down ("textareafield[name='tbDescripcionLarga']");
		this.ctl.imgImagenProducto					= this.getView ().down ("image[name='imgImagenProducto']");
		this.ctl.tbCodUMFabricacion					= this.getView ().down ("textfield[name='tbCodUMFabricacion']");
		this.ctl.tbDescUMFabricacion				= this.getView ().down ("textfield[name='tbDescUMFabricacion']");
		this.ctl.tbCodAlmacenDestino				= this.getView ().down ("textfield[name='tbCodAlmacenDestino']");
		this.ctl.tbDescAlmacenDestino				= this.getView ().down ("textfield[name='tbDescAlmacenDestino']");
		this.ctl.tbCodCentroDeTrabajo				= this.getView ().down ("textfield[name='tbCodCentroDeTrabajo']");
		this.ctl.tbDescCentroDeTrabajo				= this.getView ().down ("textfield[name='tbDescCentroDeTrabajo']");
		this.ctl.tbDescProductoSecundario			= this.getView ().down ("textfield[name='tbDescProductoSecundario']");
		this.ctl.tbCodProductoSecundario			= this.getView ().down ("textfield[name='tbCodProductoSecundario']");

		// Carga los Tabs
		this.ctl.tabFabricacion = this.getView ().down ("panel[name='panelFabricacion']");

		// Producto
		this.ctl.CampoProductoSecundario = new CampoBusqueda ();
		this.ctl.CampoProductoSecundario.SetClaseModelo ('Sistema.view.Produccion.model.Producto');
		this.ctl.CampoProductoSecundario.SetClaseListado ('Sistema.view.Produccion.Producto.Listado');
		this.ctl.CampoProductoSecundario.SetController (this);
		this.ctl.CampoProductoSecundario.SetTextFieldCodigo ('tbCodProductoSecundario');
		this.ctl.CampoProductoSecundario.SetBtnBuscar ('btnBuscarProductoSecundario');
		this.ctl.CampoProductoSecundario.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/Producto/FormularioController.php');

		this.ctl.CampoProductoSecundario.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodProductoSecundario.setValue (rec.get ('codigo'));
			me.ctl.tbDescProductoSecundario.setValue (rec.get ('descripcionCorta'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoProductoSecundario.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodProductoSecundario.setValue ('');
			me.ctl.tbDescProductoSecundario.setValue ('');
		};

		// Linea de Produccion
		this.ctl.CampoLineaDeProduccion = new CampoBusqueda ();
		this.ctl.CampoLineaDeProduccion.SetClaseModelo ('Sistema.view.Produccion.model.LineaDeProduccion');
		this.ctl.CampoLineaDeProduccion.SetClaseListado ('Sistema.view.Produccion.LineaDeProduccion.Listado');
		this.ctl.CampoLineaDeProduccion.SetController (this);
		this.ctl.CampoLineaDeProduccion.SetTextFieldCodigo ('tbCodLineaDeProduccion');
		this.ctl.CampoLineaDeProduccion.SetBtnBuscar ('btnBuscarLineaDeProduccion');
		this.ctl.CampoLineaDeProduccion.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/LineaDeProduccion/FormularioController.php');

		this.ctl.CampoLineaDeProduccion.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodLineaDeProduccion.setValue (rec.get ('codigo'));
			me.ctl.tbDescLineaDeProduccion.setValue (rec.get ('descripcionCorta'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoLineaDeProduccion.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodLineaDeProduccion.setValue ('');
			me.ctl.tbDescLineaDeProduccion.setValue ('');
		};

		// Unida de Medida Stock
		this.ctl.CampoUMStock = new CampoBusqueda ();
		this.ctl.CampoUMStock.SetClaseModelo ('Sistema.view.Produccion.model.UnidadDeMedida');
		this.ctl.CampoUMStock.SetClaseListado ('Sistema.view.Produccion.UnidadDeMedida.Listado');
		this.ctl.CampoUMStock.SetController (this);
		this.ctl.CampoUMStock.SetTextFieldCodigo ('tbCodUMStock');
		this.ctl.CampoUMStock.SetBtnBuscar ('btnBuscarUMStock');
		this.ctl.CampoUMStock.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/UnidadDeMedida/FormularioController.php');

		this.ctl.CampoUMStock.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodUMStock.setValue (rec.get ('codigo'));
			me.ctl.tbDescCodUMStock.setValue (rec.get ('descripcionCorta'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoUMStock.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodUMStock.setValue ('');
			me.ctl.tbDescCodUMStock.setValue ('');
		};

		// Unidad de Medida Fabricacion
		this.ctl.CampoUMFabricacion = new CampoBusqueda ();
		this.ctl.CampoUMFabricacion.SetClaseModelo ('Sistema.view.Produccion.model.UnidadDeMedida');
		this.ctl.CampoUMFabricacion.SetClaseListado ('Sistema.view.Produccion.UnidadDeMedida.Listado');
		this.ctl.CampoUMFabricacion.SetController (this);
		this.ctl.CampoUMFabricacion.SetTextFieldCodigo ('tbCodUMFabricacion');
		this.ctl.CampoUMFabricacion.SetBtnBuscar ('btnBuscarUMFabricacion');
		this.ctl.CampoUMFabricacion.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/UnidadDeMedida/FormularioController.php');

		this.ctl.CampoUMFabricacion.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodUMFabricacion.setValue (rec.get ('codigo'));
			me.ctl.tbDescUMFabricacion.setValue (rec.get ('descripcionCorta'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoUMFabricacion.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodUMFabricacion.setValue ('');
			me.ctl.tbDescUMFabricacion.setValue ('');
		};

		// Almacen de Destino
		this.ctl.CampoAlmacenDestino = new CampoBusqueda ();
		this.ctl.CampoAlmacenDestino.SetClaseModelo ('Sistema.view.Produccion.model.Almacen');
		this.ctl.CampoAlmacenDestino.SetClaseListado ('Sistema.view.Produccion.Almacen.Listado');
		this.ctl.CampoAlmacenDestino.SetController (this);
		this.ctl.CampoAlmacenDestino.SetTextFieldCodigo ('tbCodAlmacenDestino');
		this.ctl.CampoAlmacenDestino.SetBtnBuscar ('btnBuscarAlmacenDestino');
		this.ctl.CampoAlmacenDestino.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/Almacen/FormularioController.php');

		this.ctl.CampoAlmacenDestino.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodAlmacenDestino.setValue (rec.get ('codigo'));
			me.ctl.tbDescAlmacenDestino.setValue (rec.get ('descripcionCorta'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoAlmacenDestino.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodAlmacenDestino.setValue ('');
			me.ctl.tbDescAlmacenDestino.setValue ('');
		};

		// Centro de Trabajo
		this.ctl.CampoCentroDeTrabajo = new CampoBusqueda ();
		this.ctl.CampoCentroDeTrabajo.SetClaseModelo ('Sistema.view.Produccion.model.CentroDeTrabajo');
		this.ctl.CampoCentroDeTrabajo.SetClaseListado ('Sistema.view.Produccion.CentroDeTrabajo.Listado');
		this.ctl.CampoCentroDeTrabajo.SetController (this);
		this.ctl.CampoCentroDeTrabajo.SetTextFieldCodigo ('tbCodCentroDeTrabajo');
		this.ctl.CampoCentroDeTrabajo.SetBtnBuscar ('btnBuscarCentroDeTrabajo');
		this.ctl.CampoCentroDeTrabajo.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/CentroDeTrabajo/FormularioController.php');

		this.ctl.CampoCentroDeTrabajo.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodCentroDeTrabajo.setValue (rec.get ('codigo'));
			me.ctl.tbDescCentroDeTrabajo.setValue (rec.get ('nombre'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoCentroDeTrabajo.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodCentroDeTrabajo.setValue ('');
			me.ctl.tbDescCentroDeTrabajo.setValue ('');
		};

		// Traigo la info del server.
		var consulta_form = new ConsultaWS ().Ejecutar ('Produccion', 'Producto', 'FormularioController', 'GetInfoFormulario', null, function (resp) {
			if (this.RespuestaOK ()) {
				InfoFormularioBase.InyectarDependencia (resp);
				me.info_formulario = resp;
				me.semaforo.Set ();

			} else {
				Ext.Msg.alert('Error', this.GetMensajeRespuesta ());
			}
		});

		// Listados
		this.ctl.lstUnidadesAlternativas	= this.getView ().down ("prod-producto-ua-Listado").controller;
		this.ctl.lstAtributos				= this.getView ().down ("prod-producto-att-Listado").controller;
		this.ctl.lstFormulas				= this.getView ().down ("prod-producto-frm-Listado").controller;
		this.ctl.lstOperaciones				= this.getView ().down ("prod-producto-ophr-Listado").controller;
		this.ctl.lstProductoAlmacen			= this.getView ().down ("prod-producto-pa-Listado").controller;

		this.ctl.lstUnidadesAlternativas.ConfigurarListado (function () {me.SetDetalleModificado ();}, this.params.permisos);
		this.ctl.lstProductoAlmacen.ConfigurarListado (function () {me.SetDetalleModificado ();}, this.params.permisos);
		this.ctl.lstAtributos.ConfigurarListado (function () {me.SetDetalleModificado ();}, this.params.permisos);
		this.ctl.lstFormulas.ConfigurarListado (function () {me.SetDetalleModificado ();}, this.params.permisos);
		this.ctl.lstOperaciones.ConfigurarListado (function () {me.SetDetalleModificado ();}, this.params.permisos);

		// Pasamos la funcion GetProductoId al listado de operaciones.
		this.ctl.lstOperaciones.GetProductoId = function () {return (me.esNuevo ? null : me.params.registro.get('id'));};
	},

    GetElementoFoco: function () {
    	return "textfield[name='tbCodigo']";
    },

	//
	// Este metodo lo dispara el semaforo y se ejecuta cuando se terminaron de ejecutar los request que traen la info del formulario y el registro.
	//
	MostrarDatosAsinc: function () {
		// Mostrar u ocultar las partes de la pantalla que correspondan segun el tipo de producto.
		if (this.esNuevo) {
			this.ConfigurarVisibilidadDePantalla (false, false, false);

		} else {
			this.ctl.tbCodigo.setReadOnly (true);
			this.ConfigurarVisibilidadDePantalla (this.params.registro.get ('tipoDeProducto').esProductoDeFabricacion
													, this.params.registro.get ('tipoDeProducto').esProductoDeVentas
													, this.params.registro.get ('tipoDeProducto').esProductoDeCompras);
		}

		// Cargarmos la informacion recibida en los listados.
		this.ctl.lstUnidadesAlternativas.SetDatosFormulario (this.info_formulario);
		this.ctl.lstAtributos.SetDatosFormulario (this.info_formulario, this.params.registro);
		this.ctl.lstProductoAlmacen.SetDatosFormulario (this.info_formulario, this.params.registro);

		// Seteamos la Hoja de ruta.
		this.ctl.lstOperaciones.SetHojaDeRuta (this.params.registro.get ('hojaDeRutaId'));

		// Cargamos los stores de los combos.
		this.ctl.cbTipoDeProductoId.store.loadData (this.info_formulario.tiposDeProducto);
		this.ctl.cbAgrupadorProductoPrimarioId.store.loadData (this.info_formulario.agrupadoresPrimarios);
		this.ctl.cbAgrupadorProductoSecundarioId.store.loadData (this.info_formulario.agrupadoresSecundarios);
		this.ctl.cbAgrupadorProductoTerciarioId.store.loadData (this.info_formulario.agrupadoresTerciarios);

		// Seteamos los valores de los campos.
		this.ctl.tbCodigo.setValue (this.params.registro.get ('codigo'));
		this.ctl.cbTipoDeProductoId.setValue (this.params.registro.get ('tipoDeProductoId'));
		this.ctl.cbAgrupadorProductoPrimarioId.setValue (this.params.registro.get ('agrupadorProductoPrimarioId'));
		this.ctl.cbAgrupadorProductoSecundarioId.setValue (this.params.registro.get ('agrupadorProductoSecundarioId'));
		this.ctl.cbAgrupadorProductoTerciarioId.setValue (this.params.registro.get ('agrupadorProductoTerciarioId'));
		this.ctl.tbDescripcionCorta.setValue (this.params.registro.get ('descripcionCorta'));
		this.ctl.tbDescripcionLarga.setValue (this.params.registro.get ('descripcionLarga'));

		// Cargamos los campos de busqueda.
		this.ctl.CampoLineaDeProduccion.CargarComponente (this.params.registro.get ('lineaDeProduccion'));
		this.ctl.CampoUMStock.CargarComponente (this.params.registro.get ('unidadDeMedidaStock'));
		this.ctl.CampoUMFabricacion.CargarComponente (this.params.registro.get ('unidadDeMedidaFabricacion'));
		this.ctl.CampoAlmacenDestino.CargarComponente (this.params.registro.get ('almacenDestino'));
		this.ctl.CampoCentroDeTrabajo.CargarComponente (this.params.registro.get ('centroDeTrabajo'));
		this.ctl.CampoProductoSecundario.CargarComponente (this.params.registro.get ('productoSecundario'));

		// Cargamos la info de los listados.
		this.ctl.lstUnidadesAlternativas.setStoreDetalle (this.params.registro.unidadesAlternativas ());
		this.ctl.lstAtributos.setStoreDetalle (this.params.registro.atributos ());
		this.ctl.lstFormulas.setStoreDetalle (this.params.registro.formulas ());
	},

	ConfigurarVisibilidadDePantalla: function (esFabricacion, esVenta, esCompra) {
		this.ctl.tabFabricacion.setDisabled (!esFabricacion);
	},

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		this.params.registro = rec;
		this.semaforo.Set ();
	},

	ObtenerRegistroDeFormulario: function () {
		if (this.ValidarFormulario ()) {
			this.params.registro.set ('codigo', this.ctl.tbCodigo.value);
			this.params.registro.set ('tipoDeProductoId', this.ctl.cbTipoDeProductoId.value);
			this.params.registro.set ('lineaDeProduccionId', this.ctl.CampoLineaDeProduccion.itemId);
			this.params.registro.set ('unidadDeMedidaStockId', this.ctl.CampoUMStock.itemId);
			this.params.registro.set ('agrupadorProductoPrimarioId', this.ctl.cbAgrupadorProductoPrimarioId.value);
			this.params.registro.set ('agrupadorProductoSecundarioId', this.ctl.cbAgrupadorProductoSecundarioId.value);
			this.params.registro.set ('agrupadorProductoTerciarioId', this.ctl.cbAgrupadorProductoTerciarioId.value);
			this.params.registro.set ('descripcionCorta', this.ctl.tbDescripcionCorta.value);
			this.params.registro.set ('descripcionLarga', this.ctl.tbDescripcionLarga.value);

			this.params.registro.set ('unidadDeMedidaFabricacionId', this.ctl.CampoUMFabricacion.itemId);
			this.params.registro.set ('almacenDestinoId', this.ctl.CampoAlmacenDestino.itemId);
			this.params.registro.set ('productoSecundarioId', this.ctl.CampoProductoSecundario.itemId);
			this.params.registro.set ('centroDeTrabajoId', this.ctl.CampoCentroDeTrabajo.itemId);
			this.params.registro.set ('hojaDeRutaId', this.ctl.lstOperaciones.GetHojaDeRuta ());

			this.ctl.lstProductoAlmacen.ObtenerStoreModificado (this.params.registro.productoAlmacen ());
			this.ctl.lstOperaciones.ObtenerStoreModificado (this.params.registro.operaciones ());

			return this.params.registro;

		} else {
			return null;
		}
	},

	//---------- Metodos privados ----------

	/**
	 *
	 * Valida los controles del formulario antes de guardar la instancia.
	 *
	 * @return	true o false segun si es valido o no.
	 */

	ValidarFormulario: function () {
		var tprod = this.ctl.cbTipoDeProductoId.store.getById (this.ctl.cbTipoDeProductoId.value);

		// Todos tienen que tener UM Stock
		if (this.ctl.CampoUMStock.itemId == 0) {
			Ext.Msg.alert('Error', 'El producto debe tener definida una unidad de medida de stock');
			return false;
		}

		// Si es de fabricacion validamos que tenga lo necesario.
		if (tprod.get ('esProductoDeFabricacion')) {
			if (this.ctl.CampoUMFabricacion.itemId == 0) {
				Ext.Msg.alert('Error', 'El producto debe tener definida una unidad de medida de fabricacion');
				return false;
			}

			if (this.ctl.CampoCentroDeTrabajo.itemId == 0) {
				Ext.Msg.alert('Error', 'El producto debe tener definido un centro de trabajo');
				return false;
			}

			if (this.ctl.lstFormulas.GetFormulaPrincipal () == null) {
				Ext.Msg.alert('Error', 'El producto debe tener definida una formula principal');
				return false;
			}

			if (this.ctl.lstOperaciones.GetHojaDeRuta () == 0) {
				Ext.Msg.alert('Error', 'El producto debe tener definida una hoja de ruta');
				return false;
			}

			if (this.ctl.CampoProductoSecundario.itemId == 0) {
				Ext.Msg.alert('Error', 'El producto debe tener definido un producto secundario');
				return false;
			}
		}

		return true;
	}
});