/**************************************************************************************************
 * ---------------- ARCHIVO GENERADO AUTOMATICAMENTE ----------------
 * Archivo: ListadoController.js
 * ------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Sistema.Grupo.PermisosEstandar.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sis-grp-perm-ListadoController',

	params: {
		formularioCreacion		: '',
		tituloFormularioCreacion: '',
		formularioEdicion		: '',
		tituloFormularioEdicion	: '',
		xtypeListado			: 'sis-grp-perm-Listado',
		ventanaMaximizable		: false,
		ventanaMaximized		: false,
		ventanaModal			: true,
		verColEditar			: false,
		verColBorrar			: false
	},

	//
	// Asignacion de EventHandlers para los controles de la vista.
	//
	init: function () {
		ListadoDetalleControllerBase.InyectarDependencia (this, 'Sistema:Grupo');

	   	this.control({
			"grid": {
				afterrender: this.onGrillaAfterRender,
				celldblclick: this.onListadoGrillaCellDblClick
			},
			"button[name='btnNuevo']": {
				click: this.onBtnNuevoClick
			},
			"button[name='btnRecargarListado']": {
				click: this.onBtnRecargarListadoClick
			}
	   });
	},

	//---------- Metodos Publicos ----------

	CargarDatos: function (tabla_vacia, datos_registro) {
		var i;

		datos_registro.each (function (e) {
			for (i = 0; i < tabla_vacia.length; i++) {
				if (tabla_vacia[i].entidadId == e.get('entidadId')) {
					tabla_vacia[i].verListado 		= e.get ('verListado');
					tabla_vacia[i].verRegistro 		= e.get ('verRegistro');
					tabla_vacia[i].crearRegistro	= e.get ('crearRegistro');
					tabla_vacia[i].borrarRegistro	= e.get ('borrarRegistro');
					tabla_vacia[i].modificarRegistro= e.get ('modificarRegistro');
				}
			}
		});

		this.getView ().down ('grid').store.loadData (tabla_vacia);
	},

	ObtenerStoreModificado: function (store) {
		var grilla;

		store.removeAll ();
		this.setModificado ();
		grilla = this.getView ().down ('grid');

		grilla.store.each (function (e) {
			if (e.get ('verListado') || e.get ('verRegistro') || e.get ('crearRegistro') || e.get ('borrarRegistro') || e.get ('modificarRegistro')) {
				store.add (e);
			}
		});
	},

	//---------- Metodos Privados ----------

	GetOnNuevoParamsEntrada: function (params) {
		return ManejadorDeVentanas.ReqFormularioDetalle (null);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioDetalle (item);
	}
});