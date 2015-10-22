<?
/**************************************************************************************************
 * Archivo: CampoListado.php
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

class CampoListado extends EntidadBase {
	public $id;
	public $listadoId;
	public $tipoCampoId;
	public $nombre;
	public $etiqueta;
	public $esFlex;
	public $esSubCampo;
	public $nombreSubCampo;
	public $anchoColumna;
	
	public function CampoListado ($id = null) {
		$this->MapaCampos['tipoCampoId'] 	= 'iTipoCampoId';
		$this->MapaCampos['nombre'] 		= 'cNombre';
		$this->MapaCampos['etiqueta'] 		= 'cEtiqueta';
		$this->MapaCampos['esFlex'] 		= 'bEsFlex';
		$this->MapaCampos['esSubCampo'] 	= 'bEsSubCampo';
		$this->MapaCampos['nombreSubCampo']	= 'cNombreSubCampo';
		$this->MapaCampos['anchoColumna'] 	= 'cAnchoColumna';
		
		$this->id = $id;
	}
	
	public function Leer () {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT * FROM CampoListado WHERE iCampoListadoId = $this->id");
	
		$this->listadoId		= $rs->Fields ("iListadoId");
		$this->tipoCampoId 	= $rs->Fields ("iTipoCampoId");
		$this->nombre			= $rs->Fields ("cNombre");
		$this->etiqueta		= $rs->Fields ("cEtiqueta");
		$this->esFlex			= DB::FromBoolean ($rs->Fields ("bEsFlex"));
		$this->esSubCampo		= DB::FromBoolean ($rs->Fields ("bEsSubCampo"));
		$this->nombreSubCampo	= $rs->Fields ("cNombreSubCampo");
		$this->anchoColumna	= $rs->Fields ("cAnchoColumna");
		
		$rs->Close ();
	}
	
	public function Crear () {
		global $conn;
		
		$conn->Execute ("INSERT INTO CampoListado (iCampoListadoId, iTipoCampoId, iListadoId, cNombre, cEtiqueta, bEsFlex, bEsSubCampo, cNombreSubCampo, cAnchoColumna)
						VALUES (nextval ('seq_campo_listado'), $this->tipoCampoId, $this->listadoId, '$this->nombre', '$this->etiqueta', " . DB::ToBoolean ($this->esFlex) . ", " . DB::ToBoolean ($this->esSubCampo) . ", '$this->nombreSubCampo', $this->anchoColumna)");		
		
		$this->id = $conn->GetSecuenceLastId ('seq_campo_listado');
	}
}
