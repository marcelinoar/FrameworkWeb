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

Ext.define ('Sistema.view.Sistema.Usuario.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sis-usu-FormularioController',

    init: function () {
    	FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Sistema.model.Usuario', 'Sistema:Usuario');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.myOnBtnGuardarClick
    		},
    		"sis-usu-Formulario": {
    			afterrender: this.myOnRender
    		}
    	});
    },

	//
	// Atajamos el evento OnRender para mostrar u ocultar el label del nombre de usuario
	// cuando editamos un registro o creamos uno nuevo.
	//
	myOnRender: function () {
		this.onRender ();

		if (this.getView ().paramsEntrada.modeloId != null) {
			this.getView ().down ("textfield[name='tbLoginName']").setHidden (true);
			this.getView ().down ("displayfield[name='lbLoginName']").setHidden (false);
		}
	},

	//
	// Atajamos el evento Guardar para comprobar que el password esta
	// igual en los dos controles.
	//
    myOnBtnGuardarClick: function () {
    	if (this.ctl.tbRePassword.value != this.ctl.tbPassword.value) {
    		Ext.Msg.alert('Error', 'Los passwors ingresados deben ser iguales');

    	} else {
	    	this.onBtnGuardarClick ();
	    }
    },

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 900;
    	ctl.params.altoVentana		= 600;
    },

	CargarComponentes: function () {
		var me = this;

		this.params.nombreEntidad = 'Usuario';
		this.ctl.tbLoginName 		= this.getView ().down ("textfield[name='tbLoginName']");
		this.ctl.lbLoginName		= this.getView ().down ("displayfield[name='lbLoginName']");
		this.ctl.tbPassword 		= this.getView ().down ("textfield[name='tbPassword']");
		this.ctl.tbRePassword 		= this.getView ().down ("textfield[name='tbRePassword']");
		this.ctl.tbEmail 			= this.getView ().down ("textfield[name='tbEmail']");
		this.ctl.tbEmpleadoId 		= this.getView ().down ("textfield[name='tbEmpleadoId']");
		this.ctl.tbComentario 		= this.getView ().down ("textareafield[name='tbComentario']");
		this.ctl.tbNombreEmpleado 	= this.getView ().down ("textfield[name='tbNombreEmpleado']");

		this.ctl.lstGrupos 	= this.getView ().down ("sis-usu-grp-Listado").controller;

		this.ctl.CampoEmpleado = new CampoBusqueda ();
		this.ctl.CampoEmpleado.SetClaseModelo ('Sistema.view.Empresa.model.Empleado');
		this.ctl.CampoEmpleado.SetClaseListado ('Sistema.view.Empresa.Empleado.Listado');
		this.ctl.CampoEmpleado.SetUrlBusqueda ('Server/Sysgran/Aplicacion/Modulos/Empresa/Empleado/FormularioController.php');
		this.ctl.CampoEmpleado.SetController (this);
		this.ctl.CampoEmpleado.SetTextFieldCodigo ('tbEmpleadoId');
		this.ctl.CampoEmpleado.SetBtnBuscar ('btnBuscarEmpleado');

		this.ctl.CampoEmpleado.onRegistroSeleccionadoOk = function (rec) {
			me.ctl.tbEmpleadoId.setValue (rec.get ('nroLegajo'));
			me.ctl.tbNombreEmpleado.setValue (rec.get ('nombre') + " " + rec.get ('apellido'));
			this.itemId = rec.get ('empleadoId');
		};

		this.ctl.CampoEmpleado.onRegistroSeleccionadoError = function () {
			me.ctl.tbEmpleadoId.setValue ('');
			me.ctl.tbNombreEmpleado.setValue ('');

			Ext.Msg.alert('Error', 'Codigo inexistente');
		};

		this.ctl.lstGrupos.ConfigurarListado (function () {me.SetDetalleModificado ();});
	},

    GetElementoFoco: function () {
    	return "textfield[name='tbLoginName']";
    },

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		this.params.registro = rec;

		// Si editamos un registro existente no requerimos que ponga password ni que cambie el nombre de usuario.
		if (!esNuevo) {
			this.ctl.tbPassword.allowBlank = true;
			this.ctl.tbRePassword.allowBlank = true;
		}

		this.ctl.lbLoginName.setValue (rec.get ('loginName'));
		this.ctl.tbEmail.setValue (rec.get ('email'));
		this.ctl.tbComentario.setValue (rec.get ('comentario'));
		this.ctl.CampoEmpleado.BuscarPorId (rec.get ('empleadoId'));

		this.ctl.lstGrupos.setStoreDetalle (rec.grupos());
	},

	ObtenerRegistroDeFormulario: function () {
		this.params.registro.set ('loginName', this.ctl.tbLoginName.value);
		this.params.registro.set ('password', this.ctl.tbPassword.value);
		this.params.registro.set ('email', this.ctl.tbEmail.value);
		this.params.registro.set ('empleadoId', this.ctl.CampoEmpleado.itemId);
		this.params.registro.set ('comentario', this.ctl.tbComentario.value);

		return this.params.registro;
	}
});