/**************************************************************************************************
 * ---------------- ARCHIVO GENERADO AUTOMATICAMENTE ----------------
 * Archivo: ListadoController.js
 * ------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.Producto.ProductoAlmacen.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-producto-pa-ListadoController',

	init: function () {
	   	this.control({
			"prod-producto-pa-ListadoGrilla": {
				edit: this.onGrillaChange
			}
	    });

		this.ctl = {};

		this.ConfigurarStoreGrilla ();
	},

	ConfigurarStoreGrilla: function () {
		var st = Ext.create ('Sistema.view.Produccion.Producto.ProductoAlmacen.ListadoGrillaStore', {autoDestroy:true});
		this.getView ().down ('prod-producto-pa-ListadoGrilla').setStore (st);
	},

	ConfigurarListado: function (set_dirty_callback, permisos) {
		this['setModificado'] = set_dirty_callback;
		this.permisos = permisos;
	},

	//
	// Se ejecuta despues de editar la celda Cantidad en la grilla.
	//
	onGrillaChange: function (editor, e) {
		this.setModificado ();
	},

	// ----------------------- Metodos Publicos -----------------------
	//
	// Pisa la copia actual de InfoMonedas con la que carga el formulario maestro.
	//
	// Setea el valor de datosFormulario
	//
	SetDatosFormulario: function (datos, reg) {
		var i, j, item_reg, item_grilla;
		var grilla = this.getView ().down ('prod-producto-pa-ListadoGrilla');

		// Primero cargamos los registros vacios
		grilla.store.loadData (datos.productoAlmacen);

		// Despues les actualizamos los valores de la grilla con los que recibimos en el registro.
		for (i = 0; i < reg.productoAlmacen ().count (); i++) {
			item_reg = reg.productoAlmacen ().getAt (i);

			for (j = 0; j < grilla.store.count (); j++) {
				item_grilla = grilla.store.getAt (j);

				if (item_grilla.get ('almacenId') == item_reg.get ('almacenId')) {
					item_grilla.set ('stockCritico', item_reg.get ('stockCritico'));
					item_grilla.set ('puntoDePedido', item_reg.get ('puntoDePedido'));
				}
			}
		}
	},

	//
	// Carga en el store los datos nuevos y marca al maestro como modificado.
	//
	ObtenerStoreModificado: function (store) {
		var i, reg;
		var grilla = this.getView ().down ('prod-producto-pa-ListadoGrilla');

		store.removeAll ();
		for (i = 0; i < grilla.store.count (); i++) {
			reg = grilla.store.getAt (i);

			if (reg.get ('stockCritico') > 0 || reg.get ('puntoDePedido') > 0) {
				store.add (reg);
			}
		}
	}
});