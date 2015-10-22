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

Ext.define ('Sistema.view.Desarrollo.Modulo.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	height	: 500,
	alias	: 'widget.des-mod-ListadoGrilla',
	forceFit: true,
	columns: {
		items: [
			{
				menuDisabled: true,
				xtype: 'checkcolumn',
				header: 'Seleccionar',
				dataIndex: 'seleccion',
				width: 100,
				name: 'colSeleccion',
				stopSelection: false
            },
			{text: 'Codigo', dataIndex: 'codigo'	, width: '10%'},
			{text: 'Nombre', dataIndex: 'nombre'	, flex:1},
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