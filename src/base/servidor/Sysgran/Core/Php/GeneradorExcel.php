<?
require_once ('template.php');
require_once ('Sysgran/Aplicacion/Entidades/Core/Core.php');
require_once ('html2pdf.class.php');

class GeneradorListadoHtml {
	const ListadoExcel = 1;
	const ListadoPdf = 2;
	
	public $Store;
	public $Titulo;
	public $Columnas;
	public $AnchoColumnas;
	public $Tipo;
	
	public function GeneradorListadoHtml () {
		$this->Store = null;
		$this->Titulo = '';
		$this->Columnas = array ();
	}
	
	public function GetHtml () {
		$this->Store->SetearValorFiltros ($_GET);	
		
		if ($this->Tipo == GeneradorListadoHtml::ListadoExcel) {
			$atrib_tabla = "border='1'";

		} else {
			$atrib_tabla = "border='0.5' cellpadding='0' cellspacing='0'";			
		}
		
		$f = Core::GetFechaYHoraActual ();
		$der_txt = 'Fecha y Hora: ' .  $f['fecha'] . ' ' . $f['hora'] . ':' . $f['minutos'];
		
		$data = "
		<font face='arial' size='4'>
		<table width='100%' border='0' cellpadding='1' cellspacing='1'>
			<tr>
				<td height='10' colspan='2'></td>
			</tr>
			<tr>
				<td align='left'><b>" . Core::GetNombreEmpresa () . "</b></td>
				<td align='right'>" . $der_txt . "</td>
			</tr>	
			<tr>
				<td colspan='2' height='10'></td>
			</tr>
			<tr>
				<td align='center' colspan='2'><b>" . $this->Titulo . "</b></td>
			</tr>
			<tr>
				<td height='10' colspan='2'></td>
			</tr>
			<tr>
				<td align='center' colspan='2'>
					<table width='50%' $atrib_tabla>
						<tr>";

				foreach ($this->Columnas as $nombre => $campo) {
					$data .= "<td bgcolor='#e1e1e1' align='center'><b>$nombre</b></td>\n";
				}

				$data .="</tr>";

				$x = $this->Store->Ejecutar ();

				foreach ($x as $item) {
					$data .= "<tr>\n";
					$i = 0;

					foreach ($this->Columnas as $nombre => $campo) {
						if (is_bool ($item[$campo])) {
							if ($item[$campo]) {
								$val = 'Si';
								
							} else {
								$val = 'No';
							}					
							$data .= "<td width='" . $this->AnchoColumnas[$i++] . "' align='right'>" . $val . "</td>\n";
							
						} else {
							$data .= "<td width='" . $this->AnchoColumnas[$i++] . "' align='right'>" . $item[$campo]. "</td>\n";
						}
					}

					$data .= "</tr>\n";
				}

				$data .= "
					</table>
				</td>
			</tr>
		</table>
		</font>";

		return $data;
	}
}

class GeneradorListadoPdf {
	public $NombreArchivo;
	public $Store;
	public $Titulo;
	public $Columnas;	
	public $AnchoColumnas;

	public function GeneradorListadoPdf () {
		$this->NombreArchivo = 'listado.pdf';
		$this->Store = null;
		$this->Titulo = '';
		$this->Columnas = array ();
	}
	
	public function Ejecutar () {
		header("Content-Type: application/octet-stream");
		header("Content-Disposition: attachment; filename=" . urlencode($this->NombreArchivo . '.pdf'));   

		try {
			$html2pdf = new HTML2PDF('P', 'A4', 'es', true, 'UTF-8', array(15, 5, 15, 5));
			$html2pdf->pdf->SetDisplayMode('fullpage');
			$html2pdf->writeHTML($this->GetHtml (), isset($_GET['vuehtml']));
			$html2pdf->Output($this->NombreArchivo . '.pdf');

		} catch(HTML2PDF_exception $e) {
			echo $e;
			exit;
		}
	}
	
	private function GetHtml () {
		$this->Store->SetearValorFiltros ($_GET);	
		
		if ($this->Tipo == GeneradorListadoHtml::ListadoExcel) {
			$atrib_tabla = "border='1'";

		} else {
			$atrib_tabla = "border='0.5' cellpadding='0' cellspacing='0'";			
		}
		
		$f = Core::GetFechaYHoraActual ();
		$der_txt = 'Fecha y Hora: ' . $f['fecha'] . ' ' . $f['hora'] . ':' . $f['minutos'];
	
		$data = "
		<page backtop='10mm' backbottom='20mm' backleft='0mm' backright='20mm'>
			<page_header>
				<table style=\"width: 100%;\" border='0'>
					<tr>
						<td style=\"text-align: left;     width: 340\">" . Core::GetNombreEmpresa () . "</td>
						<td style=\"text-align: right;    width: 340\">" . $der_txt . "</td>
						<td style=\"text-align: right;    width: 30\"></td>
					</tr>
				</table>
			</page_header>
			<page_footer>
				<table style=\"width: 100%;\" border='0'>
					<tr>
						<td style=\"text-align: right;    width: 680\">Hoja: [[page_cu]]/[[page_nb]]</td>
						<td style=\"text-align: right;    width: 30\"></td>
					</tr>
				</table>
			</page_footer>

			<span style=\"font-size: 14px; font-weight: bold\">" . $this->Titulo . "</span>
			<br>
			<br>
			<font face='arial' size='4'>
			<table style=\"width: 100%;border: solid 1px; border-collapse: collapse\" align=\"center\">
				<thead>
					<tr>";
		$col = 0;
		foreach ($this->Columnas as $nombre => $campo) {
			$data .= "<th style=\"width: " .  $this->AnchoColumnas[$i++] . "; text-align: center; border: solid 1px; background:#e1e1e1\">$nombre</th>";
		}
		
		$data .= "	</tr>
				</thead>
				<tbody>";
				
		$x = $this->Store->Ejecutar ();
		$nro_linea = 1;
		foreach ($x as $item) {
			$data .= "<tr>\n";
			$i = 0;

			foreach ($this->Columnas as $nombre => $campo) {
				if (is_bool ($item[$campo])) {
					if ($item[$campo]) {
						$val = 'Si';
					} else {
						$val = 'No';
					}
					
					$data .= "<td style=\"width: " . $this->AnchoColumnas[$i++] . "; text-align: left; border: solid 1px\">" . $val. "</td>\n";
					
				} else {
					$data .= "<td style=\"width: " . $this->AnchoColumnas[$i++] . "; text-align: left; border: solid 1px\">" . $item[$campo]. "</td>\n";
				}
			}

			$data .= "</tr>\n";
		}
		
		$data .= "
				</tbody>
			</table>
			</font>
		</page>";

		return $data;	
	}
}

class GeneradorListadoExcel {
	public $NombreArchivo;
	public $Store;
	public $Titulo;
	public $Columnas;	
	public $AnchoColumnas;
	
	public function GeneradorListadoExcel () {
		$this->NombreArchivo = 'listado.xls';
		$this->Store = null;
		$this->Titulo = '';
		$this->Columnas = array ();
	}
	
	public function Ejecutar () {
		$h = new GeneradorListadoHtml ();
		$h->Store = $this->Store;
		$h->Titulo = $this->Titulo;
		$h->Columnas = $this->Columnas;
		$h->AnchoColumnas = $this->AnchoColumnas;
		$h->Tipo = GeneradorListadoHtml::ListadoExcel;
	
		header('Content-type: application/excel');
		header('Content-Disposition: attachment; filename='. $this->NombreArchivo . '.xls');
		
		return $h->GetHtml ();
	}
}
?>