/***************************************************************************************************
 *
 * Archivo: CampoBusqueda.js
 * ------------------------------------------------------------------------------------------------
 *
 * Autor: Marcelino Morales
 *
 * Version: 1.0
 *
 * Descripcion: Componente que permite asociar a un campo de codigo la funcionalidad de abrir una
 * 				ventana de busqueda y actualizar informacion relacionada con el registro seleccionado.
 *
 ***************************************************************************************************/

function CampoBusqueda () {
	this.me 						= this;
	this.EsModal 					= true;							// Indica si la ventana de busqueda se abre como Modal.
	this.EsMazimizable				= false;						// Indica si la ventana de busqueda es maximizable.
	this.EsMaximizado				= false;						// Indica si la ventana de busqueda se abre maximizada.
	this.ClaseModelo;												// Clase correspondiente al modelo a traer.
	this.ClaseListado;												// Clase correspondiente al listado que se usara en la ventana de busqueda.
	this.ClaseFormulario;											// (Opcional) Indica la clase del formulario que permite editar el registro seleccionado.
	this.UrlBusqueda;												// Url al script que se consultara al realizar la busqueda por codigo.
	this.FuncionLecturaPorId 		= 'BuscarPorId';				// Este es el nombre de la funcion al que se llama automaticamente para leer el registro completo
																	// despues de seleccionar el item en el listado.

	this.btnVer						= '';							// Nombre del boton ver
	this.btnBuscar					= '';							// Nombre del boton buscar
	this.btnLimpiar					= '';							// Nombre del boton de limpiar
	this.tbCodigo					= '';							// Nombre del tbCodigo
	this.Controller					= null;							// Controller que contiene a los botones y textfields

	this.FuncionLecturaPorCodigo 	= 'BuscarPorCodigo'				// Nombre de la funcion a la que se llama cuando se cambia el campo codigo para la lectura del registro. Recibe
																	// como parametro el contenido del campo codigo.
	this.itemId						= 0;							// En las busquedas por codigo guaramos aca el id del registro.
	this.item						= null;							// Item al que corersponde la entidad. Es optativo
	this.GetFiltrosPreseleccionados	= function () {return null;};	// Funcion que se ejecuta al momento de abrir la ventana de busqueda y que devuelve los filtros preseleccionados pasados al listado.
	this.parametrosAdicionales		= [];							// Parametros adicionales que van a ser pasados a las funciones BuscarPorCodigo y BuscarPorId.

	// ---- Setters

	this.SetModal = function (valor) {
		this.EsModal = valor;
	}

	this.SetMaximizado = function (valor) {
		this.EsMaximizado = valor;
	}

	this.SetMaximizable = function (valor) {
		this.EsMaximizable = valor;
	}

	this.SetClaseModelo = function (clase) {
		this.ClaseModelo = clase;
	}

	this.SetFuncionLecturaPorId = function (nombre) {
		this.FuncionLecturaPorId = nombre;
	}

	this.SetFuncionLecturaPorCodigo = function (nombre) {
		this.FuncionLecturaPorCodigo = nombre;
	}

	this.SetClaseListado = function (clase) {
		this.ClaseListado = clase;
	}

	this.SetClaseFormulario = function (clase) {
		this.ClaseFormulario = clase;
	}

	this.SetUrlBusqueda = function (url) {
		this.UrlBusqueda = url;
	}

	this.SetController = function (controller) {
		this.Controller = controller;
	}

	this.SetFiltroListado = function (fnc) {
		this.GetFiltrosPreseleccionados = fnc;
	}

	this.AgregarParametroAdicional = function (param, valor) {
		this.parametrosAdicionales[this.parametrosAdicionales.length] = {nombre: param, valor: valor};
	}

	//
	// Deshabilita todo el componente (textfields y botones)
	//
	this.Deshabilitar = function () {
		if (this.btnVer != '' && this.Controller != null) {
			this.Controller.getView ().down ("button[name='" + this.btnVer + "']").disable ();
		}

		if (this.btnBuscar != '' && this.Controller != null) {
			this.Controller.getView ().down ("button[name='" + this.btnBuscar + "']").disable ();
		}

		if (this.tbCodigo != '' && this.Controller != null) {
			this.Controller.getView ().down ("textfield[name='" + this.tbCodigo + "']").setValue ('');
			this.Controller.getView ().down ("textfield[name='" + this.tbCodigo + "']").disable ();
		}

		if (this.btnLimpiar != '' && this.Controller != null) {
			this.Controller.getView ().down ("button[name='" + this.btnLimpiar + "']").disable ();
		}
	}

	//
	// Habilita los componentes del campo de busqueda.
	//
	this.Habilitar = function () {
		if (this.btnVer != '' && this.Controller != null) {
			this.Controller.getView ().down ("button[name='" + this.btnVer + "']").enable ();
		}

		if (this.btnBuscar != '' && this.Controller != null) {
			this.Controller.getView ().down ("button[name='" + this.btnBuscar + "']").enable ();
		}

		if (this.tbCodigo != '' && this.Controller != null) {
			this.Controller.getView ().down ("textfield[name='" + this.tbCodigo + "']").enable ();
		}

		if (this.btnLimpiar != '' && this.Controller != null) {
			this.Controller.getView ().down ("button[name='" + this.btnLimpiar + "']").enable ();
		}
	}

	//
	// Deshabilita los eventos que permiten modificar el contenido del control.
	//
	this.SetReadOnly = function () {
		if (this.btnBuscar != '' && this.Controller != null) {
			this.Controller.getView ().down ("button[name='" + this.btnBuscar + "']").disable ();
		}

		if (this.tbCodigo != '' && this.Controller != null) {
			this.Controller.getView ().down ("textfield[name='" + this.tbCodigo + "']").disable ();
		}
	}

	//
	// Registramos el boton que permite ver un registro seleccionado en el formulario de edicion.
	//
	this.SetBtnVerRegistro = function (nombreBtnVer) {
		var btnVer = this.Controller.getView ().down ("button[name='" + nombreBtnVer + "']");

		this.btnVer = nombreBtnVer;
		btnVer.on ("click", this.onBtnVerClick, this);
	}

	//
	// Registramos el boton que permite ver un registro seleccionado en el formulario de edicion.
	//
	this.SetBtnLimpiar = function (nombre) {
		var btnLimpiar = this.Controller.getView ().down ("button[name='" + nombre + "']");

		this.btnLimpiar = nombre;
		btnLimpiar.on ("click", this.onBtnLimpiar, this);
	}

	//
	// Registramos el textfield que contiene el codigo y le agregamos los event handlers
	//
	this.SetTextFieldCodigo = function (nombreTbCodigo) {
		var tbCodigo = this.Controller.getView ().down ("textfield[name='" + nombreTbCodigo + "']");

		this.tbCodigo = nombreTbCodigo;
		tbCodigo.on ("specialkey", this.onTbCodigoSpecialKey, this);

		// Usa el metodo tbChagneToUpperCase del formulario o Listado
		tbCodigo.on ("change", this.Controller.tbChangeToUpperCase, this.Controller);
	}

	//
	// Registramos el boton de busqueda y le agregamos el evenhandler.
	//
	this.SetBtnBuscar = function (nombreBtnBuscar) {
		var btnBuscar = this.Controller.getView ().down ("button[name='" + nombreBtnBuscar + "']");

		this.btnBuscar = nombreBtnBuscar;
		btnBuscar.on ("click", this.onBtnBuscarClick, this);
	}

	// ---- Metodos Publicos

	//
	// Recibe el objeto que contiene los datos (como si se hubiera hecho una llamada remota)
	// y carga los datos llamando al evento onRegistroSeleccionadoOk().
	// De esta forma reutilizamos el manejador del evento qeu hace la asignacion de los valores leidos.
	// Para eso, como lo que recibimos en estos casos no es un modelo JS implementamos la funcion get ()
	// para que haga lo mismo que get () en los modelos de JS.
	//
	this.CargarComponente = function (rec) {
		if (rec != undefined) {
			rec.get = function (nombre) {
				return this[nombre];
			};

			this.onRegistroSeleccionadoOk (rec, true);
		}
	}

	this.Limpiar = function () {
		this.itemId = 0;
		this.onRegistroSeleccionadoError ();
	}

	this.BuscarPorId = function (id, readOnly) {
		if (readOnly == true) {
			this.SetReadOnly ();
		}

		this.BuscarPorFuncion (id, this.FuncionLecturaPorId);
	}

	//
	// Solo hacemos la busqueda si el valor pasado es distinto de ''. De lo contrario limpiamos el control.
	//
	this.BuscarPorCodigo = function (valor) {
		if (valor == '') {
			this.RegistroSeleccionadoError ();
		} else {
			this.BuscarPorFuncion (valor, this.FuncionLecturaPorCodigo);
		}
	}

	this.AbrirVentanaBusqueda = function () {
		var frm = Ext.create (this.ClaseListado, {});
		var me = this, comp, win;

		frm.paramsEntrada = ManejadorDeVentanas.ReqListadoWS (this.EsMaximizable, this.EsMaximizado, null, ModoEjecucionListado.SeleccionIndividual, true, true, this.GetFiltrosPreseleccionados ());
		comp = frm.getController ().GetComponenteFoco ();

		win = Ext.create('Ext.window.Window', {
			title		: 'Seleccionar Elemento',
			height		: frm.controller.params.altoVentana,
			width		: frm.controller.params.anchoVentana,
			modal		: this.EsModal,
			maximizable	: this.EsMaximizable,
			maximized	: this.Maximizado,
			collapsible	: false,
			resizable	: true,
			layout		: 'fit',
			defaultFocus: comp,
			listeners: {
				close: function () {
					me.ProcesarRespuesta (frm.datosRetorno);
				}
			}
		});

		win.add (frm);
		win.show ();
	}

	//
	// Abre una ventana con el formulario que edita el registro seleccionado (si es que hay alguno).
	// Al cerrar el formulario recarga el contenido del componente.
	//
	this.AbrirVentanaFormulario = function () {
		var me = this;
		var obj = {
			ObjetoContenedor: me,
			AlCerrarVentanaFormulario: function () {
				me.BuscarPorId (me.itemId);
			}
		};

		if (this.itemId != 0) {
			ManejadorDeVentanas.AbrirFormularioEdicion (this.ClaseFormulario, this.itemId, true, obj);
		}
	}

	// ---- Metodos Privados

	/**
	 *
	 * Recibe un registro como respuesta del listado. El registro contiene el id del modelo que hay
	 * que leer. Con ese id lee el modelo que corresponde.
	 *
	 * @param	param Es el registro que devuelve el listado. Tenemos que mandar a leer otro por que este puede estar incompleto
	 *
	 */
	this.ProcesarRespuesta = function (param) {
		if (param.itemsSeleccionados.length > 0) {
			this.BuscarPorFuncion (param.itemsSeleccionados[0].get ('id'), this.FuncionLecturaPorId);
		}
	}

	this.BuscarPorFuncion = function (codigo, nombre_funcion) {
		var store;
		var me = this;
		var p = {};
		var ret_val, i;
		var nombre_param;
		var valor_param;

		if (codigo) {
			store = Ext.create('Ext.data.Store', {
				model: me.ClaseModelo,
				proxy: {
					type: 'ajax',
					url: me.UrlBusqueda,
					reader: {
						type: 'json',
						rootProperty: 'root',
						messageProperty: 'message'
					}
				},
				autoLoad: false
			});

			p['codigo'] = codigo;
			p['f'] = nombre_funcion;

			// Agregamos los parametros adicionales si es que hay
			for (i = 0; i < this.parametrosAdicionales.length; i++) {
				nombre_param = this.parametrosAdicionales[i].nombre;
				valor_param = this.parametrosAdicionales[i].valor;

				p[nombre_param] = valor_param;
			}

			store.load ({
				params: p,
				callback: function (r, opt, ok) {
					if (ok) {
						me.onRegistroSeleccionadoOk (store.first (), false);

					} else {
						ret_val = me.RegistroSeleccionadoError ();
						if (ret_val == null) {
							var resp = Ext.decode (opt.getResponse ().responseText);

							Ext.Msg.alert('Error', resp.message);
						}
					}
				}
			});
		}
	}

	// ---- Eventos

	this.onBtnBuscarClick = function () {
		this.AbrirVentanaBusqueda ();
	},

	this.onTbCodigoSpecialKey = function (f, e) {
    	if (e.getKey () == e.ENTER || e.getKey () == e.TAB) {
    		this.BuscarPorCodigo (f.value);
    	}
	}

	this.onBtnVerClick = function () {
		this.AbrirVentanaFormulario ();
	}

	this.onBtnLimpiar = function () {
		this.itemId = 0;
		this.onRegistroSeleccionadoError ();
	}

	//
	// Esta funcion se ejecuta en caso de que el codigo ingresado o el registro seleccionado sean erroneos.
	// Setea el id interno en cero y llama al evenHandler.
	//
	this.RegistroSeleccionadoError = function () {
		this.itemId = 0;
		return this.onRegistroSeleccionadoError ();
	}

	// Parametros:
	//	rec			: registro con los datos para cargar.
	//	es_carga 	: si es true indica que viene de una llamada a CargarComponente (), de lo contrario viene de haber ejecuta una funcion de busqueda.
	//
	this.onRegistroSeleccionadoOk = function (rec, es_carga) {
		console.log ('Error metodo no implementado: onRegistroSeleccionadoOk ()');
	}

	/**
	 *
	 * Esta funcion debe implementarse del lado del usuario en caso de querer realizar
	 * alguna accion si la consulta por codigo no devuelve ningun registro.
	 *
	 * @return	Debe devolver null o un mensaje de error que se mostrara en una ventana de alert.
	 * Si devuelve null se muestra el mensaje por default.
	 */

	this.onRegistroSeleccionadoError = function () {
		this.itemId = 0;
		return null;
	}
}
