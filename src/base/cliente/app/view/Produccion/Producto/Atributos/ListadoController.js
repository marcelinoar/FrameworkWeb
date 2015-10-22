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

Ext.define ('Sistema.view.Produccion.Producto.Atributos.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-producto-att-ListadoController',

	params: {
		formularioCreacion		: 'Sistema.view.Produccion.Producto.Atributos.Formulario',
		tituloFormularioCreacion: 'Atributo',
		formularioEdicion		: 'Sistema.view.Produccion.Producto.Atributos.Formulario',
		tituloFormularioEdicion	: 'Atributo',
		xtypeListado			: 'prod-producto-att-Listado',
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