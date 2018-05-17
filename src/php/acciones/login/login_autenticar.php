<?
header('Access-Control-Allow-Origin: *');
include("../../clases/login.php");
$login = new login(strtoupper($_POST['login']),$clave=$_POST['clave']);
echo json_encode($login->autenticar());
?>
