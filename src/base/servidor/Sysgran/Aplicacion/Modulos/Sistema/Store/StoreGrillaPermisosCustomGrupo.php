<?
/**************************************************************************************************
 * Archivo: StoreGrillaPermisosCustomGrupo.php
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

class StoreGrillaPermisosCustomGrupo extends StoreBase {
	function StoreGrillaPermisosCustomGrupo ($paginado = false) {
		parent::__construct($paginado); 

		$this->Query = "SELECT pc.iPermisoCustomId, pc.cCodigo, e.iEntidadId, e.cNombre AS nom_entidad, me.iModuloEntidadId, me.cNombre AS nom_grupo
							FROM PermisoCustom pc, Entidad e, ModuloEntidad me
							WHERE
								pc.iEntidadId = e.iEntidadId AND
								e.iModuloEntidadId = me.iModuloEntidadId
							ORDER BY me.iModuloEntidadId, e.iEntidadId ASC";
	}
	
	function CargarItem ($rs) {
		$ret['entidadId']		= $rs->Fields ("iEntidadId");
		$ret['permisoCustomId']	= $rs->Fields ("iPermisoCustomId");
		$ret['nombreEntidad']	= $rs->Fields ("nom_entidad");
		$ret['nombreGrupo']		= $rs->Fields ("nom_grupo");
		$ret['codigo']			= $rs->Fields ("cCodigo");
		$ret['aplicar']			= false;

		return $ret;
	}
}