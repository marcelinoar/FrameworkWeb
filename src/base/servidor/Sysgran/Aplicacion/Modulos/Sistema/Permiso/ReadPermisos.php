<?
require ("template.php");
require ("Sysgran/Core/Red/Encoder.php");

if (isset ($_GET['node'])) {
	$padre = $_GET['node'];
	
	if ($padre == 'root') {
		$query = "SELECT iPermisoId, cNombre, cCodigo, cDescripcion, bRaiz, bHoja FROM Permiso WHERE bRaiz <> 0";
	
	} else {
		$query = "SELECT iPermisoId, cNombre, cCodigo, cDescripcion, bRaiz, bHoja
				FROM Permiso i, ArbolPermisos m
				WHERE
					i.iPermisoId = m.iPermisoHijo AND
					m.iPermisoPadre = $padre";
	}
	
	$rs = $conn->Retrieve ($query);
	while (!$rs->Eof ()) {
		$item['nombre'] 		= $rs->Fields ("cNombre");
		$item['codigo'] 		= $rs->Fields ("cCodigo");
		$item['descripcion'] 	= $rs->Fields ("cDescripcion");
		$item['id']				= $rs->Fields ("iPermisoId");
		$item['leaf']			= ($rs->Fields ("bHoja") <> 0 ? 'true' : 'false');

		$lista[] = $item;							
		$rs->Next ();
	}
	
	$rs->Close ();
	print Encoder::Encode ($lista, 'arbol');
}
?>