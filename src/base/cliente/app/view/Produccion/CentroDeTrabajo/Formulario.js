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

Ext.define('Sistema.view.Produccion.CentroDeTrabajo.Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget.prod-ct-Formulario',
    controller: 'prod-ct-FormularioController',
	closable: false,
	bodyPadding: 10,

	layout: {
		type: 'vbox',
		align: 'stretch',
		pack: 'top'
	},

	items: [{
		xtype: 'form',
		layout: {
			type: 'form',
			align: 'stretch',
			pack: 'top'
		},
		items: [{
			xtype: 'textfield',
			name: 'tbCodigo',
			width: 150,
			fieldLabel: 'Codigo',
			allowBlank: false,
			vtype: 'cstring'
		}, {
			xtype: 'textfield',
			name: 'tbNombre',
			fieldLabel: 'Nombre',
			allowBlank: false,
			vtype: 'sstring'
		}, {
			xtype: 'fieldcontainer',
			fieldLabel: 'Planta',
			msgTarget : 'side',
			layout: 'hbox',
			defaults: {
				flex: 1,
				hideLabel: true
			},
			items: [{
				xtype: 'textfield',
				name: 'tbPlantaId',
				allowBlank: true,
				width: 100,
				vtype: 'numerico'
			}, {
				width: 10
			}, {
				xtype: 'textfield',
				width: 200,
				name: 'tbNombrePlanta',
				readOnly: true,
				vtype: 'sstring'
			}, {
				width: 10
			}, {
				iconCls: 'btnBuscar',
				name: 'btnBuscarPlanta',
				xtype: 'button'
			}]
		}, {
			xtype: 'fieldcontainer',
			fieldLabel: 'Almacen Asociado',
			msgTarget : 'side',
			layout: 'hbox',
			defaults: {
				flex: 1,
				hideLabel: true
			},
			items: [{
				xtype: 'textfield',
				name: 'tbCodAlmacenAsociado',
				allowBlank: false,
				width: 100,
				vtype: 'cstring'
			}, {
				width: 10
			}, {
				xtype: 'textfield',
				name: 'tbNombreAlmacenAsociado',
				width: 200,
				readOnly: true,
				vtype: 'sstring'
			}, {
				width: 10
			}, {
				iconCls: 'btnBuscar',
				name: 'btnBuscarAlmacenAsociado',
				xtype: 'button'
			}]
		}, {
			xtype: 'checkboxgroup',
			fieldLabel: 'Caracteristicas',
			columns:2,
			items: [{
				boxLabel:'Genera Pallet',
				name: 'ckGeneraPallet'
			}, {
				boxLabel:'Se organiza por Lote',
				name: 'ckOrganizaPorLote'
			}]
		}]
	}, {
		xtype: 'panel',
		height: 10
	}, {
		xtype: 'tabpanel',
		name: 'formTabPanel',
		items:[{
			title: 'Maquinas',
			disabled: false,
			items: [{
				xtype: 'prod-ct-maq-Listado'
			}]
		}, {
			title: 'Atributos',
			disabled: false,
			items: [{
				xtype: 'prod-ct-att-Listado'
			}]
		}, {
			title: 'Operaciones',
			disabled: false,
			items: [{
				xtype: 'prod-ct-oper-Listado'
			}]
		}]
	}],
	buttons: [{
		text: 'Guardar',
		iconCls:'btnGuardar',
		name: 'btnGuardar'
	}, {
		text: 'Borrar',
		iconCls:'btnBorrar',
		name: 'btnBorrar'
	}]
});
