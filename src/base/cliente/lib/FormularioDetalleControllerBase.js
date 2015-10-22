var FormularioDetalleControllerBase = {
 	//
 	// Hace el procesamiento necesario a la instancia pasada por parametro para dejarla funcional, le agrega las caracteristicas generales.
 	//	- Agrega los objetos paramsEntrada y datosRetorno al formulario
 	//	- Agrega las funciones base (a modo de herencia) en la instancia.
 	//	- Llama a un metodo (que debe estar implementado en la instancia) que se encarga de setear algunos parametros
 	// 	  como el ancho y alto sujerido para la ventana contenedora del form.
 	//	- Llama al metodo CargarComponentes () para cargar en ctl los atajos a los controles del formulario.
 	//
	InyectarDependencia: function (controller, nombreEntidad, nombre_entidad_permisos) {
		Ext.apply (controller, {
					permisos: null,
					params: {
						modeloEntidad 	: nombreEntidad,	// Nombre de la clase correspondiente al modelo que se va a editar en el formulario.
						nombreEntidad	: '',				// Nombre de la entidad que se va a editar en este formulario. Es el nombre que se muestra en el titulo de la ventana
						anchoVentana	: 0,				// Ancho por default de este tipo de formularios.
						altoVentana		: 0					// Alto por default de este tipo de formularios.
					},
					ctl: {},								// Listado de atajos a los controles del formulario.
					registro : null							// Se usa para guardar el registro asociado al formulario. Es privado del formulario.
		});

		Ext.apply (controller.getView (), {
				paramsEntrada: {
					modelo: null							// Instancia del modelo a editar.
				},

				datosRetorno: {
					modelo: null,							// Instancia del modelo devuelta.
					accion:null								// Tipo de accion realizada sobre el modelo. Es del tipo AccionRetorno
				}
		});

		// Asignamos los permisos de la entidad que corresponden a la pantalla.
		controller.permisos = sesionUsuario.GetPermiso (nombre_entidad_permisos);
		controller.esNuevo = false;

		// Asignamos los metodos estandar.
		ControllerBase.InyectarDependencia (controller);

		controller.onRender 						= this.onRender;
		controller.onBtnBorrarClick					= this.onBtnBorrarClick;
		controller.onBtnGuardarClick				= this.onBtnGuardarClick;
		controller.IntentarCerrarVentanaContenedora	= this.IntentarCerrarVentanaContenedora;
		controller.ConfigurarPantalla				= this.ConfigurarPantalla;
		controller.GetComponenteFoco				= this.GetComponenteFoco;

		controller.SetearParametrosFormulario (controller);
		controller.CargarComponentes ();
	},

//--------------------- Eventos del Formulario ---------------------

	//
	// Al mostrar el formulario.
	//
	onRender: function (me) {
		this.ConfigurarPantalla ();
	},

	//
	// Pide confirmacion para borrar, en caso afirmativo le indica al listado que debe borrar un registro del store.
	//
    onBtnBorrarClick: function (me, e, eOpts) {
    	var form, me;

    	form = this.getView ();
		me = this;

		Ext.MessageBox.confirm('Borrar', 'Esta seguro de que desea borrar el registro?', function (btn){
			if(btn === 'yes') {
				form.datosRetorno.accion = AccionRetorno.Borrar;
				form.datosRetorno.modelo = me.ObtenerRegistroDeFormulario ();

				me.IntentarCerrarVentanaContenedora ();
			}
		});
    },

	//
	// Actualiza los datos del registro con los datos modificados por el usuario.
	// Luego intenta cerrar la ventana contenedora.
	//
    onBtnGuardarClick: function (me, e, eOpts) {
    	var form = this.getView ();
    	var ret;

		if (form.isValid()) {
			if (form.paramsEntrada.modelo == null) {
				form.datosRetorno.accion = AccionRetorno.Crear;

			} else {
				form.datosRetorno.accion = AccionRetorno.Actualizar;
			}

			ret = this.ObtenerRegistroDeFormulario ();
			if (ret != null) {
				form.datosRetorno.modelo = ret;
				this.IntentarCerrarVentanaContenedora ();
			}
		}
    },

	//--------------------- Metodos ---------------------

	//
	// Devuelve el elemento del formulario que debe recibir el foco al momento de abrirse la ventana.
	// Este metodo por default devuelve el primer textfield del formulario.
	//
    GetComponenteFoco: function () {
    	return this.getView ().down (this.GetElementoFoco ());
    },

	ConfigurarPantalla: function () {
		var form;

		form = this.getView ();
		if (form.paramsEntrada.modelo == null) {
			this.esNuevo = true;
			this.CargarRegistroEnFormulario (Ext.create (this.params.modeloEntidad, {}), this.esNuevo);
			form.down ("button[name='btnBorrar']").disable ();

		} else {
			this.CargarRegistroEnFormulario (form.paramsEntrada.modelo, false);
		}
	},

	//
	// Hace la carga de un modelo pasado por parametros o crea uno nuevo.
	//
	IntentarCerrarVentanaContenedora: function () {
		var win = this.getView ().up ('window');

		if (win != null) {
			win.close ();
		}
	}

//--------------------- Metodos Virtuales ---------------------
//
// Los siguientes metodos no estan definidos en esta clase pero si son invocados desde aca,
// por eso es que deben ser definidos obligatoriamente en las clases derivadas para que no surjan
// errores en tiempo de ejecucion.
//

//
// Metodo: GetElementoFoco: function ()
//
// Devuelve el texto identificatorio (textbox[name='blah'] o 'combo', etc) del
// componente que debe recibir el foco al abrir el formulario.
//

//
// Metodo: CargarRegistroEnFormulario: function (rec, esNuevo)
//
// Asocia una instancia de un modelo con un formulario.
// Parametros:
// rec: registro leido.
// esNuevo: Indica si el registro es nuevo o no
//

//
// Metodo: ObtenerRegistroDeFormulario: function ()
//
// El metodo debe retornar un registro con los parametros actualizados
// segun los cambios que fueron hechos por el usuario en el formulario.
//

//
// Metodo: SetearParametrosFormulario: function (ctl)
//
// El metodo recibe como parametro un objeto con las siguientes propiedades que deben ser seteadas:
// 	- anchoVentana
// 	- altoVentana
//

//
// Metodo: CargarComponentes ()
//
// Este metodo debe cargar en el objeto this.ctl los componentes visuales del formulario como
// tbNombre, cbPais, etc. para que puedan ser utilizados facilmente desde el controller.
// Ademas se pueden realizar aca las inicializaciones que sean necesarias.
//
 }
