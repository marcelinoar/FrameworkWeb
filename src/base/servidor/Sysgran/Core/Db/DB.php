<?

/**
 *
 * Esta clase hace la conversion entre tipos de datos utilizados por la base de datos y PHP dependiendo del motor de base de datos utilizado.
 */

class DB {
	//
	// Devuelve el valor en formato DB.
	//
	public static function ToBoolean ($val) {
		global $conn;
		
		return $conn->CheckToBooleanTrueValue($val);
	}
	
	//
	// Devuelve true o false (valores logicos) 
	//
	public static function FromBoolean ($val) {
		global $conn;
		
		return $conn->CheckFromBooleanTrueValue ($val);
	}
	
	//
	// Convierte un numero de punto flotante (string de la forma '999,999,999.0000')
	// a un formato float para insertarse en la DB.
	//
	public static function ToFloat ($val) {
		global $conn;
		
		return $conn->ToFloat ($val);
	}
	
	//
	// Convierte un numero de punto flotante del formato de la DB a php.
	//
	public static function FromFloat ($val) {
		global $conn;
		
		return $conn->FromFloat ($val);
	}
	
	public static function ToDate ($val) {
		global $conn;
		
		return $conn->ToDate ($val);
		
	}
	
	public static function SetNulleableDateValue ($val) {
		global $conn;
		
		return $conn->SetNulleableDateValue ($val);
	}	
	
	public static function SetNulleableFloatValue ($val) {
		if ($val == null) {
			return 'null';
			
		} else {
			return DB::ToFloat ($val);
		}
	}
		
}

?>