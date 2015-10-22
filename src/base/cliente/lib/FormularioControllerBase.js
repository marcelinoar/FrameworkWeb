 /**************************************************************************************************
  * Archivo: FormularioControllerBase.js
  * ------------------------------------------------------------------------------------------------
  * Version: 1.0
  * Descripcion: Este archivo contiene la clase FormularioControllerBase que maneja las funcionalidades
  *				estandar de los formularios WS.
  * Modificaciones:
  *	-
  *
  **************************************************************************************************/

 var FormularioControllerBase = {
 	//
 	// Hace el procesamiento necesario a la instancia pasada por parametro para dejarla funcional, le agrega las caracteristicas generales.
 	// 	- Agrega los objetos params y ctl del controller.
 	//	- Agrega los objetos paramsEntrada y datosRetorno al formulario
 	//	- Agrega las funciones base (a modo de herencia) en la instancia.
 	//	- Llama a un metodo (que debe estar implementado en la instancia) que se encarga de setear algunos parametros
 	// 	  como el ancho y alto sujerido para la ventana contenedora del form.
 	//
	InyectarDependencia: function (controller, nombreEntidad, nombre_entidad_permisos) {
    	//
    	// Cargamos estos atributos del controller de esta manera para que queden ligados a la instancia
    	// de la clase y no se compartan entre varias instancias.
    	//

		Ext.apply (controller, {
			permisos : null,							// Permisos sobre la entidad que edita la pantalla
			params: {
				modeloEntidad 		: nombreEntidad,	// Clase de la entidad asociada al formulario.
				nombreEntidad		: '',				// Nombre de la entidad que se va a editar en este formulario. Es el nombre que se muestra en el titulo de la ventana
				anchoVentana		: 0,				// Este dato debe ser pisado por el formulario. Ancho sujerido para la ventana que contiene el formulario.
				altoVentana			: 0					// Este dato debe ser pisado por el formulario. Alto sujerido para la ventana que contiene el formulario.
			},
			ctl: {},									// Contiene los controles pertenecientes al formulario.
			registro : null,							// Se usa para guardar el registro asociado al formulario. Es privado del formulario.
			detalleModificado : false					// Indica si algun item del detalle fue modificado. (Los detalles no son capaces de marcar como dirty al objeto, entonces hay que emularlo de esta manera)
		});

		Ext.apply (controller.getView (), {
			paramsEntrada	: {
				permisos: null,								// Permisos asociados a la entidad relacionada con el formulario.
				modeloId: null								// Id del modelo a ser editado. Null indica que se creara uno nuevo.
			},

			datosRetorno	: {
			}
		});

		// Asignamos los permisos de la entidad que corresponden a la pantalla.
		controller.permisos = sesionUsuario.GetPermiso (nombre_entidad_permisos);
		controller.esNuevo = false;

		// Asignamos los metodos estandar.
		ControllerBase.InyectarDependencia (controller);

		this.semaforo = new Semaforo ();
		controller.semaforo 						= this.semaforo;
		controller.onRender 						= this.onRender;
		controller.onBtnBorrarClick					= this.onBtnBorrarClick;
		controller.onBtnGuardarClick				= this.onBtnGuardarClick;
		controller.IntentarCerrarVentanaContenedora	= this.IntentarCerrarVentanaContenedora;
		controller.ConfigurarPantalla				= this.ConfigurarPantalla;
		controller.GetComponenteFoco				= this.GetComponenteFoco;
		controller.SetDetalleModificado				= this.SetDetalleModificado;
		controller.ChequearValorAsinc				= this.ChequearValorAsinc;
		controller.AplicarConfiguracionDeSeguridad	= this.AplicarConfiguracionDeSeguridad;
		controller.RefrescarGrilla					= this.RefrescarGrilla;
		controller.RecargarFormulario				= this.RecargarFormulario;

		controller.SetearParametrosFormulario (controller);
		controller.CargarComponentes ();
	},

//--------------------- EventHandlers ---------------------

	//
	// Al mostrar el formulario.
	//
	onRender: function (me) {
		this.ConfigurarPantalla ();
	},

	//
	// Borra un registro.
	//
    onBtnBorrarClick: function (me, e, eOpts) {
    	var me = this;

		Ext.MessageBox.confirm('Borrar', 'Esta seguro de que desea borrar el registro?', function (btn){
			if(btn === 'yes') {
				me.ObtenerRegistroDeFormulario ().erase ({
					success: function (rec, op) {
						me.IntentarCerrarVentanaContenedora ();
					},
					failure: function (rec, op) {
						Ext.Msg.alert('Error', op.request.getScope ().reader.rawData.message);
					}
				});
			}
		});
    },

	//
	// Guarda el registro asociado al formulario en caso de que este haya sido modificado o se haya
	// modificado alguno de los registros de detalle asociados. Despues de esto intenta cerrar la ventana contenedora.
	//
    onBtnGuardarClick: function (me, e, eOpts) {
    	var form = this.getView ();
    	var controller = this;
    	var rec;

		if (form.isValid()) {
			rec = controller.ObtenerRegistroDeFormulario ();

			if (rec != null) {
				if (rec.dirty || this.detalleModificado) {
					rec.save ({
						success: function (rec, op) {
							controller.IntentarCerrarVentanaContenedora ();
						},
						failure: function (rec, op) {
							Ext.Msg.alert('Error', op.request.getScope ().reader.rawData.message);
						}
					});

				} else {
					controller.IntentarCerrarVentanaContenedora ();
				}
			}
		}
    },

//--------------------- Metodos Privados ---------------------

	//
	// Levanta la marca que indica que un detalle del formulario fue modificado.
	//
	SetDetalleModificado: function () {
		this.detalleModificado = true;
	},

	//
	// Devuelve el elemento del formulario que debe recibir el foco al momento de abrirse la ventana.
	//
    GetComponenteFoco: function () {
    	return this.getView ().down (this.GetElementoFoco ());
    },

	ConfigurarPantalla: function () {
		var mod, ret, me = this;
		var form = this.getView ();

		if (form.paramsEntrada.modeloId == null) {
			mod = Ext.create (this.params.modeloEntidad, {});
			me.esNuevo = true;
			me.CargarRegistroEnFormulario (mod, me.esNuevo);
			form.down ("button[name='btnBorrar']").disable ();
			ret = false;

		} else {
			mod = Ext.create (this.params.modeloEntidad, {id : form.paramsEntrada.modeloId});
			mod.load ({
				success: function () {
					me.CargarRegistroEnFormulario (mod, false);
				}
			});
			ret = true;
		}

		this.AplicarConfiguracionDeSeguridad ();

		return ret;
	},

	AplicarConfiguracionDeSeguridad: function () {
		var form = this.getView ();
		var btnGuardar = this.getView ().down ("button[name='btnGuardar']");
		var btnBorrar = this.getView ().down ("button[name='btnBorrar']");

		// Si estamos en modo edicion
		if (form.paramsEntrada.modeloId != null) {
			btnGuardar.setDisabled (!this.permisos.modificar);
			btnBorrar.setDisabled (!this.permisos.borrar);
		}
	},

	//
	// Intenta cerrar la ventana o tab que contiene al formulario
	//
	IntentarCerrarVentanaContenedora: function () {
		var win = this.getView ().up ('window');
		var tab_panel = Ext.ComponentQuery.query ("tabpanel[name='panel-central']")[0];

		// Si hay una ventana la cerramos
		if (win != null) {
			win.close ();

		// Sino buscamos el elemento dentro del tabpanel central y lo sacamos.
		} else {
			Ext.Msg.alert('Aceptar', 'Operacion realizada con exito');
			tab_panel.remove (this.getView ());
		}
	},

	//---------- Metodos Publicos ----------

	//
	// Recarga los datos del formulario.
	//
	RecargarFormulario: function () {
		var me = this;

		// Si hay un registro ya cargado (ose se estamos editando algo ya guardado)
		if (this.params.registro != null) {
			this.params.registro.load ({
				success: function(record, operation) {
					me.CargarRegistroEnFormulario (me.params.registro, false);
				}
			});
		}
	},

	//
	// este metodo solo lo creamos por compatibildad con las grillas para que al cambiar el tab (si esta abierto dentro de un tab
	// central) se pueda llamar a este metodo que no hace nada. Deberiamos cambiarle el nombre a otra cosa.
	//
	RefrescarGrilla: function () {
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
// esNuevo: indica si se esta visualizando un registro nuevo o editando uno ya existente.

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