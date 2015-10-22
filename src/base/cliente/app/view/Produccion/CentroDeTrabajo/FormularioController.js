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

Ext.define ('Sistema.view.Produccion.CentroDeTrabajo.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-ct-FormularioController',

    init: function () {
    	FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Produccion.model.CentroDeTrabajo', 'Produccion:CentroDeTrabajo');

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
    		"prod-ct-Formulario": {
    			afterrender: this.onRender
    		},
			"button[name='btnBuscarPlanta']": {
				click: this.onBtnBuscarPlantaClick
			},
			"textfield[name='tbPlantaId']": {
				specialkey: this.onTbPlantaIdSpecialKey
			},
			"button[name='btnBuscarAlmacenAsociado']": {
				click: this.onBtnBuscarAlmacenAsociadoClick
			},
			"textfield[name='tbCodAlmacenAsociado']": {
				specialkey: this.onTbCodAlmacenAsociadoSpecialKey,
				change: this.tbChangeToUpperCase
			}
    	});
    },

	//---------- Handlers de los eventos de los botones de busqueda ----------
    onBtnBuscarAlmacenAsociadoClick: function () {
    	this.ctl.CampoAlmacenAsociado.AbrirVentanaBusqueda ();
    },

    onTbCodAlmacenAsociadoSpecialKey: function (f, e) {
    	if (e.getKey () == e.ENTER || e.getKey () == e.TAB) {
    		this.ctl.CampoAlmacenAsociado.BuscarPorCodigo (f.value);
    	}
    },

	onBtnBuscarPlantaClick: function () {
		this.ctl.CampoPlanta.AbrirVentanaBusqueda ();
	},

	onTbPlantaIdSpecialKey: function (f, e) {
    	if (e.getKey () == e.ENTER || e.getKey () == e.TAB) {
    		this.ctl.CampoPlanta.BuscarPorId (f.value);
    	}
	},

	//---------- Handlers eventos estandar del formulario ----------

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 900;
    	ctl.params.altoVentana		= 490;
    },

	CargarComponentes: function () {
		var me = this;

		// Componentes del formulario
		this.params.nombreEntidad 			= 'Centro de Trabajo';
		this.ctl.tbNombre 					= this.getView ().down ("textfield[name='tbNombre']");
		this.ctl.tbCodigo 					= this.getView ().down ("textfield[name='tbCodigo']");
		this.ctl.tbPlantaId 				= this.getView ().down ("textfield[name='tbPlantaId']");
		this.ctl.tbNombrePlanta				= this.getView ().down ("textfield[name='tbNombrePlanta']");
		this.ctl.tbCodAlmacenAsociado 		= this.getView ().down ("textfield[name='tbCodAlmacenAsociado']");
		this.ctl.ckGeneraPallet 			= this.getView ().down ("checkbox[name='ckGeneraPallet']");
		this.ctl.ckOrganizaPorLote 			= this.getView ().down ("checkbox[name='ckOrganizaPorLote']");
		this.ctl.tbNombreAlmacenAsociado 	= this.getView ().down ("textfield[name='tbNombreAlmacenAsociado']");

		// Listados
		this.ctl.lstMaquinas 	= this.getView ().down ("prod-ct-maq-Listado").controller;
		this.ctl.lstAtributos 	= this.getView ().down ("prod-ct-att-Listado").controller;
		this.ctl.lstOperaciones	= this.getView ().down ("prod-ct-oper-Listado").controller;

		this.ctl.lstMaquinas.ConfigurarListado (function () {me.SetDetalleModificado ();}, this.params.permisos);
		this.ctl.lstAtributos.ConfigurarListado (function () {me.SetDetalleModificado ();}, this.params.permisos);
		this.ctl.lstOperaciones.ConfigurarListado (function () {me.SetDetalleModificado ();}, this.params.permisos);

		// Inicializa el componente de busqueda de Almacen Asociado
		this.ctl.CampoAlmacenAsociado = new CampoBusqueda ();
		this.ctl.CampoAlmacenAsociado.SetClaseModelo ('Sistema.view.Produccion.model.Almacen');
		this.ctl.CampoAlmacenAsociado.SetClaseListado ('Sistema.view.Produccion.Almacen.Listado');
		this.ctl.CampoAlmacenAsociado.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/Almacen/FormularioController.php');

		this.ctl.CampoAlmacenAsociado.onRegistroSeleccionadoOk = function (rec) {
			this.itemId = rec.get ('id');
			me.ctl.tbCodAlmacenAsociado.setValue (rec.get ('codigo'));
			me.ctl.tbNombreAlmacenAsociado.setValue (rec.get ('descripcionCorta'));
		};

		this.ctl.CampoAlmacenAsociado.onRegistroSeleccionadoError = function () {
			me.ctl.tbCodAlmacenAsociado.setValue ('');
			me.ctl.tbNombreAlmacenAsociado.setValue ('');
		};

		// Inicializa el componente de busqueda de Linea de Produccion
		this.ctl.CampoPlanta = new CampoBusqueda ();
		this.ctl.CampoPlanta.SetClaseModelo ('Sistema.view.Produccion.model.Planta');
		this.ctl.CampoPlanta.SetClaseListado ('Sistema.view.Produccion.Planta.Listado');
		this.ctl.CampoPlanta.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Produccion/Planta/FormularioController.php');

		this.ctl.CampoPlanta.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbPlantaId.setValue (rec.get ('id'));
			me.ctl.tbNombrePlanta.setValue (rec.get ('nombre'));
			this.itemId = rec.get ('id');
		};

		this.ctl.CampoPlanta.onRegistroSeleccionadoError = function () {
			me.ctl.tbPlantaId.setValue ('');
			me.ctl.tbNombrePlanta.setValue ('');

			Ext.Msg.alert('Error', 'Codigo inexistente');
		};
	},

    GetElementoFoco: function () {
    	return "textfield[name='tbCodigo']";
    },

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		this.params.registro = rec;

		this.ctl.tbNombre.setValue (rec.get ('nombre'));
		this.ctl.tbCodigo.setValue (rec.get ('codigo'));
		this.ctl.ckGeneraPallet.setValue (rec.get ('generaPallet'));
		this.ctl.ckOrganizaPorLote.setValue (rec.get ('organizaPorLote'));

		// Cargamos los componentes de busqueda.
		if (!esNuevo) {
			this.ctl.CampoPlanta.BuscarPorId (rec.get ('plantaId'));
			this.ctl.CampoAlmacenAsociado.BuscarPorId (rec.get ('almacenAsociadoId'));
		}

		this.ctl.lstMaquinas.setStoreDetalle (rec.maquinas ());
		this.ctl.lstAtributos.setStoreDetalle (rec.atributos ());
		this.ctl.lstOperaciones.setStoreDetalle (rec.operaciones ());
		this.ctl.tbCodigo.setReadOnly (!esNuevo);
	},

	ObtenerRegistroDeFormulario: function () {
		this.params.registro.set ('nombre', this.ctl.tbNombre.value);
		this.params.registro.set ('codigo', this.ctl.tbCodigo.value);
		this.params.registro.set ('plantaId', this.ctl.CampoPlanta.itemId);
		this.params.registro.set ('almacenAsociadoId', this.ctl.CampoAlmacenAsociado.itemId);
		this.params.registro.set ('generaPallet', (LibGeneral.IsChecked (this.ctl.ckGeneraPallet)));
		this.params.registro.set ('organizaPorLote', (LibGeneral.IsChecked (this.ctl.ckOrganizaPorLote)));

		return this.params.registro;
	}
});