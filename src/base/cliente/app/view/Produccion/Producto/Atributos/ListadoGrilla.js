/**************************************************************************************************
 * Archivo: Formulario.js
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

Ext.define ('Sistema.view.Produccion.Producto.Atributos.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	height	: 185,
	alias	: 'widget.prod-producto-att-ListadoGrilla',
	forceFit: true,
	enableColumnHide: false,
	enableColumnMove: false,
	viewConfig:{
	    markDirty:false
	},
	columns: {
		items: [
			{menuDisabled: true, text: 'Propiedad'	, dataIndex: 'nombre'			, flex: 1},
			{menuDisabled: true, text: 'Valor'		, dataIndex: 'valor'			, width: '30%', renderer: Formato.PuntoFlotante.Transformar},
			{menuDisabled: true, text: 'UM'			, dataIndex: 'unidadDeMedidaId'	, width: '20%', renderer: 'renCodigoUnidadDeMedida'},
			{
				menuDisabled: true,
				width: 25,
				name:'colBorrar',
				sortable: false,
				xtype: 'actioncolumn',
				handler: 'onBorrarRegistroGrilla',
				items: [{
					iconCls: 'btnBorrar',
					tooltip: 'Borrar'
				}]
			}]
	}
});