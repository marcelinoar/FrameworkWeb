<?
//
// Agregar en ambos metodos la recarga del store de los combos.
//
// Parametros:
// $m: FormularioMaestro
//
function GenerarListadoMaestroControllerJS ($m) {
	$ret  = '/**************************************************************************************************' . "\n";
  	$ret .= ' * Archivo: ListadoController.js' . "\n";
  	$ret .= ' * ------------------------------------------------------------------------------------------------' . "\n";
 	$ret .= ' * Version: 1.0' . "\n";
  	$ret .= ' * Descripcion:' . "\n";
 	$ret .= ' * Modificaciones:' . "\n";
  	$ret .= ' *	-' . "\n";
 	$ret .= ' *' . "\n";
  	$ret .= ' * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.' . "\n";
 	$ret .= ' **************************************************************************************************/' . "\n\n";
	
	$ret = $ret . "Ext.define ('" . $m->Modulo->Ruta . "." . $m->Modulo->Nombre . "." . $m->NombreEntidad . ".ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller." . $m->PrefijoXtype . "-ListadoController',
	requires:[
		'" . $m->Modulo->Ruta . "." . $m->Modulo->Nombre . "." . $m->NombreEntidad . ".ListadoGrillaStore'
	],

	//
	// Asignacion de EventHandlers para los controles de la vista.
	//
	init: function () {
		ListadoControllerBase2.InyectarDependencia (this, '" . $m->NombreEntidadPermisos . "');
		this.params = {
			nuevaEntidad		: '" . $m->Modulo->Ruta . "." . $m->Modulo->Nombre . "." . $m->NombreEntidad . ".Formulario',
			editarEntidad		: '" . $m->Modulo->Ruta . "." . $m->Modulo->Nombre . "." . $m->NombreEntidad . ".Formulario',
			storeGrilla			: '" . $m->Modulo->Ruta . "." . $m->Modulo->Nombre . "." . $m->NombreEntidad . ".ListadoGrillaStore',
			xtypeListado		: '" . $m->PrefijoXtype . "-Listado',
			ventanaMaximizable	: " . ($m->Tipo == TFORM_ABM_TABLA? 'false' : 'true') . ",
			ventanaMaximized	: false,
			ventanaModal		: false,
			verColEditar		: true,
			verColBorrar		: true,
			anchoVentana		: 800,
			altoVentana			: 500
		};
		
	   	this.control({
			\"grid\": {
				celldblclick: this.onListadoGrillaCellDblClick
			},
			\"button[name='btnBuscar']\": {
				click: this.onBtnBuscarClick
			},
			\"button[name='btnLimpiarFiltros']\": {
				click: this.onBtnLimpiarFiltrosClick
			},
			\"button[name='btnNuevo']\": {
				click: this.onBtnNuevoClick
			},
			\"button[name='btnRecargarListado']\": {
				click: this.onBtnRecargarListadoClick
			},
			\"button[name='btnAceptar']\": {
				click: this.onBtnAceptarClick
			},
			\"button[name='btnCancelar']\": {
				click: this.onBtnCancelarClick
			},
			\"" . $m->PrefijoXtype . "-Listado\": {
				render: this.onRender
			}
	   });
	},

	SetupFiltros: function () {
	},

	GetOnNuevoParamsEntrada: function (params) {
		return ManejadorDeVentanas.ReqFormularioWS (null);
	},

	GetOnEditarParamsEntrada: function (item, params) {
		return ManejadorDeVentanas.ReqFormularioWS (item.get ('id'));
	}
});";

	return $ret;
}

// #### OK ####
// Parametros:
// $m: FormularioMaestro
// $d: DetalleFormulario
//
function GenerarListadoDetalleControllerJS ($m, $d) {
	$ret  = '/**************************************************************************************************' . "\n";
  	$ret .= ' * Archivo: ListadoController.js' . "\n";
  	$ret .= ' * ------------------------------------------------------------------------------------------------' . "\n";
 	$ret .= ' * Version: 1.0' . "\n";
  	$ret .= ' * Descripcion:' . "\n";
 	$ret .= ' * Modificaciones:' . "\n";
  	$ret .= ' *	-' . "\n";
 	$ret .= ' *' . "\n";
  	$ret .= ' * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.' . "\n";
 	$ret .= ' **************************************************************************************************/' . "\n\n";
	
	$ret = $ret . "Ext.define ('" . $m->Modulo->Ruta . "." . $m->Modulo->Nombre . "." . $m->NombreEntidad . "." . $d->NombreEntidad . ".ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller." . $d->getXtype ($m->PrefijoXtype) . "-ListadoController',

	params: {
		formularioCreacion		: '";
		
	if ($d->Tipo == TDET_MUCHOS_MUCHOS) {
		$ret .= $d->RutaEntidad . "." . $d->NombreEntidad . ".Listado',";
		
	} else {
		$ret .= $m->Modulo->Ruta . "." . $m->Modulo->Nombre . "." . $m->NombreEntidad . "." . $d->NombreEntidad . ".Formulario',";
	}

	$ret .= "	
		tituloFormularioCreacion: '',
		formularioEdicion		: '";
		
	if ($d->Tipo == TDET_MUCHOS_MUCHOS) {
		$ret .= $d->RutaEntidad . "." . $d->NombreEntidad . ".Formulario',";
		
	} else {
		$ret .= $m->Modulo->Ruta . "." . $m->Modulo->Nombre . "." . $m->NombreEntidad . "." . $d->NombreEntidad . ".Formulario',";
	}

	$ret .= "	
		tituloFormularioEdicion	: '',
		xtypeListado			: '" . $d->getXtype ($m->PrefijoXtype) . "-Listado',
		ventanaMaximizable		: false,
		ventanaMaximized		: false,
		ventanaModal			: true,
		verColEditar			: true,
		verColBorrar			: true
	},

	//
	// Asignacion de EventHandlers para los controles de la vista.
	//
	init: function () {
		ListadoDetalleControllerBase.InyectarDependencia (this, '" . $m->NombreEntidadPermisos . "');
		
	   	this.control({
			\"grid\": {
				afterrender: this.onGrillaAfterRender,
				celldblclick: this.onListadoGrillaCellDblClick
			},
			\"button[name='btnNuevo']\": {
				click: this.onBtnNuevoClick
			},
			\"button[name='btnRecargarListado']\": {
				click: this.onBtnRecargarListadoClick
			}
	   });
	},

	GetOnNuevoParamsEntrada: function (params) {\n";

	if ($d->Tipo == TDET_MUCHOS_MUCHOS) {
		$ret .= "\t\treturn ManejadorDeVentanas.ReqListadoWS (true, false, null, ModoEjecucionListado.Seleccion, true, true);";
		
	} else {
		$ret .= "\t\treturn ManejadorDeVentanas.ReqFormularioDetalle (null);";
	}
	
	$ret .= "
	},

	GetOnEditarParamsEntrada: function (item, params) {\n";

	if ($d->Tipo == TDET_MUCHOS_MUCHOS) {
		$ret .= "\t\treturn ManejadorDeVentanas.ReqFormularioWS (item.get ('id'));";
		
	} else {
		$ret .= "\t\treturn ManejadorDeVentanas.ReqFormularioDetalle (item);";
	}
	
	$ret .= "
	}
});";

	return $ret;
}

?>