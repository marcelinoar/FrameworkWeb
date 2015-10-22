/**************************************************************************************************
 * Archivo: FormularioController.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.FormulaDeProduccion.Detalles.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-form-det-FormularioController',

    init: function () {
    	FormularioDetalleControllerBase.InyectarDependencia (this, 'Sistema.view.Produccion.model.DetFormulaDeProduccion', 'Produccion:FormulaDeProduccion');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.onBtnGuardarClick
    		},
    		"prod-form-det-Formulario": {
    			afterrender: this.onRender
    		},
			"button[name='btnBuscarFormula']": {
				click: this.onBtnBuscarFormulaClick
			},
			"textfield[name='tbCodFormula']": {
				specialkey: this.onTbCodFormulaSpecialKey,
				change: this.tbChangeToUpperCase
			},
			"button[name='btnBuscarProducto']": {
				click: this.onBtnBuscarProductoClick
			},
			"textfield[name='tbCodProducto']": {
				specialkey: this.onTbCodProductoSpecialKey,
				change: this.tbChangeToUpperCase
			},
			"textfield[name='tbCantidadUtilizada']": {
				blur: this.FormatearCampoPuntoFlotante
			}
    	});
    },

	//---------- Handlers de los eventos de los botones de busqueda ----------

	onBtnBuscarFormulaClick: function () {
		this.ctl.CampoFormula.AbrirVentanaBusqueda ();
	},

	onTbCodFormulaSpecialKey: function (f, e) {
    	if (e.getKey () == e.ENTER || e.getKey () == e.TAB) {
    		this.ctl.CampoFormula.BuscarPorCodigo (f.value);
    	}
	},

	onBtnBuscarProductoClick: function () {
		this.ctl.CampoProducto.AbrirVentanaBusqueda ();
	},

	onTbCodProductoSpecialKey: function (f, e) {
    	if (e.getKey () == e.ENTER || e.getKey () == e.TAB) {
    		this.ctl.CampoProducto.BuscarPorCodigo (f.value);
    	}
	},

	//---------- Handlers eventos estandar del formulario ----------

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 580;
    	ctl.params.altoVentana		= 220;
    },

	CargarComponentes: function () {
		var me = this;

		// Carga de componentes
		this.ctl.tbCodProducto 			= this.getView ().down ("textfield[name='tbCodProducto']");
		this.ctl.tbDescProducto			= this.getView ().down ("textfield[name='tbDescProducto']");
		this.ctl.tbCodFormula 			= this.getView ().down ("textfield[name='tbCodFormula']");
		this.ctl.tbDescFormula			= this.getView ().down ("textfield[name='tbDescFormula']");
		this.ctl.tbCantidadUtilizada	= this.getView ().down ("textfield[name='tbCantidadUtilizada']");
		this.ctl.cbUnidadDeMedidaId		= this.getView ().down ("combo[name='cbUnidadDeMedidaId']");
		this.ctl.itemId					= 0;
		this.ctl.codigo					= '';
		this.ctl.descripcionCorta		= '';
		this.ctl.tipo					= 0;

		this.ctl.cbUnidadDeMedidaId.store.reload ();

		// Inicializa el componente de busqueda.
		this.ctl.CampoFormula = new CampoBusqueda ();
		this.ctl.CampoFormula.SetClaseModelo ('Sistema.view.Produccion.model.FormulaDeProduccion');
		this.ctl.CampoFormula.SetClaseListado ('Sistema.view.Produccion.FormulaDeProduccion.Listado');
		this.ctl.CampoFormula.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/FormulaDeProduccion/FormularioController.php');

		this.ctl.CampoFormula.onRegistroSeleccionadoOk = function (rec) {
			me.SetFormula (rec);
		};

		this.ctl.CampoFormula.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodFormula.setValue ('');
			me.ctl.tbDescFormula.setValue ('');
		};

		// Inicializa el componente de busqueda.
		this.ctl.CampoProducto = new CampoBusqueda ();
		this.ctl.CampoProducto.SetClaseModelo ('Sistema.view.Produccion.model.Producto');
		this.ctl.CampoProducto.SetClaseListado ('Sistema.view.Produccion.Producto.Listado');
		this.ctl.CampoProducto.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/Producto/FormularioController.php');

		this.ctl.CampoProducto.onRegistroSeleccionadoOk = function (rec) {
			me.SetProducto (rec);
		};

		this.ctl.CampoProducto.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodProducto.setValue ('');
			me.ctl.tbDescProducto.setValue ('');
		};
	},

	SetProducto: function (rec) {
		// Seteamos el producto
		this.ctl.tbCodProducto.setValue (rec.get ('codigo'));
		this.ctl.tbDescProducto.setValue (rec.get ('descripcionCorta'));

		// Limpiamos la formula
		this.ctl.tbCodFormula.setValue ('');
		this.ctl.tbDescFormula.setValue ('');

		this.ctl.tipo 				= 2;
		this.ctl.itemId				= rec.get ('id');
		this.ctl.codigo				= rec.get ('codigo');
		this.ctl.descripcionCorta	= rec.get ('descripcionCorta');
	},

	SetFormula: function (rec) {
		// Seteamos la formula
		this.ctl.tbCodFormula.setValue (rec.get ('codigo'));
		this.ctl.tbDescFormula.setValue (rec.get ('descripcionCorta'));

		// Limpiamos el producto
		this.ctl.tbCodProducto.setValue ('');
		this.ctl.tbDescProducto.setValue ('');

		this.ctl.tipo 				= 1;
		this.ctl.itemId				= rec.get ('id');
		this.ctl.codigo				= rec.get ('codigo');
		this.ctl.descripcionCorta	= rec.get ('descripcionCorta');
	},

    GetElementoFoco: function () {
    	return "textfield[name='tbCodProducto']";
    },

	CargarRegistroEnFormulario: function (rec) {
		this.params.registro = rec;

		this.ctl.tipo = rec.get ('tipo');
		this.ctl.itemId				= rec.get ('itemId');
		this.ctl.codigo				= rec.get ('codigo');
		this.ctl.descripcionCorta	= rec.get ('descripcionCorta');
		this.ctl.cbUnidadDeMedidaId.setValue (rec.get ('unidadDeMedidaId'));
		this.ctl.tbCantidadUtilizada.setValue (Formato.PuntoFlotante.Transformar (rec.get ('cantidadUtilizada')));

		if (this.ctl.tipo == 1) { // Formula
			this.ctl.tbCodFormula.setValue (rec.get ('codigo'));
			this.ctl.tbDescFormula.setValue (rec.get ('descripcionCorta'));

		} else {				// Producto
			this.ctl.tbCodProducto.setValue (rec.get ('codigo'));
			this.ctl.tbDescProducto.setValue (rec.get ('descripcionCorta'));
		}
	},

	ObtenerRegistroDeFormulario: function () {
		this.params.registro.set ('unidadDeMedidaId'	, this.ctl.cbUnidadDeMedidaId.value);
		this.params.registro.set ('tipo'				, this.ctl.tipo);
		this.params.registro.set ('codigo'				, this.ctl.codigo);
		this.params.registro.set ('descripcionCorta'	, this.ctl.descripcionCorta);
		this.params.registro.set ('itemId'				, this.ctl.itemId);
		this.params.registro.set ('cantidadUtilizada'	, Formato.PuntoFlotante.FormatoDB (this.ctl.tbCantidadUtilizada.value));

		return this.params.registro;
	}
});