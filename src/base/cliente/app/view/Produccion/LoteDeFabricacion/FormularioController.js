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

Ext.define ('Sistema.view.Produccion.LoteDeFabricacion.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-lote-FormularioController',
	requires: [
		'Sistema.view.Produccion.model.LoteDeFabricacion'
	],

    init: function () {
    	FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Produccion.model.LoteDeFabricacion', 'Produccion:LoteDeFabricacion');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.onBtnGuardarClick
    		},
    		"prod-lote-Formulario": {
    			afterrender: this.onRender
    		}
    	});
    },

    SetearParametrosFormulario: function (ctl) {
        ctl.params.anchoVentana = 1024;
        ctl.params.altoVentana  = 650;
    },

	CargarComponentes: function () {
		var me = this;

		this.params.nombreEntidad = 'Lote de Fabricacion';
		this.ctl.tbCodigo					= this.getView ().down ("textfield[name='tbCodigo']");
		this.ctl.tbFechaCreacion			= this.getView ().down ("textfield[name='tbFechaCreacion']");
		this.ctl.tbCodProducto				= this.getView ().down ("textfield[name='tbCodProducto']");
		this.ctl.tbDescProducto				= this.getView ().down ("textfield[name='tbDescProducto']");
		this.ctl.btnBuscarProducto			= this.getView ().down ("button[name='btnBuscarProducto']");
		this.ctl.btnVerProducto				= this.getView ().down ("button[name='btnVerProducto']");
		this.ctl.tbCodCentroDeTrabajo		= this.getView ().down ("textfield[name='tbCodCentroDeTrabajo']");
		this.ctl.tbDescCentroDeTrabajo		= this.getView ().down ("textfield[name='tbDescCentroDeTrabajo']");
		this.ctl.btnBuscarCentroDeTrabajo	= this.getView ().down ("button[name='btnBuscarCentroDeTrabajo']");
		this.ctl.btnVerCentroDeTrabajo		= this.getView ().down ("button[name='btnVerCentroDeTrabajo']");
		this.ctl.tbComentario				= this.getView ().down ("textareafield[name='tbComentario']");

		// Listados
		this.ctl.lstOrdenesDeTrabajo 	= this.getView ().down ("prod-lote-ot-Listado").controller;
		this.ctl.lstMateriales 			= this.getView ().down ("prod-lote-mat-Listado").controller;
		this.ctl.lstValesDeFabricacion	= this.getView ().down ("prod-lote-vf-Listado").controller;

		// Campo Producto
		this.ctl.CampoProducto = new CampoBusqueda ();
		this.ctl.CampoProducto.SetClaseModelo ('Sistema.view.Produccion.model.Producto');
		this.ctl.CampoProducto.SetClaseListado ('Sistema.view.Produccion.Producto.Listado');
		this.ctl.CampoProducto.SetClaseFormulario ('Sistema.view.Produccion.Producto.Formulario');
		this.ctl.CampoProducto.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/Producto/FormularioController.php');
		this.ctl.CampoProducto.SetController (this);
		this.ctl.CampoProducto.SetTextFieldCodigo ('tbCodProducto');
		this.ctl.CampoProducto.SetBtnVerRegistro ('btnVerProducto');
		this.ctl.CampoProducto.SetBtnBuscar ('btnBuscarProducto');

		this.ctl.CampoProducto.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbDescProducto.setValue (rec.get ('descripcionCorta'));
			me.ctl.tbCodProducto.setValue (rec.get ('codigo'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoProducto.onRegistroSeleccionadoError = function () {
			me.ctl.tbDescProducto.setValue ('');
			me.ctl.tbCodProducto.setValue ('');
		};

		// Campo Centro de Trabajo
		this.ctl.CampoCentroDeTrabajo = new CampoBusqueda ();
		this.ctl.CampoCentroDeTrabajo.SetClaseModelo ('Sistema.view.Produccion.model.CentroDeTrabajo');
		this.ctl.CampoCentroDeTrabajo.SetClaseListado ('Sistema.view.Produccion.CentroDeTrabajo.Listado');
		this.ctl.CampoCentroDeTrabajo.SetClaseFormulario ('Sistema.view.Produccion.CentroDeTrabajo.Formulario');
		this.ctl.CampoCentroDeTrabajo.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/CentroDeTrabajo/FormularioController.php');
		this.ctl.CampoCentroDeTrabajo.SetController (this);
		this.ctl.CampoCentroDeTrabajo.SetTextFieldCodigo ('tbCodCentroDeTrabajo');
		this.ctl.CampoCentroDeTrabajo.SetBtnVerRegistro ('btnVerCentroDeTrabajo');
		this.ctl.CampoCentroDeTrabajo.SetBtnBuscar ('btnBuscarCentroDeTrabajo');

		this.ctl.CampoCentroDeTrabajo.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbDescCentroDeTrabajo.setValue (rec.get ('nombre'));
			me.ctl.tbCodCentroDeTrabajo.setValue (rec.get ('codigo'));
			this.itemId = rec.get ('id');

			// Al cambiar el Centro de trabajo limpiamos los listados
			me.ctl.lstOrdenesDeTrabajo.LimpiarListado ();
			me.ctl.lstMateriales.LimpiarListado ();
		};

		this.ctl.CampoCentroDeTrabajo.onRegistroSeleccionadoError = function () {
			me.ctl.tbDescCentroDeTrabajo.setValue ('');
			me.ctl.tbCodCentroDeTrabajo.setValue ('');

			// Si sale mal tambien limpiamos los listados
			me.ctl.lstOrdenesDeTrabajo.LimpiarListado ();
			me.ctl.lstMateriales.LimpiarListado ();
		};

		// Asignamos algunos metodos a los listados.
		this.ctl.lstOrdenesDeTrabajo.ConfigurarListado (function () {me.SetDetalleModificado ();});
		this.ctl.lstOrdenesDeTrabajo.GetCentroDeTrabajo = function () {
			return me.ctl.CampoCentroDeTrabajo.itemId;
		};

		this.ctl.lstMateriales.ConfigurarListado (function () {me.SetDetalleModificado ();});
		this.ctl.lstMateriales.GetOrdenesDeTrabajo = function () {
			return me.params.registro.ordenesDeTrabajo ();
		};
	},

	// Calcula la formula de produccion a partir del listado de OTs
	CalcularFormulaDeProduccion: function () {
	},

    GetElementoFoco: function () {
    	return "textfield[name='tbCodCentroDeTrabajo']";
    },

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		this.params.registro = rec;

		this.ctl.lstOrdenesDeTrabajo.setStoreDetalle (rec.ordenesDeTrabajo ());
		this.ctl.lstValesDeFabricacion.setStoreDetalle (rec.valesDeFabricacion ());

		if (!esNuevo) {
			// Cargamos el CT a mano para que no borre la lista de OTs
			this.ctl.CampoCentroDeTrabajo.itemId = rec.get ('centroDeTrabajoId');
			this.ctl.tbCodCentroDeTrabajo.setValue (rec.get ('centroDeTrabajo').codigo);
			this.ctl.tbDescCentroDeTrabajo.setValue (rec.get ('centroDeTrabajo').nombre);

			this.ctl.CampoProducto.BuscarPorId (rec.get ('productoId'));
			this.ctl.tbComentario.setValue (rec.get ('comentario'));
			this.ctl.tbCodigo.setValue (rec.get ('id'));
			this.ctl.tbFechaCreacion.setValue (rec.get ('fechaCreacion'));

			this.ctl.lstMateriales.CalcularMateriales ();

		} else {
			this.ctl.tbFechaCreacion.setValue ('---');
		}
	},

	ObtenerRegistroDeFormulario: function () {
		this.params.registro.set ('productoId', this.ctl.CampoProducto.itemId);
		this.params.registro.set ('centroDeTrabajoId', this.ctl.CampoCentroDeTrabajo.itemId);
		this.params.registro.set ('comentario', this.ctl.tbComentario.value);

		return this.params.registro;
	}
});