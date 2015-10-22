<?
/***************************************************************************************************
 * 																									
 * Archivo: OracleQueryResult.php																		
 * ------------------------------------------------------------------------------------------------ 
 *																									
 * Autor: Marcelino Morales																			
 * 																									
 * Version: 1.0																						
 * 																									
 * Descripcion: 
 *																									
 ***************************************************************************************************/

require_once ("Sysgran/Core/Db/BaseQueryResult.php");

class OracleQueryResult extends BaseQueryResult {
	private $query_result;
	private $datos;
	private $error_cod;
	private $error_msg;
	private $eof;
	
	protected function Error () {
		$error 				= oci_error ();
		$this->error_cod 	= $error['code'];
		$this->error_msg 	= $error['message'];

		print "Error (" . $this->GetErrorCode () . ") - '" . $this->GetErrorMsg () . "'";
	}

	public function OracleQueryResult ($id) {
		$this->query_result 	= $id;
		$this->datos 			= oci_fetch_array ($id, OCI_ASSOC);
		
		$this->eof = ($this->datos == false);
	}
	
	public function Fields ($field_name) {
		return trim ($this->datos[strtoupper ($field_name)]);
	}

	public function Close () {
		$ret = TRUE;
		if (!oci_free_statement ($this->query_result)) {
			$ret = FALSE;
			$this->Error ();			
		}

		return $ret;
	}

	public function Next () {
		$this->datos = oci_fetch_array ($this->query_result, OCI_ASSOC);
		
		$this->eof = false;
		if (!$this->datos) {
			$this->eof = true;
		}
	}

	public function Eof () {
		return $this->eof;
	}
}

?>