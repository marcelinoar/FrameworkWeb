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

Ext.define ('Sistema.view.Produccion.FormulaDeProduccion.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-form-ListadoController',
    requires:[
    	'Sistema.view.Produccion.FormulaDeProduccion.ListadoGrillaStore'
    ],

	init: function () {
		ListadoControllerBase2.InyectarDependencia (this, 'Produccion:FormulaDeProduccion');

		// Objeto de configuracion del listado.
		this.params = {
			formularioController: 'Server/Sysgran/Aplicacion/Modulos/Produccion/FormulaDeProduccion/FormularioController.php',
			nuevaEntidad		: 'Sistema.view.Produccion.FormulaDeProduccion.Formulario',
			editarEntidad		: 'Sistema.view.Produccion.FormulaDeProduccion.Formulario',
			storeGrilla			: 'Sistema.view.Produccion.FormulaDeProduccion.ListadoGrillaStore',
			xtypeListado		: 'prod-form-Listado',
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
			"prod-form-Listado": {
				render: this.onRender
			}
	   });
	},

	SetupFiltros: function () {
		var me = this;

		// Cargamos los componentes del listado.
		this.ctl.tbCodProducto		= this.getView ().down ("textfield[name='tbCodProducto']");
		this.ctl.tbDescProducto		= this.getView ().down ("textfield[name='tbDescProducto']");
		this.ctl.tbCodFormula		= this.getView ().down ("textfield[name='tbCodFormula']");
		this.ctl.tbDescFormula		= this.getView ().down ("textfield[name='tbDescFormula']");

		// Campo Formula
		this.ctl.CampoFormula = new CampoBusqueda ();
		this.ctl.CampoFormula.SetClaseModelo ('Sistema.view.Produccion.model.FormulaDeProduccion');
		this.ctl.CampoFormula.SetClaseListado ('Sistema.view.Produccion.FormulaDeProduccion.Listado');
		this.ctl.CampoFormula.SetClaseFormulario ('Sistema.view.Produccion.FormulaDeProduccion.Formulario');
		this.ctl.CampoFormula.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/FormulaDeProduccion/FormularioController.php');
		this.ctl.CampoFormula.SetController (this);
		this.ctl.CampoFormula.SetTextFieldCodigo ('tbCodFormula');
		this.ctl.CampoFormula.SetBtnBuscar ('btnBuscarFormula');

		this.ctl.CampoFormula.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodFormula.setValue (rec.get ('codigo'));
			me.ctl.tbDescFormula.setValue (rec.get ('descripcionCorta'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoFormula.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodFormula.setValue ('');
			me.ctl.tbDescFormula.setValue ('');
		};

		// Campo Producto
		this.ctl.CampoProducto = new CampoBusqueda ();
		this.ctl.CampoProducto.SetClaseModelo ('Sistema.view.Produccion.model.Producto');
		this.ctl.CampoProducto.SetClaseListado ('Sistema.view.Produccion.Producto.Listado');
		this.ctl.CampoProducto.SetClaseFormulario ('Sistema.view.Produccion.Producto.Formulario');
		this.ctl.CampoProducto.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/Producto/FormularioController.php');
		this.ctl.CampoProducto.SetController (this);
		this.ctl.CampoProducto.SetTextFieldCodigo ('tbCodProducto');
		this.ctl.CampoProducto.SetBtnBuscar ('btnBuscarProducto');

		this.ctl.CampoProducto.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodProducto.setValue (rec.get ('codigo'));
			me.ctl.tbDescProducto.setValue (rec.get ('descripcionCorta'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoProducto.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodProducto.setValue ('');
			me.ctl.tbDescProducto.setValue ('');
		};

		this.AgregarFiltro (new FiltroTexto ('codigo', this, 'cbCodigo', 'tbCodigo', 'tcodigo', 'codigo'));
		this.AgregarFiltro (new FiltroTexto ('descripcion', this, 'cbDescripcion', 'tbDescripcion', 'tdesc', 'desc'));
		this.AgregarFiltro (new FiltroCampoBusqueda ('contiene_producto', this, this.ctl.CampoProducto, 'producto'));
		this.AgregarFiltro (new FiltroCampoBusqueda ('contiene_formula', this, this.ctl.CampoFormula, 'formula'));
	},

	GetOnNuevoParamsEntrada: function (params) {
		return ManejadorDeVentanas.ReqFormularioWS (null);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioWS (item.get ('id'));
	}
});