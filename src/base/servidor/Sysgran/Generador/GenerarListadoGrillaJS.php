<?
// #### OK ####
// Parametros:
// $m : FormularioMaestro
//
function GenerarListadoMaestroGrillaJS ($m) {
	$ret  = '/**************************************************************************************************' . "\n";
  	$ret .= ' * Archivo: Formulario.js' . "\n";
  	$ret .= ' * ------------------------------------------------------------------------------------------------' . "\n";
 	$ret .= ' * Version: 1.0' . "\n";
  	$ret .= ' * Descripcion:' . "\n";
 	$ret .= ' * Modificaciones:' . "\n";
  	$ret .= ' *	-' . "\n";
 	$ret .= ' *' . "\n";
  	$ret .= ' * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.' . "\n";
 	$ret .= ' **************************************************************************************************/' . "\n\n";

	$ret = $ret . "Ext.define ('" . $m->Modulo->Ruta . "." . $m->Modulo->Nombre . "." . $m->NombreEntidad . ".ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	alias	: 'widget." . $m->PrefijoXtype . "-ListadoGrilla',
	layout	: 'fit',			
	forceFit: true,
	enableColumnHide: false,
	enableColumnMove: false,
	viewConfig:{
		markDirty:false
	},	
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
            },\n";
    
    foreach ($m->Listado->Campos as $item) {
    	$ret = $ret . "\t\t\t{menuDisabled: true, ";
    	
    	if ($item->Tipo == TCAMPO_CHECKBOX) {
    		$ret = $ret . "xtype: 'checkcolumn', ";
    	}
    	
    	$ret = $ret . "text: '" . $item->Etiqueta . "', dataIndex: '" . $item->Nombre . "'	, ";
    	
    	if ($item->EsFlex) {
    		$ret = $ret . "flex:1";
    		
    	} else {
    		$ret = $ret . "width: '" . $item->AnchoColumna . "%'";
    	}
    	
    	if ($item->SubCampo) {
    		$ret = $ret . ", renderer: function(value) {return value." . $item->NombreSubCampo . ";}";
    	
    	} else if ($item->Tipo == TCAMPO_MONTO) {
    		$ret = $ret . ", renderer: Formato.Dinero.Transformar}";
    	}

   		$ret = $ret . "},\n";
    }
    
    $ret = $ret . "\t\t\t{
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
	},
    dockedItems: [{
        xtype			: 'pagingtoolbar',
        dock			: 'bottom',
        displayInfo		: true,
		beforePageText 	: 'Pagina',
		afterPageText  	: 'de {0}',
		firstText      	: 'Primera Pagina',
		prevText       	: 'Pagina Anterior',
		nextText       	: 'Proxima Pagina',
		lastText       	: 'Ultima Pagina',
		refreshText    	: 'Refrescar',
		displayMsg		: 'Mostrando resultados {0} - {1} de {2}',
	    emptyMsg		: 'No hay datos que mostrar'
    }]
});";

	return $ret;
}

// #### OK ####
// Parametros:
// $m : FormularioMaestro
// $d : DetalleFormulario
//
function GenerarListadoDetalleGrillaJS ($m, $d) {
	$ret  = '/**************************************************************************************************' . "\n";
  	$ret .= ' * Archivo: Formulario.js' . "\n";
  	$ret .= ' * ------------------------------------------------------------------------------------------------' . "\n";
 	$ret .= ' * Version: 1.0' . "\n";
  	$ret .= ' * Descripcion:' . "\n";
 	$ret .= ' * Modificaciones:' . "\n";
  	$ret .= ' *	-' . "\n";
 	$ret .= ' *' . "\n";
  	$ret .= ' * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.' . "\n";
 	$ret .= ' **************************************************************************************************/' . "\n\n";

	$ret = $ret . "Ext.define ('" . $m->Modulo->Ruta . "." . $m->Modulo->Nombre . "." . $m->NombreEntidad . "." . $d->NombreEntidad . ".ListadoGrilla', {
	extend  : 'Ext.grid.Panel',
	alias	: 'widget." . $d->getXtype ($m->PrefijoXtype) . "-ListadoGrilla',
	forceFit: true,
	layout	: 'fit',			
	viewConfig:{
		markDirty:false
	},
	enableColumnHide: false,
	enableColumnMove: false,
	columns: {
		items: [\n";
    
    foreach ($d->Listado->Campos as $item) {
    	$ret = $ret . "\t\t\t{menuDisabled: true, ";
    	
    	if ($item->EsCheckColumn) {
    		$ret = $ret . "xtype: 'checkcolumn', ";
    	}
    	
    	$ret = $ret . "text: '" . $item->Etiqueta . "', dataIndex: '" . $item->Nombre . "'	, ";
    	
    	if ($item->Flex) {
    		$ret = $ret . "flex:1";
    		
    	} else {
    		$ret = $ret . "width: '" . $item->AnchoColumna . "%'";
    	}
    	
    	if ($item->SubCampo) {
    		$ret = $ret . ", renderer: function(value) {return value." . $item->NombreSubCampo . ";}";
    	}

   		$ret = $ret . "},\n";
    }
    
    $ret = $ret . "\t\t\t{
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
});";

	return $ret;
}

?>
