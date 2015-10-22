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

Ext.define ('Sistema.view.Produccion.Producto.Atributos.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-producto-att-FormularioController',

    init: function () {
    	FormularioDetalleControllerBase.InyectarDependencia (this, 'Sistema.view.Produccion.model.ValorAtributoProducto', 'Produccion:Producto');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.onBtnGuardarClick
    		},
    		"prod-producto-att-Formulario": {
    			afterrender: this.onRender
    		},
			"button[name='btnBuscarAtributo']": {
				click: this.onBtnBuscarAtributoClick
			},
			"textfield[name='tbAtributoId']": {
				specialkey: this.onTbAtributoIdSpecialKey,
				change: this.tbChangeToUpperCase
			},
			"textfield[name='tbValor']": {
				blur: this.FormatearCampoPuntoFlotante
			}
    	});
    },

	//---------- Handlers de los eventos de los botones de busqueda ----------

	onBtnBuscarAtributoClick: function () {
		this.ctl.CampoNombreAtributo.AbrirVentanaBusqueda ();
	},

	onTbAtributoIdSpecialKey: function (f, e) {
    	if (e.getKey () == e.ENTER || e.getKey () == e.TAB) {
    		this.ctl.CampoNombreAtributo.BuscarPorId (f.value);
    	}
	},

	//---------- Handlers eventos estandar del formulario ----------

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 500;
    	ctl.params.altoVentana		= 200;
    },

	CargarComponentes: function () {
		var me = this;

		this.ctl.tbAtributoId			= this.getView ().down ("textfield[name='tbAtributoId']");
		this.ctl.tbNombreAtributo		= this.getView ().down ("textfield[name='tbNombreAtributo']");
		this.ctl.tbCodUnidadDeMedida	= this.getView ().down ("textfield[name='tbCodUnidadDeMedida']");
		this.ctl.tbValor				= this.getView ().down ("textfield[name='tbValor']");

		// Inicializa el componente de busqueda de Centros de Trabajo
		this.ctl.CampoNombreAtributo = new CampoBusqueda ();
		this.ctl.CampoNombreAtributo.SetClaseModelo ('Sistema.view.Produccion.model.AtributoProducto');
		this.ctl.CampoNombreAtributo.SetClaseListado ('Sistema.view.Produccion.AtributoProducto.Listado');
		this.ctl.CampoNombreAtributo.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/AtributoProducto/FormularioController.php');

		this.ctl.CampoNombreAtributo.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbAtributoId.setValue (rec.get ('id'));
			me.ctl.tbNombreAtributo.setValue (rec.get ('nombre'));
			me.ctl.tbCodUnidadDeMedida.setValue (rec.get ('unidadDeMedida').codigo);
			this.unidadDeMedidaId = rec.get ('unidadDeMedida').id;
		};

		this.ctl.CampoNombreAtributo.onRegistroSeleccionadoError = function () {
			me.ctl.tbAtributoId.setValue ('');
			me.ctl.tbNombreAtributo.setValue ('');
			me.ctl.tbCodUnidadDeMedida.setValue ('');
			this.unidadDeMedidaId = 0;
		};
	},

    GetElementoFoco: function () {
    	return "textfield[name='tbAtributoId']";
    },

	CargarRegistroEnFormulario: function (rec) {
		this.params.registro = rec;

		this.ctl.tbValor.setValue (Formato.PuntoFlotante.Transformar (rec.get ('valor')));
		this.ctl.CampoNombreAtributo.BuscarPorId (rec.get ('atributoProductoId'));
	},

	ObtenerRegistroDeFormulario: function () {
		this.params.registro.set ('valor'				, this.ctl.tbValor.value);
		this.params.registro.set ('atributoProductoId'	, this.ctl.tbAtributoId.value);
		this.params.registro.set ('nombre'				, this.ctl.tbNombreAtributo.value);
		this.params.registro.set ('unidadDeMedidaId'	, Formato.PuntoFlotante.FormatoDB (this.ctl.CampoNombreAtributo.unidadDeMedidaId));

		return this.params.registro;
	}
});