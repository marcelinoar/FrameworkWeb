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

Ext.define ('Sistema.view.Produccion.CentroDeTrabajo.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-ct-ListadoController',
    requires:[
    	'Sistema.view.Produccion.CentroDeTrabajo.ListadoGrillaStore'
    ],

	//
	// Asignacion de EventHandlers para los controles de la vista.
	//
	init: function () {
		ListadoControllerBase2.InyectarDependencia (this, 'Produccion:CentroDeTrabajo');
		this.params = {
			formularioController: 'Server/Sysgran/Aplicacion/Modulos/Produccion/CentroDeTrabajo/FormularioController.php',
			nuevaEntidad		: 'Sistema.view.Produccion.CentroDeTrabajo.Formulario',
			editarEntidad		: 'Sistema.view.Produccion.CentroDeTrabajo.Formulario',
			storeGrilla			: 'Sistema.view.Produccion.CentroDeTrabajo.ListadoGrillaStore',
			xtypeListado		: 'prod-ct-Listado',
			ventanaMaximizable	: false,
			ventanaMaximized	: false,
			ventanaModal		: false,
			verColEditar		: true,
			verColBorrar		: true,
			anchoVentana		: 800,
			altoVentana			: 500
		};

	   	this.control({
			"grid": {
				celldblclick: this.onListadoGrillaCellDblClick
			},
			"button[name='btnBuscar']": {
				click: this.onBtnBuscarClick
			},
			"button[name='btnLimpiarFiltros']": {
				click: this.onBtnLimpiarFiltrosClick
			},
			"button[name='btnNuevo']": {
				click: this.onBtnNuevoClick
			},
			"button[name='btnRecargarListado']": {
				click: this.onBtnRecargarListadoClick
			},
			"button[name='btnAceptar']": {
				click: this.onBtnAceptarClick
			},
			"button[name='btnCancelar']": {
				click: this.onBtnCancelarClick
			},
			"prod-ct-Listado": {
				render: this.onRender
			}
	   });
	},

	SetupFiltros: function () {
		var me = this;

		// Cargamos los componentes del listado.
		this.ctl.tbCodPlanta		= this.getView ().down ("textfield[name='tbCodPlanta']");
		this.ctl.tbDescPlanta		= this.getView ().down ("textfield[name='tbDescPlanta']");
		this.ctl.tbCodAlmacen		= this.getView ().down ("textfield[name='tbCodAlmacen']");
		this.ctl.tbDescAlmacen		= this.getView ().down ("textfield[name='tbDescAlmacen']");
		this.ctl.tbCodOperacion		= this.getView ().down ("textfield[name='tbCodOperacion']");
		this.ctl.tbDescOperacion	= this.getView ().down ("textfield[name='tbDescOperacion']");
		this.ctl.tbCodMaquina		= this.getView ().down ("textfield[name='tbCodMaquina']");
		this.ctl.tbDescMaquina		= this.getView ().down ("textfield[name='tbDescMaquina']");

		// Campo Maquina
		this.ctl.CampoMaquina = new CampoBusqueda ();
		this.ctl.CampoMaquina.SetClaseModelo ('Sistema.view.Produccion.model.Maquina');
		this.ctl.CampoMaquina.SetClaseListado ('Sistema.view.Produccion.Maquina.Listado');
		this.ctl.CampoMaquina.SetClaseFormulario ('Sistema.view.Produccion.Maquina.Formulario');
		this.ctl.CampoMaquina.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/Maquina/FormularioController.php');
		this.ctl.CampoMaquina.SetController (this);
		this.ctl.CampoMaquina.SetTextFieldCodigo ('tbCodMaquina');
		this.ctl.CampoMaquina.SetBtnBuscar ('btnBuscarMaquina');

		this.ctl.CampoMaquina.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodMaquina.setValue (rec.get ('codigo'));
			me.ctl.tbDescMaquina.setValue (rec.get ('descripcion'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoMaquina.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodMaquina.setValue ('');
			me.ctl.tbDescMaquina.setValue ('');
		};

		// Campo Operacion
		this.ctl.CampoOperacion = new CampoBusqueda ();
		this.ctl.CampoOperacion.SetClaseModelo ('Sistema.view.Produccion.model.Operacion');
		this.ctl.CampoOperacion.SetClaseListado ('Sistema.view.Produccion.Operacion.Listado');
		this.ctl.CampoOperacion.SetClaseFormulario ('Sistema.view.Produccion.Operacion.Formulario');
		this.ctl.CampoOperacion.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/Operacion/FormularioController.php');
		this.ctl.CampoOperacion.SetController (this);
		this.ctl.CampoOperacion.SetTextFieldCodigo ('tbCodOperacion');
		this.ctl.CampoOperacion.SetBtnBuscar ('btnBuscarOperacion');

		this.ctl.CampoOperacion.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodOperacion.setValue (rec.get ('codigo'));
			me.ctl.tbDescOperacion.setValue (rec.get ('nombre'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoOperacion.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodOperacion.setValue ('');
			me.ctl.tbDescOperacion.setValue ('');
		};

		// Campo Almacen
		this.ctl.CampoAlmacen = new CampoBusqueda ();
		this.ctl.CampoAlmacen.SetClaseModelo ('Sistema.view.Produccion.model.Almacen');
		this.ctl.CampoAlmacen.SetClaseListado ('Sistema.view.Produccion.Almacen.Listado');
		this.ctl.CampoAlmacen.SetClaseFormulario ('Sistema.view.Produccion.Almacen.Formulario');
		this.ctl.CampoAlmacen.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/Almacen/FormularioController.php');
		this.ctl.CampoAlmacen.SetController (this);
		this.ctl.CampoAlmacen.SetTextFieldCodigo ('tbCodAlmacen');
		this.ctl.CampoAlmacen.SetBtnBuscar ('btnBuscarAlmacen');

		this.ctl.CampoAlmacen.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodAlmacen.setValue (rec.get ('codigo'));
			me.ctl.tbDescAlmacen.setValue (rec.get ('descripcionCorta'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoAlmacen.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodAlmacen.setValue ('');
			me.ctl.tbDescAlmacen.setValue ('');
		};

		// Campo Planta
		this.ctl.CampoPlanta = new CampoBusqueda ();
		this.ctl.CampoPlanta.SetClaseModelo ('Sistema.view.Produccion.model.Planta');
		this.ctl.CampoPlanta.SetClaseListado ('Sistema.view.Produccion.Planta.Listado');
		this.ctl.CampoPlanta.SetClaseFormulario ('Sistema.view.Produccion.Planta.Formulario');
		this.ctl.CampoPlanta.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/Planta/FormularioController.php');
		this.ctl.CampoPlanta.SetController (this);
		this.ctl.CampoPlanta.SetTextFieldCodigo ('tbCodPlanta');
		this.ctl.CampoPlanta.SetBtnBuscar ('btnBuscarPlanta');

		this.ctl.CampoPlanta.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodPlanta.setValue (rec.get ('id'));
			me.ctl.tbDescPlanta.setValue (rec.get ('nombre'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoPlanta.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodPlanta.setValue ('');
			me.ctl.tbDescPlanta.setValue ('');
		};

		this.AgregarFiltro (new FiltroTexto ('codigo', this, 'cbCodigo', 'tbCodigo', 'tcodigo', 'codigo'));
		this.AgregarFiltro (new FiltroTexto ('nombre', this, 'cbNombre', 'tbNombre', 'tnombre', 'nombre'));
		this.AgregarFiltro (new FiltroCampoBusqueda ('planta', this, this.ctl.CampoPlanta, 'planta'));
		this.AgregarFiltro (new FiltroCampoBusqueda ('almacen', this, this.ctl.CampoAlmacen, 'almacen'));
		this.AgregarFiltro (new FiltroCampoBusqueda ('maquina', this, this.ctl.CampoMaquina, 'maq'));
		this.AgregarFiltro (new FiltroCampoBusqueda ('operacion', this, this.ctl.CampoOperacion, 'oper'));
		this.AgregarFiltro (new FiltroCheckBox ('gen_contenedor', this, 'ckGenContenedor', 'genContenedor'));
		this.AgregarFiltro (new FiltroCheckBox ('trabaja_lote', this, 'ckLote', 'trabLote'));
	},

	GetOnNuevoParamsEntrada: function (params) {
		return ManejadorDeVentanas.ReqFormularioWS (null);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioWS (item.get ('id'));
	}
});