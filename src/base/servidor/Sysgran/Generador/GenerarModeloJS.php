<?
// #### OK ####
// Parametros:
// 		$m: FormularioMaestro
// 		$d: DetalleFormulario
//
function GenerarModeloJS_EntidadDebil ($m, $d) {
	$ret  = '/**************************************************************************************************' . "\n";
  	$ret .= ' * Archivo: ' . $d->NombreEntidad . '.js' . "\n";
  	$ret .= ' * ------------------------------------------------------------------------------------------------' . "\n";
 	$ret .= ' * Version: 1.0' . "\n";
  	$ret .= ' * Descripcion: ' . $d->Descripcion . '.' . "\n";
 	$ret .= ' * Modificaciones:' . "\n";
  	$ret .= ' *	-' . "\n";
 	$ret .= ' *' . "\n";
  	$ret .= ' * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.' . "\n";
 	$ret .= ' **************************************************************************************************/' . "\n\n";

	$ret = $ret . "Ext.define ('" . $m->Modulo->Ruta . "." . $m->Modulo->Nombre . ".model." . $d->NombreEntidad . "', {
	extend: 'Ext.data.Model',
	fields: [\n";
	
	for ($i = 0; $i < count ($d->Formulario->Campos); $i++) {
		$ret = $ret . "\t\t{name: '" . $d->Formulario->Campos[$i]->Nombre . "'}";
		
		if ($i != count ($d->Formulario->Campos) - 1) {
			$ret = $ret . ",\n";
		}
	}
	
	$ret = $ret . "
	],

	proxy: {
		type: 'memory'
	}
});\n";
	
	return $ret;

}

// #### OK ####
// Parametros:
// 		$m: FormularioMaestro
//
function GenerarModeloJS_Tabla ($m) {
	$ret  = '/**************************************************************************************************' . "\n";
  	$ret .= ' * Archivo: ' . $m->NombreEntidad . '.js' . "\n";
  	$ret .= ' * ------------------------------------------------------------------------------------------------' . "\n";
 	$ret .= ' * Version: 1.0' . "\n";
  	$ret .= ' * Descripcion: ' . $m->Descripcion . "\n";
 	$ret .= ' * Modificaciones:' . "\n";
  	$ret .= ' *	-' . "\n";
 	$ret .= ' *' . "\n";
  	$ret .= ' * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.' . "\n";
 	$ret .= ' **************************************************************************************************/' . "\n\n";
 	
	$ret = $ret . "Ext.define ('" . $m->Modulo->Ruta . "." . $m->Modulo->Nombre . ".model." . $m->NombreEntidad . "', {
	extend: 'Ext.data.Model',
	fields: [\n";
	
	for ($i = 0; $i < count ($m->Campos); $i++) {
		$ret = $ret . "\t\t{name: '" . $m->Campos[$i]->Nombre . "'}";
		
		if ($i != count ($m->Campos) - 1) {
			$ret = $ret . ",\n";
		}
	}
	
	$ret = $ret . "
	],

	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/Modulos/" . $m->Modulo->Nombre . "/" . $m->NombreEntidad . "/FormularioController.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/Modulos/" . $m->Modulo->Nombre . "/" . $m->NombreEntidad . "/FormularioController.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/Modulos/" . $m->Modulo->Nombre . "/" . $m->NombreEntidad . "/FormularioController.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/Modulos/" . $m->Modulo->Nombre . "/" . $m->NombreEntidad . "/FormularioController.php?f=Borrar'
		},
		reader: {
			type: 'json',
			rootProperty: 'root'
		}
	}
});\n";
	
	return $ret;
}

// #### OK ####
// Parametros:
// 		$m: FormularioMaestro
//
function GenerarModeloJS_MaestroDetalle ($m) {
	$ret  = '/**************************************************************************************************' . "\n";
  	$ret .= ' * Archivo: ' . $m->NombreEntidad . '.js' . "\n";
  	$ret .= ' * ------------------------------------------------------------------------------------------------' . "\n";
 	$ret .= ' * Version: 1.0' . "\n";
  	$ret .= ' * Descripcion: ' . $m->Descripcion . "\n";
 	$ret .= ' * Modificaciones:' . "\n";
  	$ret .= ' *	-' . "\n";
 	$ret .= ' *' . "\n";
  	$ret .= ' * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.' . "\n";
 	$ret .= ' **************************************************************************************************/' . "\n\n";
 	
	$ret .= "Ext.define ('" . $m->Modulo->Ruta . "." . $m->Modulo->Nombre . ".model." . $m->NombreEntidad . "', {
	extend: 'Ext.data.Model',
	requires: [\n";
	
	for ($i = 0; $i < count ($m->Detalles); $i++) {
		$ret .= "\t\t'" . $m->Detalles[$i]->ClaseEntidad . "'";
		
		if ($i != count ($m->Detalles) - 1) {
			$ret .= ",\n";
		}
	}
	
	$ret .= "\n\t],
	fields: [\n";
	
	for ($i = 0; $i < count ($m->Campos); $i++) {
		$ret .= "\t\t{name: '" . $m->Campos[$i]->Nombre . "'}";
		
		if ($i != count ($m->Campos) - 1) {
			$ret .= ",\n";
		}
	}
	
	$ret .= "
	],
	hasMany: [{\n";
	
	for ($i = 0; $i < count ($m->Detalles); $i++) {
		$ret .= "\t\tmodel: '" . $m->Detalles[$i]->ClaseEntidad . "',\n\t\tname: '" . $m->Detalles[$i]->NombreCampoFormulario . "'";
		
		if ($i != count ($m->Detalles) - 1) {
			$ret .= "\n\t}, {\n";
		}
	}
	
	$ret .= "\n\t}],\n
	proxy: {
		type: 'ajax',
		api: {
			read:    'Server/Sysgran/Aplicacion/Modulos/" . $m->Modulo->Nombre . "/" . $m->NombreEntidad . "/FormularioController.php?f=Leer',
			create:  'Server/Sysgran/Aplicacion/Modulos/" . $m->Modulo->Nombre . "/" . $m->NombreEntidad . "/FormularioController.php?f=Crear',
			update:  'Server/Sysgran/Aplicacion/Modulos/" . $m->Modulo->Nombre . "/" . $m->NombreEntidad . "/FormularioController.php?f=Actualizar',
			destroy: 'Server/Sysgran/Aplicacion/Modulos/" . $m->Modulo->Nombre . "/" . $m->NombreEntidad . "/FormularioController.php?f=Borrar'
		},
		reader: {
			type: 'json',
			rootProperty: 'root'
		},
		writer: {
			writeAllFields: true,
			allDataOptions: {
				associated: true
			}
		}		
	}
});\n";
	
	return $ret;
}
?>