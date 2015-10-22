<?
// #### OK ####
// Parametros:
// $m: FormularioMaestro
//
//GenerarFormularioJS ($m, $m->Modulo->Ruta . "." . $m->Modulo->Nombre . "." . $m->NombreEntidad, $m->PrefijoXType);
//
//GenerarFormularioJS ($d->Formulario, $m->Modulo->Ruta . "." . $m->Modulo->Nombre . "." . $m->NombreEntidad . "." . $d->NombreEntidad, $d->getXtype ($m->PrefijoXtype));

function GenerarFormularioJS ($form, $ruta, $xtype) {
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

	$ret = $ret . "Ext.define('" . $ruta . ".Formulario',{
	extend: 'Ext.form.Panel',
    alias: 'widget." . $xtype . "-Formulario',
    controller: '" . $xtype . "-FormularioController',
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
		items: [{";
	
	$i = 0;
	foreach ($form->Campos as $item) {
		if ($item->EsVisible) {
			switch ($item->Tipo) {
				case 1:	// Combo
					$ret = $ret . "
			xtype			: 'combo',
			fieldLabel		: '" . $item->Etiqueta . "',
			name			: '" . $item->GetNombreComponente () . "',
			queryMode		: 'local',
			editable		: true,
			forceSelection	: true,
			allowBlank		: false,
			typeAhead		: true,
			valueField		: '" . $item->DetalleCombo->IdField . "',
			displayField	: '" . $item->DetalleCombo->DescField . "',
			store			: Ext.create ('" . $item->DetalleCombo->Store . "', {autoLoad: false})\n";
					break;
				
				case 2: // Texto
					$ret = $ret . "
			xtype: 'textfield',
			name: '" . $item->GetNombreComponente () . "',
			fieldLabel: '" . $item->Etiqueta . "',
			allowBlank: " . ($item->EsNull ? 'true' : 'false') . ",
			vtype: 'sstring'\n";		
					break;
					
				case 3: // Textarea
					$ret .= "
			xtype: 'textareafield',
			name: '" . $item->GetNombreComponente () . "',
			fieldLabel: '" . $item->Etiqueta . "',
			allowBlank: " . ($item->EsNull ? 'true' : 'false') . ",
			vtype: 'sstring'\n";
					break;
					
				case 4: // Nada
					break;
					
				case 5: // Numerico entero
					$ret = $ret . "
			xtype: 'textfield',
			name: '" . $item->GetNombreComponente () . "',
			fieldLabel: '" . $item->Etiqueta . "',
			allowBlank: " . ($item->EsNull ? 'true' : 'false') . ",
			vtype: 'numerico'\n";
					break;
					
				case 6: // Numerico flotante
					$ret = $ret . "
			xtype: 'textfield',
			name: '" . $item->GetNombreComponente () . "',
			fieldLabel: '" . $item->Etiqueta . "',
			allowBlank: " . ($item->EsNull ? 'true' : 'false') . "\n";
					break;
					
				case 7; // Codigo numerico
					$ret = $ret . "
			xtype: 'textfield',
			name: '" . $item->GetNombreComponente () . "',
			fieldLabel: '" . $item->Etiqueta . "',
			allowBlank: " . ($item->EsNull ? 'true' : 'false') . ",
			vtype: 'cstring'\n";
					break;
					
				case 8: // Checkbox
					$ret = $ret . "
			xtype: 'checkbox',
			name: '" . $item->GetNombreComponente () . "',
			fieldLabel: '" . $item->Etiqueta . "'\n";
					break;
					
				case 11: // Monto
					$ret = $ret . "
			xtype: 'textfield',
			name: '" . $item->GetNombreComponente () . "',
			fieldLabel: '" . $item->Etiqueta . "',
			allowBlank: " . ($item->EsNull ? 'true' : 'false') . "\n";		
					break;
			}
			
			if ($i < $form->GetCantCamposDetalleVisibles () - 1) {
				$ret = $ret . "\t\t}, {";
			}
			
			$i++;
		}
	}

	$ret .= "\t\t}]";

	if ($form->Tipo == TFORM_ABM_MAESTRO_DETALLE) {
		$ret .="
	}, {
		xtype: 'panel',
		height: 10
	}, {
		xtype: 'tabpanel',
		name: 'formTabPanel',
		items:[{";
			
		for ($i = 0; $i < count ($form->Detalles); $i++) {
			$ret .= "
			title: '" . $form->Detalles[$i]->Etiqueta . "',
			disabled: false,
			items: [{
				xtype: '" . $form->Detalles[$i]->getXtype ($form->PrefijoXtype) . "-Listado'
			}]\n";
				
			if ($i < count ($form->Detalles) - 1) {
				$ret .= "\t\t}, {";
			
			} else {
				$ret .= "\t\t}]\n";
			}
		}
		
		$ret .="\t}],\n";

	} else {
		$ret .= "\n\t}],\n";
	}

	$ret .= "\tbuttons: [{
		text: 'Guardar',
		iconCls:'btnGuardar',
		name: 'btnGuardar'
	}, {
		text: 'Borrar',
		iconCls:'btnBorrar',
		name: 'btnBorrar'
	}]
});\n";

	return $ret;
}
?>