<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: StoreGrupophp
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

class StoreGrupo extends StoreBase {
	function StoreGrupo ($paginado = false) {
		parent::__construct($paginado); 

		$this->AgregarParametro (new ParametroFiltro ("fcodigo", "iGrupoId"));
		$this->AgregarParametro (new ParametroBusqueda ("bnom", "cNombre"));
		
		$this->Query = "SELECT iGrupoId, cNombre FROM Grupo";
	}
	
	function CargarItem ($rs) {
		$ret['id'] = $rs->Fields ('iGrupoId');
		$ret['grupoId'] = $rs->Fields ("iGrupoId");
		$ret['nombre'] = $rs->Fields ("cNombre");

		return $ret;
	}
}