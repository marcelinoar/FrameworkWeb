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

Ext.define ('Sistema.view.Sistema.MenuItem.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sis-mnuitem-FormularioController',

    init: function () {
    	FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Sistema.model.MenuItem');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.onBtnGuardarClick
    		},
    		"sis-mnuitem-Formulario": {
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

		this.params.nombreEntidad = 'Menu Item';
		this.ctl.tbNombre = this.getView ().down ("textfield[name='tbNombre']");
		this.ctl.tbXtype = this.getView ().down ("textfield[name='tbXtype']");
		this.ctl.tbDescripcion = this.getView ().down ("textareafield[name='tbDescripcion']");
	},

    GetElementoFoco: function () {
    	return "textfield[name='tbNombre']";
    },

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		this.params.registro = rec;

		this.ctl.tbNombre.setValue (rec.get ('nombre'));
		this.ctl.tbXtype.setValue (rec.get ('xtype'));
		this.ctl.tbDescripcion.setValue (rec.get ('descripcion'));

	},

	ObtenerRegistroDeFormulario: function () {
		this.params.registro.set ('nombre', this.ctl.tbNombre.value);
		this.params.registro.set ('xtype', this.ctl.tbXtype.value);
		this.params.registro.set ('descripcion', this.ctl.tbDescripcion.value);

		// Solo pasamos este parametro para la creacion.
		if (this.getView ().paramsEntrada.parentMenuItem != null) {
			this.params.registro.set ('menuItemPadre', this.getView().paramsEntrada.parentMenuItem.get ('id'));
		}

		return this.params.registro;
	}
});