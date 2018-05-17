<?
class baseDeDatos{
	
	public $servidor,$_baseDeDatos,$usuario,$contrasena,$conexion,$cadenaConsulta,$resultadoConsulta;

	function __construct() {
        $this->servidor = "localhost";
        $this->_baseDeDatos = "test_2";
        $this->usuario = "root";
        $this->contrasena = "1234567-";
    }

    public function conectar(){
    	$this->conexion=mysql_connect($this->servidor, $this->usuario, $this->contrasena);
    	mysql_select_db($this->_baseDeDatos, $this->conexion);
    }

    public function desconectar(){
    	mysql_close($this->conexion);
    }

    public function consulta(){
    	$this->resultadoConsulta = mysql_query($this->cadenaConsulta) or die(mysql_error());
    }

    public function registrosConsulta(){
    	return mysql_fetch_array($this->resultadoConsulta);
    }

    public function consultaVacia(){
        $this->conectar();
        $this->consulta();
        $respuesta=mysql_num_rows($this->resultadoConsulta)==0?true:false;
        $this->desconectar();
        return $respuesta;
    }
} 

?>