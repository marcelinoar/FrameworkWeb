<?
/**************************************************************************************************
 * ------------------------------- ARCHIVO GENERADO AUTOMATICAMENTE -------------------------------
 * Archivo: MedicionDeAtributo.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: ABM de Tipos de producto
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ('Sysgran/Core/Php/EntidadBase.php');

class MedicionDeAtributo extends EntidadBase {
	public $id;
	public $ordenDeTrabajoId;
	public $atributoProductoId;
	public $timestamp;
	public $comentario;
	public $usuarioId;
	public $valorMedido;

	public function MedicionDeAtributo ($id = null) {
		$this->id = $id;
	}

	//---------- Metodos estaticos ----------
	
	public static function GetMedicionDeAtributosPorOT ($id) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT mp.*, ap.cNombre AS nom_atrib, vap.fValor AS valor_teorico, um.cCodigo AS cod_um, TO_CHAR(mp.dTimestamp, 'DD/MM/YYYY HH24:MI:SS') AS timestamp
								FROM MedicionDeParametroOT mp
								LEFT OUTER JOIN OrdenDeTrabajo ot ON ot.iOrdenDeTrabajoId = mp.iOrdenDeTrabajoId
								LEFT OUTER JOIN AtributoProducto ap ON ap.iAtributoProductoId = mp.iAtributoProductoId
								LEFT OUTER JOIN ValorAtributoProducto vap ON (vap.iAtributoProductoId = mp.iAtributoProductoId AND vap.iProductoId = ot.iProductoId)
								LEFT OUTER JOIN UnidadDeMedida um ON um.iUnidadDeMedidaId = ap.iUnidadDeMedidaId
								WHERE 
									mp.iOrdenDeTrabajoId = $id
								ORDER BY iMedicionDeParametroOTId ASC");
		
		$ret = array ();
		while (!$rs->Eof ()) {
			$item = new MedicionDeAtributo ();
			$item->id 					= $rs->Fields ('iMedicionDeParametroOTId');
			$item->ordenDeTrabajoId 	= $rs->Fields ('iOrdenDeTrabajoId');
			$item->atributoProductoId 	= $rs->Fields ('iAtributoProductoId');
			$item->timestamp 			= $rs->Fields ('timestamp');
			$item->comentario			= $rs->Fields ('cComentario');
			$item->usuarioId			= $rs->Fields ('iUsuarioId');
			$item->valorMedido			= DB::FromFloat ($rs->Fields ("fValorMedido"));
			$item->nombreAtributo		= $rs->Fields ("nom_atrib");
			$item->valorTeorico			= DB::FromFloat ($rs->Fields ("valor_teorico"));
			$item->codigoUnidadDeMedida	= $rs->Fields ("cod_um");
			
			$ret[] = $item;

			$rs->Next ();
		}
		
		$rs->Close ();
		
		return $ret;
	}
	
	//---------- crud ----------
	
	public function Leer () {
		global $conn;
		
		try {
			$rs = $conn->Retrieve ("SELECT mp.*, TO_CHAR(mp.dTimestamp, 'DD/MM/YYYY HH24:MI:SS') AS timestamp, u.cLoginName 
									FROM MedicionDeParametroOT mp 
									LEFT OUTER JOIN Usuario u ON u.iUsuarioId = mp.iUsuarioId
									WHERE 
										iMedicionDeParametroOTId = $this->id");
			
			if ($rs->Eof ()) {
				$this->Error ("EntidadInexistente", ENTIDAD_INEXISTENTE);
			}
			
			$this->ordenDeTrabajoId 	= $rs->Fields ("iOrdenDeTrabajoId");
			$this->atributoProductoId	= $rs->Fields ("iAtributoProductoId");
			$this->timestamp 			= $rs->Fields ("timestamp");
			$this->comentario			= $rs->Fields ("cComentario");
			$this->usuarioId			= $rs->Fields ("usuarioId");
			$this->valorMedido			= DB::FromFloat ($rs->Fields ("fValorMedido"));
			$this->loginName			= $rs->Fields ('cLoginName');

			$rs->Close ();
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
	
	public function Crear () {
		global $conn;
		
		try {
			$conn->Execute ("INSERT INTO MedicionDeParametroOT (
				  iMedicionDeParametroOTId
				, iOrdenDeTrabajoId
				, iAtributoProductoId
				, iUsuarioId
				, dTimestamp
				, cComentario
				, fValorMedido
			) VALUES (
				nextval ('seq_med_param_ot_id')
				, $this->ordenDeTrabajoId
				, $this->atributoProductoId
				, " . Sesion::GetSesion ()->usuarioId . "
				, CURRENT_TIMESTAMP
				, '$this->comentario'
				, " . DB::ToFloat ($this->valorMedido) . "
			)");
		
			$this->id = $conn->GetSecuenceLastId ('seq_med_param_ot_id');
			return null;
			
		} catch (Exception $ex) {
			return new RetValue ($ex->getMessage ());
		}
	}
}
?>
