<?
include("base-de-datos.php");
class usuario{
	public $bd,$id,$tDoc,$nDoc,$nombre,$apellido,$login,$clave,$pregunta,$respuesta,$perfil,$activo,$direccion,$telefono;

	function __construct(){
		$this->bd = new baseDeDatos();
        $this->respuestaJson = array();

	}

	public function cargarCampos($_id,$_tDoc,$_nDoc,$_nombre,$_apellido,$_login,$_clave,$_pregunta,$_respuesta,$_perfil,$_activo,$_direccion,$_telefono){
		$this->id=$_id;
		$this->tDoc=$_tDoc;
		$this->nDoc=$_nDoc;
		$this->nombre=$_nombre;
		$this->apellido=$_apellido;
		$this->login=$_login;
		$this->clave=$_clave;
		$this->pregunta=$_pregunta;
		$this->respuesta=$_respuesta;
		$this->perfil=$_perfil;
		$this->activo=$_activo;
		$this->direccion=$_direccion;
		$this->telefono=$_telefono;	
	}

	public function listado(){
		$this->bd->conectar();
	    $this->bd->cadenaConsulta="CALL pa_usuarioListado()";
	    $this->bd->consulta();
	    while($resultado=$this->bd->registrosConsulta()){
	    	$this->respuestaJson[] = array('id'=> $resultado["id"],
						'login'=> $resultado["login"],
						'nombre'=> $resultado["nombre"],
						'apellido'=>$resultado["apellido"],
						'perfil'=> $resultado["perfil"]);
		}
		$this->bd->desconectar();
		return $this->respuestaJson;
	}

	public function duplicadoDocumentoIdentidad(){
		$this->bd->cadenaConsulta="CALL pa_usuarioDuplicadoDocumentoIdentidad (".$this->id.",'".$this->tDoc."','".$this->nDoc."')";
        return !($this->bd->consultaVacia());
	}

	public function duplicadoLogin(){
		$this->bd->cadenaConsulta="CALL pa_usuarioDuplicadoLogin (".$this->id.",'".$this->login."')";
        return !($this->bd->consultaVacia());
	}

	public function buscarPorId($id){
		$this->bd->cadenaConsulta="CALL pa_usuarioBuscarPorId ($id)";
		if ($this->bd->consultaVacia())
			$this->respuestaJson[] = array('id'=> -1);
		else{
			$this->bd->conectar();
	    	$this->bd->consulta();
	    	$resultado=$this->bd->registrosConsulta();
	    	$this->respuestaJson[] = array('id'=> $id,
	    								   'tDoc'=> $resultado["tdoc"],
	    								   'nDoc'=> $resultado["ndoc"],
	    								   'nombre'=> $resultado["nombre"],
	    								   'apellido'=>$resultado["apellido"],
	    								   'login'=> $resultado["login"],
	    								   'clave'=> $resultado["clave"],
	    								   'pregunta'=> $resultado["pregunta"],
	    								   'respuesta'=> $resultado["respuesta"],
	    								   'perfil'=> $resultado["perfil"],
	    								   'activo'=> $resultado["activo"],
	    								   'direccion'=> $resultado["direccion"],
	    								   'telefono'=> $resultado["telefono"]);
	    	$this->bd->desconectar();
		}
		return $this->respuestaJson;
	}

	public function agregarEditar(){
		if ($this->duplicadoDocumentoIdentidad())
			$this->respuestaJson[] = array('estatusConsulta'=> -2);
		else if ($this->duplicadoLogin())
			$this->respuestaJson[] = array('estatusConsulta'=> -1);
		else{
			$this->bd->conectar();
			$this->bd->cadenaConsulta="CALL pa_usuarioAgregarEditar (".$this->id.",'".$this->tDoc."','".$this->nDoc."','".$this->nombre."','".$this->apellido."','".$this->login."','".$this->clave."','".$this->pregunta."','".$this->respuesta."','".$this->perfil."',".$this->activo.",'".$this->direccion."','".$this->telefono."')";
			$this->bd->consulta();
			$this->respuestaJson[] = array('estatusConsulta'=> 1);
		}
		return $this->respuestaJson;
	}
}
?>