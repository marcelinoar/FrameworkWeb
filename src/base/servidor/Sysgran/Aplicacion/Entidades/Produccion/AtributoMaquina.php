<?
/**************************************************************************************************
 * Archivo: AtributoMaquina.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: 
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");

class AtributoMaquina extends EntidadBase {
	public $id;
	public $maquinaId;
	public $nombre;
	public $valor;
	
	public static function GetAtributosDeMaquina ($maquina_id) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT * FROM AtributoMaquina WHERE iMaquinaId = $maquina_id");
		
		$ret = array ();
		while (!$rs->Eof ()) {
			$obj = new AtributoMaquina();
			$obj->id 			= $rs->Fields ("iAtributoMaquinaId");
			$obj->maquinaId	 	= $rs->Fields ("iMaquinaId");
			$obj->nombre 		= $rs->Fields ("cNombre");
			$obj->valor			= $rs->Fields ("cValor");
			$ret[] = $obj;
				
			$rs->Next ();
		}
		
		$rs->Close ();
		
		
		return $ret;
	}	
	
	public function AtributoMaquina ($id = null) {
		$this->MapaCampos['nombre'] = 'cNombre';
		$this->MapaCampos['valor'] 	= 'cValor';
		
		$this->id = $id;
	}	
	
	public function Leer () {
		global $conn;
		
		try {		
			$rs = $conn->Retrieve ("SELECT iMaquinaId, cValor, cNombre FROM AtributoMaquina WHERE iAtributoMaquinaId = $this->id");

			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}

			$obj->maquinaId		= $rs->Fields ("iMaquinaId");
			$obj->nombre		= $rs->Fields ("cNombre");
			$obj->valor			= $rs->Fields ("cValor");
			$rs->Close ();
			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}			
	}
	
	public function Borrar () {
		global $conn;
		
		try {
			$conn->Execute ("DELETE FROM AtributoMaquina WHERE iAtributoMaquinaId = $this->id");
			
			return null;
					
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}			
	}
	
	public function Crear () {
		global $conn;
		
		try {
			$conn->Execute ("INSERT INTO AtributoMaquina (iAtributoMaquinaId
				,iMaquinaId
				,cNombre
				,cValor
			) VALUES (
				nextval ('seq_atributo_maquina_id')
				,$this->maquinaId
				,'$this->nombre'
				,'$this->valor'
			)");

			$this->id = $conn->GetSecuenceLastId ('seq_atributo_maquina_id');
			
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
			$conn->Execute ("UPDATE AtributoMaquina SET $asig WHERE iAtributoMaquinaId = $this->id");
			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}
?>
