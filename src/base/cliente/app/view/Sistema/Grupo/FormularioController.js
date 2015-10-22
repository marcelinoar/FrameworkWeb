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

Ext.define ('Sistema.view.Sistema.Grupo.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sis-grp-FormularioController',

    init: function () {
    	var me = this;

    	FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Sistema.model.Grupo', 'Sistema:Grupo');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.onBtnGuardarClick
    		},
    		"sis-grp-Formulario": {
    			afterrender: this.onRender
    		}
    	});

		this.info_formulario 	= null;
		this.esNuevo			= false;

		// Creamos un semaforo para que sincronice las dos transacciones que tiene el formulario.
    	this.semaforo = new Semaforo (2);
    	this.semaforo.Method = function () {
    		me.MostrarDatosAsinc ();
    	};
    },

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 900;
    	ctl.params.altoVentana		= 500;
    },

	CargarComponentes: function () {
		var me = this;

		this.params.nombreEntidad = 'Grupo';

		// Controles
		this.ctl.tbNombre = this.getView ().down ("textfield[name='tbNombre']");
		this.ctl.tbDescripcion = this.getView ().down ("textareafield[name='tbDescripcion']");

		// Campos Listado
		this.ctl.lstUsuarios 			= this.getView ().down ("sis-grp-usu-Listado").controller;
		this.ctl.lstEmpresas 			= this.getView ().down ("sis-grp-emp-Listado").controller;
		this.ctl.lstMenu				= this.getView ().down ("sis-grp-mnu-Listado").controller;
		this.ctl.lstPermisosEstandar	= this.getView ().down ("sis-grp-perm-Listado").controller;
		this.ctl.lstPermisosCustom 		= this.getView ().down ("sis-grp-pcus-Listado").controller;

		// Le pasamos a los listados detalle el callback para indicar si hubo cambios en el registro
		this.ctl.lstUsuarios.ConfigurarListado 			(function () {me.SetDetalleModificado ();});
		this.ctl.lstEmpresas.ConfigurarListado 			(function () {me.SetDetalleModificado ();});
		this.ctl.lstMenu.ConfigurarListado				(function () {me.SetDetalleModificado ();});
		this.ctl.lstPermisosEstandar.ConfigurarListado 	(function () {me.SetDetalleModificado ();});
		this.ctl.lstPermisosCustom.ConfigurarListado 	(function () {me.SetDetalleModificado ();});

		// Traigo la info del server.
		var consulta_form = new ConsultaWS ().Ejecutar ('Sistema', 'Grupo', 'FormularioController', 'GetInfoFormulario', null, function (resp) {
			if (this.RespuestaOK ()) {
				me.info_formulario = resp;
				me.semaforo.Set ();

			} else {
				Ext.Msg.alert('Error', this.GetMensajeRespuesta ());
			}
		});
	},

	//
	// Este metodo lo dispara el semaforo y se ejecuta cuando se terminaron de ejecutar los request que traen la info del formulario y el registro.
	//
	MostrarDatosAsinc: function () {
		this.ctl.tbNombre.setValue (this.params.registro.get ('nombre'));
		this.ctl.tbDescripcion.setValue (this.params.registro.get ('descripcion'));

		this.ctl.lstUsuarios.setStoreDetalle 		(this.params.registro.usuarios());
		this.ctl.lstEmpresas.setStoreDetalle 		(this.params.registro.empresas());
		this.ctl.lstPermisosCustom.CargarDatos 		(this.info_formulario.listadoPermisosCustom, this.params.registro.permisosCustom ());
		this.ctl.lstPermisosEstandar.CargarDatos 	(this.info_formulario.listadoPermisosEstandar, this.params.registro.permisosEstandar ());
	},

    GetElementoFoco: function () {
    	return "textfield[name='tbNombre']";
    },

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		this.params.registro = rec;
		this.esNuevo = esNuevo;

		// Le indica al tab que muestra el menu el id de la entidad.
		this.ctl.lstMenu.setModeloId (rec.get ('id'));

		this.semaforo.Set ();
	},

	ObtenerRegistroDeFormulario: function () {
		this.params.registro.set ('nombre', this.ctl.tbNombre.value);
		this.params.registro.set ('descripcion', this.ctl.tbDescripcion.value);
		this.ctl.lstPermisosCustom.ObtenerStoreModificado (this.params.registro.permisosCustom ());
		this.ctl.lstPermisosEstandar.ObtenerStoreModificado (this.params.registro.permisosEstandar ());
		this.params.registro.set ('menuItems', this.ctl.lstMenu.ObtenerRegistroModificado ());

		return this.params.registro;
	}
});