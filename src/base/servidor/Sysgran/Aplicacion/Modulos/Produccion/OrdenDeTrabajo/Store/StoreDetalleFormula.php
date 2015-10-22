<?
/**************************************************************************************************
 * Archivo: StoreDetalleFormula.php
 * ------------------------------------------------------------------------------------------------
 * Version: 1.0
 * Descripcion: Este es un store extremadamente custom que trae los datos de la grilla de detalles
 *				de formula del ABM de OT
 * Modificaciones:
 *	-
 *
 * Nota: Registrar en este encabezado todas las modificaciones hechas al archivo.
 **************************************************************************************************/

require_once ('template.php');
require_once ('Sysgran/Core/Red/Encoder.php');

class StoreDetalleFormula {
	private $FormulaId;
	private $ListaProductos;
	private $Cantidad;
	
	public function StoreDetalleFormula ($formulaId, $cantidad) {
		$this->FormulaId = $formulaId;
		$this->ListaProductos = array ();
		$this->Cantidad = $cantidad;
	}

	public function Ejecutar () {
		$this->RecorrerFormula ($this->FormulaId, $this->Cantidad);
	
		return $this->ListaProductos;
	}
	
	private function RecorrerFormula ($formula_id, $cantidad) {
		$lista = $this->GetDetalleFormula ($formula_id);

		foreach ($lista as $item) {
			if ($item['formulaId'] != null) {
				$this->RecorrerFormula ($item['formulaId'], $item['cantidad'] * $cantidad);	

			} else {
				$this->AgregarProducto ($item, $cantidad);
			}
		}
	}
	
	private function AgregarProducto ($item, $cantidad) {
		$item['cantidad'] = $item['cantidad'] * $cantidad;
		$this->ListaProductos[] = $item;
	}
	
	private function GetDetalleFormula ($formula_id) {
		global $conn;
		
		$rs = $conn->Retrieve ("SELECT d.iUnidadDeMedidaId, d.iProductoUsadoId, d.iFormulaUsadaId, d.fCantidadUtilizada, p.cCodigo AS cod_prod, 
								p.cDescripcionCorta AS desc_prod, u.cCodigo AS cod_um
								FROM DetFormulaDeProduccion d
								LEFT OUTER JOIN Producto p ON p.iProductoId = d.iProductoUsadoId 
								LEFT OUTER JOIN UnidadDeMedida u ON d.iUnidadDeMedidaId = u.iUnidadDeMedidaId
								WHERE 
									iFormulaDeProduccionId = $formula_id");
		
		$ret = array ();
		while (!$rs->Eof ()) {
			$item['unidadDeMedidaId'] 		= $rs->Fields ("iUnidadDeMedidaId");
			$item['productoId'] 			= $rs->Fields ("iProductoUsadoId");
			$item['formulaId'] 				= $rs->Fields ("iFormulaUsadaId");
			$item['cantidad'] 				= DB::FromFloat ($rs->Fields ("fCantidadUtilizada"));
			$item['cantidadUnitaria'] 		= DB::FromFloat ($rs->Fields ("fCantidadUtilizada"));
			$item['codigoProducto']			= $rs->Fields ("cod_prod");
			$item['descripcionProducto']	= $rs->Fields ("desc_prod");
			$item['codigoUnidadDeMedida']	= $rs->Fields ("cod_um");
			
			$ret[] = $item;
			$rs->Next ();
		}
		
		$rs->Close ();
		
		return $ret;
	}
}
?>