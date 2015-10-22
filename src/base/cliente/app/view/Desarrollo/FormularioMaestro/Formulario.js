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

Ext.define('Sistema.view.Desarrollo.FormularioMaestro.Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget.des-fmae-Formulario',
    controller: 'des-fmae-FormularioController',
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
			xtype			: 'combo',
			fieldLabel		: 'Modulo',
			name			: 'cbModuloId',
			queryMode		: 'local',
			editable		: true,
			forceSelection	: true,
			allowBlank		: false,
			typeAhead		: true,
			valueField		: 'id',
			displayField	: 'nombre',
			emptyText		: 'Nombre del modulo al que pertenece el ABM',
			store			: Ext.create ('Sistema.view.Desarrollo.store.StoreModelos', {autoLoad: false})
		}, {
			xtype			: 'combo',
			fieldLabel		: 'Tipo Formulario',
			name			: 'cbTipoFormularioId',
			queryMode		: 'local',
			editable		: true,
			forceSelection	: true,
			allowBlank		: false,
			typeAhead		: true,
			valueField		: 'id',
			displayField	: 'descripcion',
			emptyText		: 'Maestro/Maestro-Detalle',
			store			: Ext.create ('Sistema.view.Desarrollo.store.StoreTipoFormulario', {autoLoad: false})
		}, {
			xtype: 'textfield',
			name: 'tbNombreEntidad',
			fieldLabel: 'Nombre Entidad',
			allowBlank: false,
			emptyText		: 'Es el nombre de la tabla',
			vtype: 'sstring'
		}, {
			xtype: 'textfield',
			name: 'tbNombreEntidadPermisos',
			fieldLabel: 'Codigo Permiso',
			emptyText		: 'Codigo que identifica a la entidad para permisos, ej: Sistema:Usuario',
			allowBlank: false,
			vtype: 'sstring'
		}, {
			xtype: 'textfield',
			name: 'tbPrefijoXtype',
			fieldLabel: 'Prefijo XType',
			allowBlank: false,
			emptyText		: 'Debe comenzar con el prefijo del modulo.Por Ejemplo:sis-usr',
			vtype: 'sstring'
		}, {
			xtype: 'textfield',
			name: 'tbNombreSecuencia',
			fieldLabel: 'Secuencia',
			emptyText		: 'Nombre de la secuencia',
			allowBlank: false,
			vtype: 'sstring'
		}, {
			xtype: 'textareafield',
			name: 'tbDescripcion',
			emptyText		: 'Descripcion que va a quedar en el modelo',
			fieldLabel: 'Descripcion',
			allowBlank: true,
			vtype: 'sstring'
		}]
	}, {
		xtype: 'panel',
		height: 10
	}, {
		xtype: 'tabpanel',
		name: 'formTabPanel',
		items:[{
			title: 'Detalles',
			disabled: false,
			items: [{
				xtype: 'des-fmae-df-Listado'
			}]
		}, {
			title: 'Campos Formulario',
			disabled: false,
			items: [{
				xtype: 'des-fmae-cf-Listado'
			}]
		}, {
			title: 'Campos Listado',
			disabled: false,
			items: [{
				xtype: 'des-fmae-cd-Listado'
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
