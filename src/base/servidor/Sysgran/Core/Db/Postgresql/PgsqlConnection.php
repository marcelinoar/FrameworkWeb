<?
/***************************************************************************************************
 * 																									
 * Archivo: PgsqlConnection.php																		
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
require_once ("PgsqlQueryResult.php");

class PgsqlConnection extends BaseConnection {
	private $conn_id;
	private $error_cod;
	private $error_msg;
	private $db_host;
	private $db_port;
	private $db_name;
	private $db_user;
	private $db_password;
	private $conectada;

	public function PgsqlConnection ($db_host, $db_port, $db_name, $db_user, $db_password) {
		$this->error_cod 	= NULL;
		$this->error_msg 	= NULL;
		$this->conn_id 		= NULL;
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
		$this->conn_id 		= pg_connect ("host=" . $this->db_host . " port=" . $this->db_port . " dbname=" . $this->db_name . " user=" . $this->db_user . " password=" . $this->db_password);
		$ret 				= true;
		$this->conectada	= true;

		if (!$this->conn_id) {
			$this->Error ();
			$this->conectada = false;
			$ret = false;
		}

		return $ret;
	}

	//
	// Desconecta de la db.
	//
	public function Disconnect () {
		$ret = true;

		if (!pg_close ($this->conn_id)) {
			$this->Error ();
			$ret = false;
		}

		return $ret;
	}

	//
	// Ejecuta una sentencia sql que no devuelve datos. en caso de recibir parametros ($params) 
	// los pasa al query.
	//
	public function Execute ($query, $log_query = false) {
		$ret = true;
		
		if ($log_query != false) {
			print $query ."\n";
			
		} else {
			$pg_result = pg_query ($this->conn_id, $query);		

			if (!$pg_result) {
				print $query;
				$ret = false;
				$this->Error ();
			}
			
			pg_free_result ($pg_result);
		}
		
		return $ret;
	}
	
	//
	// Realiza una consulta a la DB.
	//
	public function Retrieve ($query, $log = false) {
		$ret = true;
		
		if ($log != false) {
			print $query ."\n";
		
		} else {
			$qry_result = pg_query ($this->conn_id, $query);

			if (!$qry_result) {
				print $query;
				$this->Error ();
				$ret = false;

			} else {
				$ret = new PgsqlQueryResult ($qry_result);
			}
		}

		return $ret;
	}
	
	//
	// Devuelve el ultimo id insertado de una secuencia.
	// 
	public function GetSecuenceLastId ($name) {
		$rs = $this->Retrieve ("SELECT currval ('$name') AS last_id");
		$ret = $rs->Fields ("last_id");
		$rs->Close ();
	
		return $ret;
	}

	//
	// Comienza una transaccion.
	//
	function BeginTransaction () {
		$qry_result = pg_query ($this->conn_id, "BEGIN WORK");
		$ret 		= true;

		if (!$qry_result) {
			$ret = false;
			$this->Error ();
		}

		return $ret;	
	}

	//
	// Confirma una transaccion.
	//

	function Commit () {
		$qry_result = pg_query ($this->conn_id, "COMMIT");
		$ret 		= true;

		if (!$qry_result) {
			$ret = false;
			$this->Error ();
		}

		return $ret;
	}

	//
	// Vuelve atras una transaccion.
	//

	function Rollback () {
		$qry_result = pg_query ($this->conn_id, "ROLLBACK");
		$ret 		= true;

		if (!$qry_result) {
			$ret = false;
			$this->Error ();
		}

		return $ret;
	}

	//
	// DEPRECATED
	//
	public function GetErrorCode () {
		return $this->error_cod;
	}

	//
	// DEPRECATED
	//
	public function GetErrorMsg () {
		return $this->error_msg;
	}
	
	protected function Error () {
		print "Error: '" . pg_last_error ($this->conn_id) . "'";
	}
	
	//
	// Recibe un valor de php que representa una expresion booleana y la transforma en un valor de DB correspondiente
	// a la misma expresion booleana.
	//
	public function CheckToBooleanTrueValue($val) {
		return ($val === 'true' || $val === true || $val === '1' || $val === 1 ? 'true' : 'false');
	}
	
	//
	// Recibe un valor tomado de la DB correspondiente a una expresion booleana y devuelve true o false segun corresponda.
	//
	public function CheckFromBooleanTrueValue ($val) {
		return ($val === 't' ? true : false);
	}
	
	//
	// Convierte un numero de punto flotante (string de la forma '999999999.0000')
	// a un formato float para insertarse en la DB.
	//
	public function ToFloat ($val) {
		//
		// Asumimos que si viene algun separador es el separador de decimales y 
		// que viene una coma. Entonces lo cambiamos por un punto.
		//
		
		$val = str_replace (',', '.', $val);
		
		return "to_number ('$val', '999999999.9999')";
	}
	
	//
	// Convierte un numero de punto flotante del formato de la DB a php.
	//
	public function FromFloat ($val) {
		//
		// Asumimos que en la interfaz se muestran los numeros separados con comas para los decimales
		// Transformamos el numero leido (que viene con un punto en el separador decimal).
		//
		
		return str_replace ('.', ',', $val);
	}	
	
	
	public function ToDate ($val) {
		return " TO_DATE ('$val', 'DD/MM/YYYY') ";
		
	}
	
	public function SetNulleableDateValue ($val) {
		if ($val == null) {
			return 'null';
		
		} else {
			return $this->ToDate ($val);
		}
	}
}

?>