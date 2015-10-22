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

class PermisoEstandarEntidad {
	public $entidadId;
	public $nombreEntidad;
	public $nombreGrupo;
	public $verListado;
	public $verRegistro;
	public $crearRegistro;
	public $borrarRegistro;
	public $modificarRegistro;
	
	/**
	 *
	 * Recibe un array asociativo formado por las propieades del objeto en forma de campos
	 * y lo carga en $this
	 *
	 * @param	$arr: Array asociativo de propiedades del objeto
	 */
	public function ActualizarPropiedades ($arr) {
		$this->entidadId		= $arr->entidadId;
		$this->nombreEntidad 	= $arr->nombreEntidad;
		$this->nombreGrupo		= $arr->nombreGrupo;
		$this->verListado		= $arr->verListado;
		$this->verRegistro		= $arr->verRegistro;
		$this->crearRegistro	= $arr->crearRegistro;
		$this->borrarRegistro	= $arr->borrarRegistro;
		$this->modificarRegistro= $arr->modificarRegistro;
	}
	
	/**
	 *
	 * Trae de la DB los permisos estandar asociados a un grupo.
	 *
	 * @param	$grupo_id: Id del grupo
	 *
	 * @return	Devuelve un array de objetos del tipo PermisoEstandarEntidad con todos los
	 * permisos relacionados con un grupo.
	 */
	
	public static function GetPermisosDeGrupo ($grupo_id) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT e.iEntidadId, e.iModuloEntidadId, e.cNombre AS nom_entidad, me.cNombre AS nom_grupo, bVerListado, bVerRegistro, bBorrarRegistro, bModificarRegistro, bCrearRegistro 
								FROM AccesoGrupoEstandar age, Entidad e, ModuloEntidad me
								WHERE
									age.iGrupoId = $grupo_id AND
									age.iEntidadId = e.iEntidadId AND
									e.iModuloEntidadId = me.iModuloEntidadId
								ORDER BY e.iModuloEntidadId ASC");
			
		$ret = array ();
		while (!$rs->Eof ()) {
			$item = new PermisoEstandarEntidad ();
			$item->entidadId		= $rs->Fields ("iEntidadId");
			$item->nombreEntidad	= $rs->Fields ("nom_entidad");
			$item->nombreGrupo		= $rs->Fields ("nom_grupo");
			$item->verListado		= DB::FromBoolean ($rs->Fields ("bVerListado"));
			$item->verRegistro		= DB::FromBoolean ($rs->Fields ("bVerRegistro"));
			$item->crearRegistro	= DB::FromBoolean ($rs->Fields ("bCrearRegistro"));
			$item->borrarRegistro	= DB::FromBoolean ($rs->Fields ("bBorrarRegistro"));
			$item->modificarRegistro= DB::FromBoolean ($rs->Fields ("bModificarRegistro"));
			
			$ret[] = $item;
			$rs->Next ();
		}
		
		$rs->Close ();
		
		return $ret;
	}
}

?>
