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

Ext.define ('Sistema.view.Produccion.AtributoProducto.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-atprod-FormularioController',

    init: function () {
    	FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Produccion.model.AtributoProducto', 'Produccion:AtributoProducto');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.onBtnGuardarClick
    		},
			"button[name='btnBuscarUnidadDeMedida']": {
				click: this.onBtnBuscarUnidadDeMedidaClick
			},
			"textfield[name='tbCodUnidadDeMedida']": {
				specialkey: this.onTbCodUnidadDeMedidaSpecialKey,
				change: this.tbChangeToUpperCase
			},
    		"prod-atprod-Formulario": {
    			afterrender: this.onRender
    		}
    	});
    },

	//---------- Handlers de los eventos de los botones de busqueda ----------

	onBtnBuscarUnidadDeMedidaClick: function () {
		this.ctl.CampoUnidadDeMedida.AbrirVentanaBusqueda ();
	},

	onTbCodUnidadDeMedidaSpecialKey: function (f, e) {
    	if (e.getKey () == e.ENTER || e.getKey () == e.TAB) {
    		this.ctl.CampoUnidadDeMedida.BuscarPorCodigo (f.value);
    	}
	},

	//---------- Handlers eventos estandar del formulario ----------

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 500;
    	ctl.params.altoVentana		= 200;
    },

	CargarComponentes: function () {
		var me = this;

		this.params.nombreEntidad = 'Atributo Producto';
		this.ctl.tbNombre = this.getView ().down ("textfield[name='tbNombre']");
		this.ctl.tbCodUnidadDeMedida= this.getView ().down ("textfield[name='tbCodUnidadDeMedida']");
		this.ctl.tbDescUnidadDeMedida= this.getView ().down ("textfield[name='tbDescUnidadDeMedida']");
		this.ctl.cbTipoAtributoProducto= this.getView ().down ("combo[name='cbTipoAtributoProducto']");

		// Recarga el combo
		this.ctl.cbTipoAtributoProducto.store.reload ();

		// Inicializa el componente de busqueda de Centros de Trabajo
		this.ctl.CampoUnidadDeMedida = new CampoBusqueda ();
		this.ctl.CampoUnidadDeMedida.SetClaseModelo ('Sistema.view.Produccion.model.UnidadDeMedida');
		this.ctl.CampoUnidadDeMedida.SetClaseListado ('Sistema.view.Produccion.UnidadDeMedida.Listado');
		this.ctl.CampoUnidadDeMedida.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/UnidadDeMedida/FormularioController.php');

		this.ctl.CampoUnidadDeMedida.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodUnidadDeMedida.setValue (rec.get ('codigo'));
			me.ctl.tbDescUnidadDeMedida.setValue (rec.get ('descripcionCorta'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoUnidadDeMedida.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodUnidadDeMedida.setValue ('');
			me.ctl.tbDescUnidadDeMedida.setValue ('');
		};
	},

    GetElementoFoco: function () {
    	return "textfield[name='tbNombre']";
    },

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		this.params.registro = rec;

		this.ctl.tbNombre.setValue (rec.get ('nombre'));
		this.ctl.CampoUnidadDeMedida.BuscarPorId (rec.get ('unidadDeMedidaId'));
		this.ctl.cbTipoAtributoProducto.setValue (rec.get ('tipoAtributoProductoId'));
	},

	ObtenerRegistroDeFormulario: function () {
		this.params.registro.set ('nombre', this.ctl.tbNombre.value);
		this.params.registro.set ('tipoAtributoProductoId', this.ctl.cbTipoAtributoProducto.value);
		this.params.registro.set ('unidadDeMedidaId', this.ctl.CampoUnidadDeMedida.itemId);

		return this.params.registro;
	}
});