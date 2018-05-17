<?
include("base-de-datos.php");
class departamento{
	public $bd,$id,$codigo,$nombre,$respuestaJson;

	function __construct(){
		$this->bd = new baseDeDatos();
        $this->respuestaJson = array();
	}

	public function cargarDatos($_id,$_codigo,$_nombre){
		$this->id=$_id;
		$this->codigo=$_codigo;
		$this->nombre=$_nombre;
	}

	public function agregarEditar(){
		$this->bd->cadenaConsulta="CALL pa_departamentoDuplicadoNombre (".$this->id.",'".$this->nombre."')";
		if (!$this->bd->consultaVacia())
			$this->respuestaJson[] = array('estatusConsulta'=> -1);
		else{
			$this->bd->cadenaConsulta="CALL pa_departamentoAgregarEditar (".$this->id.",'".$this->codigo."','".$this->nombre."')";
			$this->bd->conectar();
	    	$this->bd->consulta();
	    	$this->respuestaJson[] = array('estatusConsulta'=> 1);
	    	$this->bd->desconectar();
	    }
	    return $this->respuestaJson;

	}

	public function listado(){
		$this->bd->conectar();
	    $this->bd->cadenaConsulta="CALL pa_departamentoListado()";
	    $this->bd->consulta();
	    while($resultado=$this->bd->registrosConsulta()){
	    	$this->respuestaJson[] = array('id'=> $resultado["id"],
										   'codigo'=> $resultado["codigo"],
										   'nombre'=> $resultado["nombre"]);
		}
		$this->bd->desconectar();
		return $this->respuestaJson;
	}

	public function buscarPorId($id){
		$this->bd->cadenaConsulta="CALL pa_departamentoBuscarPorId ($id)";
		if ($this->bd->consultaVacia())
			$this->respuestaJson[] = array('id'=> -1);
		else{
			$this->bd->conectar();
	    	$this->bd->consulta();
	    	$resultado=$this->bd->registrosConsulta();
	    	$this->respuestaJson[] = array('id'=> $id,
	    								   'codigo'=> $resultado["codigo"],
	    								   'nombre'=> $resultado["nombre"]);
	    	$this->bd->desconectar();
	    	
		}
		return $this->respuestaJson;
	}

	public function generarCodigo(){
		$this->bd->cadenaConsulta="CALL pa_departamentoMaximoId ()";
		if ($this->bd->consultaVacia())
			$this->respuestaJson[] = array('codigo'=> "001");
		else{
			$this->bd->conectar();
	    	$this->bd->consulta();
	    	$resultado=$this->bd->registrosConsulta();
	    	$id=$resultado["id"]+1;
	    	if ($id<10)
	    		$codigo="00".(string)$id;
	    	else if ($id<100)
	    		$codigo="0".(string)$id;
	    	else
	    		$codigo=(string)$id;
	    	$this->respuestaJson[] = array('codigo'=> $codigo);
	    	$this->bd->desconectar();
		}
		return $this->respuestaJson;

	}
}
?>