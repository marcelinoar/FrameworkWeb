<?

require ("Sysgran/Core/Db/Postgresql/PgsqlConnection.php");
$conn = new PgsqlConnection ("192.168.56.101", 5432, "pcomahue", "marce", "marce01");
$conn->Connect ();

require_once ("Clases.php");
require_once ("GenerarFormularioControllerJS.php");
require_once ("GenerarFormularioJS.php");
require_once ("GenerarListadoJS.php");
require_once ("GenerarModeloJS.php");
require_once ("GenerarListadoGrillaJS.php");
require_once ("GenerarListadoControllerJS.php");
require_once ("GenerarListadoGrillaStoreJS.php");
require_once ("GenerarEntidadPHP.php");
require_once ("GenerarFormularioControllerPHP.php");
require_once ("GenerarListadoControllerPHP.php");
require_once ("GenerarStoreEntidadPHP.php");

if (count ($argv) > 1) {
	$m = new FormularioMaestro ();

	if (!$m->LeerPorNombre ($argv[1])) {
		print "Error cargando datos del Modulo\n";
		exit ();
	}
	
	print "Generando clases para el Modulo[id=" . $m->Id . "]: " . $m->NombreEntidad . "\n";
	
	CheckearYCrearDir ($m->Modulo->RutaArchivos . "/app/view/" . $m->Modulo->Nombre);
	CheckearYCrearDir ($m->Modulo->RutaArchivos . "/app/view/" . $m->Modulo->Nombre . "/" . $m->NombreEntidad);
	CheckearYCrearDir ($m->Modulo->RutaArchivos . "/app/view/" . $m->Modulo->Nombre . "/model");
	CheckearYCrearDir ($m->Modulo->RutaArchivos . "/Server/Sysgran/Aplicacion/Entidades/" . $m->Modulo->Nombre);
	CheckearYCrearDir ($m->Modulo->RutaArchivos . "/Server/Sysgran/Aplicacion/Modulos/" . $m->Modulo->Nombre);
	CheckearYCrearDir ($m->Modulo->RutaArchivos . "/Server/Sysgran/Aplicacion/Modulos/" . $m->Modulo->Nombre . '/Store');
	CheckearYCrearDir ($m->Modulo->RutaArchivos . "/Server/Sysgran/Aplicacion/Modulos/" . $m->Modulo->Nombre . '/StoreWS');
	CheckearYCrearDir ($m->Modulo->RutaArchivos . "/Server/Sysgran/Aplicacion/Modulos/" . $m->Modulo->Nombre . '/' . $m->NombreEntidad);
	
	$f = fopen ($m->Modulo->RutaArchivos . "/app/view/" . $m->Modulo->Nombre. "/" . $m->NombreEntidad . "/Formulario.js", "w");
	fwrite ($f, GenerarFormularioJS ($m, $m->Modulo->Ruta . "." . $m->Modulo->Nombre . "." . $m->NombreEntidad, $m->PrefijoXtype));
	fclose ($f);

	$f = fopen ($m->Modulo->RutaArchivos . "/app/view/" . $m->Modulo->Nombre. "/" . $m->NombreEntidad . "/FormularioController.js", "w");
	fwrite ($f, GenerarFormularioControllerMaestroJS ($m));
	fclose ($f);

	$f = fopen ($m->Modulo->RutaArchivos . "/app/view/" . $m->Modulo->Nombre. "/" . $m->NombreEntidad . "/Listado.js", "w");
	fwrite ($f, GenerarListadoMaestroJS ($m));
	fclose ($f);
	
	$f = fopen ($m->Modulo->RutaArchivos . "/app/view/" . $m->Modulo->Nombre. "/" . $m->NombreEntidad . "/ListadoGrilla.js", "w");
	fwrite ($f, GenerarListadoMaestroGrillaJS ($m));
	fclose ($f);

	$f = fopen ($m->Modulo->RutaArchivos . "/app/view/" . $m->Modulo->Nombre. "/" . $m->NombreEntidad . "/ListadoController.js", "w");
	fwrite ($f, GenerarListadoMaestroControllerJS ($m));
	fclose ($f);

	$f = fopen ($m->Modulo->RutaArchivos . "/app/view/" . $m->Modulo->Nombre. "/" . $m->NombreEntidad . "/ListadoGrillaStore.js", "w");
	fwrite ($f, GenerarListadoGrillaStoreJS	 ($m));
	fclose ($f);
	
	if (!file_exists ($m->Modulo->RutaArchivos . "/Server/Sysgran/Aplicacion/Modulos/" . $m->Modulo->Nombre . '/Store/Store' . $m->NombreEntidad . ".php")) {	
		$f = fopen ($m->Modulo->RutaArchivos . "/Server/Sysgran/Aplicacion/Modulos/" . $m->Modulo->Nombre . '/Store/Store' . $m->NombreEntidad . ".php", "w");
		fwrite ($f, GenerarStoreEntidadPHP ($m));
		fclose ($f);
	}

	$f = fopen ($m->Modulo->RutaArchivos . "/Server/Sysgran/Aplicacion/Modulos/" . $m->Modulo->Nombre . "/" . $m->NombreEntidad . "/FormularioController.php", "w");
	fwrite ($f, GenerarFormularioControllerPHP ($m));
	fclose ($f);

	if (!file_exists ($m->Modulo->RutaArchivos . "/Server/Sysgran/Aplicacion/Modulos/" . $m->Modulo->Nombre . '/' . $m->NombreEntidad . "/ListadoController.php")) {
		$f = fopen ($m->Modulo->RutaArchivos . "/Server/Sysgran/Aplicacion/Modulos/" . $m->Modulo->Nombre  . '/' . $m->NombreEntidad . "/ListadoController.php", "w");
		fwrite ($f, GenerarListadoControllerPHP ($m));
		fclose ($f);
	}
	
	if ($m->Tipo == TFORM_ABM_TABLA) {
		$f = fopen ($m->Modulo->RutaArchivos . "/app/view/" . $m->Modulo->Nombre. "/model/" . $m->NombreEntidad . ".js", "w");
		fwrite ($f, GenerarModeloJS_Tabla ($m));
		fclose ($f);
		
		$f = fopen ($m->Modulo->RutaArchivos . "/Server/Sysgran/Aplicacion/Entidades/" . $m->Modulo->Nombre . "/" . $m->NombreEntidad . ".php", "w");
		fwrite ($f, GenerarEntidadTablaPHP ($m));
		fclose ($f);
		

	} else if ($m->Tipo == TFORM_ABM_MAESTRO_DETALLE) {
		$f = fopen ($m->Modulo->RutaArchivos . "/app/view/" . $m->Modulo->Nombre. "/model/" . $m->NombreEntidad . ".js", "w");
		fwrite ($f, GenerarModeloJS_MaestroDetalle ($m));
		fclose ($f);
		
		$f = fopen ($m->Modulo->RutaArchivos . "/Server/Sysgran/Aplicacion/Entidades/" . $m->Modulo->Nombre . "/" . $m->NombreEntidad . ".php", "w");
		fwrite ($f, GenerarEntidadMaestroDetallePHP ($m));
		fclose ($f);

		foreach ($m->Detalles as $detalle) {
			CheckearYCrearDir ($m->Modulo->RutaArchivos . "/app/view/" . $m->Modulo->Nombre. "/" . $m->NombreEntidad . "/" . $detalle->NombreEntidad);

			if ($detalle->Tipo == TDET_ENTIDAD_DEBIL) {
				$f = fopen ($m->Modulo->RutaArchivos . "/app/view/" . $m->Modulo->Nombre. "/model/" . $detalle->NombreEntidad . ".js", "w");
				fwrite ($f, GenerarModeloJS_EntidadDebil ($m, $detalle));
				fclose ($f);

				$f = fopen ($m->Modulo->RutaArchivos . "/app/view/" . $m->Modulo->Nombre. "/" . $m->NombreEntidad . "/" . $detalle->NombreEntidad . "/Formulario.js", "w");
				fwrite ($f, GenerarFormularioJS ($detalle->Formulario, $m->Modulo->Ruta . "." . $m->Modulo->Nombre . "." . $m->NombreEntidad . "." . $detalle->NombreEntidad, $detalle->getXtype ($m->PrefijoXtype)));
				fclose ($f);

				$f = fopen ($m->Modulo->RutaArchivos . "/app/view/" . $m->Modulo->Nombre. "/" . $m->NombreEntidad . "/" . $detalle->NombreEntidad . "/FormularioController.js", "w");
				fwrite ($f, GenerarFormularioControllerDetalleJS ($m, $detalle));
				fclose ($f);
			}

			$f = fopen ($m->Modulo->RutaArchivos . "/app/view/" . $m->Modulo->Nombre. "/" . $m->NombreEntidad . "/" . $detalle->NombreEntidad . "/Listado.js", "w");
			fwrite ($f, GenerarListadoDetalleJS ($m, $detalle));
			fclose ($f);

			$f = fopen ($m->Modulo->RutaArchivos . "/app/view/" . $m->Modulo->Nombre. "/" . $m->NombreEntidad . "/" . $detalle->NombreEntidad . "/ListadoGrilla.js", "w");
			fwrite ($f, GenerarListadoDetalleGrillaJS ($m, $detalle));
			fclose ($f);

			$f = fopen ($m->Modulo->RutaArchivos . "/app/view/" . $m->Modulo->Nombre. "/" . $m->NombreEntidad . "/" . $detalle->NombreEntidad . "/ListadoController.js", "w");
			fwrite ($f, GenerarListadoDetalleControllerJS ($m, $detalle));
			fclose ($f);
		}
	}

/*	
	// Menu.
	$rs = $conn->Retrieve ("SELECT COUNT(*) AS cnt FROM MenuItem WHERE cNombre = '$m->NombreEntidad'");
	$cnt = $rs->Fields ("cnt");
	$rs->Close ();
	
	if ($cnt == 0) {
		$conn->Execute ("INSERT INTO MenuItem (iMenuItemId, cNombre, cXtype, bRaiz, bHoja, cDescripcion)
						VALUES (seq_menu_item_id.nextval, '$m->NombreEntidad', '" . $m->PrefijoXtype . "-Listado', 0, 1, '')");
		$menuitem_id = $conn->GetSecuenceLastId ('seq_menu_item_id');
		$rs = $conn->Retrieve ("SELECT MAX(iNumDeOrden) AS max_id FROM ArbolMenu WHERE iMenuItemPadre = 4");
		$prox_id = $rs->Fields ("max_id") + 1;
		$rs->Close ();

		$conn->Execute ("INSERT INTO ArbolMenu (iMenuItemPadre, iMenuItemHijo, iNumDeOrden) 
						VALUES (4, $menuitem_id, $prox_id)");
	}
*/	
}

function CheckearYCrearDir ($dir) {
	if (!file_exists ($dir)) {
		print "Creando directorio:" . $dir. "\n";
		mkdir ($dir);
	}
}

?>
