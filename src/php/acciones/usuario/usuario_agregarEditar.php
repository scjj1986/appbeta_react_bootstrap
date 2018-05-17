<?php
header('Access-Control-Allow-Origin: *');
include("../../clases/usuario.php");

/*var_dump($_POST);
exit();
*/



$usuario = new usuario();
$usuario->cargarCampos($_POST['id'],
					   $_POST['tDoc'],
					   $_POST['nDoc'],
					   strtoupper($_POST['nombre']),
					   strtoupper($_POST['apellido']),
					   strtoupper($_POST['login']),
					   $_POST['clave'],
					   $_POST['pregunta'],
					   $_POST['respuesta'],
					   $_POST['perfil'],
					   $_POST['activo'],
					   strtoupper($_POST['direccion']),
					   $_POST['telefono']);
echo json_encode($usuario->agregarEditar());
  
?>