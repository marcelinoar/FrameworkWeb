/**************************************************************************************************
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Sistema.Permiso.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sis-permiso-ListadoController',

	init: function () {
    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnEditar']": {
    			click: this.onBtnEditarClick
    		},
    		"button[name='btnAgregar']": {
    			click: this.onBtnAgregarClick
    		},
    		"button[name='btnRefrescar']": {
    			click: this.onBtnRefrescarClick
    		},
    		"panel[name='PanelListado']": {
    			render: this.onPanelRender
    		},
			"treepanel[name='trPermisosTreePanel']": {
				selectionchange: this.onTreeSelectionChange
			}
    	});
	},

	onPanelRender : function () {
		this.getView ().down ("button[name='btnAgregar']").disable ();
		this.getView ().down ("button[name='btnBorrar']").disable ();
		this.getView ().down ("button[name='btnEditar']").disable ();
	},

	onBtnRefrescarClick: function () {
		this.RefrescarGrilla ();
	},

    onBtnBorrarClick: function (me, e, eOpts) {
    	var tree = this.getView ().down ("treepanel[name='trPermisosTreePanel']");
    	var selection = tree.getSelection ();
    	var me = this;

		if (selection.length > 1) {
			Ext.Msg.alert('Error', "Debe seleccionar un solo item de la grilla");

		} else if (selection.length == 0) {
			Ext.Msg.alert('Error', "Debe seleccionar un item de la grilla");

		} else {
			Ext.MessageBox.confirm('Borrar', 'Esta seguro de que desea borrar el registro?', function(btn){
				if(btn === 'yes'){
					var obj = Ext.create ('Sistema.view.Sistema.model.Permiso', {id: selection[0].get ('id')});
					obj.erase ({
						success: me.RefrescarGrilla ()
					});
				}
			});
		}
    },

    onBtnEditarClick: function (me, e, eOpts) {
		var me = this;
		var frm = Ext.create ('Sistema.view.Sistema.Permiso.Formulario', {});

		frm.paramsEntrada = ManejadorDeVentanas.ReqFormularioWS (this.selectedItem.get ('id'));
		frm.paramsEntrada.permisoPadre = null;

		win = Ext.create('Ext.window.Window', {
			title		: frm.controller.params.nombreEntidad + ': ' + 'Editar',
			height		: frm.controller.params.altoVentana,
			width		: frm.controller.params.anchoVentana,
			modal		: this.EsModal,
			maximizable	: this.EsMaximizable,
			maximized	: this.Maximizado,
			collapsible	: false,
			resizable	: true,
			layout		: 'fit',
			defaultFocus: frm.getController ().GetComponenteFoco (),
			listeners: {
				close: function () {
					me.RefrescarGrilla ()
				}
			}
		});

		win.add (frm);
		win.show ();
    },

    onBtnAgregarClick: function (me, e, eOpts) {
		var me = this;
		var frm = Ext.create ('Sistema.view.Sistema.Permiso.Formulario', {});

		frm.paramsEntrada = ManejadorDeVentanas.ReqFormularioWS (null);
		frm.paramsEntrada.permisoPadre = this.selectedItem;

		win = Ext.create('Ext.window.Window', {
			title		: frm.controller.params.nombreEntidad + ': ' + 'Crear',
			height		: frm.controller.params.altoVentana,
			width		: frm.controller.params.anchoVentana,
			modal		: this.EsModal,
			maximizable	: this.EsMaximizable,
			maximized	: this.Maximizado,
			collapsible	: false,
			resizable	: true,
			layout		: 'fit',
			defaultFocus: frm.getController ().GetComponenteFoco (),
			listeners: {
				close: function () {
					me.RefrescarGrilla ()
				}
			}
		});

		win.add (frm);
		win.show ();
    },

	onTreeSelectionChange: function (me, sel, eOpts) {
		// Si selecciona uno del medio
		if (sel.length == 1 && sel[0].parentNode != null) {
			this.getView ().down ("button[name='btnAgregar']").enable ();
			this.getView ().down ("button[name='btnBorrar']").enable ();
			this.getView ().down ("button[name='btnEditar']").enable ();

		// Si selecciona el raiz
		} else {
			this.getView ().down ("button[name='btnAgregar']").enable ();
			this.getView ().down ("button[name='btnBorrar']").disable ();
			this.getView ().down ("button[name='btnEditar']").disable ();
		}

		this.selectedItem = sel[0];
	},

	RefrescarGrilla: function () {
		var store = this.getView ().down ("treepanel[name='trPermisosTreePanel']").getStore();
		store.load();
	}
});