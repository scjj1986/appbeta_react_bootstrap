<?
include("base-de-datos.php");
class cargo{

	public $bd,$id,$id_depto,$codigo,$nombre,$sueldo,$respuestaJson;

	function __construct(){
		$this->bd = new baseDeDatos();
        $this->respuestaJson = array();
	}

	public function cargarDatos($_id,$_id_depto,$_codigo,$_nombre,$_sueldo){
		$this->id=$_id;
		$this->id_depto=$_id_depto;
		$this->codigo=$_codigo;
		$this->nombre=$_nombre;
		$this->sueldo=$_sueldo;
	}

	public function listado(){
		$this->bd->conectar();
	    $this->bd->cadenaConsulta="CALL pa_cargoListado()";
	    $this->bd->consulta();
	    while($resultado=$this->bd->registrosConsulta()){
	    	$this->respuestaJson[] = array('id'=> $resultado["id"],
	    								   'idDepto'=> $resultado["id_depto"],
	    								   'departamento'=> $resultado["depto"],
										   'codigo'=> $resultado["codigo"],
										   'nombre'=> $resultado["nombre"],
										   'sueldo'=> number_format($resultado["sueldo"], 2, ',', '.'));
		}
		$this->bd->desconectar();
		return  $this->respuestaJson;
	}

	public function generarCodigo(){
		$this->bd->cadenaConsulta="CALL pa_cargoMaximoId ()";
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
		return  $this->respuestaJson;
	}

	public function agregarEditar(){
		$this->bd->cadenaConsulta="CALL pa_cargoDuplicadoNombre (".$this->id.",".$this->id_depto.",'".$this->nombre."')";
		if (!$this->bd->consultaVacia())
			$this->respuestaJson[] = array('estatusConsulta'=> -1);
		else{
			$this->bd->cadenaConsulta="CALL pa_cargoAgregarEditar (".$this->id.",".$this->id_depto.",'".$this->codigo."','".$this->nombre."','".$this->sueldo."')";

			$this->bd->conectar();
	    	$this->bd->consulta();
	    	$this->respuestaJson[] = array('estatusConsulta'=> 1);
	    	$this->bd->desconectar();
	    }
	    return  $this->respuestaJson;
	}

	public function buscarPorId($id){
		$this->bd->cadenaConsulta="CALL pa_cargoBuscarPorId ($id)";
		if ($this->bd->consultaVacia())
			$this->respuestaJson[] = array('id'=> -1);
		else{
			$this->bd->conectar();
	    	$this->bd->consulta();
	    	$resultado=$this->bd->registrosConsulta();
	    	$this->respuestaJson[] = array('id'=> $id,
	    								   'idDepto'=> $resultado["id_depto"],
	    								   'depto'=> $resultado["depto"],
	    								   'codigo'=> $resultado["codigo"],
	    								   'sueldo'=> $resultado["sueldo"],
	    								   'nombre'=> $resultado["nombre"]);
	    	$this->bd->desconectar();
		}
		return  $this->respuestaJson;
	}
}
?>