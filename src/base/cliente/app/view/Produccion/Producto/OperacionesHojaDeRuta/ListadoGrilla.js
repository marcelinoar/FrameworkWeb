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

Ext.define ('Sistema.view.Produccion.Producto.OperacionesHojaDeRuta.ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	alias	: 'widget.prod-producto-ophr-ListadoGrilla',
	height	: '250',
	forceFit: true,
	viewConfig:{
		markDirty:false
	},
	scroll			: 'vertical',
	enableColumnHide: false,
	enableColumnMove: false,
	frame: true,
    selType: 'cellmodel',
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1,
		listeners: {
			beforeedit: function(editor ,e ,eOpts ){
			  e.value = '';
			}
		}
    },
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: "<table width:'100%'><tr height='20'><td><b>{name}</b></td></tr></table>",
		hideGroupedHeader: false,
		enableGroupingMenu: false,
        startCollapsed: true
    }],
	columns: {
		items: [
			{text: 'Operacion', width:130},
			{
				menuDisabled: true,
				text: 'Maquina',
				dataIndex: 'codigoMaquina',
				width:140
			}, {
				menuDisabled: true,
				text: 'T. Maq (min)',
				dataIndex: 'tiempoTrabajo',
				width: 79,
				editor: {
					xtype: 'textfield',
					allowBlank: true
				},
				renderer: Formato.PuntoFlotante.Transformar
			}, {
				menuDisabled: true,
				text: 'T. Prep. (min)',
				dataIndex: 'tiempoPreparacion',
				width: 82,
				editor: {
					xtype: 'textfield',
					allowBlank: true
				},
				renderer: Formato.PuntoFlotante.Transformar
			}, {
				menuDisabled: true,
				text: 'Cnt. Oper',
				dataIndex: 'cntOperTrabajo',
				editor: {
					xtype: 'textfield',
					allowBlank: true
				},
				width: 84
			}, {
				menuDisabled: true,
				text: 'Cnt. Oper Prep',
				dataIndex: 'cntOperPreparacion',
				editor: {
					xtype: 'textfield',
					allowBlank: true
				},
				width: 109
			},{
				menuDisabled: true,
				text: 'Kg Merma',
				dataIndex: 'kgDeMerma',
				width: 77,
				editor: {
					xtype: 'textfield',
					allowBlank: true
				},
				renderer: Formato.PuntoFlotante.Transformar
			}, {
				menuDisabled: true,
				text: 'Kg Recorte',
				dataIndex: 'kgDeRecorte',
				width: 78,
				editor: {
					xtype: 'textfield',
					allowBlank: true
				},
				renderer: Formato.PuntoFlotante.Transformar
			}
		]
	}
});