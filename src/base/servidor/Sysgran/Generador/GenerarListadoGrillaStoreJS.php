<?

function GenerarListadoGrillaStoreJS ($m) {
	$ret  = '/**************************************************************************************************' . "\n";
  	$ret .= ' * Archivo: ListadoGrillaStore.js' . "\n";
  	$ret .= ' * ------------------------------------------------------------------------------------------------' . "\n";
 	$ret .= ' * Version: 1.0' . "\n";
  	$ret .= ' * Descripcion:' . "\n";
 	$ret .= ' * Modificaciones:' . "\n";
  	$ret .= ' *	-' . "\n";
 	$ret .= ' *' . "\n";
  	$ret .= ' * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.' . "\n";
 	$ret .= ' **************************************************************************************************/' . "\n\n";

	$ret = $ret . "Ext.define ('" . $m->Modulo->Ruta . "." . $m->Modulo->Nombre . "." . $m->NombreEntidad . ".ListadoGrillaStore', {
	extend	: 'Ext.data.Store',
	model	: 'Sistema.view." . $m->Modulo->Nombre . ".model." . $m->NombreEntidad . "',
	alias	: 'store." . $m->PrefijoXtype . "-ListadoGrillaStore',
	pageSize: 20,
	proxy	: {
		type: 'ajax',
		enablePaging: true,
		url: 'Server/Sysgran/Aplicacion/Modulos/" . $m->Modulo->Nombre. "/" . $m->NombreEntidad . "/ListadoController.php',
		reader: {
			type: 'json',
			rootProperty: 'root',
			totalProperty: 'total'
		}
	}
});";

	return $ret;
}
?>