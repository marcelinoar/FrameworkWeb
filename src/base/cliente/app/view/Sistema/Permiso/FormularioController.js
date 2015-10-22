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

Ext.define ('Sistema.view.Sistema.Permiso.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sis-permiso-FormularioController',

    init: function () {
    	FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Sistema.model.Permiso', 'Sistema:Permiso');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.onBtnGuardarClick
    		},
    		"sis-permiso-Formulario": {
    			afterrender: this.onRender
    		}
    	});
    },

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 500;
    	ctl.params.altoVentana		= 230;
    },

	CargarComponentes: function () {
		var me = this;

		this.params.nombreEntidad = 'Permiso';
		this.ctl.tbNombre = this.getView ().down ("textfield[name='tbNombre']");
		this.ctl.tbCodigo = this.getView ().down ("textfield[name='tbCodigo']");
		this.ctl.tbDescripcion = this.getView ().down ("textareafield[name='tbDescripcion']");
	},

    GetElementoFoco: function () {
    	return "textfield[name='tbNombre']";
    },

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		this.params.registro = rec;

		this.ctl.tbNombre.setValue (rec.get ('nombre'));
		this.ctl.tbCodigo.setValue (rec.get ('codigo'));
		this.ctl.tbDescripcion.setValue (rec.get ('descripcion'));

	},

	ObtenerRegistroDeFormulario: function () {
		this.params.registro.set ('nombre', this.ctl.tbNombre.value);
		this.params.registro.set ('codigo', this.ctl.tbCodigo.value);
		this.params.registro.set ('descripcion', this.ctl.tbDescripcion.value);

		// Solo pasamos este parametro para la creacion.
		if (this.getView ().paramsEntrada.permisoPadre != null) {
			this.params.registro.set ('permisoPadre', this.getView().paramsEntrada.permisoPadre.get ('id'));
		}

		return this.params.registro;
	}
});