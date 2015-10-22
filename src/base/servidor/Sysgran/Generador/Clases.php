<?
require_once ("Definiciones.php");

class Modulo {
	var $RutaArchivos;					// /des/www/Sistema
	var $Nombre;						// Nombre del Grupo de programas. Ejemplo: Sistema, Desarrollo, TAblas, etc.
	var $Ruta;							// Ruta en Ext sin contar el nombre del modulo. Sistema.view
	
	public function Modulo ($id = null) {
		global $conn;
		
		if ($id != null) {
			$rs = $conn->Retrieve ("SELECT * FROM Modulo WHERE iModuloId = $id");
			$this->RutaArchivos = $rs->Fields ("cRutaArchivos");
			$this->Nombre		= $rs->Fields ("cNombre");
			$this->Ruta			= $rs->Fields ("cRuta");
			$rs->Close ();
		}
	}
}

class Listado {
	var $Campos = array ();				// Array de CampoListado.
	var $Tipo;							// TLIST
	
	public function Listado ($id = null) {
		global $conn;
		
		if ($id != null) {
			$rs = $conn->Retrieve ("SELECT * 
									FROM Listado, CampoListado 
									WHERE 
										Listado.iListadoId = $id AND
										Listado.iListadoId = CampoListado.iListadoId");

			$this->Tipo = $rs->Fields ("iTipoListadoId");
			while (!$rs->Eof ()) {
				$c = new CampoListado ();
				$c->Tipo 			= $rs->Fields ("iTipoCampoId");
				$c->Nombre 			= $rs->Fields ("cNombre");
				$c->Etiqueta 		= $rs->Fields ("cEtiqueta");
				$c->EsFlex			= DB::FromBoolean ($rs->Fields ("bEsFlex"));
				$c->EsSubCampo		= DB::FromBoolean ($rs->Fields ("bEsSubCampo"));
				$c->NombreSubCampo	= $rs->Fields ("cNombreSubCampo");
				$c->AnchoColumna 	= $rs->Fields ("cAnchoColumna");
				$this->Campos[] = $c;

				$rs->Next ();
			}

			$rs->Close ();
		}
	}
}

class CampoListado {
	var $Tipo;							// TCAMPO
	var $Nombre;
	var $Etiqueta;
	var $EsFlex;
	var $EsSubCampo;
	var $NombreSubCampo;
	var $AnchoColumna;
}

class FormularioBase {
	var $Campos = array ();				// Array de campos del fomulario.
	var $Tipo;							// TFORM: Maestro o Maestro-Detalle
	
	public function GetCantCamposDetalleVisibles () {
		$cnt = 0;
		
		foreach ($this->Campos as $item) {
			if ($item->EsVisible) {
				$cnt++;
			}
		}
		
		return $cnt;
	}
	
	//
	// Devuelve un string de busqueda que permite identificar al elemento que tiene auto-foco.
	//
	public function GetCampoFoco () {
		$ret = null;
		
		foreach ($this->Campos as $item) {
			if ($item->EsAutoFoco) {
				$ret = $item->GetNombreTipo () . "[name='" . $item->GetNombreComponente () . "']";
			}
		}
		
		return $ret;
	}
	
	//
	// Devuelve el campo correspondiente al nombre pasado por parametro.
	//
	public function GetCampoPorNombre ($nombre) {
		$ret = null;
		
		foreach ($this->Campos as $item) {
			if ($item->Nombre == $nombre) {
				$ret = $item;
			}
		}
		
		return $ret;
	}
	
	public function CalcularAnchoVentana () {
		if ($this->Tipo == TFORM_ABM_MAESTRO_DETALLE) {
			return 900;
		
		} else {
			return 500;
		}
	}
	
	public function CalcularAltoVentana () {
		$tam = 100;	// Barra de botones
		
		foreach ($this->Campos as $item) {
			if ($item->Tipo == TCAMPO_DESCRIPCION) {
				$tam += 70;
			
			} else {
				$tam += 30;
			}
		}
	
		if ($this->Tipo == TFORM_ABM_MAESTRO_DETALLE) {
			$tam += 240;
		} 
			
		return $tam;
	}
}

class FormularioDetalle extends FormularioBase {
	public function FormularioDetalle ($id = null) {
		global $conn;
		
		if ($id != null) {
			$rs = $conn->Retrieve ("SELECT iCampoFormularioId FROM CampoFormularioDetalle WHERE iFormularioDetalleId = $id");

			while (!$rs->Eof ()) {
				$this->Campos[] = new CampoFormulario ($rs->Fields ("iCampoFormularioId"));
				$rs->Next ();
			}

			$rs->Close ();
		}
	}
}

class FormularioMaestro extends FormularioBase {
	var $Id;							// Id del modulo.
	var $Modulo;						// Referencia a Modulo.
	var $Listado;						// Referencia a Listado.
	var $Campos = array ();				// Array de CampoFormulario.
	var $Detalles = array ();			// Array de DetalleFormulario.
	var $Descripcion;					// Descripcion que va a quedar en el comentario del codigo fuente.
	var $NombreEntidad;					// Nombre de la entidad.
	var $NombreEntidadPermisos;			// Codigo de permiso de la entidad Ej: Sistema:Usuario
	var $PrefijoXtype;
	var $NombreSecuencia;
	
	public function LeerPorNombre ($nombre) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT * FROM FormularioMaestro WHERE cNombreEntidad = '$nombre'");

		$this->Id = $rs->Fields ("iFormularioMaestroId");
		$this->Modulo = new Modulo ($rs->Fields ("iModuloId"));
		$this->Tipo = $rs->Fields ("iTipoFormularioId");
		$this->Listado = new Listado ($rs->Fields ("iListadoId"));
		$this->Descripcion = $rs->Fields ("cDescripcion");
		$this->NombreEntidad = $rs->Fields ("cNombreEntidad");
		$this->PrefijoXtype = $rs->Fields ("cPrefijoXtype");
		$this->NombreSecuencia = $rs->Fields ("cNombreSecuencia");
		$this->NombreEntidadPermisos = $rs->Fields ("cNombreEntidadPermisos");

		$rs->Close ();
		
		$rs = $conn->Retrieve ("SELECT cf.*
								FROM CampoFormulario cf, CampoFormularioMaestro cfm
								WHERE
									cf.iCampoFormularioId = cfm.iCampoFormularioId AND
									cfm.iFormularioMaestroId = $this->Id");

		while (!$rs->Eof ()) {
			$this->Campos[] = new CampoFormulario ($rs->Fields  ("iCampoFormularioId"));
			$rs->Next ();
		}

		$rs->Close ();

		$rs = $conn->Retrieve ("SELECT iDetalleFormularioId FROM DetalleFormulario WHERE iFormularioMaestroId = $this->Id");
		while (!$rs->Eof ()) {
			$this->Detalles[] = new DetalleFormulario ($rs->Fields ("iDetalleFormularioId"));
			$rs->Next ();
		}

		$rs->Close ();

		return true;
	}
}

class DetalleFormulario {
	var $Listado;						// Listado.
	var $Tipo;							// TDET 
	var $Formulario;					// FormularioDetalle, puede ser null si el tipo es NxM
	var $Etiqueta;						// Nombre del Tab.
	var $PrefijoXtype;					// Prefijo Xtype que se agrega.
	var $NombreEntidad;					// Nombre de la entidad detalle. Ej: UsuarioGrupo. El nombre de la subcarpeta. El nombre del sub modelo
	var $RutaEntidad;					// Nombre dle modulo al que pertenece la entidad. Osea donde esta el directorio model de esta entidad.
	var $ClaseEntidad;					// Nombre de la entidad relacionada con el maestro referenciada completamente. Ej: Sistema.model.Usuario.
	var $Descripcion;					// Descripcion del sub-modelo.
	var $NombreCampoFormulario;			// Nombre del campo en la entidad maestro que contiene la relacion.
	
	public function DetalleFormulario ($id = null) {
		global $conn;
		
		if ($id != null) {
			$rs = $conn->Retrieve ("SELECT * FROM DetalleFormulario WHERE iDetalleFormularioId = $id");
			if (!$rs->Eof ()) {
				$this->Listado 					= new Listado ($rs->Fields ("iListadoId"));
				$this->Tipo 					= $rs->Fields ("iTipoDetalleFormularioId");
				$this->FormularioDetalle		= null;

				if ($this->Tipo == TDET_ENTIDAD_DEBIL) {
					$this->Formulario = new FormularioDetalle ($rs->Fields ("iFormularioDetalleId"));
				}

				$this->PrefijoXtype 			= $rs->Fields ("cPrefijoXtype");
				$this->NombreEntidad			= $rs->Fields ("cNombreEntidad");
				$this->RutaEntidad				= $rs->Fields ("cRutaEntidad");
				$this->ClaseEntidad				= $rs->Fields ("cClaseEntidad");
				$this->Descripcion				= $rs->Fields ("cDescripcion");
				$this->NombreCampoFormulario	= $rs->Fields ("cNombreCampoFormulario");
				$this->Etiqueta					= $rs->Fields ("cEtiqueta");
			}

			$rs->Close ();
		}
	}
	
	public function getXtype ($prefijo) {
		return $prefijo . '-' . $this->PrefijoXtype;
	}
}

class CampoFormulario {
	var $Tipo;							// TCAMPO
	var $Nombre;
	var $EsNull;
	var $EsVisible;						// CampoCalculado, no se persiste, se saca en funcion del tipo de campo.
	var $Etiqueta;
	var $NombreCampoDb;
	var $DetalleCombo;					// Null o mas info si es combo.
	var $EsAutoFoco;					// Indica si este campo va a recibir el foco automaticamente al abrirse el formulario.
	
	public function CampoFormulario ($id = null) {
		global $conn;
		
		if ($id != null) {
			$rs = $conn->Retrieve ("SELECT * FROM CampoFormulario WHERE iCampoFormularioId = $id");

			$this->Tipo = $rs->Fields ("iTipoCampoId");
			$this->Nombre = $rs->Fields ("cNombre");
			$this->EsNull = DB::FromBoolean ($rs->Fields ("bEsNull"));
			$this->Etiqueta = $rs->Fields ("cEtiqueta");
			$this->NombreCampoDb = $rs->Fields ("cNombreCampoDb");
			$this->EsAutoFoco = DB::FromBoolean ($rs->Fields ("bEsAutoFoco"));

			if ($rs->Fields ("iDetalleComboId") != null) {
				$this->DetalleCombo = new DetalleCombo ($rs->Fields ("iDetalleComboId"));
			}
			
			$this->EsVisible = ($this->Tipo != TCAMPO_RELACION && $this->Tipo != TCAMPO_ID);
			$rs->Close ();
		}
	}
	
	public function GetNombreComponente () {
		if ($this->Tipo == TCAMPO_CHECKBOX) {
			$ret = "ck" . ucfirst ($this->Nombre);
		
		} else if ($this->Tipo == TCAMPO_COMBO) {
			$ret = "cb" . ucfirst ($this->Nombre);
			
		} else if ($this->Tipo == TCAMPO_RELACION) {				
			$ret = 'lst' . ucfirst ($this->Nombre);

		} else if ($this->EsVisible) {
			$ret = "tb" . ucfirst ($this->Nombre);
		} 
		
		return $ret;
	}	
	
	public function GetNombreTipo () {
		if ($this->Tipo == TCAMPO_CHECKBOX) {
			$ret = "checkbox";
		
		} else if ($this->Tipo == TCAMPO_COMBO) {
			$ret = "combo";
			
		} else if ($this->Tipo == TCAMPO_DESCRIPCION) {	
			$ret = "textareafield";
			
		} else if ($this->EsVisible) {
			$ret = "textfield";
		} 
		
		return $ret;
	}
}

class DetalleCombo {
	public $Store;						// Path completo (En extjs) a la entidad que hace de store del combo. Ej: 'Sistema.store.StoreMonedas'
	public $IdField;					// Nombre (de los datos que recibe por json) del campo que se usa para Id.
	public $DescField;					// Idem para la descripcion.
	
	public function DetalleCombo ($id = null) {
		global $conn;
		
		if ($id != null) {
			$rs = $conn->Retrieve ("SELECT * FROM DetalleCombo WHERE iDetalleComboId = $id");

			$this->Store = $rs->Fields ("cStore");
			$this->IdField = $rs->Fields ("cIdField");
			$this->DescField = $rs->Fields ("cDescField");
			$rs->Close ();
		}
	}
}

?>
