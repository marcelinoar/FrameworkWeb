function ConsultaWS(){var b;var c;var a;this.RespuestaOK=function(){return this.EstadoRespuesta};this.GetMensajeRespuesta=function(){return this.MensajeRespuesta};this.Ejecutar=function(g,j,d,f,e,i){var h=this;this.Modulo=g;this.WebService=d;this.Metodo=f;this.onRespuestaHandler=i;this.EstadoRespuesta;this.MensajeRespuesta;if(e==null){e={}}e.f=f;Ext.Ajax.request({url:"Server/Sysgran/Aplicacion/Modulos/"+g+"/"+j+"/"+d+".php",params:e,success:function(k){var l=Ext.decode(k.responseText);h.EstadoRespuesta=(l.success=="true");h.MensajeRespuesta=l.message;h.onRespuestaHandler(l.data)},failure:function(){h.EstadoRespuesta=false;h.MensajeRespuesta="Ocurrio un error en la ejecucion del metodo remoto ("+this.Modulo+"."+this.WebService+"."+this.Metodo+")";h.onRespuestaHandler(resp.data)}})};this.onRespuestaHandler=function(d){Ext.Msg.alert("Error","Error. Falta implementar el metodo onRespuestaHandler()")}};