<?
/***************************************************************************************************
 * Archivo: Encoder.php																		
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: 
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

class Encoder {
	//
	// Codifica un objeto.
	//
	public static function Encode ($model, $root_node = 'root') {
		if ($root_node != '') {
			$data[$root_node] = $model;

		} else {
			$data = $model;
		}

		return json_encode ($data);
	}	

	//
	// Devuelve un mensaje de error.
	//
	// Parametros:
	// 	ex: puede ser del tipo Exception o string
	//
	public static function EncodeResponseError ($ex) {
		$tipo = gettype ($ex);

		if ($tipo == 'string') {
			$ret['success'] = 'false';
			$ret['message'] = $ex;
			
		} else if (($tipo == 'object') && (get_class ($ex) == 'Exception')) {
			$ret['success'] = 'false';
			$ret['message'] = $ex->GetMessage ();

		} else if (($tipo == 'object') && (get_class ($ex) == 'RetValue')) {							
			$ret['success'] = 'false';
			$ret['message'] = $ex->GetMessage ();
		
		} else {
			$ret['success'] = 'false';
			$ret['message'] = 'Error indefinido';
		}

		$ret['data'] = '';	
		
		return Encoder::Encode ($ret, '');
	}
	
	/**
	 *
	 * Devuelve un mensaje indicando que la transaccion resulto exitosa.
	 *
	 * @return	Devuelve un texto en formato Json con el objeto que indica la transaccion exitosa.
	 */
	public static function EncodeResponseOk ($data = '') {
		$ret['success'] = 'true';
		$ret['message'] = '';
		$ret['data']	= $data;
		
		return Encoder::Encode ($ret, '');
	}
}
?>