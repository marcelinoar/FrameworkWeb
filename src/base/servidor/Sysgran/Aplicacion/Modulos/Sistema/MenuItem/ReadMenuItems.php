<?
require_once ("template.php");

if (isset ($_GET['node'])) {
	$padre = $_GET['node'];
	
	if ($padre == 'root') {
		$query = "SELECT iMenuItemId, cNombre, cXtype, cDescripcion, bRaiz, bHoja FROM MenuItem WHERE bRaiz != FALSE";
	
	} else {
		$query = "SELECT iMenuItemId, cNombre, cXtype, cDescripcion, bRaiz, bHoja
				FROM MenuItem i, ArbolMenu m
				WHERE
					i.iMenuItemId = m.iMenuItemHijo AND
					m.iMenuItemPadre = $padre";
	}
	
	$rs = $conn->Retrieve ($query);
	while (!$rs->Eof ()) {
		$item['id']				= $rs->Fields ("iMenuItemId");
		$item['nombre'] 		= $rs->Fields ("cNombre");
		$item['xtype'] 			= $rs->Fields ("cXtype");
		$item['descripcion'] 	= $rs->Fields ("cDescripcion");
		$item['esRaiz']			= DB::FromBoolean (($rs->Fields ("bRaiz")));
		$item['esHoja']			= DB::FromBoolean (($rs->Fields ("bHoja")));
		$item['leaf']			= DB::FromBoolean (($rs->Fields ("bHoja")));

		$lista[] = $item;							
		$rs->Next ();
	}
	
	$rs->Close ();
	
	print Encoder::Encode ($lista, 'menu');
}
?>