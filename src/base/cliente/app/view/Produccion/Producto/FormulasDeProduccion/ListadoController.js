/**************************************************************************************************
 * Archivo: ListadoController.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.Producto.FormulasDeProduccion.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-producto-frm-ListadoController',

	params: {
		formularioCreacion		: 'Sistema.view.Produccion.FormulaDeProduccion.Listado',
		tituloFormularioCreacion: '',
		formularioEdicion		: 'Sistema.view.Produccion.FormulaDeProduccion.Formulario',
		tituloFormularioEdicion	: 'Formula de Produccion - Producto',
		xtypeListado			: 'prod-producto-frm-Listado',
		ventanaMaximizable		: false,
		ventanaMaximized		: false,
		ventanaModal			: true,
		verColEditar			: true,
		verColBorrar			: true
	},

	//
	// Asignacion de EventHandlers para los controles de la vista.
	//
	init: function () {
		ListadoDetalleControllerBase.InyectarDependencia (this, 'Produccion:Producto');

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
			},
			"checkcolumn": {
				checkchange: this.onCheckChange
			}
	   });
	},

	/**
	 *
	 * Revisa el listado de formulas y devuelve la formula principal (si es que existe), o nulo
	 *
	 * @return	Devuelve la formula principal o null.
	 */

	GetFormulaPrincipal: function () {
		var store = this.getView ().down ("grid").getStore ();
		var ret = null;

		store.each (function (rec, idx) {
			if (rec.get ('esFormulaPrincipal')) {
				ret = rec;
			}
		});

		return ret;
	},

	GetOnNuevoParamsEntrada: function (params) {
		return ManejadorDeVentanas.ReqListadoWS (true, false, null, ModoEjecucionListado.Seleccion, true, true);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioWS (item.get ('id'));
	},

	onCheckChange: function (th, rowIndex, checked, eOpts ) {
		var store = this.getView ().down ("grid").getStore ();

		if (checked) {
			store.each (function (rec, idx) {
				if (idx != rowIndex) {
					rec.set ('esFormulaPrincipal', false);
				}
			});
		}

		this.setModificado ();
	}
});