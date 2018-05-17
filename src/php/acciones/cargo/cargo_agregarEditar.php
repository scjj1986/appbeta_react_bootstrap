<?
header('Access-Control-Allow-Origin: *');
include("../../clases/cargo.php");
$cargo = new cargo();
$cargo->cargarDatos($_POST["id"],$_POST["idDepto"],$_POST["codigo"],strtoupper($_POST["nombre"]),$_POST["sueldo"]);
echo json_encode($cargo->agregarEditar());
?>