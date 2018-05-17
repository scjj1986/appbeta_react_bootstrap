import React, {Component} from 'react';
import '../../css/estilos.css';
import {bloquearBotonPrimario,consultaBaseDeDatos,logueado,validarEntradaCampos,validarFormatoLogin,validarEnteroMayorQueCero} from '../../utilidades/funciones';
import {letras,numeros,rutaPhpUsuario} from '../../utilidades/constantes';
import MensajeAlertaError from '../mensaje-alerta-error/MensajeAlertaError';
import MensajeAlertaExitoso from '../mensaje-alerta-exitoso/MensajeAlertaExitoso';
import { browserHistory } from 'react-router';

export default class UsuarioFormulario extends Component{

	constructor(){
        super()
        this.state = {
        //--Encabezado del formulario--//
        logo: "",
        titulo:"",
        //----Formulario----------//
        id:-1,
	      tDoc:"V",
	      nDoc:"",
	      nombre:"",
	      apellido:"",
	      direccion:"",
	      telefono:"",
	      perfil:"ADMINISTRADOR",
	      login:"",
	      clave:"",
	      pregunta:"COLOR FAVORITO",
	      respuesta:"",
	      activo:"1",
        //----- Alertas -------//
	      mostrarAlertaError: false,
        mostrarAlertaExitoso: false,
	      tituloMensajeAlertaError: " ",
	      mensajeAlertaError:" ",
        //-- Errores en campos de texto (validadores)----//
        errorLogin:" ",
        errorClave:" ",
        errorRespuesta: " ",
        //----------------------------------------------//
        enlaceListado: '/usuariolistado'
	    }

      this.agregarEditar = this.agregarEditar.bind(this);
      this.volverListado = this.volverListado.bind(this);
      this.mostrarOcultarAlertaError = this.mostrarOcultarAlertaError.bind(this);
      this.mostrarOcultarAlertaExitoso = this.mostrarOcultarAlertaExitoso.bind(this);
        
    }

    componentWillMount() {
        if (!logueado())
            browserHistory.push('/iniciosesion');
        else if (this.props.params.id==-1 || this.props.params.id==undefined){
        		 this.setState({logo:"fa fa-plus"});
        		 this.setState({titulo:"Agregar Usuario"});
        }else if (!validarEnteroMayorQueCero(this.props.params.id))
            browserHistory.push(this.state.enlaceListado);
        else {
            let parametros = { id: this.props.params.id};
            consultaBaseDeDatos(rutaPhpUsuario+'usuario_buscarPorId',parametros).then((result) => {
                if (result[0].id!=-1){
                  this.setState({logo:"fa fa-edit"});
                  this.setState({titulo:"Editar Usuario"});
                  this.setState({id:result[0].id});
                  this.setState({nDoc:result[0].nDoc});
                  this.setState({tDoc:result[0].tDoc});
                  this.setState({nombre:result[0].nombre});
                  this.setState({apellido:result[0].apellido});
                  this.setState({direccion:result[0].direccion});
                  this.setState({telefono:result[0].telefono});
                  this.setState({login:result[0].login});
                  this.setState({clave:result[0].clave});
                  this.setState({pregunta:result[0].pregunta});
                  this.setState({respuesta:result[0].respuesta});
                  this.setState({perfil:result[0].perfil});
                  this.setState({activo:result[0].activo});
                }
                else
                  browserHistory.push(this.state.enlaceListado);

            });

          }
     }

     noPegar(e){
      e.preventDefault();
      return false;
     }

     validarNumeros(e){
      if (!validarEntradaCampos(e,numeros))
          e.preventDefault();
    }

    validarLetras(e){
      if (!validarEntradaCampos(e,letras))
        e.preventDefault();
    }

     /*--------------Actualización del estado (obligatorio en todos los formularios)-----------------------*/
	  actualizarEstado(e){
		 this.setState({[e.target.name]: e.target.value});
     
     if (e.target.name=="login")
        this.setState({errorLogin: validarFormatoLogin(e.target.value) || e.target.value==""?" ":"Formato Incorrecto"});
     else if (e.target.name=="clave")
        this.setState({errorClave: e.target.value.length>=8 || e.target.value==""?" ": "Mínimo 8 caracteres"});
     else if (e.target.name=="respuesta")
        this.setState({errorRespuesta: e.target.value.length>=4 || e.target.value==""?" ": "Mínimo 4 caracteres"});

    }

    mostrarOcultarAlertaError() {
      this.setState({mostrarAlertaError: !(this.state.mostrarAlertaError)});
    }

    mostrarOcultarAlertaExitoso() {
      this.setState({mostrarAlertaExitoso: !(this.state.mostrarAlertaExitoso)});
    }

	  bloquearBotonGuardar(){
	  	return (bloquearBotonPrimario(this.state) || this.state.errorLogin!=" " || this.state.errorClave!=" " || this.state.errorRespuesta!=" ");
	  }

    agregarEditar(){
      consultaBaseDeDatos(rutaPhpUsuario+'usuario_agregarEditar',this.state).then((result) => {
          if (result[0].estatusConsulta==-1){
            this.setState({tituloMensajeAlertaError: "Error"});
            this.setState({mensajeAlertaError: "*El Login debe ser irrepetible"});
            this.mostrarOcultarAlertaError();
          }
          else if (result[0].estatusConsulta==-2){
            this.setState({tituloMensajeAlertaError: "Error"});
            this.setState({mensajeAlertaError: "*El Documento de Identidad debe ser irrepetible"});
            this.mostrarOcultarAlertaError();
          }
          else
            this.mostrarOcultarAlertaExitoso();
      });

    }

    volverListado(){
      browserHistory.push(this.state.enlaceListado);
    }

     render(){
     	return(

     		<div className="col-lg-12">
              <div className="card">
                <div className="card-header d-flex align-items-center">
                  <h3><i className={this.state.logo}></i> {this.state.titulo}</h3>
                </div>
                <div className="card-body">
                  <form className="form-horizontal">
                  	<div className="form-group row">
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-2 etiquetaCampo">*Tipo Documento</label>
                      <div className="col-sm-1 mb-1">
                        <select name="tDoc" value={this.state.tDoc} className="form-control form-control-sm" onChange={(e) => this.actualizarEstado(e)}>
                          <option value="V">V</option>
                          <option value="E">E</option>
                          <option value="P">P</option>
                        </select>
                      </div>
                      <div className="col-sm-1">
                      </div>
                      <label className="col-sm-2 etiquetaCampo">*Nr. Documento</label>
                      <div className="col-sm-2">
                      	<input type="text" name="nDoc" maxLength="15" value={this.state.nDoc}  className="form-control form-control-sm" onKeyPress={(e) => this.validarNumeros(e)} onPaste={(e) => this.noPegar(e)} onChange={(e) => this.actualizarEstado(e)}/>
                      </div>
                      <label className="col-sm-2 etiquetaCampo">*Nombre</label>
                      <div className="col-sm-2">
                      	<input type="text" name="nombre" maxLength="50" value={this.state.nombre}  className="form-control form-control-sm" onKeyPress={(e) => this.validarLetras(e)} onPaste={(e) => this.noPegar(e)} onChange={(e) => this.actualizarEstado(e)}/>
                      </div>
                    </div>

                    <div className="form-group row">
                    	  <label className="col-sm-2 etiquetaCampo">*Apellido</label>
	                      <div className="col-sm-2">
	                      	<input type="text" name="apellido" maxLength="15" value={this.state.apellido}  className="form-control form-control-sm" onPaste={(e) => this.noPegar(e)} onChange={(e) => this.actualizarEstado(e)}/>
	                      </div>

	                      <label className="col-sm-2 etiquetaCampo">*Dirección</label>
	                      <div className="col-sm-5">
	                      	<textarea name="direccion" maxLength="200" value={this.state.direccion}  className="form-control form-control-sm" onChange={(e) => this.actualizarEstado(e)}></textarea>
	                      </div>
                    </div>

                    <div className="form-group row">
                    	  <label className="col-sm-2 etiquetaCampo">*Teléfono</label>
	                      <div className="col-sm-2">
	                      	<input type="text" name="telefono" maxLength="20" value={this.state.telefono}  className="form-control form-control-sm" onChange={(e) => this.actualizarEstado(e)}/>
	                      </div>

	                      <label className="col-sm-2 etiquetaCampo">*Perfil</label>
	                      <div className="col-sm-2 mb-2">
	                        <select name="perfil" value={this.state.perfil} className="form-control form-control-sm" onChange={(e) => this.actualizarEstado(e)}>
	                          <option value="ADMINISTRADOR">Administrador</option>
	                          <option value="OPERADOR">Operador</option>
	                        </select>
                      	  </div>
                      	  <label className="col-sm-2 etiquetaCampo">*Login</label>
	                      <div className="col-sm-2">
	                      	<input type="text" name="login" maxLength="50" value={this.state.login}  className="form-control form-control-sm" onChange={(e) => this.actualizarEstado(e)}/>
                          <small className="form-text fuenteRoja">{this.state.errorLogin}</small>
	                      </div>
                    </div>

                    <div className="form-group row">
                    	<label className="col-sm-2 etiquetaCampo">*Clave</label>
	                      <div className="col-sm-2">
	                      	<input type="password" maxLength="30" name="clave" value={this.state.clave}  className="form-control form-control-sm" onChange={(e) => this.actualizarEstado(e)}/>
                          <small className="form-text fuenteRoja">{this.state.errorClave}</small>

	                      </div>
	                      <label className="col-sm-2 etiquetaCampo">*Pregunta Secreta</label>
	                      <div className="col-sm-2">
	                      	<select name="pregunta" value={this.state.pregunta} className="form-control form-control-sm" onChange={(e) => this.actualizarEstado(e)}>
                            <option value="COLOR FAVORITO">COLOR FAVORITO?</option>
                            <option value="COMIDA FAVORITA">COMIDA FAVORITA?</option>
                            <option value="ARTISTA FAVORITO">ARTISTA FAVORITO?</option>
                            <option value="CANCION FAVORITA">CANCIÓN FAVORITA?</option>
                            <option value="NOMBRE DE MASCOTA">NOMBRE DE MASCOTA?</option>
                        </select>
	                      </div>
	                      <label className="col-sm-2 etiquetaCampo">*Respuesta</label>
	                      <div className="col-sm-2">
	                      	<input type="password" name="respuesta" maxLength="50" value={this.state.respuesta}  className="form-control form-control-sm" onChange={(e) => this.actualizarEstado(e)}/>
                          <small className="form-text fuenteRoja">{this.state.errorRespuesta}</small>
	                      </div>

                    </div>
                    <div className="form-group row">
                    	<label className="col-sm-2 etiquetaCampo">*Activo</label>
	                      <div className="col-sm-1 mb-1">
	                        <select name="activo" value={this.state.activo} className="form-control form-control-sm" onChange={(e) => this.actualizarEstado(e)}>
	                          <option value="1">Sí</option>
	                          <option value="0">No</option>
	                        </select>
                      	  </div>
                    </div>
                    <div className="form-group row">
                    </div>

                    <div className="form-group row">
                      <div align="center" className="col-sm-12">
                    	<button disabled={this.bloquearBotonGuardar()} type="button" className="btn btn-primary btnGuardar" onClick={this.agregarEditar}><i className="fa fa-save"></i> Guardar</button> - <button type="button" className="btn btn-secondary btnVolver" onClick={this.volverListado}><i className="fa fa-reply"></i> Volver</button>
		       		  </div>
                    </div>
                    
                  </form>
                </div>
              </div>
              <MensajeAlertaError mostrarOcultar={this.mostrarOcultarAlertaError} mostrar={this.state.mostrarAlertaError} titulo={this.state.tituloMensajeAlertaError} contenido={this.state.mensajeAlertaError} />
              <MensajeAlertaExitoso redirigir={this.state.enlaceListado} mostrarOcultar={this.mostrarOcultarAlertaExitoso} mostrar={this.state.mostrarAlertaExitoso} />

            </div>

     	);
     }
}