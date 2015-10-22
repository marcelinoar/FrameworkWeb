/***************************************************************************************************
 *
 * Archivo: ListadoControllerBase2.js
 * ------------------------------------------------------------------------------------------------
 *
 * Autor: Marcelino Morales
 *
 * Version: 1.0
 *
 * Descripcion: Clase base que contiene las funcionalidades estandar de las pantallas de listado.
 *
 ***************************************************************************************************/

/*
 * Parametros:
 *
 * - comboFiltrosUrl		: Url al script que genera los listados de los combos.
 * - nuevaEntidad			: Tipo de entidad nueva a crear.
 * - editarEntidad			: Tipo de entidad a actualizar.
 * - xtypeListado			: Xtype del listado
 * - ventanaMaximizable		: Permite que la ventana sea maximizable.
 * - ventanaMaximized		: Abre la ventana maximizada.
 * - ventanaModal			: Abre las ventanas de edicion en forma modal. De lo contrario permite que se minimize y que se mantengan abiertas varias ventanas al mismo tiempo.
 */

var ListadoControllerBase2 = {
	//
	// Agrega las funciones de esta clase al controller pasado por parametro y tambien
	// las propiedades paramsEntrada y datosRetorno de la vista.
	//
	InyectarDependencia: function (controller, nombre_entidad_permisos) {
		// Cargamos store_params como un atributo del objeto, no de la clase.
		Ext.apply (controller, {
			permisos: null,
			store_params: {},
			ctl: {},
			filtros:{},
			params: null			// Va a pisar el actual objeto que se llama params por uno que no este compartido por todas las instancias de la clase.
		});

		Ext.apply (controller.getView (), {
			paramsEntrada	: {
				modoEjecucion	: null,
				verColEditar	: null,
				verColBorrar	: null
			},

			datosRetorno	: {
				itemsSeleccionados: []
			}
		});

		// Asignamos los permisos de la entidad que corresponden a la pantalla.
		controller.permisos = sesionUsuario.GetPermiso (nombre_entidad_permisos);

		// Agregamos los metodos estandar
		ControllerBase.InyectarDependencia (controller);

		controller.filtros = new Array ();

		controller.onBtnLimpiarFiltrosClick			= this.onBtnLimpiarFiltrosClick;
		controller.onBtnAceptarClick 				= this.onBtnAceptarClick;
		controller.onBtnCancelarClick 				= this.onBtnCancelarClick;
		controller.onRender							= this.onRender;
		controller.onBtnBuscarClick					= this.onBtnBuscarClick;
		controller.onEditarRegistroGrilla			= this.onEditarRegistroGrilla;
		controller.onBorrarRegistroGrilla			= this.onBorrarRegistroGrilla;
		controller.onBtnRecargarListadoClick		= this.onBtnRecargarListadoClick;
		controller.onBtnNuevoClick					= this.onBtnNuevoClick;
		controller.onListadoGrillaCellDblClick		= this.onListadoGrillaCellDblClick;
		controller.AgregarItemsSeleccionados		= this.AgregarItemsSeleccionados;
		controller.ConfigurarModoVista				= this.ConfigurarModoVista;
		controller.ConfigurarModoSeleccion			= this.ConfigurarModoSeleccion;
		controller.ConfigurarModoSeleccionIndividual= this.ConfigurarModoSeleccionIndividual;
		controller.RefrescarGrilla					= this.RefrescarGrilla;
		controller.RefrescarFiltros					= this.RefrescarFiltros;
		controller.ConfigurarPantalla				= this.ConfigurarPantalla;
		controller.SetDatoSalida					= this.SetDatoSalida;
		controller.IntentarCerrarVentanaContenedora	= this.IntentarCerrarVentanaContenedora;
		controller.GetComponenteFoco				= this.GetComponenteFoco;
		controller.AplicarParametrosDeEntrada		= this.AplicarParametrosDeEntrada;
		controller.InicializarListado				= this.InicializarListado;
		controller.SeleccionarItemIndividual		= this.SeleccionarItemIndividual;
		controller.EditarRegistro					= this.EditarRegistro;
		controller.onFilterTextoBlur				= this.onFilterTextoBlur;
		controller.onFilterTextoSpecialKey			= this.onFilterTextoSpecialKey;
		controller.AplicarConfiguracionDeSeguridad	= this.AplicarConfiguracionDeSeguridad;
		controller.AgregarFiltro					= this.AgregarFiltro;
		controller.LimpiarFiltros					= this.LimpiarFiltros;
		controller.CrearStoreGrilla					= this.CrearStoreGrilla;
		controller.CargarFiltrosPreseleccionados	= this.CargarFiltrosPreseleccionados;
		controller.onGenerarListadoExcel			= this.onGenerarListadoExcel;
		controller.onGenerarListadoPdf				= this.onGenerarListadoPdf;
	},

//--------------------- EventHandlers ---------------------

	onGenerarListadoPdf: function () {
		var i = 0;
		var ret = {}, str = '';

		for (i = 0; i < this.filtros.length; i++) {
			this.filtros[i].AgregarParametros (ret);
		}

		for (property in ret) {
			str += '&' + property + '=' + ret[property];
		}

		window.open(this.params.formularioController + '?f=GenerarListadoPdf' + str, 'Descargar');
	},

	onGenerarListadoExcel: function () {
		var i = 0;
		var ret = {}, str = '';

		for (i = 0; i < this.filtros.length; i++) {
			this.filtros[i].AgregarParametros (ret);
		}

		for (property in ret) {
			str += '&' + property + '=' + ret[property];
		}

		window.location = this.params.formularioController + '?f=GenerarListadoExcel' + str;
	},

	//
	// Devuelve un array con los ids de los items seleccionados en la grilla y cierra la ventana
	//
	onBtnAceptarClick: function () {
		var store = this.getView ().down ("grid").getStore ();
		var listado = Array ();

		store.each (function (rec, idx) {
			if (rec.get ('seleccion') == true) {
				listado.push (rec);
			}
		});

		this.SetDatoSalida  ('itemsSeleccionados', listado);
		this.SetDatoSalida  ('accion', AccionRetorno.Guardar);

		this.IntentarCerrarVentanaContenedora ();
	},

	//
	// Devuelve como resultado un array vacio y cierra la ventana.
	//
	onBtnCancelarClick: function () {
		this.SetDatoSalida  ('itemsSeleccionados', []);
		this.IntentarCerrarVentanaContenedora ();
	},

	//
	// Carga la configuracion inicial del programa.
	//
	onRender: function () {
		this.InicializarListado ();
	},

	//
	// Actualiza el store de la grilla al realizar una busqueda por texto.
	//
	onBtnBuscarClick: function () {
		this.RefrescarGrilla ();
	},

	//
	// Abre el abm para editar el item seleccionado en la grilla.
	//
	onEditarRegistroGrilla: function (grid, rowIndex, colIndex) {
		var item = grid.getStore ().getAt (rowIndex);

		this.EditarRegistro (item);
	},
	//
	// Abre el ABM al hacer click en el boton para crear uno nuevo.
	//
	onBtnNuevoClick: function() {
		var me = this;
		var frm = Ext.create (this.params.nuevaEntidad, {});
		frm.paramsEntrada = me.GetOnNuevoParamsEntrada (me.getView().paramsEntrada);

		var comp = frm.getController ().GetComponenteFoco ();
		var win = Ext.create('Ext.window.Window', {
			title		: frm.controller.params.nombreEntidad + ': ' + 'Crear',
			height		: frm.controller.params.altoVentana,
			width		: frm.controller.params.anchoVentana,
			modal		: this.params.ventanaModal,
			maximizable	: this.params.ventanaMaximizable,
			maximized	: this.params.ventanaMaximized,
			collapsible	: !this.params.ventanaModal,
			resizable	: false,
			layout		: 'fit',
			defaultFocus: comp,
			listeners: {
				close: function () {
					// Chequeamos que la grilla todavia exista.
					if (me.getView () != null) {
						me.AgregarItemsSeleccionados (frm.datosRetorno, function () {
							me.RefrescarGrilla ();
							me.RefrescarFiltros ();
						});
					}

					this.remove (frm);
				}
			}
		});

		win.add (frm);
		win.show ();
	},

	//
	// Permite borrar un elemento de la grilla al hacer click en la columna de borrar.
	//
	onBorrarRegistroGrilla: function(grid, rowIndex, colIndex) {
		var me = this;

		Ext.MessageBox.confirm('Borrar', 'Esta seguro de que desea borrar el registro?', function(btn){
			if(btn === 'yes'){
				grid.getStore ().getAt (rowIndex).erase ({
					success: function () {
						me.RefrescarGrilla ();
						me.RefrescarFiltros ();
					}
				});
			}
		});
	},

	//
	// Recarga los datos de la grilla al hacer click en el boton de refrescar.
	//
	onBtnRecargarListadoClick: function () {
		this.RefrescarGrilla ();
	},

	//
	// Se dispara cuando se hace doble click sobre una celda de la grilla.
	//
	onListadoGrillaCellDblClick: function(grid, rowIndex, colIndex, store, row) {
		this.SeleccionarItemIndividual (grid.getRecord (row));
	},

	//
	// Limpia el contenido de los filtros.
	//
	onBtnLimpiarFiltrosClick: function () {
		this.LimpiarFiltros ();
	},

//--------------------- Metodos Privados ---------------------

	//
	// Agrega un filtro manejado por el controller al listado.
	//
	AgregarFiltro: function (filtro) {
		this.filtros.push (filtro);
	},

	//
	// Si estamos ejecutando el listado en modo SeleccionIndividual entonces devolvemos
	// el registro seleccionado como si fuera una seleccion de un solo item.
	// En el otro caso abre la ventana de edicion.
	//
	SeleccionarItemIndividual: function (rec) {
		var listado = Array ();

		if (this.params.modoEjecucion == ModoEjecucionListado.SeleccionIndividual) {
			listado.push (rec);

			this.SetDatoSalida  ('itemsSeleccionados', listado);
			this.SetDatoSalida  ('accion', AccionRetorno.Guardar);

			this.IntentarCerrarVentanaContenedora ();

		} else {
			this.EditarRegistro (rec);
		}
	},

	//
	// Abre una ventana para editar el registro pasado como parametro en el abm correspondiente.
	//
	EditarRegistro: function (reg) {
		if (this.permisos.verRegistro) {
			var me = this, comp;
			var frm = Ext.create (this.params.editarEntidad, {});

			frm.paramsEntrada = me.GetOnEditarParamsEntrada (reg, me.getView ().paramsEntrada);
			comp = frm.getController ().GetComponenteFoco ();

			var win = Ext.create('Ext.window.Window', {
				title		: frm.controller.params.nombreEntidad + ': ' + 'Editar',
				height		: frm.controller.params.altoVentana,
				width		: frm.controller.params.anchoVentana,
				modal		: this.params.ventanaModal,
				maximizable	: this.params.ventanaMaximizable,
				maximized	: this.params.ventanaMaximized,
				collapsible	: !this.params.ventanaModal,
				resizable	: false,
				defaultFocus: comp,
				layout		: 'fit',
				listeners: {
					close: function () {
						this.remove (frm);
						// Chequeamos que la grilla todavia exista, si es asi refrescamos su contenido.
						if (me.getView () != null) {
							me.RefrescarGrilla ();
							me.RefrescarFiltros ();
						}
					}
				}
			});

			win.add (frm);
			win.show ();
		}
	},

	//
	// Devuelve el elemento del formulario que debe recibir el foco al momento de abrirse la ventana.
	// Este metodo por default devuelve el primer textfield del formulario.
	//
    GetComponenteFoco: function () {
    	return this.getView ().down ("button[name='btnNuevo']");
    },

	//
	// Guarda los items seleccionados al abrir la ventana pop-up
	// Llama a la funcion callback una vez guardados los items.
	// Los guarda uno por uno. Ver esto, por que habria que cambiarlo y hacer que se guarden de una sola vez.
	//
	AgregarItemsSeleccionados: function (datos_retorno, callback) {
		var params_entrada = this.getView ().paramsEntrada;

		if (datos_retorno.itemsSeleccionados != null) {
			for (var i = 0; i < datos_retorno.itemsSeleccionados.length; i++) {
				this.GuardarItemSeleccionado (datos_retorno.itemsSeleccionados[i], params_entrada);
			}
		}

		callback ();
	},

	//
	// Cambia la configuracion de la pantalla para modo Vista.
	//
	ConfigurarModoVista: function () {
		var ctl;

		this.getView ().down ("button[name='btnCancelar']").hide ();
		this.getView ().down ("button[name='btnAceptar']").hide ();

		ctl = this.getView ().down ("checkcolumn[name='colSeleccion']");
		if (ctl != null) {
			ctl.hide ();
		}

		ctl = this.getView ().down ("actioncolumn[name='colEditar']");
		if (ctl != null) {
			ctl.hide ();
		}
	},

	//
	// Cambia la configuracion de la pantalla para modo Seleccion Multiple.
	//
	ConfigurarModoSeleccion: function () {
		this.getView ().down ("button[name='btnExportar']").hide ();
		ctl = this.getView ().down ("actioncolumn[name='colEditar']");
		if (ctl != null) {
			ctl.hide ();
		}
	},

	//
	// Configura el listado en modo SeleccionIndividual.
	//
	ConfigurarModoSeleccionIndividual: function () {
		this.getView ().down ("button[name='btnCancelar']").hide ();
		this.getView ().down ("button[name='btnAceptar']").hide ();
		ctl = this.getView ().down ("checkcolumn[name='colSeleccion']");
		if (ctl != null) {
			ctl.hide ();
		}
	},

	//
	// Refresca el store de la grilla teniendo encuenta los filtros cargados.
	//
	RefrescarGrilla: function (load_params) {
		var i = 0;
		var ret = {};

		for (i = 0; i < this.filtros.length; i++) {
			this.filtros[i].AgregarParametros (ret);
		}

		// Con esto logramos que los valores asignados a los filtros se preserven y al hacer click en el boton refrescar de la barra se mantenga la misma busqueda.
		//this.getView ().down ("grid").store.load ({params:ret});
		this.getView ().down ("grid").store.proxy.extraParams = ret;
		this.getView ().down ("grid").store.load ();
	},

	//
	// Recorre todos los filtros cargados y los refresca.
	//
	RefrescarFiltros: function () {
		var i = 0;

		for (i = 0; i < this.filtros.length; i++) {
			this.filtros[i].Refrescar ();
		}
	},

	//
	// Recorre todos los filtros cargados y los limpia.
	//
	LimpiarFiltros: function () {
		var i = 0;

		for (i = 0; i < this.filtros.length; i++) {
			this.filtros[i].Limpiar ();
		}
	},

	//
	// Esto es lo primero que hay que hacerle a una grilla. Creamos el store que va a usar y se lo asociamos.
	//
	CrearStoreGrilla: function () {
		var st = Ext.create (this.params.storeGrilla, {autoDestroy:true});
		var grilla = this.getView ().down ('grid');
		var paging = this.getView ().down ('pagingtoolbar');

		grilla.reconfigure (st);

		// Si la grilla tiene habilitado el plugin de paginado asociamos el
		// store de la grilla con el del plugin.
		if (paging != null) {
			paging.bindStore (st);
		}
	},

	//
	// Inicializa los parametros del listado y configura la pantalla.
	//
	InicializarListado: function () {
		this.AplicarParametrosDeEntrada (this.getView ().paramsEntrada, this.params);
		this.CrearStoreGrilla ();
		this.SetupFiltros ();
		this.ConfigurarPantalla ();
		this.RefrescarGrilla ();
	},

	//
	// Pisa los valores de params con los de ParamsEntrada si estos no son nulos.
	//
	AplicarParametrosDeEntrada: function (paramsEntrada, params) {
		if (paramsEntrada.modoEjecucion != null) {
			params.modoEjecucion = paramsEntrada.modoEjecucion;
		}

		if (paramsEntrada.verColEditar != null) {
			params.verColEditar = paramsEntrada.verColEditar;
		}

		if (paramsEntrada.verColBorrar != null) {
			params.verColBorrar = paramsEntrada.verColBorrar;
		}
	},

	//
	// Configura la pantalla en funcion de los parametros del sistema.
	//
	ConfigurarPantalla: function () {
		switch (this.params.modoEjecucion) {
			case ModoEjecucionListado.SeleccionIndividual:
				this.ConfigurarModoSeleccionIndividual ();
				break;

			case ModoEjecucionListado.Seleccion:
				this.ConfigurarModoSeleccion ();
				break;

			default:
				this.ConfigurarModoVista ();
				break;
		}

		if (!this.params.verColEditar) {
			ctl = this.getView ().down ("checkcolumn[name='colEditar']");
			if (ctl != null) {
				ctl.hide ();
			}
		}

		if (!this.params.verColBorrar) {
			ctl = this.getView ().down ("checkcolumn[name='colBorrar']");
			if (ctl != null) {
				ctl.hide ();
			}
		}

		this.AplicarConfiguracionDeSeguridad ();

		// Si en la llamada al listado se pasaron valores de filtros preseleccionados se
		// cargan aca.
		this.CargarFiltrosPreseleccionados ();
	},

	//
	// Toma los parametros recibidos por el formulario y
	// los pasa a los filtros que correspondan.
	//
	CargarFiltrosPreseleccionados: function () {
		var i = 0, j = 0;
		var p = this.getView ().paramsEntrada

		if (p.filtrosPreseleccionados != null) {
			//
			// Si encuentra el control de filtro dentro de los que recibio como preseleccionados
			// entonces lo configura con los parametros recibidos.
			//
			for (i = 0; i < this.filtros.length; i++) {
				for (j = 0; j < p.filtrosPreseleccionados.length; j++) {
					if (this.filtros[i].Nombre == p.filtrosPreseleccionados[j].nombre) {
						this.filtros[i].PreSeleccionar (p.filtrosPreseleccionados[j].params);
					}
				}
			}
		}
	},

	//
	// Esta funcion aplica la configuracion de seguridad asociada a la entidad.
	//
	// Aplica las restricciones de:
	//	- Crear Registro: 	Deshabilita el boton de crear nuevo registro
	//	- Borrar Registro: 	Oculta la columna de botones de borrar
	//	- Ver Registro:		Deshabilita la apertura del formulario de edicion
	//
	AplicarConfiguracionDeSeguridad: function () {
		if (this.getView ().down ("button[name='btnNuevo']") != null) {
			this.getView ().down ("button[name='btnNuevo']").setDisabled (!this.permisos.crear);
		}

		if (!this.permisos.borrar) {
			ctl = this.getView ().down ("checkcolumn[name='colBorrar']");
			if (ctl != null) {
				ctl.hide ();
			}
		}

		if (!this.permisos.verRegistro) {
			this.onEditarRegistroGrilla = function () {};
		}
	},

	//
	// Hace la carga de un modelo pasado por parametros o crea uno nuevo.
	//
	IntentarCerrarVentanaContenedora: function () {
    	var f2 = this.getView ();

		var win = f2.up ('window');
		if (win != null) {
			win.close ();
		}
	},

	//
	// Establece el valor de un parametro de salida.
	//
	SetDatoSalida: function (nombre, valor) {
		this.getView ().datosRetorno[nombre] = valor;
	},

	//
	// Metodo vacio establecido por default.
	//
	GuardarItemSeleccionado: function (item_id, params_entrada) {
	},

//--------------------- Metodos Virtuales ---------------------
//
// Los siguientes metodos no estan definidos en esta clase pero si son invocados desde aca,
// por eso es que deben ser definidos obligatoriamente en las clases derivadas para que no surjan
// errores en tiempo de ejecucion.
//

//
// Metodo: GetOnNuevoParamsEntrada: function (params)
//
// Este metodo arma el objeto paramsEntrada pasado al formulario/listado que crea un nuevo y lo devuelve como retorno.
// 	- params: paramsEntrada del listado.
//

//
// Metodo: GetOnEditarParamsEntrada: function (item, params)
//
// Este metodo arma el objeto paramsEntrada pasado al formulario que edita una entidad del listado y lo devuelve como retorno.
// - item	: registro a editar.
// - params	: paramsEntrada de este listado.
//
}
