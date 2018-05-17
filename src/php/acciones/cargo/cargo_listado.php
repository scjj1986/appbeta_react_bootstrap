<?
header('Access-Control-Allow-Origin: *');
include("../../clases/cargo.php");
$cargo = new cargo();
echo json_encode($cargo->listado());
?>