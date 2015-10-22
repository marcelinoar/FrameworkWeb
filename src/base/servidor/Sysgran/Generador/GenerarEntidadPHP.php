<?
//
//
// Seria bueno tambien generar las entidades del detalle.
//
// Parametros:
// $m: FormularioMaestro
//
function GenerarEntidadMaestroDetallePHP ($m) {
	$ret = "<?\n";
	$ret  .= '/**************************************************************************************************' . "\n";
  	$ret .= ' * Archivo: ' . $m->NombreEntidad . ".php" . "\n";
  	$ret .= ' * ------------------------------------------------------------------------------------------------' . "\n";
 	$ret .= ' * Version: 1.0' . "\n";
  	$ret .= ' * Descripcion: ' . $m->Descripcion . "\n";
 	$ret .= ' * Modificaciones:' . "\n";
  	$ret .= ' *	-' . "\n";
 	$ret .= ' *' . "\n";
  	$ret .= ' * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.' . "\n";
 	$ret .= ' **************************************************************************************************/' . "\n\n";
	$ret .= "require_once (\"Sysgran/Core/Php/EntidadBase.php\");

	// ** Incluir los require para las clases relacionadas.
	
class $m->NombreEntidad extends EntidadBase {\n";
	
	$ret .= "\t" . 'public $id;' . "\n";

	// Definimos las propiedades de la entidad.
	for ($i = 0; $i < count ($m->Campos); $i++) {
		if ($m->Campos[$i]->Tipo == TCAMPO_RELACION) {
			$ret = $ret . "\t" . 'public $' . $m->Campos[$i]->Nombre . " = array ();\n";
		
		} else {
			$ret = $ret . "\t" . 'public $' . $m->Campos[$i]->Nombre . ";\n";
		}
	}
	
	// Constructor.
	$ret .= "\n\tpublic function " . $m->NombreEntidad . ' ($id = null) {' . "\n";

	for ($i = 0; $i < count ($m->Campos); $i++) {
		if ($m->Campos[$i]->Tipo != TCAMPO_RELACION) {
			$ret = $ret . "\t\t" . '$this->MapaCampos[\'' . $m->Campos[$i]->Nombre . '\'] = \'' . $m->Campos[$i]->NombreCampoDb . '\';' . "\n";
		}
	}

	$ret .= "\t\t" . '$this->id = $id;
	}
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM ' . $m->NombreEntidad . ' WHERE i' . $m->NombreEntidad . 'Id = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}' . "\n\n";
		
	for ($i = 0; $i < count ($m->Campos); $i++) {
		if ($m->Campos[$i]->Tipo != TCAMPO_RELACION) {
			$ret = $ret . "\t\t\t" . '$this->' . $m->Campos[$i]->Nombre . ' = $rs->Fields ("' . $m->Campos[$i]->NombreCampoDb . '");' . "\n";
		
		} else if ($m->Campos[$i]->Tipo == TCAMPO_CHECKBOX) {
			$ret = $ret . "\t\t\t" . '$this->' . $m->Campos[$i]->Nombre . ' = DB::FromBoolean ($rs->Fields ("' . $m->Campos[$i]->NombreCampoDb . '"));' . "\n";
		}
	}
	
	$ret .= "\t\t\t" . '$rs->Close ();' . "\n";
	
	$ret .= "\t\t //** Leer los campos detalle aca." . '
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Borrar () {
		global $conn;
		
		try {' . "\n";
	
	foreach ($m->Campos as $item) {
		if ($item->Tipo == TCAMPO_RELACION) {
			$ret .= "\t\t\t" . 'foreach ($this->' . $item->Nombre . ' as $item) {
				$item->Borrar ();' . "
			}\n";
		}
	}
	
	$ret .= '
			$conn->Execute ("DELETE FROM ' . $m->NombreEntidad . ' WHERE i' . $m->NombreEntidad . 'Id = $this->id");
			
			return null;
					
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Crear () {
		global $conn;
		
		try {
			$conn->Execute ("INSERT INTO ' . $m->NombreEntidad . ' (i' . $m->NombreEntidad . 'Id' . "\n";

	for ($i = 0; $i < count ($m->Campos); $i++) {
		$ret = $ret . "\t\t\t\t," . $m->Campos[$i]->NombreCampoDb . "\n";
	}
		
	$ret  .= "\t\t\t" . ') VALUES (
			nextval (' . "'" . $m->NombreSecuencia . "')\n";

	for ($i = 0; $i < count ($m->Campos); $i++) {
		$letra_notacion = substr ($m->Campos[$i]->NombreCampoDb, 0, 1);
		
		if ($letra_notacion == 'c' || $letra_notacion == 'f') {
			$ret = $ret . "\t\t\t\t" . ',\'$this->' . $m->Campos[$i]->Nombre . "'\n";

		} else if ($letra_notacion == 'b') {
			$ret = $ret . "\t\t\t\t" . '," . DB::ToBoolean ($this->' . $m->Campos[$i]->Nombre . ') . "' . "\n";
			
		} else {
			$ret = $ret . "\t\t\t\t" . ',$this->' . $m->Campos[$i]->Nombre . "\n";
		}
	}
	
	$ret .= "\t\t\t" . ')");
		
			$this->id = $conn->GetSecuenceLastId (' . "'" . $m->NombreSecuencia . "'" . ');
		
			// ** Crear las entidades relacionadas
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Actualizar ($campos = null) {
		global $conn;
		
		try {
			if ($campos != null) {
				$this->ActualizarCampos ($campos);' ."\n";
				
	foreach ($m->Campos as $item) {
		if ($item->Tipo == TCAMPO_RELACION) {
			$ret .= "\t\t\t\t" . '$this->ActualizarCamposRelacionados ($campos, "' . $item->Nombre . '", "' . lcfirst ($m->NombreEntidad) . 'Id", ""); // ** Completar con el nombre de la clase' . "\n"; 					
		}
	} 
	
	$ret .= "\t\t\t" . '}
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}

	private function ActualizarCampos ($campos) {
		global $conn;
			
		$this->ActualizarPropiedades ($campos);
		$asig = $this->GetInfoCamposActualizar ($campos);
		$conn->Execute ("UPDATE ' . $m->NombreEntidad . ' SET $asig WHERE i' . $m->NombreEntidad . 'Id = $this->id");			
	}
				
	// ** Crear las clases que cargan los items detalle en los arrays al crear. public function AgregarMovimientosMoneda ($item) 
				
}' . "\n?>\n";

	return $ret;
}


//
// Parametros:
// $m: FormularioMaestro
//
function GenerarEntidadTablaPHP ($m) {
	$ret = "<?\n";
	$ret  .= '/**************************************************************************************************' . "\n";
  	$ret .= ' * Archivo: ' . $m->NombreEntidad . ".php" . "\n";
  	$ret .= ' * ------------------------------------------------------------------------------------------------' . "\n";
 	$ret .= ' * Version: 1.0' . "\n";
  	$ret .= ' * Descripcion: ' . $m->Descripcion . "\n";
 	$ret .= ' * Modificaciones:' . "\n";
  	$ret .= ' *	-' . "\n";
 	$ret .= ' *' . "\n";
  	$ret .= ' * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.' . "\n";
 	$ret .= ' **************************************************************************************************/' . "\n\n";
	$ret .= "require_once (\"Sysgran/Core/Php/EntidadBase.php\");

class $m->NombreEntidad extends EntidadBase {\n";
	
	$ret .= "\t" . 'public $id;' . "\n";

	// Definimos las propiedades de la entidad.
	for ($i = 0; $i < count ($m->Campos); $i++) {
		if ($m->Campos == TCAMPO_RELACION) {
			$ret = $ret . "\t" . 'public $' . $m->Campos[$i]->Nombre . " = array ();\n";
		
		} else {
			$ret = $ret . "\t" . 'public $' . $m->Campos[$i]->Nombre . ";\n";
		}
	}
	
	// Constructor.
	$ret .= "\n\tpublic function " . $m->NombreEntidad . ' ($id = null) {' . "\n";

	for ($i = 0; $i < count ($m->Campos); $i++) {
		if ($m->Campos != TCAMPO_RELACION) {
			$ret = $ret . "\t\t" . '$this->MapaCampos[\'' . $m->Campos[$i]->Nombre . '\'] = \'' . $m->Campos[$i]->NombreCampoDb . '\';' . "\n";
		}
	}

	$ret .= "\t\t" . '$this->id = $id;
	}
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT * FROM ' . $m->NombreEntidad . ' WHERE i' . $m->NombreEntidad . 'Id = $this->id");
									
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}' . "\n\n";
		
	for ($i = 0; $i < count ($m->Campos); $i++) {
		if ($m->Campos[$i]->Tipo == TCAMPO_CHECKBOX) {
			$ret = $ret . "\t\t\t" . '$this->' . $m->Campos[$i]->Nombre . ' = DB::FromBoolean ($rs->Fields ("' . $m->Campos[$i]->NombreCampoDb . '"));' . "\n";
		
		} else {
			$ret = $ret . "\t\t\t" . '$this->' . $m->Campos[$i]->Nombre . ' = $rs->Fields ("' . $m->Campos[$i]->NombreCampoDb . '");' . "\n";
		}
	}
	
	$ret .= "\t\t\t" . '$rs->Close ();' . "\n";
	
	$ret .= "\t\t\t" . 'return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Borrar () {
		global $conn;
		
		try {';

	$ret .= '
			$conn->Execute ("DELETE FROM ' . $m->NombreEntidad . ' WHERE i' . $m->NombreEntidad . 'Id = $this->id");
			
			return null;
					
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Crear () {
		global $conn;
		
		try {
			$conn->Execute ("INSERT INTO ' . $m->NombreEntidad . ' (i' . $m->NombreEntidad . 'Id' . "\n";

	for ($i = 0; $i < count ($m->Campos); $i++) {
		$ret = $ret . "\t\t\t\t," . $m->Campos[$i]->NombreCampoDb . "\n";
	}
		
	$ret  .= "\t\t\t" . ') VALUES (
			' . "nextval ('" . $m->NombreSecuencia . "')\n";

	for ($i = 0; $i < count ($m->Campos); $i++) {
		$letra_notacion = substr ($m->Campos[$i]->NombreCampoDb, 0, 1);
		
		if ($letra_notacion == 'c' || $letra_notacion == 'f') {
			$ret = $ret . "\t\t\t\t" . ',\'$this->' . $m->Campos[$i]->Nombre . "'\n";

		} else if ($letra_notacion == 'b') {
			$ret = $ret . "\t\t\t\t" . '," . DB::ToBoolean ($this->' . $m->Campos[$i]->Nombre . ') . "' . "\n";
			
		} else {
			$ret = $ret . "\t\t\t\t" . ',$this->' . $m->Campos[$i]->Nombre . "\n";
		}
	}
	
	$ret .= "\t\t\t" . ')");
		
			$this->id = $conn->GetSecuenceLastId (' . "'" . $m->NombreSecuencia . "'" . ');
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Actualizar ($campos = null) {
		global $conn;
		
		try {
			if ($campos != null) {
				$this->ActualizarPropiedades ($campos);' ."\n";
	$ret .= "\t\t\t" . '}
	
			$asig = $this->GetInfoCamposActualizar ($campos);
			$conn->Execute ("UPDATE ' . $m->NombreEntidad . ' SET $asig WHERE i' . $m->NombreEntidad . 'Id = $this->id");			
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}					
	}
}' . "\n?>\n";

	return $ret;
}

?>