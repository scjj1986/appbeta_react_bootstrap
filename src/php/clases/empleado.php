<?
include("base-de-datos.php");
class empleado{
	public $bd,$id,$idCargo,$tDoc,$nDoc,$nombre,$apellido,$fNac,$lugarNac,$direccion,$telefono,$hijos,$nHijos,$tallaCamisa,$tallaPantalon,$tallaZapato,$estatura,$activo,$sexo;

	function __construct(){
		$this->bd = new baseDeDatos();
        $this->respuestaJson = array();

	}

	public function cargarCampos($_id,$_idCargo,$_tDoc,$_nDoc,$_nombre,$_apellido,$_fNac,$_lugarNac,$_direccion,$_telefono,$_hijos,$_nHijos,$_tallaCamisa,$_tallaPantalon,$_tallaZapato,$_estatura,$_activo,$_sexo){
		$this->id=$_id;
		$this->idCargo=$_idCargo;
		$this->tDoc=$_tDoc;
		$this->nDoc=$_nDoc;
		$this->nombre=$_nombre;
		$this->apellido=$_apellido;
		$this->fNac=$_fNac;
		$this->lugarNac=$_lugarNac;
		$this->direccion=$_direccion;
		$this->telefono=$_telefono;
		$this->hijos=$_hijos=="true"?"SI":"NO";
		$this->nHijos=$this->hijos=="NO"?0:$_nHijos;
		$this->tallaCamisa=$_tallaCamisa;
		$this->tallaPantalon=$_tallaPantalon;
		$this->tallaZapato=$_tallaZapato;
		$this->estatura=$_estatura;
		$this->activo=$_activo;
		$this->sexo=$_sexo;
	}

	public function listado(){
		$this->bd->conectar();
	    $this->bd->cadenaConsulta="CALL pa_empleadoListado()";
	    $this->bd->consulta();
	    while($resultado=$this->bd->registrosConsulta()){
	    	$this->respuestaJson[] = array('id'=> $resultado["id"],
										   'tDoc'=> $resultado["tdoc"],
										   'nDoc'=> $resultado["ndoc"],
										   'nombre'=>$resultado["nombre"].' '.$resultado["apellido"],
										   'cargo'=> $resultado["nombrecargo"],
										   'departamento'=> $resultado["nombredepto"],
										   'sueldo'=> number_format($resultado["sueldo"], 2, ',', '.'));
		}
		$this->bd->desconectar();
		return $this->respuestaJson;
	}

	public function generarNrFicha(){
		$this->bd->cadenaConsulta="CALL pa_empleadoMaximoId ()";
		if ($this->bd->consultaVacia())
			$this->respuestaJson[] = array('ficha'=> 1);
		else{
			$this->bd->conectar();
	    	$this->bd->consulta();
	    	$resultado=$this->bd->registrosConsulta();
	    	$this->respuestaJson[] = array('ficha'=> $resultado["id"]+1);
	    	$this->bd->desconectar();
		}
		return  $this->respuestaJson;
	}

	public function duplicadoDocumentoIdentidad(){
		$this->bd->cadenaConsulta="CALL pa_empleadoDuplicadoDocumentoIdentidad (".$this->id.",'".$this->tDoc."','".$this->nDoc."')";
        return !($this->bd->consultaVacia());
	}

	public function cargarDatosPorIdReporte($id){
		$this->bd->cadenaConsulta="CALL pa_empleadoReporteBuscarPorId ($id)";
		$this->bd->conectar();
	    $this->bd->consulta();
	    $resultado=$this->bd->registrosConsulta();
	    $this->id= $id;
	    $this->nombreCargo = $resultado["nombrecargo"];
	    $this->nombreDepto = $resultado["nombredepto"];
	    $this->tDoc = $resultado["tdoc"];
	    $this->nDoc =  $resultado["ndoc"];
	    $this->nombre =  $resultado["nombre"];
	    $this->apellido = $resultado["apellido"];
	    $this->fNac =  $resultado["fnac"];
	    $this->lugarNac =  $resultado["lugar_nac"];
	    $this->direccion =  $resultado["direccion"];
	    $this->telefono = $resultado["telefono"];
	    $this->hijos =  $resultado["hijos"];
	    $this->nHijos = $resultado["n_hijos"];
	    $this->tallaCamisa =  $resultado["talla_camisa"];
	    $this->tallaPantalon = $resultado["talla_pantalon"];
	    $this->tallaZapato =  $resultado["talla_zapato"];
	    $this->estatura =  $resultado["estatura"];
	    $this->activo =  $resultado["activo"];
	    $this->sexo =  $resultado["sexo"];
	    $this->bd->desconectar();
	}

	public function buscarPorId($id){
		$this->bd->cadenaConsulta="CALL pa_empleadoBuscarPorId ($id)";
		if ($this->bd->consultaVacia())
			$this->respuestaJson[] = array('id'=> -1);
		else{
			$this->bd->conectar();
	    	$this->bd->consulta();
	    	$resultado=$this->bd->registrosConsulta();
	    	$this->respuestaJson[] = array('id'=> $id,
	    								   'idCargo'=> $resultado["id_cargo"],
	    								   'idDepto'=> $resultado["id_depto"],
	    								   'tDoc'=> $resultado["tdoc"],
	    								   'nDoc'=> $resultado["ndoc"],
	    								   'nombre'=> $resultado["nombre"],
	    								   'apellido'=>$resultado["apellido"],
	    								   'fNac'=> $resultado["fnac"],
	    								   'lugarNac'=> $resultado["lugar_nac"],
	    								   'direccion'=> $resultado["direccion"],
	    								   'telefono'=> $resultado["telefono"],
	    								   'hijos'=> $resultado["hijos"],
	    								   'nHijos'=> $resultado["n_hijos"],
	    								   'tallaCamisa'=> $resultado["talla_camisa"],
	    								   'tallaPantalon'=> $resultado["talla_pantalon"],
	    								   'tallaZapato'=> $resultado["talla_zapato"],
	    								   'estatura'=> $resultado["estatura"],
	    								   'activo'=> $resultado["activo"],
	    								   'sexo'=> $resultado["sexo"]);
	    	$this->bd->desconectar();
		}
		return $this->respuestaJson;
	}

	public function agregarEditar(){
		if ($this->duplicadoDocumentoIdentidad())
			$this->respuestaJson[] = array('estatusConsulta'=> -1);
		else{
			$this->bd->conectar();
			$this->bd->cadenaConsulta="CALL pa_empleadoAgregarEditar (".$this->id.",".$this->idCargo.",'".$this->tDoc."','".$this->nDoc."','".$this->nombre."','".$this->apellido."','".$this->fNac."','".$this->lugarNac."','".$this->direccion."','".$this->telefono."','".$this->hijos."',".$this->nHijos.",'".$this->tallaCamisa."',".$this->tallaPantalon.",".$this->tallaZapato.",'".$this->estatura."',".$this->activo.",'".$this->sexo."')";
			$this->bd->consulta();
			$this->respuestaJson[] = array('estatusConsulta'=> 1);
		}
		return $this->respuestaJson;
	}
}
?>