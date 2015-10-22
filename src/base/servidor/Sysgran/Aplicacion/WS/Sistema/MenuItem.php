<?
require ("../lib/ViewModelBase.php");

function BorrarRegistro ($ids) {
	global $conn;
	
	$conn->Execute ("DELETE FROM MenuItem WHERE iMenuItemId = " . $ids->iMenuItemId);
}
	

function ActualizarRegistro () {
	$ret['InfoCampos'] 	= array ('Nombre' => 'cNombre', 'Xtype' => 'cXtype', 'Descripcion' => 'cDescripcion');
	$ret['NombreTabla'] = "MenuItem";

	return $ret;
}

function CrearRegistro ($obj) {
	global $conn;

	$raiz = 'FALSE';
	if ($obj->parentId == 'root') {
		$raiz = 'TRUE';
	}

	$conn->Execute ("INSERT INTO MenuItem (cNombre
										, cDescripcion
										, cXtype
										, bRaiz
										, bHoja
									) VALUES (
										'$obj->Nombre' 
										,'$obj->Descripcion'
										,'$obj->Xtype'
										,$raiz
										,TRUE)");

	if ($obj->parentId != 'root') {
		$rs = $conn->Retrieve ("SELECT currval('menuitem_imenuitemid_seq') As id");
		$id_hijo = $rs->Fields ("id");
		$rs->Close ();

		$id_padre = ModelEncoder::ParsearId ($obj->parentId)->iMenuItemId;
		$conn->Execute ("INSERT INTO ArbolMenu (iMenuItemPadre, iMenuItemHijo, iNumDeOrden) VALUES ($id_padre, $id_hijo, 1)");
		$conn->Execute ("UPDATE MenuItem SET bHoja = FALSE where iMenuItemId = $id_padre");
	}

	$conn->Commit ();
}

function LeerRegistro ($ids) {
	global $conn;

	$rs = $conn->Retrieve ("SELECT * FROM MenuItem WHERE iMenuItemId = " . $ids->iMenuItemId);

	$ret['id']				= ModelEncoder::EncodearId ('iMenuItemId', $rs->Fields ("iMenuItemId"));
	$ret['Nombre'] 			= $rs->Fields ("cNombre");
	$ret['Xtype']			= $rs->Fields ("cXtype");
	$ret['Descripcion']		= $rs->Fields ("cDescripcion");
	$ret['EsRaiz']			= DB::FromBoolean ($rs->Fields ("bRaiz"));
	$ret['EsHoja']			= DB::FromBoolean ($rs->Fields ("bHoja"));
	$ret['leaf']			= DB::FromBoolean ($rs->Fields ("bHoja"));

	$rs->Close ();

	return $ret;	
}

?>
