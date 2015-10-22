<?
/**************************************************************************************************
 * Archivo: StoreGrillaPermisosEstandarGrupo.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Se encarga de devolver la informacion necesaria para armar la grilla de permisos
 * 				custom.
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

class StoreGrillaPermisosEstandarGrupo extends StoreBase {
	function StoreGrillaPermisosEstandarGrupo ($paginado = false) {
		parent::__construct($paginado); 

		$this->Query = "SELECT e.iEntidadId, e.iModuloEntidadId, e.cNombre AS nom_entidad, me.cNombre AS nom_grupo
							FROM Entidad e, ModuloEntidad me
							WHERE
							  e.iModuloEntidadId = me.iModuloEntidadId
							ORDER BY e.iModuloEntidadId ASC";
	}
	
	function CargarItem ($rs) {
		$ret['entidadId'] 			= $rs->Fields ("iEntidadId");
		$ret['nombreEntidad'] 		= $rs->Fields ("nom_entidad");
		$ret['nombreGrupo'] 		= $rs->Fields ("nom_grupo");
		$ret['verListado']			= false;
		$ret['verRegistro']			= false;
		$ret['crearRegistro']		= false;
		$ret['borrarRegistro']		= false;
		$ret['modificarRegistro']	= false;

		return $ret;
	}
}