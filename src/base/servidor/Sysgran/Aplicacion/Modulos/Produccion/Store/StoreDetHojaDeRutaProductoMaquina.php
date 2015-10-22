<?
/**************************************************************************************************
 * Archivo: StoreDetHojaDeRutaProductoMaquina.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion:
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

class StoreDetHojaDeRutaProductoMaquina extends StoreBase {
	function StoreDetHojaDeRutaProductoMaquina ($paginado = false) {
		parent::__construct($paginado); 

		$this->AgregarParametro (new ParametroFiltro ("fHojaDeRuta", "dh.iHojaDeRutaId"));
		
		$this->Query = "SELECT o.iOperacionId, dh.iHojaDeRutaId, m.iMaquinaId, m.cCodigo AS codigo_maquina, o.iOperacionId, o.cCodigo AS codigo_operacion
						FROM Maquina m, Operacion o, MaquinaOperacion mo, DetHojaDeRuta dh
						WHERE
							m.iMaquinaId = mo.iMaquinaId AND
							o.iOperacionId = mo.iOperacionId AND
							dh.iOperacionId = o.iOperacionId";
	}
	
	function CargarItem ($rs) {
		$ret['operacionId']			= $rs->Fields ("iOperacionId");
		$ret['hojaDeRutaId']		= $rs->Fields ("iHojaDeRutaId");
		$ret['maquinaId']			= $rs->Fields ("iMaquinaId");
		$ret['tiempoTrabajo'] 		= 0;
		$ret['tiempoPreparacion']	= 0;
		$ret['cntOperTrabajo']		= 0;
		$ret['cntOperPreparacion']	= 0;
		$ret['kgDeMerma']			= 0;
		$ret['kgDeRecorte']			= 0;
		$ret['codigoOperacion']		= $rs->Fields ("codigo_operacion");
		$ret['codigoMaquina']		= $rs->Fields ("codigo_maquina");
		$ret['maquinaId']			= $rs->Fields ('iMaquinaId');
		$ret['operacionId']			= $rs->Fields ("iOperacionId");

		return $ret;
	}
}