<?
/***************************************************************************************************
 * 																									
 * Archivo: BaseConnection.php																		
 * ------------------------------------------------------------------------------------------------ 
 *																									
 * Autor: Marcelino Morales																			
 * 																									
 * Version: 1.0																						
 * 																									
 * Descripcion: 
 *																									
 ***************************************************************************************************/
 
require ("BaseQueryResult.php");
require ("DB.php");

class BaseConnection {
	public function BaseConnection ($db_host, $db_port, $db_name, $db_user, $db_password) {
	}
	
	public function Connect () {
	}
	
	public function Disconnect () {
	}
	
	public function Execute ($query, $log = false) {
	}
	
	public function Retrieve ($query, $log = false) {
	}
	
	public function BeginTransaction () {
	}
	
	public function Commit () {
	}
	
	public function Rollback () {
	}
	
	public function GetErrorCode () {
	}
	
	public function GetErrorMsg () {
	}

	//
	// Recibe un valor de php que representa una expresion booleana y la transforma en un valor de DB correspondiente
	// a la misma expresion booleana.
	//
	public function CheckToBooleanTrueValue($val) {
	}
	
	//
	// Recibe un valor tomado de la DB correspondiente a una expresion booleana y devuelve true o false segun corresponda.
	//
	public function CheckFromBooleanTrueValue ($val) {
	}
}
?>