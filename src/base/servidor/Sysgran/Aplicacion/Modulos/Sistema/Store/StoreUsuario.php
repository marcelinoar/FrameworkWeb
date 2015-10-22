<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: StoreUsuariophp
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ('template.php');
require_once ('Sysgran/Core/Red/Encoder.php');
require_once ('Sysgran/Core/Listados/ParametroFiltro.php');
require_once ('Sysgran/Core/Listados/ParametroBusqueda.php');
require_once ('Sysgran/Core/Php/StoreBase.php');

class StoreUsuario extends StoreBase {
	function StoreUsuario ($paginado = false) {
		parent::__construct($paginado); 

		$this->AgregarParametro (new ParametroFiltro ("fcodigo", "iUsuarioId"));
		$this->AgregarParametro (new ParametroBusqueda ("bnom", "cLoginName"));
		$this->AgregarParametro (new ParametroBusqueda ("bcom", "cComentario"));
		$this->AgregarParametro (new ParametroBusqueda ("bmail", "cEmail"));

		$this->Query = "SELECT iUsuarioId, cLoginName FROM Usuario ORDER BY iUsuarioId ASC";
	}
	
	function CargarItem ($rs) {
		$ret['id'] = $rs->Fields ('iUsuarioId');
		$ret['usuarioId'] = $rs->Fields ("iUsuarioId");
		$ret['loginName'] = $rs->Fields ("cLoginName");

		return $ret;
	}
}