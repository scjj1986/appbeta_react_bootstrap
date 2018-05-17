<?
header('Access-Control-Allow-Origin: *');
include("../../clases/recuperar-contrasena.php");
$rc = new recuperarContrasena();
echo json_encode($rc->buscarUsuarioPorLogin(strtoupper($_POST["login"])));
?>