<?
/**************************************************************************************************
 * Archivo: PermisoEstandarEntidad.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Permiso
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

class PermisoCustomEntidad {
	public $entidadId;
	public $permisoCustomId;
	public $nombreEntidad;
	public $nombreGrupo;
	public $codigo;
	public $aplicar;
	
	/**
	 *
	 * Recibe un array asociativo formado por las propieades del objeto en forma de campos
	 * y lo carga en $this
	 *
	 * @param	$arr: Array asociativo de propiedades del objeto
	 */
	public function ActualizarPropiedades ($arr) {
		$this->entidadId		= $arr->entidadId;
		$this->permisoCustomId	= $arr->permisoCustomId;
		$this->nombreEntidad	= $arr->nombreEntidad;
		$this->nombreGrupo		= $arr->nombreGrupo;
		$this->codigo			= $arr->codigo;
		$this->aplicar			= $arr->aplicar;
	}
	
	/**
	 *
	 * Trae de la DB los permisos custom asociados a un grupo.
	 *
	 * @param	$grupo_id: Id del grupo
	 *
	 * @return	Devuelve un array de objetos del tipo PermisoCustomEntidad con todos los
	 * permisos relacionados con un grupo.
	 */
	
	public static function GetPermisosCustomDeGrupo ($grupo_id) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT pc.iPermisoCustomId, pc.cCodigo, e.iEntidadId, e.cNombre AS nom_entidad, me.iModuloEntidadId, me.cNombre AS nom_grupo
								FROM PermisoCustom pc, AccesoGrupoCustom ag, Entidad e, ModuloEntidad me
								WHERE
									ag.iGrupoId = $grupo_id AND
									ag.iEntidadId = pc.iEntidadId AND
									ag.iPermisoCustomId = pc.iPermisoCustomId AND
									pc.iEntidadId = e.iEntidadId AND
									e.iModuloEntidadId = me.iModuloEntidadId
								ORDER BY me.iModuloEntidadId, e.iEntidadId ASC");
			
		$ret = array ();
		while (!$rs->Eof ()) {
			$item = new PermisoCustomEntidad ();
			$item->entidadId		= $rs->Fields ("iEntidadId");
			$item->permisoCustomId	= $rs->Fields ("iPermisoCustomId");
			$item->nombreEntidad	= $rs->Fields ("nom_entidad");
			$item->nombreGrupo		= $rs->Fields ("nom_grupo");
			$item->codigo			= $rs->Fields ("cCodigo");
			$item->aplicar			= true;
			
			$ret[] = $item;
			$rs->Next ();
		}
		
		$rs->Close ();
		
		return $ret;
	}
}

?>
