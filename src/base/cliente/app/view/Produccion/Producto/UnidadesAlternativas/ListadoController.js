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

Ext.define ('Sistema.view.Produccion.Producto.UnidadesAlernativas.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-producto-ua-ListadoController',

	params: {
		formularioCreacion		: 'Sistema.view.Produccion.Producto.UnidadesAlernativas.Formulario',
		tituloFormularioCreacion: 'Unidad de Medida',
		formularioEdicion		: 'Sistema.view.Produccion.Producto.UnidadesAlernativas.Formulario',
		tituloFormularioEdicion	: 'Unidad de Medida',
		xtypeListado			: 'prod-producto-ua-Listado',
		ventanaMaximizable		: false,
		ventanaMaximized		: false,
		ventanaModal			: true,
		verColEditar			: true,
		verColBorrar			: true
	},
	datosFormulario: null,

	//
	// Asignacion de EventHandlers para los controles de la vista.
	//
	init: function () {
		ListadoDetalleControllerBase.InyectarDependencia (this, 'Produccion:Operacion');

	   	this.control({
			"grid": {
				afterrender: this.onGrillaAfterRender,
				celldblclick: this.onListadoGrillaCellDblClick
			},
			"button[name='btnNuevo']": {
				click: this.onBtnNuevoClick
			}
	   });
	},

	GetOnNuevoParamsEntrada: function (params) {
		return ManejadorDeVentanas.ReqFormularioDetalle (null);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioDetalle (item);
	},

	renCodigoUnidadDeMedida: function (v) {
		return this.datosFormulario.GetValor ('unidadesDeMedida', 'unidadDeMedidaId', 'codigo', v);
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