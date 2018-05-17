<?
header('Access-Control-Allow-Origin: *');
include("../../clases/empleado.php");
/*var_dump($_POST);
exit;*/
$empleado = new empleado();
$empleado->cargarCampos($_POST["id"],$_POST["idCargo"],$_POST["tDoc"],$_POST["nDoc"],strtoupper($_POST["nombre"]),strtoupper($_POST["apellido"]),$_POST["fNac"],strtoupper($_POST["lugarNac"]),strtoupper($_POST["direccion"]),$_POST["telefono"],$_POST["hijos"],$_POST["nHijos"],$_POST["tallaCamisa"],$_POST["tallaPantalon"],$_POST["tallaZapato"],$_POST["estatura"],$_POST["activo"],$_POST["sexo"]);
echo json_encode($empleado->agregarEditar());
?>