<?
header('Access-Control-Allow-Origin: *');
include("../../clases/empleado.php");
$empleado = new empleado();
echo json_encode($empleado->generarNrFicha());
?>