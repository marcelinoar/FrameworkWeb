/***************************************************************************************************
 *
 * Archivo: ConsultaWS.js
 * ------------------------------------------------------------------------------------------------
 *
 * Autor: Marcelino Morales
 *
 * Version: 1.0
 *
 * Descripcion: Permite realizar llamados a los Web Services del sistema.
 *
 ***************************************************************************************************/

function ConsultaWS () {
	var Modulo;
	var WebService;
	var Metodo;

	//
	// Permite consultar, dentro del handler de la respuesta, el estado de la ejecucion del WS.
	//
	this.RespuestaOK = function () {
		return this.EstadoRespuesta;
	}

	//
	// Permite consultar el mensaje de error.
	//
	this.GetMensajeRespuesta = function () {
		return this.MensajeRespuesta;
	}

	//
	// Ejecuta el request Ajax solicitado.
	//
	// Parametros:
	//		modulo		: Nombre del modulo al que corresponde el WS. Ej: Sistema, Desarrollo, Casino.
	//		sub_modulo	: Nombre del programa. Ej: MovimientoCajero, Caja, etc.
	// 		web_service	: Nombre del archivo que implemente la interfaz JSonRouterBase
	//		metodo		: Nombre del metodo a ejecutar
	//		parametros	: objeto que tiene como propiedades los parametros a pasar al metodo. Ejemplo {prop1:val1, prop2: val2}
	//		respuesta	: El handler de la respuesta. En el hay que preguntar al objeto por el resultado de la operacion.
	//
	// Nota: Esta clase no es treadsafe. Si se ejcutan dos consultas solapadamente se va a generar un problema.
	//
	this.Ejecutar = function (modulo, sub_modulo, web_service, metodo, parametros, respuesta) {
		var me = this;

		this.Modulo 			= modulo;
		this.WebService 		= web_service;
		this.Metodo				= metodo;
		this.onRespuestaHandler = respuesta;
		this.EstadoRespuesta;
		this.MensajeRespuesta;

		// Armamos el objeto con los parametros
		if (parametros == null) {
			parametros = {};
		}
		parametros['f'] = metodo;

		// Ejecutamos la consulta
		Ext.Ajax.request({
			url: 'Server/Sysgran/Aplicacion/Modulos/' + modulo + '/' + sub_modulo + '/' + web_service + '.php',
			params: parametros,
			success: function(response) {
				var resp = Ext.decode(response.responseText);

				// Actualizamos los registros de estado y pasamos los datos al handler.
				me.EstadoRespuesta = (resp.success == 'true');
				me.MensajeRespuesta = resp.message;
				me.onRespuestaHandler (resp.data);
			},
			failure: function () {
				// Este es el caso de un error en la comunicacion.
				me.EstadoRespuesta = false;
				me.MensajeRespuesta = 'Ocurrio un error en la ejecucion del metodo remoto (' + this.Modulo + '.' + this.WebService + '.' + this.Metodo + ')';
				me.onRespuestaHandler (resp.data);
			}
		});
	}

	// ---- Eventos

	//
	// Evento ejecutado al recibir la respuesta, o al producirse un error.
	//
	this.onRespuestaHandler = function (respuesta) {
		// Si no fue sobrecargado generamos un error.
		Ext.Msg.alert('Error', 'Error. Falta implementar el metodo onRespuestaHandler()');
	}
}
