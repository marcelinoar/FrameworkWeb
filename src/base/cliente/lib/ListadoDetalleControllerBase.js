/***************************************************************************************************
 *
 * Archivo: ListadoDetalleControllerBase.js
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
 * - formularioCreacion			: Tipo de entidad nueva a crear.
 * - formularioCreacionTitulo		: Titulo de la ventana que se abre al crear una nueva entidad.
 * - formularioEdicion			: Tipo de entidad a actualizar.
 * - formularioEdicionTitulo	: Titulo de la ventana que se abre al editar una entidad.
 * - xtypeListado			: Xtype del listado
 * - ventanaWidth			: Ancho de la ventana de edicion.
 * - ventanaHeight			: Altura de la ventana de edicion.
 * - ventanaMaximizable		: Permite que la ventana sea maximizable.
 * - ventanaMaximized		: Abre la ventana maximizada.
 * - ventanaModal			: Abre la ventana en forma modal. De lo contrario permite que se minimize y que se mantengan abiertas varias ventanas al mismo tiempo.
 */

var ListadoDetalleControllerBase = {
	InyectarDependencia: function (controller, nombre_entidad_permisos) {
		if (nombre_entidad_permisos == null) {
			console.log ('ListadoDetalleControllerbase::InyectarDependencia (). Falta parametro');
		}

		Ext.apply (controller, {
			permisos	: null,
			store_params: {},
			ctl			: {}							// Controles del listado.
		});
		Ext.apply (controller.getView (), {
			paramsEntrada : {
				modoEjecucion	: null,
				verColEditar	: null,
				verColBorrar	: null
			},

			datosRetorno : {
				itemsSeleccionados: []
			}
		});

		// Asignamos los permisos de la entidad que corresponden a la pantalla.
		controller.permisos = sesionUsuario.GetPermiso (nombre_entidad_permisos);

		// Agregamos los metodos estandar
		ControllerBase.InyectarDependencia (controller);

		controller.onEditarRegistroGrilla			= this.onEditarRegistroGrilla;
		controller.onBorrarRegistroGrilla			= this.onBorrarRegistroGrilla;
		controller.onListadoGrillaCellDblClick		= this.onListadoGrillaCellDblClick;
		controller.onBtnNuevoClick					= this.onBtnNuevoClick;
		controller.onGrillaAfterRender				= this.onGrillaAfterRender;
		controller.onBtnRecargarListadoClick		= this.onBtnRecargarListadoClick;
		controller.SetDatoSalida					= this.SetDatoSalida;
		controller.GetComponenteFoco				= this.GetComponenteFoco;
		controller.AgregarItemsSeleccionados		= this.AgregarItemsSeleccionados;
		controller.GuardarItemsSeleccionados		= this.GuardarItemsSeleccionados;
		controller.ActualizarRegistro				= this.ActualizarRegistro;
		controller.CrearRegistro					= this.CrearRegistro;
		controller.BorrarRegistro					= this.BorrarRegistro;
		controller.ConfigurarPantalla				= this.ConfigurarPantalla;
		controller.RecargarListado					= this.RecargarListado;
		controller.ConfigurarListado				= this.ConfigurarListado;
		controller.setStoreDetalle					= this.setStoreDetalle;
		controller.onRetornoEditor					= this.onRetornoEditor;
		controller.onRetornoBorrarRegistroGrilla	= this.onRetornoBorrarRegistroGrilla;
		controller.EditarRegistro					= this.EditarRegistro;
	},

//--------------------- Event Handlers ---------------------

	//
	// Abre un FormularioMemoria para editar el item seleccionado en la grilla.
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
		var frm = Ext.create (this.params.formularioCreacion, {});
		frm.paramsEntrada = me.GetOnNuevoParamsEntrada (me.getView().paramsEntrada);

		//
		// Si abrimos una grilla para seleccionar elementos
		// tenemos que refrescarla. Como desde aca tambien se abren formularios, primero
		// nos fijamos que exista el metodo RefrescarGrilla.
		//
		if (frm.getController ().RefrescarGrilla != undefined) {
			frm.getController ().RefrescarGrilla ();
		}

		var comp = frm.getController ().GetComponenteFoco ();
		var win = Ext.create('Ext.window.Window', {
			title		: this.params.tituloFormularioCreacion,
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
					me.AgregarItemsSeleccionados (frm.datosRetorno);
					me.RecargarListado ();
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
				me.BorrarRegistro (grid.getStore (), grid.getStore ().getAt (rowIndex));
				me.onRetornoBorrarRegistroGrilla ();
			}
		});
	},

	onBtnRecargarListadoClick: function () {
		this.RecargarListado ();
	},

	onGrillaAfterRender: function () {
		this.ConfigurarPantalla ();
	},

	//
	// Se dispara cuando se hace doble click sobre una celda de la grilla.
	// Si el listado tiene configurada una pantalla para editar el registro se abre.
	//
	onListadoGrillaCellDblClick: function(grid, rowIndex, colIndex, store, row) {
		if (this.params.formularioEdicion != '') {
			this.EditarRegistro (grid.getRecord (row));
		}
	},

//--------------------- Metodos Publicos---------------------

	//
	// Setea la configuracion inicial del listado detalle
	//
	ConfigurarListado: function (dirty_callback, perfil_acceso) {
		// Llamamos a este metodo desde aca cuando algun detalle del listado fue modificado.
		this['setModificado'] = dirty_callback;
		this.params.perfilDeacceso = perfil_acceso;
	},

	//
	// Setea a st como el store de la grilla.
	//
	setStoreDetalle: function (st) {
		this.getView ().down ('grid').reconfigure (st);
	},

//--------------------- Metodos Privados ---------------------

	//
	// Abre una ventana para editar el registro pasado como parametro en el abm correspondiente.
	//
	EditarRegistro: function (reg) {
		var me = this, comp;
		var frm = Ext.create (this.params.formularioEdicion, {});

		frm.paramsEntrada = me.GetOnEditarParamsEntrada (reg, me.getView ().paramsEntrada);
		frm.paramsEntrada.permisos = this.permisos;
		comp = frm.getController ().GetComponenteFoco ();

		var win = Ext.create('Ext.window.Window', {
			title		: this.params.tituloFormularioEdicion,
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
					me.AgregarItemsSeleccionados (frm.datosRetorno);
					me.RecargarListado ();
				}
			}
		});

		win.add (frm);
		win.show ();
	},

	//
	// Recarga individualmente cada uno de los items del store.
	//
	// WARNING!!!!
	// Estoy evaluando si un modelo tiene un memory proxy o un json proxy basandome en una propiedad
	// interna de sencha que se llama alternateClassName!
	// No es confiable hacer esto pero es la mejor alternativa ahora.
	//
	// Evaluar la posibilidad de derivar los modelos de una clase superior que tenga un tipo o algo as'i.
	//
	RecargarListado: function () {
		var store = this.getView ().down ("grid").store;

		store.each (function (rec) {
			if (rec.proxy.alternateClassName != "Ext.data.MemoryProxy") {
				rec.load ();
			}
		});
	},

	//
	// Si la grilla tiene las columnas de editar y borrar se configura la vista segun los parametros de la configuracion.
	//
	ConfigurarPantalla: function () {
		var col;
		if (!this.params.verColEditar) {
			col = this.getView ().down ("actioncolumn[name='colEditar']");
			if (col != null) {
				col.hide ();
			}
		}

		if (!this.params.verColBorrar) {
			col = this.getView ().down ("actioncolumn[name='colBorrar']");
			if (col != null) {
				col.hide ();
			}
		}
	},

	//
	// Devuelve el elemento del formulario que debe recibir el foco al momento de abrirse la ventana.
	// Este metodo por default devuelve el primer textfield del formulario.
	//
    GetComponenteFoco: function () {
    	return this.getView ().down ("button");
    },

	//
	// Procesa el retorno de control desde un formulario o un ListadoWS
	//
	AgregarItemsSeleccionados: function (params) {
		var store;

		//
		// Agregamos este chequeo, por que al parecer es posible cerrar una ventana que quedo atras
		// de una modal precionando la tecla escape.
		//
		if (this.getView () != null) {
			store = this.getView ().down ("grid").store;
			switch (params.accion) {
				case AccionRetorno.Guardar:
					this.GuardarItemsSeleccionados (store, params.itemsSeleccionados);
					break;

				case AccionRetorno.Actualizar:
					this.ActualizarRegistro (store, params.modelo);
					break;

				case AccionRetorno.Crear:
					this.CrearRegistro (store, params.modelo);
					break;

				case AccionRetorno.Borrar:
					this.BorrarRegistro (store, params.modelo);
					break;
			}

			this.onRetornoEditor ();
		}
	},

	//
	// Guarda los items seleccionados en el store. El store filtra automaticamente
	// los repetidos por id.
	//
	GuardarItemsSeleccionados: function (store, its) {
		var i;
		var ent;

		if (its != null) {
			this.setModificado ();

			for (var i = 0; i < its.length; i++) {
				store.add (its[i]);
			}
		}
	},

	//
	// Marca el registro como actualizado.
	//
	ActualizarRegistro: function (store, modelo) {
		this.setModificado ();
	},

	//
	// Marca el registro como nuevo.
	//
	CrearRegistro: function (store, modelo) {
		this.setModificado ();
		store.add (modelo);
	},

	//
	// Marca el registro como borrado.
	//
	BorrarRegistro: function (store, modelo) {
		this.setModificado ();
		store.remove (modelo);
	},

	//
	// Establece el valor de un parametro de salida.
	//
	SetDatoSalida: function (nombre, valor) {
		this.getView ().datosRetorno[nombre] = valor;
	},

	//---------- Metodos Publicos ----------

	/**
	 *
	 * Realiza una copia interna de los permisos de usuario pasados por parametro
	 *
	 * @param	permisos: Permisos sobre la entidad que edita el formulario
	 *
	 */

	SetPermisos: function (permisos) {
		this.params.permisos = permisos;
	},


	//---------- Eventos Sobrecargables ----------

	//
	// Se ejecuta al cerrar la ventana de crear nuevo item.
	//
	onRetornoEditor: function () {
	},

	//
	// Se ejecuta despues de borrar un registro desde la grilla.
	//
	onRetornoBorrarRegistroGrilla: function () {
	}

	//---------- Metodos Virtuales ----------

//
// Los siguientes metodos no estan definidos en esta clase pero si son invocados desde aca,
// por eso es que deben ser definidos obligatoriamente en las clases derivadas para que no surjan
// errores en tiempo de ejecucion.
//

//
// Metodo: GetOnNuevoParamsEntrada: function (params)
//
// Arma el objeto paramsEntrada pasado al formulario/listado que crea un nuevo
// registro. Este metodo debe ser sobrecargado.
//

//
// Metodo: GetOnEditarParamsEntrada: function (item, params)
//
// Arma el objeto paramsEntrada pasado al formulario que edita una entidad del
// listado. Este metodo debe ser sobrecargado.
//

//
// Metodo: setModificado: function ()
//
// Es un metodo que debe ser sobreescrito por el formularioController de la entidad de mas alto nivel para que desde aca
// podamos informar si un campo de detalle fue modificado.
//
}


