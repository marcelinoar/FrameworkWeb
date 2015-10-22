/**************************************************************************************************
 * Archivo: FormularioController.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *      -
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.MedicionDeAtributo.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-medat-FormularioController',

    init: function () {
        FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Produccion.model.MedicionDeAtributo', 'Produccion:MedicionDeAtributo');

        this.control ({
			"button[name='btnBorrar']": {
				click: this.onBtnBorrarClick
			},
			"button[name='btnGuardar']": {
				click: this.onBtnGuardarClick
			},
			"button[name='btnCerrar']": {
				click: this.onBtnCerrarClick
			},
			"textfield[name='tbCantidad']": {
				blur: this.FormatearCampoPuntoFlotante
			},
			"textfield[name='tbValorAtributoTeorico']": {
				blur: this.FormatearCampoPuntoFlotante
			},
			"textfield[name='tbValorAtributoMedido']": {
				blur: this.FormatearCampoPuntoFlotante
			},
			"prod-medat-Formulario": {
				afterrender: this.onRender
			},
			"button[name='btnVerProducto']": {
				click: this.onBtnVerProductoClick
			},
			"button[name='btnVerUnidadOT']": {
				click: this.onBtnVerUnidadOTClick
			},
			"button[name='btnVerUnidadAtributo']": {
				click: this.onBtnVerUnidadAtributoClick
			},
			"combo[name='cbAtributoId']": {
				change: this.onCbAtributoIdChange
			}
        });
    },

    //---------- EventHandlers ----------

    onBtnVerProductoClick: function () {
        if (this.ctl.CampoOrdenDeTrabajo.productoId != 0) {
			ManejadorDeVentanas.AbrirFormularioEdicion ('Sistema.view.Produccion.Producto.Formulario', this.ctl.CampoOrdenDeTrabajo.productoId, true, null);
        }
    },

    onBtnVerUnidadOTClick: function () {
        if (this.ctl.CampoOrdenDeTrabajo.unidadDeMedidaId != 0) {
			ManejadorDeVentanas.AbrirFormularioEdicion ('Sistema.view.Produccion.UnidadDeMedida.Formulario', this.ctl.CampoOrdenDeTrabajo.unidadDeMedidaId, true, null);
        }
    },

    onBtnVerUnidadAtributoClick: function () {
    	var st = this.ctl.cbAtributoId.store;

        if (this.ctl.cbAtributoId.value != null) {
        	rec = st.getAt (st.find ('atributoProductoId', this.ctl.cbAtributoId.value));

			ManejadorDeVentanas.AbrirFormularioEdicion ('Sistema.view.Produccion.UnidadDeMedida.Formulario', rec.get ('unidadDeMedidaId'), true, null);
        }
    },

	onBtnCerrarClick: function () {
		this.IntentarCerrarVentanaContenedora ();
	},

	onCbAtributoIdChange: function (t, val) {
		var st = this.ctl.cbAtributoId.store;
		var rec;

		// Si hay algun valor seleccionado lo muestro en pantalla.
		if (val != null) {
			rec = st.getAt (st.find ('atributoProductoId', val));
			this.ctl.tbCodUnidadAtributo.setValue (rec.get ('unidadDeMedida').codigo);
			this.ctl.tbDescUnidadAtributo.setValue (rec.get ('unidadDeMedida').descripcionCorta);
			this.ctl.tbValorAtributoTeorico.setValue (rec.get ('valor'));
			this.ctl.tbCodUnidadValorTeorico.setValue (rec.get ('unidadDeMedida').codigo);
			this.ctl.tbCodUnidadValorMedido.setValue (rec.get ('unidadDeMedida').codigo);

		} else {
			this.ctl.tbCodUnidadAtributo.setValue ('');
			this.ctl.tbDescUnidadAtributo.setValue ('');
			this.ctl.tbValorAtributoTeorico.setValue ('');
			this.ctl.tbCodUnidadValorTeorico.setValue ('');
			this.ctl.tbCodUnidadValorMedido.setValue ('');
			this.ctl.CampoOrdenDeTrabajo.productoId = 0;
			this.ctl.CampoOrdenDeTrabajo.unidadDeMedidaId = 0;
		}
	},

	//---------- metodos privados----------

	//
	// Recibe un registro del tipo OT o null.
	//
	ConfigurarComboAtributos: function (rec) {
		this.ctl.cbAtributoId.setDisabled (false);
		this.ctl.cbAtributoId.getStore ().removeAll ();

		if (rec != null) {
			this.ctl.cbAtributoId.getStore ().loadData (rec.get ('producto').atributos);
		}

		if (this.esNuevo) {
			this.ctl.cbAtributoId.reset ();

		} else {
			this.ctl.cbAtributoId.setValue (this.params.registro.get ('atributoProductoId'));
		}
	},

	//
	// Crea un store vacio para el combo de atributos.
	//
	InicializarStoreComboAtributos: function () {
		var st = Ext.create ('Sistema.view.Produccion.MedicionDeAtributo.StoreAtributo', {autoDestroy:true});

		this.ctl.cbAtributoId.setStore (st);
	},

	CargarComponentes: function () {
		var me = this;

		// Carga de componentes
		this.ctl.tbNroDeRegistro			= this.getView ().down ("textfield[name='tbNroDeRegistro']");
		this.ctl.tbFechaYHoraCarga			= this.getView ().down ("textfield[name='tbFechaYHoraCarga']");
		this.ctl.tbUsuarioDeCarga			= this.getView ().down ("textfield[name='tbUsuarioDeCarga']");
		this.ctl.tbCodOrdenDeTrabajo		= this.getView ().down ("textfield[name='tbCodOrdenDeTrabajo']");
		this.ctl.tbCodProducto				= this.getView ().down ("textfield[name='tbCodProducto']");
		this.ctl.tbDescProducto				= this.getView ().down ("textfield[name='tbDescProducto']");
		this.ctl.tbCantidad					= this.getView ().down ("textfield[name='tbCantidad']");
		this.ctl.tbCodUnidadOT				= this.getView ().down ("textfield[name='tbCodUnidadOT']");
		this.ctl.tbDesUnidadOT				= this.getView ().down ("textfield[name='tbDesUnidadOT']");
		this.ctl.tbCodUnidadAtributo		= this.getView ().down ("textfield[name='tbCodUnidadAtributo']");
		this.ctl.tbDescUnidadAtributo		= this.getView ().down ("textfield[name='tbDescUnidadAtributo']");
		this.ctl.tbValorAtributoTeorico		= this.getView ().down ("textfield[name='tbValorAtributoTeorico']");
		this.ctl.tbCodUnidadValorTeorico	= this.getView ().down ("textfield[name='tbCodUnidadValorTeorico']");
		this.ctl.tbValorAtributoMedido		= this.getView ().down ("textfield[name='tbValorAtributoMedido']");
		this.ctl.tbCodUnidadValorMedido		= this.getView ().down ("textfield[name='tbCodUnidadValorMedido']");
		this.ctl.tbComentarios				= this.getView ().down ("textfield[name='tbComentarios']");
		this.ctl.btnBuscarOrdenDeTrabajo	= this.getView ().down ("button[name='btnBuscarOrdenDeTrabajo']");
		this.ctl.btnVerOrdenDeTrabajo		= this.getView ().down ("button[name='btnVerOrdenDeTrabajo']");
		this.ctl.btnVerProducto				= this.getView ().down ("button[name='btnVerProducto']");
		this.ctl.btnVerUnidadOT				= this.getView ().down ("button[name='btnVerUnidadOT']");
		this.ctl.btnVerUnidadAtributo		= this.getView ().down ("button[name='btnVerUnidadAtributo']");
		this.ctl.btnCerrar					= this.getView ().down ("button[name='btnCerrar']");
		this.ctl.btnGuardar					= this.getView ().down ("button[name='btnGuardar']");
		this.ctl.cbAtributoId				= this.getView ().down ("combo[name='cbAtributoId']");

		this.InicializarStoreComboAtributos ();

		// Orden de Trabajo
		this.ctl.CampoOrdenDeTrabajo = new CampoBusqueda ();
		this.ctl.CampoOrdenDeTrabajo.SetClaseModelo ('Sistema.view.Produccion.model.OrdenDeTrabajo');
		this.ctl.CampoOrdenDeTrabajo.SetClaseListado ('Sistema.view.Produccion.OrdenDeTrabajo.Listado');
		this.ctl.CampoOrdenDeTrabajo.SetClaseFormulario ('Sistema.view.Produccion.OrdenDeTrabajo.Formulario');
		this.ctl.CampoOrdenDeTrabajo.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/MedicionDeAtributo/FormularioController.php');
		this.ctl.CampoOrdenDeTrabajo.SetController (this);
		this.ctl.CampoOrdenDeTrabajo.SetFuncionLecturaPorId ('BuscarOrdenDeTrabajoPorId');
		this.ctl.CampoOrdenDeTrabajo.SetFuncionLecturaPorCodigo ('BuscarOrdenDeTrabajoPorCodigo');
		this.ctl.CampoOrdenDeTrabajo.SetTextFieldCodigo ('tbCodOrdenDeTrabajo');
		this.ctl.CampoOrdenDeTrabajo.SetBtnBuscar ('btnBuscarOrdenDeTrabajo');
		this.ctl.CampoOrdenDeTrabajo.SetBtnVerRegistro ('btnVerOrdenDeTrabajo');
		this.ctl.CampoOrdenDeTrabajo.productoId = 0;
		this.ctl.CampoOrdenDeTrabajo.unidadDeMedidaId = 0;

		// Filtramos las que no estan en produccion.
		this.ctl.CampoOrdenDeTrabajo.SetFiltroListado (function () {
			var ret = [{
				nombre: 'estado',
				params: {
					id: 4
				}
			}];

			return ret;
		});

		this.ctl.CampoOrdenDeTrabajo.onRegistroSeleccionadoOk = function (rec) {
			if (rec.get ('estadoOTId') != 4) {
				Ext.Msg.alert('Atencion', 'La OT seleccionada no se encuentra en produccion');
				me.ctl.CampoOrdenDeTrabajo.onRegistroSeleccionadoError ();

			} else {
				me.ctl.tbCodOrdenDeTrabajo.setValue (rec.get ('id'));
				me.ctl.tbCodProducto.setValue (rec.get ('producto').codigo);
				me.ctl.tbDescProducto.setValue (rec.get ('producto').descripcionCorta);
				me.ctl.tbCantidad.setValue (rec.get ('cantidad'));
				me.ctl.tbCodUnidadOT.setValue (rec.get ('unidadDeMedida').codigo);
				me.ctl.tbDesUnidadOT.setValue (rec.get ('unidadDeMedida').descripcionCorta);

				this.itemId = rec.get ('id');
				this.productoId = rec.get ('productoId');
				this.unidadDeMedidaId = rec.get ('unidadDeMedidaId');

				me.ConfigurarComboAtributos (rec);
			}
		};

		this.ctl.CampoOrdenDeTrabajo.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodOrdenDeTrabajo.setValue ('');
			me.ctl.tbCodProducto.setValue ('');
			me.ctl.tbDescProducto.setValue ('');
			me.ctl.tbCantidad.setValue ('');
			me.ctl.tbCodUnidadOT.setValue ('');
			me.ctl.tbDesUnidadOT.setValue ('');

			this.productoId = 0;
			this.unidadDeMedidaId = 0;
			me.ConfigurarComboAtributos (null);
		};
	},

	GetElementoFoco: function () {
		return "textfield[name='tbCodOrdenDeTrabajo']";
	},

    SetearParametrosFormulario: function (ctl) {
        ctl.params.anchoVentana = 1024;
        ctl.params.altoVentana  = 470;
    },

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		this.params.registro = rec;

		if (esNuevo) {
			this.ctl.tbValorAtributoMedido.setValue (Formato.PuntoFlotante.Transformar (0));

		} else {
			this.ctl.CampoOrdenDeTrabajo.BuscarPorId (rec.get ('ordenDeTrabajoId'));
			this.ctl.tbComentarios.setValue (rec.get ('comentario'));
			this.ctl.tbValorAtributoMedido.setValue (rec.get ('valorMedido'));
			this.ctl.tbNroDeRegistro.setValue (rec.get ('id'));
			this.ctl.tbFechaYHoraCarga.setValue (rec.get ('timestamp'));
			this.ctl.tbUsuarioDeCarga.setValue (rec.get ('loginName'));
			this.ctl.cbAtributoId.setReadOnly (true);
			this.ctl.tbCodOrdenDeTrabajo.setReadOnly (true);
			this.ctl.tbValorAtributoMedido.setReadOnly (true);
			this.ctl.tbComentarios.setReadOnly (true);
			this.ctl.btnBuscarOrdenDeTrabajo.disable ();
			this.ctl.btnVerOrdenDeTrabajo.disable ();

			this.ctl.btnGuardar.hide ();
			this.ctl.btnCerrar.setHidden (false);
		}
	},

	ObtenerRegistroDeFormulario: function () {
		if (!this.ValidarFormulario ()) {
			return null;
		}

		this.params.registro.set ('ordenDeTrabajoId', this.ctl.CampoOrdenDeTrabajo.itemId);
		this.params.registro.set ('atributoProductoId', this.ctl.cbAtributoId.value);
		this.params.registro.set ('valorMedido', this.ctl.tbValorAtributoMedido.value);
		this.params.registro.set ('comentario', this.ctl.tbComentarios.value);

		return this.params.registro;
	},

	ValidarFormulario: function () {
		if (this.ctl.CampoOrdenDeTrabajo.itemId == 0) {
			Ext.Msg.alert('Error', 'Debe indicar la orden de trabajo');

			return false;
		}

		if (this.ctl.cbAtributoId.value == null) {
			Ext.Msg.alert('Error', 'Debe indicar el atributo medido');

			return false;
		}

		return true;
	}
});
