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

Ext.define ('Sistema.view.Produccion.HojaDeRuta.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-hdruta-ListadoController',
    requires:[
    	'Sistema.view.Produccion.HojaDeRuta.ListadoGrillaStore'
    ],

	//
	// Asignacion de EventHandlers para los controles de la vista.
	//
	init: function () {
		ListadoControllerBase2.InyectarDependencia (this, 'Produccion:HojaDeRuta');
		this.params = {
			formularioController: 'Server/Sysgran/Aplicacion/Modulos/Produccion/HojaDeRuta/FormularioController.php',
			nuevaEntidad		: 'Sistema.view.Produccion.HojaDeRuta.Formulario',
			editarEntidad		: 'Sistema.view.Produccion.HojaDeRuta.Formulario',
			storeGrilla			: 'Sistema.view.Produccion.HojaDeRuta.ListadoGrillaStore',
			xtypeListado		: 'prod-hdruta-Listado',
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
			"prod-hdruta-Listado": {
				render: this.onRender
			}
	   });
	},

	SetupFiltros: function () {
		var me = this;

		// Cargamos los componentes del listado.
		this.ctl.tbCodOperacion		= this.getView ().down ("textfield[name='tbCodOperacion']");
		this.ctl.tbDescOperacion	= this.getView ().down ("textfield[name='tbDescOperacion']");

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

		this.AgregarFiltro (new FiltroTexto ('codigo', this, 'cbCodigo', 'tbCodigo', 'tcodigo', 'codigo'));
		this.AgregarFiltro (new FiltroTexto ('descripcion', this, 'cbDescripcion', 'tbDescripcion', 'tdesc', 'desc'));
		this.AgregarFiltro (new FiltroCampoBusqueda ('operacion', this, this.ctl.CampoOperacion, 'oper'));
	},

	GetOnNuevoParamsEntrada: function (params) {
		return ManejadorDeVentanas.ReqFormularioWS (null);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioWS (item.get ('id'));
	}
});