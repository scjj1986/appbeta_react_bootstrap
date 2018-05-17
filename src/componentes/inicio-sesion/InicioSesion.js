import React, {Component}  from 'react';
import './InicioSesion.css';
import '../../css/estilos.css';
import {bloquearBotonPrimario,consultaBaseDeDatos,cargarLocalStorages,logueado} from '../../utilidades/funciones';
import {rutaPhpLogin} from '../../utilidades/constantes';
import MensajeAlertaError from '../mensaje-alerta-error/MensajeAlertaError';
import { browserHistory } from 'react-router';

export default class InicioSesion extends Component{

	constructor() {
	    super()
	    this.state = {
	      login: "",
	      clave:"",
	      mostrarAlerta: false,
	      tituloMensajeAlerta: " ",
	      mensajeAlerta:" "
	    }

	    this.autenticar = this.autenticar.bind(this);
	    this.mostrarOcultarAlerta = this.mostrarOcultarAlerta.bind(this);
	    this.redirigirRecuperarContrasena = this.redirigirRecuperarContrasena.bind(this);
	  }

	  /*--------------Montaje del componente (verificación de sesión)-----------------------*/
	  componentWillMount() {
	  	if (logueado())
	    	browserHistory.push('/inicio');
	  }
	  /*--------------Actualización del estado (obligatorio en todos los formularios)-----------------------*/
	  actualizarEstado(e){
		 this.setState({[e.target.name]: e.target.value})
	  }
	  /*---------------------------------------Otros métodos-------------------------------*/
	  mostrarOcultarAlerta() {
	    this.setState({mostrarAlerta: !(this.state.mostrarAlerta)});
	  }
	  bloquearBotonAcceder(){
	  	return bloquearBotonPrimario(this.state);
	  }
	  autenticar(){
	  	consultaBaseDeDatos(rutaPhpLogin+'login_autenticar',this.state).then((result) => {
			if (result[0].estatusConsulta==-1){
				this.setState({tituloMensajeAlerta: "Error"});
				this.setState({mensajeAlerta: "Usuario y/o Contraseña incorrecto"});
				this.mostrarOcultarAlerta();
			}
			else if (result[0].estatusConsulta==-2){
				this.setState({tituloMensajeAlerta: "Error"});
				this.setState({mensajeAlerta: "Usuario inactivo"});
				this.mostrarOcultarAlerta();
			}
			else{
				cargarLocalStorages(result[0].nombre,result[0].login,result[0].perfil);
				browserHistory.push('/inicio');
			}
		});
	  }

	  redirigirRecuperarContrasena(){
	  	browserHistory.push('/recuperarcontrasena');
	  }
	  /*----------------------------------------------------------------------------------*/

	 render () {
	    return (
	    	<div className="primario">
		    	<div className="card">
				  <div className="card-header">
				    <h3><b><i className="fa fa-laptop"></i> APPBETA (SISTEMA DE PRUEBA)</b></h3>
				 </div>
			   </div>
		       <div className="container">
		       		<div className="col-lg-6">
		              <div className="card">
		                <div className="card-header d-flex align-items-center">
		                  <h3><i className="fa fa-user"></i> Inicio De Sesión</h3>
		                </div>
		                <div className="card-body">
		                  <form>
		       				<p align="center"><img src="img/AppBeta_New.png" className="imgPeq"/></p>
		       				<div className="form-group">
		       					<label><b>*Usuario</b></label>
		       					<input type="text" name="login" value={this.state.login} className="form-control" onChange={(e) => this.actualizarEstado(e)}/>
		       				</div>
		       				<div className="form-group">
		       					<label><b>*Contrasena</b></label>
		       					<input type="password" name="clave" value={this.state.clave} className="form-control" onChange={(e) => this.actualizarEstado(e)}/>
		       				</div>
		       				<br/>
		       				<button disabled={this.bloquearBotonAcceder()} type="button" className="btn btn-primary btn-block" onClick={this.autenticar}><i className="fa fa-sign-in"></i> Acceder</button>
		       				<button className="btn btn-warning btn-block fuenteBlanca" onClick={this.redirigirRecuperarContrasena}><i className="fa fa-retweet"></i> Recuperar Contraseña</button>

		       			</form>
		                </div>
		              </div>
		            </div>
		       		<MensajeAlertaError mostrarOcultar={this.mostrarOcultarAlerta} mostrar={this.state.mostrarAlerta} titulo={this.state.tituloMensajeAlerta} contenido={this.state.mensajeAlerta} />
		       		
		       </div>
	       </div>
	       
	    )
	 }
}