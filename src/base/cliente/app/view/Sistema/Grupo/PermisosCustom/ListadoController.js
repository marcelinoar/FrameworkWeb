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

Ext.define ('Sistema.view.Sistema.Grupo.PermisosCustom.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sis-grp-pcus-ListadoController',

	params: {
		formularioCreacion		: '',
		tituloFormularioCreacion: '',
		formularioEdicion		: '',
		tituloFormularioEdicion	: '',
		xtypeListado			: 'sis-grp-pcus-Listado',
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

	/**
	 *
	 * Carga la informacion recibida en la grilla.
	 *
	 * @param	tabla_vacia: Array de elementos que contienen los campos de la tabla vacia a mostrar
	 * @param	datos_registro: store de la entidad que contiene la info del objeto a mostrar
	 */

	CargarDatos: function (tabla_vacia, datos_registro) {
		var i;

		datos_registro.each (function (e) {
			for (i = 0; i < tabla_vacia.length; i++) {
				if (tabla_vacia[i].entidadId == e.get('entidadId') && tabla_vacia[i].permisoCustomId == e.get('permisoCustomId')) {
					tabla_vacia[i].aplicar = true;
				}
			}
		});

		this.getView ().down ('grid').store.loadData (tabla_vacia);
	},

	/**
	 *
	 * Recibe el store de la entidad y lo actualiza con los datos del listado.
	 *
	 * @param	store: Store de la entidad
	 */

	ObtenerStoreModificado: function (store) {
		var grilla;

		store.removeAll ();
		this.setModificado ();
		grilla = this.getView ().down ('grid');

		grilla.store.each (function (e) {
			if (e.get ('aplicar')) {
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