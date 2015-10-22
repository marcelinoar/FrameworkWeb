/***************************************************************************************************
 *
 * Archivo: Formato.js
 * ------------------------------------------------------------------------------------------------
 *
 * Autor: Marcelino Morales
 *
 * Version: 1.0
 *
 * Descripcion: Definicion de validadores personalizados para ser usados en los formularios de la
 * 				aplicacion.
 *
 ***************************************************************************************************/

var Formato = {
	Configuracion: {
		Numerica: {
			// Esto deberiamos conservarlo asi para no generar problemas en la DB.
			PuntoDecimal: ',',			// Configuracion del punto de separacion decimal para la interfaz de usuario
			PuntoMillar: '.'			// Configuracion del punto de separacion de millares para la interfaz de usuario
		},

		ConfiguracionDB: {
			PuntoDecimal: '.',			// Configuracion del punto decimal para la DB
			PuntoMillar: ','			// Configuraciondel punto separador de grupos para la DB
		}
	},

	Lib: {
		//
		// Codifica un array en un string como tira de numeros mas pipes para poder ser pasado por POST a php.
		//
		// Recibe un array devuelve un string.
		//
		CodificarArray: function (arr) {
			var i, ret = '';

			for (i = 0; i < arr.length; i++) {
				ret += '|' + arr[i];
			}

			return ret;
		},

		// Devuelve true si v es numerico, de lo contrario false.
		// v no tiene que tener separadores de miles ni de decimales.
		//
		EsNumerico: function (v) {
			var i, ret, chr;
			var str = String (v);

			ret = true;
			for (i = 0; i < str.length; i++) {
				chr = str.charAt (i);

				if (chr != '1' && chr != '2' && chr != '3' && chr != '4' && chr != '5' && chr != '6' && chr != '7' && chr != '8' && chr != '9' && chr != '0') {
					ret = false;
				}
			}

			return ret;
		},

		//
		// Recibe un numero como string y lo tranforma en numerico de punto flotante.
		// Si en la configuracion el punto decimal es un '.' llama directamente a parseFloat,
		// de lo contrario reemplaza el caracter configurado por un '.' y lo convierte
		//
		ToFloat: function (num) {
			var ret;
			var str, chr;
			var i;

			if (Formato.Configuracion.Numerica.PuntoDecimal != '.') {
				str = new String (num);
				ret = '';

				for (i = 0; i < str.length; i++) {
					chr = str.charAt (i);
					if (chr == Formato.Configuracion.Numerica.PuntoDecimal) {
						ret += '.';

					} else {
						ret += chr;
					}
				}

				num = ret;
			}

			return parseFloat (num);
		},

		//
		// Recibe un numero flotante con separador decimal ='.' y lo transforma en un string
		// que separa usando la configuracion de este sistema.
		//
		Normalizar: function (num) {
			var str = new String (num);
			var i, chr, ret;

			ret = '';
			for (i = 0; i < str.length; i++) {
				chr = str.charAt (i);

				if (chr == '.') {
					ret += Formato.Configuracion.Numerica.PuntoDecimal;

				} else {
					ret += chr;
				}
			}

			return ret;
		}
	},
	PuntoFlotante: {
		Configuracion: {
			CantDigPuntoFlotante: 4	// Cantidad de digitos de punto flotante
		},

		//
		// Chequea que el string este compuesto solo por caracteres numericos
		// y a lo sumo por un separador decimal.
		//
		// Recibe un objeto del tipo String ().
		//
		CheckNum: function (num) {
			var i, ret;
			var cnt_dec;

			ret = true;
			cnt_dec = 0;

			for (i = 0; i < num.length; i++) {
				if (!Formato.Lib.EsNumerico (num.charAt (i))) {
					if (num.charAt (i) == Formato.Configuracion.Numerica.PuntoDecimal) {
						cnt_dec++;

					} else {
						ret = false;
					}
				}
			}

			return ret && (cnt_dec <= 1);
		},

		//
		// Convierte el string recibido a formato PuntoFlotante (xxxxxxxxxx,yy)
		// Espera un objeto del tipo string.
		Convertir: function (num) {
			var i, pos_dec;
			var parte_flotante;
			var parte_entera;

			// Arma la parte flotante
			pos_dec = num.indexOf (Formato.Configuracion.Numerica.PuntoDecimal);
			parte_flotante = '';
			parte_entera = num;

			if (pos_dec >= 0) {
				parte_flotante = num.substr (pos_dec + 1, Formato.PuntoFlotante.Configuracion.CantDigPuntoFlotante);
				parte_entera = num.substr (0, pos_dec);

				if (parte_entera == '') {
					parte_entera = '0';
				}
			}

			// Rellena con ceros la parte decimal.
			for (i = 0; parte_flotante.length < Formato.PuntoFlotante.Configuracion.CantDigPuntoFlotante; i++) {
				parte_flotante += '0';
			}

			num = parte_entera + Formato.Configuracion.Numerica.PuntoDecimal + parte_flotante;

			return num;
		},

		//
		// Recorre todo el string y cambia los puntos de millares (si los hay) por comas decimales.
		//
		PreTransformar: function (num) {
			var str = new String (num);
			var i, ret = '';

			for (i = 0; i < str.length; i++) {
				if (str.charAt (i) == Formato.Configuracion.Numerica.PuntoMillar) {
					ret += Formato.Configuracion.Numerica.PuntoDecimal;

				} else {
					ret += str.charAt (i);
				}
			}

			return ret;
		},

		//
		// Si el parametro es convertible lo transforma para que cumpla
		// con el formato, de lo contrario devuelve un string vacio.
		//
		Transformar: function (num) {
			var ret;

			// Cambiamos los puntos por comas si hace falta.
			str = Formato.PuntoFlotante.PreTransformar (num);

			if (Formato.PuntoFlotante.CheckNum (str)) {
				ret = Formato.PuntoFlotante.Convertir (str);

			} else {
				ret = '';
			}

			return ret;
		},

		FormatoDB: function (num) {
			return num;
		},

		//
		// Recibe un string con formato de punto flotante y
		// lo convierte en un numero float.
		//
		GetNumero: function (num) {
			var str = new String (num);
			var ret = '';
			var i, chr;

			if (Formato.Configuracion.Numerica.PuntoDecimal == ',') {
				for (i = 0; i < str.length; i++) {
					chr = str.charAt (i);
					if (chr == Formato.Configuracion.Numerica.PuntoDecimal) {
						chr = '.';

					}

					ret += chr;
				}

			} else {
				ret = num;
			}

			return parseFloat (ret);
		}

/*
		FormatoDB: function (num) {
			var str = new String (num);
			var ret = '';
			var i, chr;

			for (i = 0; i < str.length; i++) {
				chr = str.charAt (i);
				if (chr == Formato.Configuracion.Numerica.PuntoDecimal) {
					ret += Formato.Configuracion.ConfiguracionDB.PuntoDecimal

				} else if (chr != Formato.Configuracion.Numerica.PuntoMillar) {
					ret += chr;
				}
			}

			return ret;
		}
*/
	},

	// ------------------- Metodos privados ------------------
	//
	// Formatea un numero con el formato de dinero.
	//
	Dinero: {
		Configuracion: {
			CantDigPuntoFlotante: 2	// Cantidad de digitos de punto flotante
		},

		//
		// Chequea que el string este compuesto solo por caracteres numericos
		// y a lo sumo por un separador decimal y varios de miles.
		//
		// Recibe un objeto del tipo String ().
		//
		CheckNum: function (num) {
			var i, ret;
			var cnt_mil, cnt_dec;

			ret = true;
			cnt_mil = 0;
			cnt_dec = 0;

			for (i = 0; i < num.length; i++) {
				if (!Formato.Lib.EsNumerico (num.charAt (i))) {
					if (num.charAt (i) == Formato.Configuracion.Numerica.PuntoDecimal) {
						cnt_dec++;

					} else if (num.charAt (i) == Formato.Configuracion.Numerica.PuntoMillar) {
						cnt_mil++;

					} else {
						ret = false;
					}
				}
			}

			return ret && (cnt_dec <= 1);
		},

		//
		// Recibe un numero u objeto que tiene formato de numero entero (no puede ser '') sin puntos ni comas y le pone los
		// puntos de separacion de millares.
		//
		FormatearParteEntera: function (num) {
			var pos;
			var str = String (num);
			var ret = '';

			if (str == '') {
				ret = '0';

			} else {
				// corta la primera parte (si tiene menos de 3) y le pone un punto al final. Str queda sin eso
				pos = str.length % 3;
				if (str.length > 3 && pos > 0) {
					ret = str.substr (0, pos) + '.';
					str = str.substr (pos, str.length);

				// si tiene menos de 3 digitos no pone puntos
				} else if (str.length < 3) {
					ret = str;
				}

				while (str.length >= 3) {
					ret += str.substr (0, 3);
					str = str.substr (3, str.length);

					if (str.length > 0) {
						ret += '.';
					}
				}
			}

			return ret;
		},

		//
		// Convierte el strin recibido a formato Dinero (x.xxx.xxx.xxx,yy)
		// Espera un objeto del tipo string.
		ConvertirAFormatoDinero: function (num) {
			var i, pos_mil, pos_dec;
			var parte_flotante;
			var parte_entera;

			// Remueve todos los puntos.
			pos_mil = num.indexOf (Formato.Configuracion.Numerica.PuntoMillar);
			while (pos_mil >= 0) {
				num = num.substr (0, pos_mil) + num.substr (pos_mil + 1, num.length);
				pos_mil = num.indexOf (Formato.Configuracion.Numerica.PuntoMillar);
			}

			// Arma la parte flotante
			pos_dec = num.indexOf (Formato.Configuracion.Numerica.PuntoDecimal);
			parte_flotante = '';
			parte_entera = num;

			if (pos_dec >= 0) {
				parte_flotante = num.substr (pos_dec + 1, Formato.Dinero.Configuracion.CantDigPuntoFlotante);
				parte_entera = num.substr (0, pos_dec);

				if (parte_entera == '') {
					parte_entera = '0';
				}
			}

			// Rellena con ceros la parte decimal.
			for (i = 0; parte_flotante.length < Formato.Dinero.Configuracion.CantDigPuntoFlotante; i++) {
				parte_flotante += '0';
			}

			num = Formato.Dinero.FormatearParteEntera (parte_entera) + Formato.Configuracion.Numerica.PuntoDecimal + parte_flotante;

			return num;
		},

		//
		// Si el parametro es convertible lo transforma para que cumpla
		// con el formato, de lo contrario devuelve un string vacio.
		//
		Transformar: function (num) {
			var str = new String (num);
			var ret;

			if (Formato.Dinero.CheckNum (str)) {
				ret = Formato.Dinero.ConvertirAFormatoDinero (str);

			} else {
				ret = '';
			}

			return ret;
		},

		//
		// Toma un numero ya formateado y le saca los puntos. Deja las comas decimales.
		//
		FormatoDB: function (num) {
			var str = new String (num);
			var ret = '';
			var i, chr;

			for (i = 0; i < str.length; i++) {
				chr = str.charAt (i);
				if (chr != Formato.Configuracion.Numerica.PuntoMillar) {
					ret += chr;
				}
			}

			return ret;
		}
	}
};