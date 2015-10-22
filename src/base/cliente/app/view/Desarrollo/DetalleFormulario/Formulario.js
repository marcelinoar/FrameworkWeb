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

Ext.define('Sistema.view.Desarrollo.DetalleFormulario.Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget.des-fdet-Formulario',
    controller: 'des-fdet-FormularioController',
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
			fieldLabel		: 'Tipo Detalle',
			name			: 'cbTipoDetalleFormularioId',
			queryMode		: 'local',
			editable		: true,
			forceSelection	: true,
			allowBlank		: false,
			typeAhead		: true,
			valueField		: 'id',
			displayField	: 'descripcion',
			emptyText		: 'Tipo del detalle que estamos generando',
			store			: Ext.create ('Sistema.view.Desarrollo.store.StoreTipoDetalleFormulario', {autoLoad: false})
		}, {
			xtype: 'textfield',
			name: 'tbNombreEntidad',
			emptyText: 'Nombre de la tabla, nombre de la subcarpeta dentro del maestro',
			fieldLabel: 'Nombre Entidad',
			allowBlank: false,
			vtype: 'sstring'
		}, {
			xtype: 'textfield',
			name: 'tbPrefijoXtype',
			emptyText		: 'Prefijo Xtype que se agrega al del maestro. Por ej: uxg',
			fieldLabel: 'Prefijo XType',
			allowBlank: false,
			vtype: 'sstring'
		}, {
			xtype: 'textfield',
			name: 'tbRutaEntidad',
			emptyText		: 'Nombre del paquete al que pertenece la entidad. Ubicacion de la carpeta store que lo contiene',
			fieldLabel: 'Ruta Entidad',
			allowBlank: false,
			vtype: 'sstring'
		}, {
			xtype: 'textfield',
			name: 'tbClaseEntidad',
			emptyText		: 'Nombre de la entidad relacionada con el maestro referenciada completamente. Ej: Sistema.model.Usuario',
			fieldLabel: 'Clase Entidad',
			allowBlank: false,
			vtype: 'sstring'
		}, {
			xtype: 'textfield',
			name: 'tbEtiqueta',
			emptyText		: 'Nombre del tab',
			fieldLabel: 'Etiqueta',
			allowBlank: false,
			vtype: 'sstring'
		}, {
			xtype: 'textfield',
			name: 'tbNombreCampoFormulario',
			emptyText		: 'Nombre del campo en la entidad maestro que contiene la relacion',
			fieldLabel: 'Nombre Campo Formulario',
			allowBlank: false,
			vtype: 'sstring'
		}, {
			xtype: 'textareafield',
			name: 'tbDescripcion',
			emptyText		: 'Descripcion asociada al modelo',
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
			title: 'Campos Formulario',
			disabled: false,
			items: [{
				xtype: 'des-fdet-cf-Listado'
			}]
		}, {
			title: 'Campos Listado',
			disabled: false,
			items: [{
				xtype: 'des-fdet-cd-Listado'
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
