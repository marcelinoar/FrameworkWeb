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

Ext.define ('Sistema.view.Produccion.OrdenDeTrabajo.HojaDeRuta.FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-ot-hdr-FormularioController',

    init: function () {
    	FormularioDetalleControllerBase.InyectarDependencia (this, 'Sistema.view.Produccion.model.OperacionHojaDeRutaOT');

    	this.control ({
    		"button[name='btnBorrar']": {
    			click: this.onBtnBorrarClick
    		},
    		"button[name='btnGuardar']": {
    			click: this.onBtnGuardarClick
    		},
    		"prod-ot-hdr-Formulario": {
    			afterrender: this.onRender
    		},
    		"combo[name='cbMaquinaId']": {
    			select: this.onCbMaquinaIdSelect
    		}
    	});
    },

    onCbMaquinaIdSelect: function (t, rec) {
		this.ctl.tbTiempoEstandar.setValue (Formato.PuntoFlotante.Transformar (rec[0].get ('tiempoEstandar')));
    },

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= 500;
    	ctl.params.altoVentana		= 200;
    },

	CargarComponentes: function () {
		this.params.nombreEntidad = 'Detalle Operacion - Orden de Trabajo';
		this.ctl.tbCodigoOperacion = this.getView ().down ("textfield[name='tbCodigoOperacion']");
		this.ctl.tbDescripcionOperacion = this.getView ().down ("textfield[name='tbDescripcionOperacion']");
		this.ctl.tbTiempoEstandar = this.getView ().down ("textfield[name='tbTiempoEstandar']");

		this.ctl.cbMaquinaId = this.getView ().down ("combo[name='cbMaquinaId']");
		this.ctl.cbMaquinaId.store = Ext.create ("Sistema.view.Produccion.OrdenDeTrabajo.HojaDeRuta.StoreMaquinaOperacion", {});
	},

    GetElementoFoco: function () {
    	return "combo[name='cbMaquinaId']";
    },

	CargarRegistroEnFormulario: function (rec) {
		var me = this;
		var parametros_fnc = {
			ordenDeTrabajoId	: this.getView ().paramsEntrada.ordenDeTrabajoId,
			operacionId			: this.getView ().paramsEntrada.modelo.get ('operacionId'),
			productoId			: this.getView ().paramsEntrada.productoId,
			cantidad			: this.getView ().paramsEntrada.cantidad,
			unidadDeMedidaId	: this.getView ().paramsEntrada.unidadDeMedidaId
		};

		this.params.registro = rec;
		var consulta = new ConsultaWS ().Ejecutar ('Produccion', 'OrdenDeTrabajo', 'FormularioController', 'GetStoreMaquinaPorOperacion', parametros_fnc, function (resp) {
			if (this.RespuestaOK ()) {
				me.ctl.cbMaquinaId.store.loadData (resp);
				me.ctl.cbMaquinaId.setValue (me.params.registro.get ('maquinaId'));

			} else {
				Ext.Msg.alert('Error', this.GetMensajeRespuesta ());
			}
		});

		this.ctl.tbCodigoOperacion.setValue (rec.get ('codigoOperacion'));
		this.ctl.tbDescripcionOperacion.setValue (rec.get ('descripcionOperacion'));
		this.ctl.tbTiempoEstandar.setValue (Formato.PuntoFlotante.Transformar (rec.get ('tiempoEstandar')));
	},

	ObtenerRegistroDeFormulario: function () {
		this.params.registro.set ('maquinaId', this.ctl.cbMaquinaId.value);
		this.params.registro.set ('codigoMaquina', this.ctl.cbMaquinaId.getRawValue ());
		this.params.registro.set ('tiempoEstandar', this.ctl.tbTiempoEstandar.value);

		return this.params.registro;
	}
});
