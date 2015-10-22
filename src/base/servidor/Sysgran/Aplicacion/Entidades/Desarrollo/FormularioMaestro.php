<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: FormularioMaestro.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: 
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");
require_once ("Sysgran/Generador/Definiciones.php");
require_once ("CampoListado.php");
require_once ("CampoFormulario.php");
require_once ("CampoListado.php");
require_once ("DetalleFormulario.php");

class FormularioMaestro extends EntidadBase {
	public $id;
	public $moduloId;
	public $tipoFormularioId;
	public $nombreEntidadPermisos;
	public $nombreEntidad;
	public $prefijoXtype;
	public $nombreSecuencia;
	public $descripcion;
	public $camposFormulario	= array ();
	public $camposListado 		= array ();
	public $detalles 			= array ();

	public function FormularioMaestro ($id = null) {
		$this->MapaCampos['moduloId'] 			= 'iModuloId';
		$this->MapaCampos['tipoFormularioId'] 	= 'iTipoFormularioId';
		$this->MapaCampos['nombreEntidad'] 		= 'cNombreEntidad';
		$this->MapaCampos['prefijoXtype'] 		= 'cPrefijoXtype';
		$this->MapaCampos['nombreSecuencia'] 	= 'cNombreSecuencia';
		$this->MapaCampos['descripcion'] 		= 'cDescripcion';
		$this->MapaCampos['nombreEntidadPermisos']	= 'cNombreEntidadPermisos';
		
		$this->id = $id;
	}
	
	public function SetCamposFormulario ($arr) {
		foreach ($arr as $item) {
			$obj = new CampoFormulario ();
			$obj->ActualizarPropiedades ($item);
			$this->camposFormulario[] = $obj;
		}
	}

	public function SetCamposListado ($arr) {
		foreach ($arr as $item) {
			$obj = new CampoListado ();
			$obj->ActualizarPropiedades ($item);
			$this->camposListado[] = $obj;
		}
	}
	
	public function SetDetalles ($arr) {
		foreach ($arr as $item) {
			$obj = new DetalleFormulario ($item->id);
			$obj->Leer ();
			$this->detalles[] = $obj;
		}
	}	
	
	public function Leer () {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT * FROM FormularioMaestro WHERE iFormularioMaestroId = $this->id");
									
		$this->moduloId = $rs->Fields ("iModuloId");
		$this->tipoFormularioId = $rs->Fields ("iTipoFormularioId");
		$this->nombreEntidad = $rs->Fields ("cNombreEntidad");
		$this->prefijoXtype = $rs->Fields ("cPrefijoXtype");
		$this->nombreSecuencia = $rs->Fields ("cNombreSecuencia");
		$this->anchoVentana = $rs->Fields ("iAnchoVentana");
		$this->altoVentana = $rs->Fields ("iAltoVentana");
		$this->descripcion = $rs->Fields ("cDescripcion");
		$this->nombreEntidadPermisos = $rs->Fields ("cNombreEntidadPermisos");
		$rs->Close ();

		$rs = $conn->Retrieve ("SELECT iCampoListadoId 
								FROM CampoListado cl, FormularioMaestro fm
								WHERE
									cl.iListadoId = fm.iListadoId AND
									fm.iFormularioMaestroId = $this->id");

		$this->camposListado = array ();									
		while (!$rs->Eof ()) {
			$item = new CampoListado ($rs->Fields ("iCampoListadoId"));
			$item->Leer ();
			$this->camposListado[] = $item;
			
			$rs->Next ();
		}
		
		$rs->Close ();
		
		$rs = $conn->Retrieve ("SELECT iCampoFormularioId
								FROM FormularioMaestro fm, CampoFormularioMaestro cfm
								WHERE
									fm.iFormularioMaestroId = $this->id AND
									fm.iFormularioMaestroId = cfm.iFormularioMaestroId");

		$this->camposFormulario = array ();										
		while (!$rs->Eof ()) {
			$item = new CampoFormulario ($rs->Fields ("iCampoFormularioId"));
			$item->Leer ();
			$this->camposFormulario[] = $item;
			$rs->Next ();
		}
		
		$rs->Close ();
		
		$rs = $conn->Retrieve ("SELECT iDetalleFormularioId FROM DetalleFormulario WHERE iFormularioMaestroId = $this->id");
		$this->detalles = array ();
		while (!$rs->Eof ()) {
			$item = new DetalleFormulario ($rs->Fields ("iDetalleFormularioId"));
			$item->Leer ();
			$this->detalles[] = $item;
			$rs->Next ();
		}
		$rs->Close ();
	}
	
	// No borra el detalle.
	public function Borrar () {
		global $conn;
		
		$conn->Execute ("DELETE FROM DetalleCombo WHERE iDetalleComboId IN (SELECT iDetalleComboId 
																			FROM CampoFormulario cf, CampoFormularioMaestro cfm 
																			WHERE 
																				cf.iCampoFormularioId = cfm.iCampoFormularioId AND
																				cfm.iFormularioMaestroId = $this->id)");
																				
		$conn->Execute ("DELETE FROM CampoFormulario WHERE iCampoFormularioId IN (SELECT iCampoFormularioId
																			FROM CampoFormularioMaestro cfm 
																			WHERE
																				cfm.iFormularioMaestroId = $this->id)");
																				
		$conn->Execute ("DELETE FROM CampoListado WHERE iCampoListadoId IN (SELECT iCampoListadoId 
																			FROM CampoListado cl, FormularioMaestro fm
																			WHERE
																				cl.iListadoId = fm.iListadoId AND
																				fm.iFormularioMaestroId = $this->id)");

		$conn->Execute ("DELETE FROM Listado WHERE iListadoId IN (SELECT iListadoId FROM FormularioMaestro WHERE iFormularioMaestroId = $this->id)");																				
		$conn->Execute ("DELETE FROM CampoFormularioMaestro WHERE iFormularioMaestroId = $this->id");
		$conn->Execute ("DELETE FROM Listado WHERE iListadoId IN (SELECT iListadoId FROM FormularioMaestro WHERE iFormularioMaestroId = $this->id)");
		$conn->Execute ("DELETE FROM FormularioMaestro WHERE iFormularioMaestroId = $this->id");
	}
	
	public function Crear () {
		global $conn;
		
		$conn->Execute ("INSERT INTO FormularioMaestro (iFormularioMaestroId
			,iModuloId
			,iTipoFormularioId
			,cNombreEntidad
			,cPrefijoXtype
			,cNombreSecuencia
			,cNombreEntidadPermisos
			,cDescripcion
		) VALUES (
			nextval ('seq_formulario_maestro')
			,$this->moduloId
			,$this->tipoFormularioId
			,'$this->nombreEntidad'
			,'$this->prefijoXtype'
			,'$this->nombreSecuencia'
			,'$this->nombreEntidadPermisos'
			,'$this->descripcion'
		)");
		$this->id = $conn->GetSecuenceLastId ('seq_formulario_maestro');

		// Listado.
		if (count ($this->camposListado) > 0) {
			$conn->Execute ("INSERT INTO Listado (iListadoId, iTipoListadoId) VALUES (nextval ('seq_listado'), " . TLIST_WS . ")");
			$listado_id = $conn->GetSecuenceLastId ('seq_listado');

			foreach ($this->camposListado as $obj) {
				$obj->listadoId = $listado_id;
				$obj->Crear ();
			}				
			
			$conn->Execute ("UPDATE FormularioMaestro SET iListadoId = $listado_id WHERE iFormularioMaestroId = $this->id");			
		}
		
		// Formulario.
		foreach ($this->camposFormulario as $obj) {
			$obj->Crear ();
			$conn->Execute ("INSERT INTO CampoFormularioMaestro (iFormularioMaestroId, iCampoFormularioId) VALUES ($this->id, $obj->id)");
		}
		
		// Detalle.
		foreach ($this->detalles as $item) {
			$conn->Execute ("UPDATE DetalleFormulario SET iFormularioMaestroId = $this->id WHERE iDetalleFormularioId = $item->id");
		}
	}
}
?>
