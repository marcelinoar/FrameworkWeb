<?
// #### OK ####
// Parametros:
// $m: FormularioMaestro
//
function GenerarFormularioControllerMaestroJS ($m) {
	$ret  = '/**************************************************************************************************' . "\n";
  	$ret .= ' * Archivo: FormularioController.js' . "\n";
  	$ret .= ' * ------------------------------------------------------------------------------------------------' . "\n";
 	$ret .= ' * Version: 1.0' . "\n";
  	$ret .= ' * Descripcion:' . "\n";
 	$ret .= ' * Modificaciones:' . "\n";
  	$ret .= ' *	-' . "\n";
 	$ret .= ' *' . "\n";
  	$ret .= ' * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.' . "\n";
 	$ret .= ' **************************************************************************************************/' . "\n\n";

	$ret = $ret . "Ext.define ('" . $m->Modulo->Ruta . "." . $m->Modulo->Nombre . "." . $m->NombreEntidad . ".FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller." . $m->PrefijoXtype . "-FormularioController',
	requires: [
		'" . $m->Modulo->Ruta . "." . $m->Modulo->Nombre . ".model." . $m->NombreEntidad . "'
	],

    init: function () {
    	FormularioControllerBase.InyectarDependencia (this, '" . $m->Modulo->Ruta . "." . $m->Modulo->Nombre . ".model." . $m->NombreEntidad . "', '" . $m->NombreEntidadPermisos . "');

    	this.control ({
    		\"button[name='btnBorrar']\": {
    			click: this.onBtnBorrarClick
    		},
    		\"button[name='btnGuardar']\": {
    			click: this.onBtnGuardarClick
    		},
    		\"" . $m->PrefijoXtype . "-Formulario\": {
    			afterrender: this.onRender
    		}";
	
	foreach ($m->Campos as $item) {
		if ($item->Tipo == TCAMPO_MONTO) {
			$ret .= ",
			\"textfield[name='" . $item->GetNombreComponente () . "']\": {
				blur: this.FormatearCampoDinero
			}";
		
		} else if ($item->Tipo == TCAMPO_NUMERICO_FLOTANTE) {
			$ret .= ",
			\"textfield[name='" . $item->GetNombreComponente () . "']\": {
				blur: this.FormatearCampoPuntoFlotante
			}";
		}
	}
	
    $ret .= "
    	});
    },

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= " . $m->CalcularAnchoVentana () . ";
    	ctl.params.altoVentana		= " . $m->CalcularAltoVentana () . ";
    },

	CargarComponentes: function () {
		var me = this;
		
		this.params.nombreEntidad = 'NOMBRE_ENTIDAD';\n";

	// Controles visibles.
	foreach ($m->Campos as $item) {
		if ($item->EsVisible) {
			$ret = $ret . "\t\tthis.ctl." . $item->GetNombreComponente () . " = this.getView ().down (\"" . $item->GetNombreTipo () . "[name='" . $item->GetNombreComponente () . "']\");\n";
		}
	}
	
	$ret .= "\n";

	// Controles asociados a cada detalle.
	foreach ($m->Detalles as $item) {
		$cmp = $m->GetCampoPorNombre ($item->NombreCampoFormulario);
		$ret = $ret . "\t\tthis.ctl." . $cmp->GetNombreComponente () . " = this.getView ().down (\"" . $item->getXtype ($m->PrefijoXtype) . "-Listado\").controller;\n";
	}
	
	$ret .= "\n";
	
	// Asocia el store del detalle con el listado correspondiente.
	foreach ($m->Detalles as $item) {
		$cmp = $m->GetCampoPorNombre ($item->NombreCampoFormulario);
		$ret = $ret . "\t\tthis.ctl." . $cmp->GetNombreComponente () . ".ConfigurarListado (function () {me.SetDetalleModificado ();});\n";
	}
	
	$ret = $ret . "\t},
	
    GetElementoFoco: function () {
    	return \"" . $m->GetCampoFoco () . "\";
    },	

	CargarRegistroEnFormulario: function (rec, esNuevo) {
		this.params.registro = rec;\n";

	foreach ($m->Campos as $item) {
		if ($item->Tipo == TCAMPO_COMBO) {
			$ret = $ret . "\t\tthis.ctl." . $item->GetNombreComponente () . ".store.reload ();\n";
		}
	}

	$ret .= "\n";
	
	foreach ($m->Campos as $item) {
		if ($item->EsVisible) {
			if ($item->Tipo == TCAMPO_MONTO) {
				$ret = $ret . "\t\tthis.ctl." . $item->GetNombreComponente () . ".setValue (Formato.Dinero.Transformar (rec.get ('" . $item->Nombre . "')));\n";	
			
			} else {
				$ret = $ret . "\t\tthis.ctl." . $item->GetNombreComponente () . ".setValue (rec.get ('" . $item->Nombre . "'));\n";
			}
		}
	}
	
	$ret .= "\n";

	foreach ($m->Detalles as $item) {
		$cmp = $m->GetCampoPorNombre ($item->NombreCampoFormulario);
		$ret = $ret . "\t\tthis.ctl." . $cmp->GetNombreComponente () . ".setStoreDetalle (rec." . $item->NombreCampoFormulario . "());\n";
	}
	
	$ret = $ret . "\t},

	ObtenerRegistroDeFormulario: function () {\n";
	
	foreach ($m->Campos as $item) {
		if ($item->Tipo == TCAMPO_CHECKBOX) {
			$ret = $ret . "\t\tthis.params.registro.set ('" . $item->Nombre . "', (LibGeneral.IsChecked (this.ctl." . $item->GetNombreComponente () . ")));\n";
			
		} else if ($item->Tipo == TCAMPO_MONTO) {
			$ret = $ret . "\t\tthis.params.registro.set ('" . $item->Nombre . "', Formato.Dinero.FormatoDB (this.ctl." . $item->GetNombreComponente () . ".value));\n";
			
		} else if ($item->EsVisible) {
			$ret = $ret . "\t\tthis.params.registro.set ('" . $item->Nombre . "', this.ctl." . $item->GetNombreComponente () . ".value);\n";
		}
	}
	
	$ret = $ret. "
		return this.params.registro;
	}
});";

	return $ret;
}

// #### OK ####
// Parametros:
// $m: FormularioMaestro
// $d: DetalleFormulario
//
function GenerarFormularioControllerDetalleJS ($m, $d) {
	$ret  = '/**************************************************************************************************' . "\n";
  	$ret .= ' * Archivo: FormularioController.js' . "\n";
  	$ret .= ' * ------------------------------------------------------------------------------------------------' . "\n";
 	$ret .= ' * Version: 1.0' . "\n";
  	$ret .= ' * Descripcion:' . "\n";
 	$ret .= ' * Modificaciones:' . "\n";
  	$ret .= ' *	-' . "\n";
 	$ret .= ' *' . "\n";
  	$ret .= ' * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.' . "\n";
 	$ret .= ' **************************************************************************************************/' . "\n\n";

	$ret = $ret . "Ext.define ('" . $m->Modulo->Ruta . "." . $m->Modulo->Nombre . "." . $m->NombreEntidad . "." . $d->NombreEntidad . ".FormularioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller." . $d->getXtype ($m->PrefijoXtype) . "-FormularioController',

    init: function () {
    	FormularioDetalleControllerBase.InyectarDependencia (this, '" . $m->Modulo->Ruta . "." . $m->Modulo->Nombre . ".model." . $d->NombreEntidad . "');

    	this.control ({
    		\"button[name='btnBorrar']\": {
    			click: this.onBtnBorrarClick
    		},
    		\"button[name='btnGuardar']\": {
    			click: this.onBtnGuardarClick
    		},
    		\"" . $d->getXtype ($m->PrefijoXtype) . "-Formulario\": {
    			afterrender: this.onRender
    		}";

	foreach ($d->Formulario->Campos as $item) {
		if ($item->Tipo == TCAMPO_MONTO) {
			$ret .= ",
			\"textfield[name='" . $item->GetNombreComponente () . "']\": {
				blur: this.FormatearCampoDinero
			}";
		
		} else if ($item->Tipo == TCAMPO_NUMERICO_FLOTANTE) {
			$ret .= ",
			\"textfield[name='" . $item->GetNombreComponente () . "']\": {
				blur: this.FormatearCampoPuntoFlotante
			}";
		}
	}

    $ret .= "
    	});
    },

    SetearParametrosFormulario: function (ctl) {
    	ctl.params.anchoVentana 	= " . $d->Formulario->CalcularAnchoVentana () . ";
    	ctl.params.altoVentana		= " . $d->Formulario->CalcularAltoVentana () . ";
    },

	CargarComponentes: function () {
		var me = this;
		
		this.params.nombreEntidad = 'NOMBRE_ENTIDAD';\n";

	// Controles visibles.
	foreach ($d->Formulario->Campos as $item) {
		if ($item->EsVisible) {
			$ret = $ret . "\t\tthis.ctl." . $item->GetNombreComponente () . " = this.getView ().down (\"" . $item->GetNombreTipo () . "[name='" . $item->GetNombreComponente () . "']\");\n";
		}
	}
	
	$ret = $ret . "\t},
	
    GetElementoFoco: function () {
    	return \"" . $d->Formulario->GetCampoFoco () . "\";
    },	

	CargarRegistroEnFormulario: function (rec) {
		this.params.registro = rec;\n";

	foreach ($d->Formulario->Campos as $item) {
		if ($item->TipoCampoFormulario == TCAMPO_COMBO) {
			$ret = $ret . "\t\tthis.ctl." . $item->GetNombreComponente () . ".store.reload ();\n";
		}
	}

	$ret .= "\n";
	
	foreach ($d->Formulario->Campos as $item) {
		if ($item->Tipo == TCAMPO_MONTO) {
			$ret = $ret . "\t\tthis.ctl." . $item->GetNombreComponente () . ".setValue (Formato.Dinero.Transformar (rec.get ('" . $item->Nombre . "')));\n";	
	
		} else if ($item->EsVisible) {
			$ret = $ret . "\t\tthis.ctl." . $item->GetNombreComponente () . ".setValue (rec.get ('" . $item->Nombre . "'));\n";
		}
	}
	
	$ret = $ret . "\t},

	ObtenerRegistroDeFormulario: function () {\n";
	
	foreach ($d->Formulario->Campos as $item) {
		if ($item->Tipo == TCAMPO_CHECKBOX) {
			$ret = $ret . "\t\tthis.params.registro.set ('" . $item->Nombre . "', LibGeneral.IsChecked (this.ctl." . $item->GetNombreComponente () . ")));\n";

		} else if ($item->Tipo == TCAMPO_MONTO) {
			$ret = $ret . "\t\tthis.params.registro.set ('" . $item->Nombre . "', Formato.Dinero.FormatoDB (this.ctl." . $item->GetNombreComponente () . ".value));\n";
			
		} else if ($item->EsVisible) {
			$ret = $ret . "\t\tthis.params.registro.set ('" . $item->Nombre . "', this.ctl." . $item->GetNombreComponente () . ".value);\n";
		}
	}
	
	$ret = $ret. "
		return this.params.registro;
	}
});";

	return $ret;
}

?>