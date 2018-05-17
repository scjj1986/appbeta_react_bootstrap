<?
header('Access-Control-Allow-Origin: *');
include("../../clases/departamento.php");
$departamento = new departamento();
$departamento->cargarDatos($_POST["id"],$_POST["codigo"],strtoupper($_POST["nombre"]));
echo json_encode($departamento->agregarEditar());
?>