<?
include("base-de-datos.php");
class recuperarContrasena{

	public $bd,$respuestaJson;

	function __construct() {
		$this->bd = new baseDeDatos();
		$this->respuestaJson = array();
	}


	public function buscarUsuarioPorLogin($login){
		$this->bd->cadenaConsulta="CALL pa_recuperarContrasenaBuscarUsuarioPorLogin ('$login')";
		if ($this->bd->consultaVacia()){
			$this->respuestaJson[] = array('estatusConsulta'=> -1);
		}
		else{
			$this->bd->conectar();
	    	$this->bd->consulta();
	    	$resultado=$this->bd->registrosConsulta();
	    	$this->respuestaJson[] = array('estatusConsulta'=> 1,'pregunta'=> $resultado["pregunta"],'nombreCompleto'=> $resultado["nombre"]." ".$resultado["apellido"]);
	    	$this->bd->desconectar();
	    	echo $this->resultado;
		}
		return $this->respuestaJson;
		
	}

	public function verificarRespuesta($login,$respuesta){
		$this->bd->cadenaConsulta="CALL pa_recuperarContrasenaVerificarRespuesta ('$login','$respuesta')";
		if ($this->bd->consultaVacia())
			$this->respuestaJson[] = array('estatusConsulta'=> -1);
		else{
			$this->bd->conectar();
	    	$this->bd->consulta();
	    	$resultado=$this->bd->registrosConsulta();
	    	$this->respuestaJson[] = array('estatusConsulta'=> 1);
	    	$this->bd->desconectar();
		}
		return $this->respuestaJson;
	}

	public function cambiarClave($login,$clave){
		$this->bd->cadenaConsulta="CALL pa_recuperarContrasenaCambiarClave ('$login','$clave')";
		$this->bd->conectar();
	    $this->bd->consulta();
	    $this->respuestaJson[] = array('estatusConsulta'=> 1);
	    $this->bd->desconectar();
	    return $this->respuestaJson;
	}
}

?>