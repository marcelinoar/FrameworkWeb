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

Ext.define ('Sistema.view.Produccion.NovedadCentroDeTrabajo.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-novct-FormularioController',

    init: function () {
        FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Produccion.model.NovedadCentroDeTrabajo', 'Produccion:NovedadCentroDeTrabajo');

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
			"prod-novct-Formulario": {
				afterrender: this.onRender
			}
        });
    },

    //---------- EventHandlers ----------

	onBtnCerrarClick: function () {
		this.IntentarCerrarVentanaContenedora ();
	},

	//---------- metodos privados----------

	//
	// Crea un store vacio para el combo.
	//
	InicialiarComboTipo: function () {
		var st = Ext.create ('Sistema.view.Produccion.store.StoreTipoNovedadCentroDeTrabajo', {autoDestroy:true});
		this.ctl.cbTipoNovedad.setStore (st);
		st.load ();
	},

	CargarComponentes: function () {
		var me = this;

		this.params.nombreEntidad = 'Novedad Centro de Trabajo';
		// Carga de componentes
		this.ctl.tbNroNovedad			= this.getView ().down ("textfield[name='tbNroNovedad']");
		this.ctl.tbNroNovedad			= this.getView ().down ("textfield[name='tbNroNovedad']");
		this.ctl.tbFecha				= this.getView ().down ("textfield[name='tbFecha']");
		this.ctl.tbUsuarioDeCarga		= this.getView ().down ("textfield[name='tbUsuarioDeCarga']");
		this.ctl.tbCodCentroDeTrabajo	= this.getView ().down ("textfield[name='tbCodCentroDeTrabajo']");
		this.ctl.tbDescCentroDeTrabajo	= this.getView ().down ("textfield[name='tbDescCentroDeTrabajo']");
		this.ctl.tbCodMaquina			= this.getView ().down ("textfield[name='tbCodMaquina']");
		this.ctl.tbDescMaquina			= this.getView ().down ("textfield[name='tbDescMaquina']");
		this.ctl.tbComentarios			= this.getView ().down ("textareafield[name='tbComentarios']");
		this.ctl.cbTipoNovedad			= this.getView ().down ("combo[name='cbTipoNovedad']");
		this.ctl.tbFechaCreacion		= this.getView ().down ("datefield[name='tbFechaCreacion']");
		this.ctl.nfHoras				= this.getView ().down ("numberfield[name='nfHoras']");
		this.ctl.nfMinutos				= this.getView ().down ("numberfield[name='nfMinutos']");
		this.ctl.btnGuardar				= this.getView ().down ("button[name='btnGuardar']");
		this.ctl.btnBorrar				= this.getView ().down ("button[name='btnBorrar']");
		this.ctl.btnCerrar				= this.getView ().down ("button[name='btnCerrar']");

		this.InicialiarComboTipo ();

		// Centro de Trabajo
		this.ctl.CampoCentroDeTrabajo = new CampoBusqueda ();
		this.ctl.CampoCentroDeTrabajo.SetClaseModelo ('Sistema.view.Produccion.model.CentroDeTrabajo');
		this.ctl.CampoCentroDeTrabajo.SetClaseListado ('Sistema.view.Produccion.CentroDeTrabajo.Listado');
		this.ctl.CampoCentroDeTrabajo.SetClaseFormulario ('Sistema.view.Produccion.CentroDeTrabajo.Formulario');
		this.ctl.CampoCentroDeTrabajo.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/CentroDeTrabajo/FormularioController.php');
		this.ctl.CampoCentroDeTrabajo.SetController (this);
		this.ctl.CampoCentroDeTrabajo.SetTextFieldCodigo ('tbCodCentroDeTrabajo');
		this.ctl.CampoCentroDeTrabajo.SetBtnBuscar ('btnBuscarCentroDeTrabajo');
		this.ctl.CampoCentroDeTrabajo.SetBtnVerRegistro ('btnVerCentroDeTrabajo');

		this.ctl.CampoCentroDeTrabajo.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodCentroDeTrabajo.setValue (rec.get ('codigo'));
			me.ctl.tbDescCentroDeTrabajo.setValue (rec.get ('nombre'));
			this.itemId = rec.get ('id');

			// Limpiamos la seleccion de maquina.
			me.ctl.CampoMaquina.itemId = 0;
			me.ctl.tbCodMaquina.setValue ('');
			me.ctl.tbDescMaquina.setValue ('');
		};

		this.ctl.CampoCentroDeTrabajo.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodCentroDeTrabajo.setValue ('');
			me.ctl.tbDescCentroDeTrabajo.setValue ('');

			// Limpiamos la seleccion de maquina.
			me.ctl.CampoMaquina.itemId = 0;
			me.ctl.tbCodMaquina.setValue ('');
			me.ctl.tbDescMaquina.setValue ('');
		};

		// Maquina
		this.ctl.CampoMaquina = new CampoBusqueda ();
		this.ctl.CampoMaquina.SetClaseModelo ('Sistema.view.Produccion.model.Maquina');
		this.ctl.CampoMaquina.SetClaseListado ('Sistema.view.Produccion.Maquina.Listado');
		this.ctl.CampoMaquina.SetClaseFormulario ('Sistema.view.Produccion.Maquina.Formulario');
		this.ctl.CampoMaquina.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/Maquina/FormularioController.php');
		this.ctl.CampoMaquina.SetController (this);
		this.ctl.CampoMaquina.SetTextFieldCodigo ('tbCodMaquina');
		this.ctl.CampoMaquina.SetBtnBuscar ('btnBuscarMaquina');
		this.ctl.CampoMaquina.SetBtnVerRegistro ('btnVerMaquina');

		// Filtramos las maquinas que no pertenecen al CT seleccionado
		this.ctl.CampoMaquina.SetFiltroListado (function () {
			var ret = [{
				nombre: 'centro_trabajo',
				params: {
					id: me.ctl.CampoCentroDeTrabajo.itemId
				}
			}];

			return ret;
		});

		this.ctl.CampoMaquina.onRegistroSeleccionadoOk = function (rec) {
			// Chequeamos que la maquina pertenezca al CT seleccionado
			if (rec.get ('centroDeTrabajoId') != me.ctl.CampoCentroDeTrabajo.itemId) {
				me.ctl.tbCodMaquina.setValue ('');
				Ext.Msg.alert('Atencion', 'La Maquina indicada no pertenece al centro de trabajo seleccionado');

			} else {
				me.ctl.tbCodMaquina.setValue (rec.get ('codigo'));
				me.ctl.tbDescMaquina.setValue (rec.get ('descripcion'));
				this.itemId = rec.get ('id');
			}
		};

		this.ctl.CampoMaquina.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodMaquina.setValue ('');
			me.ctl.tbDescMaquina.setValue ('');
		};
	},

	GetElementoFoco: function () {
		return "textfield[name='tbCodCentroDeTrabajo']";
	},

    SetearParametrosFormulario: function (ctl) {
        ctl.params.anchoVentana = 1024;
        ctl.params.altoVentana  = 400;
    },

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		var me = this;

		this.params.registro = rec;
		if (esNuevo) {
			this.ctl.tbNroNovedad.setValue ('----');

			// Cargamos la fecha y hora actuales por default.
			new ConsultaWS ().Ejecutar ('Core', 'Servicios', 'Controller', 'GetFechaYHoraActual', null, function (resp) {
				if (this.RespuestaOK ()) {
					me.ctl.tbFechaCreacion.setValue (resp.fecha);
					me.ctl.nfHoras.setValue (resp.hora);
					me.ctl.nfMinutos.setValue (resp.minutos);

				} else {
					Ext.Msg.alert('Error', this.GetMensajeRespuesta ());
				}
			});

		} else {
			this.ctl.btnGuardar.hide ();
			this.ctl.btnCerrar.setHidden (false);

			this.ctl.tbNroNovedad.setValue (rec.get ('id'));
			this.ctl.CampoCentroDeTrabajo.BuscarPorId (rec.get ('centroDeTrabajoId'));
			this.ctl.CampoCentroDeTrabajo.Deshabilitar ();

			if (rec.get ('maquinaId') != null) {
				this.ctl.CampoMaquina.BuscarPorId (rec.get ('maquinaId'));
			}

			this.ctl.CampoMaquina.Deshabilitar ();

			this.ctl.cbTipoNovedad.setValue (rec.get ('tipoNovedadCTId'));
			this.ctl.cbTipoNovedad.setReadOnly (true);

			this.ctl.tbComentarios.setValue (rec.get ('comentarios'));
			this.ctl.tbComentarios.setReadOnly (true);

			this.ctl.tbFechaCreacion.setValue (rec.get ('fecha'));
			this.ctl.tbFechaCreacion.setReadOnly (true);

			this.ctl.nfHoras.setValue (rec.get ('hora'));
			this.ctl.nfHoras.setReadOnly (true);

			this.ctl.nfMinutos.setValue (rec.get ('minutos'));
			this.ctl.nfMinutos.setReadOnly (true);

			this.ctl.tbFecha.setValue (rec.get ('timestamp'));
			this.ctl.tbUsuarioDeCarga.setValue (rec.get ('usuario').loginName);
		}
	},

	ObtenerRegistroDeFormulario: function () {
		if (!this.ValidarFormulario ()) {
			return null;
		}

		this.params.registro.set ('maquinaId', this.ctl.CampoMaquina.itemId);
		this.params.registro.set ('centroDeTrabajoId', this.ctl.CampoCentroDeTrabajo.itemId);
		this.params.registro.set ('tipoNovedadCTId', this.ctl.cbTipoNovedad.value);
		this.params.registro.set ('comentarios', this.ctl.tbComentarios.value);
		this.params.registro.set ('fecha', this.ctl.tbFechaCreacion.getRawValue ());
		this.params.registro.set ('hora', this.ctl.nfHoras.value);
		this.params.registro.set ('minutos', this.ctl.nfMinutos.value);

		return this.params.registro;
	},

	ValidarFormulario: function () {
		if (this.ctl.CampoCentroDeTrabajo.itemId == 0) {
			Ext.Msg.alert('Error', 'Debe indicar el Centro de Trabajo');

			return false;
		}

		if (this.ctl.nfHoras.value < 0 || this.ctl.nfHoras.value >= 24) {
			Ext.Msg.alert('Error', 'Formato de Hora invalido');

			return false;
		}

		if (this.ctl.nfMinutos.value < 0 || this.ctl.nfMinutos.value >= 60) {
			Ext.Msg.alert('Error', 'Formato de Minutos invalido');

			return false;
		}

		return true;
	}
});
