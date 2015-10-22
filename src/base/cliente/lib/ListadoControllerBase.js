/***************************************************************************************************
 *
 * Archivo: ListadoControllerBase.js
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
 * - storeGrilla			: Nombre clompleto de la clase que representa el store de la grilla.
 * - xtypeListado			: Xtype del listado
 * - ventanaMaximizable		: Permite que la ventana sea maximizable.
 * - ventanaMaximized		: Abre la ventana maximizada.
 * - ventanaModal			: Abre las ventanas de edicion en forma modal. De lo contrario permite que se minimize y que se mantengan abiertas varias ventanas al mismo tiempo.
 */

var ListadoControllerBase = {
	//
	// Agrega las funciones de esta clase al controller pasado por parametro y tambien
	// las propiedades paramsEntrada y datosRetorno de la vista.
	//
	InyectarDependencia: function (controller, nombre_entidad_permisos) {
		// Cargamos store_params como un atributo del objeto, no de la clase.
		Ext.apply (controller, {
			permisos: null,
			store_params: {},
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

		controller.onBtnAceptarClick 				= this.onBtnAceptarClick;
		controller.onBtnCancelarClick 				= this.onBtnCancelarClick;
		controller.onRender							= this.onRender;
		controller.onFilterComboRender				= this.onFilterComboRender;
		controller.onFilterComboSelect				= this.onFilterComboSelect;
		controller.onBtnBuscarClick					= this.onBtnBuscarClick;
		controller.onBtnLimpiarFiltrosClick			= this.onBtnLimpiarFiltrosClick;
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
		controller.CargarStoreParams				= this.CargarStoreParams;
		controller.IntentarCerrarVentanaContenedora	= this.IntentarCerrarVentanaContenedora;
		controller.CargarParametrosFiltro			= this.CargarParametrosFiltro;
		controller.GetComponenteFoco				= this.GetComponenteFoco;
		controller.AplicarParametrosDeEntrada		= this.AplicarParametrosDeEntrada;
		controller.InicializarListado				= this.InicializarListado;
		controller.SeleccionarItemIndividual		= this.SeleccionarItemIndividual;
		controller.CambiarValorFiltro				= this.CambiarValorFiltro;
		controller.EditarRegistro					= this.EditarRegistro;
		controller.onGridStoreBeforeLoad			= this.onGridStoreBeforeLoad;
		controller.onFilterTextoBlur				= this.onFilterTextoBlur;
		controller.onFilterTextoSpecialKey			= this.onFilterTextoSpecialKey;
		controller.onTbBuscarSpecialKey				= this.onTbBuscarSpecialKey;
		controller.onFilterFechaChange				= this.onFilterFechaChange;
		controller.AplicarConfiguracionDeSeguridad	= this.AplicarConfiguracionDeSeguridad;
		controller.CrearStoreGrilla					= this.CrearStoreGrilla;
	},

//--------------------- EventHandlers ---------------------

	// Ver. Parece que no se usa.
	onGridStoreBeforeLoad: function (source, operation) {
		operation.params = Ext.apply(operation.params || {}, this.store_params);
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
	// Este es el evento onRender del panel que contiene a la grilla.
	// Carga la configuracion inicial del programa.
	//
	onRender: function () {
		this.InicializarListado ();
	},

	//
	// Crea un store para cada filtro y lo carga.
	//
	onFilterComboRender: function (me, opts) {
	},

	//
	// Actualiza el store de la grilla al seleccionar un filtro.
	//
	onFilterComboSelect: function (me, rec, opts) {
		this.store_params[me.filterName] = me.value;

		this.RefrescarGrilla ({start:0, page:1});
	},

	//
	// Actualiza el store de la grilla al realizar una busqueda por texto.
	//
	onBtnBuscarClick: function () {
		this.onBtnRecargarListadoClick ();
	},

	//
	// Limpia los valores de los filtros y actualiza la grilla.
	//
	onBtnLimpiarFiltrosClick: function () {
		var filtros = this.getView().query ("fieldset[name='FilterFieldSet'] combo");
		var me = this;

		// Limpia los combos
		filtros.forEach (function (item) {
			item.clearValue ();
			delete me.store_params[item.filterName];
		});

		// Limpia los filtros de fecha
		var filtros_date = this.getView().query ("fieldset[name='FilterFieldSet'] datefield");
		filtros_date.forEach (function (item) {
			item.setValue ('');
			delete me.store_params[item.filterName];
		});

		// Limpia los filtros de codigo
		var filtros_codigo = this.getView ().query ("fieldset[name='FilterFieldSet'] textfield");
		filtros_codigo.forEach (function (item) {
			item.setValue ('');
			delete me.store_params[item.filterName];
		});

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
	// Se dispara cuando se pierde el foco de un filtro del tipo texto.
	//
	onFilterTextoBlur: function (comp, val) {
		this.CambiarValorFiltro (comp.filterName, comp.getValue ());
	},

	//
	// Se dispara cuando se preciona enter o tab haciendo foco en un filtro del tipo texto.
	//
    onFilterTextoSpecialKey: function (comp, e) {
    	if (e.getKey () == e.ENTER || e.getKey () == e.TAB) {
    		this.CambiarValorFiltro (comp.filterName, comp.getValue ());
    	}
    },

	onFilterFechaChange: function (comp, val) {
		this.CambiarValorFiltro (comp.filterName, comp.getSubmitValue ());
	},

    //
    // se dispara cuando se preciona enter o tab en el campo de busqueda.
    //
    onTbBuscarSpecialKey: function () {
		this.onBtnRecargarListadoClick ();
    },

//--------------------- Metodos Privados ---------------------

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
    	return this.getView ().down ("textfield[name='tbBuscar']");
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
		this.getView ().down ("button[name='btnCancelar']").hide ();
		this.getView ().down ("button[name='btnAceptar']").hide ();
		this.getView ().down ("checkcolumn[name='colSeleccion']").hide ();
		this.getView ().down ("actioncolumn[name='colEditar']").hide ();
	},

	//
	// Cambia la configuracion de la pantalla para modo Seleccion Multiple.
	//
	ConfigurarModoSeleccion: function () {
		this.getView ().down ("button[name='btnExportar']").hide ();
		this.getView ().down ("actioncolumn[name='colEditar']").hide ();
	},

	//
	// Configura el listado en modo SeleccionIndividual.
	//
	ConfigurarModoSeleccionIndividual: function () {
		this.getView ().down ("button[name='btnCancelar']").hide ();
		this.getView ().down ("button[name='btnAceptar']").hide ();
		this.getView ().down ("checkcolumn[name='colSeleccion']").hide ();
	},

	//
	// Recarga el store de la grilla con los parametros seteados en this.store_params.
	// Recibe un objeto con parametros para pasarle al metodo load (). Esto Se usa para paginado, para
	// cuando cambio un filtro de valor y quiero que el store vuelva a una pagina valida.
	//
	RefrescarGrilla: function (load_params) {
/* DEBUG --->
		var tbBuscarValue 	= this.getView ().down ("textfield[name='tbBuscar']").getValue ();
		var cbNombreCampo	= this.getView ().down ("combo[name='cbCampos']");
		var combo_values 	= cbNombreCampo.store.data.items;


		// Siempre limpiamos de los parametros todos los filtros de busqueda, luego
		// agregamos el seleccionado si es que hay alguno seleccionado.
		for (i = 0; i < combo_values.length; i++) {
			delete this.store_params[combo_values[i].data.id_field];
		}

		if (tbBuscarValue != '') {
			this.store_params[cbNombreCampo.getValue ()] = tbBuscarValue;
		}
<-----*/
/*
		// Vamos a agregar a los filtros todos los componentes que sean del tipo datefield. En realidad
		// lo que seria mejor es poder listar los componentes que no son combos, pero parece que no se puede, asi que
		// vamos a listar por tipo.
		var filtros_datefield = this.getView ().query ("fieldset[name='FilterFieldSet'] datefield");
		for (i = 0; i < filtros_datefield.length; i++) {
			this.store_params[filtros_datefield[i].filterName] = filtros_datefield[i].getValue ();
		}
*/
		//
		// Con esto logramos que los parametros definidos en los filtros y la busqueda sean compatibles con el paginado,
		// osea que se mantengan.
		//
		this.getView ().down ("grid").store.proxy.extraParams = this.store_params;
		if (load_params != undefined) {
			this.getView ().down ("grid").store.load (load_params);

		} else {
			this.getView ().down ("grid").store.load ();
		}

		/*
		this.getView ().down ("grid").store.load ({
			params: this.store_params
		});
		*/
	},

	//
	// Recarga los stores asociados a los filtros.
	//
	RefrescarFiltros: function () {
		var filtros = this.getView ().query ("fieldset[name='FilterFieldSet'] combo");
		var params_filtro;
		var me = this;

		for (i = 0; i < filtros.length; i++) {
			params_filtro = this.CargarParametrosFiltro (this.getView ().paramsEntrada, filtros[i].filterName);

			if (filtros[i].autoCarga) {
				var st = Ext.create ("Ext.data.Store", {
					fields	: ['id_field', 'desc_field'],
					proxy	: {
						type: 'ajax',
						url: me.params.comboFiltrosUrl,
						reader: {
							type: 'json',
							rootProperty: 'root'
						}
					}
				});
				filtros[i].store = st;
				params_filtro['fname'] = filtros[i].filterName;

			} else {
				st = filtros[i].store;
			}

			st.load ({params : params_filtro});
		}
	},

	//
	// Inicializa los parametros del listado y configura la pantalla.
	//
	InicializarListado: function () {
		this.AplicarParametrosDeEntrada (this.getView ().paramsEntrada, this.params);
		this.CargarStoreParams (this.store_params, this.params);
		this.CrearStoreGrilla ();
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
	// Configura la pantalla en funcion de los parametros recibidos.
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
			this.getView ().down ("actioncolumn[name='colEditar']").hide ();
		}

		if (!this.params.verColBorrar) {
			this.getView ().down ("actioncolumn[name='colBorrar']").hide ();
		}

		this.AplicarConfiguracionDeSeguridad ();
		this.RefrescarFiltros ();
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
		this.getView ().down ("button[name='btnNuevo']").setDisabled (!this.permisos.crear);

		if (!this.permisos.borrar) {
			this.getView ().down ("actioncolumn[name='colBorrar']").hide ();
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

//--------------------- Metodos Publicos ---------------------

	//
	// Esta funcion cambia el valor asociado a un filtro en los parametros del store de la grilla.
	// Se usa para los filtros que no son combos por que esos no son manejados por dentro de esta clase, hay que agregar un
	// eventhandler en la clase derivada y llamar a esta funcion cada vez que se cambie el valor de ese campo indicando
	//
	// $nombre: nombre del filtro. Ej:'fnom', 'ftipo', etc.
	// $valor: valor del filtro, que es el valor del componente
	//
	CambiarValorFiltro: function (nombre, valor) {
		if (valor != '') {
			this.store_params[nombre] = valor;
			this.RefrescarGrilla ();
		}
	},

//--------------------- Metodos Sobrecargables (Protegidos) ---------------------

	//
	// Metodo establecido por default. Le permite al listado cargar sus propios parametros
	// customizados para pasar a los store de los filtros.
	//
	CargarStoreParams: function (storep, params) {
	},

	//
	// Metodo vacio establecido por default.
	//
	GuardarItemSeleccionado: function (item_id, params_entrada) {
	},

	//
	// Setea parametros custom para la carga de cada filtro.
	// Recibe los parametros de entrada del formulario y el nombre del filtro.
	// el parametro fname se carga automaticamente y no debe indicarse aca.
	//
	CargarParametrosFiltro: function (paramsEntrada, nombreFiltro) {
		return {};
	}

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
