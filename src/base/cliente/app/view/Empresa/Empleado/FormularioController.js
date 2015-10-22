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

Ext.define ('Sistema.view.Empresa.Empleado.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.emp-empleado-FormularioController',

    init: function () {
    	FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Empresa.model.Empleado', 'Empresa:Empleado');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.onBtnGuardarClick
    		},
    		"emp-empleado-Formulario": {
    			afterrender: this.onRender
    		}
    	});
    },

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 500;
    	ctl.params.altoVentana		= 190;
    },

	CargarComponentes: function () {
		var me = this;

		this.params.nombreEntidad = 'Empleado';
		this.ctl.tbNombre = this.getView ().down ("textfield[name='tbNombre']");
		this.ctl.tbApellido = this.getView ().down ("textfield[name='tbApellido']");
		this.ctl.tbNroLegajo = this.getView ().down ("textfield[name='tbNroLegajo']");


	},

    GetElementoFoco: function () {
    	return "textfield[name='tbNombre']";
    },

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		this.params.registro = rec;

		this.ctl.tbNombre.setValue (rec.get ('nombre'));
		this.ctl.tbApellido.setValue (rec.get ('apellido'));
		this.ctl.tbNroLegajo.setValue (rec.get ('nroLegajo'));

	},

	ObtenerRegistroDeFormulario: function () {
		this.params.registro.set ('nombre', this.ctl.tbNombre.value);
		this.params.registro.set ('apellido', this.ctl.tbApellido.value);
		this.params.registro.set ('nroLegajo', this.ctl.tbNroLegajo.value);

		return this.params.registro;
	}
});