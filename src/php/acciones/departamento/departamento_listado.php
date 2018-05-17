<?
header('Access-Control-Allow-Origin: *');
include("../../clases/departamento.php");
$departamento = new departamento();
echo json_encode($departamento->listado());
?>