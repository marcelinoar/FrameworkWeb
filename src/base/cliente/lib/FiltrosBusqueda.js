/***************************************************************************************************
 *
 * Archivo: FiltrosBusqueda.js
 * ------------------------------------------------------------------------------------------------
 * Autor: Marcelino Morales
 * Version: 1.0
 * Descripcion: Contiene las clases de filtros utilizadas en los listados. Cada clase debe contener
 * 				por lo menos los siguientes metodos para ser compatibles:
 *					- AgregarParametros ()
 *					- Limpiar ()
 *					- Refrescar ()
 ***************************************************************************************************/


//
// Permite seleccionar un Id de atributo y un rango de valores numerico.
//
// Parametros:
//	- nombre_filtro		: Nombre que identifica al filtro
// 	- controller		: Referencia al Controller del listado.
//	- nombre_atrib		: Nombre del combo que contiene los atributos.
//	- nombre_desde		: Nombre del textfield que contiene el valor desde.
//	- nombre_hasta		: Nombre del textfield que contiene el valor hasta.
//	- param_atrib		: Nombre del parametro pasado al store que contiene el id del atributo.
//	- param_desde		: Nombre del parametro pasado al store que conteine el valor desde.
//	- param_hasta		: Nombre dle parametro pasado al store que contiene el valor hasta.
//

function FiltroRangoAtributoNumerico (nombre_filtro, controller, nombre_atrib, nombre_desde, nombre_hasta, param_atrib, param_desde, param_hasta) {
	this.Nombre					= nombre_filtro;
	this.Controller 			= controller;
	this.ComboAtributo			= this.Controller.getView ().down ("combo[name='" + nombre_atrib + "']");
	this.CampoDesde				= this.Controller.getView ().down ("textfield[name='" + nombre_desde + "']");
	this.CampoHasta 			= this.Controller.getView ().down ("textfield[name='" + nombre_hasta + "']");
	this.ParamAtributo			= param_atrib;
	this.ParamDesde				= param_desde;
	this.ParamHasta				= param_hasta;
	this.ValorPreseleccionado	= null;

	this.ComboAtributo.store.load ();

	this.AgregarParametros = function (params) {
		// Si hay un valor preseleccionado entonces se pasa ese valor como
		// parametro.
		if (this.ValorPreseleccionado != null) {
			params[this.ParamAtributo] 	= this.ValorPreseleccionado.id;
			params[this.ParamDesde]		= this.ValorPreseleccionado.desde;
			params[this.ParamHasta]		= this.ValorPreseleccionado.hasta;

		} else {
			if (this.ComboAtributo.value != null && this.CampoDesde.value != '' && this.CampoHasta.value != '') {
				params[this.ParamAtributo] 	= this.ComboAtributo.value;
				params[this.ParamDesde]		= this.CampoDesde.value;
				params[this.ParamHasta]		= this.CampoHasta.value;
			}
		}
	},

	this.Limpiar = function () {
		this.ComboAtributo.clearValue ();
		this.CampoDesde.setValue ('');
		this.CampoHasta.setValue ('');
	},

	this.Refrescar = function () {
		this.ComboAtributo.store.load ();
	}

	//
	// data debe tener el siguiente formato:
	// - data.id	: id del atributo
	// - data.desde	: valor desde
	// - data.hasta	: valor hasta
	//
	this.PreSeleccionar = function (data) {
		this.ValorPreseleccionado = data;
		this.ComboAtributo.disable ();
		this.CampoDesde.disable ();
		this.CampoHasta.disable ();
	}
}

//
// Filtro CheckBox.
// Parametros:
//	- nombre_filtro		: Nombre que identifica al filtro
// 	- controller		: Referencia al Controller del listado.
//	- nombre			: Nombre del combo asociado al filtro.
//	- nombre_param		: Nombre del parametro pasado al store que contendra el valor seleccionado en el combo.
//

function FiltroCheckBox (nombre_filtro, controller, nombre, nombre_param) {
	this.Nombre					= nombre_filtro;
	this.Controller 			= controller;
	this.Componente 			= this.Controller.getView ().down ("checkbox[name='" + nombre + "']");
	this.NombreParam			= nombre_param;
	this.ValorPreseleccionado	= null;

	this.AgregarParametros = function (params) {
		// Si hay un valor preseleccionado entonces se pasa ese valor como
		// parametro.
		if (this.ValorPreseleccionado != null) {
			params[this.NombreParam] = this.ValorPreseleccionado.valor;

		} else {
			if (LibGeneral.IsChecked (this.Componente)) {
				params[this.NombreParam] = true;
			}
		}
	},

	this.Limpiar = function () {
		this.Componente.reset ();
	},

	this.Refrescar = function () {
	},

	//
	// Formato:
	// 	- data.valor = true/false
	//
	this.PreSeleccionar = function (data) {
		this.ValorPreseleccionado = data;
		this.Componente.disable ();
	}
}

//
// Filtro combo.
// Parametros:
//	- nombre_filtro		: Nombre que identifica al filtro
// 	- controller		: Referencia al Controller del listado.
//	- nombre			: Nombre del combo asociado al filtro.
//	- nombre_param		: Nombre del parametro pasado al store que contendra el valor seleccionado en el combo.
//

function FiltroCombo (nombre_filtro, controller, nombre, nombre_param, nom_store) {
	this.Nombre					= nombre_filtro;
	this.Controller 			= controller;
	this.Combo					= this.Controller.getView ().down ("combo[name='" + nombre + "']");
	this.NombreParam			= nombre_param;
	this.ValorPreseleccionado	= null;

	// Creamos el store y lo asociamos al control
	this.Combo.setStore (Ext.create (nom_store, {autoDestroy:true}));

	// Recargamos el combo.
	this.Combo.store.load ();

	this.AgregarParametros = function (params) {
		// Si hay un valor preseleccionado entonces se pasa ese valor como
		// parametro.
		if (this.ValorPreseleccionado != null) {
			params[this.NombreParam] = this.ValorPreseleccionado.id;

		} else {
			if (this.Combo.value != null) {
				params[this.NombreParam] = this.Combo.value;
			}
		}
	},

	this.Limpiar = function () {
		this.Combo.clearValue ();
	},

	this.Refrescar = function () {
		this.Combo.store.load ();
	},

	//
	// Formato:
	// 	- data.id = itemId del campo seleccioando.
	//
	this.PreSeleccionar = function (data) {
		this.ValorPreseleccionado = data;
		this.Combo.disable ();
	}
}

//
// Filtro que no muestra ningun control en pantalla. Sirve para filtrar valores preseleccionados atraves de
// los parametros recibidos por el listado.
//
// Parametros:
//	- nombre_filtro		: Nombre que identifica al filtro
//	- nombre_param		: Nombre del parametro pasado al store que contendra el valor seleccionado.
//

function FiltroParametro (nombre_filtro, nombre_param) {
	this.Nombre 				= nombre_filtro;
	this.NombreParam 			= nombre_param;
	this.ValorPreseleccionado	= null;

	this.AgregarParametros = function (params) {
		if (this.ValorPreseleccionado != null) {
			params[this.NombreParam] = this.ValorPreseleccionado;
		}
	},

	this.Limpiar = function () {
	},

	this.Refrescar = function () {
	},

	this.PreSeleccionar = function (data) {
		this.ValorPreseleccionado = data.id;
	}
}

//
// Filtro campo de texto con un combo que permite seleccionar: comienza, termina, contiene o igual
//
// Parametros:
//	- nombre_filtro		: Nombre que identifica al filtro
// 	- controller		: Referencia al Controller del listado.
//	- nombre_tipo		: Nombre del combo asociado al filtro.
//	- nombre_txt		: Nombre del textfield asociado al filtro.
//	- param_sel_tipo	: Nombre del parametro pasado al store que contendra el valor seleccionado en el combo.
//	- param_txt			: Nombre del parametro pasado al store que contendra el valor introducido en el textfield.
//
function FiltroTexto (nombre_filtro, controller, nombre_tipo, nombre_txt, param_sel_tipo, param_txt) {
	this.Nombre					= nombre_filtro;
	this.Controller 			= controller;
	this.ParametroSelTipo 		= param_sel_tipo;
	this.ParametroTexto			= param_txt;
	this.ComboTipo				= this.Controller.getView ().down ("combo[name='" + nombre_tipo + "']");
	this.TbTexto				= this.Controller.getView ().down ("textfield[name='" + nombre_txt + "']");
	this.ValorPreseleccionado	= null;

	this.ComboTipo.setStore (Ext.create('Ext.data.Store', {
		extend	: "Ext.data.Store",
		fields: ['tipo', 'nombre'],
		proxy	: {
			type: 'memory'
		},
		data : [
			{tipo:'emp', nombre:'Empieza'},
			{tipo:'con', nombre:'Contiene'},
			{tipo:'igu', nombre:'Igual'},
			{tipo:'ter', nombre:'Termina'}
		]
	}));

	this.AgregarParametros = function (params) {
		if (this.ValorPreseleccionado != null) {
			params[this.ParametroSelTipo] 	= this.ValorPreseleccionado.tipo;
			params[this.ParametroTexto] 	= this.ValorPreseleccionado.texto;

		} else {
			if (this.TbTexto.value != '' && this.ComboTipo.value != null) {
				params[this.ParametroSelTipo] 	= this.ComboTipo.value;
				params[this.ParametroTexto] 	= this.TbTexto.value;
			}
		}
	},

	this.Limpiar = function () {
		this.TbTexto.setValue ('');
		this.ComboTipo.clearValue ();
	},

	this.Refrescar = function () {
	},

	//
	// Formato:
	// data.tipo = 'emp' || 'con' || 'igu' || 'ter'
	// data.texto = %texto a buscar%
	//
	this.PreSeleccionar = function (data) {
		this.ValorPreseleccionado = data;
		this.ComboTipo.disable ();
		this.TbTexto.disable ();
	}
}

//
// Filtro con campo de busqueda asociado.
//
// Parametros:
//	- nombre_filtro		: Nombre que identifica al filtro
// 	- controller		: Referencia al Controller del listado.
//	- campo_busqueda	: Referencia al objeto CampoBusqueda asociado al control.
//	- param				: Nombre del parametro que sera pasado al store como filtro.
//

function FiltroCampoBusqueda (nombre_filtro, controller, campo_busqueda, param) {
	this.Nombre					= nombre_filtro;
	this.CampoBusqueda 			= campo_busqueda;
	this.Controller				= this;
	this.Parametro				= param;
	this.ValorPreseleccionado	= null;

	this.AgregarParametros = function (param) {
		if (this.ValorPreseleccionado != null) {
			param[this.Parametro] = this.ValorPreseleccionado.id;

		} else {
			if (this.CampoBusqueda.itemId != 0) {
				param[this.Parametro] = this.CampoBusqueda.itemId;
			}
		}
	},

	this.Limpiar = function () {
		this.CampoBusqueda.Limpiar ();
	},

	this.Refrescar = function () {
	},

	//
	// Formato:
	// 	- data.id = itemId del campo seleccioando.
	//
	this.PreSeleccionar = function (data) {
		this.ValorPreseleccionado = data;
		this.CampoBusqueda.Deshabilitar ();
	}
}

//
// Filtro campo numerico. Es un textfield que solo admite codigos numericos
//
// Parametros:
//	- nombre_filtro		: Nombre que identifica al filtro
// 	- controller		: Referencia al Controller del listado.
//	- nombre_txt		: Nombre del textfield asociado al filtro.
//	- param_txt			: Nombre del parametro pasado al store que contendra el valor introducido en el textfield.
//
function FiltroRangoNumerico (nombre_filtro, controller, nombre_desde, nombre_hasta, param_desde, param_hasta) {
	this.Nombre					= nombre_filtro;
	this.Controller 			= controller;
	this.ParametroDesde			= param_desde;
	this.ParametroHasta			= param_hasta;
	this.TbDesde				= this.Controller.getView ().down ("textfield[name='" + nombre_desde + "']");
	this.TbHasta				= this.Controller.getView ().down ("textfield[name='" + nombre_hasta + "']");
	this.ValorPreseleccionado	= null;

	this.AgregarParametros = function (params) {
		if (this.ValorPreseleccionado != null) {
			params[this.ParametroDesde]	= this.ValorPreseleccionado.desde;
			params[this.ParametroHasta]	= this.ValorPreseleccionado.hasta;

		} else {
			if (this.TbDesde.value != '' && this.TbHasta.value != '') {
				params[this.ParametroDesde]	= this.TbDesde.value;
				params[this.ParametroHasta]	= this.TbHasta.value;
			}
		}
	},

	this.Limpiar = function () {
		this.TbDesde.setValue ('');
		this.TbHasta.setValue ('');
	},

	this.Refrescar = function () {
	},

	//
	// Formato:
	// 	- data.desde = valor desde
	// 	- data.hasta = valor hasta
	//
	this.PreSeleccionar = function (data) {
		this.ValorPreseleccionado = data;
		this.TbDesde.disable ();
		this.TbHasta.disable ();
	}
}

//
// Filtro campo numerico. Es un textfield que solo admite codigos numericos
//
// Parametros:
//	- nombre_filtro		: Nombre que identifica al filtro
// 	- controller		: Referencia al Controller del listado.
//	- nombre_txt		: Nombre del textfield asociado al filtro.
//	- param_txt			: Nombre del parametro pasado al store que contendra el valor introducido en el textfield.
//
function FiltroCodigoNumerico (nombre_filtro, controller, nombre_txt, param_txt) {
	this.Nombre					= nombre_filtro;
	this.Controller 			= controller;
	this.ParametroTexto			= param_txt;
	this.TbTexto				= this.Controller.getView ().down ("textfield[name='" + nombre_txt + "']");
	this.ValorPreseleccionado	= null;

	this.AgregarParametros = function (params) {
		if (this.ValorPreseleccionado != null) {
			params[this.ParametroTexto] = this.ValorPreseleccionado.valor;

		} else {
			if (this.TbTexto.value != '') {
				params[this.ParametroTexto]	= this.TbTexto.value;
			}
		}
	},

	this.Limpiar = function () {
		this.TbTexto.setValue ('');
	},

	this.Refrescar = function () {
	},

	//
	// Formato:
	// 	- data.valor = valor del campo
	//
	this.PreSeleccionar = function (data) {
		this.ValorPreseleccionado = data;
		this.TbTexto.disable ();
	}
}

//
// Es esta compuesto por dos datefield que marcan un rango de fechas. Se pueden seleccionar las dos
// o una sola. En ese caso solo se envia una fecha.
//
// Parametros:
//	- nombre_filtro		: Nombre que identifica al filtro
// 	- controller		: Referencia al Controller del listado.
//	- campo_desde		: nombre de campo desde
//	- campo_hasta		: nombre de campo hasta
//	- nom_param			: nombre del parametro que se enviara al servidor.
//

function FiltroRangoFechas (nombre_filtro, controller, campo_desde, campo_hasta, nom_param_desde, nom_param_hasta) {
	this.Nombre					= nombre_filtro;
	this.Controller 			= controller;
	this.CampoDesde				= this.Controller.getView ().down ("datefield[name='" + campo_desde + "']");
	this.CampoHasta				= this.Controller.getView ().down ("datefield[name='" + campo_hasta + "']");
	this.ParamDesde				= nom_param_desde;
	this.ParamHasta				= nom_param_hasta;
	this.ValorPreseleccionado	= null;

	this.AgregarParametros = function (params) {
		if (this.ValorPreseleccionado != null) {
			params[this.ParamDesde] = this.ValorPreseleccionado.desde;
			params[this.ParamHasta] = this.ValorPreseleccionado.hasta;

		} else {
			if (this.CampoDesde.getRawValue () != '') {
				params[this.ParamDesde] = this.CampoDesde.getRawValue ();
			}

			if (this.CampoHasta.getRawValue () != '') {
				params[this.ParamHasta] = this.CampoHasta.getRawValue ();
			}
		}
	},

	this.Limpiar = function () {
		this.CampoDesde.setValue ('');
		this.CampoHasta.setValue ('');
	},

	this.Refrescar = function () {
	},

	//
	// Formato:
	// 	- data.desde = string de la forma DD/MM/AAAA
	// 	- data.hasta = string de la forma DD/MM/AAAA
	//
	this.PreSeleccionar = function (data) {
		this.ValorPreseleccionado = data;
		this.CampoDesde.disable ();
		this.CampoHasta.disable ();
	}
}