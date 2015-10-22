<?

class RetValue {
	private $Message;		// Mensaje de error.
	private $Error;			// True si existe condicion de error.
	
	/*
	 * Crea un objeto del tipo RetValue indicando un error. 
	 * Parametros:
	 * 	$msg: Mensaje de error
	 */
	public function RetValue ($msg = null) {
		$this->Message 	= $msg;
		$this->Error	= ($msg != null);
	}
	
	public function GetMessage () {
		return $this->Message;
	}
}

?>