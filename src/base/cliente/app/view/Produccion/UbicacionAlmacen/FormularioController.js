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

Ext.define ('Sistema.view.Produccion.UbicacionAlmacen.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-ubic-FormularioController',
	requires: [
		'Sistema.view.Produccion.model.UbicacionAlmacen'
	],

    init: function () {
    	FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Produccion.model.UbicacionAlmacen', 'Produccion:UbicacionAlmacen');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.onBtnGuardarClick
    		},
			"textfield[name='tbCodigo']": {
				change: this.tbChangeToUpperCase
			},
    		"prod-ubic-Formulario": {
    			afterrender: this.onRender
    		}
    	});
    },

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 500;
    	ctl.params.altoVentana		= 290;
    },

	CargarComponentes: function () {
		var me = this;

		this.params.nombreEntidad = 'Ubicacion';
		this.ctl.tbCodigo = this.getView ().down ("textfield[name='tbCodigo']");
		this.ctl.tbDescripcion = this.getView ().down ("textareafield[name='tbDescripcion']");
		this.ctl.tbCodAlmacen = this.getView ().down ("textfield[name='tbCodAlmacen']");
		this.ctl.tbDescAlmacen = this.getView ().down ("textfield[name='tbDescAlmacen']");
		this.ctl.tbCodZona = this.getView ().down ("textfield[name='tbCodZona']");
		this.ctl.tbDescZona = this.getView ().down ("textfield[name='tbDescZona']");
		this.ctl.tbCodArea = this.getView ().down ("textfield[name='tbCodArea']");
		this.ctl.tbDescArea = this.getView ().down ("textfield[name='tbDescArea']");

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

		// Campo Zona
		this.ctl.CampoZona = new CampoBusqueda ();
		this.ctl.CampoZona.SetClaseModelo ('Sistema.view.Produccion.model.ZonaStock');
		this.ctl.CampoZona.SetClaseListado ('Sistema.view.Produccion.ZonaStock.Listado');
		this.ctl.CampoZona.SetClaseFormulario ('Sistema.view.Produccion.ZonaStock.Formulario');
		this.ctl.CampoZona.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/ZonaStock/FormularioController.php');
		this.ctl.CampoZona.SetController (this);
		this.ctl.CampoZona.SetTextFieldCodigo ('tbCodZona');
		this.ctl.CampoZona.SetBtnBuscar ('btnBuscarZona');

		this.ctl.CampoZona.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodZona.setValue (rec.get ('codigo'));
			me.ctl.tbDescZona.setValue (rec.get ('descripcion'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoZona.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodZona.setValue ('');
			me.ctl.tbDescZona.setValue ('');
		};

		// Campo Area
		this.ctl.CampoArea = new CampoBusqueda ();
		this.ctl.CampoArea.SetClaseModelo ('Sistema.view.Produccion.model.AreaStock');
		this.ctl.CampoArea.SetClaseListado ('Sistema.view.Produccion.AreaStock.Listado');
		this.ctl.CampoArea.SetClaseFormulario ('Sistema.view.Produccion.AreaStock.Formulario');
		this.ctl.CampoArea.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/AreaStock/FormularioController.php');
		this.ctl.CampoArea.SetController (this);
		this.ctl.CampoArea.SetTextFieldCodigo ('tbCodArea');
		this.ctl.CampoArea.SetBtnBuscar ('btnBuscarArea');

		this.ctl.CampoArea.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbCodArea.setValue (rec.get ('codigo'));
			me.ctl.tbDescArea.setValue (rec.get ('descripcion'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoArea.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodArea.setValue ('');
			me.ctl.tbDescArea.setValue ('');
		};
	},

    GetElementoFoco: function () {
    	return "textfield[name='tbCodigo']";
    },

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		this.params.registro = rec;

		this.ctl.tbCodigo.setValue (rec.get ('codigo'));
		this.ctl.tbDescripcion.setValue (rec.get ('descripcion'));
		this.ctl.CampoAlmacen.BuscarPorId (rec.get ('almacenId'));
		this.ctl.CampoZona.BuscarPorId (rec.get ('zonaStockId'));
		this.ctl.CampoArea.BuscarPorId (rec.get ('areaStockId'));

		this.ctl.tbCodigo.setReadOnly (!esNuevo);
	},

	ObtenerRegistroDeFormulario: function () {
		if (!this.ValidarFormulario ()) {
			return null;
		}

		this.params.registro.set ('codigo', this.ctl.tbCodigo.value);
		this.params.registro.set ('almacenId', this.ctl.CampoAlmacen.itemId);
		this.params.registro.set ('zonaStockId', this.ctl.CampoZona.itemId);
		this.params.registro.set ('areaStockId', this.ctl.CampoArea.itemId);
		this.params.registro.set ('descripcion', this.ctl.tbDescripcion.value);

		return this.params.registro;
	},

	ValidarFormulario: function () {
		if (this.ctl.CampoAlmacen.itemId == 0) {
			Ext.Msg.alert('Error', 'Debe seleccionar un Almacen');
			return false;
		}

		if (this.ctl.CampoZona.itemId == 0) {
			Ext.Msg.alert('Error', 'Debe seleccionar una Zona');
			return false;
		}

		if (this.ctl.CampoArea.itemId == 0) {
			Ext.Msg.alert('Error', 'Debe seleccionar un Area');
			return false;
		}

		return true;
	}
});