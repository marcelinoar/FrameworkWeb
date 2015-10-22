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

Ext.define ('Sistema.view.Sistema.Ciudad.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sis-ciudad-FormularioController',

    init: function () {
    	FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Sistema.model.Ciudad', 'Sistema:Ciudad');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.onBtnGuardarClick
    		},
    		"sis-ciudad-Formulario": {
    			afterrender: this.onRender
    		},
    		"combo[name='cbPaisId']": {
    			select: this.onCbPaisIdChange
    		}
    	});
    },

    onCbPaisIdChange: function (me, rec, opts) {
		this.ctl.cbProvinciaId.store.load ({
			params: {
				fpais: me.value
			}
		});
		this.ctl.cbProvinciaId.setValue (null);
    },

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 500;
    	ctl.params.altoVentana		= 210;
    },

	CargarComponentes: function () {
		var me = this;

		this.params.nombreEntidad = 'Ciudad';
		this.ctl.cbPaisId = this.getView ().down ("combo[name='cbPaisId']");
		this.ctl.cbProvinciaId = this.getView ().down ("combo[name='cbProvinciaId']");
		this.ctl.tbNombre = this.getView ().down ("textfield[name='tbNombre']");
	},

    GetElementoFoco: function () {
    	return "combo[name='cbPaisId']";
    },

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		var me = this;

		this.params.registro = rec;
		this.ctl.cbPaisId.store.reload ();

		if (!esNuevo) {
			this.ctl.cbPaisId.setValue (rec.get ('paisId'));
			this.ctl.cbProvinciaId.store.load ({
				params: {
					fpais: me.ctl.cbPaisId.value
				},

				callback: function () {
					me.ctl.cbProvinciaId.setValue (rec.get ("provinciaId"));
				}
			});
		}
		this.ctl.tbNombre.setValue (rec.get ('nombre'));
	},

	ObtenerRegistroDeFormulario: function () {
		this.params.registro.set ('paisId', this.ctl.cbPaisId.value);
		this.params.registro.set ('provinciaId', this.ctl.cbProvinciaId.value);
		this.params.registro.set ('nombre', this.ctl.tbNombre.value);

		return this.params.registro;
	}
});