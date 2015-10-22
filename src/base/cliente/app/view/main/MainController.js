var sesionUsuario = Ext.create ("Sistema.model.InfoSesionCliente", {id:1});

Ext.define('Sistema.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Ext.MessageBox'
    ],
    alias: 'controller.main',
    ctl: {},

    // Despues de agregar un tab nuevo al panel lo estamos seleccionando. Como los listados ya se refrescan solos
    // al ser mostrados por primera vez no queremos refrescarlo dos veces, entonces guardamos el xtype de los listados
    // recien listados para no refrescarlos en el evento tabChange.
    tabNoRefrescar:'',

    init: function () {
    	var me = this;

    	this.control ({
    		"treepanel[name='trMainTreePanel']": {
    			cellclick: this.onTrMainTreePanelCellclick
    		},
    		"button[name='btnCerrarTodosTab']": {
    			click: this.onBtnCerrarTodosTabClick
    		},
    		"tabpanel[name='panel-central']": {
    			tabchange: this.onPanelCentralTabChange
    		}
    	});

    	this.ctl.panelCentral 			= this.getView ().down ("tabpanel[name='panel-central']");
    	this.ctl.lbHeaderFechaYEmpresa 	= this.getView ().down ("displayfield[name='lbHeaderFechaYEmpresa']");
    	this.ctl.btnMenuSistema			= this.getView ().down ("button[name='btnMenuSistema']");

		sesionUsuario.load ({
			success: function(rec) {
				me.MostrarDatosDeSesion (rec.get ('loginName'), rec.get ('fecha'), rec.get ('empresa'));
		    }
		});
    },

//--------------------- Eventos ---------------------

	/**
	 * Refrescamos el contenido de la pantalla que esta dentro del tab cada vez que se cambia de tab.
	 * Salvo los tabs recien creados, esos los filtramos.
	 */
	onPanelCentralTabChange: function (tabPanel, newCard) {
		if (newCard.getController () != null) {
			if (newCard.xtype == this.tabNoRefrescar) {
				this.tabNoRefrescar = '';

			} else {
				newCard.getController ().RefrescarGrilla ();
			}
		}
	},

	/**
	 * Cierra todos los tabs abiertos del panel central. Solo deja abierto el tab de inicio que se abre por default.
	 */
	onBtnCerrarTodosTabClick: function () {
		var me = this;

		this.ctl.panelCentral.items.each (function (tab) {
			if (tab.name != 'tabInicio') {
				me.ctl.panelCentral.remove (tab);
			}
		});
	},

	/**
	 * Abre la ventana de visualizacion del perfil de usuario.
	 */
	onBtnVerPerfilDeUsuarioClick: function () {
		win = Ext.create('Ext.window.Window', {
			title		: '',
			height		: frm.controller.params.altoVentana,
			width		: frm.controller.params.anchoVentana,
			modal		: this.EsModal,
			maximizable	: this.EsMaximizable,
			maximized	: this.Maximizado,
			collapsible	: false,
			resizable	: true,
			layout		: 'fit',
			defaultFocus: comp,
			listeners: {
				close: function () {
					me.ProcesarRespuesta (frm.datosRetorno);
				}
			}
		});

		win.add (frm);
		win.show ();
	},

	/**
	 * Cierra la sesion de usuario.
	 */
	onBtnLogout: function () {
		window.location = 'login.php';
	},

	onTrMainTreePanelCellclick: function (me, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
		var xtype = record.get ("xtype");
		var es_hoja = record.get ("esHoja");
		var es_raiz = record.get ("esRaiz");
		var tabs;
		var panel;

		if (es_hoja) {
			tabs = Ext.ComponentQuery.query ("tabpanel[name='panel-central'] panel[xtype='" + record.get ("xtype") + "']");
			panel = Ext.ComponentQuery.query ("tabpanel[name='panel-central']")[0];

			if (tabs.length == 0) {
				// Creamos el listado.
				var comp = panel.add ({
					xtype: record.get ("xtype"),
					title: record.get ("nombre"),
					closable: true
				});

				// Marcamos el tab recien creado para que no sea refrescado en el evento onTabChange
				this.tabNoRefrescar = record.get ('xtype');

				comp.getController ().params.modoEjecucion = ModoEjecucionListado.Vista;

				// Lo agreamos al tabPanel.
				panel.setActiveTab (comp);

			} else {
				panel.setActiveTab (tabs[0]);
			}
		}
	},

	MostrarDatosDeSesion: function (usuario, fecha, empresa) {
		this.ctl.lbHeaderFechaYEmpresa.setValue ("<font color='white'>" + fecha + " - " + empresa + "</font>");
		this.ctl.btnMenuSistema.setText (usuario);

		/*
		var panel = Ext.ComponentQuery.query ("tabpanel[name='panel-central']")[0];
		var comp = panel.add ({
			xtype: 'prod-movst-Formulario',
			title: 'des',
			closable: true
		});
		this.tabNoRefrescar = 'prod-movst-Formulario';
		comp.getController ().params.modoEjecucion = ModoEjecucionListado.Vista;
		panel.setActiveTab (comp);
		*/
	}
});
