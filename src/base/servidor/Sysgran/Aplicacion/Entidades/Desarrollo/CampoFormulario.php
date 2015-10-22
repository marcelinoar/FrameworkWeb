<?
/**************************************************************************************************
 * Archivo: CampoFormulario.php
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

class CampoFormulario extends EntidadBase {
	public $id;
	public $tipoCampoId;
	public $nombre;
	public $esNull;
	public $etiqueta;
	public $nombreCampoDb;
	public $esAutoFoco;
	public $store;
	public $idField;
	public $descField;

	public function CampoFormulario ($id = null) {
		$this->MapaCampos['tipoCampoId'] 	= 'iTipoCampoId';
		$this->MapaCampos['nombre'] 		= 'cNombre';
		$this->MapaCampos['esNull'] 		= 'bEsNull';
		$this->MapaCampos['etiqueta'] 		= 'cEtiqueta';
		$this->MapaCampos['nombreCampoDb'] 	= 'cNombreCampoDb';
		$this->MapaCampos['esAutoFoco']		= 'bEsAutoFoco';
		$this->MapaCampos['store']			= '';
		$this->MapaCampos['idField']		= '';
		$this->MapaCampos['descField']		= '';
		
		$this->id = $id;
	}
	
	public function Leer () {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT * 
								FROM CampoFormulario cf
								LEFT OUTER JOIN DetalleCombo dc ON cf.iDetalleComboId = dc.iDetalleComboId
								WHERE 
									cf.iCampoFormularioId = $this->id");
	
		$this->tipoCampoId		= $rs->Fields ("iTipoCampoId");
		$this->nombre			= $rs->Fields ("cNombre");
		$this->esNull			= $rs->Fields ("bEsNull");
		$this->etiqueta			= $rs->Fields ("cEtiqueta");
		$this->nombreCampoDb	= $rs->Fields ("cNombreCampoDb");
		$this->esAutoFoco		= DB::FromBoolean ($rs->Fields ("bEsAutoFoco"));
		$this->store			= $rs->Fields ("cStore");
		$this->idField			= $rs->Fields ("cIdField");
		$this->descField		= $rs->Fields ("cDescField");

		$rs->Close ();
	}
	
	public function Crear () {
		global $conn;
		
		$detalle_combo_id = 'null';
		if ($this->tipoCampoId == TCAMPO_COMBO) {
			$conn->Execute ("INSERT INTO DetalleCombo (iDetalleComboId, cStore, cIdField, cDescField) 
							VALUES (nextval ('seq_detalle_combo_id'), '$this->store', '$this->idField', '$this->descField')");

			$detalle_combo_id = $conn->GetSecuenceLastId ('seq_detalle_combo_id');
		}

		$conn->Execute ("INSERT INTO CampoFormulario (iCampoFormularioId, cNombre, iDetalleComboId, iTipoCampoId, bEsNull, cEtiqueta, cNombreCampoDb, bEsAutoFoco)
						VALUES (nextval ('seq_campo_formulario_id'), '$this->nombre', $detalle_combo_id, $this->tipoCampoId, " . DB::ToBoolean ($this->esNull) . ", '$this->etiqueta', '$this->nombreCampoDb', " . DB::ToBoolean ($this->esAutoFoco) . ")");

		$this->id = $conn->GetSecuenceLastId ('seq_campo_formulario_id');
	}
}
