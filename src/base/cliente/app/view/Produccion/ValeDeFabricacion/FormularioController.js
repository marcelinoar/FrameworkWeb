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

Ext.define ('Sistema.view.Produccion.ValeDeFabricacion.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-vfab-FormularioController',
    requires:[
    	'Sistema.view.Empresa.model.Empleado'
    ],

    init: function () {
        FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Produccion.model.ValeDeFabricacion', 'Produccion:ValeDeFabricacion');

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
			"button[name='btnGenerarCodigoDePallet']": {
				click: this.onBtnGenerarCodigoDePalletClick
			},
			"prod-vfab-Formulario": {
				afterrender: this.onRender
			},
			"button[name='btnVerProductoPrincipal']": {
				click: this.onBtnVerProductoPrincipalClick
			},
			"button[name='btnVerFormulaProdPrincipal']": {
				click: this.onBtnVerFormulaProdPrincipalClick
			},
			"button[name='btnVerProductoSecundario']": {
				click: this.onBtnVerProductoSecundarioClick
			},
			"button[name='btnVerProductoLote']": {
				click: this.onBtnVerProductoLoteClick
			},
			"combo[name='cbTipoValeFabricacion']": {
				change: this.onCbTipoValeFabricacionChange
			},
			"textfield[name='tbCantidadProducida']": {
				blur: this.FormatearCampoPuntoFlotante
			},
			"textfield[name='tbCantidadRechazada']": {
				blur: this.FormatearCampoPuntoFlotante
			},
			"textfield[name='tbCantidadDeRecortes']": {
				blur: this.FormatearCampoPuntoFlotante
			}
        });
    },

    //---------- EventHandlers ----------

	onBtnCerrarClick: function () {
		this.IntentarCerrarVentanaContenedora ();
	},

    onBtnGenerarCodigoDePalletClick: function () {
        var me = this;

		new ConsultaWS ().Ejecutar ('Produccion', 'ValeDeFabricacion', 'FormularioController', 'GenerarNuevoContenedor', null, function (resp) {
			if (this.RespuestaOK ()) {
				me.ctl.tbCodigoDePallet.setValue (resp.codigo);

			} else {
				Ext.Msg.alert('Error', this.GetMensajeRespuesta ());
			}
		});
    },

    onBtnVerProductoLoteClick: function () {
        if (this.ctl.CampoLote.productoId != 0) {
			ManejadorDeVentanas.AbrirFormularioEdicion ('Sistema.view.Produccion.Producto.Formulario', this.ctl.CampoLote.productoId, true, null);
        }
    },

    onBtnVerProductoPrincipalClick: function () {
        if (this.ctl.CampoOrdenDeTrabajo.productoPrincipalId != 0) {
			ManejadorDeVentanas.AbrirFormularioEdicion ('Sistema.view.Produccion.Producto.Formulario', this.ctl.CampoOrdenDeTrabajo.productoPrincipalId, true, null);
        }
    },

    onBtnVerFormulaProdPrincipalClick: function () {
        if (this.ctl.CampoOrdenDeTrabajo.formulaProductoPrincipalId != 0) {
			ManejadorDeVentanas.AbrirFormularioEdicion ('Sistema.view.Produccion.FormulaDeProduccion.Formulario', this.ctl.CampoOrdenDeTrabajo.formulaProductoPrincipalId, true, null);
        }
    },

    onBtnVerProductoSecundarioClick: function () {
        if (this.ctl.CampoOrdenDeTrabajo.productoSecundarioId != 0) {
			ManejadorDeVentanas.AbrirFormularioEdicion ('Sistema.view.Produccion.Producto.Formulario', this.ctl.CampoOrdenDeTrabajo.productoSecundarioId, true, null);
        }
    },

	DeshabilitarOrdenDeTrabajo: function () {
		this.ctl.CampoOrdenDeTrabajo.Deshabilitar ();
		this.ctl.CampoOrdenDeTrabajo.productoPrincipalId        	= 0;
		this.ctl.CampoOrdenDeTrabajo.productoSecundarioId       	= 0;
		this.ctl.CampoOrdenDeTrabajo.formulaProductoPrincipalId 	= 0;

		this.ctl.tbCodProductoPrincipal.disable ();
		this.ctl.tbDescProductoPrincipal.disable ();
		this.ctl.tbCodFormulaProdPrincipal.disable ();
		this.ctl.tbDescFormulaProdPrincipal.disable ();
		this.ctl.tbCodProductoSecundario.disable ();
		this.ctl.tbDescProductoSecundario.disable ();
		this.ctl.tbCodProductoPrincipal.setValue ('');
		this.ctl.tbDescProductoPrincipal.setValue ('');
		this.ctl.tbCodFormulaProdPrincipal.setValue ('');
		this.ctl.tbDescFormulaProdPrincipal.setValue ('');
		this.ctl.tbCodProductoSecundario.setValue ('');
		this.ctl.tbDescProductoSecundario.setValue ('');

		this.ctl.cbOperacionId.disable ();

		this.ctl.btnVerProductoPrincipal.disable ();
		this.ctl.btnVerFormulaProdPrincipal.disable ();
		this.ctl.btnVerProductoSecundario.disable ();
	},

	HabilitarOrdenDeTrabajo: function () {
		this.ctl.CampoOrdenDeTrabajo.Habilitar ();
		this.ctl.tbCodOrdenDeTrabajo.setValue ('');
		this.ctl.CampoOrdenDeTrabajo.itemId                  			= 0;
		this.ctl.CampoOrdenDeTrabajo.productoPrincipalId                = 0;
		this.ctl.CampoOrdenDeTrabajo.productoSecundarioId               = 0;
		this.ctl.CampoOrdenDeTrabajo.formulaProductoPrincipalId 		= 0;

		this.ctl.btnVerProductoPrincipal.enable ();
		this.ctl.btnVerFormulaProdPrincipal.enable ();
		this.ctl.btnVerProductoSecundario.enable ();
		this.ctl.tbCodProductoPrincipal.enable ();
		this.ctl.tbDescProductoPrincipal.enable ();
		this.ctl.tbCodFormulaProdPrincipal.enable ();
		this.ctl.tbDescFormulaProdPrincipal.enable ();
		this.ctl.tbCodProductoSecundario.enable ();
		this.ctl.tbDescProductoSecundario.enable ();

		if (this.esNuevo) {
			this.ctl.tbCodProductoPrincipal.setValue ('');
			this.ctl.tbDescProductoPrincipal.setValue ('');
			this.ctl.tbCodFormulaProdPrincipal.setValue ('');
			this.ctl.tbDescFormulaProdPrincipal.setValue ('');
			this.ctl.tbCodProductoSecundario.setValue ('');
			this.ctl.tbDescProductoSecundario.setValue ('');

		}
	},

	HabilitarCantRechazadaYRecortes: function () {
		this.ctl.CampoUMCantidadRecortes.Habilitar ();
		this.ctl.CampoUMCantidadRechazada.Habilitar ();
		this.ctl.CampoUMCantidadRecortes.itemId = 0;
		this.ctl.CampoUMCantidadRecortes.itemId = 0;

		this.ctl.tbCantidadDeRecortes.enable ();
		this.ctl.tbDescUMDeRecortes.enable ();
		this.ctl.tbCantidadRechazada.enable ();
		this.ctl.tbDescUMRechazada.enable ();

		if (this.esNuevo) {
			this.ctl.tbCantidadRechazada.setValue (Formato.PuntoFlotante.Transformar (0));
			this.ctl.tbCantidadDeRecortes.setValue (Formato.PuntoFlotante.Transformar (0));

			this.ctl.tbDescUMDeRecortes.setValue ('');
			this.ctl.tbDescUMRechazada.setValue ('');
			this.ctl.tbCodUMRechazada.setValue ('');
			this.ctl.tbCodUMDeRecortes.setValue ('');

		} else {
			this.ctl.tbCantidadRechazada.setValue (Formato.PuntoFlotante.Transformar (this.params.registro.get ('cantidadRechazada')));
			this.ctl.tbCantidadRechazada.setReadOnly (true);
			this.ctl.tbCantidadDeRecortes.setValue (Formato.PuntoFlotante.Transformar (this.params.registro.get ('cantidadRecortes')));
			this.ctl.tbCantidadDeRecortes.setReadOnly (true);
		}
	},

	DeshabilitarCantRechazadaYRecortes: function () {
		this.ctl.CampoUMCantidadRecortes.Deshabilitar ();
		this.ctl.CampoUMCantidadRechazada.Deshabilitar ();

		this.ctl.tbCantidadDeRecortes.disable ();
		this.ctl.tbCantidadRechazada.disable ();
		this.ctl.tbDescUMDeRecortes.disable ();
		this.ctl.tbDescUMRechazada.disable ();

		this.ctl.tbCantidadRechazada.setValue (Formato.PuntoFlotante.Transformar (0));
		this.ctl.tbCantidadDeRecortes.setValue (Formato.PuntoFlotante.Transformar (0));
		this.ctl.tbDescUMDeRecortes.setValue ('');
		this.ctl.tbDescUMRechazada.setValue ('');
	},

	HabilitarCantProducida: function () {
		this.ctl.CampoUMCantidadProducida.Habilitar ();
		this.ctl.CampoUMCantidadProducida.itemId = 0;

		this.ctl.tbCantidadProducida.enable();
		this.ctl.tbDescUMProducida.enable ();

		if (this.esNuevo) {
			this.ctl.tbCantidadProducida.setValue (Formato.PuntoFlotante.Transformar (0));
			this.ctl.tbDescUMProducida.setValue ('');
			this.ctl.tbCodUMProducida.setValue ('');

		} else {
			this.ctl.tbCantidadProducida.setValue (Formato.PuntoFlotante.Transformar (this.params.registro.get ('cantidadProducida')));
			this.ctl.tbCantidadProducida.setReadOnly (true);
		}
	},

	DeshabilitarCantProducida: function () {
		this.ctl.CampoUMCantidadProducida.Deshabilitar ();
		this.ctl.tbCantidadProducida.disable ();
		this.ctl.tbDescUMProducida.disable ();

		this.ctl.tbCantidadProducida.setValue (Formato.PuntoFlotante.Transformar (0));
		this.ctl.tbDescUMProducida.setValue ('');
	},

	HabilitarLote: function () {
		this.ctl.CampoLote.Habilitar ();
		this.ctl.tbDescProductoLote.enable ();
		this.ctl.tbCodProductoLote.enable ();
		this.ctl.btnVerProductoLote.enable ();
	},

	DeshabiltiarLote: function () {
		this.ctl.CampoLote.Deshabilitar ();
		this.ctl.tbDescProductoLote.disable ();
		this.ctl.tbCodProductoLote.enable ();
		this.ctl.btnVerProductoLote.disable ();
	},

    onCbTipoValeFabricacionChange: function (t, val) {
    	// Al cambiar el tipo de vale reseteamos el contenido del combo de operaciones.
    	this.ConfigurarComboOperaciones (null);
		this.ConfigurarPantallaPorTipoDeVale (val);
    },

    //---------- Metodos Privados ----------

	ConfigurarPantallaPorTipoDeVale: function (tipo) {
		switch (tipo) {
			case 1: // Si voy a cargar piezas buenas de una OT dentro de un lote
				this.HabilitarOrdenDeTrabajo ();
				this.DeshabilitarCantRechazadaYRecortes ();
				this.HabilitarCantProducida ();
				this.DeshabiltiarLote ();
				break;

			case 2: // Si voy a cargar recortes o descartes de piezas dentro de un lote.
				this.DeshabilitarOrdenDeTrabajo ();
				this.HabilitarLote ();
				this.DeshabilitarCantProducida ();
				this.HabilitarCantRechazadaYRecortes ();
				break;

			case 3: // Si voy a cargar cualquier dato de una OT que no este dentro de un lote.
				this.HabilitarOrdenDeTrabajo ();
				this.HabilitarCantProducida ();
				this.HabilitarCantRechazadaYRecortes ();
				this.DeshabiltiarLote ();
				break;

			default: // Si cambie el centro de trabajo deshabilitamos todo.
				this.DeshabilitarOrdenDeTrabajo ();
				this.DeshabilitarCantProducida ();
				this.DeshabilitarCantRechazadaYRecortes ();
				this.DeshabiltiarLote ();
				break;
		}
	},

	//
	// Dado un registro del tipo Centro de Trabajo, configuramos el combo TipoValeDeFabricacion
	//
	ConfigurarTipoValePorCT: function (rec) {
		this.ctl.cbTipoValeFabricacion.setDisabled (false);
		this.ctl.cbTipoValeFabricacion.getStore ().removeAll ();
		this.ctl.cbTipoValeFabricacion.getStore ().loadData (rec.get ('tipoDeVale'));

		if (rec.get ('organizaPorLote')) {
			// Si estamos editando un registro cargamos el tipo de vale de fabricacion
			if (!this.esNuevo) {
				if (this.params.registro.get ('ordenDeTrabajoId') != null) {
					this.ctl.cbTipoValeFabricacion.setValue (1);
				}

			} else {
				this.ctl.cbTipoValeFabricacion.reset ();
			}

		} else {
			this.ctl.cbTipoValeFabricacion.setValue (3);
		}
	},

	//
	// Carga las operaciones, segun la seleccion de la OT, en el combo de operaciones.
	// Si recibe null borra todo
	//
	ConfigurarComboOperaciones: function (rec) {
		this.ctl.cbOperacionId.setDisabled (false);
		this.ctl.cbOperacionId.getStore ().removeAll ();

		if (rec != null) {
			this.ctl.cbOperacionId.getStore ().loadData (rec.get ('operaciones'));
		}

		// Si estamos creando un registro resetamos el combo, sino seleccionamos el registro leido.
		if (this.esNuevo) {
			this.ctl.cbOperacionId.reset ();

		} else {
			this.ctl.cbOperacionId.setValue (this.params.registro.get ('operacionId'));
			this.ctl.cbOperacionId.setReadOnly (true);
		}
	},

    SetearParametrosFormulario: function (ctl) {
        ctl.params.anchoVentana = 1024;
        ctl.params.altoVentana  = 650;
    },

    // Asocia un store vacio al combo de tipo
    InicializarStoreCombos: function () {
        var st_tipo = Ext.create ('Sistema.view.Produccion.ValeDeFabricacion.StoreTipoValeFabricacion', {autoDestroy:true});
        var st_oper = Ext.create ('Sistema.view.Produccion.ValeDeFabricacion.StoreOperacion', {autoDestroy:true});

        this.ctl.cbTipoValeFabricacion.setStore (st_tipo);
        this.ctl.cbOperacionId.setStore (st_oper);
    },

	CargarComponentes: function () {
		var me = this;

		// Componentes
		this.ctl.tbFechaYHoraCarga						= this.getView ().down ("textfield[name='tbFechaYHoraCarga']");
		this.ctl.tbUsuarioDeCarga						= this.getView ().down ("textfield[name='tbUsuarioDeCarga']");
		this.ctl.tbNroValeDeFabricacion					= this.getView ().down ("textfield[name='tbNroValeDeFabricacion']");
		this.ctl.tbCodCentroDeTrabajo                   = this.getView ().down ("textfield[name='tbCodCentroDeTrabajo']");
		this.ctl.tbDescCentroDeTrabajo                  = this.getView ().down ("textfield[name='tbDescCentroDeTrabajo']");
		this.ctl.tbCodOrdenDeTrabajo                    = this.getView ().down ("textfield[name='tbCodOrdenDeTrabajo']");
		this.ctl.tbCodProductoPrincipal                 = this.getView ().down ("textfield[name='tbCodProductoPrincipal']");
		this.ctl.tbDescProductoPrincipal                = this.getView ().down ("textfield[name='tbDescProductoPrincipal']");
		this.ctl.tbCodFormulaProdPrincipal              = this.getView ().down ("textfield[name='tbCodFormulaProdPrincipal']");
		this.ctl.tbDescFormulaProdPrincipal     		= this.getView ().down ("textfield[name='tbDescFormulaProdPrincipal']");
		this.ctl.tbCodProductoSecundario                = this.getView ().down ("textfield[name='tbCodProductoSecundario']");
		this.ctl.tbNombreOperario               		= this.getView ().down ("textfield[name='tbNombreOperario']");
		this.ctl.tbApellidoOperario             		= this.getView ().down ("textfield[name='tbApellidoOperario']");
		this.ctl.tbDescProductoSecundario               = this.getView ().down ("textfield[name='tbDescProductoSecundario']");
		this.ctl.tbCodNroDeLegajo               		= this.getView ().down ("textfield[name='tbCodNroDeLegajo']");
		this.ctl.tbCodFormulaProdSecundario     		= this.getView ().down ("textfield[name='tbCodFormulaProdSecundario']");
		this.ctl.tbDescFormulaProdSecundario    		= this.getView ().down ("textfield[name='tbDescFormulaProdSecundario']");
		this.ctl.cbTipoValeFabricacion                  = this.getView ().down ("combo[name='cbTipoValeFabricacion']");
		this.ctl.tbCantidadProducida                    = this.getView ().down ("textfield[name='tbCantidadProducida']");
		this.ctl.tbDescUMProducida              		= this.getView ().down ("textfield[name='tbDescUMProducida']");
		this.ctl.tbCodUMProducida               		= this.getView ().down ("textfield[name='tbCodUMProducida']");
		this.ctl.tbCantidadRechazada                    = this.getView ().down ("textfield[name='tbCantidadRechazada']");
		this.ctl.tbCodUMRechazada               		= this.getView ().down ("textfield[name='tbCodUMRechazada']");
		this.ctl.tbDescUMRechazada              		= this.getView ().down ("textfield[name='tbDescUMRechazada']");
		this.ctl.tbCantidadDeRecortes                   = this.getView ().down ("textfield[name='tbCantidadDeRecortes']");
		this.ctl.tbCodUMDeRecortes              		= this.getView ().down ("textfield[name='tbCodUMDeRecortes']");
		this.ctl.tbCodigoDePallet                       = this.getView ().down ("textfield[name='tbCodigoDePallet']");
		this.ctl.tbDescUMDeRecortes                     = this.getView ().down ("textfield[name='tbDescUMDeRecortes']");

		this.ctl.tbCodLoteDeFabricacion                 = this.getView ().down ("textfield[name='tbCodLoteDeFabricacion']");
		this.ctl.tbCodProductoLote                 	    = this.getView ().down ("textfield[name='tbCodProductoLote']");
		this.ctl.tbDescProductoLote                     = this.getView ().down ("textfield[name='tbDescProductoLote']");
		this.ctl.btnVerProductoLote						= this.getView ().down ("button[name='btnVerProductoLote']");

		this.ctl.tbComentarios                          = this.getView ().down ("textareafield[name='tbComentarios']");
		this.ctl.cbOperacionId                          = this.getView ().down ("combo[name='cbOperacionId']");
		this.ctl.btnVerProductoPrincipal                = this.getView ().down ("button[name='btnVerProductoPrincipal']");
		this.ctl.btnVerFormulaProdPrincipal             = this.getView ().down ("button[name='btnVerFormulaProdPrincipal']");
		this.ctl.btnVerProductoSecundario               = this.getView ().down ("button[name='btnVerProductoSecundario']");
		this.ctl.btnGuardar								= this.getView ().down ("button[name='btnGuardar']");
		this.ctl.btnCerrar								= this.getView ().down ("button[name='btnCerrar']");
		this.ctl.btnBuscarCentroDeTrabajo				= this.getView ().down ("button[name='btnBuscarCentroDeTrabajo']");
		this.ctl.btnBuscarOrdenDeTrabajo				= this.getView ().down ("button[name='btnBuscarOrdenDeTrabajo']");
		this.ctl.btnBuscarUMProducida					= this.getView ().down ("button[name='btnBuscarUMProducida']");
		this.ctl.btnBuscarUMRechazada					= this.getView ().down ("button[name='btnBuscarUMRechazada']");
		this.ctl.btnBuscarUMDeRecortes					= this.getView ().down ("button[name='btnBuscarUMDeRecortes']");
		this.ctl.btnBuscarNroDeLegajo					= this.getView ().down ("button[name='btnBuscarNroDeLegajo']");
		this.ctl.btnGenerarCodigoDePallet				= this.getView ().down ("button[name='btnGenerarCodigoDePallet']");

		this.InicializarStoreCombos ();

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
		this.ctl.CampoLote.productoId = 0;

		this.ctl.CampoLote.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodLoteDeFabricacion.setValue (rec.get ('id'));
			me.ctl.tbCodProductoLote.setValue (rec.get ('producto').codigo);
			me.ctl.tbDescProductoLote.setValue (rec.get ('producto').descripcionCorta);

			this.productoId = rec.get ('producto').id;
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoLote.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodLoteDeFabricacion.setValue ('');
			me.ctl.tbDescProductoLote.setValue ('');
			me.ctl.tbCodProductoLote.setValue ('');

			this.productoId = 0;
		};

		// Centro de Trabajo
		this.ctl.CampoCentroDeTrabajo = new CampoBusqueda ();
		this.ctl.CampoCentroDeTrabajo.SetClaseModelo ('Sistema.view.Produccion.model.CentroDeTrabajo');
		this.ctl.CampoCentroDeTrabajo.SetClaseListado ('Sistema.view.Produccion.CentroDeTrabajo.Listado');
		this.ctl.CampoCentroDeTrabajo.SetClaseFormulario ('Sistema.view.Produccion.CentroDeTrabajo.Formulario');
		this.ctl.CampoCentroDeTrabajo.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/ValeDeFabricacion/FormularioController.php');
		this.ctl.CampoCentroDeTrabajo.SetFuncionLecturaPorId ('BuscarCentroDeTrabajoPorId');
		this.ctl.CampoCentroDeTrabajo.SetFuncionLecturaPorCodigo ('BuscarCentroDeTrabajoPorCodigo');
		this.ctl.CampoCentroDeTrabajo.SetController (this);
		this.ctl.CampoCentroDeTrabajo.SetTextFieldCodigo ('tbCodCentroDeTrabajo');
		this.ctl.CampoCentroDeTrabajo.SetBtnBuscar ('btnBuscarCentroDeTrabajo');
		this.ctl.CampoCentroDeTrabajo.SetBtnVerRegistro ('btnVerCentroDeTrabajo');

		this.ctl.CampoCentroDeTrabajo.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodCentroDeTrabajo.setValue (rec.get ('codigo'));
			me.ctl.tbDescCentroDeTrabajo.setValue (rec.get ('nombre'));
			this.itemId = rec.get ('id');

			me.ConfigurarTipoValePorCT (rec);
			if (!me.esNuevo) {
				me.ctl.btnBuscarCentroDeTrabajo.disable ();
				me.ctl.tbCodCentroDeTrabajo.disable ();
				me.ctl.cbTipoValeFabricacion.disable ();
			}

			if (rec.get ('generaPallet')) {
				me.ctl.btnGenerarCodigoDePallet.enable ();

			} else {
				me.ctl.btnGenerarCodigoDePallet.disable ();
			}
		};

		this.ctl.CampoCentroDeTrabajo.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodCentroDeTrabajo.setValue ('');
			me.ctl.tbDescCentroDeTrabajo.setValue ('');

			// Reseteamos el combo de tipo vale fabricacion para que se reseteen todos los componentes.
			me.ctl.cbTipoValeFabricacion.setDisabled (false);
			me.ctl.cbTipoValeFabricacion.getStore ().removeAll ();
			me.ctl.cbTipoValeFabricacion.setValue (null);
			me.ctl.btnGenerarCodigoDePallet.disable ();
		};

		// Orden de Trabajo
		this.ctl.CampoOrdenDeTrabajo = new CampoBusqueda ();
		this.ctl.CampoOrdenDeTrabajo.SetClaseModelo ('Sistema.view.Produccion.model.OrdenDeTrabajo');
		this.ctl.CampoOrdenDeTrabajo.SetClaseListado ('Sistema.view.Produccion.OrdenDeTrabajo.Listado');
		this.ctl.CampoOrdenDeTrabajo.SetClaseFormulario ('Sistema.view.Produccion.OrdenDeTrabajo.Formulario');
		this.ctl.CampoOrdenDeTrabajo.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/ValeDeFabricacion/FormularioController.php');
		this.ctl.CampoOrdenDeTrabajo.SetFuncionLecturaPorId ('BuscarOTPorId');
		this.ctl.CampoOrdenDeTrabajo.SetFuncionLecturaPorCodigo ('BuscarOTPorCodigo');
		this.ctl.CampoOrdenDeTrabajo.SetController (this);
		this.ctl.CampoOrdenDeTrabajo.SetTextFieldCodigo ('tbCodOrdenDeTrabajo');
		this.ctl.CampoOrdenDeTrabajo.SetBtnBuscar ('btnBuscarOrdenDeTrabajo');
		this.ctl.CampoOrdenDeTrabajo.SetBtnVerRegistro ('btnVerOrdenDeTrabajo');

		// Definimos estas variables aca dentro y las inicializamos
		this.ctl.CampoOrdenDeTrabajo.productoPrincipalId        = 0;
		this.ctl.CampoOrdenDeTrabajo.productoSecundarioId       = 0;
		this.ctl.CampoOrdenDeTrabajo.formulaProductoPrincipalId = 0;

		// Filtramos las que no estan en produccion y no pertenecen al CT seleccionado
		this.ctl.CampoOrdenDeTrabajo.SetFiltroListado (function () {
			var ret = [{
				nombre: 'estado',
				params: {
					id: 4
				}
			}, {
				nombre: 'centro_trabajo',
				params: {
					id: me.ctl.CampoCentroDeTrabajo.itemId
				}
			}];

			return ret;
		});

		this.ctl.CampoOrdenDeTrabajo.onRegistroSeleccionadoOk = function (rec) {
			if (rec.get ('estadoOTId') != 4 || rec.get ('productoPrincipal').centroDeTrabajoId != me.ctl.CampoCentroDeTrabajo.itemId) {
				Ext.Msg.alert('Atencion', 'La OT seleccionada no se encuentra en produccion o no pertenece al Centro de Trabajo seleccionado');

				me.ctl.CampoOrdenDeTrabajo.onRegistroSeleccionadoError ();

			} else {
				me.ctl.tbCodOrdenDeTrabajo.setValue (rec.get ('id'));
				this.itemId = rec.get ('id');

				me.ctl.tbCodProductoPrincipal.setValue (rec.get ('productoPrincipal').codigo);
				me.ctl.tbDescProductoPrincipal.setValue (rec.get ('productoPrincipal').descripcionCorta);
				this.productoPrincipalId = rec.get ('productoPrincipal').id;

				me.ctl.tbCodProductoSecundario.setValue (rec.get ('productoSecundario').codigo);
				me.ctl.tbDescProductoSecundario.setValue (rec.get ('productoSecundario').descripcionCorta);
				this.productoSecundarioId = rec.get ('productoSecundario').id;

				me.ctl.tbCodFormulaProdPrincipal.setValue (rec.get ('formulaDeProduccion').codigo);
				me.ctl.tbDescFormulaProdPrincipal.setValue (rec.get ('formulaDeProduccion').descripcionCorta);
				this.formulaProductoPrincipalId = rec.get ('formulaDeProduccion').id;

				me.ConfigurarComboOperaciones (rec);
				if (!me.esNuevo) {
					me.ctl.btnBuscarOrdenDeTrabajo.disable ();
					me.ctl.tbCodOrdenDeTrabajo.disable ();
					me.ctl.btnBuscarUMProducida.disable ();
					me.ctl.tbCodUMProducida.disable ();
					me.ctl.tbCodUMDeRecortes.disable ();
					me.ctl.btnBuscarUMDeRecortes.disable ();
					me.ctl.tbCodUMRechazada.disable ();
					me.ctl.btnBuscarUMRechazada.disable ();
				}
			}
		};

		this.ctl.CampoOrdenDeTrabajo.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodOrdenDeTrabajo.setValue ('');
			me.ctl.tbCodProductoPrincipal.setValue ('');
			me.ctl.tbDescProductoPrincipal.setValue ('');
			this.productoPrincipalId = 0;

			me.ctl.tbCodProductoSecundario.setValue ('');
			me.ctl.tbDescProductoSecundario.setValue ('');
			this.productoSecundarioId = 0;

			me.ctl.tbCodFormulaProdPrincipal.setValue ('');
			me.ctl.tbDescFormulaProdPrincipal.setValue ('');
			this.formulaProductoPrincipalId = 0;

			// Deshabilitamos el combo de operaciones y todos los componentes de la carga de cantidades.
			me.ConfigurarComboOperaciones (null);
			me.ConfigurarPantallaPorTipoDeVale (me.ctl.cbTipoValeFabricacion.value);
		};

		// UM Cant producida
		this.ctl.CampoUMCantidadProducida = new CampoBusqueda ();
		this.ctl.CampoUMCantidadProducida.SetClaseModelo ('Sistema.view.Produccion.model.UnidadDeMedida');
		this.ctl.CampoUMCantidadProducida.SetClaseListado ('Sistema.view.Produccion.UnidadDeMedida.Listado');
		this.ctl.CampoUMCantidadProducida.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/UnidadDeMedida/FormularioController.php');
		this.ctl.CampoUMCantidadProducida.SetController (this);
		this.ctl.CampoUMCantidadProducida.SetTextFieldCodigo ('tbCodUMProducida');
		this.ctl.CampoUMCantidadProducida.SetBtnBuscar ('btnBuscarUMProducida');

		this.ctl.CampoUMCantidadProducida.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodUMProducida.setValue (rec.get ('codigo'));
			me.ctl.tbDescUMProducida.setValue (rec.get ('descripcionCorta'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoUMCantidadProducida.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodUMProducida.setValue ('');
			me.ctl.tbDescUMProducida.setValue ('');
		};

		// UM Cant rechazada
		this.ctl.CampoUMCantidadRechazada = new CampoBusqueda ();
		this.ctl.CampoUMCantidadRechazada.SetClaseModelo ('Sistema.view.Produccion.model.UnidadDeMedida');
		this.ctl.CampoUMCantidadRechazada.SetClaseListado ('Sistema.view.Produccion.UnidadDeMedida.Listado');
		this.ctl.CampoUMCantidadRechazada.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/UnidadDeMedida/FormularioController.php');
		this.ctl.CampoUMCantidadRechazada.SetController (this);
		this.ctl.CampoUMCantidadRechazada.SetTextFieldCodigo ('tbCodUMRechazada');
		this.ctl.CampoUMCantidadRechazada.SetBtnBuscar ('btnBuscarUMRechazada');

		this.ctl.CampoUMCantidadRechazada.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodUMRechazada.setValue (rec.get ('codigo'));
			me.ctl.tbDescUMRechazada.setValue (rec.get ('descripcionCorta'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoUMCantidadRechazada.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodUMRechazada.setValue ('');
			me.ctl.tbDescUMRechazada.setValue ('');
		};

		// UM Cant de Recortes
		this.ctl.CampoUMCantidadRecortes = new CampoBusqueda ();
		this.ctl.CampoUMCantidadRecortes.SetClaseModelo ('Sistema.view.Produccion.model.UnidadDeMedida');
		this.ctl.CampoUMCantidadRecortes.SetClaseListado ('Sistema.view.Produccion.UnidadDeMedida.Listado');
		this.ctl.CampoUMCantidadRecortes.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/UnidadDeMedida/FormularioController.php');
		this.ctl.CampoUMCantidadRecortes.SetController (this);
		this.ctl.CampoUMCantidadRecortes.SetTextFieldCodigo ('tbCodUMDeRecortes');
		this.ctl.CampoUMCantidadRecortes.SetBtnBuscar ('btnBuscarUMDeRecortes');

		this.ctl.CampoUMCantidadRecortes.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodUMDeRecortes.setValue (rec.get ('codigo'));
			me.ctl.tbDescUMDeRecortes.setValue (rec.get ('descripcionCorta'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoUMCantidadRecortes.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodUMDeRecortes.setValue ('');
			me.ctl.tbDescUMDeRecortes.setValue ('');
		};

		// Empleado/ Operario
		this.ctl.CampoOperario = new CampoBusqueda ();
		this.ctl.CampoOperario.SetClaseModelo ('Sistema.view.Empresa.model.Empleado');
		this.ctl.CampoOperario.SetClaseListado ('Sistema.view.Empresa.Empleado.Listado');
		this.ctl.CampoOperario.SetClaseFormulario ('Sistema.view.Empresa.Empleado.Formulario');
		this.ctl.CampoOperario.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Empresa/Empleado/FormularioController.php');
		this.ctl.CampoOperario.SetController (this);
		this.ctl.CampoOperario.SetTextFieldCodigo ('tbCodNroDeLegajo');
		this.ctl.CampoOperario.SetBtnVerRegistro ('btnVerNroDeLegajo');
		this.ctl.CampoOperario.SetBtnBuscar ('btnBuscarNroDeLegajo');

		this.ctl.CampoOperario.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbNombreOperario.setValue (rec.get ('nombre'));
			me.ctl.tbApellidoOperario.setValue (rec.get ('apellido'));
			me.ctl.tbCodNroDeLegajo.setValue (rec.get ('nroLegajo'));
			this.itemId = rec.get ('id');

			if (!me.esNuevo) {
				me.ctl.tbCodNroDeLegajo.disable ();
				me.ctl.btnBuscarNroDeLegajo.disable ();
			}
		};

		this.ctl.CampoOperario.onRegistroSeleccionadoError = function () {
			me.ctl.tbNombreOperario.setValue ('');
			me.ctl.tbApellidoOperario.setValue ('');
			me.ctl.tbCodNroDeLegajo.setValue ('');
		};
	},

	GetElementoFoco: function () {
		return "textfield[name='tbCodCentroDeTrabajo']";
	},

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		this.params.registro = rec;
		this.ctl.tbCodCentroDeTrabajo.focus (true, 100);

		if (esNuevo) {
			this.ctl.tbCantidadProducida.setValue (Formato.PuntoFlotante.Transformar (0));
			this.ctl.tbCantidadRechazada.setValue (Formato.PuntoFlotante.Transformar (0));
			this.ctl.tbCantidadDeRecortes.setValue (Formato.PuntoFlotante.Transformar (0));

		} else {
			this.ctl.tbNroValeDeFabricacion.setValue (rec.get ('id'));
			this.ctl.CampoCentroDeTrabajo.BuscarPorId (rec.get ('centroDeTrabajoId'));
			this.ctl.tbComentarios.setValue (rec.get ('observaciones'));
			this.ctl.tbComentarios.setReadOnly (true);
			this.ctl.tbCodigoDePallet.setValue (rec.get ('codigoContenedor'));
			this.ctl.tbCodigoDePallet.setReadOnly (true);
			this.ctl.tbFechaYHoraCarga.setValue (rec.get ('timestamp'));
			this.ctl.tbUsuarioDeCarga.setValue (rec.get ('loginName'));
			this.ctl.btnGenerarCodigoDePallet.disable ();

			if (rec.get ('empleadoId') != null) {
				this.ctl.CampoOperario.BuscarPorId (rec.get ('empleadoId'));

			} else {
				this.ctl.tbCodNroDeLegajo.disable ();
				this.ctl.btnBuscarNroDeLegajo.disable ();
			}

			if (rec.get ('ordenDeTrabajoId') != null) {
				this.ctl.CampoOrdenDeTrabajo.BuscarPorId (rec.get ('ordenDeTrabajoId'));

			} else {
				this.ctl.btnBuscarOrdenDeTrabajo.disable ();
				this.ctl.tbCodOrdenDeTrabajo.disable ();
			}

			if (rec.get ('unidadDeMedidaCantProducidaId') != null) {
				this.ctl.CampoUMCantidadProducida.BuscarPorId (rec.get ('unidadDeMedidaCantProducidaId'));

			} else {
				this.ctl.btnBuscarUMProducida.disable ();
				this.ctl.tbCodUMProducida.disable ();
			}

			if (rec.get ('unidadDeMedidaCantRechazadaId') != null) {
				this.ctl.CampoUMCantidadRechazada.BuscarPorId (rec.get ('unidadDeMedidaCantRechazadaId'));

			} else {
				this.ctl.tbCodUMRechazada.disable ();
				this.ctl.btnBuscarUMRechazada.disable ();
			}

			if (rec.get ('CampoUMCantidadRecortes') != null) {
				this.ctl.CampoUMCantidadRecortes.BuscarPorId (rec.get ('CampoUMCantidadRecortes'));
			}

			this.ctl.btnGuardar.hide ();
			this.ctl.btnCerrar.setHidden (false);
		}
	},

	ObtenerRegistroDeFormulario: function () {
		if (this.ValidarFormulario ()) {
			this.params.registro.set ('centroDeTrabajoId'                , this.ctl.CampoCentroDeTrabajo.itemId);
			this.params.registro.set ('tipoDeVale'                       , this.ctl.cbTipoValeFabricacion.getValue ());
			this.params.registro.set ('loteId'                           , this.ctl.CampoLote.itemId);
			this.params.registro.set ('ordenDeTrabajoId'                 , this.ctl.CampoOrdenDeTrabajo.itemId);
			this.params.registro.set ('operacionId'                      , this.ctl.cbOperacionId.getValue ());
			this.params.registro.set ('empleadoId'                       , this.ctl.CampoOperario.itemId);
			this.params.registro.set ('cantidadProducida'                , this.ctl.tbCantidadProducida.getValue ());
			this.params.registro.set ('cantidadRechazada'                , this.ctl.tbCantidadRechazada.getValue ());
			this.params.registro.set ('cantidadRecortes'                 , this.ctl.tbCantidadDeRecortes.getValue ());
			this.params.registro.set ('unidadDeMedidaCantProducidaId'    , this.ctl.CampoUMCantidadProducida.itemId);
			this.params.registro.set ('unidadDeMedidaCantRechazadaId'    , this.ctl.CampoUMCantidadRechazada.itemId);
			this.params.registro.set ('unidadDeMedidaCantRecortesId'     , this.ctl.CampoUMCantidadRecortes.itemId);
			this.params.registro.set ('comentarios'                      , this.ctl.tbComentarios.getValue ());
			this.params.registro.set ('codigoDePallet'                   , this.ctl.tbCodigoDePallet.getValue ());

			return this.params.registro;

		} else {
			return null;
		}
	},

	ValidarFormulario: function () {
		var flag = Formato.PuntoFlotante.GetNumero (this.ctl.tbCantidadDeRecortes.getValue ()) != 0;
		flag = flag || Formato.PuntoFlotante.GetNumero (this.ctl.tbCantidadRechazada.getValue ()) != 0;
		flag = flag || Formato.PuntoFlotante.GetNumero (this.ctl.tbCantidadProducida.getValue ()) != 0;

		// Debe cargar almenos una cantidad
		if (!flag) {
			Ext.Msg.alert('Error', 'Debe indicar al menos una cantidad');

			return false;
		}

		// Si carga la cantidad producida debe indicar la UM
		if (Formato.PuntoFlotante.GetNumero (this.ctl.tbCantidadProducida.getValue ()) != 0) {
			if (this.ctl.CampoUMCantidadProducida.itemId == 0) {
				Ext.Msg.alert('Error', 'Debe indicar una unidad de medida para la cantidad producida');

				return false;
			}
		}

		// Si carga una cantidad rechazada debe indicar la UM
		if (Formato.PuntoFlotante.GetNumero (this.ctl.tbCantidadRechazada.getValue ()) != 0) {
			if (this.ctl.CampoUMCantidadRechazada.itemId == 0) {
				Ext.Msg.alert('Error', 'Debe indicar una unidad de medida para la cantidad rechazada');

				return false;
			}
		}

		// Si carga una cantidad de recortes debe indicar la UM
		if (Formato.PuntoFlotante.GetNumero (this.ctl.tbCantidadDeRecortes.getValue ()) != 0) {
			if (this.ctl.CampoUMCantidadRecortes.itemId == 0) {
				Ext.Msg.alert('Error', 'Debe indicar una unidad de medida para la cantidad de recortes');

				return false;
			}
		}

		// Si selecciona una OT debe indicar la operacion
		if (this.ctl.CampoOrdenDeTrabajo.itemId != 0) {
			if (this.ctl.cbOperacionId.getValue () == null) {
				Ext.Msg.alert('Error', 'Debe seleccionar una operacion');

				return false;
			}
		}

		// Debe indicar un centro de trabajo
		if (this.ctl.CampoCentroDeTrabajo.itemId == 0) {
			Ext.Msg.alert('Error', 'Debe indicar un Centro de Trabajo');

			return false;
		}

		// Debe indicar el tipo de vale
		if (this.ctl.cbTipoValeFabricacion.getValue () == null) {
			Ext.Msg.alert('Error', 'Debe indicar el tipo de vale de fabricacion');

			return false;
		}

		if (this.ctl.cbTipoValeFabricacion.getValue () == 1 || this.ctl.cbTipoValeFabricacion.getValue () == 3) {
			if (this.ctl.CampoOrdenDeTrabajo.itemId == 0) {
				Ext.Msg.alert('Error', 'Debe indicar la Orden de Trabajo');

				return false;
			}
		}

		if (this.ctl.cbTipoValeFabricacion.getValue () == 2) {
			if (this.ctl.CampoLote.itemId == 0) {
				Ext.Msg.alert('Error', 'Debe indicar un Lote de Fabricacion');

				return false;
			}
		}

		// Siempre se debe indicar el codigo de pallet.
		if (this.ctl.tbCodigoDePallet.value == '') {
			Ext.Msg.alert('Error', 'Debe indicar un codigo de pallet valido');

			return null;
		}

		return true;
	}
});
