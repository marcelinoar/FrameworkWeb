<?
/***************************************************************************************************
 * 																									
 * Archivo: PgsqlQueryResult.php																		
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

class PgsqlQueryResult extends BaseQueryResult {
	private $query_result;
	private $datos;
	private $error_cod;
	private $error_msg;
	private $eof;

	public function PgsqlQueryResult ($id) {
		$this->query_result 	= $id;
		$this->datos 			= pg_fetch_array ($id, NULL, PGSQL_ASSOC);
		
		$this->eof = false;
		if (!$this->datos) {
			$this->eof = true;
		}
	}
	
	public function Fields ($field_name) {
		return trim ($this->datos[strtolower ($field_name)]);
	}

	public function Close () {
		$ret = true;
		if (!pg_free_result ($this->query_result)) {
			$ret = false;
			$this->Error ();
		}

		return $ret;
	}

	public function Next () {
		$this->datos = pg_fetch_array ($this->query_result, NULL, PGSQL_ASSOC);
		
		$this->eof = false;
		if (!$this->datos) {
			$this->eof = true;
		}
	}

	public function Eof () {
		return $this->eof;
	}
	
	protected function Error () {
		print "Error: '" . pg_result_error ($this->conn_id) . "'";
	}
}
?>