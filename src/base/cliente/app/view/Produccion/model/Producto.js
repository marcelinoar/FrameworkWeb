/**************************************************************************************************
 * Archivo: Producto.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Productos
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.model.Producto', {
	extend: 'Ext.data.Model',
	requires: [
		'Sistema.view.Produccion.model.UnidadAlternativaProducto',
		'Sistema.view.Produccion.model.ArchivoAdjuntoProducto',
		'Sistema.view.Produccion.model.ValorAtributoProducto',
		'Sistema.view.Produccion.model.FormulaDeProduccion',
		'Sistema.view.Produccion.model.DetHojaDeRutaProductoMaquina',
		'Sistema.view.Produccion.model.DetProductoAlmacen'
	],
	fields: [
		{name: 'codigo'},
		{name: 'tipoDeProductoId'},
		{name: 'estadoProductoId'},
		{name: 'lineaDeProduccionId'},
		{name: 'unidadDeMedidaStockId'},
		{name: 'agrupadorProductoPrimarioId'},
		{name: 'agrupadorProductoSecundarioId'},
		{name: 'agrupadorProductoTerciarioId'},
		{name: 'descripcionCorta'},
		{name: 'descripcionLarga'},
		{name: 'archivosAdjuntos'},
		{name: 'unidadesAlternativas'},
		{name: 'detHojaDeRutaProductoMaquina'},
		{name: 'productoAlmacen'},
		{name: 'atributos'},
		{name: 'formulas'},
		{name: 'operaciones'}
	],
	hasMany: [{
		model: 'Sistema.view.Produccion.model.UnidadAlternativaProducto',
		name: 'unidadesAlternativas'
	}, {
		model: 'Sistema.view.Produccion.model.ArchivoAdjuntoProducto',
		name: 'archivosAdjuntos'
	}, {
		model: 'Sistema.view.Produccion.model.ValorAtributoProducto',
		name: 'atributos'
	}, {
		model: 'Sistema.view.Produccion.model.FormulaDeProduccion',
		name: 'formulas'
	}, {
		model: 'Sistema.view.Produccion.model.DetHojaDeRutaProductoMaquina',
		name: 'operaciones'
	}, {
		model: 'Sistema.view.Produccion.model.DetHojaDeRutaProductoMaquina',
		name: 'detHojaDeRutaProductoMaquina'
	}, {
		model: 'Sistema.view.Produccion.model.DetProductoAlmacen',
		name: 'productoAlmacen'
	}],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/Modulos/Produccion/Producto/FormularioController.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/Modulos/Produccion/Producto/FormularioController.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/Modulos/Produccion/Producto/FormularioController.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/Modulos/Produccion/Producto/FormularioController.php?f=Borrar'
		},
		reader: {
			type: 'json',
			rootProperty: 'root'
		},
		writer: {
			writeAllFields: true,
			allDataOptions: {
				associated: true
			}
		}
	}
});
