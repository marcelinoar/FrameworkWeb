/**************************************************************************************************
 * Archivo: ListadoController.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.Producto.OperacionesHojaDeRuta.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-producto-ophr-ListadoController',

	//
	// Asignacion de EventHandlers para los controles de la vista.
	//
	init: function () {
		var me = this;

	   	this.control({
			"prod-producto-ophr-ListadoGrilla": {
				edit: this.onGrillaChange
			}
	    });

		// Creamos el store de la grilla
		this.CrearStoreGrilla ();

	    // Inyectamos Metodos estandar
	    ControllerBase.InyectarDependencia (this);

		// Componentes
		this.ctl = {};
		this.ctl.tbCodHojaDeRuta 	= this.getView ().down ("textfield[name='tbCodHojaDeRuta']");
		this.ctl.tbDescHojaDeRuta 	= this.getView ().down ("textfield[name='tbDescHojaDeRuta']");

		// Campo Hoja de Ruta
		this.ctl.CampoHojaDeRuta= new CampoBusqueda ();
		this.ctl.CampoHojaDeRuta.SetClaseModelo ('Sistema.view.Produccion.model.HojaDeRuta');
		this.ctl.CampoHojaDeRuta.SetClaseListado ('Sistema.view.Produccion.HojaDeRuta.Listado');
		this.ctl.CampoHojaDeRuta.SetController (this);
		this.ctl.CampoHojaDeRuta.SetTextFieldCodigo ('tbCodHojaDeRuta');
		this.ctl.CampoHojaDeRuta.SetBtnBuscar ('btnBuscarHojaDeRuta');
		this.ctl.CampoHojaDeRuta.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/HojaDeRuta/FormularioController.php');

		this.ctl.CampoHojaDeRuta.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodHojaDeRuta.setValue (rec.get ('codigo'));
			me.ctl.tbDescHojaDeRuta.setValue (rec.get ('descripcionCorta'));
			this.itemId = rec.get ('id');

			me.ActualizarListado (me.GetProductoId (), this.itemId);
		};

		this.ctl.CampoHojaDeRuta.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodHojaDeRuta.setValue ('');
			me.ctl.tbDescHojaDeRuta.setValue ('');
		};
	},

	//---------- Event Handlers ----------

	//
	// Se ejecuta despues de editar la celda Cantidad en la grilla.
	//
	onGrillaChange: function (editor, e) {
		this.setModificado ();
	},

	//---------- Metodos Privados ----------

	//
	// Actualiza el contenido de la grilla
	//
	ActualizarListado: function (productoId, hojaDeRutaId) {
		var me = this, params = {};
		var st = me.getView ().down ('grid').store;

		// Siempre limpia la grilla primero.
		st.removeAll ();

		var consulta_form = new ConsultaWS ().Ejecutar ('Produccion', 'Producto', 'FormularioController', 'GetOperacionesPorHojaDeRutaProducto', {productoId: productoId, hojaDeRutaId: hojaDeRutaId}, function (resp) {
			if (this.RespuestaOK ()) {
				st.loadData (resp);

			} else {
				Ext.Msg.alert('Error', this.GetMensajeRespuesta ());
			}
		});
	},

	//
	// Esto es lo primero que hay que hacerle a una grilla. Creamos el store que va a usar y se lo asociamos.
	//
	CrearStoreGrilla: function () {
		var st = Ext.create ('Sistema.view.Produccion.Producto.OperacionesHojaDeRuta.ListadoGrillaStore', {autoDestroy:true});
		var grilla = this.getView ().down ('grid');
		var paging = this.getView ().down ('pagingtoolbar');

		grilla.reconfigure (st);

		// Si la grilla tiene habilitado el plugin de paginado asociamos el
		// store de la grilla con el del plugin.
		if (paging != null) {
			paging.bindStore (st);
		}
	},

	// ----------------------- Metodos Publicos -----------------------

	/**
	 * Funcion llamada por el formulario principal, agrega un callback para informar de modificaiones y los permisos.
	 *
	 * @param	set_dirty_callback	Funcion callback que sera ejecutada por esta entidad al realizarse algun cambio en la misma
	 * @param	permisos			String de permisos de esta entidad
	 */

	ConfigurarListado: function (set_dirty_callback, permisos) {
		this['setModificado'] = set_dirty_callback;
		this.permisos = permisos;
	},

	SetHojaDeRuta: function (hojaDeRutaId) {
		this.ctl.CampoHojaDeRuta.BuscarPorId (hojaDeRutaId);
	},

	//
	// Devuelve el id de la hoja de ruta seleccionada.
	//
	GetHojaDeRuta: function () {
		return this.ctl.CampoHojaDeRuta.itemId;
	},

	//
	// Funcion pisada en el formulario principal para que podamos acceder al id del producto
	//
	GetProductoId: function () {
		return null;
	},

	//
	// Carga en el store los datos nuevos y marca al maestro como modificado.
	//
	ObtenerStoreModificado: function (store) {
		var i, reg, flag;
		var grilla = this.getView ().down ('prod-producto-ophr-ListadoGrilla');

		store.removeAll ();
		for (i = 0; i < grilla.store.count (); i++) {
			reg = grilla.store.getAt (i);

			// Filtramos los registros que tienen todo en cero.
			flag = reg.get ('tiempoTrabajo') > 0 || reg.get ('tiempoPreparacion') > 0;
			flag = flag || reg.get ('cntOperTrabajo') > 0 || reg.get ('cntOperPreparacion') > 0;
			flag = flag || reg.get ('kgDeMerma') > 0 || reg.get ('kgDeRecorte') > 0;

			if (flag) {
				store.add (reg);
			}
		}
	}
});
