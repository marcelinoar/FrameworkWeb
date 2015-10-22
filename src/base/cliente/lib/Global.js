//
// Codigo de accion que es devuelto por los formularios y listados cuando son abiertos y retornan hacia un listado indicando
// que es lo que se debe hacer con los datos de retorno.
//
var AccionRetorno = {
	Guardar		: 1,			// Guardar registro/s. Lo devuelve el ListadoWS cuando es abierto para seleccionar items.
	Crear		: 2,			// Devuelve un registro nuevo.
	Borrar		: 3,			// El registro fue borrado en el formulario.
	Actualizar	: 4				// El registro fue actualizado en el formulario.
};

//
// Indica el modo en que se abren los listados.
//
var ModoEjecucionListado = {
	Vista				: 1,			// Es el modo por default.
	Seleccion			: 2,			// SeleccionMultiple. Muestra una columna extra con checkboxes y los botones Aceptar y Cancelar abajo.
	SeleccionIndividual	: 3				// Permite seleccionar solo un elemento del listado haciendo click sobre el.
};

//
// Modos de apertura de formularios y listados.
//
var ModoAperturaFormulario = {
	Crear : 1,					// Abre un formulario para crear una entidad nueva.
	Editar: 2					// Abre un formulario para editar una entidad existente.
};

//
// Tipos de formularios/listados del sistema
//
var TipoFormulario = {
	FormularioWS		: 1,	// Formulario que trabaja contra un WS.
	FormularioDetalle	: 2,	// Formulario que trabaja en memoria.
	ListadoWS			: 3,	// Listado que trabaja contra un WS.
	ListadoDetalle		: 4		// Listado que trabaja en memoria.
};

//
// Esta clase maneja las interfaces de parametros que existen en las llamadas a
// las ventanas de ListadoWS, FormularioDetalle y FormularioWS.
//
var ManejadorDeVentanas = {
	ReqListadoWS: function (maximizable, maximizada, modelo, modo_ejecucion, ver_editar, ver_borrar, filtros) {
		return {
				ventanaMaximizable		: maximizable,
				ventanaMaximized		: maximizada,
				modelo					: modelo,
				modoEjecucion			: modo_ejecucion,
				verColEditar			: ver_editar,
				verColBorrar			: ver_borrar,
				filtrosPreseleccionados	: filtros
			};
	},

	ReqFormularioWS: function (modelo_id) {
		return {modeloId: modelo_id};
	},

	ReqFormularioDetalle: function (mod) {
		return {modelo: mod};
	},

	/**
	 *
	 * Abre una ventana que contiene un formulario de la clase indicada.
	 *
	 * @param	clase			Nombre de la clase que representa al formulario.
	 * @param	id				Id del modelo a editar
	 * @param	esModal 		Parametro Opcional. true o false indica si la pantalla se muestra en modo modal.
	 * @param	objCallback		Parametro Opcional. Un objeto que debe contener un metodo llamado AlCerrarVentanaFormulario() que se ejecutara al cerrar el formulario.
	 *
	 */

	AbrirFormularioEdicion: function (clase, id, esModal, objCallback) {
		var frm = Ext.create (clase, {});
		var comp, win;
		var txt_operacion = 'Editar';
		var es_modal = true;

		if (id == null) {
			txt_operacion = 'Crear';
		}

		if (esModal != null) {
			es_modal = esModal;
		}

		frm.paramsEntrada = this.ReqFormularioWS (id);
		comp = frm.getController ().GetComponenteFoco ();

		win = Ext.create('Ext.window.Window', {
			title		: frm.controller.params.nombreEntidad + ': ' + txt_operacion,
			height		: frm.controller.params.altoVentana,
			width		: frm.controller.params.anchoVentana,
			modal		: es_modal,
			maximizable	: false,
			maximized	: false,
			collapsible	: false,
			resizable	: true,
			layout		: 'fit',
			defaultFocus: comp,
			listeners: {
				close: function () {
					if (objCallback != null) {
						objCallback.AlCerrarVentanaFormulario ();
					}
				}
			}
		});

		win.add (frm);
		win.show ();
	}
};

var LibGeneral = {
	//
	// Recibe un checkboxfield y devuelve 1 si esta chequeado y 0 sino.
	//
	IsChecked: function (ctl) {
		return (ctl.value == '1' || ctl.value == 'on' || ctl.value == 'true' || ctl.value == true ? 1 : 0);
	},

	GetIdOrNull: function (id) {
		if (id == 0) {
			return null;

		} else {
			return id;
		}
	}
};

//
// Semaforo que sirve como barrera para coordinar
// el resultado de varios request.
//
// Recibe como parametro el numero de llamadas a Set() que se deben
// ejecutar antes de llamar al metodo: Method ()
// Los Set () deben llamarse desde cada thread. Al recibir la ultima llamada se ejecuta Method ()
//
function Semaforo (cnt) {
	var Counter = cnt;
	var curr_cnt = 0;

	this.Set = function () {
		curr_cnt++;

		if (curr_cnt == Counter) {
			curr_cnt == 0;
			this.Method ();
		}
	}

	this.Method = function () {
	}
}

//
// Objeto que se recibe en las llamadas a GetInfoFormulario.
// Como solo puedo traer datos, despues le agregolos metodos de este objeto, con ese tipo de herencia que uso para los elementos de Extjs.
//
var InfoFormularioBase =  {
	//
	// Toma uno objeto del tipo info_formulario, que es recibido en una llamada a GetInfoFormulario () y le agrega los metodos de esta clase.
	//
	InyectarDependencia: function (obj) {
		obj.GetValor = this.GetValor;
/*
		obj.infoMonedas = {
			dolar	: obj.GetValor ('moneda', 'nombre', 'monedaId', 'Dolar'),
			euro	: obj.GetValor ('moneda', 'nombre', 'monedaId', 'Euro'),
			colon	: obj.GetValor ('moneda', 'nombre', 'monedaId', 'Colon')
		}
*/
	},

	//
	// Devuelve el contenido del campo con nombre nom_ret que tenga nom_id = val_id en el
	// grupo indicado.
	//
	GetValor: function (grupo, nom_id, nom_ret, val_id) {
		var i, ret;

		ret = null;
		for (i = 0; i < this[grupo].length; i++) {
			if (this[grupo][i][nom_id] == val_id) {
				ret = this[grupo][i][nom_ret];
			}
		}

		return ret;
	}
};

//
// Devuelve true o false indicando si el parametro pasado es numerico o no.
//
function esNumerico (n) {
  return RegExp("^[0-9]{1,10}$").test(n);
}

//
// Recibe la grilla y un parametro indicando la direccion.
// -1 sube y +1 baja
//
function moveSelectedRow (grid, direction, fname) {
	var record = grid.getSelection ();

	// Si no hay un registro seleccionado no hago nada y vuelvo.
	if (record.length <= 0) {
		return;

	} else {
		record = record[0];
	}

	// Obtengo el numero de fila del elemento seleccionado.
	var index = grid.getStore().indexOf (record);

	// Sube
	if (direction < 0) {
		// Sumo 1 al campo que maneja el numero de orden del registro seleccionado.
		//record.set (fname, parseInt (record.get (fname)) + 1);

		index++;
		record.set (fname, parseInt (index));
		if (index < 0) {
			return;
		}

	// Baja
	} else {
		//record.set (fname, parseInt (record.get (fname)) - 1);

		index--;
		record.set (fname, parseInt (index));
		if (index >= grid.getStore().getCount()) {
			return;
		}
	}

	grid.getStore().remove (record);
	grid.getStore().insert (index, record);
	grid.setSelection (index);
}