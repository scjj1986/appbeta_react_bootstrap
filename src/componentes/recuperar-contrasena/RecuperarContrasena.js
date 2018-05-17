import React, {Component} from 'react';
import './RecuperarContrasena.css';
import '../../css/estilos.css';
import {filtrarArreglo,bloquearBotonPrimario,consultaBaseDeDatos,logueado,validarEntradaCampos,validarEntradaDecimales,validarEnteroMayorQueCero} from '../../utilidades/funciones';
import {letras,numeros,rutaPhpRecuperarContrasena} from '../../utilidades/constantes';
import MensajeAlertaError from '../mensaje-alerta-error/MensajeAlertaError';
import MensajeAlertaExitoso from '../mensaje-alerta-exitoso/MensajeAlertaExitoso';
import { browserHistory } from 'react-router';

export default class RecuperarContrasena extends Component{

	
	constructor(){
		super()
		this.state = {
			//--Encabezado del formulario--//
        	logo: "",
        	titulo:"",
        	//------Todos los campos-------//
        	login:"",
        	nombreUsuario:"",
        	pregunta:"",
        	respuesta:"",
        	clave:"",
        	clave2:"",
        	//--Divs de los 3 formularios para mostrar/ocultar--//
        	mostrarDiv1:"mostrar",
        	mostrarDiv2:"ocultar",
        	mostrarDiv3:"ocultar",
        	//----- Alertas -------//
        	mostrarAlerta: false,
	      	tituloMensajeAlerta: " ",
	      	mensajeAlerta:" ",
	      	mostrarAlertaError: false,
        	mostrarAlertaExitoso: false,
	      	tituloMensajeAlertaError: " ",
	      	mensajeAlertaError:" ",
	    	//------------------------//
	    	enlaceLogin:'/iniciosesion'

		}

		this.rcSigPaso1 = this.rcSigPaso1.bind(this);
		this.rcSigPaso2 = this.rcSigPaso2.bind(this);
		this.rcFinalizar = this.rcFinalizar.bind(this);
		this.mostrarOcultarAlertaError = this.mostrarOcultarAlertaError.bind(this);
		this.mostrarOcultarAlertaExitoso = this.mostrarOcultarAlertaExitoso.bind(this);
		this.irPaso1 = this.irPaso1.bind(this);
		this.irPaso2 = this.irPaso2.bind(this);
		this.irPaso3 = this.irPaso3.bind(this);
		this.cancelar = this.cancelar.bind(this);
		this.bloquearBotonFinalizar = this.bloquearBotonFinalizar.bind(this);
	}

	componentWillMount() {
        if (logueado())
            browserHistory.push('/inicio');
    }

    /*--------------Actualización del estado (obligatorio en todos los formularios)-----------------------*/
	  actualizarEstado(e){
		 this.setState({[e.target.name]: e.target.value})
	  }
	 /*------------------------------------------Paso 1--------------------------------------------------*/
    rcSigPaso1(){
    	consultaBaseDeDatos(rutaPhpRecuperarContrasena+'recuperar-contrasena_buscarUsuarioPorLogin',this.state).then((result) => {
			if (result[0].estatusConsulta==-1){
				this.setState({tituloMensajeAlerta: "Error"});
				this.setState({mensajeAlerta: "Usuario no encontrado"});
				this.mostrarOcultarAlertaError();
			}
			else{
				this.setState({nombreUsuario: result[0].nombreCompleto});
				this.setState({pregunta: result[0].pregunta});
				this.irPaso2();
			}
		});
    }
    /*------------------------------------------Paso 2--------------------------------------------------*/
    rcSigPaso2(){
    	consultaBaseDeDatos(rutaPhpRecuperarContrasena+'recuperar-contrasena_verificarRespuesta',this.state).then((result) => {
			if (result[0].estatusConsulta==-1){
				this.setState({tituloMensajeAlerta: "Error"});
				this.setState({mensajeAlerta: "Respuesta incorrecta"});
				this.mostrarOcultarAlertaError();
			}
			else{
				this.irPaso3();
			}
		});
    }
    /*-------------------------------------------Finalizar------------------------------------------*/
    rcFinalizar(){
    	consultaBaseDeDatos(rutaPhpRecuperarContrasena+'recuperar-contrasena_cambiarClave',this.state).then((result) => {
			if (result[0].estatusConsulta==1)
				this.mostrarOcultarAlertaExitoso();
			
		});
    }

    irPaso1(){
    	this.setState({mostrarDiv1: "mostrar"});
    	this.setState({mostrarDiv2: "ocultar"});
    	this.setState({mostrarDiv3: "ocultar"});
    }

    irPaso2(){
    	this.setState({mostrarDiv1: "ocultar"});
    	this.setState({mostrarDiv2: "mostrar"});
    	this.setState({mostrarDiv3: "ocultar"});
    }
    irPaso3(){
    	this.setState({mostrarDiv1: "ocultar"});
    	this.setState({mostrarDiv2: "ocultar"});
    	this.setState({mostrarDiv3: "mostrar"});
    }


    mostrarOcultarAlertaError() {
      this.setState({mostrarAlertaError: !(this.state.mostrarAlertaError)});
    }

    mostrarOcultarAlertaExitoso() {
      this.setState({mostrarAlertaExitoso: !(this.state.mostrarAlertaExitoso)});
    }

	cancelar(){
		browserHistory.push(this.state.enlaceLogin);
	}

	bloquearBotonFinalizar(){
		return (this.state.clave=="" || this.state.clave2=="" || this.state.clave!=this.state.clave2 || (this.state.clave==this.state.clave2 && (this.state.clave.length<6 || this.state.clave.length>16) )  )
	}

    render(){
     	return(
     		<div className="primario">
		    	<div className="card">
				  <div className="card-header">
				    <h3><b><i className="fa fa-laptop"></i> APPBETA (SISTEMA DE PRUEBA)</b></h3>
				 </div>
			   </div>
		       <div className="container">
		       		<div className={this.state.mostrarDiv1}>
			       		<div className="col-lg-6">
			              <div className="card">
			                <div className="card-header d-flex align-items-center">
			                  <h3><i className="fa fa-retweet"></i> Recuperar Contraseña (Paso 1)</h3>
			                </div>
			                <div className="card-body">
			                  <form>
			       				<div className="form-group">
			       					<label><b>*Usuario</b></label>
			       					<input type="text" name="login" value={this.state.login} className="form-control" onChange={(e) => this.actualizarEstado(e)}/>
			       				</div>
			       				<br/>
			       				<div align="center">
				       				<button disabled={this.state.login==""} type="button" className="btn btn-primary" onClick={this.rcSigPaso1}><i className="fa fa-angle-double-right"></i> Siguiente</button>
				       				-<button className="btn btn-danger" onClick={this.cancelar}><i className="fa fa-ban"></i> Cancelar</button>
				       			</div>
			       			   </form>
			                </div>
			              </div>
			            </div>
			        </div>
			        <div className={this.state.mostrarDiv2}>
			       		<div className="col-lg-6">
			              <div className="card">
			                <div className="card-header d-flex align-items-center">
			                  <h3><i className="fa fa-retweet"></i> Recuperar Contraseña (Paso 2)</h3>
			                </div>
			                <div className="card-body">
			                  <form>
			                     <div className="form-group">
			       					<label><b>Nombre De Usuario</b></label>
			       					<input type="text" disabled name="nombreUsuario" value={this.state.nombreUsuario} className="form-control"/>
			       				</div>
			       				<div className="form-group">
			       					<label><b>Login</b></label>
			       					<input type="text" disabled name="login" value={this.state.login} className="form-control"/>
			       				</div>
			                  	<div className="form-group">
			       					<label><b>Pregunta</b></label>
			       					<input type="text" disabled name="pregunta" value={this.state.pregunta} className="form-control"/>
			       				</div>
			       				<div className="form-group">
			       					<label><b>*Respuesta</b></label>
			       					<input type="password" name="respuesta" value={this.state.respuesta} className="form-control" onChange={(e) => this.actualizarEstado(e)}/>
			       				</div>
			       				<br/>
			       				<div align="center">
				       				<button type="button" className="btn btn-secondary" onClick={this.irPaso1}><i className="fa fa-angle-double-left"></i>Anterior</button>
				       				-<button disabled={this.state.respuesta==""} type="button" className="btn btn-primary" onClick={this.rcSigPaso2}><i className="fa fa-angle-double-right"></i> Siguiente</button>
				       				-<button className="btn btn-danger" onClick={this.cancelar}><i className="fa fa-ban"></i> Cancelar</button>
				       			</div>
			       			   </form>
			                </div>
			              </div>
			            </div>
			        </div>
			        <div className={this.state.mostrarDiv3}>
			       		<div className="col-lg-6">
			              <div className="card">
			                <div className="card-header d-flex align-items-center">
			                  <h3><i className="fa fa-retweet"></i> Recuperar Contraseña (Paso 3)</h3>
			                </div>
			                <div className="card-body">
			                  <form>
			                     <div className="form-group">
			       					<label><b>Nombre De Usuario</b></label>
			       					<input type="text" disabled name="nombreUsuario" value={this.state.nombreUsuario} className="form-control"/>
			       				</div>
			       				<div className="form-group">
			       					<label><b>Login</b></label>
			       					<input type="text" disabled name="login" value={this.state.login} className="form-control"/>
			       				</div>
			                  	<div className="form-group">
			       					<label><b>*Ingrese Nueva Clave (min. 6 máx. 16 caracteres)</b></label>
			       					<input type="password" name="clave" value={this.state.clave} className="form-control" onChange={(e) => this.actualizarEstado(e)}/>
			       				</div>
			       				<div className="form-group">
			       					<label><b>*Repetir Nueva Clave</b></label>
			       					<input type="password" name="clave2" value={this.state.clave2} className="form-control" onChange={(e) => this.actualizarEstado(e)}/>
			       				</div>
			       				<br/>
			       				<div align="center">
				       				<button type="button" className="btn btn-secondary" onClick={this.irPaso2}><i className="fa fa-angle-double-left"></i>Anterior</button>
				       				-<button disabled={this.bloquearBotonFinalizar()} type="button" className="btn btn-primary" onClick={this.rcFinalizar}><i className="fa fa-save"></i> Finalizar</button>
				       				-<button className="btn btn-danger" onClick={this.cancelar}><i className="fa fa-ban"></i> Cancelar</button>
				       			</div>
			       			   </form>
			                </div>
			              </div>
			            </div>
			        </div>
		       </div>
		       <MensajeAlertaError mostrarOcultar={this.mostrarOcultarAlertaError} mostrar={this.state.mostrarAlertaError} titulo={this.state.tituloMensajeAlerta} contenido={this.state.mensajeAlerta} />
		       <MensajeAlertaExitoso redirigir={this.state.enlaceLogin} mostrarOcultar={this.mostrarOcultarAlertaExitoso} mostrar={this.state.mostrarAlertaExitoso} />
	       </div>
     	);
     }
}