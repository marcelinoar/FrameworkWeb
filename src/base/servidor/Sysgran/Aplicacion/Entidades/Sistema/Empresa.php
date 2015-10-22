<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: Empresa.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Empresas
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");
require_once ("Grupo.php");

class Empresa extends EntidadBase {
	public $id;
	public $nombre;
	public $cuit;
	public $paisId;
	public $provinciaId;
	public $ciudadId;
	public $direccion;
	public $descripcion;
	public $grupos = array ();

	public function Empresa ($id = null) {
		$this->MapaCampos['nombre'] = 'cNombre';
		$this->MapaCampos['cuit'] = 'cCuit';
		$this->MapaCampos['paisId'] = 'iPaisId';
		$this->MapaCampos['provinciaId'] = 'iProvinciaId';
		$this->MapaCampos['ciudadId'] = 'iCiudadId';
		$this->MapaCampos['direccion'] = 'cDireccion';
		$this->MapaCampos['descripcion'] = 'cDescripcion';
		$this->id = $id;
	}
	
	public function SetGruposDeEmpresa ($arr) {
		foreach ($arr as $item) {
			$obj = new Grupo ($item->id);
			$obj->ActualizarPropiedades ($item);
			$this->grupos[] = $obj;
		}
	}	
	
	static public function GetEmpresasDeGrupo ($grupoId) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT e.* 
								FROM Empresa e, EmpresaGrupo eg
								WHERE
									eg.iEmpresaId = e.iEmpresaId AND
									eg.iGrupoId = $grupoId");
		$ret = array ();							
		while (!$rs->Eof ()) {
			$obj = new Empresa ();

			$obj->id			= $rs->Fields ("iEmpresaId");
			$obj->nombre 		= $rs->Fields ("cNombre");
			$obj->cuit 			= $rs->Fields ("cCuit");
			$obj->paisId 		= $rs->Fields ("iPaisId");
			$obj->provinciaId 	= $rs->Fields ("iProvinciaId");
			$obj->ciudadId 		= $rs->Fields ("iCiudadId");
			$obj->direccion 	= $rs->Fields ("cDireccion");
			$obj->descripcion 	= $rs->Fields ("cDescripcion");
			$ret[] = $obj;	
			
			$rs->Next ();
		}
		
		$rs->Close ();
		
		return $ret;
	}	
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM Empresa WHERE iEmpresaId = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$this->nombre = $rs->Fields ("cNombre");
			$this->cuit = $rs->Fields ("cCuit");
			$this->paisId = $rs->Fields ("iPaisId");
			$this->provinciaId = $rs->Fields ("iProvinciaId");
			$this->ciudadId = $rs->Fields ("iCiudadId");
			$this->direccion = $rs->Fields ("cDireccion");
			$this->descripcion = $rs->Fields ("cDescripcion");
			$rs->Close ();
		 
		 	$this->grupos = Grupo::GetGruposDeEmpresa ($this->id);
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Borrar () {
		global $conn;
		
		try {
			$conn->Execute ("DELETE FROM Empresa WHERE iEmpresaId = $this->id");
			$conn->Execute ("DELETE FROM EmpresaGrupo WHERE iEmpresaId = $this->id");
			
			return null;
					
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Crear () {
		global $conn;
		
		try {
			$conn->Execute ("INSERT INTO Empresa (iEmpresaId
				,cNombre
				,cCuit
				,iPaisId
				,iProvinciaId
				,iCiudadId
				,cDireccion
				,cDescripcion
			) VALUES (
				nextval ('seq_empresa_id')
				,'$this->nombre'
				,'$this->cuit'
				,$this->paisId
				,$this->provinciaId
				,$this->ciudadId
				,'$this->direccion'
				,'$this->descripcion'
			)");
		
			$this->id = $conn->GetSecuenceLastId ("seq_empresa_id");
		
			foreach ($this->grupos as $item) {
				$this->CrearRelacionGrupo ($this->id, $item->id);
			}
		
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}

	protected function CrearRelacionGrupo ($empresaId, $grupoId) {
		global $conn;

		$conn->Execute ("INSERT INTO EmpresaGrupo (iEmpresaId, iGrupoId) VALUES ($empresaId, $grupoId)");
	}

	protected function BorrarRelacionGrupo ($empresaId, $grupoId) {
		global $conn;

		$conn->Execute ("DELETE FROM EmpresaGrupo WHERE iEmpresaId = $empresaId AND iGrupoId = $grupoId");
	}	
	
	public function Actualizar ($campos = null) {
		global $conn;
		
		try {
			if ($campos != null) {
				$this->ActualizarCampos ($campos);
				$this->ActualizarCampoRelacionUnoAMuchos  ($campos, "grupos", "grupoId", "id", "CrearRelacionGrupo", "BorrarRelacionGrupo");
			}
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}

	private function ActualizarCampos ($campos) {
		global $conn;
			
		$this->ActualizarPropiedades ($campos);
		$asig = $this->GetInfoCamposActualizar ($campos);
		$conn->Execute ("UPDATE Empresa SET $asig WHERE iEmpresaId = $this->id");			
	}
}
?>
