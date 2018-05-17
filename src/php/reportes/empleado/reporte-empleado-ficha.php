<?
include("../../clases/pdf.php");
include("../../clases/empleado.php");
$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage();

$empleado = new empleado();
$empleado->cargarDatosPorIdReporte($_GET["id"]);

//-------------- Barra después del encabezado ---------------//
$pdf->SetXY(6,35);
$pdf->SetFillColor(232,232,232);
$pdf->SetFont('Arial','B',13);
$pdf->Cell(196,8,'DATOS',1,1,'C',3);
//-----------------------------------------------------------//



//--------------------- Línea 1 ---------------------------//
$pdf->SetXY(6,43);
$pdf->SetFont('Arial','B',10); 
$pdf->Cell(35,7," Nr. de Ficha: ",1,0,'L');
$pdf->SetFont('Arial','',10);
$pdf->SetXY(29,44);
$pdf->Cell(35,5,$empleado->id,0,0,'L');

$pdf->SetXY(41,43);
$pdf->SetFont('Arial','B',10); 
$pdf->Cell(60,7," Doc. Identidad: ",1,0,'L');
$pdf->SetFont('Arial','',10);
$pdf->SetXY(69,44);
$pdf->Cell(60,5,$empleado->tDoc."-".$empleado->nDoc,0,0,'L');


$pdf->SetXY(101,43);
$pdf->SetFont('Arial','B',10); 
$pdf->Cell(101,7," Nombres: ",1,0,'L');
$pdf->SetFont('Arial','',10);
$pdf->SetXY(120,44);
$pdf->Cell(101,5,utf8_decode($empleado->nombre),0,0,'L');

//----------------------- Línea 2 ----------------------------//
$pdf->SetXY(6,50);
$pdf->SetFont('Arial','B',10); 
$pdf->Cell(115,7," Apellidos: ",1,0,'L');
$pdf->SetFont('Arial','',10);
$pdf->SetXY(26,51);
$pdf->Cell(115,5,utf8_decode($empleado->apellido),0,0,'L');

$pdf->SetXY(121,50);
$pdf->SetFont('Arial','B',10); 
$pdf->Cell(81,7," Fecha de Nacimiento: ",1,0,'L');
$pdf->SetFont('Arial','',10);
$pdf->SetXY(160,51);
$pdf->Cell(81,5,date("d-m-Y", strtotime($empleado->fNac)),0,0,'L');

//----------------------- Línea 3 ----------------------------//
$pdf->SetXY(6,57);
$pdf->SetFont('Arial','B',10); 
$pdf->Cell(162,7," Lugar de Nacimiento: ",1,0,'L');
$pdf->SetFont('Arial','',10);
$pdf->SetXY(45,58);
$pdf->Cell(162,5,utf8_decode($empleado->lugarNac),0,0,'L');

$pdf->SetXY(168,57);
$pdf->SetFont('Arial','B',10); 
$pdf->Cell(34,7," Sexo: ",1,0,'L');
$pdf->SetFont('Arial','',10);
$pdf->SetXY(180,58);
$pdf->Cell(41,5,$empleado->sexo=="M"?"Masculino":"Femenino",0,0,'L');

//----------------------- Línea 4 ----------------------------//
$pdf->SetXY(6,64);
$pdf->SetFont('Arial','B',10); 
$pdf->Cell(196,7,utf8_decode(" Dirección: "),1,0,'L');
$pdf->SetFont('Arial','',10);
$pdf->SetXY(26,65);
$pdf->Cell(196,5,utf8_decode($empleado->direccion),0,0,'L');

//----------------------- Línea 5 ----------------------------//
$pdf->SetXY(6,71);
$pdf->SetFont('Arial','B',10); 
$pdf->Cell(55,7,utf8_decode(" Teléfono: "),1,0,'L');
$pdf->SetFont('Arial','',10);
$pdf->SetXY(25,72);
$pdf->Cell(55,5,$empleado->telefono,0,0,'L');

$pdf->SetXY(61,71);
$pdf->SetFont('Arial','B',10); 
$pdf->Cell(20,7," Hijos: ",1,0,'L');
$pdf->SetFont('Arial','',10);
$pdf->SetXY(73,72);
$pdf->Cell(20,5,$empleado->hijos,0,0,'L');

$pdf->SetXY(81,71);
$pdf->SetFont('Arial','B',10); 
$pdf->Cell(25,7," Nr. Hijos: ",1,0,'L');
$pdf->SetFont('Arial','',10);
$pdf->SetXY(99,72);
$pdf->Cell(25,5,$empleado->nHijos==0?"N/A":$empleado->nHijos,0,0,'L');

$pdf->SetXY(106,71);
$pdf->SetFont('Arial','B',10); 
$pdf->Cell(34,7," Talla Camisa: ",1,0,'L');
$pdf->SetFont('Arial','',10);
$pdf->SetXY(131,72);
$pdf->Cell(34,5,$empleado->tallaCamisa,0,0,'L');

$pdf->SetXY(140,71);
$pdf->SetFont('Arial','B',10); 
$pdf->Cell(62,7,utf8_decode(" Talla Pantalón: "),1,0,'L');
$pdf->SetFont('Arial','',10);
$pdf->SetXY(168,72);
$pdf->Cell(62,5,$empleado->tallaPantalon,0,0,'L');

//----------------------- Línea 6 ----------------------------//
$pdf->SetXY(6,78);
$pdf->SetFont('Arial','B',10); 
$pdf->Cell(35,7,utf8_decode(" Talla Zapato: "),1,0,'L');
$pdf->SetFont('Arial','',10);
$pdf->SetXY(30,79);
$pdf->Cell(35,5,$empleado->tallaZapato,0,0,'L');

$pdf->SetXY(41,78);
$pdf->SetFont('Arial','B',10); 
$pdf->Cell(40,7,utf8_decode(" Estatura (Mts.): "),1,0,'L');
$pdf->SetFont('Arial','',10);
$pdf->SetXY(69,79);
$pdf->Cell(40,5,$empleado->estatura,0,0,'L');

$pdf->SetXY(81,78);
$pdf->SetFont('Arial','B',10); 
$pdf->Cell(121,7,utf8_decode(" Departamento: "),1,0,'L');
$pdf->SetFont('Arial','',10);
$pdf->SetXY(109,79);
$pdf->Cell(121,5,$empleado->nombreDepto,0,0,'L');

//----------------------- Línea 6 ----------------------------//
$pdf->SetXY(6,85);
$pdf->SetFont('Arial','B',10); 
$pdf->Cell(134,7,utf8_decode(" Cargo: "),1,0,'L');
$pdf->SetFont('Arial','',10);
$pdf->SetXY(20,86);
$pdf->Cell(134,5,utf8_decode($empleado->nombreCargo),0,0,'L');

$pdf->SetXY(140,85);
$pdf->SetFont('Arial','B',10); 
$pdf->Cell(62,7," Activo: ",1,0,'L');
$pdf->SetFont('Arial','',10);
$pdf->SetXY(154,86);
$pdf->Cell(62,5,$empleado->activo==1?"SI":"NO",0,0,'L');
//------------------------------------------------------------//



$pdf->Output();

?>