<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: MenuItem.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de MenuItem
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");

class MenuItem extends EntidadBase {
	public $id;
	public $nombre;
	public $xtype;
	public $descripcion;
	public $menuItemPadre;
	public $esRaiz;
	public $esHoja;

	public function MenuItem ($id = null) {
		$this->MapaCampos['nombre'] = 'cNombre';
		$this->MapaCampos['xtype'] = 'cXtype';
		$this->MapaCampos['descripcion'] = 'cDescripcion';
		$this->id = $id;
	}

/*	
	static public function GetMenuItemsDeGrupo ($grupoId) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT g.iGrupoId, g.cNombre, g.cDescripcion 
								FROM Grupo g, EmpresaGrupo eg
								WHERE
									g.iGrupoId = eg.iGrupoId AND
									eg.iEmpresaId = $empresaId");
		$ret = array ();							
		while (!$rs->Eof ()) {
			$obj = new Grupo ();
			$obj->id			= $rs->Fields ("iGrupoId");
			$obj->grupoId		= $rs->Fields ("iGrupoId");
			$obj->nombre		= $rs->Fields ("cNombre");
			$obj->descripcion	= $rs->Fields ("cDescripcion");
			$ret[] = $obj;	
			
			$rs->Next ();
		}
		
		$rs->Close ();
		
		return $ret;
	}
*/

	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM MenuItem WHERE iMenuItemId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->nombre 		= $rs->Fields ("cNombre");
			$this->xtype 		= $rs->Fields ("cXtype");
			$this->descripcion 	= $rs->Fields ("cDescripcion");
			$this->esRaiz		= DB::FromBoolean ($rs->Fields ("bRaiz"));
			$this->esHoja		= DB::FromBoolean ($rs->Fields ("bHoja"));
			
			$rs->Close ();
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Borrar () {
		global $conn;
		
		try {
			// Cuelgo de la raiz a los hijos
			$conn->Execute ("UPDATE MenuItem SET bRaiz = " . ToBoolean (true) . " WHERE iMenuItemId IN (
								SELECT iMenuItemId 
								FROM MenuItem m, ArbolMenu a
								WHERE
									m.iMenuItemId = iMenuItemHijo AND
									a.iMenuItemPadre = $this->id
							)");

			// Borro las relaciones hijas
			$conn->Execute ("DELETE FROM ArbolMenu WHERE iMenuItemPadre = $this->id");


			// Actualizo el estado de los padres. Marco como hoja todos los que quedan como hoja al borrar este nodo.
			$conn->Execute ("UPDATE MenuItem SET bHoja = " . DB::ToBoolean (true) . " WHERE iMenuItemId IN (
								SELECT iMenuItemPadre 
								FROM ArbolMenu
								WHERE
									iMenuItemPadre IN (
										SELECT iMenuItemPadre 
										FROM ArbolMenu
										WHERE
											iMenuItemHijo = $this->id
									)
								GROUP BY iMenuItemPadre										
								HAVING COUNT(*) = 1
							)");

			// Borro las relaciones padres (puede tener multiples padres)
			$conn->Execute ("DELETE FROM ArbolMenu WHERE iMenuItemHijo = $this->id");

			// Finalmente borro el item.
			$conn->Execute ("DELETE FROM MenuItem WHERE iMenuItemId = $this->id");

			return null;
					
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Crear () {
		global $conn;
		
		$raiz = DB::ToBoolean (false);
		if ($this->menuItemPadre == 'root') {
			$raiz = DB::ToBoolean (true);
		}

		try {
			$conn->Execute ("INSERT INTO MenuItem (iMenuItemId
				,cNombre
				,cXtype
				,cDescripcion
				,bRaiz
				,bHoja
			) VALUES (
				nextval ('seq_menu_item_id')
				,'$this->nombre'
				,'$this->xtype'
				,'$this->descripcion'
				,$raiz
				," . DB::ToBoolean (true) . "
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_menu_item_id');
			
			if ($this->menuItemPadre != 'root') {
				$conn->Execute ("INSERT INTO ArbolMenu (iMenuItemPadre, iMenuItemHijo, iNumDeOrden) VALUES ($this->menuItemPadre, $this->id, 1)");
				$conn->Execute ("UPDATE MenuItem SET bHoja = " . DB::ToBoolean (false) . " WHERE iMenuItemId = $this->menuItemPadre");	
			}
			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Actualizar ($campos = null) {
		global $conn;
		
		try {
			if ($campos != null) {
				$this->ActualizarPropiedades ($campos);
			}
	
			$asig = $this->GetInfoCamposActualizar ($campos);
			$conn->Execute ("UPDATE MenuItem SET $asig WHERE iMenuItemId = $this->id");			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
