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

Ext.define ('Sistema.view.Produccion.TipoMovimientoStock.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-tmov-FormularioController',
	requires: [
		'Sistema.view.Produccion.model.TipoMovimientoStock'
	],

    init: function () {
    	FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Produccion.model.TipoMovimientoStock', 'Produccion:TipoMovimientoStock');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.onBtnGuardarClick
    		},
    		"prod-tmov-Formulario": {
    			afterrender: this.onRender
    		}
    	});
    },

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 600;
    	ctl.params.altoVentana		= 350;
    },

	CargarComponentes: function () {
		var me = this;

		this.params.nombreEntidad = 'Tipo de Movimiento de Stock';
		this.ctl.tbCodigo = this.getView ().down ("textfield[name='tbCodigo']");
		this.ctl.tbDescripcionCorta = this.getView ().down ("textfield[name='tbDescripcionCorta']");
		this.ctl.tbDescripcionLarga = this.getView ().down ("textareafield[name='tbDescripcionLarga']");
		this.ctl.ckRequiereLoteFabricacion = this.getView ().down ("checkbox[name='ckRequiereLoteFabricacion']");
		this.ctl.ckRequiereLoteCompras = this.getView ().down ("checkbox[name='ckRequiereLoteCompras']");
		this.ctl.ckRequiereOT = this.getView ().down ("checkbox[name='ckRequiereOT']");
		this.ctl.ckRequiereFormulaDeFabricacion = this.getView ().down ("checkbox[name='ckRequiereFormulaDeFabricacion']");
		this.ctl.ckRequierePVenta = this.getView ().down ("checkbox[name='ckRequierePVenta']");
		this.ctl.ckRequiereOCompra = this.getView ().down ("checkbox[name='ckRequiereOCompra']");
		this.ctl.ckOrigenNull = this.getView ().down ("checkbox[name='ckOrigenNull']");
		this.ctl.ckDestinoNull = this.getView ().down ("checkbox[name='ckDestinoNull']");
	},

    GetElementoFoco: function () {
    	return "textfield[name='tbCodigo']";
    },

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		this.params.registro = rec;

		this.ctl.tbCodigo.setValue (rec.get ('codigo'));
		this.ctl.tbDescripcionCorta.setValue (rec.get ('descripcionCorta'));
		this.ctl.tbDescripcionLarga.setValue (rec.get ('descripcionLarga'));
		this.ctl.ckRequiereLoteFabricacion.setValue (rec.get ('requiereLoteFabricacion'));
		this.ctl.ckRequiereLoteCompras.setValue (rec.get ('requiereLoteCompras'));
		this.ctl.ckRequiereOT.setValue (rec.get ('requiereOT'));
		this.ctl.ckRequiereFormulaDeFabricacion.setValue (rec.get ('requiereFormulaDeFabricacion'));
		this.ctl.ckRequierePVenta.setValue (rec.get ('requierePVenta'));
		this.ctl.ckRequiereOCompra.setValue (rec.get ('requiereOCompra'));
		this.ctl.ckOrigenNull.setValue (rec.get ('origenNull'));
		this.ctl.ckDestinoNull.setValue (rec.get ('destinoNull'));
	},

	ObtenerRegistroDeFormulario: function () {
		this.params.registro.set ('codigo', this.ctl.tbCodigo.value);
		this.params.registro.set ('descripcionCorta', this.ctl.tbDescripcionCorta.value);
		this.params.registro.set ('descripcionLarga', this.ctl.tbDescripcionLarga.value);
		this.params.registro.set ('requiereLoteFabricacion', (LibGeneral.IsChecked (this.ctl.ckRequiereLoteFabricacion)));
		this.params.registro.set ('requiereLoteCompras', (LibGeneral.IsChecked (this.ctl.ckRequiereLoteCompras)));
		this.params.registro.set ('requiereOT', (LibGeneral.IsChecked (this.ctl.ckRequiereOT)));
		this.params.registro.set ('requiereFormulaDeFabricacion', (LibGeneral.IsChecked (this.ctl.ckRequiereFormulaDeFabricacion)));
		this.params.registro.set ('requierePVenta', (LibGeneral.IsChecked (this.ctl.ckRequierePVenta)));
		this.params.registro.set ('requiereOCompra', (LibGeneral.IsChecked (this.ctl.ckRequiereOCompra)));
		this.params.registro.set ('origenNull', (LibGeneral.IsChecked (this.ctl.ckOrigenNull)));
		this.params.registro.set ('destinoNull', (LibGeneral.IsChecked (this.ctl.ckDestinoNull)));

		return this.params.registro;
	}
});