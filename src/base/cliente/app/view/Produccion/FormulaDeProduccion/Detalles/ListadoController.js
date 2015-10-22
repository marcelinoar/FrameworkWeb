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

Ext.define ('Sistema.view.Produccion.FormulaDeProduccion.Detalles.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-form-det-ListadoController',

	params: {
		formularioCreacion		: 'Sistema.view.Produccion.FormulaDeProduccion.Detalles.Formulario',
		tituloFormularioCreacion: 'Nuevo Elemento',
		formularioEdicion		: 'Sistema.view.Produccion.FormulaDeProduccion.Detalles.Formulario',
		tituloFormularioEdicion	: 'Edicion de Elemento',
		xtypeListado			: 'prod-form-det-Listado',
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
		ListadoDetalleControllerBase.InyectarDependencia (this, 'Produccion:FormulaDeProduccion');

	   	this.control({
			"grid": {
				afterrender: this.onGrillaAfterRender,
				celldblclick: this.onListadoGrillaCellDblClick
			},
			"button[name='btnNuevo']": {
				click: this.onBtnNuevoClick
			}
	   });

	   this.datosFormulario = null;
	},

	renCodigoUnidadDeMedida: function (v) {
		return this.datosFormulario.GetValor ('unidadesDeMedida', 'unidadDeMedidaId', 'codigo', v);
	},

	GetOnNuevoParamsEntrada: function (params) {
		return ManejadorDeVentanas.ReqFormularioDetalle (null);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioDetalle (item);
	},
	// ----------------------- Metodos Publicos -----------------------
	//
	// Pisa la copia actual de InfoMonedas con la que carga el formulario maestro.
	//
	// Setea el valor de datosFormulario
	//
	SetDatosFormulario: function (datos) {
		this.datosFormulario = datos;
	}
});