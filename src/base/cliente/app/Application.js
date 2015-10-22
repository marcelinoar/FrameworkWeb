/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('Sistema.Application', {
    extend: 'Ext.app.Application',

    name: 'Sistema',

    views: [
		// Empresa
		'Sistema.view.Empresa.TipoDocumentoIdentidad.Formulario',
		'Sistema.view.Empresa.TipoDocumentoIdentidad.Listado',
		'Sistema.view.Empresa.CentroDeCosto.Listado',
		'Sistema.view.Empresa.CentroDeCosto.Formulario',
		'Sistema.view.Empresa.CuentaContable.Listado',
		'Sistema.view.Empresa.CuentaContable.Formulario',
		'Sistema.view.Empresa.Empleado.Listado',
		'Sistema.view.Empresa.Empleado.Formulario',

		// Sistema
		'Sistema.view.Sistema.Pais.Formulario',
		'Sistema.view.Sistema.Pais.Listado',
		'Sistema.view.Sistema.Provincia.Formulario',
		'Sistema.view.Sistema.Provincia.Listado',
		'Sistema.view.Sistema.Ciudad.Formulario',
		'Sistema.view.Sistema.Ciudad.Listado',
		'Sistema.view.Sistema.Empresa.Formulario',
		'Sistema.view.Sistema.Empresa.Listado',
		'Sistema.view.Sistema.Empresa.Grupo.Listado',
		'Sistema.view.Sistema.Grupo.Formulario',
		'Sistema.view.Sistema.Grupo.Listado',
		'Sistema.view.Sistema.Grupo.Empresa.Listado',
		'Sistema.view.Sistema.Grupo.Usuario.Listado',
		'Sistema.view.Sistema.Grupo.Menu.Listado',
		'Sistema.view.Sistema.Grupo.PermisosEstandar.Listado',
		'Sistema.view.Sistema.Grupo.PermisosCustom.Listado',
		'Sistema.view.Sistema.Usuario.Formulario',
		'Sistema.view.Sistema.Usuario.Listado',
		'Sistema.view.Sistema.Usuario.Grupo.Listado',
		'Sistema.view.Sistema.MenuItem.Listado',
		'Sistema.view.Sistema.MenuItem.Formulario',
		'Sistema.view.Sistema.Permiso.Listado',
		'Sistema.view.Sistema.Permiso.Formulario',

		// Desarrollo
		'Sistema.view.Desarrollo.FormularioMaestro.DetalleFormulario.Listado',
		'Sistema.view.Desarrollo.DetalleFormulario.Formulario',
		'Sistema.view.Desarrollo.DetalleFormulario.Listado',
		'Sistema.view.Desarrollo.DetalleFormulario.CampoFormulario.Formulario',
		'Sistema.view.Desarrollo.DetalleFormulario.CampoFormulario.Listado',
		'Sistema.view.Desarrollo.DetalleFormulario.CampoListado.Formulario',
		'Sistema.view.Desarrollo.DetalleFormulario.CampoListado.Listado',
		'Sistema.view.Desarrollo.FormularioMaestro.Formulario',
		'Sistema.view.Desarrollo.FormularioMaestro.Listado',
		'Sistema.view.Desarrollo.FormularioMaestro.CampoFormulario.Formulario',
		'Sistema.view.Desarrollo.FormularioMaestro.CampoFormulario.Listado',
		'Sistema.view.Desarrollo.FormularioMaestro.CampoListado.Formulario',
		'Sistema.view.Desarrollo.FormularioMaestro.CampoListado.Listado',
		'Sistema.view.Desarrollo.Modulo.Formulario',
		'Sistema.view.Desarrollo.Modulo.Listado',

		// Produccion
		'Sistema.view.Produccion.Maquina.Listado',
		'Sistema.view.Produccion.Maquina.Formulario',
		'Sistema.view.Produccion.Maquina.Atributos.Listado',
		'Sistema.view.Produccion.Almacen.Listado',
		'Sistema.view.Produccion.Almacen.Formulario',
		'Sistema.view.Produccion.LineaDeProduccion.Listado',
		'Sistema.view.Produccion.LineaDeProduccion.Formulario',
		'Sistema.view.Produccion.CentroDeTrabajo.Maquina.Listado',
		'Sistema.view.Produccion.Operacion.Listado',
		'Sistema.view.Produccion.Operacion.Formulario',
		'Sistema.view.Produccion.Operacion.Atributos.Listado',
		'Sistema.view.Produccion.Operacion.Atributos.Formulario',
		'Sistema.view.Produccion.Operacion.Maquinas.Listado',
		'Sistema.view.Produccion.CentroDeTrabajo.Listado',
		'Sistema.view.Produccion.CentroDeTrabajo.Formulario',
		'Sistema.view.Produccion.CentroDeTrabajo.Atributos.Listado',
		'Sistema.view.Produccion.Planta.Listado',
		'Sistema.view.Produccion.Planta.Formulario',
		'Sistema.view.Produccion.TipoActMantMaquina.Listado',
		'Sistema.view.Produccion.TipoActMantMaquina.Formulario',
		'Sistema.view.Produccion.TipoNovedadCT.Listado',
		'Sistema.view.Produccion.TipoNovedadCT.Formulario',
		'Sistema.view.Produccion.UnidadDeMedida.Formulario',
		'Sistema.view.Produccion.HojaDeRuta.Formulario',
		'Sistema.view.Produccion.HojaDeRuta.Listado',
		'Sistema.view.Produccion.HojaDeRuta.Operaciones.Listado',
		'Sistema.view.Produccion.FormulaDeProduccion.Formulario',
		'Sistema.view.Produccion.FormulaDeProduccion.Listado',
		'Sistema.view.Produccion.FormulaDeProduccion.Detalles.Listado',
		'Sistema.view.Produccion.FormulaDeProduccion.Detalles.Formulario',
		'Sistema.view.Produccion.UnidadDeMedida.Listado',
		'Sistema.view.Produccion.Producto.Formulario',
		'Sistema.view.Produccion.Producto.Listado',
		'Sistema.view.Produccion.Producto.UnidadesAlernativas.Formulario',
		'Sistema.view.Produccion.Producto.UnidadesAlernativas.Listado',
		'Sistema.view.Produccion.Producto.Atributos.Listado',
		'Sistema.view.Produccion.Producto.Atributos.Formulario',
		'Sistema.view.Produccion.Producto.FormulasDeProduccion.Listado',
		'Sistema.view.Produccion.Producto.OperacionesHojaDeRuta.Listado',
		'Sistema.view.Produccion.Producto.ProductoAlmacen.Listado',
		'Sistema.view.Produccion.AtributoProducto.Formulario',
		'Sistema.view.Produccion.AtributoProducto.Listado',
		'Sistema.view.Produccion.TipoDeProducto.Formulario',
		'Sistema.view.Produccion.TipoDeProducto.Listado',
		'Sistema.view.Produccion.AgrupadorProductoPrimario.Listado',
		'Sistema.view.Produccion.AgrupadorProductoPrimario.Formulario',
		'Sistema.view.Produccion.AgrupadorProductoSecundario.Listado',
		'Sistema.view.Produccion.AgrupadorProductoSecundario.Formulario',
		'Sistema.view.Produccion.AgrupadorProductoTerciario.Listado',
		'Sistema.view.Produccion.AgrupadorProductoTerciario.Formulario',
		'Sistema.view.Produccion.TipoAtributoProducto.Listado',
		'Sistema.view.Produccion.TipoAtributoProducto.Formulario',
		'Sistema.view.Produccion.OrdenDeTrabajo.Formulario',
		'Sistema.view.Produccion.OrdenDeTrabajo.Listado',
		'Sistema.view.Produccion.OrdenDeTrabajo.ValeDeFabricacion.Listado',
		'Sistema.view.Produccion.OrdenDeTrabajo.HojaDeRuta.Formulario',
		'Sistema.view.Produccion.OrdenDeTrabajo.HojaDeRuta.Listado',
		'Sistema.view.Produccion.OrdenDeTrabajo.Formula.Listado',
		'Sistema.view.Produccion.OrdenDeTrabajo.ReservaMateriaPrima.Listado',
		'Sistema.view.Produccion.OrdenDeTrabajo.ReservaMateriaPrima.Formulario',
		'Sistema.view.Produccion.OrdenDeTrabajo.MedicionDeAtributos.Listado',
		'Sistema.view.Produccion.OrdenDeTrabajo.RegistroHistorico.Listado',
		'Sistema.view.Produccion.OrdenDeTrabajo.EstadoFabricacion.Listado',
		'Sistema.view.Produccion.ValeDeFabricacion.Formulario',
		'Sistema.view.Produccion.MedicionDeAtributo.Formulario',
		'Sistema.view.Produccion.LoteDeFabricacion.Listado',
		'Sistema.view.Produccion.LoteDeFabricacion.Formulario',
		'Sistema.view.Produccion.LoteDeFabricacion.ValesDeFabricacion.Listado',
		'Sistema.view.Produccion.NovedadCentroDeTrabajo.Formulario',
		'Sistema.view.Produccion.NovedadCentroDeTrabajo.Listado',
		'Sistema.view.Produccion.ProgramaDeTrabajo.Listado',
		'Sistema.view.Produccion.ZonaStock.Listado',
		'Sistema.view.Produccion.ZonaStock.Formulario',
		'Sistema.view.Produccion.AreaStock.Formulario',
		'Sistema.view.Produccion.AreaStock.Listado',
		'Sistema.view.Produccion.UbicacionAlmacen.Formulario',
		'Sistema.view.Produccion.UbicacionAlmacen.Listado',
		'Sistema.view.Produccion.TipoMovimientoStock.Formulario',
		'Sistema.view.Produccion.TipoMovimientoStock.Listado',
		'Sistema.view.Produccion.BusquedaUbicacion.Listado',
		'Sistema.view.Produccion.MovimientoStock.Formulario',
		'Sistema.view.Produccion.MovimientoStock.Listado',
		'Sistema.view.Produccion.MovimientoStock.DetMovimientoStock.Formulario',
		'Sistema.view.Produccion.MovimientoStock.DetMovimientoStock.Listado',
		'Sistema.view.Produccion.ConsultaUbicacionMovStock.Listado',
		'Sistema.view.Produccion.ConsultaDetalleUbicacion.Listado',
		'Sistema.view.Produccion.VisualizacionMovimientoStock.Formulario'
    ],

    controllers: [
        'Root'
    ],

    stores: [
    ],

    launch: function () {
		//
		// sstring: Standar String
		// String que no contiene comillas ni caracteres de escape.
		//
		Ext.apply(Ext.form.field.VTypes, {
			sstring: function(val, field) {
				return !RegExp("\'|\"").test(val);
			},

			sstringText: 'Campo de texto invalido'
		});

		//
		// cstring: Code String
		// String que no contiene comillas ni caracteres de escape, ni espacios.
		//
		Ext.apply(Ext.form.field.VTypes, {
			cstring: function(val, field) {
				return !RegExp("\'|\"| ").test(val);
			},

			cstringText: 'Campo de texto invalido'
		});

		//
		// numerico: Code String
		// String numerico. Solo numeros enteros.
		//
		Ext.apply(Ext.form.field.VTypes, {
			numerico: function(val, field) {
				return RegExp("^[0-9]{1,10}$").test(val);
			},

			numericoText: 'Campo numerico invalido'
		});
    }
});
