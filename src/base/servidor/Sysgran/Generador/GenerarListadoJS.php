<?
// #### OK ####
// Parametros:
// $m : FormularioMaestro
//
function GenerarListadoMaestroJS ($m) {
	$ret  = '/**************************************************************************************************' . "\n";
  	$ret .= ' * Archivo: Listado.js' . "\n";
  	$ret .= ' * ------------------------------------------------------------------------------------------------' . "\n";
 	$ret .= ' * Version: 1.0' . "\n";
  	$ret .= ' * Descripcion:' . "\n";
 	$ret .= ' * Modificaciones:' . "\n";
  	$ret .= ' *	-' . "\n";
 	$ret .= ' *' . "\n";
  	$ret .= ' * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.' . "\n";
 	$ret .= ' **************************************************************************************************/' . "\n\n";

	$ret = $ret . "Ext.define ('" . $m->Modulo->Ruta . "." . $m->Modulo->Nombre . "." . $m->NombreEntidad . ".Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: '" . $m->PrefijoXtype . "-ListadoController',
    alias			: 'widget." . $m->PrefijoXtype . "-Listado',
	requires:[
		'" . $m->Modulo->Ruta . "." . $m->Modulo->Nombre . "." . $m->NombreEntidad . ".ListadoGrillaStore'
	],    
	closable		: false,
	layout			: {
		type: 'vbox',
		align : 'stretch',
		pack  : 'start'
	},

	bbar:[{
		xtype: 'tbfill'
	}, {
		xtype: 'button',
		name: 'btnAceptar',
		text: 'Aceptar',
		iconCls: 'btnAceptar'
	}, {
		xtype: 'button',
		name: 'btnCancelar',
		text: 'Cancelar',
		iconCls: 'btnCancelar'
	}, {
		xtype: 'tbfill'
	}],

	tbar: 	[{
		xtype: 'button',
		text: 'Nuevo Registro',
		name: 'btnNuevo',
		iconCls: 'btnNuevo'
	}, {
		xtype: 'tbfill'
	}, {
		xtype: 'button',
		text: 'Exportar Datos',
		name: 'btnExportar',
		menu: [{
			text: 'Exportar a Pdf',
			handler: 'onGenerarListadoPdf',
			name: 'exportarPdf'
		}, {
			text: 'Exportar a Excel',
			handler: 'onGenerarListadoExcel',
			name: 'exportarExcel'
		}]
	}],

	items: [{
		xtype	: 'panel',
		height 	: 10
	}, {
		xtype: 'fieldset',
		title: 'Filtrar Resultados',
		name: 'FilterFieldSet',
		collapsible: true,
		collapsed: true,
		defaults: {
			anchor: '30%',
			layout: {
				type: 'hbox'
			}
		},
		items: [{
			xtype: 'panel',
			anchor:'100%',
			layout: {
				type: 'hbox'
			},
			items: [{
				xtype: 'form',
				anchor:'60%',
				fieldDefaults:{
					labelAlign:'left',
					labelWidth:130
				},
				items: [{
		// Aca van los componentes de la primera columna
				}]
			}, {
				width:10
			}, {
				xtype: 'form',
				anchor:'50%',
				items: [{
		// Aca van los componentes de la segunda columna				
				}]
			}]
		}, {
			height:10			
		}, {
			xtype: 'panel',
			anchor:'100%',
			layout: {
				type: 'hbox'
			},
			items: [{
				xtype: 'button',
				text: 'Limpiar Filtros',
				name: 'btnLimpiarFiltros',
				tooltip: 'Limpiar el valor de los filtros'
			}, {
				width: 20
			}, {
				xtype: 'button',
				text: 'Buscar',
				name: 'btnBuscar',
				tooltip: 'Ejecutar la consulta'
			}]
		}, {
			height: 10
		}]
	}, {
		xtype	: 'panel',
		height 	: 10
	}, {
		flex	: 1,
		xtype 	: '" . $m->PrefijoXtype . "-ListadoGrilla'
	}]
});";

	return $ret;
}

// #### OK ####
// Parametros:
// $m : FormularioMaestro
// $d : DetalleFormulario
//
function GenerarListadoDetalleJS ($m, $d) {
	$ret  = '/**************************************************************************************************' . "\n";
  	$ret .= ' * Archivo: Listado.js' . "\n";
  	$ret .= ' * ------------------------------------------------------------------------------------------------' . "\n";
 	$ret .= ' * Version: 1.0' . "\n";
  	$ret .= ' * Descripcion:' . "\n";
 	$ret .= ' * Modificaciones:' . "\n";
  	$ret .= ' *	-' . "\n";
 	$ret .= ' *' . "\n";
  	$ret .= ' * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.' . "\n";
 	$ret .= ' **************************************************************************************************/' . "\n\n";

	$ret .= "Ext.define ('" . $m->Modulo->Ruta . "." . $m->Modulo->Nombre . "." . $m->NombreEntidad . "." . $d->NombreEntidad . ".Listado', {
    extend			: 'Ext.panel.Panel',
    controller		: '" . $d->getXtype ($m->PrefijoXtype) . "-ListadoController',
    alias			: 'widget." . $d->getXtype ($m->PrefijoXtype) . "-Listado',
	closable		: false,

	tbar: [{
		xtype: 'button',
		text: 'Agregar Registro',
		name: 'btnNuevo',
		iconCls: 'btnNuevo',
		tooltip: 'Agregar un nuevo registro'
	}, {
		xtype: 'tbfill'
	}";
	
	if ($d->Tipo == TDET_MUCHOS_MUCHOS) {
		$ret .= ", {
		xtype: 'button',
		text: 'Recargar Listado',
		name: 'btnRecargarListado',
		iconCls: 'btnRecargar',
		tooltip: 'Refrescar los datos del listado'\n\t}";
	}
	$ret .= "],

	items: [{
		xtype: '" . $d->getXtype ($m->PrefijoXtype) . "-ListadoGrilla'
	}]
});";

	return $ret;
}

?>