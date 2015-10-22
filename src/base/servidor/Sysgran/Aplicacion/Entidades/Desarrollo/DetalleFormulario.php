<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: DetalleFormulario.php
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

class DetalleFormulario extends EntidadBase {
	public $id;
	public $tipoDetalleFormularioId;
	public $nombreEntidad;
	public $prefijoXtype;
	public $rutaEntidad;
	public $claseEntidad;
	public $nombreCampoFormulario;
	public $descripcion;
	public $camposFormulario = array ();
	public $camposListado = array ();
	public $etiqueta;

	public function DetalleFormulario ($id = null) {
		$this->MapaCampos['tipoDetalleFormularioId'] 	= 'iTipoDetalleFormularioId';
		$this->MapaCampos['nombreEntidad'] 				= 'cNombreEntidad';
		$this->MapaCampos['prefijoXtype'] 				= 'cPrefijoXtype';
		$this->MapaCampos['rutaEntidad'] 				= 'cRutaEntidad';
		$this->MapaCampos['claseEntidad'] 				= 'cClaseEntidad';
		$this->MapaCampos['nombreCampoFormulario'] 		= 'cNombreCampoFormulario';
		$this->MapaCampos['descripcion'] 				= 'cDescripcion';
		$this->MapaCampos['etiqueta']					= 'cEtiqueta';
		
		$this->id = $id;
	}
	
	public function Leer () {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT * FROM DetalleFormulario WHERE iDetalleFormularioId = $this->id");
									
		$this->tipoDetalleFormularioId = $rs->Fields ("iTipoDetalleFormularioId");
		$this->nombreEntidad = $rs->Fields ("cNombreEntidad");
		$this->prefijoXtype = $rs->Fields ("cPrefijoXtype");
		$this->rutaEntidad = $rs->Fields ("cRutaEntidad");
		$this->claseEntidad = $rs->Fields ("cClaseEntidad");
		$this->nombreCampoFormulario = $rs->Fields ("cNombreCampoFormulario");
		$this->descripcion = $rs->Fields ("cDescripcion");
		$this->etiqueta		= $rs->Fields ("cEtiqueta");
		$rs->Close ();

		$rs = $conn->Retrieve ("SELECT iCampoListadoId 
								FROM CampoListado cl, DetalleFormulario df
								WHERE
									cl.iListadoId = df.iListadoId AND
									df.iDetalleFormularioId = $this->id");

		$this->camposListado = array ();									
		while (!$rs->Eof ()) {
			$item = new CampoListado ($rs->Fields ("iCampoListadoId"));
			$item->Leer ();
			$this->camposListado[] = $item;
			
			$rs->Next ();
		}
		
		$rs->Close ();
		
		$rs = $conn->Retrieve ("SELECT iCampoFormularioId
									FROM DetalleFormulario df, FormularioDetalle fd, CampoFormularioDetalle cfd
									WHERE
										df.iDetalleFormularioId = $this->id AND
										df.iFormularioDetalleId = df.iFormularioDetalleId AND
										df.iFormularioDetalleId = cfd.iFormularioDetalleId");

		$this->camposFormulario = array ();										
		while (!$rs->Eof ()) {
			$item = new CampoFormulario ($rs->Fields ("iCampoFormularioId"));
			$item->Leer ();
			$this->camposFormulario[] = $item;
			$rs->Next ();
		}
		
		$rs->Close ();
	}
	
	public function Borrar () {
		global $conn;

		$ret = true;
		try {
			$conn->BeginTransaction ();
			
			foreach ($this->camposListado as $item) {
				$item->Borrar ();
			}
			
			foreach ($this->camposFormulario as $item) {
				$item->Borrar ();
			}
			
			$conn->Execute ("DELETE FROM Listado WHERE iListadoId IN (SELECT iListadoId FROM DetalleFormulario WHERE iDetalleFormularioId = $this->id)");
			$conn->Execute ("DELETE FROM CampoFormularioDetalle WHERE iFormularioDetalleId IN (SELECT iFormularioDetalleId FROM DetalleFormulario WHERE iDetalleFormularioId = $this->id)");
			$conn->Execute ("DELETE FROM FormularioDetalle WHERE iFormularioDetalleId IN (SELECT iFormularioDetalleId FROM DetalleFormulario WHERE iDetalleFormularioId = $this->id)");
			$conn->Execute ("DELETE FROM DetalleFormulario WHERE iDetalleFormularioId = $this->id");
			$conn->Commit ();

		} catch (Exception $ex) {
			$conn->Rollback ();		
			$ret = false;
		}
		
		return $ret;
	}
	
	public function Crear () {
		global $conn;
		
		$ret = true;
		try {
			$conn->BeginTransaction ();
			$conn->Execute ("INSERT INTO DetalleFormulario (iDetalleFormularioId
				,iTipoDetalleFormularioId
				,cNombreEntidad
				,cPrefijoXtype
				,cRutaEntidad
				,cClaseEntidad
				,cNombreCampoFormulario
				,cDescripcion
				,cEtiqueta
			) VALUES (
				nextval ('seq_detalle_formulario')
				,$this->tipoDetalleFormularioId
				,'$this->nombreEntidad'
				,'$this->prefijoXtype'
				,'$this->rutaEntidad'
				,'$this->claseEntidad'
				,'$this->nombreCampoFormulario'
				,'$this->descripcion'
				,'$this->etiqueta'
			)");

			$this->id = $conn->GetSecuenceLastId ('seq_detalle_formulario');
			
			// Listado.
			$conn->Execute ("INSERT INTO Listado (iListadoId, iTipoListadoId) VALUES (nextval ('seq_listado'), " . TLIST_MEMORIA . ")");
			$listado_id = $conn->GetSecuenceLastId ('seq_listado');
			
			foreach ($this->camposListado as $item) {
				$obj = new CampoListado ();
				$obj->listadoId 		= $listado_id;
				$obj->tipoCampoId		= $item->tipoCampoId;
				$obj->nombre 			= $item->nombre;
				$obj->etiqueta 			= $item->etiqueta;
				$obj->esFlex 			= $item->esFlex;
				$obj->esSubCampo 		= $item->esSubCampo;
				$obj->nombreSubCampo 	= $item->nombreSubCampo;
				$obj->anchoColumna 		= $item->anchoColumna;
				$obj->Crear ();
			}
			
			$conn->Execute ("UPDATE DetalleFormulario SET iListadoId = $listado_id WHERE iDetalleFormularioId = $this->id");
			
			// Formulario.
			$conn->Execute ("INSERT INTO FormularioDetalle (iFormularioDetalleId) VALUES (nextval ('seq_formulario_detalle'))");
			$formulario_id = $conn->GetSecuenceLastId ('seq_formulario_detalle');
			
			$conn->Execute ("UPDATE DetalleFormulario SET iFormularioDetalleId = $formulario_id WHERE iDetalleFormularioId = $this->id");
			
			foreach ($this->camposFormulario as $item) {
				$obj = new CampoFormulario ();
				$obj->tipoCampoId 		= $item->tipoCampoId;
				$obj->nombre			= $item->nombre;
				$obj->esNull			= $item->esNull;
				$obj->etiqueta			= $item->etiqueta;
				$obj->nombreCampoDb		= $item->nombreCampoDb;
				$obj->esAutoFoco		= $item->esAutoFoco;
				$obj->store				= $item->store;
				$obj->idField			= $item->idField;
				$obj->descField			= $item->descField;
				$obj->Crear ();
			
				$conn->Execute ("INSERT INTO CampoFormularioDetalle (iFormularioDetalleId, iCampoFormularioId) VALUES ($formulario_id, $obj->id)");
			}
			
			$conn->Commit ();
			
		} catch (Exception $ex) {
			$conn->Rollback ();		
			$ret = false;
		}
		
		return $ret;
	}
}
?>
