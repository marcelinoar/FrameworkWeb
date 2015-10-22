/**************************************************************************************************
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Desarrollo.DetalleFormulario.CampoListado.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.des-fdet-cd-FormularioController',

    init: function () {
    	FormularioDetalleControllerBase.InyectarDependencia (this, 'Sistema.view.Desarrollo.model.CampoListado',  'Desarrollo:DetalleFormulario');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.onBtnGuardarClick
    		},
    		"des-fdet-cd-Formulario": {
    			afterrender: this.onRender
    		}
    	});
    },

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 500;
    	ctl.params.altoVentana		= 400;
    },

	CargarComponentes: function () {
		var me = this;

		this.ctl.tbNombre = this.getView ().down ("textfield[name='tbNombre']");
		this.ctl.tbEtiqueta = this.getView ().down ("textfield[name='tbEtiqueta']");
		this.ctl.cbTipoCampoId = this.getView ().down ("combo[name='cbTipoCampoId']");
		this.ctl.tbAnchoColumna = this.getView ().down ("textfield[name='tbAnchoColumna']");
		this.ctl.ckEsFlex = this.getView ().down ("checkbox[name='ckEsFlex']");
		this.ctl.ckEsSubCampo = this.getView ().down ("checkbox[name='ckEsSubCampo']");
		this.ctl.tbNombreSubCampo = this.getView ().down ("textfield[name='tbNombreSubCampo']");

		this.ctl.cbTipoCampoId.store.load ();
	},

    GetElementoFoco: function () {
    	return "textfield[name='tbNombre']";
    },

	CargarRegistroEnFormulario: function (rec) {
		this.params.registro = rec;

		this.ctl.tbNombre.setValue (rec.get ('nombre'));
		this.ctl.tbEtiqueta.setValue (rec.get ('etiqueta'));
		this.ctl.cbTipoCampoId.setValue (rec.get ('tipoCampoId'));
		this.ctl.tbAnchoColumna.setValue (rec.get ('anchoColumna'));
		this.ctl.ckEsFlex.setValue (rec.get ('esFlex'));
		this.ctl.ckEsSubCampo.setValue (rec.get ('esSubCampo'));
		this.ctl.tbNombreSubCampo.setValue (rec.get ('nombreSubCampo'));
	},

	ObtenerRegistroDeFormulario: function () {
		this.params.registro.set ('nombre', this.ctl.tbNombre.value);
		this.params.registro.set ('etiqueta', this.ctl.tbEtiqueta.value);
		this.params.registro.set ('tipoCampoId', this.ctl.cbTipoCampoId.value);
		this.params.registro.set ('anchoColumna', this.ctl.tbAnchoColumna.value);
		this.params.registro.set ('esFlex', (this.ctl.ckEsFlex.value) ? 1 : 0);
		this.params.registro.set ('esSubCampo', (this.ctl.ckEsSubCampo.value) ? 1 : 0);
		this.params.registro.set ('nombreSubCampo', this.ctl.tbNombreSubCampo.value);

		return this.params.registro;
	}
});