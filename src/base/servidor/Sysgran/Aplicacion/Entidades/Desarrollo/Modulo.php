<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: Modulo.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: 
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ("Sysgran/Core/Php/EntidadBase.php");

class Modulo extends EntidadBase {
	public $id;
	public $nombre;
	public $rutaArchivos;
	public $ruta;

	public function Modulo ($id = null) {
		$this->MapaCampos['nombre'] = 'cNombre';
		$this->MapaCampos['rutaArchivos'] = 'cRutaArchivos';
		$this->MapaCampos['ruta'] = 'cRuta';
		$this->id = $id;
	}
	
	public function Leer () {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT * FROM Modulo WHERE iModuloId = $this->id");
									
		if ($rs->Eof ()) {
			$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
		}

		$this->nombre = $rs->Fields ("cNombre");
		$this->rutaArchivos = $rs->Fields ("cRutaArchivos");
		$this->ruta = $rs->Fields ("cRuta");
		$rs->Close ();
	}
	
	public function Borrar () {
		global $conn;
		
		$conn->Execute ("DELETE FROM Modulo WHERE iModuloId = $this->id");
	}
	
	public function Crear () {
		global $conn;
		
		$conn->Execute ("INSERT INTO Modulo (iModuloId
			,cNombre
			,cRutaArchivos
			,cRuta
		) VALUES (
			nextval('seq_modulo')
			,'$this->nombre'
			,'$this->rutaArchivos'
			,'$this->ruta'
		)");
		
		$this->id = $conn->GetSecuenceLastId ('seq_modulo');
	}
	
	//
	// Actualiza el registro.
	//
	// Recibe un array["nombre_parametro"] = valor con los parametros a actualizar o null para actualizar todas las propiedades de la clase.
	//
	public function Actualizar ($campos = null) {
		global $conn;
		
		if ($campos != null) {
			$this->ActualizarPropiedades ($campos);
		} 

		$asig = $this->GetInfoCamposActualizar ($campos);
		$conn->Execute ("UPDATE Modulo SET $asig WHERE iModuloId = $this->id");
	}
}
?>
