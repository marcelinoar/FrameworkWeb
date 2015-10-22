<?
require_once ('template.php');
require_once ("Sysgran/Aplicacion/Entidades/Sistema/Usuario.php");

class Core {
	public static function GetFechaActual () {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT TO_CHAR(CURRENT_TIMESTAMP, 'DD/MM/YYYY') AS fecha_actual");
		$ret = $rs->Fields ("fecha_actual");
		$rs->Close ();
		
		return $ret;
	}
	
	public static function GetFechaYHoraActual () {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT TO_CHAR(CURRENT_TIMESTAMP, 'DD/MM/YYYY') AS fecha, TO_CHAR(CURRENT_TIMESTAMP, 'HH24') AS hora, TO_CHAR(CURRENT_TIMESTAMP, 'MI') AS minutos");
		$ret['fecha'] = $rs->Fields ("fecha");
		$ret['hora'] = $rs->Fields ("hora");
		$ret['minutos'] = $rs->Fields ("minutos");
		
		$rs->Close ();
		
		return $ret;
	}	
	
	public static function GetNombreEmpresa () {
		return "Plasticos del Comahue S.A.";
	}
	
	public static function GetUsuarioSesion () {
		$usu = new Usuario (Sesion::GetSesion ()->usuarioId);
		$usu->Leer ();
		
		return $usu;
	}
}

?>
