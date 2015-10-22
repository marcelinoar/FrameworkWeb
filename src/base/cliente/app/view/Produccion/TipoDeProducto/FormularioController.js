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

Ext.define ('Sistema.view.Produccion.TipoDeProducto.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-tprod-FormularioController',

    init: function () {
    	FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Produccion.model.TipoDeProducto', 'Produccion:TipoDeProducto');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.onBtnGuardarClick
    		},
    		"prod-tprod-Formulario": {
    			afterrender: this.onRender
    		}
    	});
    },

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 500;
    	ctl.params.altoVentana		= 220;
    },

	CargarComponentes: function () {
		var me = this;

		this.params.nombreEntidad = 'Tipo de Producto';
		this.ctl.tbNombre = this.getView ().down ("textfield[name='tbNombre']");
		this.ctl.ckEsProductoDeCompras = this.getView ().down ("checkbox[name='ckEsProductoDeCompras']");
		this.ctl.ckEsProductoDeVentas = this.getView ().down ("checkbox[name='ckEsProductoDeVentas']");
		this.ctl.ckEsProductoDeFabricacion = this.getView ().down ("checkbox[name='ckEsProductoDeFabricacion']");


	},

    GetElementoFoco: function () {
    	return "textfield[name='tbNombre']";
    },

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		this.params.registro = rec;

		this.ctl.tbNombre.setValue (rec.get ('nombre'));
		this.ctl.ckEsProductoDeCompras.setValue (rec.get ('esProductoDeCompras'));
		this.ctl.ckEsProductoDeVentas.setValue (rec.get ('esProductoDeVentas'));
		this.ctl.ckEsProductoDeFabricacion.setValue (rec.get ('esProductoDeFabricacion'));

	},

	ObtenerRegistroDeFormulario: function () {
		this.params.registro.set ('nombre', this.ctl.tbNombre.value);
		this.params.registro.set ('esProductoDeCompras', (LibGeneral.IsChecked (this.ctl.ckEsProductoDeCompras)));
		this.params.registro.set ('esProductoDeVentas', (LibGeneral.IsChecked (this.ctl.ckEsProductoDeVentas)));
		this.params.registro.set ('esProductoDeFabricacion', (LibGeneral.IsChecked (this.ctl.ckEsProductoDeFabricacion)));

		return this.params.registro;
	}
});