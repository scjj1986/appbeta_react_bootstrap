<?
include("base-de-datos.php");
class login{
	
	public $bd,$usuario,$contrasena,$respuestaJson;

	function __construct($_usuario,$_contrasena) {
        $this->bd = new baseDeDatos();
        $this->usuario = $_usuario;
        $this->contrasena = $_contrasena;
        $this->respuestaJson = array();
    }


    public function buscarUsuario(){
        $this->bd->cadenaConsulta="CALL pa_loginBuscarUsuario ('".$this->usuario."','".$this->contrasena."')";
        return !($this->bd->consultaVacia());
    }

    public function usuarioInactivo(){
        $this->bd->cadenaConsulta="CALL pa_loginUsuarioInactivo ('".$this->usuario."','".$this->contrasena."')";
        return !($this->bd->consultaVacia());
    }


    public function autenticar(){

        if(!$this->buscarUsuario())
			$this->respuestaJson[] = array('estatusConsulta'=> -1);
		else if($this->usuarioInactivo())
			$this->respuestaJson[] = array('estatusConsulta'=> -2);
		else{
			$this->bd->conectar();
	    	$this->bd->cadenaConsulta="CALL pa_loginBuscarUsuario ('".$this->usuario."','".$this->contrasena."')";
	    	$this->bd->consulta();
	    	$resultado=$this->bd->registrosConsulta();
	    	$this->respuestaJson[] = array('estatusConsulta'=> 1,
                                           'nombre'=> $resultado["nombre"]." ".$resultado["apellido"],
                                           'perfil'=> $resultado["perfil"],
                                           'login'=> $resultado["login"]);
	    	$this->bd->desconectar();
		}
        return $this->respuestaJson;
    }
}

?>