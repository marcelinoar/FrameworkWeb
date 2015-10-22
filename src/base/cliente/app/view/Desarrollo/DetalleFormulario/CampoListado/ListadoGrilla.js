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

Ext.define ('Sistema.view.Desarrollo.DetalleFormulario.CampoListado.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	height	: 500,
	alias	: 'widget.des-fdet-cd-ListadoGrilla',
	forceFit: true,
	columns: {
		items: [
			{text: 'Etiqueta', dataIndex: 'etiqueta'	, width: '35%'},
			{text: 'Nombre', dataIndex: 'nombre'	, width: '35%'},
			{
				menuDisabled: true,
				name:'colEditar',
				width: 25,
				sortable: false,
				xtype: 'actioncolumn',
				handler: 'onEditarRegistroGrilla',
				items: [{
					iconCls: 'btnEditar',
					tooltip: 'Editar'
				}]
			}, {
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