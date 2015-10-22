<?
/***************************************************************************************************
 * 																									
 * Archivo: OracleConnection.php																		
 * ------------------------------------------------------------------------------------------------ 
 *																									
 * Autor: Marcelino Morales																			
 * 																									
 * Version: 1.0																						
 * 																									
 * Descripcion: 
 *																									
 ***************************************************************************************************/
require_once ("Sysgran/Core/Db/BaseConnection.php");
require_once ("OracleQueryResult.php");

class OracleConnection extends BaseConnection {
	private $conn_id;
	private $error_cod;
	private $error_msg;
	private $db_host;
	private $db_port;
	private $db_name;
	private $db_user;
	private $db_password;
	private $execution_mode = OCI_COMMIT_ON_SUCCESS;

	public function OracleConnection ($db_host, $db_port, $db_name, $db_user, $db_password) {
		$this->error_cod 	= null;
		$this->error_msg 	= null;
		$this->conn_id 		= null;
		$this->db_host		= $db_host;
		$this->db_port		= $db_port;
		$this->db_name		= $db_name;
		$this->db_user 		= $db_user;
		$this->db_password	= $db_password;
		$conectada			= false;
	}
	
	//
	// Establece la conexion con la base de datos.
	//
	public function Connect () {
		$conn_string = $this->db_host . ":" . $this->db_port . "/" . $this->db_name;
		$this->conn_id 	= oci_connect ($this->db_user, $this->db_password, $conn_string);
		$ret 			= TRUE;

		if (!$this->conn_id) {
			$ret = FALSE;
			$this->Error ();
		}

		return $ret;
	}

	//
	// Desconecta de la db.
	//
	public function Disconnect () {
		$ret = TRUE;

		if (!oci_close ($this->conn_id)) {
			$ret = FALSE;
			$this->Error ();
		}

		return $ret;
	}

	//
	// Ejecuta una sentencia sql que no devuelve datos. en caso de recibir parametros ($params) 
	// los pasa al query.
	//
	public function Execute ($query, $log_query = false) {
		if ($log_query != false) {
			print $query ."\n";
			$ret = true;
			
		} else {
			$result = oci_execute (oci_parse ($this->conn_id, $query), $this->execution_mode);		

			$ret = TRUE;
			if (!$result) {
				print $query;
				$ret = FALSE;
				$this->Error ();
			}
		}
		
		return $ret;
	}
	
	//
	// Realiza una consulta a la DB.
	//
	public function Retrieve ($query, $log = false) {
		if ($log != false) {
			print $query ."\n";
			$ret = true;
		
		} else {
			$qry_result = oci_parse ($this->conn_id, $query);
			$ex_err = oci_execute ($qry_result, $this->execution_mode);

			if (!$qry_result || !$ex_err) {
				print $query;
				$this->Error ();
				$ret = FALSE;

			} else {
				$ret = new OracleQueryResult ($qry_result);
			}
		}

		return $ret;
	}
	
	//
	// Devuelve el ultimo id insertado de una secuencia.
	//
	public function GetSecuenceLastId ($name) {
		$rs = $this->Retrieve ("SELECT " . $name . ".currval AS last_id FROM dual");
		$ret = $rs->Fields ("last_id");
		$rs->Close ();
	
		return $ret;
	}

	//
	// Comienza una transaccion.
	//

	function BeginTransaction () {
		$this->execution_mode = OCI_NO_AUTO_COMMIT;
		return true;
	}

	//
	// Confirma una transaccion.
	//

	function Commit () {
		$ret = oci_commit ($this->conn_id);
		if ($ret) {
			$this->execution_mode = OCI_COMMIT_ON_SUCCESS;
		}
		
		return $ret;
	}

	//
	// Vuelve atras una transaccion.
	//

	function Rollback () {
		$ret = oci_rollback ($this->conn_id);
		
		if ($ret) {
			$this->execution_mode = OCI_COMMIT_ON_SUCCESS;
		}
		
		return $ret;
	}

	//
	// Devuelve el ultimo codigo de error.
	//
	public function GetErrorCode () {
		return $this->error_cod;
	}

	//
	// Devuelve el ultimo mensaje de error.
	//
	public function GetErrorMsg () {
		return $this->error_msg;
	}
	
	protected function Error () {
		$error 				= oci_error ();
		$this->error_cod 	= $error['code'];
		$this->error_msg 	= $error['message'];

		print "Error (" . $this->GetErrorCode () . ") - '" . $this->GetErrorMsg () . "'";
	}
	
	//
	// Recibe un valor de php que representa una expresion booleana y la transforma en un valor de DB correspondiente
	// a la misma expresion booleana.
	//
	public function CheckToBooleanTrueValue($val) {
		return ($val == 'true' || $val == true || $val == '1' || $val == 1 ? 1 : 0);
	}
	
	//
	// Recibe un valor tomado de la DB correspondiente a una expresion booleana y devuelve true o false segun corresponda.
	//
	public function CheckFromBooleanTrueValue ($val) {
		return ($val == 1 ? true : false);
	}
}

?>