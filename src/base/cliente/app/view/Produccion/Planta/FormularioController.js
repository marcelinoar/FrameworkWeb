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

Ext.define ('Sistema.view.Produccion.Planta.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-planta-FormularioController',

    init: function () {
    	FormularioControllerBase.InyectarDependencia (this, 'Sistema.view.Produccion.model.Planta', 'Produccion:Planta');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.onBtnGuardarClick
    		},
    		"prod-planta-Formulario": {
    			afterrender: this.onRender
    		},
    		"combo[name='cbPaisId']": {
    			select: this.onCbPaisIdChange
    		},
    		"combo[name='cbProvinciaId']": {
    			select: this.onCbProvinciaIdChange
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
		this.ctl.cbCiudadId.setValue (null);
    },

    onCbProvinciaIdChange: function (me, rec, opts) {
		this.ctl.cbCiudadId.store.load ({
			params: {
				fprovincia: me.value
			}
		});
		this.ctl.cbCiudadId.setValue (null);
    },

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 500;
    	ctl.params.altoVentana		= 350;
    },

	CargarComponentes: function () {
		var me = this;

		this.params.nombreEntidad = 'Planta de Produccion';
		this.ctl.tbNombre = this.getView ().down ("textfield[name='tbNombre']");
		this.ctl.cbPaisId = this.getView ().down ("combo[name='cbPaisId']");
		this.ctl.cbProvinciaId = this.getView ().down ("combo[name='cbProvinciaId']");
		this.ctl.cbCiudadId = this.getView ().down ("combo[name='cbCiudadId']");
		this.ctl.tbDireccion = this.getView ().down ("textfield[name='tbDireccion']");
		this.ctl.tbDescripcion = this.getView ().down ("textareafield[name='tbDescripcion']");
	},

    GetElementoFoco: function () {
    	return "textfield[name='tbNombre']";
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
					me.ctl.cbCiudadId.store.load ({
						params: {
							fprovincia: me.ctl.cbProvinciaId.value
						},

						callback: function () {
							me.ctl.cbCiudadId.setValue (rec.get ("ciudadId"));
						}
					});
				}
			});
		}

		this.ctl.tbNombre.setValue (rec.get ('nombre'));
		this.ctl.cbPaisId.setValue (rec.get ('paisId'));
		this.ctl.cbProvinciaId.setValue (rec.get ('provinciaId'));
		this.ctl.cbCiudadId.setValue (rec.get ('ciudadId'));
		this.ctl.tbDireccion.setValue (rec.get ('direccion'));
		this.ctl.tbDescripcion.setValue (rec.get ('descripcion'));
	},

	ObtenerRegistroDeFormulario: function () {
		this.params.registro.set ('nombre', this.ctl.tbNombre.value);
		this.params.registro.set ('paisId', this.ctl.cbPaisId.value);
		this.params.registro.set ('provinciaId', this.ctl.cbProvinciaId.value);
		this.params.registro.set ('ciudadId', this.ctl.cbCiudadId.value);
		this.params.registro.set ('direccion', this.ctl.tbDireccion.value);
		this.params.registro.set ('descripcion', this.ctl.tbDescripcion.value);

		return this.params.registro;
	}
});